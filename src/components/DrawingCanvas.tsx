"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VisitorSignal } from "@/data/seedGallery";
import { SIGNAL_LABELS } from "@/data/seedGallery";

const COLORS = [
  "#eceae6",
  "#c9a96e",
  "#8a8580",
  "#e8a0a0",
  "#7aa2c8",
  "#111110",
];

type Point = { x: number; y: number };

export function DrawingCanvas({
  onSubmit,
  onCancel,
}: {
  onSubmit: (
    dataUrl: string,
    name: string,
    message: string,
    signal: VisitorSignal,
  ) => Promise<void>;
  onCancel?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [brush, setBrush] = useState(5);
  const [erasing, setErasing] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [signal, setSignal] = useState<VisitorSignal>("curious");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const drawing = useRef(false);
  const history = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  const getCtx = useCallback(
    () => canvasRef.current?.getContext("2d") ?? null,
    [],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const parent = canvas.parentElement;
    const width = Math.min(parent?.clientWidth || 900, 960);
    const height = Math.round(width * 0.58);
    const prev = canvas.toDataURL();
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#161514";
    ctx.fillRect(0, 0, width, height);
    if (prev && prev.length > 100) {
      const img = new window.Image();
      img.onload = () => ctx.drawImage(img, 0, 0, width, height);
      img.src = prev;
    }
  }, [getCtx]);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  function pushHistory() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    if (history.current.length > 40) history.current.shift();
    redoStack.current = [];
  }

  function pos(e: React.PointerEvent<HTMLCanvasElement>): Point {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * canvas.width,
      y: ((e.clientY - rect.top) / rect.height) * canvas.height,
    };
  }

  function onPointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    pushHistory();
    drawing.current = true;
    const ctx = getCtx();
    if (!ctx) return;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brush;
    ctx.strokeStyle = erasing ? "#161514" : color;
    ctx.lineTo(p.x + 0.01, p.y + 0.01);
    ctx.stroke();
  }

  function onPointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return;
    const ctx = getCtx();
    if (!ctx) return;
    const p = pos(e);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brush;
    ctx.strokeStyle = erasing ? "#161514" : color;
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function onPointerUp() {
    drawing.current = false;
    getCtx()?.beginPath();
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    pushHistory();
    ctx.fillStyle = "#161514";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function undo() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || history.current.length === 0) return;
    redoStack.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(history.current.pop()!, 0, 0);
  }

  function redo() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || redoStack.current.length === 0) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    ctx.putImageData(redoStack.current.pop()!, 0, 0);
  }

  async function handleSubmit() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    setStatus(null);
    try {
      await onSubmit(canvas.toDataURL("image/png"), name, message, signal);
      setStatus("Submitted for review - thank you.");
      clearCanvas();
      setMessage("");
    } catch (err) {
      setStatus(err instanceof Error ? err.message : "Submit failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="overflow-hidden border border-subtle bg-[#161514] shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
        <canvas
          ref={canvasRef}
          className="block w-full touch-none cursor-crosshair"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              aria-label={`Colour ${c}`}
              onClick={() => {
                setColor(c);
                setErasing(false);
              }}
              className="h-7 w-7 border border-subtle transition-transform hover:scale-110"
              style={{
                background: c,
                outline:
                  color === c && !erasing
                    ? "2px solid var(--accent)"
                    : undefined,
                outlineOffset: 2,
              }}
            />
          ))}
        </div>
        <label className="flex items-center gap-2 text-xs text-muted">
          Size
          <input
            type="range"
            min={2}
            max={28}
            value={brush}
            onChange={(e) => setBrush(Number(e.target.value))}
            className="w-28 accent-[var(--accent)]"
          />
        </label>
        <button
          type="button"
          onClick={() => setErasing((v) => !v)}
          className={`btn-secondary px-3 py-1.5 text-xs ${erasing ? "border-accent text-accent" : ""}`}
        >
          Erase
        </button>
        <button
          type="button"
          onClick={undo}
          className="btn-secondary px-3 py-1.5 text-xs"
        >
          Undo
        </button>
        <button
          type="button"
          onClick={redo}
          className="btn-secondary px-3 py-1.5 text-xs"
        >
          Redo
        </button>
        <button
          type="button"
          onClick={clearCanvas}
          className="btn-secondary px-3 py-1.5 text-xs"
        >
          Clear
        </button>
      </div>

      <div>
        <p className="mb-2 text-xs text-muted">
          Your signal (why you stopped by)
        </p>
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SIGNAL_LABELS) as VisitorSignal[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setSignal(key)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                signal === key
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-subtle text-muted hover:text-fg"
              }`}
            >
              {SIGNAL_LABELS[key]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
          placeholder="Name (optional)"
          className="input-field px-3 py-2.5 text-sm"
        />
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={160}
          placeholder="Note for builders (optional)"
          className="input-field px-3 py-2.5 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={handleSubmit}
          className="btn-primary px-5 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          {busy ? "Submitting…" : "Pin to the wall"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary px-5 py-2.5 text-sm"
          >
            Back to wall
          </button>
        )}
      </div>

      {status && <p className="text-sm text-muted">{status}</p>}
    </div>
  );
}
