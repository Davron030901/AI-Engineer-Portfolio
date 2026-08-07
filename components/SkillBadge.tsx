"use client";

import { ui } from "@/content/ui";
import { useLocale } from "@/components/providers/LocaleProvider";

export function SkillBadge({ name, count }: { name: string; count: number }) {
  const { t } = useLocale();

  return (
    <li
      className="flex items-baseline gap-2 rounded-md border border-line bg-surface px-3 py-2
                 transition-colors hover:border-line-strong"
      title={count > 0 ? `${count} ${t(ui.skills.usedIn)}` : t(ui.skills.fromWork)}
    >
      <span className="font-mono text-small text-ink">{name}</span>
      {/* No number means the skill comes from professional work rather than a
          project on this site — see the section intro. */}
      {count > 0 && <span className="font-mono text-micro text-accent">{count}</span>}
    </li>
  );
}
