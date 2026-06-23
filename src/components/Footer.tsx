import { site } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-subtle px-5 py-8 md:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <p className="font-display text-sm text-muted-2">
          {site.name}
          <span className="text-accent">.</span>
        </p>
        <p className="text-xs text-muted-2">{site.location}</p>
      </div>
    </footer>
  );
}
