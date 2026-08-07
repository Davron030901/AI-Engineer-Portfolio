"use client";

import Image from "next/image";
import { ui } from "@/content/ui";
import pending from "@/content/pending-screenshots.json";
import { useLocale } from "@/components/providers/LocaleProvider";
import { ExternalIcon, GitHubIcon } from "@/components/Icons";
import type { Project } from "@/lib/types";

const pendingSlugs = new Set<string>(pending as string[]);

export function ProjectShot({
  project,
  priority = false,
  sizes,
}: {
  project: Project;
  priority?: boolean;
  sizes: string;
}) {
  const { t } = useLocale();
  const isPending = pendingSlugs.has(project.slug);
  const title = t(project.title);

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-card bg-raised">
      <Image
        src={project.image}
        alt={
          isPending
            ? `${t(ui.a11y.pendingScreenshot)} ${title}`
            : `${t(ui.a11y.screenshotOf)} ${title}`
        }
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover object-top"
      />
      {isPending && (
        <span
          className="absolute right-2 top-2 rounded border border-line bg-canvas/90 px-2 py-1
                     font-mono text-micro uppercase tracking-wider text-ink-subtle"
        >
          placeholder
        </span>
      )}
    </div>
  );
}

export function ProjectLinks({ project }: { project: Project }) {
  const { t } = useLocale();
  const title = t(project.title);

  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t(ui.projects.viewCode)} — ${title}`}
          className="inline-flex items-center gap-1.5 text-mini text-ink-muted transition-colors hover:text-ink"
        >
          <GitHubIcon width={15} height={15} />
          {t(ui.projects.viewCode)}
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${t(ui.projects.viewLive)} — ${title}`}
          className="inline-flex items-center gap-1.5 text-mini text-ink-muted transition-colors hover:text-ink"
        >
          <ExternalIcon width={15} height={15} />
          {t(ui.projects.viewLive)}
        </a>
      )}
    </div>
  );
}

export function TechBadges({ tech, limit }: { tech: string[]; limit?: number }) {
  const shown = limit ? tech.slice(0, limit) : tech;
  const rest = limit ? tech.length - shown.length : 0;

  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((item) => (
        <li key={item} className="badge">
          {item}
        </li>
      ))}
      {rest > 0 && <li className="badge text-ink-subtle">+{rest}</li>}
    </ul>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useLocale();

  return (
    <article className="card group flex h-full flex-col overflow-hidden hover:border-line-strong">
      <ProjectShot
        project={project}
        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="font-mono text-micro uppercase tracking-wider text-ink-subtle">
            {t(ui.categories[project.category])}
          </p>
          <h3 className="mt-2 text-h3">{t(project.title)}</h3>
        </div>
        <p className="flex-1 text-small text-ink-muted">{t(project.description)}</p>
        <TechBadges tech={project.techStack} limit={5} />
        <div className="border-t border-line pt-4">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
