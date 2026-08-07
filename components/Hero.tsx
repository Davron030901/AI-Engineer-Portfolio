"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ui } from "@/content/ui";
import { cvPath, person } from "@/content/site";
import { projects } from "@/content/projects";
import { useLocale } from "@/components/providers/LocaleProvider";
import { MetricRule } from "@/components/MetricRule";
import { ArrowRightIcon, DownloadIcon } from "@/components/Icons";

export function Hero() {
  const { t } = useLocale();
  const reduced = useReducedMotion();

  const lines = [
    { key: "role", node: <p className="eyebrow">{t(ui.hero.role)}</p> },
    {
      key: "name",
      node: (
        <h1 className="mt-5 text-display">
          {person.name}
          <span className="text-accent">.</span>
        </h1>
      ),
    },
    {
      key: "tagline",
      node: (
        <p className="mt-6 max-w-prose text-lead text-ink-muted">
          {t(ui.hero.tagline)}
        </p>
      ),
    },
  ];

  return (
    <section className="border-b border-line pb-section pt-section" aria-labelledby="hero-name">
      <div className="shell">
        {lines.map((line, index) => (
          <motion.div
            key={line.key}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
          >
            {line.node}
          </motion.div>
        ))}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3
                       text-small font-medium text-primary-ink transition-opacity hover:opacity-90"
          >
            {t(ui.hero.ctaProjects)}
            <ArrowRightIcon width={16} height={16} />
          </Link>
          <a
            href={cvPath}
            download
            className="inline-flex items-center gap-2 rounded-md border border-line-strong px-5 py-3
                       text-small font-medium text-ink transition-colors hover:bg-raised"
          >
            <DownloadIcon width={16} height={16} />
            {t(ui.hero.ctaCv)}
          </a>
        </div>

        <MetricRule
          className="mt-14 max-w-md"
          value={`${projects.length} systems`}
          label={t(ui.hero.ruleLabel)}
          position={78}
        />
      </div>
    </section>
  );
}
