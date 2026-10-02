import { ImageResponse } from "next/og";
import { featuredProjects, getProject } from "@/content/projects";
import { highlights } from "@/content/highlights";
import { person } from "@/content/site";
import { ui } from "@/content/ui";
import { DEFAULT_LOCALE } from "@/lib/types";

/**
 * Social card for each case study, generated at build time from the same data
 * as the page, so a shared link previews the project rather than a screenshot
 * that may not exist yet. Colours are the dark palette from globals.css.
 */
export const alt = "Case study";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

const colors = {
  canvas: "#10141c",
  line: "#2a3140",
  ink: "#e7ebf3",
  muted: "#a2adc0",
  subtle: "#828ea3",
  accent: "#5fd8cb",
};

export default function Image({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  const locale = DEFAULT_LOCALE;
  const title = project ? project.title[locale] : person.name;
  const category = project ? ui.categories[project.category][locale] : "";
  const highlight = project ? highlights[project.slug] : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.canvas,
          color: colors.ink,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: colors.accent,
            }}
          >
            {`${ui.caseStudy.eyebrow[locale]}  ·  ${category}`}
          </div>
          {/* The measurement rule: a hairline with one tick, as on the site. */}
          <div style={{ display: "flex", position: "relative", marginTop: 28, height: 1, background: colors.line }}>
            <div
              style={{ position: "absolute", left: 220, top: -4, width: 2, height: 9, background: colors.accent }}
            />
          </div>
          <div style={{ display: "flex", marginTop: 44, fontSize: 72, fontWeight: 700, lineHeight: 1.08 }}>
            {title}
          </div>
          {highlight && (
            <div style={{ display: "flex", alignItems: "baseline", marginTop: 36, fontSize: 32 }}>
              <span style={{ color: colors.accent, fontWeight: 700 }}>{highlight.value[locale]}</span>
              <span style={{ marginLeft: 16, color: colors.muted }}>{highlight.label[locale]}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: colors.subtle }}>
          <span>{person.name}</span>
          <span>{`github.com/${person.githubHandle}`}</span>
        </div>
      </div>
    ),
    size,
  );
}
