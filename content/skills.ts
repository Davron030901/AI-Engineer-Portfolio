import { allTech, projects } from "./projects";
import { skillGroups, techAliases, type SkillGroupKey } from "./site";

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

// The skills grid is only trustworthy if it covers exactly what the projects
// use. Both directions are checked, so adding a technology to a project without
// grouping it here — or leaving a group entry behind after removing it from a
// project — fails `next build` instead of quietly changing the page.
const usedNames = new Set(allTech.map(display));
const groupedNames = new Set(Object.values(skillGroups).flat());

const ungrouped = [...usedNames].filter((name) => !groupedNames.has(name));
if (ungrouped.length > 0) {
  throw new Error(
    `content/site.ts — these technologies are used in projects.json but not placed in skillGroups: ${ungrouped.join(", ")}`,
  );
}

const orphaned = [...groupedNames].filter((name) => !usedNames.has(name));
if (orphaned.length > 0) {
  throw new Error(
    `content/site.ts — these skillGroups entries are not used by any project: ${orphaned.join(", ")}`,
  );
}

export type Skill = { name: string; count: number };

export const skillGroupEntries: Array<{ key: SkillGroupKey; items: Skill[] }> = (
  Object.keys(skillGroups) as SkillGroupKey[]
).map((key) => ({
  key,
  items: skillGroups[key]
    .map((name) => ({ name, count: usage.get(name) ?? 0 }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)),
}));
