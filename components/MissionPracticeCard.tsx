"use client";

import MissionPhotoAlbums from "@/components/MissionPhotoAlbums";
import type { Locale } from "@/lib/i18n/locale";
import {
  formatMissionDateLabel,
  hasScheduledMissionDate,
  isMissionDatePending,
  missionGalleryPhotos,
  missionTypeLabel,
  missionLodgingPhotos,
  missionVenuePhotos,
} from "@/lib/cms/mission-practice";
import type { MissionPracticeEntry } from "@/lib/cms/types";
import { buildMissionWaUrl } from "@/lib/site";

type Props = {
  mission: MissionPracticeEntry;
  locale?: Locale;
  featured?: boolean;
  waLabel: string;
  upcomingLabel: string;
};

export default function MissionPracticeCard({
  mission,
  locale = "es",
  featured = false,
  waLabel,
  upcomingLabel,
}: Props) {
  const activityPhotos = missionGalleryPhotos(mission);
  const venuePhotos = missionVenuePhotos(mission);
  const lodgingPhotos = missionLodgingPhotos(mission);
  const hasAnyPhotos = activityPhotos.length + venuePhotos.length + lodgingPhotos.length > 0;
  const typeLabel = missionTypeLabel(mission, locale);
  const dateLabel = formatMissionDateLabel(mission.eventDate, locale);
  const datePending = isMissionDatePending(mission.eventDate);
  const dateScheduled = hasScheduledMissionDate(mission.eventDate);

  return (
    <article
      className={`mision-entry${featured ? " mision-entry--featured" : ""}`}
      id={mission.id}
      aria-labelledby={`${mission.id}-title`}
    >
      {featured ? (
        <p className="mision-entry-badge">{upcomingLabel}</p>
      ) : null}

      <header className="mision-entry-head">
        {typeLabel ? <span className="mision-entry-category">{typeLabel}</span> : null}
        <h2 className="mision-entry-title" id={`${mission.id}-title`}>
          {mission.title}
        </h2>
        <p className="mision-entry-meta">
          {dateScheduled ? (
            <time dateTime={mission.eventDate.trim()}>{dateLabel}</time>
          ) : (
            <span className={`mision-entry-date${datePending ? " mision-entry-date--pending" : ""}`}>
              {dateLabel}
            </span>
          )}
          {mission.location ? (
            <>
              {" · "}
              <span>{mission.location}</span>
            </>
          ) : null}
        </p>
        {mission.summary ? <p className="mision-entry-summary">{mission.summary}</p> : null}
      </header>

      {mission.paragraphs.length > 0 ? (
        <div className="section-prose mision-entry-prose">
          {mission.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
        </div>
      ) : null}

      {hasAnyPhotos ? (
        <MissionPhotoAlbums
          missionTitle={mission.title}
          activity={activityPhotos}
          venue={venuePhotos}
          lodging={lodgingPhotos}
          locale={locale}
        />
      ) : (
        <div className="mision-practica-gallery-placeholder" aria-hidden="true">
          <span>{locale === "en" ? "Photos coming soon" : "Fotos próximamente"}</span>
        </div>
      )}

      <div className="mision-entry-cta">
        <a
          href={buildMissionWaUrl({
            title: mission.title,
            location: mission.location,
            eventDate: dateLabel,
            categoryLabel: typeLabel,
          })}
          className="btn btn--primary btn-wa"
          target="_blank"
          rel="noopener noreferrer"
        >
          {waLabel}
        </a>
      </div>
    </article>
  );
}
