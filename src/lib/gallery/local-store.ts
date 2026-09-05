import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import type { DrawingStatus, DrawingSubmission } from "./types";

const DATA_DIR = path.join(process.cwd(), "data", "gallery");
const META_FILE = path.join(DATA_DIR, "submissions.json");
const IMAGES_DIR = path.join(DATA_DIR, "images");

async function ensureDirs() {
  await fs.mkdir(IMAGES_DIR, { recursive: true });
  try {
    await fs.access(META_FILE);
  } catch {
    await fs.writeFile(META_FILE, "[]", "utf8");
  }
}

async function readAll(): Promise<DrawingSubmission[]> {
  await ensureDirs();
  const raw = await fs.readFile(META_FILE, "utf8");
  return JSON.parse(raw) as DrawingSubmission[];
}

async function writeAll(items: DrawingSubmission[]) {
  await ensureDirs();
  await fs.writeFile(META_FILE, JSON.stringify(items, null, 2), "utf8");
}

function dataUrlToBuffer(dataUrl: string): { buffer: Buffer; ext: string } {
  const match = /^data:image\/(png|jpeg|webp);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("Invalid image");
  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  return { buffer: Buffer.from(match[2], "base64"), ext };
}

export async function localList(status?: DrawingStatus): Promise<DrawingSubmission[]> {
  const items = await readAll();
  const filtered = status ? items.filter((i) => i.status === status) : items;
  return filtered.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export async function localCreate(input: {
  imageDataUrl: string;
  visitorName: string;
  message: string;
}): Promise<DrawingSubmission> {
  const { buffer, ext } = dataUrlToBuffer(input.imageDataUrl);
  const id = randomUUID();
  const filename = `${id}.${ext}`;
  await ensureDirs();
  await fs.writeFile(path.join(IMAGES_DIR, filename), buffer);

  const submission: DrawingSubmission = {
    id,
    imageUrl: `/api/gallery/image/${filename}`,
    visitorName: input.visitorName || "Anonymous",
    message: input.message,
    status: "pending",
    createdAt: new Date().toISOString(),
  };

  const items = await readAll();
  items.push(submission);
  await writeAll(items);
  return submission;
}

export async function localUpdateStatus(
  id: string,
  status: DrawingStatus,
): Promise<DrawingSubmission | null> {
  const items = await readAll();
  const idx = items.findIndex((i) => i.id === id);
  if (idx < 0) return null;
  items[idx] = { ...items[idx], status };
  await writeAll(items);
  return items[idx];
}

export async function localDelete(id: string): Promise<boolean> {
  const items = await readAll();
  const item = items.find((i) => i.id === id);
  if (!item) return false;
  const filename = item.imageUrl.split("/").pop();
  if (filename) {
    try {
      await fs.unlink(path.join(IMAGES_DIR, filename));
    } catch {
      /* ignore missing file */
    }
  }
  await writeAll(items.filter((i) => i.id !== id));
  return true;
}

export function localImagePath(filename: string): string {
  // prevent path traversal
  const safe = path.basename(filename);
  return path.join(IMAGES_DIR, safe);
}
