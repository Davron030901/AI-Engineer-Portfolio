"use client";

import { ui } from "@/content/ui";
import { timeline } from "@/content/site";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function Timeline() {
  const { t } = useLocale();

  if (timeline.length === 0) return null;

  return (
    <section id="experience" className="border-b border-line py-section">
      <div className="shell">
        <Reveal>
          <SectionHeader
            id="experience-heading"
            eyebrow={t(ui.experience.eyebrow)}
            heading={t(ui.experience.heading)}
          />
        </Reveal>

        <ol className="mt-12 list-none border-l border-line pl-6 sm:pl-8">
          {timeline.map((entry, index) => (
            <Reveal key={`${entry.period}-${index}`} delay={index * 0.05}>
              <li className="relative pb-10 last:pb-0">
                {/* Filled marks a role, hollow marks a degree — the timeline
                    holds both, and the difference should be readable at a
                    glance rather than spelled out in a label. */}
                <span
                  className={
                    entry.kind === "work"
                      ? "absolute -left-[1.85rem] top-2 h-2 w-2 rounded-full bg-accent sm:-left-[2.35rem]"
                      : "absolute -left-[1.85rem] top-2 h-2 w-2 rounded-full border border-accent bg-canvas sm:-left-[2.35rem]"
                  }
                  aria-hidden="true"
                />
                <p className="font-mono text-micro uppercase tracking-wider text-accent">
                  {entry.period}
                </p>
                <h3 className="mt-2 text-h3">{t(entry.role)}</h3>
                <p className="mt-1 text-small text-ink-subtle">{t(entry.org)}</p>
                <p className="mt-3 max-w-prose text-body text-ink-muted">
                  {t(entry.detail)}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
