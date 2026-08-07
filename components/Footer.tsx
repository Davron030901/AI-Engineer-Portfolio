"use client";

import { ui } from "@/content/ui";
import { links, person } from "@/content/site";
import { useLocale } from "@/components/providers/LocaleProvider";
import { GitHubIcon, LinkedInIcon, MailIcon, TelegramIcon } from "@/components/Icons";

export function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  const socials = [
    { key: "github", href: links.github, label: t(ui.contact.github), icon: <GitHubIcon /> },
    links.linkedin && {
      key: "linkedin",
      href: links.linkedin,
      label: t(ui.contact.linkedin),
      icon: <LinkedInIcon />,
    },
    links.telegram && {
      key: "telegram",
      href: links.telegram,
      label: t(ui.contact.telegram),
      icon: <TelegramIcon />,
    },
    links.email && {
      key: "email",
      href: `mailto:${links.email}`,
      label: t(ui.contact.email),
      icon: <MailIcon />,
    },
  ].filter(Boolean) as Array<{ key: string; href: string; label: string; icon: JSX.Element }>;

  return (
    <footer className="border-t border-line py-10">
      <div className="shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-small text-ink-muted">
            © {year} {person.name}. {t(ui.footer.rights)}
          </p>
          <p className="mt-1 font-mono text-micro text-ink-subtle">
            {t(ui.footer.builtWith)}
          </p>
        </div>

        <ul className="flex list-none items-center gap-2">
          {socials.map((social) => (
            <li key={social.key}>
              <a
                href={social.href}
                target={social.key === "email" ? undefined : "_blank"}
                rel={social.key === "email" ? undefined : "noopener noreferrer"}
                aria-label={social.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line
                           text-ink-subtle transition-colors hover:border-line-strong hover:text-ink"
              >
                {social.icon}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
