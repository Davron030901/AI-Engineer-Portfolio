# AI Engineer Portfolio

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · English / Uzbek · Deployed on Vercel.

Fifteen projects, four with full case studies, all driven by `content/projects.json`.

---

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

| Command | What it does |
|---|---|
| `npm run build` | Runs the asset check, then `next build` |
| `npm run check` | Lists missing assets and unfinished content |
| `npm run check:strict` | Same, but exits non-zero while anything is pending |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

> The build fetches Inter, Space Grotesk and JetBrains Mono from Google Fonts via
> `next/font`. That requires network access at build time — fine on Vercel, but a
> firewalled build machine will fail here.

---

## Still needed

Everything below is tracked by `npm run check`. Nothing here blocks a deploy yet;
setting `ASSETS_STRICT=1` in Vercel makes all of it blocking, which is what you
should do once the list is empty.

**In `content/site.ts`** (each line is tagged `@todo`):

- **Full name** — currently just `Davron`.
- **Email**, **LinkedIn**, **Telegram** — all `null`. The Contact section and
  footer render only the channels that are set, so unset ones are simply absent
  rather than dead links. GitHub is already wired.
- **Timeline entries** — the array is empty, so the Experience section does not
  render at all. Add entries and it appears.

**In `content/ui.ts`:**

- **`about.story`** — the career-transition paragraph. The two paragraphs above
  it are written and shipping; this one is yours. Empty means it is skipped.

**Assets:**

- **CV** — `public/cv/cv.pdf` is a placeholder page that says so. Replace it with
  your real CV, or rename it and update `cvPath` in `content/site.ts`.
- **Screenshots** — all fifteen are placeholders. Capture each live demo at
  1280×800, save over `public/projects/<slug>.png`, and remove that slug from
  `content/pending-screenshots.json`. Cards show a `placeholder` tag and use
  "Screenshot pending for …" as alt text until you do.
- **Open Graph image** — `public/og.png` carries the placeholder name. Regenerate
  it once the name is final.

---

## Content model

`content/projects.json` is the single source of truth for every project claim.
It is validated at build time by `content/projects.ts` rather than cast, so a
malformed entry fails the build instead of rendering an empty card.

```ts
type Project = {
  slug: string;
  title: { en: string; uz: string };
  description: { en: string; uz: string };
  category: "ML" | "Cloud & Data" | "Full-Stack AI" | "LLM & RAG" | "CV";
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  caseStudy?: {
    problem: { en: string; uz: string };
    solution: { en: string; uz: string };
    architecture: { en: string; uz: string };
    results: { en: string; uz: string };
  };
};
```

Three guardrails run during `next build`, so the site cannot quietly drift away
from its own data:

1. **Schema** — a featured project without a `caseStudy`, a duplicate slug, an
   unknown category or a missing `uz` string stops the build.
2. **Skills coverage** — every technology named in `projects.json` must appear in
   exactly one group in `skillGroups`, and every grouped entry must be used by at
   least one project. Both directions are checked.
3. **Headline figures** — the numbers on the featured cards (`highlights` in
   `content/site.ts`) must already appear in that project's own copy. Spelled-out
   numbers count, so "eight pages" in the copy backs "8 pages" on the card. A
   figure that appears nowhere in the data fails the build.

Adding a project: append to `content/projects.json`, drop a screenshot in
`public/projects/`, and place any new technology into a group in
`content/site.ts`. Everything else — filters, counts, skills, sitemap — follows.

### Categories

Filter chips are derived from the data at build time, so a category with no
projects never renders a chip. `Cloud & Data` is currently empty and therefore
hidden. `CV` is labelled **Computer Vision** in the interface, never abbreviated,
because "CV" collides with the CV download button.

---

## Internationalization

Every string lives as `{ en, uz }` — interface copy in `content/ui.ts`, project
copy in `content/projects.json`. A React context supplies `t()`; there are no
locale-prefixed routes and no middleware, which is what keeps every page static.

