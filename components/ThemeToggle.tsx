"use client";

import { ui } from "@/content/ui";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useTheme } from "@/components/providers/ThemeProvider";
import { MoonIcon, SunIcon } from "@/components/Icons";

export function ThemeToggle() {
  const { t } = useLocale();
  const { theme, toggleTheme, ready } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t(ui.a11y.toggleTheme)}
      aria-pressed={ready ? theme === "dark" : undefined}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line
                 text-ink-muted transition-colors hover:border-line-strong hover:text-ink"
    >
      {/* Both icons render; CSS picks one, so the control is correct in the
          static HTML before the theme state has been read. */}
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </button>
  );
}
