import type { Category, Project } from "@/lib/types";

/**
 * Drawn stand-in for a project whose screenshot has not been captured yet.
 *
 * It is an illustration, not a fake screenshot: one motif per category, shaped
 * deterministically by the slug so every card differs, and drawn entirely in
 * theme tokens so it follows light and dark mode. It never shows a number — the
 * figures on this site all come from projects.json, and a chart axis here would
 * be an invented one.
 */

const W = 1600;
const H = 1000;

/**
 * Small deterministic PRNG (mulberry32) seeded from the slug. Each motif creates
 * its own from the seed string, so rendering stays pure: a generator passed in
 * as a prop would advance on React's StrictMode double-render and the client
 * would draw a different picture from the server.
 */
function random(seedText: string): () => number {
  let seed = 0;
  for (let i = 0; i < seedText.length; i++) seed = (Math.imul(31, seed) + seedText.charCodeAt(i)) | 0;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const fmt = (n: number) => n.toFixed(1);

/**
 * Trig results may differ in the last digits between Node and the browser, which
 * would make the server and client markup disagree and fail hydration. Every
 * coordinate derived from Math.cos/sin goes through this.
 */
const round = (n: number) => Math.round(n * 10) / 10;

/** ML: a series with an uncertainty band — the "error bars" every project reports. */
function SeriesMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const n = 26;
  const left = 170;
  const right = W - 170;
  const top = 330;
  const bottom = 820;
  const split = Math.floor(n * (0.62 + rand() * 0.1));
  const trend = (rand() - 0.35) * 0.5;

  let level = 0.5;
  const points = Array.from({ length: n }, (_, i) => {
    level += (rand() - 0.5) * 0.14 + trend / n;
    level = Math.min(0.85, Math.max(0.2, level));
    const x = left + ((right - left) * i) / (n - 1);
    const y = bottom - (bottom - top) * level;
    return { x, y };
  });

  const line = (from: number, to: number) =>
    points
      .slice(from, to)
      .map((p, i) => `${i === 0 ? "M" : "L"}${fmt(p.x)},${fmt(p.y)}`)
      .join(" ");

  // The band widens with distance from the last observed point.
  const ahead = points.slice(split - 1);
  const spread = (i: number) => 18 + i * 9;
  const band =
    ahead.map((p, i) => `${i === 0 ? "M" : "L"}${fmt(p.x)},${fmt(p.y - spread(i))}`).join(" ") +
    " " +
    ahead
      .slice()
      .reverse()
      .map((p, i) => `L${fmt(p.x)},${fmt(p.y + spread(ahead.length - 1 - i))}`)
      .join(" ") +
    " Z";

  const now = points[split - 1];

  return (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={left}
          x2={right}
          y1={top + ((bottom - top) * i) / 3}
          y2={top + ((bottom - top) * i) / 3}
          className="stroke-line"
          strokeWidth={2}
        />
      ))}
      {points.slice(0, split).map((p, i) => (
        <rect
          key={i}
          x={p.x - 9}
          y={p.y}
          width={18}
          height={bottom - p.y}
          rx={3}
          className="fill-primary-soft"
        />
      ))}
      <path d={band} className="fill-accent-soft" />
      <path d={line(0, split)} className="stroke-primary" strokeWidth={5} fill="none" strokeLinejoin="round" />
      <path
        d={line(split - 1, n)}
        className="stroke-accent"
        strokeWidth={5}
        fill="none"
        strokeDasharray="14 12"
        strokeLinejoin="round"
      />
      <line
        x1={now.x}
        x2={now.x}
        y1={top - 40}
        y2={bottom}
        className="stroke-line-strong"
        strokeWidth={2}
        strokeDasharray="6 8"
      />
      <circle cx={now.x} cy={now.y} r={12} className="fill-canvas stroke-accent" strokeWidth={5} />
    </g>
  );
}

