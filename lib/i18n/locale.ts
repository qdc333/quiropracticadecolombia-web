export type Locale = "es" | "en";

export const LOCALE_STORAGE_KEY = "qc-site-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "es" || value === "en";
}
