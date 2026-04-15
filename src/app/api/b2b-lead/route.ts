import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// ── Types ────────────────────────────────────────────────────────────────────
interface B2BLeadPayload {
  name: string;
  company: string;
  email: string;
  teamSize: number;
  months: number;
  ratePerM2: number;
  monthly: number;
  total: number;
  message?: string;
}

// ── SMTP transporter (reuses existing config) ────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

function fmt(n: number): string {
  return Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + " €";
}

// ── Slack notification ───────────────────────────────────────────────────────
async function notifySlack(payload: B2BLeadPayload): Promise<void> {
  const url = process.env.SLACK_WEBHOOK_URL;
  if (!url) return; // Slack not configured — skip silently

  const text = [
    "🏢 *New B2B Lead — Pitkänsillankatu 18*",
    `*Name:* ${payload.name}`,
    `*Company:* ${payload.company}`,
    `*Email:* ${payload.email}`,
    `*Team size:* ${payload.teamSize} people`,
    `*Duration:* ${payload.months} months`,
    `*Rate:* ${payload.ratePerM2} €/m²`,
    `*Monthly cost:* ${fmt(payload.monthly)}`,
    `*Total:* ${fmt(payload.total)}`,
    payload.message ? `*Message:* ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

// ── Route handler ────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const body = await req.json() as Partial<B2BLeadPayload>;

  const { name, company, email, teamSize, months, ratePerM2, monthly, total, message } = body;

  if (!name || !company || !email) {
    return NextResponse.json({ error: "name, company and email are required" }, { status: 400 });
  }

  // ── Send email ──────────────────────────────────────────────────────────
  try {
    await transporter.sendMail({
      from: `"Pitkänsillankatu 18 B2B" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `🏢 B2B Lead: ${company} — ${name}`,
      text: [
        `Name:      ${name}`,
        `Company:   ${company}`,
        `Email:     ${email}`,
        `Team size: ${teamSize} people`,
        `Duration:  ${months} months`,
        `Rate:      ${ratePerM2} €/m²`,
        `Monthly:   ${fmt(monthly ?? 0)}`,
        `Total:     ${fmt(total ?? 0)}`,
        "",
        message ?? "(no message)",
      ].join("\n"),
      html: `
        <table style="font-family:sans-serif;font-size:15px;color:#1e293b;max-width:620px;border-collapse:collapse">
          <tr><td colspan="2" style="padding:0 0 16px">
            <span style="background:#0f172a;color:#34d399;font-weight:700;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border-radius:20px">
              B2B Lead · Pitkänsillankatu 18
            </span>
          </td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b;width:140px">Name</td><td style="padding:6px 0"><strong>${name}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Company</td><td style="padding:6px 0"><strong>${company}</strong></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Email</td><td style="padding:6px 0"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Team size</td><td style="padding:6px 0">${teamSize} people</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Duration</td><td style="padding:6px 0">${months} months</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#64748b">Rate</td><td style="padding:6px 0">${ratePerM2} €/m²</td></tr>
          <tr style="background:#f0fdf4"><td style="padding:10px 16px 10px 0;color:#166534;font-weight:700">Monthly</td><td style="padding:10px 0;color:#166534;font-weight:700;font-size:18px">${fmt(monthly ?? 0)}</td></tr>
          <tr style="background:#f0fdf4"><td style="padding:6px 16px 10px 0;color:#166534;font-weight:700">Total</td><td style="padding:6px 0 10px;color:#166534;font-weight:700;font-size:18px">${fmt(total ?? 0)}</td></tr>
          ${message ? `<tr><td colspan="2" style="padding:16px;background:#f8fafc;border-left:4px solid #34d399;white-space:pre-wrap;margin-top:12px">${message}</td></tr>` : ""}
        </table>
      `,
    });
  } catch (err) {
    console.error("B2B lead SMTP error:", err);
    return NextResponse.json({ error: "Email delivery failed" }, { status: 500 });
  }

  // ── Slack (fire-and-forget, never blocks the response) ──────────────────
  notifySlack(body as B2BLeadPayload).catch(err =>
    console.error("Slack webhook error:", err)
  );

  return NextResponse.json({ ok: true });
}
