import MisionesArtePanel from "@/components/MisionesArtePanel";
import MisionesIntroAside from "@/components/MisionesIntroAside";
import type { Locale } from "@/lib/i18n/locale";
import type { MisionesContent } from "@/lib/cms/types";
import { buildWaUrl } from "@/lib/site";
import Link from "next/link";

type Props = {
  content: MisionesContent;
  locale?: Locale;
};

export default function MisionesSection({ content, locale = "es" }: Props) {
  const { tag, title, lead, paragraphs, archiveCtaLabel, ctaLabel, arte, introImage } = content;

  return (
    <section className="section section--white" id="misiones-quiropracticas" aria-labelledby="misiones-title">
      <div className="container">
        <div className="mision-section-intro reveal">
          <div className="mision-section-intro-grid">
            <div className="mision-section-copy">
              <div className="section-header section-header--left">
                <span className="section-tag">{tag}</span>
                <h2 id="misiones-title">{title}</h2>
              </div>

              {lead || paragraphs.length > 0 ? (
                <div className="section-prose mision-practica-prose">
                  {lead ? <p className="mision-section-lead">{lead}</p> : null}
                  {paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                  ))}
                </div>
              ) : null}
            </div>

            <MisionesIntroAside
              introImage={introImage}
              archiveCtaLabel={archiveCtaLabel}
              locale={locale}
            />
          </div>
        </div>

        <MisionesArtePanel arte={arte} locale={locale} />

        <div className="section-cta mision-landing-actions reveal">
          <Link href="/misiones-quiropracticas" className="btn btn--primary">
            {archiveCtaLabel}
          </Link>
          <a
            href={buildWaUrl("misionPractica")}
            className="btn btn--outline btn-wa"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
