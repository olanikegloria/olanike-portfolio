export type VisitorSignal =
  | "hiring"
  | "collaborating"
  | "cheering"
  | "curious";

export type GalleryPiece = {
  id: string;
  imageUrl: string;
  visitorName: string;
  message: string;
  signal: VisitorSignal;
  createdAt: string;
  seeded?: boolean;
};

/** Seeded "Builders' Wall" pieces so the gallery never looks empty. */
export const SEED_GALLERY: GalleryPiece[] = [
  {
    id: "seed-01",
    imageUrl: "/gallery/seed/01-circuit.png",
    visitorName: "Ada",
    message: "Loved the CI flake scoring idea.",
    signal: "collaborating",
    createdAt: "2026-08-12T10:00:00.000Z",
    seeded: true,
  },
  {
    id: "seed-02",
    imageUrl: "/gallery/seed/02-rocket.png",
    visitorName: "Tunde",
    message: "Ship energy. Hiring full-stack soon.",
    signal: "hiring",
    createdAt: "2026-08-18T14:20:00.000Z",
    seeded: true,
  },
  {
    id: "seed-03",
    imageUrl: "/gallery/seed/03-smile.png",
    visitorName: "Chioma",
    message: "Hello from Lagos - keep building.",
    signal: "cheering",
    createdAt: "2026-08-22T09:10:00.000Z",
    seeded: true,
  },
  {
    id: "seed-04",
    imageUrl: "/gallery/seed/04-cloud.png",
    visitorName: "Jordan",
    message: "Curious how the knowledge RAG refuses inventing.",
    signal: "curious",
    createdAt: "2026-08-28T16:45:00.000Z",
    seeded: true,
  },
  {
    id: "seed-05",
    imageUrl: "/gallery/seed/05-star.png",
    visitorName: "Maya",
    message: "Rooting for your AI engineering path.",
    signal: "cheering",
    createdAt: "2026-09-01T11:30:00.000Z",
    seeded: true,
  },
  {
    id: "seed-06",
    imageUrl: "/gallery/seed/06-gear.png",
    visitorName: "Sam",
    message: "DevOps + AI projects stood out. Let's talk.",
    signal: "hiring",
    createdAt: "2026-09-03T08:05:00.000Z",
    seeded: true,
  },
];

export const SIGNAL_LABELS: Record<VisitorSignal, string> = {
  hiring: "Hiring",
  collaborating: "Collaborating",
  cheering: "Cheering",
  curious: "Curious",
};
