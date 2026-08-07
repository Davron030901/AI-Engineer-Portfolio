"use client";

import Link from "next/link";
import { ui } from "@/content/ui";
import { highlights } from "@/content/highlights";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { MetricRule } from "@/components/MetricRule";
import { ProjectLinks, ProjectShot, TechBadges } from "@/components/ProjectCard";
import { ArrowLeftIcon } from "@/components/Icons";
import { CASE_STUDY_SECTIONS, type Project } from "@/lib/types";

export function CaseStudy({ project }: { project: Project }) {
  const { t } = useLocale();
  const study = project.caseStudy;
  const highlight = highlights[project.slug];

  if (!study) return null;

  return (
    <article className="py-section">
      <div className="shell">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-mini text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeftIcon width={15} height={15} />
          {t(ui.caseStudy.back)}
        </Link>

        <header className="mt-8 max-w-prose">
          <p className="eyebrow">{t(ui.caseStudy.eyebrow)}</p>
          <div className="rule mt-3" aria-hidden="true" />
          <h1 className="mt-6 text-h1">{t(project.title)}</h1>
          <p className="mt-5 text-lead text-ink-muted">{t(project.description)}</p>

          {highlight && (
            <MetricRule
              className="mt-8"
              value={highlight.value}
              label={t(highlight.label)}
              position={70}
            />
          )}
        </header>

        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <ProjectLinks project={project} />
          <p className="font-mono text-micro uppercase tracking-wider text-ink-subtle">
            {t(ui.caseStudy.category)}: {t(ui.categories[project.category])}
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-card border border-line">
          <ProjectShot project={project} priority sizes="(max-width: 1023px) 100vw, 76rem" />
        </div>

        <div className="mt-8">
          <p className="font-mono text-micro uppercase tracking-wider text-ink-subtle">
            {t(ui.caseStudy.stack)}
          </p>
          <div className="mt-3">
            <TechBadges tech={project.techStack} />
          </div>
        </div>

        {/* Numbered because this genuinely is a sequence: each section only makes
            sense given the one before it. */}
        <div className="mt-16 space-y-14">
          {CASE_STUDY_SECTIONS.map((section, index) => (
            <Reveal key={section}>
              <section aria-labelledby={`cs-${section}`} className="max-w-prose">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-micro text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 id={`cs-${section}`} className="text-h2">
                    {t(ui.caseStudy.sections[section])}
                  </h2>
                </div>
                <div className="rule mt-4" aria-hidden="true" />
                <p className="mt-6 text-body text-ink-muted">{t(study[section])}</p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </article>
  );
}
