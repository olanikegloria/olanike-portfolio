"use client";

import { TerminalPlayground } from "@/components/TerminalPlayground";
import { useRecruiterMode } from "@/components/RecruiterProvider";

/** Client wrapper so the terminal can open Recruiter Mode via `hire`. */
export function TerminalSection() {
  const { setOpen } = useRecruiterMode();
  return <TerminalPlayground onHire={() => setOpen(true)} />;
}
