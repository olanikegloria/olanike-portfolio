"use client";

import Link from "next/link";
import { site, stats } from "@/data/portfolio";

export function Hero() {
  return (
    <section className="relative px-5 pt-28 pb-20 md:px-8 md:pt-36 md:pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="section-label">{site.role}</p>

          <h1 className="font-display mt-5 text-[clamp(2.5rem,6.5vw,4rem)] leading-[1.12] text-fg">
            {site.headline}
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
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
