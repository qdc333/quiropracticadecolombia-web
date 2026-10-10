import { localizeMissionList, type MissionEnOverlay } from "@/lib/cms/mission-practice";
import { ENGLISH_SITE_OVERLAY } from "@/lib/i18n/content-en";

import type { Locale } from "@/lib/i18n/locale";

import type { SiteContent } from "@/lib/cms/types";

import type { GoogleReviewItem } from "@/lib/content";



function mergePartial<T extends object>(base: T, overlay: Record<string, unknown> | undefined): T {

  if (!overlay) return base;

  return { ...base, ...overlay } as T;

}



function mergeRedesProfile(

  base: SiteContent["redes"]["clinic"],

  overlay: Record<string, unknown> | undefined,

) {

  if (!overlay) return base;

  const bullets = overlay.bullets as string[] | undefined;

  return {

    ...base,

    title: (overlay.title as string | undefined) ?? base.title,

    handle: (overlay.handle as string | undefined) ?? base.handle,

    buttonLabel: (overlay.buttonLabel as string | undefined) ?? base.buttonLabel,

    bullets: bullets?.length ? bullets : base.bullets,

    url: base.url,

    avatar: base.avatar,

  };

}



function mergeReviewItems(base: GoogleReviewItem[], overlay: GoogleReviewItem[] | undefined): GoogleReviewItem[] {

  if (!overlay?.length) return base;

  return base.map((item, index) => {

    const translated = overlay[index];

    if (!translated) return item;

    return {

      author: item.author,

      rating: item.rating,

      text: translated.text || item.text,

    };

  });

}



export function localizeSiteContent(content: SiteContent, locale: Locale): SiteContent {

  if (locale === "es") return content;



  const en = ENGLISH_SITE_OVERLAY;



  return {

    ...content,

    hero: mergePartial(content.hero, en.hero),

    visionMision: {

      vision: mergePartial(content.visionMision.vision, en.visionMision?.vision),

      mision: mergePartial(content.visionMision.mision, en.visionMision?.mision),

    },

    causa: {

      ...mergePartial(content.causa, en.causa),

      steps: (en.causa?.steps as SiteContent["causa"]["steps"] | undefined) ?? content.causa.steps,

      paragraphs: (en.causa?.paragraphs as string[] | undefined) ?? content.causa.paragraphs,

    },

    misiones: {

      ...content.misiones,

      tag: en.misiones?.tag ?? content.misiones.tag,

      title: en.misiones?.title ?? content.misiones.title,

      lead: en.misiones?.lead ?? content.misiones.lead,

      archiveCtaLabel: en.misiones?.archiveCtaLabel ?? content.misiones.archiveCtaLabel,

      ctaLabel: en.misiones?.ctaLabel ?? content.misiones.ctaLabel,

      paragraphs:

        (en.misiones?.paragraphs as string[] | undefined)?.filter(Boolean) ?? content.misiones.paragraphs,

      arte: {
        ...content.misiones.arte,
        tag:
          (en.misiones?.arte as { tag?: string } | undefined)?.tag ??
          content.misiones.arte.tagEn ??
          content.misiones.arte.tag,
        title:
          (en.misiones?.arte as { title?: string } | undefined)?.title ??
          content.misiones.arte.titleEn ??
          content.misiones.arte.title,
        paragraphs:
          (en.misiones?.arte as { paragraphs?: string[] } | undefined)?.paragraphs ??
          content.misiones.arte.paragraphsEn ??
          content.misiones.arte.paragraphs,
        image: {
          ...content.misiones.arte.image,
          alt:
            (en.misiones?.arte as { image?: { alt?: string } } | undefined)?.image?.alt ??
            content.misiones.arte.image.alt,
        },
      },

      archiveTitle:
        (en.misiones as { archiveTitle?: string } | undefined)?.archiveTitle ?? content.misiones.archiveTitle,

      archiveLead:
        (en.misiones as { archiveLead?: string } | undefined)?.archiveLead ?? content.misiones.archiveLead,

      archiveParagraphs:
        (en.misiones as { archiveParagraphs?: string[] } | undefined)?.archiveParagraphs ??
        content.misiones.archiveParagraphs,

      introImage: {
        ...content.misiones.introImage,
        alt:
          (en.misiones as { introImage?: { alt?: string } } | undefined)?.introImage?.alt ??
          content.misiones.introImage.alt,
      },

      archiveImage: {
        ...content.misiones.archiveImage,
        alt:
          (en.misiones as { archiveImage?: { alt?: string } } | undefined)?.archiveImage?.alt ??
          content.misiones.archiveImage.alt,
      },

      missions: localizeMissionList(
        content.misiones.missions,
        en.misiones?.missions as MissionEnOverlay[] | undefined,
      ),

    },

    especialidad: mergePartial(content.especialidad, en.especialidad),

    metodo: {

      ...content.metodo,

      ...en.metodo,

      pillars: (en.metodo?.pillars as SiteContent["metodo"]["pillars"] | undefined) ?? content.metodo.pillars,

      paragraphs: (en.metodo?.paragraphs as string[] | undefined) ?? content.metodo.paragraphs,

    },

    nosotros: {

      ...mergePartial(content.nosotros, en.nosotros),

      paragraphs: (en.nosotros?.paragraphs as string[] | undefined) ?? content.nosotros.paragraphs,

      badges: (en.nosotros?.badges as SiteContent["nosotros"]["badges"] | undefined) ?? content.nosotros.badges,

    },

    redes: {

      ...mergePartial(content.redes, en.redes),

      clinic: mergeRedesProfile(content.redes.clinic, en.redes?.clinic),

      doctor: mergeRedesProfile(content.redes.doctor, en.redes?.doctor),

    },

    googleReviews: {

      ...content.googleReviews,

      items: mergeReviewItems(content.googleReviews.items, en.googleReviews?.items as GoogleReviewItem[] | undefined),

    },

    contactPage: mergePartial(content.contactPage, en.contactPage),

    contact: mergePartial(content.contact, en.contact),

  };

}


