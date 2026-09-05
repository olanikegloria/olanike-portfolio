"use client";

import { useEffect, useRef, useState } from "react";
import { systemsPulse, recruiterBrief } from "@/data/standout";
import { site, experience, strengths } from "@/data/portfolio";
import { projects } from "@/data/projects";

type Line = { type: "in" | "out" | "sys"; text: string };

const HELP = [
  "Available commands:",
  "  help          show this list",
  "  whoami        short intro",
  "  stack         core strengths",
  "  projects      list featured work",
  "  systems       six engineering products",
  "  experience    recent roles",
  "  contact       email / socials",
  "  hire          open recruiter brief",
  "  clear         clear the screen",
  "  cowsay [msg]  unnecessary but required",
];

function cowsay(msg: string) {
  const text = msg || "ship reliable systems";
  const border = "-".repeat(Math.min(text.length + 2, 42));
  return [
    ` ${border}`,
    `< ${text.slice(0, 40)} >`,
    ` ${border}`,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ];
}

export function TerminalPlayground({ onHire }: { onHire?: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: "sys", text: "olanike@portfolio:~$ welcome" },
    {
      type: "out",
      text: "Type `help` to explore. Commands map to real portfolio content.",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  function push(...next: Line[]) {
    setLines((prev) => [...prev, ...next]);
  }

  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 40));
    setHistIdx(-1);
    push({ type: "in", text: `❯ ${cmd}` });

    const [name, ...rest] = cmd.split(/\s+/);
    const arg = rest.join(" ");

    switch (name.toLowerCase()) {
      case "help":
        push(...HELP.map((t) => ({ type: "out" as const, text: t })));
        break;
      case "whoami":
        push(
          { type: "out", text: `${site.name} — ${site.role}` },
          { type: "out", text: site.headline },
        );
        break;
      case "stack":
        push(...strengths.map((s) => ({ type: "out" as const, text: `· ${s}` })));
        break;
      case "projects":
        push(
          ...projects.slice(0, 8).map((p) => ({
            type: "out" as const,
            text: `[${p.category}] ${p.title}`,
          })),
          {
            type: "out",
            text: `… ${projects.length} total. Scroll Work or open /projects/[slug].`,
          },
        );
        break;
      case "systems":
        push(
          ...systemsPulse.map((s) => ({
            type: "out" as const,
            text: `${s.port}  ${s.name.padEnd(22)} ${s.note}`,
          })),
        );
        break;
      case "experience":
        push(
          ...experience.slice(0, 3).map((e) => ({
            type: "out" as const,
            text: `${e.period}  ${e.role} @ ${e.company}`,
          })),
        );
        break;
      case "contact":
        push(
          { type: "out", text: `email     ${site.email}` },
          { type: "out", text: `github    ${site.github}` },
          { type: "out", text: `linkedin  ${site.linkedin}` },
          { type: "out", text: `location  ${site.location}` },
        );
        break;
      case "hire":
        push(
          { type: "out", text: recruiterBrief.pitch },
          {
            type: "out",
            text: "Opening recruiter mode… (or press R anywhere on the site)",
          },
        );
        onHire?.();
        break;
      case "clear":
        setLines([]);
        break;
      case "cowsay":
        push(...cowsay(arg).map((t) => ({ type: "out" as const, text: t })));
        break;
      case "sudo":
        push({
          type: "out",
          text: "Nice try. Permission granted to send a kind email instead.",
        });
        break;
      default:
        push({
          type: "out",
          text: `command not found: ${name}. Try \`help\`.`,
        });
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      run(input);
      setInput("");
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(histIdx + 1, history.length - 1);
      if (history[next]) {
        setHistIdx(next);
        setInput(history[next]);
      }
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = histIdx - 1;
      if (next < 0) {
        setHistIdx(-1);
        setInput("");
      } else {
        setHistIdx(next);
        setInput(history[next] || "");
      }
    }
  }

  return (
    <section
      id="terminal"
      className="border-t border-subtle px-5 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-5xl">
        <p className="section-label">07 / Terminal</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Explore like an engineer
        </h2>
        <span className="accent-line" />
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
          A tiny CLI over this portfolio. Commands map to real content.
          Recruiters can type <code className="text-accent">hire</code>.
        </p>

        <div
          className="mt-10 overflow-hidden border border-subtle bg-[#0c0d0c] shadow-[0_20px_50px_rgba(0,0,0,0.35)]"
          onClick={() => inputRef.current?.focus()}
        >
          <div className="flex items-center gap-2 border-b border-subtle px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e06c75]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#e5c07b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#98c379]" />
            <span className="ml-2 font-mono text-[10px] tracking-wide text-muted-2">
              olanike@portfolio — zsh
            </span>
          </div>

          <div className="h-[340px] space-y-1 overflow-y-auto px-4 py-4 font-mono text-[12px] leading-relaxed md:h-[400px] md:text-[13px]">
            {lines.map((line, i) => (
              <p
                key={`${i}-${line.text.slice(0, 16)}`}
                className={
                  line.type === "in"
                    ? "text-accent"
                    : line.type === "sys"
                      ? "text-muted-2"
                      : "whitespace-pre-wrap text-[#c8c5bc]"
                }
              >
                {line.text}
              </p>
            ))}
            <div className="flex items-center gap-2 text-accent">
              <span>❯</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full bg-transparent text-[#c8c5bc] outline-none"
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
