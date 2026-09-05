/**
 * Recruiter Mode content - shaped around what hiring scans actually use:
 * role clarity, stack keywords, impact proof, availability, one-click contact.
 * Sources: recruiter 6-second scan research, HM portfolio reviews, remote hiring advice.
 */

export const recruiterBrief = {
  positioning:
    "Software engineer with strong full-stack delivery and applied AI systems work - TypeScript/Python, APIs, RAG with evaluation, and infrastructure tooling.",

  openTo: [
    "Software Engineer / Full-Stack",
    "AI Engineer (applied LLM / RAG / eval)",
    "Platform / Developer Experience",
    "Remote-first or hybrid international teams",
  ],

  availability: {
    status: "Open to opportunities",
    location: "Lagos, Nigeria (WAT / UTC+1)",
    workStyle: "Remote-ready · async communication · overlap with EU/US mornings",
    notice: "Can start after standard notice on current commitments",
  },

  /** Keywords recruiters and ATS pattern-match in the first scan */
  stackKeywords: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "REST APIs",
    "RAG",
    "CI/CD",
  ],

  /** Problem → ownership → outcome - what HMs say they actually read */
  featuredWork: [
    {
      title: "CI Intelligence Platform",
      problem: "CI failures without clear causality waste eng time.",
      outcome:
        "Deterministic failure fingerprinting and flaky scoring; AI only narrates verified evidence.",
      stack: "Next.js · FastAPI · Postgres · Docker",
      href: "/projects/ci-intelligence-platform",
    },
    {
      title: "Engineering Knowledge Platform",
      problem: "LLM answers invent deploy steps that were never written.",
      outcome:
        "Retrieval-grounded answers with citations, or an explicit refusal when evidence is weak.",
      stack: "Next.js · FastAPI · TF-IDF/RAG · Ollama",
      href: "/projects/ai-engineering-knowledge-platform",
    },
    {
      title: "API Change Intelligence",
      problem: "Breaking OpenAPI changes hit consumers without warning.",
      outcome:
        "Spec diffs scored for risk with consumer blast-radius mapping and evidence-bound briefs.",
      stack: "TypeScript · Express · OpenAPI",
      href: "/projects/api-change-intelligence",
    },
  ],

  signals: [
    "Ships end-to-end: UI, API, data, and deploy path",
    "Prefers deterministic cores; AI is grounded or refused",
    "Writes for other engineers - clear trade-offs, not hype",
    "Building in public: six independent systems with demos and case studies",
  ],

  educationHighlight:
    "B.Eng. Electrical & Electronics (CGPA 4.82/5.0) · Microverse full-stack (789+ hrs) · Kaggle ML track · Oracle AI Vector Search Professional",
} as const;
