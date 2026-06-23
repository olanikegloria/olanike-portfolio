"use client";

import Image from "next/image";
import { about, education } from "@/data/portfolio";

export function About() {
  return (
    <section
      id="about"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">01 / About</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Engineer, automator, problem solver
        </h2>
        <span className="accent-line" />

        <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          <div className="mx-auto w-full max-w-[240px] lg:mx-0">
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="absolute inset-0 bg-[#5a5a5a]" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#707070] via-[#585858] to-[#454545]" />
              <Image
                src="/profile.png"
                alt="Olanike Olatunji"
                fill
                priority
                className="relative object-cover object-[center_12%] saturate-[0.9]"
                sizes="240px"
              />
              <div className="pointer-events-none absolute inset-0 bg-[#555555]/20 mix-blend-multiply" />
            </div>
            <p className="mt-3 text-center text-xs text-muted lg:text-left">
              Lagos, Nigeria
            </p>
          </div>

          <div>
            <p className="text-[17px] leading-[1.75] text-body">{about.intro}</p>
            <p className="mt-5 text-[17px] leading-[1.75] text-muted">
              {about.extended}
            </p>

            <div className="mt-12 space-y-8">
              {[
                { title: "Why I do this", body: about.motivation },
                { title: "How I work", body: about.approach },
                { title: "Where I'm headed", body: about.goals },
              ].map((item) => (
                <div
                  key={item.title}
                  className="border-l-2 border-accent-soft pl-5"
                >
                  <h3 className="text-sm font-medium text-fg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-subtle pt-14">
          <p className="section-label">Education</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {education.map((edu) => (
              <div key={edu.school} className="bg-surface p-6">
                <p className="font-medium text-fg">{edu.degree}</p>
                <p className="mt-1 text-sm text-muted">{edu.school}</p>
                <p className="mt-1 text-xs text-muted-2">{edu.detail}</p>
                <p className="mt-3 text-xs text-accent">{edu.period}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
