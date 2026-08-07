"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ui } from "@/content/ui";
import { featuredProjects, projects } from "@/content/projects";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { FeaturedProjectCard } from "@/components/FeaturedProjectCard";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilter, type Filter } from "@/components/ProjectFilter";

export function Projects() {
  const { t } = useLocale();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const rest = useMemo(() => projects.filter((project) => !project.featured), []);

  const visible = useMemo(
    () => (filter === "all" ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest],
  );

  return (
    <section id="projects" className="border-b border-line py-section">
      <div className="shell">
        <Reveal>
          <SectionHeader
            id="projects-heading"
            eyebrow={t(ui.projects.eyebrow)}
            heading={t(ui.projects.heading)}
            intro={t(ui.projects.intro)}
          />
        </Reveal>

        {/* Featured */}
        <div className="mt-14">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="font-mono text-mini uppercase tracking-[0.16em] text-ink">
              {t(ui.projects.featuredHeading)}
            </h3>
            <p className="text-mini text-ink-subtle">{t(ui.projects.featuredIntro)}</p>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.05}>
                <FeaturedProjectCard project={project} priority={index === 0} />
              </Reveal>
            ))}
          </div>
        </div>

        {/* Everything else */}
        <div className="mt-16">
          <h3 className="font-mono text-mini uppercase tracking-[0.16em] text-ink">
            {t(ui.projects.allHeading)}
          </h3>

          <div className="mt-5">
            <ProjectFilter value={filter} onChange={setFilter} />
          </div>

          <motion.ul
            aria-label={t(ui.a11y.projectGrid)}
            layout={!reduced}
            className="mt-8 grid list-none gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((project) => (
                <motion.li
                  key={project.slug}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                  animate={reduced ? undefined : { opacity: 1, scale: 1 }}
                  exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {visible.length === 0 && (
            <p className="mt-8 text-body text-ink-muted">{t(ui.projects.empty)}</p>
          )}
        </div>
      </div>
    </section>
  );
}
