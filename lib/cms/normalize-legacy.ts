import { DEFAULT_SITE_CONTENT } from "@/lib/cms/defaults";
import { normalizeMissionList } from "@/lib/cms/mission-practice";
import type {
  CmsImage,
  CmsSectionBlock,
  MisionesArteBlock,
  MisionesContent,
  MissionItem,
  MissionPracticeEntry,
  SiteContent,
  VisionMisionContent,
} from "@/lib/cms/types";

export type LegacyVision = {
  tag?: string;
  title?: string;
  statement?: string;
  lead?: string;
  paragraphs?: string[];
  highlights?: string[];
  image?: { src: string; alt: string };
};

const MISION_PHOTO_SLOTS = 3;

function isVisionMisionLegacy(value: unknown): value is LegacyVision {
  return Boolean(value && typeof value === "object" && !("vision" in value) && !("mision" in value));
}

function isMisionesLegacy(value: unknown): value is CmsSectionBlock {
  return Boolean(
    value &&
      typeof value === "object" &&
      "paragraphs" in value &&
      !("items" in value) &&
      !("missions" in value),
  );
}

export function normalizeMisionesArte(raw: Partial<MisionesArteBlock> | undefined): MisionesArteBlock {
  const defaults = DEFAULT_SITE_CONTENT.misiones.arte;
  const merged = { ...defaults, ...raw };
  return {
    tag: merged.tag?.trim() || defaults.tag,
    title: merged.title?.trim() || defaults.title,
    paragraphs: merged.paragraphs?.length
      ? merged.paragraphs.map((p) => p.trim()).filter(Boolean)
      : defaults.paragraphs,
    image: {
      src: merged.image?.src?.trim() || "",
      alt: merged.image?.alt?.trim() || defaults.image.alt,
    },
    tagEn: merged.tagEn?.trim() || undefined,
    titleEn: merged.titleEn?.trim() || undefined,
    paragraphsEn: merged.paragraphsEn?.length
      ? merged.paragraphsEn.map((p) => p.trim()).filter(Boolean)
      : undefined,
  };
}

function padMisionPhotos(photos: CmsImage[]): CmsImage[] {
  const next = photos.slice(0, MISION_PHOTO_SLOTS).map((photo) => ({
    src: photo.src?.trim() || "",
    alt: photo.alt?.trim() || "",
  }));
  while (next.length < MISION_PHOTO_SLOTS) {
    next.push({ src: "", alt: "" });
  }
  return next;
}

function migrateItemsToMisiones(raw: Partial<MisionesContent> & { items?: MissionItem[] }): MisionesContent {
  const defaults = DEFAULT_SITE_CONTENT.misiones;
  const items = raw.items ?? [];
  const paragraphsFromItems = items.map((item) => item.text.trim()).filter(Boolean);
  const photosFromItems = items
    .map((item) => item.image)
    .filter((image): image is CmsImage => Boolean(image?.src?.trim()));

  return {
    tag: raw.tag?.trim() || defaults.tag,
    title: raw.title?.trim() || defaults.title,
    lead: raw.lead?.trim() || defaults.lead,
    paragraphs: raw.paragraphs?.length
      ? raw.paragraphs.filter((line) => line.trim())
      : paragraphsFromItems.length
        ? paragraphsFromItems
        : defaults.paragraphs,
    archiveCtaLabel: raw.archiveCtaLabel?.trim() || defaults.archiveCtaLabel,
    introImage: {
      src: raw.introImage?.src?.trim() || defaults.introImage.src,
      alt: raw.introImage?.alt?.trim() || defaults.introImage.alt,
    },
    photos: padMisionPhotos(raw.photos?.length ? raw.photos : photosFromItems),
    ctaLabel: raw.ctaLabel?.trim() || defaults.ctaLabel,
    arte: normalizeMisionesArte(raw.arte ?? defaults.arte),
    archiveTitle: raw.archiveTitle?.trim() || defaults.archiveTitle,
    archiveLead: raw.archiveLead?.trim() || defaults.archiveLead,
    archiveParagraphs: raw.archiveParagraphs?.length ? raw.archiveParagraphs : defaults.archiveParagraphs,
    archiveImage: {
      src: raw.archiveImage?.src?.trim() || defaults.archiveImage.src,
      alt: raw.archiveImage?.alt?.trim() || defaults.archiveImage.alt,
    },
    missions: normalizeMissionList(
      raw.missions?.length ? listTerritoryMissionsFromRaw(raw.missions) : defaults.missions,
    ),
  };
}

