import { createClient, type SupabaseClient } from "npm:@supabase/supabase-js@2";
import { corsHeadersFor } from "./cors.ts";

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const TOKEN_RE = /^[a-f0-9]{64}$/;
export type Body = Record<string, unknown>;
export interface Ctx { corsHeaders: Record<string, string>; }

export function json(ctx: Ctx, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...ctx.corsHeaders, "Content-Type": "application/json" },
  });
}

export function fail(ctx: Ctx, error: string, message: string, status: number): Response {
  return json(ctx, { ok: false, error, message }, status);
}

const STATUS_BY_ERROR: Record<string, number> = {
  invalid_input: 400,
  not_configured: 503,
  not_found: 404,
  name_mismatch: 409,
  already_submitted: 409,
  attempt_closed: 409,
  expired: 409,
};

const MESSAGE_BY_ERROR: Record<string, string> = {
  invalid_input: "Check your name and register number and try again.",
  not_configured: "The MCQ question bank is not configured.",
  not_found: "Exam session not found.",
  name_mismatch: "This register number is already used with a different name.",
  already_submitted: "This register number has already completed the examination.",
  attempt_closed: "This examination attempt has already ended.",
  expired: "Time is up. Your result is being recorded.",
};

export function rpcResult(ctx: Ctx, data: { ok?: boolean; error?: string } | null): Response {
  if (data && data.ok) return json(ctx, data);
  const code = data?.error ?? "server_error";
  return fail(ctx, code, MESSAGE_BY_ERROR[code] ?? "Request failed.", STATUS_BY_ERROR[code] ?? 400);
}

function serviceClient(): SupabaseClient {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Missing Supabase server configuration.");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}

export function handle(handler: (body: Body, db: SupabaseClient, ctx: Ctx) => Promise<Response>): void {
  Deno.serve(async (req: Request) => {
    const ctx: Ctx = { corsHeaders: corsHeadersFor(req) };
    if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: ctx.corsHeaders });
    if (req.method !== "POST") return fail(ctx, "method_not_allowed", "Use POST.", 405);

    try {
      const parsed = await req.json();
      if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) throw new Error();
      return await handler(parsed as Body, serviceClient(), ctx);
    } catch (error) {
      console.error("MCQ Edge Function error:", error);
      if (error instanceof SyntaxError) {
        return fail(ctx, "invalid_input", "Send a JSON object.", 400);
      }
      return fail(ctx, "server_error", "Something went wrong on the server. Please try again.", 500);
    }
  });
}
