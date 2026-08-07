"use client";

import { ui } from "@/content/ui";
import { skillGroupEntries } from "@/content/skills";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { SkillBadge } from "@/components/SkillBadge";

export function Skills() {
  const { t } = useLocale();

  return (
    <section id="skills" className="border-b border-line py-section">
      <div className="shell">
        <Reveal>
          <SectionHeader
            id="skills-heading"
            eyebrow={t(ui.skills.eyebrow)}
            heading={t(ui.skills.heading)}
            intro={t(ui.skills.intro)}
          />
        </Reveal>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          {skillGroupEntries.map((group, index) => (
            <Reveal key={group.key} delay={index * 0.05}>
              <div>
                <h3 className="font-mono text-mini uppercase tracking-[0.16em] text-ink">
                  {t(ui.skills.groups[group.key])}
                </h3>
                <div className="rule mt-3" aria-hidden="true" />
                <ul className="mt-5 flex list-none flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <SkillBadge key={skill.name} name={skill.name} count={skill.count} />
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
