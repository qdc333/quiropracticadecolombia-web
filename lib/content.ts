import { SITE } from "@/lib/site";

export type HeroContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type ContactContent = {
  whatsapp: string;
  contactEmail: string;
  formEmail: string;
  address: string;
  mapsUrl: string;
  diagnosticoFormUrl: string;
};

export const DEFAULT_HERO: HeroContent = {
  eyebrow: "Cuidado cervical superior · Barranquilla",
  title: "¿Sufres de vértigo, migrañas o zumbidos en los oídos y los fármacos ya no funcionan?",
  subtitle:
    "Descubre la raíz neurológica de tu dolor. En Quiropráctica de Colombia no «traqueamos huesos»: liberamos tu sistema nervioso desde las vértebras cervicales para que tu cuerpo sane de forma 100% natural.",
};

export const DEFAULT_CONTACT: ContactContent = {
  whatsapp: SITE.whatsapp,
  contactEmail: SITE.contactEmail,
  formEmail: SITE.formEmail,
  address: "Centro Comercial Gabianelly, Cl. 84 #46 Local #7, 2.º piso, Barranquilla",
  mapsUrl: "https://maps.app.goo.gl/7UGYRBFWCHzx1WNH7",
  diagnosticoFormUrl: SITE.diagnosticoFormUrl,
};

export function formatPrice(amount: number, currency = "COP") {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
