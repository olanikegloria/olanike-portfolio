import { NextRequest, NextResponse } from "next/server";
import {
  deleteDrawing,
  listAllDrawings,
  updateDrawingStatus,
} from "@/lib/gallery/store";
import type { DrawingStatus } from "@/lib/gallery/types";

export const runtime = "nodejs";

function authorized(req: NextRequest): boolean {
  const expected = process.env.GALLERY_ADMIN_SECRET;
  if (!expected) return false;
  const header = req.headers.get("x-admin-secret");
  const cookie = req.cookies.get("gallery_admin")?.value;
  return header === expected || cookie === expected;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const drawings = await listAllDrawings();
    return NextResponse.json({ drawings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = String(body.id || "");
    const status = body.status as DrawingStatus;
    if (!id || !["approved", "rejected", "hidden", "pending"].includes(status)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    const updated = await updateDrawingStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ drawing: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const id = String(body.id || "");
    if (!id) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
    await deleteDrawing(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
