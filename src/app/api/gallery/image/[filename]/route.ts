import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { localImagePath } from "@/lib/gallery/local-store";

export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  const { filename } = await context.params;
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "");
  if (!safe || safe !== filename) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const filePath = localImagePath(safe);
    const buf = await fs.readFile(filePath);
    const ext = safe.split(".").pop()?.toLowerCase();
    const type =
      ext === "jpg" || ext === "jpeg"
        ? "image/jpeg"
        : ext === "webp"
          ? "image/webp"
          : "image/png";
    return new NextResponse(buf, {
      headers: {
        "Content-Type": type,
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
}
