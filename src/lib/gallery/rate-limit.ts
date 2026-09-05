const hits = new Map<string, number[]>();

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { ok: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) || []).filter((t) => t > windowStart);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, remaining: 0 };
  }
  recent.push(now);
  hits.set(key, recent);
  return { ok: true, remaining: limit - recent.length };
}
