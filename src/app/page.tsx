import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { SystemsPulse } from "@/components/SystemsPulse";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { VisitorArt } from "@/components/VisitorArt";
import { TerminalSection } from "@/components/TerminalSection";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <SystemsPulse />
      <Stack />
      <Experience />
      <Certifications />
      <VisitorArt />
      <TerminalSection />
      <Contact />
    </>
  );
}
