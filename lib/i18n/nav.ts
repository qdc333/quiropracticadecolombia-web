import type { Locale } from "@/lib/i18n/locale";

export type NavItem = {
  href: string;
  label: string;
  cta?: boolean;
};

export function getNavItems(locale: Locale): NavItem[] {
  if (locale === "en") {
    return [
      { href: "#inicio", label: "Home" },
      { href: "#vision", label: "Vision" },
      { href: "#mision", label: "Mission" },
      { href: "#causa", label: "The cause" },
      { href: "#especialidad", label: "Specialty" },
      { href: "#metodo", label: "Method" },
      { href: "#misiones-quiropracticas", label: "Chiropractic missions" },
      { href: "#nosotros", label: "About us" },
      { href: "#resenas", label: "Reviews" },
      { href: "#redes", label: "Social" },
      { href: "#contacto", label: "Book", cta: true },
    ];
  }

  return [
    { href: "#inicio", label: "Inicio" },
    { href: "#vision", label: "Visión" },
    { href: "#mision", label: "Misión" },
    { href: "#causa", label: "La causa" },
    { href: "#especialidad", label: "Especialidad" },
    { href: "#metodo", label: "Método" },
    { href: "#misiones-quiropracticas", label: "Misiones quiroprácticas" },
    { href: "#nosotros", label: "Nosotros" },
    { href: "#resenas", label: "Reseñas" },
    { href: "#redes", label: "Redes" },
    { href: "#contacto", label: "Agendar", cta: true },
  ];
}
