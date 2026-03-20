import { sendResendEmail } from "../_shared/resend.js";

export async function onRequestPost({ request, env }) {
  const formData = await request.formData();
  const honeypot = String(formData.get("company") || "").trim();

  if (honeypot) {
    return Response.json({ ok: true });
  }

  const email = String(formData.get("email") || "").trim();

  if (!email) {
    return Response.json({ ok: false, error: "Email is required." }, { status: 400 });
  }

  await sendResendEmail(env, {
    subject: "Wood Buffalo Paving subscription request",
    text: `Subscription request from ${email}`,
    html: `<p>Subscription request from <strong>${email}</strong></p>`
  });

  return Response.json({ ok: true });
}
