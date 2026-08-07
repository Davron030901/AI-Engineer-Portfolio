import type { Localized } from "@/lib/types";

/**
 * Everything personal lives here, so nothing has to be hunted for in components.
 *
 * Lines carrying a todo tag are the only unfinished content on the site.
 * `npm run check` lists them; `npm run check:strict` (ASSETS_STRICT=1) fails the
 * build while any remain, which is what you should switch on in Vercel once the
 * site is genuinely finished.
 */

export const person = {
  /** @todo Replace with your full name as you want it read by a recruiter. */
  name: "Davron",
  githubHandle: "Davron030901",
} as const;

export const links = {
  github: "https://github.com/Davron030901",
  /** @todo Add your email address, e.g. "davron@example.com". */
  email: null as string | null,
  /** @todo Add your LinkedIn profile URL. */
  linkedin: null as string | null,
  /** @todo Add your Telegram handle URL, e.g. "https://t.me/username". */
  telegram: null as string | null,
} as const;

/** @todo Export your CV to public/cv/cv.pdf, then keep this path in sync. */
export const cvPath = "/cv/cv.pdf";

/**
 * Presentation-only headline shown on the featured cards. The number in each
 * `value` must already appear in that project's own copy in projects.json —
 * scripts/check-assets.mjs enforces it, so no figure can be introduced here.
 */
export const highlights: Record<string, { value: string; label: Localized }> = {
  "loan-terms-assistant": {
    value: "1 contract",
    label: {
      en: "the only thing it will answer about",
      uz: "u javob beradigan yagona narsa",
    },
  },
  "multi-agent-ai-analyst": {
    value: "4 specialists",
    label: {
      en: "routed by a supervisor, checked by a critic",
      uz: "supervayzer yo'naltiradi, kritik tekshiradi",
    },
  },
  "kidbook-ai": {
    value: "8 pages",
    label: {
      en: "illustrated, in about two minutes",
      uz: "rasmli, taxminan ikki daqiqada",
    },
  },
  "student-performance-early-warning-system": {
    value: "0.781 recall",
    label: {
      en: "at 30% through the course",
      uz: "kursning 30% qismida",
    },
  },
};

/**
 * Technologies whose display name differs from the string used in projects.json.
 * Applied when building the skills grid so a version-pinned entry and its plain
 * name do not both appear as separate badges.
 */
export const techAliases: Record<string, string> = {
  "React 18": "React",
};

export type SkillGroupKey =
  | "languages"
  | "modelling"
  | "agents"
  | "interfaces"
  | "platform";

/**
 * Hand-grouped, but the members are checked against the union of `techStack`
 * across projects.json at build time — a technology added to a project and not
 * placed in a group here will fail the build rather than silently disappear.
 */
export const skillGroups: Record<SkillGroupKey, string[]> = {
  languages: ["Python", "TypeScript", "Node.js"],
  modelling: [
    "scikit-learn",
    "XGBoost",
    "LightGBM",
    "PyTorch",
    "K-Means",
    "TF-IDF",
    "LinearSVC",
    "ResNet50",
    "MobileNetV3",
    "SHAP",
    "NLP",
  ],
  agents: [
    "LangGraph",
    "LangChain",
    "OpenAI",
    "Gemini",
    "Qdrant",
    "Tavily",
    "RAGAS",
    "Langfuse",
  ],
  interfaces: ["FastAPI", "Next.js", "React", "Vite", "Express", "Tailwind CSS"],
  platform: ["Docker", "Vercel", "Render"],
};

export type TimelineEntry = {
  period: string;
  role: Localized;
  org: Localized;
  detail: Localized;
};

/**
 * @todo Add your career progression. The Experience section renders only when
 * this array is non-empty, so the site ships clean until you fill it in.
 *
 * Example shape:
 * {
 *   period: "2024 — now",
 *   role: { en: "AI Engineer", uz: "AI muhandisi" },
 *   org: { en: "Freelance", uz: "Frilans" },
 *   detail: { en: "…", uz: "…" },
 * }
 */
export const timeline: TimelineEntry[] = [];
