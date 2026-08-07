import type { Localized } from "@/lib/types";

/**
 * Everything personal lives here, so nothing has to be hunted for in components.
 *
 * Lines carrying a todo tag are the only unfinished content on the site.
 * `npm run check` lists them; `npm run check:strict` (ASSETS_STRICT=1) fails the
 * build while any remain — switch that on in Vercel once the list is empty.
 */

export const person = {
  name: "Davron Aliqulov",
  /** Used where the full name would crowd the layout, e.g. the mobile navbar. */
  shortName: "Davron",
  githubHandle: "Davron030901",
  location: {
    en: "Tashkent, Uzbekistan",
    uz: "Toshkent, O'zbekiston",
  } satisfies Localized,
} as const;

export const links = {
  email: "davronaliqulov81@gmail.com",
  github: "https://github.com/Davron030901",
  /** Delete this line if you would rather not publish the number. */
  phone: "+998 90 342 20 01" as string | null,
  /** @todo Add your LinkedIn profile URL — it is not on the CV. */
  linkedin: null as string | null,
  /** @todo Add your Telegram URL, e.g. "https://t.me/username". */
  telegram: null as string | null,
} as const;

export const cvPath = "/cv/Davron-Aliqulov-CV.pdf";

/**
 * Presentation-only headline shown on the featured cards. The number in each
 * `value` must already appear in that project's own copy in projects.json —
 * content/highlights.ts enforces it, so no figure can be introduced here.
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
  | "vision"
  | "language"
  | "agents"
  | "interfaces"
  | "platform";

/**
 * Hand-grouped from two sources: the technologies used in the projects on this
 * site, and the ones on the CV that no project here demonstrates. Every project
 * technology must appear in at least one group, and every group member no
 * project uses must be declared in `cvOnlySkills` — both are enforced at build
 * time in content/skills.ts, so this list cannot quietly drift.
 */
export const skillGroups: Record<SkillGroupKey, string[]> = {
  languages: ["Python", "TypeScript", "Node.js"],
  modelling: [
    "scikit-learn",
    "XGBoost",
    "LightGBM",
    "PyTorch",
    "TensorFlow/Keras",
    "SHAP",
    "K-Means",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
  ],
  vision: ["OpenCV", "YOLOv8", "Tesseract OCR", "ResNet50", "MobileNetV3"],
  language: ["TF-IDF", "LinearSVC", "NLTK", "spaCy", "Hugging Face"],
  agents: [
    "LangGraph",
    "LangChain",
    "OpenAI",
    "Gemini",
    "Claude",
    "Qdrant",
    "Tavily",
    "RAGAS",
    "Langfuse",
    "MCP",
  ],
  interfaces: ["FastAPI", "Django", "Next.js", "React", "Vite", "Express", "Tailwind CSS"],
  platform: ["Docker", "Vercel", "Render", "Git", "Jupyter"],
};

/**
 * On the CV, but not demonstrated by any project on this site. These render
 * without a project count, so the grid stays honest about which is which.
 */
export const cvOnlySkills: string[] = [
  "TensorFlow/Keras",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Seaborn",
  "OpenCV",
  "YOLOv8",
  "Tesseract OCR",
  "NLTK",
  "spaCy",
  "Hugging Face",
  "Claude",
  "MCP",
  "Django",
  "Git",
  "Jupyter",
];

export type TimelineEntry = {
  period: string;
  role: Localized;
  org: Localized;
  detail: Localized;
  kind: "work" | "education";
};

export const timeline: TimelineEntry[] = [
  {
    period: "Mar 2026",
    kind: "work",
    role: { en: "Python Backend Developer", uz: "Python Backend dasturchi" },
    org: { en: "Nextin Web Studio, Tashkent", uz: "Nextin Web Studio, Toshkent" },
    detail: {
      en: "Backend logic for web applications in Python and FastAPI: API endpoints, integration with the frontend team, and query optimisation against the database.",
      uz: "Veb-ilovalar uchun Python va FastAPI'da backend mantiq: API endpointlar, frontend jamoasi bilan integratsiya va ma'lumotlar bazasiga so'rovlarni optimallashtirish.",
    },
  },
  {
    period: "Aug — Oct 2025",
    kind: "work",
    role: { en: "Python Backend Developer", uz: "Python Backend dasturchi" },
    org: { en: "ABS Vision, Tashkent", uz: "ABS Vision, Toshkent" },
    detail: {
      en: "Backend services for a computer-vision system: RESTful APIs in FastAPI, with YOLO and OpenCV models wired into the backend for video-stream processing, plus performance and database work.",
      uz: "Kompyuter ko'rish tizimi uchun backend xizmatlar: FastAPI'da RESTful API'lar, video oqimini qayta ishlash uchun YOLO va OpenCV modellarini backend qatlamiga ulash, unumdorlik va ma'lumotlar bazasi ustida ish.",
    },
  },
  {
    period: "Jan 2025 — present",
    kind: "work",
    role: {
      en: "AI Data Annotator & Quality Assessor",
      uz: "AI ma'lumot annotatori va sifat baholovchisi",
    },
    org: { en: "Yandex / Lavoro Solutions", uz: "Yandex / Lavoro Solutions" },
    detail: {
      en: "Annotated and reviewed training data for production ML models against a 98%+ accuracy standard, and assessed model output across NLP and vision tasks — finding the systematic errors and edge cases that fed back into the next training cycle.",
      uz: "Production ML modellari uchun o'quv ma'lumotlarini 98% dan yuqori aniqlik standartida annotatsiya qildim va tekshirdim, NLP hamda vision vazifalarida model natijalarini baholadim — keyingi trening tsikliga qaytariladigan tizimli xatolar va chekka holatlarni topdim.",
    },
  },
  {
    period: "2023 — 2025",
    kind: "education",
    role: { en: "AI Solutions & Applications", uz: "AI yechimlari va ilovalari" },
    org: { en: "PDP University", uz: "PDP University" },
    detail: {
      en: "Machine learning, deep learning, computer vision, NLP and AI system design.",
      uz: "Mashinaviy o'rganish, chuqur o'rganish, kompyuter ko'rish, NLP va AI tizimlarini loyihalash.",
    },
  },
  {
    period: "2019 — 2023",
    kind: "education",
    role: { en: "B.Sc. Physical Engineering", uz: "Fizika muhandisligi bakalavri" },
    org: { en: "Karshi State University", uz: "Qarshi davlat universiteti" },
    detail: {
      en: "A mathematics and physics foundation — and the habit of not trusting a result until the error is stated next to it.",
      uz: "Matematika va fizika poydevori — va natijaga uning xatoligi yonida ko'rsatilmaguncha ishonmaslik odati.",
    },
  },
];
