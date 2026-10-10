"use client";

import type { CmsImage } from "@/lib/cms/types";
import { useEffect, useState } from "react";

const PHOTO_SLOTS = 3;

type Props = {
  initialPhotos: CmsImage[];
  onPhotosChange: (photos: CmsImage[]) => void;
  onUpload: (file: File) => Promise<string | null>;
};

function padPhotos(photos: CmsImage[]): CmsImage[] {
  const next = photos.slice(0, PHOTO_SLOTS).map((photo) => ({
    src: photo.src || "",
    alt: photo.alt || "",
  }));
  while (next.length < PHOTO_SLOTS) {
    next.push({ src: "", alt: "" });
  }
  return next;
}

export default function AdminMisionesFields({ initialPhotos, onPhotosChange, onUpload }: Props) {
  const [photos, setPhotos] = useState<CmsImage[]>(() => padPhotos(initialPhotos));

  useEffect(() => {
    setPhotos(padPhotos(initialPhotos));
  }, [initialPhotos]);

  useEffect(() => {
    onPhotosChange(photos);
  }, [photos, onPhotosChange]);

  function patchPhoto(index: number, patch: Partial<CmsImage>) {
    setPhotos((current) =>
      current.map((photo, photoIndex) => (photoIndex === index ? { ...photo, ...patch } : photo))
    );
  }

  async function handleFile(index: number, input: HTMLInputElement) {
    const file = input.files?.[0];
    if (!file) return;
    const url = await onUpload(file);
    if (!url) return;
    patchPhoto(index, {
      src: url,
      alt: photos[index]?.alt || `Misión quiropráctica — foto ${index + 1}`,
    });
    input.value = "";
  }

  return (
    <div className="admin-mission-list">
      <p className="admin-hint">
        Hasta 3 fotos de distintos lugares. Deja la URL vacía si aún no hay imagen; en el sitio solo se muestran
        las que tengan archivo.
      </p>

      {photos.map((photo, index) => (
        <div className="admin-mission-card" key={`mision-photo-${index}`}>
          <div className="admin-mission-card-head">
            <strong>Foto {index + 1}</strong>
          </div>

          <label htmlFor={`mision-photo-src-${index}`}>URL</label>
          <input
            id={`mision-photo-src-${index}`}
            value={photo.src}
            onChange={(event) => patchPhoto(index, { src: event.target.value })}
            placeholder="/images/cms/mision-lugar-1.jpg"
          />

          <label>Subir imagen</label>
          <input type="file" accept="image/*" onChange={(event) => handleFile(index, event.currentTarget)} />

          <label>Texto alternativo</label>
          <input
            value={photo.alt}
            onChange={(event) => patchPhoto(index, { alt: event.target.value })}
            placeholder="Ej. Misión en barrio X, Barranquilla"
          />

          {photo.src.trim() ? <img src={photo.src} alt="" className="admin-mission-preview" /> : null}
        </div>
      ))}
    </div>
  );
}
