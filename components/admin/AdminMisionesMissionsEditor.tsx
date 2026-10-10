"use client";

import AdminMissionPhotoFields, { type MissionPhotoField } from "@/components/admin/AdminMissionPhotoFields";
import type { CmsImage, MissionPracticeEntry } from "@/lib/cms/types";
import { MISSION_PHOTO_SLOTS, normalizeMissionEntry, slugifyMissionId } from "@/lib/cms/mission-practice";
import { useEffect, useState, type MutableRefObject } from "react";

type Props = {
  initialMissions: MissionPracticeEntry[];
  /** Sube cuando el servidor guarda; evita borrar fotos recién subidas al re-renderizar */
  contentVersion: number;
  missionsDraftRef: MutableRefObject<MissionPracticeEntry[]>;
  onChange: (missions: MissionPracticeEntry[]) => void;
  onUpload: (file: File) => Promise<string | null>;
};

function padPhotos(photos: CmsImage[]): CmsImage[] {
  const next = photos.slice(0, MISSION_PHOTO_SLOTS).map((p) => ({ src: p.src || "", alt: p.alt || "" }));
  while (next.length < MISSION_PHOTO_SLOTS) next.push({ src: "", alt: "" });
  return next;
}

export default function AdminMisionesMissionsEditor({
  initialMissions,
  contentVersion,
  missionsDraftRef,
  onChange,
  onUpload,
}: Props) {
  const [missions, setMissions] = useState<MissionPracticeEntry[]>(() =>
    initialMissions.map((entry, index) => normalizeMissionEntry(entry, index))
  );

  useEffect(() => {
    const next = initialMissions.map((entry, index) => normalizeMissionEntry(entry, index));
    missionsDraftRef.current = next;
    setMissions(next);
  }, [contentVersion, initialMissions, missionsDraftRef]);

  useEffect(() => {
    onChange(missions);
  }, [missions, onChange]);

  function patchMission(index: number, patch: Partial<MissionPracticeEntry>) {
    setMissions((current) => {
      const next = current.map((mission, missionIndex) => {
        if (missionIndex !== index) {
          if (patch.isFeatured) return { ...mission, isFeatured: false };
          return mission;
        }
        const merged = { ...mission, ...patch };
        if (patch.title && !patch.id) {
          merged.id = slugifyMissionId(patch.title, mission.id);
        }
        return normalizeMissionEntry(merged, missionIndex);
      });
      missionsDraftRef.current = next;
      return next;
    });
  }

  function patchPhoto(
    missionIndex: number,
    field: MissionPhotoField,
    photoIndex: number,
    patch: Partial<CmsImage>,
  ) {
    setMissions((current) => {
      const next = current.map((mission, idx) => {
        if (idx !== missionIndex) return mission;
        const photos = padPhotos(mission[field]).map((photo, pIdx) =>
          pIdx === photoIndex ? { ...photo, ...patch } : photo,
        );
        return normalizeMissionEntry({ ...mission, [field]: photos }, idx);
      });
      missionsDraftRef.current = next;
      return next;
    });
  }

  async function uploadPhoto(
    missionIndex: number,
    field: MissionPhotoField,
    photoIndex: number,
    input: HTMLInputElement,
  ) {
    const file = input.files?.[0];
    if (!file) return;
    const url = await onUpload(file);
    if (!url) return;
    const altFallback =
      field === "venuePhotos"
        ? `Centro de operaciones — foto ${photoIndex + 1}`
        : field === "lodgingPhotos"
          ? `Hospedaje — foto ${photoIndex + 1}`
          : `Misión — foto ${photoIndex + 1}`;
    patchPhoto(missionIndex, field, photoIndex, {
      src: url,
      alt: missions[missionIndex]?.[field][photoIndex]?.alt || altFallback,
    });
    input.value = "";
  }

  function addMission() {
    setMissions((current) => {
      const next = [
        ...current,
        normalizeMissionEntry(
          {
            title: `Nueva misión ${current.length + 1}`,
            category: "otro",
            isFeatured: current.length === 0,
          },
          current.length,
        ),
      ];
      missionsDraftRef.current = next;
      return next;
    });
  }

  function removeMission(index: number) {
    setMissions((current) => {
      const next = current.filter((_, missionIndex) => missionIndex !== index);
      missionsDraftRef.current = next;
      return next;
    });
  }

  return (
    <div className="admin-missions-editor">
      <div className="admin-missions-toolbar">
        <p className="admin-hint">
          Cada misión puede tener hasta 6 fotos. Marca una sola como &quot;Próxima misión&quot;. Listado público en{" "}
          <code>/misiones-quiropracticas</code>.
        </p>
        <button type="button" className="admin-btn-secondary admin-btn-secondary--prominent" onClick={addMission}>
          + Añadir nueva misión
        </button>
      </div>

      {missions.map((mission, index) => (
        <details className="admin-mission-card" key={mission.id} open={index === 0}>
          <summary>
            <strong>{mission.title || `Misión ${index + 1}`}</strong>
            {mission.isFeatured ? " · Próxima" : ""}
          </summary>

          <label>ID (URL)</label>
          <input value={mission.id} onChange={(e) => patchMission(index, { id: e.target.value })} />

          <label>Título</label>
          <input value={mission.title} onChange={(e) => patchMission(index, { title: e.target.value })} />

          <label>Tipo (etiqueta roja en la tarjeta)</label>
          <input
            value={mission.typeLabel}
            placeholder="Ej. Colegios y centros educativos"
            onChange={(e) => patchMission(index, { typeLabel: e.target.value })}
          />
          <p className="admin-hint">Texto libre: es la frase corta roja que aparece arriba del título de la misión.</p>

          <label>Fecha de la misión</label>
          <div className="admin-mission-date-row">
            <input
              value={mission.eventDate}
              placeholder="2027-03-20 (opcional)"
              onChange={(e) => patchMission(index, { eventDate: e.target.value })}
            />
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={() => patchMission(index, { eventDate: "" })}
            >
              Sin fecha por ahora
            </button>
          </div>
          <p className="admin-hint">
            Deja vacío o pulsa «Sin fecha por ahora» → en la web se verá «Fecha por confirmar». Cuando la tengas, usa
            formato 2027-03-20.
          </p>

          <label>Lugar</label>
          <input value={mission.location} onChange={(e) => patchMission(index, { location: e.target.value })} />

          <label>Resumen corto</label>
          <textarea
            rows={2}
            value={mission.summary}
            onChange={(e) => patchMission(index, { summary: e.target.value })}
          />

          <label>Relato (un párrafo por línea)</label>
          <textarea
            rows={4}
            value={mission.paragraphs.join("\n")}
            onChange={(e) =>
              patchMission(index, {
                paragraphs: e.target.value.split("\n").map((line) => line.trim()).filter(Boolean),
              })
            }
          />

          <label className="admin-check">
            <input
              type="checkbox"
              checked={mission.isFeatured}
              onChange={(e) => patchMission(index, { isFeatured: e.target.checked })}
            />
            Destacar como próxima misión en el listado
          </label>

          <p className="admin-hint">
            El inglés del sitio se genera solo al pulsar EN arriba en la web (traducciones del proyecto). Aquí solo
            editas español.
          </p>

          <AdminMissionPhotoFields
            title="1. La misión en imágenes (actividad)"
            hint="Qué se hizo en la jornada. Carrusel compacto si hay varias; una sola si subes una."
            missionIndex={index}
            field="photos"
            photos={mission.photos}
            onPatch={patchPhoto}
            onUpload={uploadPhoto}
          />
          <AdminMissionPhotoFields
            title="2. Centro de operaciones"
            hint="Empresa, sede o punto de encuentro del equipo (no el escenario de la jornada; eso va en actividad)."
            missionIndex={index}
            field="venuePhotos"
            photos={mission.venuePhotos}
            onPatch={patchPhoto}
            onUpload={uploadPhoto}
          />
          <AdminMissionPhotoFields
            title="3. Hospedaje y logística"
            hint="Hotel, casa, transporte o detalles para quienes viajan a apoyar la misión."
            missionIndex={index}
            field="lodgingPhotos"
            photos={mission.lodgingPhotos}
            onPatch={patchPhoto}
            onUpload={uploadPhoto}
          />

          <button type="button" className="admin-btn-danger" onClick={() => removeMission(index)}>
            Eliminar misión
          </button>
        </details>
      ))}

      <button type="button" className="admin-btn-secondary" onClick={addMission}>
        + Añadir otra misión
      </button>
    </div>
  );
}
