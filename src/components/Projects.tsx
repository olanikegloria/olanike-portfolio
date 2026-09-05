"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getProjectsByCategory, type ProjectCategory } from "@/data/projects";

const GROUPS: { key: ProjectCategory; label: string; kicker: string }[] = [
  { key: "ai", label: "AI & Automation", kicker: "/ ai" },
  { key: "devops", label: "DevOps & Platform", kicker: "/ devops" },
  { key: "software", label: "Frontend & Full-Stack", kicker: "/ software" },
];

export function Projects() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  let startIndex = 0;

  const counts = useMemo(
    () =>
      Object.fromEntries(
        GROUPS.map((g) => [g.key, getProjectsByCategory(g.key).length]),
      ) as Record<ProjectCategory, number>,
    [],
  );

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
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          Grouped by craft. One featured piece per category by default - open a
          category or tap See more to browse the rest.
        </p>

        <div className="mt-10 flex flex-wrap gap-2">
          <Chip
            active={active === "all"}
            onClick={() => setActive("all")}
            label="All categories"
          />
          {GROUPS.map((g) => (
            <Chip
              key={g.key}
              active={active === g.key}
              onClick={() => setActive(g.key)}
              label={`${g.label} (${counts[g.key]})`}
            />
          ))}
        </div>

        {GROUPS.map((group) => {
          const projects = getProjectsByCategory(group.key);
          const groupStart = startIndex;
          startIndex += projects.length;
          if (!projects.length) return null;
          if (active !== "all" && active !== group.key) return null;
          return (
            <ProjectGroup
              key={group.key}
              kicker={group.kicker}
              label={group.label}
              projects={projects}
              startIndex={groupStart}
              forceExpanded={active === group.key}
            />
          );
        })}
      </div>
    </section>
  );
}

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-subtle text-muted hover:border-accent/40 hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
}

function ProjectGroup({
  kicker,
  label,
  projects,
  startIndex,
  forceExpanded,
}: {
  kicker: string;
  label: string;
  projects: ReturnType<typeof getProjectsByCategory>;
  startIndex: number;
  forceExpanded: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const showAll = forceExpanded || expanded;
  const visible = showAll ? projects : projects.slice(0, 1);
  const hiddenCount = projects.length - 1;

  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-subtle pb-4">
        <div>
          <p className="font-mono text-xs tracking-[0.18em] text-accent uppercase">
            {kicker}
          </p>
          <h3 className="font-display mt-1 text-2xl text-fg md:text-3xl">
            {label}
          </h3>
        </div>
        <p className="text-xs text-muted-2">
          {projects.length} project{projects.length === 1 ? "" : "s"}
        </p>
      </div>

      <div className="mt-8 space-y-12">
        {visible.map((project, i) => (
          <article
            key={project.slug}
            className="group grid gap-6 md:grid-cols-2 md:gap-10"
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
                <h4 className="font-display mt-2 text-2xl text-fg transition-colors group-hover:text-accent">
                  {project.title}
                </h4>
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

      {!forceExpanded && hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="mt-8 inline-flex items-center gap-2 border border-subtle px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
        >
          {expanded ? "Show less" : `See ${hiddenCount} more in ${label}`}
        </button>
      )}
    </div>
  );
}
