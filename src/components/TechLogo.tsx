import { cn } from "@/lib/utils";
import { techIconUrl, type Technology } from "@/data/technologies";

export function TechLogo({
  tech,
  className,
}: {
  tech: Technology;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-tech-tile bg-tech-tile p-1.5",
        className,
      )}
      title={tech.name}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={techIconUrl(tech)}
        alt={tech.name}
        className="h-full w-full object-contain"
        loading="lazy"
      />
    </div>
  );
}
