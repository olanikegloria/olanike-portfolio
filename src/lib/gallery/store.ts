import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import type { DrawingStatus, DrawingSubmission } from "./types";
import {
  localCreate,
  localDelete,
  localList,
  localUpdateStatus,
} from "./local-store";

function supabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  );
}

function adminClient(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );
}

function mapRow(row: Record<string, unknown>): DrawingSubmission {
  return {
    id: String(row.id),
    imageUrl: String(row.image_url),
    visitorName: String(row.visitor_name || "Anonymous"),
    message: String(row.message || ""),
    status: row.status as DrawingStatus,
    createdAt: String(row.created_at),
  };
}

export async function listDrawings(
  status: DrawingStatus = "approved",
): Promise<DrawingSubmission[]> {
  if (!supabaseConfigured()) return localList(status);

  const sb = adminClient();
  const { data, error } = await sb
    .from("visitor_drawings")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function listAllDrawings(): Promise<DrawingSubmission[]> {
  if (!supabaseConfigured()) return localList();

  const sb = adminClient();
  const { data, error } = await sb
    .from("visitor_drawings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return (data || []).map(mapRow);
}

export async function createDrawing(input: {
  imageDataUrl: string;
  visitorName: string;
  message: string;
}): Promise<DrawingSubmission> {
  if (!supabaseConfigured()) return localCreate(input);

  const match = /^data:image\/(png|jpeg|webp);base64,(.+)$/.exec(
    input.imageDataUrl,
  );
  if (!match) throw new Error("Invalid image");

  const ext = match[1] === "jpeg" ? "jpg" : match[1];
  const buffer = Buffer.from(match[2], "base64");
  const id = randomUUID();
  const path = `${id}.${ext}`;
  const sb = adminClient();
  const bucket = process.env.SUPABASE_GALLERY_BUCKET || "visitor-art";

  const { error: uploadError } = await sb.storage
    .from(bucket)
    .upload(path, buffer, {
      contentType: `image/${match[1]}`,
      upsert: false,
    });
  if (uploadError) throw uploadError;

  const { data: publicUrl } = sb.storage.from(bucket).getPublicUrl(path);

  const { data, error } = await sb
    .from("visitor_drawings")
    .insert({
      id,
      image_url: publicUrl.publicUrl,
      visitor_name: input.visitorName || "Anonymous",
      message: input.message,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function updateDrawingStatus(
  id: string,
  status: DrawingStatus,
): Promise<DrawingSubmission | null> {
  if (!supabaseConfigured()) return localUpdateStatus(id, status);

  const sb = adminClient();
  const { data, error } = await sb
    .from("visitor_drawings")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return mapRow(data);
}

export async function deleteDrawing(id: string): Promise<boolean> {
  if (!supabaseConfigured()) return localDelete(id);

  const sb = adminClient();
  const { data: existing } = await sb
    .from("visitor_drawings")
    .select("image_url")
    .eq("id", id)
    .maybeSingle();

  if (existing?.image_url) {
    const bucket = process.env.SUPABASE_GALLERY_BUCKET || "visitor-art";
    const parts = String(existing.image_url).split(`/${bucket}/`);
    const objectPath = parts[1];
    if (objectPath) await sb.storage.from(bucket).remove([objectPath]);
  }

  const { error } = await sb.from("visitor_drawings").delete().eq("id", id);
  if (error) throw error;
  return true;
}

export function galleryBackend(): "supabase" | "local" {
  return supabaseConfigured() ? "supabase" : "local";
}
