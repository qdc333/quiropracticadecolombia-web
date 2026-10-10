"use client";

import type { CmsImage } from "@/lib/cms/types";
import { MISSION_PHOTO_SLOTS } from "@/lib/cms/mission-practice";

export type MissionPhotoField = "photos" | "venuePhotos" | "lodgingPhotos";

type Props = {
  title: string;
  hint: string;
  missionIndex: number;
  field: MissionPhotoField;
  photos: CmsImage[];
  onPatch: (missionIndex: number, field: MissionPhotoField, photoIndex: number, patch: Partial<CmsImage>) => void;
  onUpload: (missionIndex: number, field: MissionPhotoField, photoIndex: number, input: HTMLInputElement) => void;
};

function padPhotos(photos: CmsImage[]): CmsImage[] {
  const next = photos.slice(0, MISSION_PHOTO_SLOTS).map((p) => ({ src: p.src || "", alt: p.alt || "" }));
  while (next.length < MISSION_PHOTO_SLOTS) next.push({ src: "", alt: "" });
  return next;
}

export default function AdminMissionPhotoFields({
  title,
  hint,
  missionIndex,
  field,
  photos,
  onPatch,
  onUpload,
}: Props) {
  return (
    <div className="admin-mission-photos">
      <strong>{title}</strong>
      <p className="admin-hint">{hint}</p>
      {padPhotos(photos).map((photo, photoIndex) => (
        <div className="admin-mission-photo-row" key={`${field}-${photoIndex}`}>
          <span>Foto {photoIndex + 1}</span>
          <input
            value={photo.src}
            placeholder="/images/cms/..."
            onChange={(e) => onPatch(missionIndex, field, photoIndex, { src: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => onUpload(missionIndex, field, photoIndex, e.currentTarget)}
          />
          <input
            value={photo.alt}
            placeholder="Texto alternativo"
            onChange={(e) => onPatch(missionIndex, field, photoIndex, { alt: e.target.value })}
          />
        </div>
      ))}
    </div>
  );
}
