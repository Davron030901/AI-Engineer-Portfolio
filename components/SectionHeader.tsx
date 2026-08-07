import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  heading,
  intro,
  id,
}: {
  eyebrow: string;
  heading: string;
  intro?: ReactNode;
  id?: string;
}) {
  return (
    <header className="max-w-prose">
      <p className="eyebrow">{eyebrow}</p>
      <div className="rule mt-3" aria-hidden="true" />
      <h2 id={id} className="mt-6 text-h1">
        {heading}
      </h2>
      {intro && <p className="mt-4 text-lead text-ink-muted">{intro}</p>}
    </header>
  );
}