function missionFromLegacy(raw: LegacyVision): VisionMisionContent["mision"] {
  const defaults = DEFAULT_SITE_CONTENT.visionMision.mision;
  const highlightLine = raw.highlights?.filter(Boolean).join(" ");

  return {
    ...defaults,
    statement: raw.lead?.trim() || defaults.statement,
    paragraphs: highlightLine
      ? [highlightLine]
      : raw.lead?.trim()
        ? [raw.lead.trim()]
        : defaults.paragraphs,
  };
}

export function normalizeVisionMision(raw: Partial<VisionMisionContent> | LegacyVision | undefined): VisionMisionContent {
  if (!raw) return structuredClone(DEFAULT_SITE_CONTENT.visionMision);

  if (isVisionMisionLegacy(raw)) {
    const statement =
      raw.statement?.trim() || raw.lead?.trim() || DEFAULT_SITE_CONTENT.visionMision.vision.statement;
    const paragraphs = raw.paragraphs?.length
      ? raw.paragraphs.filter((line) => line.trim() && line.trim() !== statement).slice(0, 2)
      : DEFAULT_SITE_CONTENT.visionMision.vision.paragraphs;

    return {
      vision: {
        title: raw.tag?.trim() || "Visión",
        heading: raw.title?.trim() || DEFAULT_SITE_CONTENT.visionMision.vision.heading,
        statement,
        paragraphs: paragraphs.length ? paragraphs : DEFAULT_SITE_CONTENT.visionMision.vision.paragraphs,
        image: raw.image?.src ? raw.image : undefined,
      },
      mision: missionFromLegacy(raw),
    };
  }

  return {
    vision: { ...DEFAULT_SITE_CONTENT.visionMision.vision, ...raw.vision },
    mision: { ...DEFAULT_SITE_CONTENT.visionMision.mision, ...raw.mision },
  };
}

export function normalizeMisiones(raw: Partial<MisionesContent> & { items?: MissionItem[] } | CmsSectionBlock | undefined): MisionesContent {
  if (!raw) return structuredClone(DEFAULT_SITE_CONTENT.misiones);

  if (isMisionesLegacy(raw)) {
    const photos: CmsImage[] = raw.image?.src ? [raw.image] : [];
    return migrateItemsToMisiones({
      tag: raw.tag,
      title: raw.title,
      lead: raw.lead,
      paragraphs: raw.paragraphs?.filter((line) => line.trim()),
      photos,
    });
  }

  if ("items" in raw && Array.isArray(raw.items) && raw.items.length) {
    return migrateItemsToMisiones(raw);
  }

  const defaults = DEFAULT_SITE_CONTENT.misiones;
  const merged = { ...defaults, ...raw };
  const missions = normalizeMissionList(
    merged.missions?.length ? listTerritoryMissionsFromRaw(merged.missions) : defaults.missions,
  );
  const archiveParagraphs = merged.archiveParagraphs?.length
    ? merged.archiveParagraphs.filter((line) => line.trim())
    : defaults.archiveParagraphs;
  return {
    ...merged,
    paragraphs: merged.paragraphs?.length ? merged.paragraphs.filter((line) => line.trim()) : defaults.paragraphs,
    archiveCtaLabel: merged.archiveCtaLabel?.trim() || defaults.archiveCtaLabel,
    introImage: {
      src: merged.introImage?.src?.trim() || defaults.introImage.src,
      alt: merged.introImage?.alt?.trim() || defaults.introImage.alt,
    },
    photos: padMisionPhotos(merged.photos ?? []),
    ctaLabel: merged.ctaLabel?.trim() || defaults.ctaLabel,
    arte: normalizeMisionesArte(merged.arte),
    archiveTitle: merged.archiveTitle?.trim() || defaults.archiveTitle,
    archiveLead: merged.archiveLead?.trim() || defaults.archiveLead,
    archiveParagraphs,
    archiveImage: {
      src: merged.archiveImage?.src?.trim() || defaults.archiveImage.src,
      alt: merged.archiveImage?.alt?.trim() || defaults.archiveImage.alt,
    },
    missions,
  };
}

function listTerritoryMissionsFromRaw(missions: Partial<MissionPracticeEntry>[]): Partial<MissionPracticeEntry>[] {
  return missions.filter((m) => m.category !== "formacion" && m.id !== "mision-desarrollo-arte-quiropractico");
}

export function normalizeStoredContent(content: Partial<SiteContent> & { vision?: LegacyVision }): Partial<SiteContent> {
  const visionMision = normalizeVisionMision(content.visionMision ?? content.vision);

  return {
    ...content,
    visionMision,
    misiones: normalizeMisiones(content.misiones as MisionesContent | CmsSectionBlock | undefined),
  };
}
