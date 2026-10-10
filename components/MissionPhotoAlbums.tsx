"use client";

import MissionPracticeGallery, { MISSION_GALLERY_AUTO_MS } from "@/components/MissionPracticeGallery";
import { MISSION_GALLERY_UI_EN, MISSION_GALLERY_UI_ES } from "@/lib/i18n/content-en";
import type { Locale } from "@/lib/i18n/locale";
import type { CmsImage } from "@/lib/cms/types";
import { useCallback, useEffect, useMemo, useState } from "react";

type Album = {
  id: string;
  title: string;
  photos: CmsImage[];
};

type Props = {
  missionTitle: string;
  activity: CmsImage[];
  venue: CmsImage[];
  lodging: CmsImage[];
  locale?: Locale;
};

export default function MissionPhotoAlbums({ missionTitle, activity, venue, lodging, locale = "es" }: Props) {
  const ui = locale === "en" ? MISSION_GALLERY_UI_EN : MISSION_GALLERY_UI_ES;

  const albums: Album[] = useMemo(
    () =>
      [
        { id: "activity", title: ui.activity, photos: activity },
        { id: "venue", title: ui.venue, photos: venue },
        { id: "lodging", title: ui.lodging, photos: lodging },
      ].filter((album) => album.photos.length > 0),
    [activity, venue, lodging, ui.activity, ui.lodging, ui.venue],
  );

  const albumsKey = useMemo(
    () => albums.map((a) => `${a.id}:${a.photos.map((p) => p.src).join(",")}`).join("|"),
    [albums],
  );

  const [syncTick, setSyncTick] = useState(0);
  const [paused, setPaused] = useState(false);

  const hasMultiSlide = albums.some((a) => a.photos.length > 1);

  useEffect(() => {
    setSyncTick(0);
  }, [albumsKey]);

  useEffect(() => {
    if (!hasMultiSlide || paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const timer = window.setInterval(() => {
      setSyncTick((t) => t + 1);
    }, MISSION_GALLERY_AUTO_MS);

    return () => window.clearInterval(timer);
  }, [hasMultiSlide, paused, albumsKey]);

  const onSyncStep = useCallback((delta: number) => {
    setSyncTick((t) => t + delta);
  }, []);

  const onSyncGoTo = useCallback((slideIndex: number, count: number) => {
    setSyncTick((t) => {
      const current = count ? ((t % count) + count) % count : 0;
      return t + (slideIndex - current);
    });
  }, []);

  if (!albums.length) {
    return (
      <div className="mision-practica-gallery-placeholder" aria-hidden="true">
        <span>{ui.comingSoon}</span>
      </div>
    );
  }

  const sync =
    hasMultiSlide
      ? {
          syncTick,
          onSyncStep,
          onSyncGoTo,
          pauseSync: paused,
        }
      : undefined;

  return (
    <div
      className={`mision-entry-galleries${albums.length > 1 ? " mision-entry-galleries--multi" : ""}`}
      aria-label={ui.regionLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {albums.map((album) => (
        <section key={album.id} className="mision-gallery-block" aria-labelledby={`${album.id}-heading`}>
          <h3 className="mision-gallery-block-title" id={`${album.id}-heading`}>
            {album.title}
          </h3>
          <MissionPracticeGallery
            photos={album.photos}
            locale={locale}
            ariaLabel={`${album.title} — ${missionTitle}`}
            className="mision-entry-gallery"
            sync={sync}
          />
        </section>
      ))}
    </div>
  );
}
