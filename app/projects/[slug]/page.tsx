import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featuredProjects, getProject } from "@/content/projects";
import { CaseStudy } from "@/components/CaseStudy";
import { DEFAULT_LOCALE } from "@/lib/types";

type Params = { params: { slug: string } };

/** Only the featured slugs exist; anything else is a 404 at build time. */
export const dynamicParams = false;

export function generateStaticParams() {
  return featuredProjects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const title = project.title[DEFAULT_LOCALE];
  const description = project.description[DEFAULT_LOCALE];
  const path = `/projects/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    // The image comes from opengraph-image.tsx beside this file.
    openGraph: { type: "article", url: path, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default function ProjectPage({ params }: Params) {
  const project = getProject(params.slug);
  if (!project || !project.caseStudy) notFound();

  return <CaseStudy project={project} />;
}
