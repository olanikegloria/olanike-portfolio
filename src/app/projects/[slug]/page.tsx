import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectGallery } from "@/components/ProjectGallery";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Olanike Olatunji`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article className="px-5 pt-24 pb-20 md:px-8 md:pt-28 md:pb-28">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/#projects"
          className="link-accent inline-flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to work
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-muted-2">
          <span className="tag px-2 py-0.5 uppercase tracking-wide">
            {project.category}
          </span>
          <span>{project.year}</span>
        </div>

        <h1 className="font-display mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight text-fg">
          {project.title}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted">
          {project.shortDescription}
        </p>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.tools.map((tool) => (
            <span key={tool} className="tag px-2 py-0.5 text-[10px] tracking-wide uppercase">
              {tool}
            </span>
          ))}
        </div>

        {(project.liveUrl || project.links?.length) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium"
              >
                View live
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            )}
            {project.links?.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center gap-1.5 px-4 py-2 text-sm"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ))}
          </div>
        )}

        <ProjectGallery project={project} />

        <div className="prose-section mt-14 space-y-10">
          <section>
            <h2 className="text-sm font-medium text-accent">Overview</h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-body">
              {project.overview}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-accent">Problem</h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-body">
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="text-sm font-medium text-accent">Solution</h2>
            <p className="mt-3 text-[15px] leading-[1.8] text-body">
              {project.solution}
            </p>
            {project.solutionSteps && (
              <ol className="mt-5 space-y-3">
                {project.solutionSteps.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span className="shrink-0 font-medium text-accent">
                      {i + 1}.
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            )}
          </section>

          {project.impact && (
            <section className="border-l-2 border-accent-medium pl-5">
              <h2 className="text-sm font-medium text-fg">Impact</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {project.impact}
              </p>
            </section>
          )}
        </div>
      </div>
    </article>
  );
}
