import { cn } from "@/lib/cn";

/**
 * The signature element: a hairline with one labelled tick.
 *
 * It marks the places where the page states something it can back up. The tick
 * sits at a fixed position on the rule; the label beside it is always drawn from
 * projects.json, never composed here.
 */
export function MetricRule({
  value,
  label,
  position = 62,
  className,
}: {
  value?: string;
  label?: string;
  /** Tick position along the rule, 0–100. */
  position?: number;
  className?: string;
}) {
  const clamped = Math.min(96, Math.max(4, position));

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-px w-full bg-line" aria-hidden="true">
        <span
          className="absolute -top-[3px] block h-[7px] w-px bg-accent"
          style={{ left: `${clamped}%` }}
        />
      </div>
      {(value || label) && (
        <p className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {value && (
            <span className="font-mono text-small font-medium text-accent">{value}</span>
          )}
          {label && <span className="text-mini text-ink-subtle">{label}</span>}
        </p>
      )}
    </div>
  );
}
