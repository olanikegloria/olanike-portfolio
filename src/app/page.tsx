import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { VisitorArt } from "@/components/VisitorArt";
import { Stack } from "@/components/Stack";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Stack />
      <Experience />
      <Certifications />
      <VisitorArt />
      <Contact />
    </>
  );
}
