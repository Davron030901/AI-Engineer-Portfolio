"use client";

import Link from "next/link";
import { ui } from "@/content/ui";
import { useLocale } from "@/components/providers/LocaleProvider";
import { ArrowLeftIcon } from "@/components/Icons";

export default function NotFound() {
  const { t } = useLocale();

  return (
    <section className="py-section">
      <div className="shell max-w-prose">
        <p className="eyebrow">404</p>
        <div className="rule mt-3" aria-hidden="true" />
        <h1 className="mt-6 text-h1">{t(ui.notFound.heading)}</h1>
        <p className="mt-4 text-lead text-ink-muted">{t(ui.notFound.body)}</p>
        <Link href="/" className="link-underline mt-8 inline-flex text-small font-medium">
          <ArrowLeftIcon width={15} height={15} />
          {t(ui.notFound.home)}
        </Link>
      </div>
    </section>
  );
}
