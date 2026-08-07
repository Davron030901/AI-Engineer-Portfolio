export type Locale = "en" | "uz";

export const LOCALES: readonly Locale[] = ["en", "uz"] as const;
export const DEFAULT_LOCALE: Locale = "en";

export type Localized = Record<Locale, string>;

export const CATEGORIES = [
  "ML",
  "Cloud & Data",
  "Full-Stack AI",
  "LLM & RAG",
  "CV",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type CaseStudy = {
  problem: Localized;
  solution: Localized;
  architecture: Localized;
  results: Localized;
};

export type Project = {
  slug: string;
  title: Localized;
  description: Localized;
  category: Category;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: CaseStudy;
};

export const CASE_STUDY_SECTIONS = [
  "problem",
  "solution",
  "architecture",
  "results",
] as const;

export type CaseStudySection = (typeof CASE_STUDY_SECTIONS)[number];
