"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ui } from "@/content/ui";
import { person } from "@/content/site";
import { useLocale } from "@/components/providers/LocaleProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { CloseIcon, MenuIcon } from "@/components/Icons";
import { cn } from "@/lib/cn";

const SECTIONS = [
  { href: "/#about", label: ui.nav.about },
  { href: "/#projects", label: ui.nav.projects },
  { href: "/#skills", label: ui.nav.skills },
  { href: "/#experience", label: ui.nav.experience },
  { href: "/#contact", label: ui.nav.contact },
] as const;

const sectionId = (href: string) => href.slice(href.indexOf("#") + 1);

/**
 * The section currently under the navbar, so the matching link can say where
 * the reader is. Only meaningful on the homepage, where the sections live.
 */
function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      setActive(null);
      return;
    }
    const targets = SECTIONS.map((item) => document.getElementById(sectionId(item.href))).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (targets.length === 0) return;

    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting);
        // First section, in page order, that crosses the band below the navbar.
        const current = targets.find((el) => visible.get(el.id));
        setActive(current ? current.id : null);
      },
      // A thin band a little below the sticky header decides which section is "current".
      { rootMargin: "-30% 0px -65% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return active;
}

export function Navbar() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const active = useActiveSection(usePathname() === "/");

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
          <span className="sm:hidden">{person.shortName}</span>
          <span className="hidden sm:inline">{person.name}</span>
          <span className="text-accent">.</span>
        </Link>

        <nav
          aria-label={t(ui.a11y.primaryNav)}
          className="hidden items-center gap-7 md:flex"
        >
          {SECTIONS.map((item) => {
            const current = active === sectionId(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "location" : undefined}
                className={cn(
                  "text-small transition-colors hover:text-ink",
                  current ? "text-ink" : "text-ink-muted",
                )}
              >
                {t(item.label)}
              </Link>
            );
          })}
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
                  aria-current={active === sectionId(item.href) ? "location" : undefined}
                  className={cn(
                    "block py-3 text-body transition-colors hover:text-ink",
                    active === sectionId(item.href) ? "text-ink" : "text-ink-muted",
                  )}
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
