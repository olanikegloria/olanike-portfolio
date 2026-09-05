"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { navLinks, site } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { useRecruiterMode } from "@/components/RecruiterProvider";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { toggle: toggleRecruiter } = useRecruiterMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-subtle bg-header backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5 md:h-16 md:px-8">
        <Link href="/" className="font-display text-lg text-fg md:text-xl">
          {site.shortName}
          <span className="text-accent">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="link-accent text-[13px]"
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggleRecruiter}
            className="btn-secondary ml-1 px-3.5 py-1.5 text-[13px]"
            title="Press R"
          >
            Recruiter
          </button>
          <a
            href={site.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary ml-1 px-3.5 py-1.5 text-[13px]"
          >
            Resume
          </a>
        </nav>

        <button
          type="button"
          aria-label="Menu"
          className="relative h-8 w-8 md:hidden"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span
            className={cn(
              "absolute top-2 left-1 block h-px w-6 bg-fg transition-all",
              menuOpen && "top-[15px] rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute top-[15px] left-1 block h-px w-6 bg-fg transition-all",
              menuOpen && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute top-[22px] left-1 block h-px w-6 bg-fg transition-all",
              menuOpen && "top-[15px] -rotate-45",
            )}
          />
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-subtle bg-page px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="link-accent text-sm"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                toggleRecruiter();
              }}
              className="btn-secondary w-fit px-3.5 py-1.5 text-sm"
            >
              Recruiter mode
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
