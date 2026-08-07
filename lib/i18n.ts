import type { Locale } from "@/lib/types";

/** Any value that exists once per locale — a string, a paragraph list, anything. */
export type PerLocale<T> = { readonly [K in Locale]: T };

export function pick<T>(value: PerLocale<T>, locale: Locale): T {
  return value[locale];
}

export const STORAGE_KEY_LOCALE = "portfolio.locale";
export const STORAGE_KEY_THEME = "portfolio.theme";
