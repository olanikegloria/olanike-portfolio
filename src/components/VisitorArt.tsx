"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import type { DrawingSubmission } from "@/lib/gallery/types";

export function VisitorArt() {
  const [drawings, setDrawings] = useState<DrawingSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      const res = await fetch("/api/gallery");
      const data = await res.json();
      setDrawings(data.drawings || []);
    } catch {
      setDrawings([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(imageDataUrl: string, name: string, message: string) {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageDataUrl,
        visitorName: name,
        message,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Submit failed");
  }

  return (
    <section
      id="visitor-art"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">06 / Visitor art</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Draw something for me
        </h2>
        <span className="accent-line" />
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          Leave a small sketch on my portfolio - mouse or touch. Approved pieces
          appear in the gallery below. Keep it kind; I moderate submissions.
        </p>

        <div className="mt-12 grid gap-14 lg:grid-cols-[1.1fr_0.9fr]">
          <DrawingCanvas onSubmit={handleSubmit} />

          <div>
            <h3 className="text-sm font-medium text-fg">Visitor art gallery</h3>
            <p className="mt-2 text-xs text-muted-2">
              New drawings stay pending until I approve them.
            </p>

            {loading ? (
              <p className="mt-8 text-sm text-muted">Loading gallery…</p>
            ) : drawings.length === 0 ? (
              <p className="mt-8 text-sm text-muted">
                No approved drawings yet - yours could be the first.
              </p>
            ) : (
              <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
                {drawings.map((d) => (
                  <li
                    key={d.id}
                    className="border border-subtle bg-surface overflow-hidden"
                  >
                    <div className="relative aspect-[16/10] bg-[#161514]">
                      <Image
                        src={d.imageUrl}
                        alt={`Drawing by ${d.visitorName}`}
                        fill
                        className="object-contain"
                        unoptimized
                        sizes="(max-width: 1024px) 50vw, 320px"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-fg">{d.visitorName}</p>
                      {d.message ? (
                        <p className="mt-1 text-xs leading-relaxed text-muted">
                          {d.message}
                        </p>
                      ) : null}
                      <p className="mt-2 text-[10px] uppercase tracking-wide text-muted-2">
                        {new Date(d.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
