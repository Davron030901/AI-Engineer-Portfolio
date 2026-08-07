"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { STORAGE_KEY_LOCALE, type PerLocale } from "@/lib/i18n";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/types";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  /** Reads the active language out of any per-locale value. */
  t: <T>(value: PerLocale<T>) => T;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  // Server-render English so crawlers and the static HTML agree, then adopt the
  // visitor's stored choice after hydration. Reading localStorage during the
  // first render instead would produce a hydration mismatch.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY_LOCALE);
      if (isLocale(stored) && stored !== DEFAULT_LOCALE) setLocaleState(stored);
    } catch {
      // Private mode or blocked storage: English is a fine default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY_LOCALE, next);
    } catch {
      // Non-fatal — the choice just will not survive a reload.
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: <T,>(entry: PerLocale<T>) => entry[locale],
    }),
    [locale, setLocale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside <LocaleProvider>");
  return context;
}
