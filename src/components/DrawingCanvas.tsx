"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const COLORS = ["#eceae6", "#c9a96e", "#8a8580", "#e8a0a0", "#7aa2c8", "#111110"];

type Point = { x: number; y: number };

export function DrawingCanvas({
  onSubmit,
}: {
  onSubmit: (dataUrl: string, name: string, message: string) => Promise<void>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [brush, setBrush] = useState(4);
  const [erasing, setErasing] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const drawing = useRef(false);
  const history = useRef<ImageData[]>([]);
  const redoStack = useRef<ImageData[]>([]);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext("2d");
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    const parent = canvas.parentElement;
    const width = Math.min(parent?.clientWidth || 560, 640);
    const height = Math.round(width * 0.62);
    const prev = canvas.toDataURL();
    canvas.width = width;
    canvas.height = height;
    ctx.fillStyle = "#161514";
    ctx.fillRect(0, 0, width, height);
    if (prev && prev.length > 100) {
      const img = new Image();
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
    const ctx = getCtx();
    ctx?.beginPath();
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
    const prev = history.current.pop()!;
    ctx.putImageData(prev, 0, 0);
  }

  function redo() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx || redoStack.current.length === 0) return;
    history.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    const next = redoStack.current.pop()!;
    ctx.putImageData(next, 0, 0);
  }

  async function handleSubmit() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setBusy(true);
    setStatus(null);
    try {
      const dataUrl = canvas.toDataURL("image/png");
      await onSubmit(dataUrl, name, message);
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
    <div className="space-y-4">
      <div className="overflow-hidden border border-subtle bg-[#161514]">
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
              className="h-6 w-6 border border-subtle transition-transform hover:scale-110"
              style={{
                background: c,
                outline: color === c && !erasing ? "2px solid var(--accent)" : undefined,
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
            max={24}
            value={brush}
            onChange={(e) => setBrush(Number(e.target.value))}
            className="w-24 accent-[var(--accent)]"
          />
        </label>

        <button
          type="button"
          onClick={() => setErasing((v) => !v)}
          className={`btn-secondary px-3 py-1.5 text-xs ${erasing ? "border-accent text-accent" : ""}`}
        >
          Erase
        </button>
        <button type="button" onClick={undo} className="btn-secondary px-3 py-1.5 text-xs">
          Undo
        </button>
        <button type="button" onClick={redo} className="btn-secondary px-3 py-1.5 text-xs">
          Redo
        </button>
        <button type="button" onClick={clearCanvas} className="btn-secondary px-3 py-1.5 text-xs">
          Clear
        </button>
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
          placeholder="Short message (optional)"
          className="input-field px-3 py-2.5 text-sm"
        />
      </div>

      <button
        type="button"
        disabled={busy}
        onClick={handleSubmit}
        className="btn-primary px-5 py-2.5 text-sm font-medium disabled:opacity-60"
      >
        {busy ? "Submitting…" : "Submit drawing"}
      </button>

      {status && <p className="text-sm text-muted">{status}</p>}
    </div>
  );
}
