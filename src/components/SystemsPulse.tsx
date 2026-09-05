"use client";

import Link from "next/link";
import { systemsPulse } from "@/data/standout";

export function SystemsPulse() {
  return (
    <section
      id="systems"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">03 / Systems pulse</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Six products on the bench
        </h2>
        <span className="accent-line" />
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          Not mockups. Independent engineering products with local demos,
          grounded AI, and case studies. A live pulse board so visitors see
          breadth without scrolling forever.
        </p>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2">
          {systemsPulse.map((system) => (
            <li key={system.name}>
              <Link
                href={system.href}
                className="group flex items-start justify-between gap-4 border border-subtle bg-surface p-4 transition-colors hover:border-accent"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                    </span>
                    <p className="text-sm font-medium text-fg group-hover:text-accent">
                      {system.name}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted">
                    {system.note}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-[10px] tracking-wide text-accent uppercase">
                    Demoable
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-muted-2">
                    :{system.port}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
