"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { DrawingCanvas } from "@/components/DrawingCanvas";
import type { DrawingSubmission } from "@/lib/gallery/types";
import {
  SEED_GALLERY,
  SIGNAL_LABELS,
  type GalleryPiece,
  type VisitorSignal,
} from "@/data/seedGallery";

type Filter = "all" | VisitorSignal;

export function VisitorArt() {
  const [drawings, setDrawings] = useState<DrawingSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [studioOpen, setStudioOpen] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

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

  async function handleSubmit(
    imageDataUrl: string,
    name: string,
    message: string,
    signal: VisitorSignal,
  ) {
    const res = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        imageDataUrl,
        visitorName: name,
        message: message
          ? `[${SIGNAL_LABELS[signal]}] ${message}`
          : `[${SIGNAL_LABELS[signal]}]`,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Submit failed");
    setStudioOpen(false);
    await load();
  }

  const wall: GalleryPiece[] = useMemo(() => {
    const live: GalleryPiece[] = drawings.map((d) => ({
      id: d.id,
      imageUrl: d.imageUrl,
      visitorName: d.visitorName || "Anonymous",
      message: d.message,
      signal: parseSignal(d.message),
      createdAt: d.createdAt,
    }));
    return [...live, ...SEED_GALLERY];
  }, [drawings]);

  const filtered =
    filter === "all" ? wall : wall.filter((p) => p.signal === filter);

  return (
    <section
      id="visitor-art"
      className="relative overflow-hidden border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(201,169,110,0.12), transparent 40%), radial-gradient(circle at 80% 0%, rgba(122,162,200,0.08), transparent 35%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="section-label">06 / Builders&apos; wall</p>
            <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
              Leave a signal, not just a scribble
            </h2>
            <span className="accent-line" />
            <p className="mt-5 text-sm leading-relaxed text-muted">
              A living guestbook for people who hire, build, and cheer. The wall
              shows first. Open the studio when you want to pin your own sketch
              with a hiring, collaborating, cheering, or curious signal - more
              shareable on LinkedIn than a plain drawing pad.
            </p>
          </div>

          {!studioOpen && (
            <button
              type="button"
              onClick={() => setStudioOpen(true)}
              className="btn-primary px-5 py-3 text-sm font-medium"
            >
              Open drawing studio
            </button>
          )}
        </div>

        {studioOpen ? (
          <div className="mt-12 rounded-sm border border-subtle bg-surface/80 p-4 md:p-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-mono text-xs tracking-[0.16em] text-accent uppercase">
                  / studio
                </p>
                <h3 className="font-display mt-1 text-xl text-fg">
                  Draw on a bigger canvas
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStudioOpen(false)}
                className="btn-secondary px-4 py-2 text-xs"
              >
                Close studio
              </button>
            </div>
            <DrawingCanvas
              onSubmit={handleSubmit}
              onCancel={() => setStudioOpen(false)}
            />
          </div>
        ) : (
          <>
            <div className="mt-10 flex flex-wrap gap-2">
              <FilterChip
                active={filter === "all"}
                onClick={() => setFilter("all")}
                label="All signals"
              />
              {(Object.keys(SIGNAL_LABELS) as VisitorSignal[]).map((key) => (
                <FilterChip
                  key={key}
                  active={filter === key}
                  onClick={() => setFilter(key)}
                  label={SIGNAL_LABELS[key]}
                />
              ))}
            </div>

            {loading ? (
              <p className="mt-10 text-sm text-muted">Loading the wall…</p>
            ) : (
              <ul className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3">
                {filtered.map((piece, index) => (
                  <li
                    key={piece.id}
                    className="mb-5 break-inside-avoid"
                    style={{
                      transform: `rotate(${index % 2 === 0 ? -1.1 : 1.2}deg)`,
                    }}
                  >
                    <Postcard piece={piece} />
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-8 text-center text-xs text-muted-2">
              Approved visitor sketches join the seed wall after moderation.
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
        active
          ? "border-accent bg-accent/10 text-accent"
          : "border-subtle text-muted hover:border-accent/40 hover:text-fg"
      }`}
    >
      {label}
    </button>
  );
}

function Postcard({ piece }: { piece: GalleryPiece }) {
  return (
    <article className="border border-subtle bg-[#f3efe6] p-3 text-[#1c1917] shadow-[0_12px_30px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#161514]">
        <Image
          src={piece.imageUrl}
          alt={`Sketch by ${piece.visitorName}`}
          fill
          className="object-cover"
          unoptimized
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-medium tracking-tight">
            {piece.visitorName}
          </p>
          {piece.message ? (
            <p className="mt-1 text-xs leading-relaxed text-[#5c564e]">
              {stripSignalPrefix(piece.message)}
            </p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-full border border-[#c9a96e]/50 bg-[#c9a96e]/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-[#7a5c28] uppercase">
          {SIGNAL_LABELS[piece.signal]}
        </span>
      </div>
      <p className="mt-2 font-mono text-[10px] tracking-wide text-[#8a8278]">
        {new Date(piece.createdAt).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
        {piece.seeded ? " · sample" : ""}
      </p>
    </article>
  );
}

function parseSignal(message: string): VisitorSignal {
  const lower = message.toLowerCase();
  if (lower.includes("[hiring]")) return "hiring";
  if (lower.includes("[collaborating]")) return "collaborating";
  if (lower.includes("[cheering]")) return "cheering";
  return "curious";
}

function stripSignalPrefix(message: string) {
  return message.replace(/^\[[^\]]+\]\s*/i, "").trim();
}
