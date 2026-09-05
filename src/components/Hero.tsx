"use client";

import Link from "next/link";
import { site, stats } from "@/data/portfolio";
import { recruiterBrief } from "@/data/standout";
import { useRecruiterMode } from "@/components/RecruiterProvider";

export function Hero() {
  const { toggle } = useRecruiterMode();

  return (
    <section className="relative overflow-hidden px-5 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 15% -10%, rgba(201,169,110,0.14), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(122,162,200,0.06), transparent 45%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/35 bg-accent/10 px-3 py-1 text-[11px] text-accent">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              {recruiterBrief.availability.status}
            </span>
            <span className="text-[11px] text-muted-2">
              {recruiterBrief.availability.location}
            </span>
          </div>

          <p className="font-display mt-6 text-[clamp(2.75rem,7vw,4.25rem)] leading-[1.05] text-fg">
            {site.name}
          </p>
          <p className="section-label mt-4">{site.role}</p>

          <h1 className="mt-6 max-w-2xl text-[clamp(1.25rem,2.8vw,1.65rem)] font-medium leading-snug text-body">
            {site.headline}
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            {site.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {recruiterBrief.stackKeywords.slice(0, 7).map((tech) => (
              <span
                key={tech}
                className="tag px-2 py-0.5 text-[10px] tracking-wide uppercase"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="#projects"
              className="btn-primary px-5 py-2.5 text-sm font-medium"
            >
              See selected work
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="btn-secondary px-5 py-2.5 text-sm"
            >
              Recruiter brief
            </button>
            <a
              href={`mailto:${site.email}`}
              className="btn-secondary px-5 py-2.5 text-sm"
            >
              Email me
            </a>
          </div>
          <p className="mt-3 text-xs text-muted-2">
            Hiring? Press <kbd className="rounded border border-subtle px-1 text-accent">R</kbd>{" "}
            for a 60-second brief with proof links and contact.
          </p>
        </div>

        <dl className="mt-20 grid grid-cols-3 gap-6 border-t border-subtle pt-10 md:max-w-lg md:gap-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl text-accent md:text-4xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
