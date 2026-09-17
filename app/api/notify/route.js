import nodemailer from "nodemailer";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const NOTIFY_TO = process.env.ADMIN_EMAIL || "bestbuilders@gmail.com";

/**
 * API Route POST /api/notify
 * Envoie un email de notification à Best Builders lorsqu'un client soumet une demande de devis.
 */
export async function POST(request) {
  if (!SMTP_USER || !SMTP_PASS) {
    return Response.json(
      { success: false, error: "Configuration SMTP manquante — notification email désactivée." },
      { status: 200 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Données invalides." },
      { status: 400 }
    );
  }

  const { name, email, phone, service_requested, message } = payload;

  if (!name || !email || !message) {
    return Response.json(
      { success: false, error: "Champs obligatoires manquants." },
      { status: 400 }
    );
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const formattedDate = new Date().toLocaleString("fr-GN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Africa/Conakry",
  });

  const htmlBody = `
    <div style="font-family:'Segoe UI',Arial,sans-serif;max-width:600px;margin:0 auto;background:#f8fafc;border:2px solid #0A2540;border-radius:4px;overflow:hidden">
      <!-- Header -->
      <div style="background:#0A2540;padding:24px 32px;text-align:center">
        <h1 style="color:#00C2FF;font-size:18px;margin:0;letter-spacing:2px;text-transform:uppercase">
          ⚡ NOUVELLE DEMANDE DE DEVIS
        </h1>
        <p style="color:#94a3b8;font-size:12px;margin:6px 0 0;letter-spacing:1px">
          BEST BUILDERS SARLU — NOTIFICATION AUTOMATIQUE
        </p>
      </div>

      <!-- Body -->
      <div style="padding:28px 32px">
        <p style="color:#334155;font-size:14px;margin:0 0 20px">
          Un prospect a soumis une demande depuis le site web le <strong>${formattedDate}</strong>.
        </p>

        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 12px;color:#5b6b7a;font-weight:600;width:140px;vertical-align:top">👤 Nom</td>
            <td style="padding:10px 12px;color:#0A2540;font-weight:700">${name}</td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 12px;color:#5b6b7a;font-weight:600;vertical-align:top">📧 Email</td>
            <td style="padding:10px 12px;color:#0A2540">
              <a href="mailto:${email}" style="color:#295EA8;text-decoration:none">${email}</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 12px;color:#5b6b7a;font-weight:600;vertical-align:top">📱 Téléphone</td>
            <td style="padding:10px 12px;color:#0A2540">
              <a href="tel:${phone || ""}" style="color:#295EA8;text-decoration:none">${phone || "Non renseigné"}</a>
            </td>
          </tr>
          <tr style="border-bottom:1px solid #e2e8f0">
            <td style="padding:10px 12px;color:#5b6b7a;font-weight:600;vertical-align:top">🔧 Service</td>
            <td style="padding:10px 12px;color:#0A2540;font-weight:600">${service_requested || "Non précisé"}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;color:#5b6b7a;font-weight:600;vertical-align:top">💬 Message</td>
            <td style="padding:10px 12px;color:#334155;line-height:1.6">${message.replace(/\n/g, "<br>")}</td>
          </tr>
        </table>

        <!-- CTA Button -->
        <div style="text-align:center;margin:28px 0 8px">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://bestbuilders.gn"}/dashboard"
             style="display:inline-block;background:#0A2540;color:#00C2FF;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;padding:14px 32px;border-radius:3px;text-decoration:none">
            OUVRIR LE DASHBOARD →
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div style="background:#f1f5f9;padding:16px 32px;text-align:center;border-top:1px solid #e2e8f0">
        <p style="color:#94a3b8;font-size:11px;margin:0;letter-spacing:0.5px">
          Notification envoyée automatiquement par le site Best Builders SARLU.
          <br>Ne pas répondre à cet email — contactez directement le client.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Best Builders SARLU" <${SMTP_USER}>`,
      to: NOTIFY_TO,
      subject: `🏗️ Nouvelle demande de devis — ${name} (${service_requested || "Général"})`,
      html: htmlBody,
      text: `Nouvelle demande de devis de ${name}\nEmail: ${email}\nTéléphone: ${phone || "N/A"}\nService: ${service_requested || "N/A"}\nMessage: ${message}`,
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json(
      { success: false, error: "Erreur technique lors de l'envoi de l'email." },
      { status: 500 }
    );
  }
}
