import { getProject } from "./projects";
import { highlights as raw } from "./site";
import { CASE_STUDY_SECTIONS, LOCALES, type Localized } from "@/lib/types";

/**
 * Featured cards show a headline figure. Nothing may be invented here, so each
 * number in a highlight is checked against the project's own copy in
 * projects.json before the page can build.
 *
 * Spelled-out numbers count: the copy says "eight pages", the card says
 * "8 pages", and that is the same claim.
 */
const NUMBER_WORDS: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
  ten: "10",
  eleven: "11",
  twelve: "12",
};

function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(
      new RegExp(`\\b(${Object.keys(NUMBER_WORDS).join("|")})\\b`, "g"),
      (word) => NUMBER_WORDS[word],
    );
}

function numbersIn(text: string): string[] {
  return text.match(/\d+(?:[.,]\d+)?/g) ?? [];
}

export type Highlight = { value: string; label: Localized };

function validate(): Record<string, Highlight> {
  for (const [slug, highlight] of Object.entries(raw)) {
    const project = getProject(slug);
    if (!project) {
      throw new Error(`content/site.ts — highlight for unknown project "${slug}"`);
    }
    if (!project.featured) {
      throw new Error(
        `content/site.ts — highlight for "${slug}", which is not a featured project`,
      );
    }

    const haystack = normalise(
      [
        ...LOCALES.map((locale) => project.description[locale]),
        ...(project.caseStudy
          ? CASE_STUDY_SECTIONS.flatMap((section) =>
              LOCALES.map((locale) => project.caseStudy![section][locale]),
            )
          : []),
      ].join(" "),
    );

    const claimed = [
      ...numbersIn(highlight.value),
      ...LOCALES.flatMap((locale) => numbersIn(highlight.label[locale])),
    ];

    for (const figure of claimed) {
      if (!haystack.includes(figure)) {
        throw new Error(
          `content/site.ts — highlight for "${slug}" claims "${figure}", which does not appear anywhere in that project's copy in projects.json`,
        );
      }
    }
  }

  return raw;
}

export const highlights: Record<string, Highlight> = validate();
