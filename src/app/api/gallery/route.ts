import { NextRequest, NextResponse } from "next/server";
import {
  createDrawing,
  listDrawings,
  galleryBackend,
} from "@/lib/gallery/store";
import { rateLimit } from "@/lib/gallery/rate-limit";
import {
  isValidDataUrlImage,
  MAX_IMAGE_BYTES,
  MAX_MESSAGE_LEN,
  MAX_NAME_LEN,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  sanitizeText,
} from "@/lib/gallery/types";

export const runtime = "nodejs";

export async function GET() {
  try {
    const drawings = await listDrawings("approved");
    return NextResponse.json({
      drawings,
      backend: galleryBackend(),
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const limited = rateLimit(
      `draw:${ip}`,
      RATE_LIMIT_MAX,
      RATE_LIMIT_WINDOW_MS,
    );
    if (!limited.ok) {
      return NextResponse.json(
        { error: "Too many submissions. Try again shortly." },
        { status: 429 },
      );
    }

    const body = await req.json();
    const imageDataUrl = typeof body.imageDataUrl === "string" ? body.imageDataUrl : "";
    const visitorName = sanitizeText(body.visitorName, MAX_NAME_LEN);
    const message = sanitizeText(body.message, MAX_MESSAGE_LEN);

    if (!isValidDataUrlImage(imageDataUrl)) {
      return NextResponse.json({ error: "Invalid image payload" }, { status: 400 });
    }
    if (imageDataUrl.length > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "Drawing is too large" }, { status: 413 });
    }

    // Rough empty-canvas check: very small payloads
    if (imageDataUrl.length < 2000) {
      return NextResponse.json(
        { error: "Please draw something before submitting" },
        { status: 400 },
      );
    }

    const drawing = await createDrawing({
      imageDataUrl,
      visitorName,
      message,
    });

    return NextResponse.json({
      ok: true,
      id: drawing.id,
      status: drawing.status,
      message: "Thanks - your drawing was submitted for review.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to submit drawing" },
      { status: 500 },
    );
  }
}
