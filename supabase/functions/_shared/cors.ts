// Per-request CORS helper. Set ALLOWED_ORIGINS in Supabase for production.
const DEV_ORIGIN_RE = /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;
function configuredOrigins(): string[] | null {
  const raw = Deno.env.get("ALLOWED_ORIGINS");
  if (!raw || !raw.trim()) return null;
  return raw.split(",").map((s) => s.trim()).filter(Boolean);
}
function resolveAllowOrigin(req: Request): string {
  const origin = req.headers.get("origin");
  const allowlist = configuredOrigins();
  if (!allowlist) return origin || "*";
  if (origin && (allowlist.includes(origin) || DEV_ORIGIN_RE.test(origin))) return origin;
  if (origin) console.warn(`CORS: origin "${origin}" is not allowed.`);
  return allowlist[0] ?? "null";
}
export function corsHeadersFor(req: Request): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": resolveAllowOrigin(req),
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}