English is server-rendered so crawlers and the static HTML agree. The visitor's
choice is read from `localStorage` after hydration and `<html lang>` follows it.

To add a language: extend `LOCALES` in `lib/types.ts`, then TypeScript will point
at every object that needs the new key.

---

## Structure

```
app/
  layout.tsx              fonts, metadata, JSON-LD, theme script, providers
  page.tsx                Hero · About · Projects · Skills · Timeline · Contact
  projects/[slug]/        case study route, generateStaticParams over featured
  sitemap.ts robots.ts    both use the same resolved origin
components/
  providers/              LocaleProvider, ThemeProvider (+ the pre-paint script)
  Navbar LanguageSwitcher ThemeToggle
  Hero About Skills SkillBadge Timeline Contact Footer
  Projects ProjectFilter ProjectCard FeaturedProjectCard CaseStudy
  MetricRule              the signature element
  Reveal SectionHeader Icons
content/
  projects.json           real project data
  projects.ts             validated loader + derived helpers
  ui.ts site.ts           interface strings / everything personal
  highlights.ts skills.ts derived, self-checking
lib/
  types.ts i18n.ts site-url.ts cn.ts
scripts/
  check-assets.mjs        runs on prebuild, including on Vercel
```

---

## Design system

Two palettes, tuned independently in `app/globals.css` — dark is not an
inversion of light, and every foreground/background pair clears WCAG AA. Colours
are CSS variables holding RGB triples, exposed to Tailwind as named tokens
(`ink`, `ink-muted`, `canvas`, `surface`, `line`, `primary`, `accent`, …).

Type is Space Grotesk for display, Inter for body, JetBrains Mono for anything
technical — badges, counts, figures, eyebrows. Sizes are fluid via `clamp()`.

The signature element is **the measurement rule**: a hairline with one labelled
tick, in `components/MetricRule.tsx`. It marks the places where the page states
something it can back up, which is the habit every project here shares. The
boldness budget is spent there; everything around it stays quiet.

Motion is transform and opacity only, and `Reveal` collapses to a plain render
under `prefers-reduced-motion`.

---

## Deploying to Vercel

1. `git init && git add -A && git commit -m "portfolio"`, then push to GitHub.
2. Vercel → **Add New → Project** → import the repo. The Next.js preset is
   detected automatically; leave the build and install commands at their
   defaults and the root directory at `./`.
3. Deploy. The first build runs `scripts/check-assets.mjs` and will fail if a
   referenced screenshot, the CV, or the OG image is missing.
4. Attach a custom domain in **Settings → Domains**, then set
   `NEXT_PUBLIC_SITE_URL` to that origin (Production scope) and redeploy.
5. Once the "Still needed" list is empty, add `ASSETS_STRICT=1` so it stays that
   way.
6. Run Lighthouse against the production URL, not `localhost`.

### Environment variables

| Variable | Scope | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production | Canonical origin once a domain is attached |
| `ASSETS_STRICT` | Production | `1` makes placeholders and `@todo`s fail the build |

There are no secrets in this project. Origins resolve automatically:
`NEXT_PUBLIC_SITE_URL` → the production domain → the deployment's own URL on
previews → `localhost:3000` in development. Preview deployments are also
`Disallow: /` in `robots.txt`, so they never compete with production in search.

### What keeps it fast

Every route is prerendered — check for `○ (Static)` and `● (SSG)` in the build
output and treat an `ƒ (Dynamic)` as a regression. Route handlers, `cookies()`,
`headers()` and middleware all opt routes out of the edge cache, so none are
used.

Vercel's Hobby tier meters image transformations, and there are fifteen
screenshots. Keep them at 1280px wide, keep the `sizes` prop on every
`next/image` accurate, and keep `priority` on just the first featured card.

`vercel.json` only adds security headers and a cache rule for the CV. It
deliberately does not set `builds` or `routes`, which would disable the Next.js
preset.
#   A I - E n g i n e e r - P o r t f o l i o  
 