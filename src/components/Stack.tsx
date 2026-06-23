"use client";

import { technologies } from "@/data/technologies";
import { strengths } from "@/data/portfolio";
import { TechLogo } from "@/components/TechLogo";

export function Stack() {
  return (
    <section
      id="stack"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">03 / Stack</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Tools & technologies
        </h2>
        <span className="accent-line" />

        <div className="mt-14 flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-16">
          <div className="shrink-0 lg:w-[200px]">
            <h3 className="text-sm font-medium text-fg">
              What I&apos;m good at
            </h3>
            <ul className="mt-4 space-y-2">
              {strengths.map((skill) => (
                <li
                  key={skill}
                  className="flex items-baseline gap-2 text-sm text-muted"
                >
                  <span className="text-accent">·</span>
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:ml-auto lg:max-w-[520px]">
            <div className="grid grid-cols-5 gap-x-2 gap-y-3 sm:grid-cols-6 md:grid-cols-7">
              {technologies.map((tech) => (
                <div
                  key={tech.name}
                  className="flex flex-col items-center gap-1"
                >
                  <TechLogo tech={tech} />
                  <span className="w-full truncate text-center text-[9px] leading-tight text-tech-label">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
