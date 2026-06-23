import Image from "next/image";
import type { Project } from "@/data/projects";

type Props = {
  project: Project;
};

export function ProjectGallery({ project }: Props) {
  if (project.galleryLayout === "showcase" && project.showcaseImage) {
    return (
      <div className="mt-10 -mx-5 md:-mx-8">
        <div className="overflow-hidden bg-gallery px-5 py-6 md:px-8">
          <Image
            src={project.showcaseImage}
            alt={`${project.title} showcase`}
            width={1600}
            height={1000}
            className="mx-auto h-auto w-full max-w-4xl object-contain"
            priority
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-4">
      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {project.images.length > 1 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {project.images.slice(1).map((img) => (
            <div
              key={img}
              className="relative aspect-[16/10] overflow-hidden rounded-lg bg-surface"
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 384px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
