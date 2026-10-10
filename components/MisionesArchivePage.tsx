"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MissionPracticeCard from "@/components/MissionPracticeCard";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { useLocale } from "@/components/LocaleProvider";
import { MISIONES_ARCHIVE_UI_EN, MISIONES_ARCHIVE_UI_ES } from "@/lib/i18n/content-en";
import { localizeSiteContent } from "@/lib/i18n/localize-content";
import { pickFeaturedMission, sortMissionsForArchive } from "@/lib/cms/mission-practice";
import type { SiteContent } from "@/lib/cms/types";
import { useLiveSiteContent } from "@/hooks/useLiveSiteContent";
import Link from "next/link";
import { useMemo } from "react";

type Props = {
  initialContent: SiteContent;
};

export default function MisionesArchivePage({ initialContent }: Props) {
  const { locale } = useLocale();
  const live = useLiveSiteContent(initialContent);
  const site = useMemo(() => localizeSiteContent(live, locale), [live, locale]);
  const ui = locale === "en" ? MISIONES_ARCHIVE_UI_EN : MISIONES_ARCHIVE_UI_ES;
  const { misiones, contact, images, redes } = site;
  const featured = pickFeaturedMission(misiones.missions);
  const ordered = sortMissionsForArchive(misiones.missions);
  const archiveSrc = misiones.archiveImage?.src?.trim();

  return (
    <>
      <Header />
      <WhatsAppFloat />

      <main className="mision-archive-page">
        <section className="section section--white mision-archive-hero" aria-labelledby="mision-archive-title">
          <div className="container">
            <Link href="/#misiones-quiropracticas" className="mision-archive-back">
              {ui.backToHome}
            </Link>
            <div className={`mision-archive-hero-grid${archiveSrc ? " mision-archive-hero-grid--with-image" : ""}`}>
              <div className="mision-archive-hero-copy">
                <span className="section-tag">{misiones.tag}</span>
                <h1 id="mision-archive-title">{misiones.archiveTitle}</h1>
                {misiones.archiveLead ? (
                  <p className="section-lead section-lead--wide">{misiones.archiveLead}</p>
                ) : null}
                {misiones.archiveParagraphs.length > 0 ? (
                  <div className="section-prose mision-archive-intro">
                    {misiones.archiveParagraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}
              </div>
              {archiveSrc ? (
                <figure className="mision-archive-hero-figure">
                  <img
                    src={archiveSrc}
                    alt={misiones.archiveImage.alt}
                    width={640}
                    height={480}
                    loading="eager"
                    fetchPriority="high"
                  />
                </figure>
              ) : null}
            </div>
          </div>
        </section>

        <section className="section section--tint mision-archive-list" aria-label={ui.listAria}>
          <div className="container mision-archive-stack">
            {ordered.map((mission) => (
              <MissionPracticeCard
                key={mission.id}
                mission={mission}
                locale={locale}
                featured={featured?.id === mission.id}
                waLabel={ui.missionWa}
                upcomingLabel={ui.upcomingBadge}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer contact={contact} logoSrc={images.logo} redes={redes} />
    </>
  );
}
