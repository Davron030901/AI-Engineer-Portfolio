"use client";

import { ui } from "@/content/ui";
import { activeCategories, countByCategory, projects } from "@/content/projects";
import { useLocale } from "@/components/providers/LocaleProvider";
import { cn } from "@/lib/cn";
import type { Category } from "@/lib/types";

export type Filter = Category | "all";

export function ProjectFilter({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (next: Filter) => void;
}) {
  const { t } = useLocale();

  const chips: Array<{ key: Filter; label: string; count: number }> = [
    { key: "all", label: t(ui.projects.filterAll), count: projects.length },
    // Only categories that actually contain a project, derived from the data —
    // a chip can never open onto an empty grid.
    ...activeCategories.map((category) => ({
      key: category as Filter,
      label: t(ui.categories[category]),
      count: countByCategory(category),
    })),
  ];

  return (
    <div
      role="group"
      aria-label={t(ui.a11y.categoryFilter)}
      className="flex flex-wrap gap-2"
    >
      {chips.map((chip) => {
        const active = chip.key === value;
        return (
          <button
            key={chip.key}
            type="button"
            onClick={() => onChange(chip.key)}
            aria-pressed={active}
            className={cn(
              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-small transition-colors",
              active
                ? "border-primary bg-primary text-primary-ink"
                : "border-line text-ink-muted hover:border-line-strong hover:text-ink",
            )}
          >
            {chip.label}
            <span
              className={cn(
                "font-mono text-micro",
                active ? "text-primary-ink/70" : "text-ink-subtle",
              )}
            >
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
