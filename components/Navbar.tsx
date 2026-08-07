"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ui } from "@/content/ui";
import { person } from "@/content/site";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/Icons";

const SECTIONS = [
  { href: "/#about", label: ui.nav.about },
  { href: "/#projects", label: ui.nav.projects },
  { href: "/#skills", label: ui.nav.skills },
  { href: "/#contact", label: ui.nav.contact },
] as const;

export function Navbar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  // A menu that survives an orientation change or a resize into desktop layout
  // would leave an invisible overlay trapping focus.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50
                   focus:rounded-md focus:bg-primary focus:px-3 focus:py-2
                   focus:font-mono focus:text-mini focus:text-primary-ink"
      >
        {t(ui.a11y.skipToContent)}
      </a>

      <div className="shell flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display text-h3 font-semibold tracking-tight text-ink"
        >
          {person.name}
          <span className="text-accent">.</span>
        </Link>

        <nav
          aria-label={t(ui.a11y.primaryNav)}
          className="hidden items-center gap-7 md:flex"
        >
          {SECTIONS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-small text-ink-muted transition-colors hover:text-ink"
            >
              {t(item.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t(ui.a11y.closeMenu) : t(ui.a11y.openMenu)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line
                       text-ink-muted transition-colors hover:text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label={t(ui.a11y.primaryNav)}
          className="border-t border-line bg-canvas md:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {SECTIONS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-body text-ink-muted transition-colors hover:text-ink"
                >
                  {t(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
