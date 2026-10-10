import { MISIONES_INTRO_ASIDE_EN, MISIONES_INTRO_ASIDE_ES } from "@/lib/i18n/content-en";
import type { Locale } from "@/lib/i18n/locale";
import type { CmsImage } from "@/lib/cms/types";
import { Building2, Church, GraduationCap, Users } from "lucide-react";
import Link from "next/link";

const ICONS = {
  GraduationCap,
  Building2,
  Church,
  Users,
} as const;

type Props = {
  introImage: CmsImage;
  archiveCtaLabel: string;
  locale?: Locale;
};

export default function MisionesIntroAside({ introImage, archiveCtaLabel, locale = "es" }: Props) {
  const ui = locale === "en" ? MISIONES_INTRO_ASIDE_EN : MISIONES_INTRO_ASIDE_ES;
  const src = introImage.src?.trim();

  if (src) {
    return (
      <aside className="mision-intro-aside" aria-label={ui.photoAria}>
        <figure className="mision-intro-aside-photo">
          <img src={src} alt={introImage.alt || ui.photoAltFallback} width={560} height={420} loading="lazy" />
        </figure>
        <Link href="/misiones-quiropracticas" className="mision-intro-aside-cta">
          {archiveCtaLabel}
        </Link>
      </aside>
    );
  }

  return (
    <aside className="mision-intro-aside" aria-label={ui.cardAria}>
      <div className="mision-intro-aside-card">
        <p className="mision-intro-aside-kicker">{ui.kicker}</p>
        <ul className="mision-intro-aside-list">
          {ui.items.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <li key={item.href}>
                <Link href={item.href} className="mision-intro-aside-item">
                  <span className="mision-intro-aside-icon" aria-hidden>
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <p className="mision-intro-aside-note">{ui.note}</p>
        <Link href="/misiones-quiropracticas" className="mision-intro-aside-cta">
          {archiveCtaLabel}
        </Link>
      </div>
    </aside>
  );
}
