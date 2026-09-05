"use client";

import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import type { DrawingSubmission, DrawingStatus } from "@/lib/gallery/types";

export default function AdminGalleryPage() {
  const [secret, setSecret] = useState("");
  const [authed, setAuthed] = useState(false);
  const [drawings, setDrawings] = useState<DrawingSubmission[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/gallery/admin", { credentials: "include" });
      if (res.status === 401) {
        setAuthed(false);
        setError("Login required");
        return;
      }
      const data = await res.json();
      setDrawings(data.drawings || []);
      setAuthed(true);
    } catch {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function login(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await fetch("/api/gallery/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Login failed");
      return;
    }
    setSecret("");
    await load();
  }

  async function setStatus(id: string, status: DrawingStatus) {
    const res = await fetch("/api/gallery/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this drawing permanently?")) return;
    const res = await fetch("/api/gallery/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ id }),
    });
    if (res.ok) await load();
  }

  if (!authed) {
    return (
      <div className="mx-auto max-w-md px-5 py-28">
        <h1 className="font-display text-3xl text-fg">Gallery admin</h1>
        <p className="mt-3 text-sm text-muted">
          Enter the admin secret to moderate visitor drawings.
        </p>
        <form onSubmit={login} className="mt-8 space-y-4">
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            className="input-field w-full px-3.5 py-3 text-sm"
            placeholder="Admin secret"
          />
          <button type="submit" className="btn-primary w-full py-3 text-sm">
            Sign in
          </button>
        </form>
        {error && <p className="mt-4 text-sm text-[#e8a0a0]">{error}</p>}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-24 md:px-8">
      <h1 className="font-display text-3xl text-fg">Moderate drawings</h1>
      <p className="mt-2 text-sm text-muted">
        Approve, reject, hide, or delete submissions.
      </p>
      {loading && <p className="mt-6 text-sm text-muted">Loading…</p>}
      <ul className="mt-10 space-y-8">
        {drawings.map((d) => (
          <li
            key={d.id}
            className="grid gap-4 border border-subtle bg-surface p-4 md:grid-cols-[220px_1fr]"
          >
            <div className="relative aspect-[16/10] bg-[#161514]">
              <Image
                src={d.imageUrl}
                alt=""
                fill
                className="object-contain"
                unoptimized
              />
            </div>
            <div>
              <p className="text-sm text-fg">{d.visitorName}</p>
              <p className="mt-1 text-xs text-muted">{d.message || "—"}</p>
              <p className="mt-2 text-[10px] uppercase tracking-wide text-muted-2">
                {d.status} · {new Date(d.createdAt).toLocaleString()}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {(
                  [
                    "approved",
                    "rejected",
                    "hidden",
                    "pending",
                  ] as DrawingStatus[]
                ).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(d.id, s)}
                    className="btn-secondary px-3 py-1.5 text-xs capitalize"
                  >
                    {s}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => remove(d.id)}
                  className="btn-secondary px-3 py-1.5 text-xs text-[#e8a0a0]"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {drawings.length === 0 && !loading && (
        <p className="mt-8 text-sm text-muted">No submissions yet.</p>
      )}
    </div>
  );
}
