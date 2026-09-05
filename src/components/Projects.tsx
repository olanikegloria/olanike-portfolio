"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProjectsByCategory, type ProjectCategory } from "@/data/projects";

const GROUPS: { key: ProjectCategory; label: string }[] = [
  { key: "ai", label: "AI & Automation" },
  { key: "devops", label: "DevOps & Platform (with AI)" },
  { key: "software", label: "Frontend & Full-Stack" },
];

export function Projects() {
  let startIndex = 0;

  return (
    <section
      id="projects"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">02 / Selected work</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Projects
        </h2>
        <span className="accent-line" />

        {GROUPS.map((group) => {
          const projects = getProjectsByCategory(group.key);
          const groupStart = startIndex;
          startIndex += projects.length;
          if (projects.length === 0) return null;
          return (
            <ProjectGroup
              key={group.key}
              label={group.label}
              projects={projects}
              startIndex={groupStart}
            />
          );
        })}
      </div>
    </section>
  );
}

function ProjectGroup({
  label,
  projects,
  startIndex,
}: {
  label: string;
  projects: ReturnType<typeof getProjectsByCategory>;
  startIndex: number;
}) {
  return (
    <div className="mt-14">
      <h3 className="text-sm font-medium text-muted">{label}</h3>
      <div className="mt-8 space-y-12">
        {projects.map((project, i) => (
          <article
            key={project.slug}
            className="group grid gap-6 border-t border-subtle pt-10 md:grid-cols-2 md:gap-10"
          >
            <Link
              href={`/projects/${project.slug}`}
              className="relative order-2 aspect-[16/10] overflow-hidden bg-surface md:order-1"
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </Link>

            <div className="order-1 flex flex-col justify-center md:order-2">
              <span className="text-xs text-muted-2">
                {String(startIndex + i + 1).padStart(2, "0")} · {project.year}
              </span>
              <Link href={`/projects/${project.slug}`}>
                <h3 className="font-display mt-2 text-2xl text-fg transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
              </Link>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {project.shortDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tools.slice(0, 6).map((tag) => (
                  <span
                    key={tag}
                    className="tag px-2 py-0.5 text-[10px] tracking-wide uppercase"
                  >
                    {tag}
                  </span>
                ))}
                {project.tools.length > 6 && (
                  <span className="text-[10px] text-muted-2">
                    +{project.tools.length - 6}
                  </span>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm text-accent transition-all hover:gap-2.5"
              >
                View case study
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
