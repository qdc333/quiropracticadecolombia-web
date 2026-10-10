import type { Locale } from "@/lib/i18n/locale";
import { MISIONES_ARTE_UI_EN, MISIONES_ARTE_UI_ES } from "@/lib/i18n/content-en";
import type { MisionesArteBlock } from "@/lib/cms/types";

type Props = {
  arte: MisionesArteBlock;
  locale?: Locale;
};

export default function MisionesArtePanel({ arte, locale = "es" }: Props) {
  const ui = locale === "en" ? MISIONES_ARTE_UI_EN : MISIONES_ARTE_UI_ES;
  const src = arte.image.src?.trim();

  return (
    <article className="mision-arte reveal" aria-labelledby="mision-arte-title">
      <div className="mision-arte-grid">
        <div className="mision-arte-copy">
          <span className="section-tag">{arte.tag}</span>
          <h3 className="mision-arte-title" id="mision-arte-title">
            {arte.title}
          </h3>
          <div className="section-prose mision-arte-prose">
            {arte.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>
        </div>
        <figure className="mision-arte-media">
          {src ? (
            <img src={src} alt={arte.image.alt || ui.photoAltFallback} width={640} height={480} loading="lazy" />
          ) : (
            <div className="mision-arte-media-placeholder" role="img" aria-label={arte.image.alt || ui.photoPlaceholder}>
              {ui.photoPlaceholder}
            </div>
          )}
        </figure>
      </div>
    </article>
  );
}
