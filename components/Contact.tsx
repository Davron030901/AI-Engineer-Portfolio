"use client";

import { ui } from "@/content/ui";
import { links } from "@/content/site";
import { useLocale } from "@/components/providers/LocaleProvider";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  TelegramIcon,
} from "@/components/Icons";
import type { ReactNode } from "react";

type Channel = {
  key: string;
  href: string;
  label: string;
  value: string;
  icon: ReactNode;
  external?: boolean;
};

export function Contact() {
  const { t } = useLocale();

  // Only configured channels are listed — an unset link would otherwise ship as
  // a dead button. Missing ones are reported by `npm run check`.
  const channels: Channel[] = [];

  if (links.email) {
    channels.push({
      key: "email",
      href: `mailto:${links.email}`,
      label: t(ui.contact.email),
      value: links.email,
      icon: <MailIcon />,
    });
  }
  channels.push({
    key: "github",
    href: links.github,
    label: t(ui.contact.github),
    value: links.github.replace("https://", ""),
    icon: <GitHubIcon />,
  });
  if (links.phone) {
    channels.push({
      key: "phone",
      href: `tel:${links.phone.replace(/\s/g, "")}`,
      label: t(ui.contact.phone),
      value: links.phone,
      icon: <PhoneIcon />,
    });
  }
  if (links.linkedin) {
    channels.push({
      key: "linkedin",
      href: links.linkedin,
      label: t(ui.contact.linkedin),
      value: links.linkedin.replace("https://", ""),
      icon: <LinkedInIcon />,
      external: true,
    });
  }
  if (links.telegram) {
    channels.push({
      key: "telegram",
      href: links.telegram,
      label: t(ui.contact.telegram),
      value: links.telegram.replace("https://", ""),
      icon: <TelegramIcon />,
      external: true,
    });
  }

  return (
    <section id="contact" className="py-section">
      <div className="shell">
        <Reveal>
          <SectionHeader
            id="contact-heading"
            eyebrow={t(ui.contact.eyebrow)}
            heading={t(ui.contact.heading)}
            intro={t(ui.contact.intro)}
          />
        </Reveal>

        <ul className="mt-10 grid list-none gap-3 sm:grid-cols-2">
          {channels.map((channel, index) => (
            <Reveal key={channel.key} delay={index * 0.05}>
              <li>
                <a
                  href={channel.href}
                  target={channel.external ? "_blank" : undefined}
                  rel={channel.external ? "noopener noreferrer" : undefined}
                  className="card flex items-center gap-4 p-4 hover:border-line-strong"
                >
                  <span className="text-ink-subtle">{channel.icon}</span>
                  <span className="min-w-0">
                    <span className="block font-mono text-micro uppercase tracking-wider text-ink-subtle">
                      {channel.label}
                    </span>
                    <span className="block truncate text-small text-ink">{channel.value}</span>
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
