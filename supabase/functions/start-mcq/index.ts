import { fail, handle, rpcResult } from "../_shared/util.ts";

const NAME_RE = /^[\p{L}\p{M}][\p{L}\p{M}\p{N} .'-]{0,99}$/u;
const REGISTER_RE = /^[A-Za-z0-9][A-Za-z0-9 _\-\/.]{0,49}$/;

handle(async (body, db, ctx) => {
  const name = typeof body.name === "string" ? body.name.trim().replace(/\s+/g, " ") : "";
  const registerNumber = typeof body.register_number === "string" ? body.register_number.trim() : "";
  const duration = typeof body.duration_minutes === "number" ? body.duration_minutes : 60;

  if (!NAME_RE.test(name) || !REGISTER_RE.test(registerNumber) || !Number.isInteger(duration)) {
    return fail(ctx, "invalid_input", "Enter a valid name and register number.", 400);
  }

  const { data, error } = await db.rpc("start_mcq_attempt", {
    p_name: name,
    p_register_number: registerNumber,
    p_duration_minutes: duration,
  });
  if (error) throw error;
  return rpcResult(ctx, data);
});
