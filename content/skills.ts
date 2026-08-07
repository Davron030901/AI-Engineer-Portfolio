import { allTech, projects } from "./projects";
import { cvOnlySkills, skillGroups, techAliases, type SkillGroupKey } from "./site";

/** Version-pinned names collapse to their plain display name. */
function display(tech: string): string {
  return techAliases[tech] ?? tech;
}

const usage = new Map<string, number>();
for (const project of projects) {
  // A project naming both "React" and "React 18" should still count once.
  for (const name of new Set(project.techStack.map(display))) {
    usage.set(name, (usage.get(name) ?? 0) + 1);
  }
}

// The grid is only trustworthy if it accounts for everything, both directions.
// A technology used by a project but left out of every group would silently
// vanish; a group entry no project uses and the CV does not claim is a typo.
// Either fails `next build` rather than changing the page.
const usedNames = new Set(allTech.map(display));
const groupedNames = new Set(Object.values(skillGroups).flat());
const cvNames = new Set(cvOnlySkills);

const ungrouped = [...usedNames].filter((name) => !groupedNames.has(name));
if (ungrouped.length > 0) {
  throw new Error(
    `content/site.ts — used in projects.json but not placed in skillGroups: ${ungrouped.join(", ")}`,
  );
}

const unaccounted = [...groupedNames].filter(
  (name) => !usedNames.has(name) && !cvNames.has(name),
);
if (unaccounted.length > 0) {
  throw new Error(
    `content/site.ts — in skillGroups but used by no project and not listed in cvOnlySkills: ${unaccounted.join(", ")}`,
  );
}

const stale = [...cvNames].filter((name) => !groupedNames.has(name));
if (stale.length > 0) {
  throw new Error(
    `content/site.ts — listed in cvOnlySkills but not placed in any group: ${stale.join(", ")}`,
  );
}

/** `count` is 0 for skills that come from the CV rather than a project here. */
export type Skill = { name: string; count: number };

export const skillGroupEntries: Array<{ key: SkillGroupKey; items: Skill[] }> = (
  Object.keys(skillGroups) as SkillGroupKey[]
).map((key) => ({
  key,
  items: skillGroups[key]
    .map((name) => ({ name, count: usage.get(name) ?? 0 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
}));
