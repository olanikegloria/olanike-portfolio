export type ProjectCategory = "ai" | "software" | "infra";

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  thumbnail: string;
  images: string[];
  showcaseImage?: string;
  galleryLayout?: "default" | "showcase";
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  solutionSteps?: string[];
  impact?: string;
  tools: string[];
  links?: ProjectLink[];
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "proposal-generator",
    title: "AI-Powered Proposal Automation System",
    category: "ai",
    year: "2025",
    thumbnail: "/projects/proposal.png",
    images: ["/projects/proposal.png"],
    shortDescription:
      "Turns discovery call data into reviewed, client-ready proposals with no manual drafting.",
    overview:
      "An intelligent proposal generation system that automates the process of drafting and formatting client proposals, reducing manual effort and ensuring consistency across documents.",
    problem:
      "Creating proposals for clients was repetitive and time-consuming. Each proposal required copying templates, updating client info, inserting project descriptions, and manually formatting text, often leading to errors and inconsistent styling.",
    solution:
      "I built a workflow in n8n that connects Airtable, Google Docs, and OpenAI to automatically pull client data, generate tailored proposal text, auto-fill templates, and save versioned documents to Google Drive.",
    solutionSteps: [
      "Pull client and project data from Airtable.",
      "Use AI to generate tailored proposal text based on project scope.",
      "Auto-fill templates in Google Docs with consistent formatting.",
      "Save the final document in Google Drive with version control.",
    ],
    impact:
      "Cut proposal preparation from hours to under 10 minutes. Improved turnaround speed, brand consistency, and documentation accuracy.",
    tools: ["n8n", "Airtable", "Google Docs", "OpenAI", "Google Drive"],
    links: [
      {
        label: "Video walkthrough",
        href: "https://www.loom.com/share/17e16880b95f42779b6c4ef41a7102ca",
      },
      {
        label: "One-pager",
        href: "https://docs.google.com/document/d/1wbI4cF05K3MK_qL3zoqo6qX6maLl7QvC/edit?usp=sharing",
      },
    ],
  },
  {
    slug: "content-generation",
    title: "AI-Powered Content Generation & Publishing System",
    category: "ai",
    year: "2025",
    thumbnail: "/projects/fetemi.png",
    images: ["/projects/fetemi.png"],
    shortDescription:
      "End-to-end pipeline from idea submission to scheduled publishing across three platforms.",
    overview:
      "An end-to-end automation that streamlines how content is researched, generated, reviewed, and published, removing manual touchpoints from ideation to posting.",
    problem:
      "Content creation involved collecting briefs from Airtable, drafting in docs, validating tone and format, and manually publishing. This fragmented process caused inconsistency, delays, and frequent rework.",
    solution:
      "I designed an n8n automation with Airtable, OpenAI, and a React/Vite frontend that handles extraction, generation, quality scoring, image selection, platform adaptation, and publishing.",
    solutionSteps: [
      "Extract content ideas (text or URL) from Telegram.",
      "Use OpenAI to generate SEO-optimised structured drafts.",
      "Validate readability and quality through an internal scoring system.",
      "Generate images for the reviewer to select from.",
      "Adapt content for selected platforms and publish automatically.",
    ],
    impact:
      "Reduced content turnaround time by ~90% and standardised output quality across LinkedIn, X, and email.",
    tools: ["n8n", "Airtable", "OpenAI", "Firecrawl", "React/Vite", "Telegram"],
    links: [
      {
        label: "One-pager",
        href: "https://docs.google.com/document/d/1h_a4JaIWbOeq6R8GXj2QSJhgDykgQRCM/edit?usp=sharing",
      },
      {
        label: "Demo video",
        href: "https://drive.google.com/file/d/1aTS449sR4ricjKBjYwQv2Ke-3phifpoh/view?usp=sharing",
      },
    ],
  },
  {
    slug: "lead-generation",
    title: "AI-Powered Lead Generation System",
    category: "ai",
    year: "2025",
    thumbnail: "/projects/lead-gen-detail.png",
    images: ["/projects/lead-gen-detail.png"],
    shortDescription:
      "Automated outbound pipeline from persona definition to enriched leads with personalised outreach.",
    overview:
      "An end-to-end AI-driven lead engine combining data scraping, validation, enrichment, and message generation, converting a multi-hour manual process into a scalable n8n pipeline.",
    problem:
      "Outbound operations were slow and hard to scale. Defining personas, finding founders, verifying emails, and writing personalised messages was entirely manual and error-prone, each campaign took hours.",
    solution:
      "I built a three-workflow n8n automation triggered from Airtable that scrapes leads with Apify, validates emails with Bouncer, enriches company context, and generates personalised outreach with OpenAI.",
    solutionSteps: [
      "Trigger from an Airtable input form with job title, location, company size, and keywords.",
      "Discover leads via Apify Lead Scraper and LinkedIn Company Scraper.",
      "Clean datasets, remove duplicates, and scrape company context from websites.",
      "Validate emails with Bouncer API before message generation.",
      "Generate 3-step cold email sequences and LinkedIn messages with OpenAI.",
      "Store enriched leads in Airtable with validation results and personalization scores.",
    ],
    impact:
      "Campaign execution time dropped ~90%. Delivers enriched, verified leads with personalised outreach at scale.",
    tools: ["n8n", "Apify", "Airtable", "Bouncer", "OpenAI"],
    links: [
      {
        label: "One-pager",
        href: "https://docs.google.com/document/d/1wQSjgL8bekm6I3TAos-2Ehl1LFqcSHln/edit?usp=sharing",
      },
      {
        label: "Demo video",
        href: "https://drive.google.com/file/d/1rGMXqBA-oLX3duvAaQZ2_5FiKzeKORBS/view?usp=sharing",
      },
    ],
  },
  {
    slug: "invoice-processing",
    title: "AI-Powered Invoice Inbox System",
    category: "ai",
    year: "2025",
    thumbnail: "/projects/invoice.png",
    images: ["/projects/invoice.png"],
    shortDescription:
      "Monitors Gmail, extracts invoice data from PDFs, and logs everything to Google Sheets.",
    overview:
      "An AI-powered workflow that reads incoming invoice emails, extracts key fields, and automatically records them into a centralised spreadsheet for finance tracking.",
    problem:
      "Invoices were manually reviewed and entered into a Google Sheet, leading to slow processing and human errors across dozens of weekly vendor emails.",
    solution:
      "Created a Make.com scenario that watches Gmail, uses PDF.co to extract text, prompts OpenAI to structure data, and logs entries with metadata while handling duplicates.",
    solutionSteps: [
      "Watch Gmail for invoice-related messages.",
      "Use PDF.co to extract text from attachments or email body.",
      "Prompt OpenAI to structure extracted data into key fields.",
      "Log each entry in Google Sheets with sender and timestamp metadata.",
    ],
    impact:
      "Eliminated manual invoice processing. Handles varying formats, incomplete emails, and duplicates reliably.",
    tools: ["Make.com", "Gmail", "PDF.co", "OpenAI", "Google Sheets"],
    links: [
      {
        label: "One-pager",
        href: "https://docs.google.com/document/d/1w5u601eHerWZSqW_Rjy64Qf2m50adU30/edit?usp=sharing",
      },
      {
        label: "Video walkthrough",
        href: "https://www.loom.com/share/c2f231f4345c4b8ba21832f74588603e",
      },
    ],
  },
  {
    slug: "kpi-reporting",
    title: "Reporting & Dashboard Automation",
    category: "ai",
    year: "2025",
    thumbnail: "/projects/kpi.png",
    images: ["/projects/kpi.png"],
    shortDescription:
      "Cross-departmental KPI automation replacing multi-day manual reporting with a single button click.",
    overview:
      "An automated reporting workflow that consolidates performance data from Sales, Project Delivery, and People Operations into a single Airtable dashboard with real-time visibility.",
    problem:
      "Each department tracked metrics in separate systems. End-of-cycle reporting required manual data gathering, KPI calculation, and dashboard updates, error-prone, slow, and unscalable.",
    solution:
      "I designed a Make.com automation triggered from Airtable that pulls data from Google Sheets and multiple Airtable bases, calculates KPIs, and updates a central dashboard with error handling.",
    solutionSteps: [
      "Trigger via a single “Update Metrics” button in Airtable.",
      "Pull Sales data from Google Sheets and ops data from Airtable bases in parallel.",
      "Calculate KPIs: revenue, completion rates, employee growth metrics.",
      "Update central Airtable dashboard with charts and department filters.",
      "Log errors and continue with available data if a source is unavailable.",
    ],
    impact:
      "Reporting that took several days now completes in under three minutes with built-in error handling.",
    tools: ["Make.com", "Airtable", "Google Sheets", "Gmail"],
    links: [
      {
        label: "One-pager",
        href: "https://docs.google.com/document/d/13Pf560Sn6o2hAOYz466Ou2iLuwPYO8JA/edit?usp=sharing",
      },
      {
        label: "Video walkthrough",
        href: "https://www.loom.com/share/c5118a7af5ad403bb5ddf3fb37bc1638",
      },
    ],
  },
  {
    slug: "voice-support-agent",
    title: "Voice-Based Customer Support Agent",
    category: "ai",
    year: "2025",
    thumbnail: "/projects/vapi.png",
    images: ["/projects/vapi.png"],
    shortDescription:
      "Voice AI support for RelayPay using VAPI, n8n, Claude, and RAG over approved documentation.",
    overview:
      "A voice-based AI customer support system for RelayPay that lets customers ask support questions through a web interface and receive accurate spoken responses grounded in approved company documentation.",
    problem:
      "Support agents spent significant time on repetitive questions about onboarding, payouts, transactions, and compliance, even when answers existed in internal docs. Response quality varied and scaling became difficult.",
    solution:
      "Built a voice agent using VAPI, n8n, Claude, and RAG architecture with a custom React portal. Speech is converted to text, matched against a vector knowledge base, and returned as spoken responses with escalation logic.",
    solutionSteps: [
      "Customers interact via a branded web portal; speech converts to text in n8n.",
      "RAG retrieval matches questions against approved RelayPay documentation.",
      "Claude generates grounded responses with escalation and fallback rules.",
      "Responses convert back to speech; interactions log to Airtable for tracking.",
    ],
    impact:
      "First-line support automated. Customers get instant answers; call scheduling reduced from multiple emails to a seamless flow.",
    tools: [
      "VAPI",
      "n8n",
      "Airtable",
      "Claude",
      "Claude Code",
      "Google Calendar",
      "Telegram",
      "Bouncer",
    ],
    links: [
      {
        label: "One-pager (PDF)",
        href: "https://drive.google.com/file/d/1ttxed4DIsu_HXm1Et2n5BMaqHA43qMfG/view?usp=sharing",
      },
      {
        label: "Demo video",
        href: "https://drive.google.com/file/d/140-y6PJ6iSlP2FCSdFb-34WAWHhrmoD0/view?usp=sharing",
      },
    ],
  },
  {
    slug: "skinauth",
    title: "Skinauth | Skincare Authentication Platform",
    category: "software",
    year: "2025",
    thumbnail: "/projects/skinauth/home.png",
    showcaseImage: "/projects/skinauth/showcase.png",
    galleryLayout: "showcase",
    images: [
      "/projects/skinauth/home.png",
      "/projects/skinauth/shop.png",
      "/projects/skinauth/mobile.png",
      "/projects/skinauth/scan.png",
    ],
    shortDescription:
      "Verified skincare marketplace with product authentication, expert consultations, and mobile scanning.",
    overview:
      "Skinauth is a full-stack platform for verifying skincare product authenticity in Nigeria. Users can scan barcodes, check NAFDAC registration, browse a verified marketplace, and book consultations with estheticians.",
    problem:
      "Counterfeit and unverified skincare products pose real health risks. Consumers lack a trusted way to verify products before purchase, and brands need a channel to prove authenticity.",
    solution:
      "Built a responsive web app with product verification flows, a verified marketplace, expert booking, and mobile-optimised scanning. Trust signals (NAFDAC badges, batch integrity, barcode lookup) are central to the UX.",
    solutionSteps: [
      "Barcode and NAFDAC number lookup with trust scoring.",
      "Verified marketplace for Nigerian skincare brands.",
      "Expert consultation booking, virtual and in-person.",
      "Mobile-first scan experience with manual entry fallback on web.",
    ],
    impact:
      "A production-ready platform combining e-commerce, authentication, and expert services in one cohesive product.",
    tools: [
      "Next.js",
      "React",
      "Supabase",
      "MongoDB",
      "Express",
      "Firebase",
      "OpenAI",
    ],
    liveUrl: "https://github.com/olanikegloria/skinauth",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/skinauth",
      },
    ],
  },
  {
    slug: "shoptkstore",
    title: "ShopTKstore | E-commerce Grocery Platform",
    category: "software",
    year: "2025",
    thumbnail: "/projects/shoptkstore/home.png",
    showcaseImage: "/projects/shoptkstore/showcase.png",
    galleryLayout: "showcase",
    images: [
      "/projects/shoptkstore/home.png",
      "/projects/shoptkstore/mobile.png",
      "/projects/shoptkstore/cart.png",
    ],
    shortDescription:
      "International grocery e-commerce with category browsing, cart management, and WhatsApp checkout.",
    overview:
      "ShopTKstore is a modern e-commerce platform for international groceries in Nigeria, combining a polished storefront, mobile-responsive shopping, and streamlined cart-to-checkout flows.",
    problem:
      "Customers needed a reliable online store for international food products with clear categories, transparent pricing in Naira, and a shopping experience that works on mobile.",
    solution:
      "Designed and built a full e-commerce frontend with category filters, product cards with ratings and sales counts, slide-out cart, and WhatsApp-integrated contact for orders.",
    solutionSteps: [
      "Split hero layout with brand storytelling and shop CTA.",
      "Category-based product browsing across 37+ items.",
      "Real-time cart with quantity controls and checkout flow.",
      "Mobile-responsive design with toast feedback on add-to-cart.",
    ],
    impact:
      "Live production store serving customers with a clean, trustworthy shopping experience.",
    tools: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://www.shoptkstore.com/",
    links: [
      {
        label: "Live site",
        href: "https://www.shoptkstore.com/",
      },
    ],
  },
  {
    slug: "academic-connect",
    title: "Academic Connect",
    category: "software",
    year: "2024",
    thumbnail: "/projects/academic-connect/cover.png",
    images: ["/projects/academic-connect/cover.png"],
    shortDescription:
      "Platform connecting students and educators with resources and collaborative tools.",
    overview:
      "Academic Connect is a web platform designed to bridge students and educators, providing shared resources, collaboration tools, and an organised learning environment.",
    problem:
      "Students and educators often lack a single platform for sharing academic resources and coordinating collaboratively outside traditional LMS constraints.",
    solution:
      "Built a full-stack portal with authentication, resource sharing, and dashboard views tailored for academic collaboration.",
    impact:
      "Delivered a functional educational platform with clean UX and role-based access for students and educators.",
    tools: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
    links: [
      {
        label: "Portfolio",
        href: "https://olanikeolatunji.com.ng/projects",
      },
    ],
  },
  {
    slug: "starlink-solutions",
    title: "Starlink Solutions Portal",
    category: "software",
    year: "2024",
    thumbnail: "/projects/starlink/cover.png",
    images: ["/projects/starlink/cover.png"],
    shortDescription:
      "User portal for Starlink Solutions with authentication and service management.",
    overview:
      "A client-facing portal for Starlink Solutions featuring user authentication, service management, and a structured dashboard for accessing company services.",
    problem:
      "The business needed a dedicated portal where clients could log in, manage their services, and interact with offerings without manual back-and-forth.",
    solution:
      "Developed a secure web portal with authentication flows, service management interfaces, and a responsive layout aligned with the company's brand.",
    impact:
      "Gave Starlink Solutions a professional digital presence with self-service client capabilities.",
    tools: ["React", "Node.js", "Express", "MongoDB", "Firebase"],
    links: [
      {
        label: "Portfolio",
        href: "https://olanikeolatunji.com.ng/projects",
      },
    ],
  },
  {
    slug: "ci-intelligence-platform",
    title: "CI Intelligence Platform",
    category: "infra",
    year: "2026",
    thumbnail: "/projects/kpi.png",
    images: ["/projects/kpi.png"],
    shortDescription:
      "Why did CI fail — and will it happen again? Failure causality, clustering, and flaky-test intelligence over GitHub Actions.",
    overview:
      "A platform that ingests GitHub Actions runs and explains pipeline failures with deterministic analysis plus AI summaries.",
    problem:
      "CI dashboards show red/green but rarely explain causality, recurrence, or flakiness.",
    solution:
      "Ingest workflow data, fingerprint failures, cluster similar breaks, score flaky tests, and use AI only to narrate evidence.",
    tools: [
      "Next.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "Docker",
      "GitHub Actions",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/ci-intelligence-platform",
      },
    ],
  },
  {
    slug: "dev-environment-platform",
    title: "One-Click Dev Environment Platform",
    category: "infra",
    year: "2026",
    thumbnail: "/projects/starlink/cover.png",
    images: ["/projects/starlink/cover.png"],
    shortDescription:
      "Analyse a repo, detect what it needs to run, and provision an isolated development environment.",
    overview:
      "Developer onboarding platform focused on clone → configure → run — not production deploy.",
    problem:
      "New engineers waste hours wiring env vars, databases, and sidecars even when Dockerfiles exist.",
    solution:
      "Repository analysis plus Docker-based provisioning, with AI explaining startup and config failures.",
    tools: ["Next.js", "TypeScript", "Docker", "PostgreSQL"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/dev-environment-platform",
      },
    ],
  },
  {
    slug: "architecture-explorer",
    title: "Architecture Explorer",
    category: "software",
    year: "2026",
    thumbnail: "/projects/academic-connect/cover.png",
    images: ["/projects/academic-connect/cover.png"],
    shortDescription:
      "Google Maps for a codebase — dependency graphs and grounded AI answers with file citations.",
    overview:
      "Static analysis builds a map of the system; Q&A is constrained to the indexed graph.",
    problem:
      "Large codebases are hard to understand; ungrounded LLM answers invent architecture.",
    solution:
      "AST/import graphs, interactive visualisation, and citation-required AI answers with refusal when evidence is thin.",
    tools: ["Next.js", "TypeScript", "Python", "PostgreSQL"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/architecture-explorer",
      },
    ],
  },
  {
    slug: "production-replay-platform",
    title: "Production Replay Platform",
    category: "infra",
    year: "2026",
    thumbnail: "/projects/invoice.png",
    images: ["/projects/invoice.png"],
    shortDescription:
      "Capture redacted incident context and recreate safe local conditions to reproduce production failures.",
    overview:
      "Incident packs with mandatory redaction and Dockerised replay scaffolds — not a full traffic mirror.",
    problem:
      "It worked locally. Production failures are hard to reproduce without leaking secrets.",
    solution:
      "Collector SDK, redaction pipeline, incident store, safe replay, and evidence-bound AI briefs.",
    tools: ["FastAPI", "Docker", "PostgreSQL", "Next.js"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/production-replay-platform",
      },
    ],
  },
  {
    slug: "ai-engineering-knowledge-platform",
    title: "AI Engineering Knowledge Platform",
    category: "ai",
    year: "2026",
    thumbnail: "/projects/vapi.png",
    images: ["/projects/vapi.png"],
    shortDescription:
      "Private engineering knowledge RAG with citations, confidence, and explicit no-answer behaviour.",
    overview:
      "Ingest docs and repos, retrieve with embeddings, answer only with sources — plus an evaluation harness.",
    problem:
      "Engineering knowledge is scattered; chatbots invent procedures that were never written down.",
    solution:
      "Chunking, embeddings, retrieval, citation-required generation, refusal policy, and measurable eval.",
    tools: ["FastAPI", "pgvector", "Next.js", "Ollama"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/ai-engineering-knowledge-platform",
      },
    ],
  },
  {
    slug: "api-change-intelligence",
    title: "API Change Intelligence",
    category: "software",
    year: "2026",
    thumbnail: "/projects/lead-gen.png",
    images: ["/projects/lead-gen.png"],
    shortDescription:
      "Detect breaking API changes and estimate which downstream consumers may break.",
    overview:
      "OpenAPI diff plus consumer reference scanning with human-readable AI summaries.",
    problem:
      "One team changes an API; another service breaks without warning.",
    solution:
      "Schema diff engine, consumer blast-radius scan, PR risk reports, AI explanation of changes.",
    tools: ["Next.js", "TypeScript", "PostgreSQL", "OpenAPI"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/olanikegloria/api-change-intelligence",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter((p) => p.category === category);
}
