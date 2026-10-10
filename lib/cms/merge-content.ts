import { DEFAULT_SITE_CONTENT } from "@/lib/cms/defaults";
import { normalizeMisiones, normalizeVisionMision, type LegacyVision } from "@/lib/cms/normalize-legacy";
import type { SiteContent, VisionMisionContent } from "@/lib/cms/types";

function pickParagraphs(value: string[] | undefined, fallback: string[]) {
  return value?.length ? value : fallback;
}

export function mergeSiteContent(content: Partial<SiteContent> | null): SiteContent {
  if (!content) return structuredClone(DEFAULT_SITE_CONTENT);

  return {
    ...DEFAULT_SITE_CONTENT,
    ...content,
    hero: { ...DEFAULT_SITE_CONTENT.hero, ...content.hero },
    visionMision: normalizeVisionMision(
      content.visionMision ??
        (content as Partial<SiteContent> & { vision?: Partial<VisionMisionContent> | LegacyVision }).vision
    ),
    misiones: normalizeMisiones(content.misiones),
    googleReviews: {
      ...DEFAULT_SITE_CONTENT.googleReviews,
      ...content.googleReviews,
      items: content.googleReviews?.items?.length
        ? content.googleReviews.items
        : DEFAULT_SITE_CONTENT.googleReviews.items,
    },
    causa: {
      ...DEFAULT_SITE_CONTENT.causa,
      ...content.causa,
      paragraphs: pickParagraphs(content.causa?.paragraphs, DEFAULT_SITE_CONTENT.causa.paragraphs),
      steps: content.causa?.steps?.length ? content.causa.steps : DEFAULT_SITE_CONTENT.causa.steps,
    },
    especialidad: {
      ...DEFAULT_SITE_CONTENT.especialidad,
      ...content.especialidad,
      symptoms: content.especialidad?.symptoms?.length
        ? content.especialidad.symptoms
        : DEFAULT_SITE_CONTENT.especialidad.symptoms,
    },
    metodo: {
      ...DEFAULT_SITE_CONTENT.metodo,
      ...content.metodo,
      paragraphs: pickParagraphs(content.metodo?.paragraphs, DEFAULT_SITE_CONTENT.metodo.paragraphs),
      pillars: content.metodo?.pillars?.length ? content.metodo.pillars : DEFAULT_SITE_CONTENT.metodo.pillars,
    },
    nosotros: {
      ...DEFAULT_SITE_CONTENT.nosotros,
      ...content.nosotros,
      paragraphs: pickParagraphs(content.nosotros?.paragraphs, DEFAULT_SITE_CONTENT.nosotros.paragraphs),
      badges: content.nosotros?.badges?.length ? content.nosotros.badges : DEFAULT_SITE_CONTENT.nosotros.badges,
    },
    redes: {
      ...DEFAULT_SITE_CONTENT.redes,
      ...content.redes,
      clinic: { ...DEFAULT_SITE_CONTENT.redes.clinic, ...content.redes?.clinic },
      doctor: { ...DEFAULT_SITE_CONTENT.redes.doctor, ...content.redes?.doctor },
    },
    contactPage: { ...DEFAULT_SITE_CONTENT.contactPage, ...content.contactPage },
    contact: { ...DEFAULT_SITE_CONTENT.contact, ...content.contact },
    images: { ...DEFAULT_SITE_CONTENT.images, ...content.images },
  };
}
