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

export async function POST(req: NextRequest) {
  const { nimi, email, puhelin, viesti } = await req.json();

  if (!nimi || !email || !viesti) {
    return NextResponse.json({ error: "Pakollisia kenttiä puuttuu." }, { status: 400 });
  }

  await transporter.sendMail({
    from: `"Pitkänsillankatu 33 lomake" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    replyTo: email,
    subject: `Yhteydenotto: Pitkänsillankatu 33 – ${nimi}`,
    text: [
      `Nimi: ${nimi}`,
      `Sähköposti: ${email}`,
      `Puhelin: ${puhelin || "–"}`,
      "",
      viesti,
    ].join("\n"),
    html: `
      <table style="font-family:sans-serif;font-size:15px;color:#1e293b;max-width:600px">
        <tr><td style="padding:0 0 8px"><strong>Nimi:</strong> ${nimi}</td></tr>
        <tr><td style="padding:0 0 8px"><strong>Sähköposti:</strong> <a href="mailto:${email}">${email}</a></td></tr>
        <tr><td style="padding:0 0 20px"><strong>Puhelin:</strong> ${puhelin || "–"}</td></tr>
        <tr><td style="padding:16px;background:#f8fafc;border-left:4px solid #f59e0b;white-space:pre-wrap">${viesti}</td></tr>
      </table>
    `,
  });

  return NextResponse.json({ ok: true });
}
