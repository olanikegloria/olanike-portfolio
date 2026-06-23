"use client";

import { FormEvent, useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/data/portfolio";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hi Olanike,\n\n${message}\n\n- ${name}\n${email}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  }

  return (
    <section
      id="contact"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-14 lg:grid-cols-2">
          <div>
            <p className="section-label">06 / Contact</p>
            <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
              Got a workflow that&apos;s eating your team&apos;s week?
            </h2>
            <span className="accent-line" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Open to automation projects, software engineering roles, and
              consulting. Drop a message or reach out directly.
            </p>

            <div className="mt-8 space-y-3">
              <a
                href={`mailto:${site.email}`}
                className="link-accent flex items-center gap-2 text-sm text-body"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent flex items-center gap-2 text-sm text-body"
              >
                <ArrowUpRight className="h-4 w-4" />
                LinkedIn
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="link-accent flex items-center gap-2 text-sm text-body"
              >
                <ArrowUpRight className="h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs text-muted-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="input-field w-full px-3.5 py-3 text-sm"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs text-muted-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="input-field w-full px-3.5 py-3 text-sm"
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-xs text-muted-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="input-field w-full resize-none px-3.5 py-3 text-sm"
                placeholder="What are you looking to build or automate?"
              />
            </div>
            <button
              type="submit"
              className="btn-primary w-full py-3.5 text-sm font-medium"
            >
              {status === "sent" ? "Opening your email app…" : "Send message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
