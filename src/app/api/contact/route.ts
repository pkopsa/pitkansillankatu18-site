import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Käyttäjän syöte koodataan ennen HTML-sähköpostiin lisäämistä (ei HTML-injektiota)
function esc(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  const { nimi, email, puhelin, aihe, viesti } = await req.json();

  if (!nimi || !email || !viesti) {
    return NextResponse.json({ error: "Pakollisia kenttiä puuttuu." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) {
    return NextResponse.json({ error: "Tarkista sähköpostiosoite." }, { status: 400 });
  }

  try {
    await transporter.sendMail({
    from: `"Pitkänsillankatu 18 lomake" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `Yhteydenotto: Pitkänsillankatu 18 – ${nimi}${aihe ? ` (${aihe})` : ""}`,
    text: [
      `Nimi: ${nimi}`,
      `Sähköposti: ${email}`,
      `Puhelin: ${puhelin || "–"}`,
      `Aihe: ${aihe || "–"}`,
      "",
      viesti,
    ].join("\n"),
    html: `
      <table style="font-family:sans-serif;font-size:15px;color:#1e293b;max-width:600px">
        <tr><td style="padding:0 0 8px"><strong>Nimi:</strong> ${esc(nimi)}</td></tr>
        <tr><td style="padding:0 0 8px"><strong>Sähköposti:</strong> <a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
        <tr><td style="padding:0 0 8px"><strong>Puhelin:</strong> ${esc(puhelin) || "–"}</td></tr>
        <tr><td style="padding:0 0 20px"><strong>Aihe:</strong> ${esc(aihe) || "–"}</td></tr>
        <tr><td style="padding:16px;background:#f8fafc;border-left:4px solid #f59e0b;white-space:pre-wrap">${esc(viesti)}</td></tr>
      </table>
    `,
    });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json(
      { error: "Sähköpostin lähetys epäonnistui. Tarkista SMTP-asetukset." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
