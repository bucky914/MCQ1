SUPABASE SETUP

1. Open SUPABASE_SETUP.sql and run the whole script in Supabase SQL Editor.
   It creates:
   - mcq_questions (server-side question/answer key)
   - mcq_attempts (one attempt per register number)
   - exam_results (final admin-visible result)
   - start_mcq_attempt() and finish_mcq_attempt() backend functions

2. Deploy the two Supabase Edge Functions:

   npx supabase functions deploy start-mcq --no-verify-jwt
   npx supabase functions deploy finish-mcq --no-verify-jwt

   Or use the Supabase CLI commands from your existing project setup.

3. app.js contains only the Supabase URL + publishable/anon key. Never put the
   service_role/secret key in a frontend file.

4. Student flow:
   - Student enters Name + Register Number.
   - start-mcq creates a backend attempt and returns a private attempt token.
   - Student answers the 60 questions.
   - On Submit, the browser sends only the answers + attempt token.
   - finish-mcq verifies the session and server time.
   - PostgreSQL reads the correct answers from mcq_questions.
   - PostgreSQL calculates score + percentage.
   - PostgreSQL stores the final result in exam_results.

5. The existing admin.html/admin.js continues to read exam_results after the
   admin user signs in through Supabase Auth.

IMPORTANT
- One active/completed attempt is allowed per register number.
- If the browser timer expires, the backend also checks its own expires_at.
- The frontend no longer contains the correct answer key.
- Students do not need a Supabase account.
- Do NOT use the service_role/secret key in app.js.
