export const recruiterBrief = {
  pitch:
    "AI-minded software engineer who ships full-stack products and is building production-shaped systems around CI intelligence, grounded RAG, and developer tooling - not slide-deck demos.",
  bestFit: [
    "Software / Full-Stack Engineer",
    "AI Engineer (applied / RAG / eval)",
    "Platform / Developer Experience",
    "Graduate / co-op engineering roles",
  ],
  proofPoints: [
    {
      title: "CI Intelligence Platform",
      why: "Failure causality + flaky scoring before any AI narrative",
      href: "/projects/ci-intelligence-platform",
    },
    {
      title: "Engineering Knowledge Platform",
      why: "RAG that cites sources or refuses - no silent invention",
      href: "/projects/ai-engineering-knowledge-platform",
    },
    {
      title: "API Change Intelligence",
      why: "Breaking-change blast radius with evidence-bound risk briefs",
      href: "/projects/api-change-intelligence",
    },
  ],
  stackFocus: [
    "TypeScript",
    "React / Next.js",
    "Python",
    "PostgreSQL",
    "Docker",
    "RAG / Ollama",
  ],
} as const;

export const systemsPulse = [
  {
    name: "CI Intelligence",
    status: "demo-ready" as const,
    note: "Fingerprint failures, score flakes, evidence-bound explain",
    href: "/projects/ci-intelligence-platform",
    port: "8001",
  },
  {
    name: "EnvForge",
    status: "demo-ready" as const,
    note: "Manifest analyse + safe provision simulation",
    href: "/projects/dev-environment-platform",
    port: "8002",
  },
  {
    name: "Architecture Explorer",
    status: "demo-ready" as const,
    note: "Import graph Q&A with file citations",
    href: "/projects/architecture-explorer",
    port: "8003",
  },
  {
    name: "ReplaySafe",
    status: "demo-ready" as const,
    note: "Redact-before-store incident packs",
    href: "/projects/production-replay-platform",
    port: "8004",
  },
  {
    name: "Northknow",
    status: "demo-ready" as const,
    note: "Grounded engineering knowledge with refusal",
    href: "/projects/ai-engineering-knowledge-platform",
    port: "8005",
  },
  {
    name: "API Change Intel",
    status: "demo-ready" as const,
    note: "OpenAPI diff + consumer blast radius",
    href: "/projects/api-change-intelligence",
    port: "8006",
  },
] as const;
