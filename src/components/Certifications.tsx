"use client";

import Image from "next/image";
import { certifications } from "@/data/portfolio";

export function Certifications() {
  return (
    <section className="border-t border-subtle px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
        <p className="section-label">05 / Credentials</p>
        <h2 className="font-display mt-3 text-3xl text-fg md:text-[2.5rem]">
          Certifications
        </h2>
        <span className="accent-line" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="overflow-hidden border border-subtle bg-surface"
            >
              <div className="relative aspect-[4/3] bg-cert">
                <Image
                  src={cert.image}
                  alt={`${cert.title} certificate`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-fg">{cert.title}</p>
                <p className="mt-1 text-xs text-muted-2">
                  {cert.issuer} · {cert.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