/** LLM & RAG: documents feeding a graph of agents around one coordinator. */
function GraphMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const cx = 980;
  const cy = 590;
  const count = 4 + Math.floor(rand() * 2);
  const offset = rand() * Math.PI;
  const nodes = Array.from({ length: count }, (_, i) => {
    const angle = offset + (i / count) * Math.PI * 2;
    const r = 240 + rand() * 60;
    return { x: round(cx + Math.cos(angle) * r * 1.35), y: round(cy + Math.sin(angle) * r * 0.8) };
  });

  const docs = [0, 1, 2].map((i) => ({ x: 170, y: 360 + i * 170 }));

  return (
    <g>
      {docs.map((d, i) => (
        <path
          key={`e-doc-${i}`}
          d={`M${d.x + 230},${d.y + 60} C${d.x + 400},${d.y + 60} ${cx - 300},${cy} ${cx - 60},${cy}`}
          className="stroke-line-strong"
          strokeWidth={3}
          fill="none"
        />
      ))}
      {nodes.map((n, i) => (
        <line
          key={`e-${i}`}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          className="stroke-line-strong"
          strokeWidth={3}
        />
      ))}
      {docs.map((d, i) => (
        <g key={`doc-${i}`}>
          <rect x={d.x} y={d.y} width={230} height={120} rx={14} className="fill-surface stroke-line-strong" strokeWidth={3} />
          {[0, 1, 2].map((l) => (
            <rect
              key={l}
              x={d.x + 26}
              y={d.y + 28 + l * 26}
              width={l === 2 ? 110 : 178}
              height={10}
              rx={5}
              className={i === 1 && l === 1 ? "fill-accent" : "fill-line-strong"}
            />
          ))}
        </g>
      ))}
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle cx={n.x} cy={n.y} r={44} className="fill-surface stroke-primary" strokeWidth={4} />
          <circle cx={n.x} cy={n.y} r={13} className="fill-primary" />
        </g>
      ))}
      <circle cx={cx} cy={cy} r={86} className="fill-primary-soft stroke-primary" strokeWidth={5} />
      <circle cx={cx} cy={cy} r={30} className="fill-accent" />
    </g>
  );
}

/** Full-stack: a stack of app windows with generated content inside. */
function WindowsMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const frames = [
    { x: 300, y: 300, w: 820, h: 560 },
    { x: 560, y: 210, w: 820, h: 560 },
  ];
  const pages = 4;
  const lit = Math.floor(rand() * pages);

  return (
    <g>
      {frames.map((f, i) => (
        <g key={i}>
          <rect x={f.x} y={f.y} width={f.w} height={f.h} rx={22} className="fill-surface stroke-line-strong" strokeWidth={3} />
          <line x1={f.x} x2={f.x + f.w} y1={f.y + 64} y2={f.y + 64} className="stroke-line" strokeWidth={3} />
          {[0, 1, 2].map((d) => (
            <circle key={d} cx={f.x + 40 + d * 34} cy={f.y + 32} r={9} className="fill-line-strong" />
          ))}
        </g>
      ))}
      {Array.from({ length: pages }, (_, i) => {
        const x = 610 + i * 186;
        const y = 330;
        return (
          <g key={`p-${i}`}>
            <rect
              x={x}
              y={y}
              width={160}
              height={210}
              rx={12}
              className={i === lit ? "fill-accent-soft stroke-accent" : "fill-raised stroke-line"}
              strokeWidth={3}
            />
            <circle cx={x + 80} cy={y + 86} r={34} className={i === lit ? "fill-accent" : "fill-primary-soft"} />
            <rect x={x + 26} y={y + 150} width={108} height={10} rx={5} className="fill-line-strong" />
            <rect x={x + 26} y={y + 174} width={70} height={10} rx={5} className="fill-line-strong" />
          </g>
        );
      })}
      {[0, 1, 2].map((l) => (
        <rect
          key={l}
          x={610}
          y={600 + l * 34}
          width={l === 2 ? 380 : 700}
          height={14}
          rx={7}
          className="fill-line-strong"
        />
      ))}
      <rect x={610} y={704} width={210} height={44} rx={10} className="fill-primary" />
    </g>
  );
}

