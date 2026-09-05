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
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-subtle bg-page shadow-2xl">
        <div className="flex items-center justify-between border-b border-subtle px-5 py-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-accent uppercase">
              Recruiter mode
            </p>
            <p className="mt-1 text-sm text-fg">30-second brief</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="btn-secondary px-3 py-1.5 text-xs"
            aria-label="Close"
          >
            Close
          </button>
        </div>

        <div className="flex-1 space-y-8 overflow-y-auto px-5 py-6">
          <p className="text-sm leading-relaxed text-body">
            {recruiterBrief.pitch}
          </p>

          <div>
            <p className="section-label">Best fit</p>
            <ul className="mt-3 space-y-2">
              {recruiterBrief.bestFit.map((role) => (
                <li
                  key={role}
                  className="border border-subtle bg-surface px-3 py-2 text-sm text-fg"
                >
                  {role}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label">Proof to open first</p>
            <ul className="mt-3 space-y-3">
              {recruiterBrief.proofPoints.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border border-subtle bg-surface p-3 transition-colors hover:border-accent"
                  >
                    <p className="text-sm font-medium text-fg">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {item.why}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="section-label">Stack focus</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {recruiterBrief.stackFocus.map((tech) => (
                <span
                  key={tech}
                  className="tag px-2 py-0.5 text-[10px] uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-subtle p-5">
          <a
            href={`mailto:${site.email}?subject=Role%20fit%20from%20your%20portfolio`}
            className="btn-primary block w-full py-3 text-center text-sm font-medium"
          >
            Email {site.shortName}
          </a>
          <p className="mt-3 text-center text-[10px] text-muted-2">
            Tip: press <kbd className="text-accent">R</kbd> anytime to toggle
            this panel
          </p>
        </div>
      </aside>
    </div>
  );
}
