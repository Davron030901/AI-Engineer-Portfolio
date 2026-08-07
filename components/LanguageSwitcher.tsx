"use client";

import { ui } from "@/content/ui";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LOCALES, type Locale } from "@/lib/types";
import { cn } from "@/lib/cn";

const NAMES: Record<Locale, string> = { en: "EN", uz: "UZ" };
const FULL: Record<Locale, string> = { en: "English", uz: "O'zbekcha" };

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t(ui.a11y.switchLanguage)}
      className="inline-flex items-center rounded-md border border-line p-0.5"
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            title={FULL[code]}
            className={cn(
              "rounded px-2 py-1 font-mono text-micro font-medium transition-colors",
              active
                ? "bg-primary text-primary-ink"
                : "text-ink-subtle hover:text-ink",
            )}
          >
            {NAMES[code]}
          </button>
        );
      })}
    </div>
  );
}
