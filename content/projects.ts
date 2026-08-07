import raw from "./projects.json";
import {
  CASE_STUDY_SECTIONS,
  CATEGORIES,
  LOCALES,
  type Category,
  type Project,
} from "@/lib/types";

/**
 * projects.json is the single source of truth for every project claim on this
 * site. It is validated here rather than cast, so a malformed or half-edited
 * entry fails `next build` — and therefore the Vercel deployment — instead of
 * rendering an empty card in production.
 */
function fail(where: string, message: string): never {
  throw new Error(`content/projects.json — ${where}: ${message}`);
}

function assertLocalized(value: unknown, where: string): Record<string, string> {
  if (typeof value !== "object" || value === null) {
    fail(where, "expected an object with `en` and `uz` keys");
  }
  const record = value as Record<string, unknown>;
  for (const locale of LOCALES) {
    const text = record[locale];
    if (typeof text !== "string" || text.trim() === "") {
      fail(where, `missing or empty \`${locale}\` string`);
    }
  }
  return record as Record<string, string>;
}

function validate(input: unknown): Project[] {
  if (!Array.isArray(input)) fail("root", "expected an array");

  const seen = new Set<string>();

  return input.map((entry, index) => {
    const item = entry as Record<string, unknown>;
    const slug = item.slug;

    if (typeof slug !== "string" || !/^[a-z0-9-]+$/.test(slug)) {
      fail(`[${index}]`, "slug must be lowercase kebab-case");
    }
    if (seen.has(slug)) fail(slug, "duplicate slug");
    seen.add(slug);

    if (!CATEGORIES.includes(item.category as Category)) {
      fail(slug, `unknown category "${String(item.category)}"`);
    }
    if (
      !Array.isArray(item.techStack) ||
      item.techStack.length === 0 ||
      item.techStack.some((tech) => typeof tech !== "string")
    ) {
      fail(slug, "techStack must be a non-empty array of strings");
    }
    if (typeof item.image !== "string" || !item.image.startsWith("/")) {
      fail(slug, "image must be a root-relative path");
    }
    if (typeof item.featured !== "boolean") {
      fail(slug, "featured must be a boolean");
    }

    assertLocalized(item.title, `${slug}.title`);
    assertLocalized(item.description, `${slug}.description`);

    if (item.caseStudy !== undefined) {
      const study = item.caseStudy as Record<string, unknown>;
      for (const section of CASE_STUDY_SECTIONS) {
        assertLocalized(study[section], `${slug}.caseStudy.${section}`);
      }
    } else if (item.featured) {
      fail(slug, "featured projects must have a caseStudy");
    }

    return entry as Project;
  });
}

export const projects: Project[] = validate(raw);

export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** Categories that actually contain at least one project, in display order. */
export const activeCategories: Category[] = CATEGORIES.filter((category) =>
  projects.some((project) => project.category === category),
);

export function countByCategory(category: Category): number {
  return projects.filter((project) => project.category === category).length;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Every distinct technology named across all projects. */
export const allTech: string[] = Array.from(
  new Set(projects.flatMap((project) => project.techStack)),
).sort((a, b) => a.localeCompare(b));
