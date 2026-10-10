"use client";

import type { CmsImage } from "@/lib/cms/types";
import type { Locale } from "@/lib/i18n/locale";
import { useCallback, useEffect, useMemo, useState } from "react";

export const MISSION_GALLERY_AUTO_MS = 3000;

type SyncProps = {
  /** Índice compartido entre álbumes (cada galería usa syncTick % count) */
  syncTick: number;
  onSyncStep: (delta: number) => void;
  onSyncGoTo: (slideIndex: number, count: number) => void;
  pauseSync?: boolean;
};

type Props = {
  photos: CmsImage[];
  className?: string;
  ariaLabel?: string;
  locale?: Locale;
  sync?: SyncProps;
};

export default function MissionPracticeGallery({
  photos,
  className = "",
  ariaLabel,
  locale = "es",
  sync,
}: Props) {
  const gallery = useMemo(() => photos.filter((photo) => photo.src.trim()), [photos]);
  const galleryKey = useMemo(() => gallery.map((p) => p.src).join("|"), [gallery]);
  const [localIndex, setLocalIndex] = useState(0);
  const [localPaused, setLocalPaused] = useState(false);

  const count = gallery.length;
  const synced = sync !== undefined;
  const index = synced
    ? count
      ? ((sync!.syncTick % count) + count) % count
      : 0
    : localIndex;
  const paused = synced ? Boolean(sync!.pauseSync) : localPaused;

  const ui =
    locale === "en"
      ? { prev: "Previous photo", next: "Next photo", slide: (i: number) => `Photo ${i + 1} of ${count}` }
      : { prev: "Foto anterior", next: "Foto siguiente", slide: (i: number) => `Foto ${i + 1} de ${count}` };

  const go = useCallback(
    (delta: number) => {
      if (synced) {
        sync!.onSyncStep(delta);
        return;
      }
      setLocalIndex((current) => (current + delta + count) % count);
    },
    [count, sync, synced],
  );

  const goTo = useCallback(
    (slideIndex: number) => {
      if (synced) {
        sync!.onSyncGoTo(slideIndex, count);
        return;
      }
      setLocalIndex(slideIndex);
    },
    [count, sync, synced],
  );

  useEffect(() => {
    setLocalIndex(0);
  }, [galleryKey]);

  useEffect(() => {
    if (synced || count <= 1 || localPaused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setLocalIndex((current) => (current + 1) % count);
    }, MISSION_GALLERY_AUTO_MS);

    return () => window.clearInterval(timer);
  }, [count, localPaused, galleryKey, synced]);

  if (!count) return null;

  const wrapClass = `mision-gallery-wrap${className ? ` ${className}` : ""}`;

  if (count === 1) {
    const photo = gallery[0];
    return (
      <figure className={`${wrapClass} mision-gallery-single`} aria-label={ariaLabel}>
        <img src={photo.src} alt={photo.alt} width={640} height={480} loading="lazy" />
      </figure>
    );
  }

  const pauseHandlers = synced
    ? {}
    : {
        onMouseEnter: () => setLocalPaused(true),
        onMouseLeave: () => setLocalPaused(false),
        onFocusCapture: () => setLocalPaused(true),
        onBlurCapture: (e: React.FocusEvent) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setLocalPaused(false);
        },
      };

  return (
    <div
      className={`${wrapClass} mision-gallery-carousel`}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      {...pauseHandlers}
    >
      <div className="mision-gallery-carousel-viewport">
        <ul
          className="mision-gallery-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {gallery.map((photo) => (
            <li key={photo.src} className="mision-gallery-carousel-slide">
              <figure className="mision-practica-photo">
                <img src={photo.src} alt={photo.alt} width={640} height={480} loading="lazy" />
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <div className="mision-gallery-carousel-footer">
        <button type="button" className="mision-gallery-carousel-nav" onClick={() => go(-1)} aria-label={ui.prev}>
          ‹
        </button>
        <div className="mision-gallery-carousel-dots" role="tablist" aria-label={ariaLabel}>
          {gallery.map((photo, dotIndex) => (
            <button
              key={photo.src}
              type="button"
              role="tab"
              aria-selected={dotIndex === index}
              aria-label={ui.slide(dotIndex)}
              className={`mision-gallery-carousel-dot${dotIndex === index ? " is-active" : ""}`}
              onClick={() => goTo(dotIndex)}
            />
          ))}
        </div>
        <button type="button" className="mision-gallery-carousel-nav" onClick={() => go(1)} aria-label={ui.next}>
          ›
        </button>
      </div>
    </div>
  );
}
