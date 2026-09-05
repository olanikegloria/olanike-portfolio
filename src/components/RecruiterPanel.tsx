"use client";

import Link from "next/link";
import { recruiterBrief } from "@/data/standout";
import { site } from "@/data/portfolio";
import { useRecruiterMode } from "@/components/RecruiterProvider";

export function RecruiterPanel() {
  const { open, setOpen } = useRecruiterMode();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        aria-label="Close recruiter mode"
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="recruiter-title"
        className="absolute inset-y-0 right-0 flex w-full max-w-xl flex-col border-l border-subtle bg-page shadow-2xl animate-in"
      >
        <header className="flex items-start justify-between gap-4 border-b border-subtle px-5 py-4 md:px-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-accent uppercase">
              Recruiter brief
            </p>
            <h2 id="recruiter-title" className="mt-1 font-display text-xl text-fg">
              What to know in 60 seconds
            </h2>
            <p className="mt-1 text-xs text-muted">
              Built for the hiring scan - role, stack, proof, contact.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-secondary shrink-0 px-3 py-1.5 text-xs"
          >
            Close
          </button>
        </header>

        <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6 md:px-6">
          {/* Positioning */}
          <section>
            <p className="text-[15px] leading-relaxed text-body">
              {recruiterBrief.positioning}
            </p>
            <div className="mt-4 grid gap-2 rounded-sm border border-subtle bg-surface p-3 text-xs text-muted sm:grid-cols-2">
              <p>
                <span className="text-muted-2">Status · </span>
                <span className="text-fg">{recruiterBrief.availability.status}</span>
              </p>
              <p>
                <span className="text-muted-2">Based · </span>
                <span className="text-fg">
                  {recruiterBrief.availability.location}
                </span>
              </p>
              <p className="sm:col-span-2">
                <span className="text-muted-2">Work style · </span>
                <span className="text-fg">
                  {recruiterBrief.availability.workStyle}
                </span>
              </p>
            </div>
          </section>

          {/* Open to */}
          <section>
            <p className="section-label">Open to</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {recruiterBrief.openTo.map((role) => (
                <li
                  key={role}
                  className="border border-accent/30 bg-accent/5 px-3 py-1.5 text-xs text-fg"
                >
                  {role}
                </li>
              ))}
            </ul>
          </section>

          {/* Stack keywords - ATS / recruiter filter */}
          <section>
            <p className="section-label">Stack keywords</p>
            <p className="mt-1 text-[11px] text-muted-2">
              What shows up in the first-pass tech filter
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recruiterBrief.stackKeywords.map((tech) => (
                <span
                  key={tech}
                  className="tag px-2.5 py-1 text-[10px] tracking-wide uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Featured work - problem / outcome */}
          <section>
            <p className="section-label">Featured proof</p>
            <p className="mt-1 text-[11px] text-muted-2">
              Problem → outcome. Open a case study if you want depth.
            </p>
            <ul className="mt-4 space-y-3">
              {recruiterBrief.featuredWork.map((item, i) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border border-subtle bg-surface p-4 transition-colors hover:border-accent"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="text-sm font-medium text-fg">
                        <span className="mr-2 font-mono text-[10px] text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.title}
                      </p>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      <span className="text-muted-2">Problem · </span>
                      {item.problem}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-body">
                      <span className="text-muted-2">Outcome · </span>
                      {item.outcome}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-muted-2">
                      {item.stack}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* Signals */}
          <section>
            <p className="section-label">Working signals</p>
            <ul className="mt-3 space-y-2">
              {recruiterBrief.signals.map((signal) => (
                <li
                  key={signal}
                  className="flex gap-2 text-xs leading-relaxed text-muted"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {signal}
                </li>
              ))}
            </ul>
          </section>

          {/* Education */}
          <section>
            <p className="section-label">Credentials snapshot</p>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              {recruiterBrief.educationHighlight}
            </p>
          </section>
        </div>

        {/* Sticky contact bar - recruiters jump here when yes */}
        <footer className="border-t border-subtle bg-page px-5 py-4 md:px-6">
          <div className="flex flex-wrap gap-2">
            <a
              href={`mailto:${site.email}?subject=${encodeURIComponent("Opportunity from your portfolio")}`}
              className="btn-primary flex-1 px-4 py-2.5 text-center text-sm font-medium"
            >
              Email
            </a>
            <a
              href={site.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 px-4 py-2.5 text-center text-sm"
            >
              LinkedIn
            </a>
            <a
              href={site.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex-1 px-4 py-2.5 text-center text-sm"
            >
              GitHub
            </a>
          </div>
          <p className="mt-3 text-center text-[10px] text-muted-2">
            {site.email} · Press <kbd className="text-accent">R</kbd> to toggle ·{" "}
            <kbd className="text-accent">Esc</kbd> to close
          </p>
        </footer>
      </aside>
    </div>
  );
}
