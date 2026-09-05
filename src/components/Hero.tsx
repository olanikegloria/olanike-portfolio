"use client";

import Link from "next/link";
import { site, stats } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="relative px-5 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="font-display text-[clamp(2.75rem,7vw,4.25rem)] leading-[1.05] text-fg">
            {site.name}
          </p>
          <p className="section-label mt-4">{site.role}</p>

          <h1 className="mt-6 max-w-2xl text-[clamp(1.25rem,2.8vw,1.65rem)] font-medium leading-snug text-body">
            {site.headline}
          </h1>

          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-muted">
            {site.tagline}
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="#projects" className="btn-primary px-5 py-2.5 text-sm font-medium">
              See my work
            </Link>
            <Link href="#contact" className="btn-secondary px-5 py-2.5 text-sm">
              Get in touch
            </Link>
          </div>
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
