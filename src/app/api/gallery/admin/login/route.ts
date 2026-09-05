import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const expected = process.env.GALLERY_ADMIN_SECRET;
  if (!expected) {
    return NextResponse.json(
      { error: "Set GALLERY_ADMIN_SECRET in the environment" },
      { status: 500 },
    );
  }

  const body = await req.json();
  const secret = String(body.secret || "");
  if (secret !== expected) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("gallery_admin", expected, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("gallery_admin", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