/** Computer vision: a tile grid with a detection box over one region. */
function VisionMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const cols = 6;
  const rows = 3;
  const size = 170;
  const gap = 18;
  const x0 = (W - (cols * size + (cols - 1) * gap)) / 2;
  const y0 = 300;
  const hit = Math.floor(rand() * cols * rows);

  return (
    <g>
      {Array.from({ length: cols * rows }, (_, i) => {
        const c = i % cols;
        const r = Math.floor(i / cols);
        const x = x0 + c * (size + gap);
        const y = y0 + r * (size + gap);
        const crack = `M${x + 30},${y + 40 + rand() * 40} L${x + 70 + rand() * 30},${y + 80 + rand() * 30} L${x + 140},${y + 120 + rand() * 30}`;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={size}
              height={size}
              rx={12}
              className={i === hit ? "fill-accent-soft" : "fill-surface stroke-line-strong"}
              strokeWidth={2}
            />
            <path d={crack} className={i === hit ? "stroke-accent" : "stroke-line-strong"} strokeWidth={4} fill="none" strokeLinecap="round" />
            {i === hit && (
              <rect
                x={x - 8}
                y={y - 8}
                width={size + 16}
                height={size + 16}
                rx={16}
                fill="none"
                className="stroke-accent"
                strokeWidth={5}
              />
            )}
          </g>
        );
      })}
    </g>
  );
}

/** Risk scoring: a ranked list of cases, the ones over the threshold flagged. */
function RiskMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const rows = 7;
  const left = 360;
  const width = 880;
  const scores = Array.from({ length: rows }, () => 0.2 + rand() * 0.75).sort((a, b) => b - a);
  const threshold = 0.55 + rand() * 0.1;
  const flagged = scores.filter((v) => v >= threshold).length || 1;
  const top = 250;
  const step = 72;
  const cut = left + width * threshold;

  return (
    <g>
      {scores.map((score, i) => {
        const y = top + i * step;
        const hot = i < flagged;
        return (
          <g key={i}>
            <circle cx={left - 70} cy={y + 18} r={18} className={hot ? "fill-accent" : "fill-line-strong"} />
            <rect x={left} y={y} width={width} height={36} rx={18} className="fill-surface" />
            <rect
              x={left}
              y={y}
              width={width * score}
              height={36}
              rx={18}
              className={hot ? "fill-accent-soft stroke-accent" : "fill-primary-soft"}
              strokeWidth={3}
            />
          </g>
        );
      })}
      <line
        x1={cut}
        x2={cut}
        y1={top - 40}
        y2={top + rows * step}
        className="stroke-line-strong"
        strokeWidth={3}
        strokeDasharray="8 10"
      />
    </g>
  );
}

/** Classification: free-text items routed into a small set of labelled queues. */
function RoutingMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const items = 5;
  const queues = 3;
  const itemY = (i: number) => 230 + i * 120;
  const queueY = (q: number) => 300 + q * 170;
  const assignment = Array.from({ length: items }, () => Math.floor(rand() * queues));
  const lit = assignment[Math.floor(rand() * items)];

  return (
    <g>
      {assignment.map((q, i) => (
        <path
          key={`e-${i}`}
          d={`M610,${itemY(i) + 40} C820,${itemY(i) + 40} 860,${queueY(q) + 50} 1060,${queueY(q) + 50}`}
          className={q === lit ? "stroke-accent" : "stroke-line-strong"}
          strokeWidth={3}
          fill="none"
        />
      ))}
      {assignment.map((_, i) => (
        <g key={`i-${i}`}>
          <rect x={250} y={itemY(i)} width={360} height={80} rx={14} className="fill-surface stroke-line-strong" strokeWidth={3} />
          <rect x={280} y={itemY(i) + 24} width={180 + rand() * 100} height={11} rx={5} className="fill-line-strong" />
          <rect x={280} y={itemY(i) + 46} width={100 + rand() * 80} height={11} rx={5} className="fill-line-strong" />
        </g>
      ))}
      {Array.from({ length: queues }, (_, q) => (
        <g key={`q-${q}`}>
          <rect
            x={1060}
            y={queueY(q)}
            width={290}
            height={100}
            rx={50}
            className={q === lit ? "fill-accent-soft stroke-accent" : "fill-primary-soft stroke-primary"}
            strokeWidth={4}
          />
          <circle cx={1110} cy={queueY(q) + 50} r={16} className={q === lit ? "fill-accent" : "fill-primary"} />
          <rect x={1146} y={queueY(q) + 44} width={150} height={12} rx={6} className={q === lit ? "fill-accent" : "fill-primary"} opacity={0.6} />
        </g>
      ))}
    </g>
  );
}

