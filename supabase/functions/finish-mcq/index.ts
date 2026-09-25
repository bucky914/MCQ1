import { fail, handle, rpcResult, UUID_RE, TOKEN_RE } from "../_shared/util.ts";

handle(async (body, db, ctx) => {
  const attemptId = typeof body.attempt_id === "string" ? body.attempt_id : "";
  const token = typeof body.token === "string" ? body.token : "";
  const answers = body.answers;

  if (!UUID_RE.test(attemptId) || !TOKEN_RE.test(token)) {
    return fail(ctx, "not_found", "Exam session not found.", 404);
  }
  if (!Array.isArray(answers) || answers.length > 200) {
    return fail(ctx, "invalid_input", "Invalid answer data.", 400);
  }

  const cleaned = answers.map((answer) => {
    if (answer === null || answer === undefined || answer === "") return null;
    const n = Number(answer);
    return Number.isInteger(n) && n >= 0 && n <= 3 ? n : null;
  });

  const { data, error } = await db.rpc("finish_mcq_attempt", {
    p_attempt_id: attemptId,
    p_token: token,
    p_answers: cleaned,
  });
  if (error) throw error;
  return rpcResult(ctx, data);
});
