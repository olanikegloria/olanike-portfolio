export type DrawingStatus = "pending" | "approved" | "rejected" | "hidden";

export type DrawingSubmission = {
  id: string;
  imageUrl: string;
  visitorName: string;
  message: string;
  status: DrawingStatus;
  createdAt: string;
};

export const MAX_IMAGE_BYTES = 800_000; // ~800KB data URL / upload
export const MAX_NAME_LEN = 40;
export const MAX_MESSAGE_LEN = 160;
export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX = 5;

export function sanitizeText(input: unknown, max: number): string {
  if (typeof input !== "string") return "";
  return input.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}

export function isValidDataUrlImage(dataUrl: string): boolean {
  return /^data:image\/(png|jpeg|webp);base64,/.test(dataUrl);
}