/** Segmentation: unlabelled points that settle into clusters around centroids. */
function ClusterMotif({ seed }: { seed: string }) {
  const rand = random(seed);
  const centers = [
    { x: 420, y: 420 },
    { x: 800, y: 330 },
    { x: 1180, y: 430 },
    { x: 600, y: 730 },
    { x: 1010, y: 740 },
  ];
  const fills = ["fill-primary", "fill-accent", "fill-violet", "fill-ink-subtle", "fill-primary"];
  const rings = ["stroke-primary", "stroke-accent", "stroke-violet", "stroke-ink-subtle", "stroke-primary"];

  return (
    <g>
      {centers.map((c, k) => (
        <g key={k}>
          <ellipse
            cx={c.x}
            cy={c.y}
            rx={160}
            ry={118}
            fill="none"
            className={rings[k]}
            strokeWidth={3}
            strokeDasharray="10 12"
            opacity={0.7}
          />
          {Array.from({ length: 16 }, (_, i) => {
            const angle = rand() * Math.PI * 2;
            const r = Math.sqrt(rand());
            return (
              <circle
                key={i}
                cx={round(c.x + Math.cos(angle) * r * 130)}
                cy={round(c.y + Math.sin(angle) * r * 92)}
                r={10}
                className={fills[k]}
                opacity={0.85}
              />
            );
          })}
          <path
            d={`M${c.x - 16},${c.y} H${c.x + 16} M${c.x},${c.y - 16} V${c.y + 16}`}
            className="stroke-ink"
            strokeWidth={5}
            strokeLinecap="round"
          />
        </g>
      ))}
    </g>
  );
}

type MotifName = "series" | "risk" | "routing" | "clusters" | "graph" | "windows" | "vision";

/**
 * Machine-learning work here falls into a few distinct shapes, so ML projects
 * get the motif that matches what the system actually outputs. Anything not
 * listed falls back to its category's motif.
 */
const MOTIF_BY_SLUG: Record<string, MotifName> = {
  "retail-demand-forecasting": "series",
  "student-performance-early-warning-system": "risk",
  "retention-signal-banking-churn": "risk",
  "hospital-appointment-no-show-prediction": "risk",
  "public-service-sla-breach-prediction": "risk",
  "telecom-churn": "risk",
  "automatic-transaction-categorization": "routing",
  "medical-request-triage-routing": "routing",
  "product-review-intelligence-system": "routing",
  "student-learning-segmentation": "clusters",
};

const MOTIF_BY_CATEGORY: Record<Category, MotifName> = {
  ML: "series",
  "Cloud & Data": "series",
  "LLM & RAG": "graph",
  "Full-Stack AI": "windows",
  CV: "vision",
};

/** Vertical shift that centres each motif's drawing in the 1600×1000 frame. */
const OFFSET: Record<MotifName, number> = {
  series: -55,
  risk: -20,
  routing: -30,
  clusters: -35,
  graph: -90,
  windows: -35,
  vision: -73,
};

function Motif({ name, seed }: { name: MotifName; seed: string }) {
  switch (name) {
    case "risk":
      return <RiskMotif seed={seed} />;
    case "routing":
      return <RoutingMotif seed={seed} />;
    case "clusters":
      return <ClusterMotif seed={seed} />;
    case "graph":
      return <GraphMotif seed={seed} />;
    case "windows":
      return <WindowsMotif seed={seed} />;
    case "vision":
      return <VisionMotif seed={seed} />;
    default:
      return <SeriesMotif seed={seed} />;
  }
}

export function ProjectCover({ project, label }: { project: Project; label: string }) {
  const motif = MOTIF_BY_SLUG[project.slug] ?? MOTIF_BY_CATEGORY[project.category];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={label}
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <pattern id={`grid-${project.slug}`} width={80} height={80} patternUnits="userSpaceOnUse">
          <path d="M80 0H0V80" fill="none" className="stroke-line" strokeWidth={1.5} />
        </pattern>
      </defs>
      <rect width={W} height={H} className="fill-raised" />
      <rect width={W} height={H} fill={`url(#grid-${project.slug})`} opacity={0.7} />
      <g transform={`translate(0 ${OFFSET[motif]})`}>
        <Motif name={motif} seed={project.slug} />
      </g>
    </svg>
  );
}
