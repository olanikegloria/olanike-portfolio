export type Technology = {
  name: string;
  /** simple-icons slug for CDN, or null to use local icon */
  slug: string | null;
  /** Brand hex without # */
  color: string;
  /** Local fallback under /public/tech/ */
  localIcon?: string;
};

/** Engineering-first order; automation tools remain but are secondary. */
export const technologies: Technology[] = [
  { name: "TypeScript", slug: "typescript", color: "3178C6" },
  { name: "React", slug: "react", color: "61DAFB" },
  { name: "Next.js", slug: "nextdotjs", color: "FFFFFF" },
  { name: "Node.js", slug: "nodedotjs", color: "339933" },
  { name: "Python", slug: "python", color: "3776AB" },
  { name: "Express", slug: "express", color: "A8A8A8" },
  { name: "PostgreSQL", slug: "postgresql", color: "4169E1" },
  { name: "MongoDB", slug: "mongodb", color: "47A248" },
  { name: "Supabase", slug: "supabase", color: "3FCF8E" },
  { name: "Firebase", slug: "firebase", color: "DD2C00" },
  { name: "Docker", slug: "docker", color: "2496ED" },
  { name: "Tailwind CSS", slug: "tailwindcss", color: "06B6D4" },
  { name: "OpenAI", slug: null, color: "412991", localIcon: "/tech/openai.svg" },
  { name: "Claude", slug: "anthropic", color: "D4A574" },
  { name: "Gemini", slug: "googlegemini", color: "8E75B2" },
  { name: "LLMs", slug: null, color: "C9A96E", localIcon: "/tech/llms.svg" },
  { name: "GCP", slug: "googlecloud", color: "4285F4" },
  { name: "n8n", slug: "n8n", color: "EA4B71" },
  { name: "Make.com", slug: "make", color: "6D00CC" },
  { name: "Airtable", slug: "airtable", color: "18BFFF" },
  { name: "VAPI", slug: null, color: "6366F1", localIcon: "/tech/vapi.svg" },
  { name: "Apify", slug: null, color: "97D700", localIcon: "/tech/apify.svg" },
  { name: "Firecrawl", slug: null, color: "F97316", localIcon: "/tech/firecrawl.svg" },
  { name: "Claude Code", slug: "anthropic", color: "D97757" },
  { name: "Apollo", slug: "apollographql", color: "311C87" },
  { name: "Notion", slug: "notion", color: "FFFFFF" },
  { name: "Slack", slug: null, color: "E01E5A", localIcon: "/tech/slack.svg" },
  { name: "Gmail", slug: "gmail", color: "EA4335" },
  { name: "Google Sheets", slug: "googlesheets", color: "34A853" },
  { name: "Google Docs", slug: "googledocs", color: "4285F4" },
  { name: "Discord", slug: "discord", color: "5865F2" },
  { name: "Odoo", slug: null, color: "714B67", localIcon: "/tech/odoo.svg" },
];

export function techIconUrl(tech: Technology): string {
  if (tech.localIcon) return tech.localIcon;
  if (tech.slug) {
    return `https://cdn.simpleicons.org/${tech.slug}/${tech.color}`;
  }
  return "/tech/llms.svg";
}
