export async function sendResendEmail(env, payload) {
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY.");
  }

  const from = env.RESEND_FROM_EMAIL || "Wood Buffalo Paving <onboarding@resend.dev>";
  const to = env.RESEND_TO_EMAIL || "info@wbpaving.ca";

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      ...payload
    })
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`Resend request failed (${response.status}): ${text}`);
  }

  return text;
}
