"use client";

import { experience } from "@/data/portfolio";

export function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">04 / Experience</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Where I&apos;ve worked
        </h2>
        <span className="accent-line" />

        <div className="mt-14 space-y-0">
          {experience.map((job) => (
            <div
              key={`${job.company}-${job.period}`}
              className="grid gap-2 border-t border-subtle py-8 md:grid-cols-[200px_1fr] md:gap-8"
            >
              <div>
                <p className="text-xs text-accent">{job.period}</p>
                <p className="mt-1 text-xs text-muted-2">{job.location}</p>
              </div>
              <div>
                <h3 className="text-base font-medium text-fg">{job.role}</h3>
                <p className="mt-0.5 text-sm text-muted">{job.company}</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-2">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
