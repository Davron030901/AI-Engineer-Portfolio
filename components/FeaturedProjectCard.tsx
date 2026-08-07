"use client";

import Link from "next/link";
import { ui } from "@/content/ui";
import { highlights } from "@/content/highlights";
import { useLocale } from "@/components/providers/LocaleProvider";
import { MetricRule } from "@/components/MetricRule";
import { ProjectLinks, ProjectShot, TechBadges } from "@/components/ProjectCard";
import { ArrowRightIcon } from "@/components/Icons";
import type { Project } from "@/lib/types";

export function FeaturedProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  const { t } = useLocale();
  const highlight = highlights[project.slug];

  return (
    <article className="card flex h-full flex-col overflow-hidden hover:border-line-strong">
      <ProjectShot
        project={project}
        priority={priority}
        sizes="(max-width: 767px) 100vw, 50vw"
      />
      <div className="flex flex-1 flex-col gap-5 p-6">
        <div>
          <p className="font-mono text-micro uppercase tracking-wider text-ink-subtle">
            {t(ui.categories[project.category])}
          </p>
          <h3 className="mt-2 text-h2">
            <Link
              href={`/projects/${project.slug}`}
              className="transition-colors hover:text-primary"
            >
              {t(project.title)}
            </Link>
          </h3>
        </div>

        {highlight && (
          <MetricRule
            value={highlight.value}
            label={t(highlight.label)}
            position={70}
          />
        )}

        <p className="flex-1 text-body text-ink-muted">{t(project.description)}</p>

        <TechBadges tech={project.techStack} limit={6} />

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="link-underline text-small font-medium"
          >
            {t(ui.projects.caseStudyLink)}
            <ArrowRightIcon width={15} height={15} />
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
