import { sendResendEmail } from "../_shared/resend.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function onRequestPost({ request, env }) {
  const formData = await request.formData();
  const honeypot = String(formData.get("company") || "").trim();

  if (honeypot) {
    return Response.json({ ok: true });
  }

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const service = String(formData.get("service") || "").trim();
  const message = String(formData.get("message") || "").trim();

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "Name, email, and message are required." }, { status: 400 });
  }

  const subject = `Wood Buffalo Paving inquiry from ${name}`;
  const text = [
    "New contact request from the static site.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Project type: ${service || "Not provided"}`,
    "",
    "Message:",
    message
  ].join("\n");

  const html = `
    <h1>New contact request</h1>
    <ul>
      <li><strong>Name:</strong> ${escapeHtml(name)}</li>
      <li><strong>Email:</strong> ${escapeHtml(email)}</li>
      <li><strong>Phone:</strong> ${escapeHtml(phone || "Not provided")}</li>
      <li><strong>Project type:</strong> ${escapeHtml(service || "Not provided")}</li>
    </ul>
    <p><strong>Message</strong></p>
    <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
  `;

  await sendResendEmail(env, {
    subject,
    text,
    html,
    headers: email ? { "Reply-To": email } : undefined
  });

  return Response.json({ ok: true });
}
