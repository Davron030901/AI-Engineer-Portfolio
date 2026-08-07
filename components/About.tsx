"use client";

import { ui } from "@/content/ui";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";

export function About() {
  const { t } = useLocale();
  const paragraphs = t(ui.about.body);
  const story = t(ui.about.story);

  return (
    <section id="about" className="border-b border-line py-section">
      <div className="shell">
        <Reveal>
          <SectionHeader
            id="about-heading"
            eyebrow={t(ui.about.eyebrow)}
            heading={t(ui.about.heading)}
          />
        </Reveal>

        <div className="mt-10 max-w-prose space-y-5">
          {paragraphs.map((paragraph, index) => (
            <Reveal key={index} delay={index * 0.06}>
              <p className="text-body text-ink-muted">{paragraph}</p>
            </Reveal>
          ))}
          {story && (
            <Reveal delay={paragraphs.length * 0.06}>
              <p className="text-body text-ink-muted">{story}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
