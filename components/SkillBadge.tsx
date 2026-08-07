"use client";

import { ui } from "@/content/ui";
import { useLocale } from "@/components/providers/LocaleProvider";

export function SkillBadge({ name, count }: { name: string; count: number }) {
  const { t } = useLocale();

  return (
    <li
      className="flex items-baseline gap-2 rounded-md border border-line bg-surface px-3 py-2
                 transition-colors hover:border-line-strong"
    >
      <span className="font-mono text-small text-ink">{name}</span>
      <span
        className="font-mono text-micro text-ink-subtle"
        title={`${count} ${t(ui.skills.usedIn)}`}
      >
        {count}
      </span>
    </li>
  );
}
