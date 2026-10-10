import type { ContactContent, GoogleReviewsContent, HeroContent } from "@/lib/content";

export type CmsImage = {
  src: string;
  alt: string;
};

export type CmsSectionBlock = {
  tag: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  image?: CmsImage;
};

export type VisionMisionBlock = {
  /** Etiqueta pequeña (p. ej. «Visión») */
  title: string;
  /** Título visible de la zona (opcional; si falta, se usa title) */
  heading?: string;
  statement: string;
  paragraphs: string[];
  image?: CmsImage;
};

/** Visión y misión: dos zonas breves, una tras otra */
export type VisionMisionContent = {
  vision: VisionMisionBlock;
  mision: VisionMisionBlock;
};

/** @deprecated Solo migración desde CMS antiguo con tarjetas numeradas */
export type MissionItem = {
  title: string;
  text: string;
  image?: CmsImage;
};

export type MissionCategory = "colegio" | "carcel" | "iglesia" | "comunidad" | "formacion" | "otro";

/** Una misión de práctica (colegio, cárcel, iglesia, etc.) */
export type MissionPracticeEntry = {
  id: string;
  title: string;
  /** @deprecated Solo filtro interno; usar typeLabel en admin */
  category: MissionCategory;
  /** Etiqueta roja sobre el título (texto libre) */
  typeLabel: string;
  /** ISO (2027-06-15) o texto libre para mostrar */
  eventDate: string;
  location: string;
  summary: string;
  paragraphs: string[];
  /** Actividad de la misión — qué se hizo (hasta 6; vacío = sin imagen) */
  photos: CmsImage[];
  /** Lugar / sede donde se realiza la misión */
  venuePhotos: CmsImage[];
  /** Hospedaje, logística y confianza para quienes viajan */
  lodgingPhotos: CmsImage[];
  /** Destacar como “próxima misión” en landing y archivo */
  isFeatured: boolean;
  /** Textos en inglés (opcional; si faltan, se usa overlay por id o español) */
  titleEn?: string;
  typeLabelEn?: string;
  summaryEn?: string;
  locationEn?: string;
  paragraphsEn?: string[];
};

/** Bloque fijo en landing: formación / arte quiropráctico (no es misión de práctica) */
export type MisionesArteBlock = {
  tag: string;
  title: string;
  paragraphs: string[];
  image: CmsImage;
  tagEn?: string;
  titleEn?: string;
  paragraphsEn?: string[];
};

/** Misiones de práctica: intro en landing + listado en /misiones-quiropracticas */
export type MisionesContent = {
  tag: string;
  title: string;
  lead?: string;
  paragraphs: string[];
  archiveCtaLabel: string;
  /** Foto opcional junto al texto introductorio en el home */
  introImage: CmsImage;
  /** @deprecated Galería legacy en landing; usar missions[] */
  photos: CmsImage[];
  ctaLabel: string;
  /** Desarrollo del arte quiropráctico — solo en la sección del home */
  arte: MisionesArteBlock;
  /** Encabezado de /misiones-quiropracticas (solo misiones de territorio) */
  archiveTitle: string;
  archiveLead?: string;
  archiveParagraphs: string[];
  /** Ilustración o foto junto al encabezado de /misiones-quiropracticas */
  archiveImage: CmsImage;
  missions: MissionPracticeEntry[];
};

export type CmsIconItem = {
  icon: string;
  title: string;
  text: string;
};

export type CmsStepItem = {
  icon: string;
  num: string;
  title: string;
  text: string;
};

export type CmsBadgeItem = {
  icon: string;
  value: string;
  label: string;
};

export type CausaContent = {
  tag: string;
  title: string;
  paragraphs: string[];
  figcaption: string;
  steps: CmsStepItem[];
};

export type EspecialidadContent = {
  tag: string;
  title: string;
  lead: string;
  symptoms: CmsIconItem[];
  ctaLabel: string;
};

export type MetodoContent = {
  tag: string;
  title: string;
  paragraphs: string[];
  pillars: CmsIconItem[];
};

export type NosotrosContent = {
  tag: string;
  title: string;
  paragraphs: string[];
  badges: CmsBadgeItem[];
};

export type RedesProfileContent = {
  title: string;
  handle: string;
  url: string;
  avatar: string;
  bullets: string[];
  buttonLabel: string;
};

export type RedesContent = {
  tag: string;
  title: string;
  lead: string;
  clinic: RedesProfileContent;
  doctor: RedesProfileContent;
};

export type ContactPageContent = {
  tag: string;
  title: string;
  lead: string;
  mapTitle: string;
  mapAddress: string;
  mapButtonLabel: string;
};

export type SiteImages = {
  hero: string;
  causa: string;
  metodo: string;
  nosotros: string;
  logo: string;
};

export type SiteContent = {
  version: number;
  updatedAt: string;
  hero: HeroContent;
  visionMision: VisionMisionContent;
  misiones: MisionesContent;
  googleReviews: GoogleReviewsContent;
  causa: CausaContent;
  especialidad: EspecialidadContent;
  metodo: MetodoContent;
  nosotros: NosotrosContent;
  redes: RedesContent;
  contactPage: ContactPageContent;
  contact: ContactContent;
  images: SiteImages;
};
