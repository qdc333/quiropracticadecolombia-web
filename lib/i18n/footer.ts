import type { Locale } from "@/lib/i18n/locale";

export type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

export type FooterColumn = {
  title: string;
  links: FooterLink[];
};

const FOOTER_UI = {
  es: {
    tagline:
      "Cuidado quiropráctico cervical superior en Barranquilla: evaluación precisa, ajustes específicos y acompañamiento para que tu cuerpo sane de forma natural.",
    columns: {
      clinic: "Clínica",
      explore: "Conoce más",
      contact: "Contacto",
      social: "Redes",
    },
    contactBook: "Agendar consulta",
    contactWhatsApp: "WhatsApp",
    contactEmail: "Correo",
    contactLocation: "Ubicación",
    backToTop: "Volver arriba",
    rights: "Todos los derechos reservados.",
  },
  en: {
    tagline:
      "Upper cervical chiropractic care in Barranquilla: precise assessment, specific adjustments, and support so your body can heal naturally.",
    columns: {
      clinic: "Clinic",
      explore: "Explore",
      contact: "Contact",
      social: "Social",
    },
    contactBook: "Book a consultation",
    contactWhatsApp: "WhatsApp",
    contactEmail: "Email",
    contactLocation: "Location",
    backToTop: "Back to top",
    rights: "All rights reserved.",
  },
} as const;

export function getFooterUi(locale: Locale) {
  return FOOTER_UI[locale];
}

export function getFooterColumns(locale: Locale): FooterColumn[] {
  const ui = getFooterUi(locale);

  if (locale === "en") {
    return [
      {
        title: ui.columns.clinic,
        links: [
          { href: "#vision", label: "Vision" },
          { href: "#mision", label: "Mission" },
          { href: "#nosotros", label: "About us" },
          { href: "#resenas", label: "Reviews" },
        ],
      },
      {
        title: ui.columns.explore,
        links: [
          { href: "#causa", label: "The cause" },
          { href: "#especialidad", label: "Specialty" },
          { href: "#metodo", label: "Method" },
          { href: "#misiones-quiropracticas", label: "Chiropractic missions" },
        ],
      },
    ];
  }

  return [
    {
      title: ui.columns.clinic,
      links: [
        { href: "#vision", label: "Visión" },
        { href: "#mision", label: "Misión" },
        { href: "#nosotros", label: "Nosotros" },
        { href: "#resenas", label: "Reseñas" },
      ],
    },
    {
      title: ui.columns.explore,
      links: [
        { href: "#causa", label: "La causa" },
        { href: "#especialidad", label: "Especialidad" },
        { href: "#metodo", label: "Método" },
        { href: "#misiones-quiropracticas", label: "Misiones quiroprácticas" },
      ],
    },
  ];
}
