import type { Locale } from "@/lib/i18n/locale";
import type { CmsImage, MissionCategory, MissionPracticeEntry } from "@/lib/cms/types";

export const MISSION_PHOTO_SLOTS = 6;

const CATEGORY_ES: Record<MissionCategory, string> = {
  colegio: "Colegios y centros educativos",
  carcel: "Centro penitenciario",
  iglesia: "Iglesia / comunidad de fe",
  comunidad: "Comunidad",
  formacion: "Desarrollo del arte quiropráctico",
  otro: "Misión en territorio",
};

const CATEGORY_EN: Record<MissionCategory, string> = {
  colegio: "Schools and educational centers",
  carcel: "Correctional facility",
  iglesia: "Church / faith community",
  comunidad: "Community",
  formacion: "Developing the chiropractic art",
  otro: "Outreach mission",
};

export function missionCategoryLabel(category: MissionCategory, locale: Locale = "es") {
  return locale === "en" ? CATEGORY_EN[category] : CATEGORY_ES[category];
}

export function padMissionPhotos(photos: CmsImage[]): CmsImage[] {
  const next = photos.slice(0, MISSION_PHOTO_SLOTS).map((photo) => ({
    src: photo.src?.trim() || "",
    alt: photo.alt?.trim() || "",
  }));
  while (next.length < MISSION_PHOTO_SLOTS) {
    next.push({ src: "", alt: "" });
  }
  return next;
}

export function slugifyMissionId(title: string, fallback = "mision") {
  const base = title
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base || fallback;
}

export function normalizeMissionEntry(raw: Partial<MissionPracticeEntry>, index: number): MissionPracticeEntry {
  const title = raw.title?.trim() || `Misión ${index + 1}`;
  return {
    id: raw.id?.trim() || slugifyMissionId(title, `mision-${index + 1}`),
    title,
    category: raw.category || "otro",
    typeLabel:
      raw.typeLabel?.trim() ||
      (raw.category ? missionCategoryLabel(raw.category, "es") : "") ||
      "",
    eventDate: raw.eventDate?.trim() || "",
    location: raw.location?.trim() || "",
    summary: raw.summary?.trim() || "",
    paragraphs: (raw.paragraphs ?? []).map((p) => p.trim()).filter(Boolean),
    photos: padMissionPhotos(raw.photos ?? []),
    venuePhotos: padMissionPhotos(raw.venuePhotos ?? []),
    lodgingPhotos: padMissionPhotos(raw.lodgingPhotos ?? []),
    isFeatured: Boolean(raw.isFeatured),
  };
}

export type MissionEnOverlay = {
  id: string;
  title?: string;
  typeLabel?: string;
  summary?: string;
  location?: string;
  paragraphs?: string[];
};

export function missionTypeLabel(entry: MissionPracticeEntry, locale: Locale = "es"): string {
  if (locale === "en") {
    return entry.typeLabelEn?.trim() || entry.typeLabel?.trim() || "";
  }
  return entry.typeLabel?.trim() || "";
}

/** Aplica textos EN del CMS o overlay estático (content-en.ts) por id de misión. */
export function localizeMissionList(
  missions: MissionPracticeEntry[],
  overlays: MissionEnOverlay[] | undefined,
): MissionPracticeEntry[] {
  const byId = new Map((overlays ?? []).map((entry) => [entry.id, entry]));

  return missions.map((mission) => {
    const overlay = byId.get(mission.id);
    if (!overlay) return mission;

    return {
      ...mission,
      title: overlay.title?.trim() || mission.title,
      typeLabel: overlay.typeLabel?.trim() || mission.typeLabel,
      summary: overlay.summary?.trim() || mission.summary,
      location: overlay.location?.trim() || mission.location,
      paragraphs: overlay.paragraphs?.length ? overlay.paragraphs : mission.paragraphs,
    };
  });
}

export function normalizeMissionList(entries: Partial<MissionPracticeEntry>[] | undefined): MissionPracticeEntry[] {
  if (!entries?.length) return [];
  return entries.map((entry, index) => normalizeMissionEntry(entry, index));
}

export function missionGalleryPhotos(entry: MissionPracticeEntry): CmsImage[] {
  return entry.photos.filter((photo) => photo.src.trim());
}

export function missionVenuePhotos(entry: MissionPracticeEntry): CmsImage[] {
  return entry.venuePhotos.filter((photo) => photo.src.trim());
}

export function missionLodgingPhotos(entry: MissionPracticeEntry): CmsImage[] {
  return entry.lodgingPhotos.filter((photo) => photo.src.trim());
}

const MISSION_DATE_PENDING_RE =
  /^(pendiente|por\s*confirmar|sin\s*fecha|tbd|to\s*be\s*confirmed|fecha\s*por\s*confirmar)$/i;

export function isMissionDatePending(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  return MISSION_DATE_PENDING_RE.test(trimmed);
}

/** Fecha ISO programada; vacío o “por confirmar” no cuenta. */
export function hasScheduledMissionDate(value: string): boolean {
  if (isMissionDatePending(value)) return false;
  return !Number.isNaN(Date.parse(value.trim()));
}

function parseEventTime(value: string): number {
  if (isMissionDatePending(value)) return Number.MAX_SAFE_INTEGER;
  const iso = Date.parse(value);
  if (!Number.isNaN(iso)) return iso;
  const match = value.match(/(20\d{2})/);
  return match ? Date.parse(`${match[1]}-06-01`) : Number.MAX_SAFE_INTEGER;
}

/** Misiones de salida al territorio (excluye entradas legacy de categoría formación). */
export function listTerritoryMissions(missions: MissionPracticeEntry[]): MissionPracticeEntry[] {
  return missions.filter((m) => m.category !== "formacion");
}

export function pickFeaturedMission(missions: MissionPracticeEntry[]): MissionPracticeEntry | null {
  missions = listTerritoryMissions(missions);
  if (!missions.length) return null;
  const featured = missions.filter((m) => m.isFeatured);
  if (featured.length === 1) return featured[0];
  if (featured.length > 1) {
    return [...featured].sort((a, b) => parseEventTime(a.eventDate) - parseEventTime(b.eventDate))[0];
  }
  const now = Date.now();
  const upcoming = missions
    .filter((m) => parseEventTime(m.eventDate) >= now - 86400000)
    .sort((a, b) => parseEventTime(a.eventDate) - parseEventTime(b.eventDate));
  if (upcoming.length) return upcoming[0];
  return [...missions].sort((a, b) => parseEventTime(b.eventDate) - parseEventTime(a.eventDate))[0];
}

export function sortMissionsForArchive(missions: MissionPracticeEntry[]): MissionPracticeEntry[] {
  missions = listTerritoryMissions(missions);
  const featured = pickFeaturedMission(missions);
  const rest = missions.filter((m) => m.id !== featured?.id);
  const now = Date.now();
  const upcoming = rest
    .filter((m) => parseEventTime(m.eventDate) >= now - 86400000)
    .sort((a, b) => parseEventTime(a.eventDate) - parseEventTime(b.eventDate));
  const past = rest
    .filter((m) => parseEventTime(m.eventDate) < now - 86400000)
    .sort((a, b) => parseEventTime(b.eventDate) - parseEventTime(a.eventDate));
  return [...(featured ? [featured] : []), ...upcoming, ...past];
}

export function formatMissionDateLabel(value: string, locale: Locale = "es"): string {
  if (isMissionDatePending(value)) {
    return locale === "en" ? "Date to be confirmed" : "Fecha por confirmar";
  }
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value.trim();
  return new Intl.DateTimeFormat(locale === "en" ? "en-US" : "es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(parsed));
}
