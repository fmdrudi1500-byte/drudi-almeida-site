/**
 * appointment-email.ts
 * Sends transactional emails for the scheduling system via Resend.
 * - Patient: warm confirmation that team will contact them
 * - Clinic:  internal notification to contato@drudiealmeida.com.br
 */

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Sender address — must be a verified domain in Resend.
// While the domain is not verified, Resend allows sending from onboarding@resend.dev (test only).
const FROM_ADDRESS = "Drudi e Almeida <onboarding@resend.dev>";
const CLINIC_EMAIL = "contato@drudiealmeida.com.br";

const WEEKDAY_NAMES: Record<number, string> = {
  0: "domingo",
  1: "segunda-feira",
  2: "terça-feira",
  3: "quarta-feira",
  4: "quinta-feira",
  5: "sexta-feira",
  6: "sábado",
};

function formatDate(dateStr: string): string {
  // dateStr = "YYYY-MM-DD"
  const [year, month, day] = dateStr.split("-").map(Number);
  const d = new Date(year, month - 1, day);
  const weekday = WEEKDAY_NAMES[d.getDay()];
  return `${weekday}, ${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${year}`;
}

function formatHour(hour: number): string {
  return `${String(hour).padStart(2, "0")}h00`;
}

interface AppointmentEmailData {
  patientName: string;
  patientEmail?: string | null;
  patientPhone: string;
  unit: string;
  appointmentDate: string;
  appointmentHour: number;
  cancelToken: string;
  siteOrigin?: string;
}

// ─── Patient confirmation email ───────────────────────────────────────────────

export async function sendPatientConfirmation(data: AppointmentEmailData): Promise<boolean> {
  if (!data.patientEmail) return true; // email not provided — skip silently

  const formattedDate = formatDate(data.appointmentDate);
  const formattedHour = formatHour(data.appointmentHour);
  const cancelUrl = `${data.siteOrigin || "https://drudicliniq-bjpzlanu.manus.space"}/cancelar-agendamento?token=${data.cancelToken}`;

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Solicitação de Consulta Recebida</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08);max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a2e4a 0%,#2c4a6e 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:11px;letter-spacing:3px;color:#c9a961;font-weight:600;text-transform:uppercase;">Drudi e Almeida Oftalmologia</p>
              <h1 style="margin:0;font-size:24px;color:#ffffff;font-weight:300;line-height:1.3;">Solicitação Recebida com Sucesso</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">
              <p style="margin:0 0 16px 0;font-size:16px;color:#2c3e50;line-height:1.6;">
                Olá, <strong>${data.patientName}</strong>! 👋
              </p>
              <p style="margin:0 0 24px 0;font-size:15px;color:#555;line-height:1.7;">
                Recebemos sua solicitação de consulta e ficamos muito felizes com sua confiança na <strong>Drudi e Almeida Oftalmologia</strong>. 
                Em breve, um de nossos especialistas entrará em contato para confirmar todos os detalhes do seu atendimento.
              </p>

              <!-- Appointment card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-left:4px solid #c9a961;border-radius:0 8px 8px 0;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px 0;font-size:11px;letter-spacing:2px;color:#c9a961;font-weight:700;text-transform:uppercase;">Detalhes da Solicitação</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#888;width:120px;">📍 Unidade</td>
                        <td style="padding:4px 0;font-size:14px;color:#2c3e50;font-weight:600;">Unidade ${data.unit}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#888;">📅 Data</td>
                        <td style="padding:4px 0;font-size:14px;color:#2c3e50;font-weight:600;">${formattedDate}</td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#888;">🕐 Horário</td>
                        <td style="padding:4px 0;font-size:14px;color:#2c3e50;font-weight:600;">${formattedHour}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px 0;font-size:14px;color:#777;line-height:1.7;">
                <strong>Importante:</strong> Este e-mail é apenas uma confirmação de que recebemos sua solicitação. 
                Nossa equipe entrará em contato pelo telefone <strong>${data.patientPhone}</strong> para confirmar o agendamento e orientá-lo sobre o preparo para a consulta.
              </p>

              <!-- WhatsApp CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="https://wa.me/5511916544653?text=Olá! Fiz uma solicitação de consulta e gostaria de mais informações." 
                       style="display:inline-block;background:#25D366;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.5px;">
                      💬 Falar pelo WhatsApp
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#aaa;text-align:center;line-height:1.6;">
                Caso precise cancelar sua solicitação, 
                <a href="${cancelUrl}" style="color:#c9a961;text-decoration:none;">clique aqui</a>.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8f9fa;padding:20px 40px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0 0 4px 0;font-size:12px;color:#999;">Drudi e Almeida Clínicas Oftalmológicas</p>
              <p style="margin:0;font-size:12px;color:#bbb;">Tel: (11) 5026-8521 | WhatsApp: (11) 91654-4653</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [data.patientEmail],
      subject: `✅ Solicitação de consulta recebida — Drudi e Almeida`,
      html,
    });
    if (error) {
      console.error("[Email] Patient confirmation error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email] Patient confirmation exception:", err);
    return false;
  }
}

// ─── Clinic notification email ────────────────────────────────────────────────

export async function sendClinicNotification(data: AppointmentEmailData): Promise<boolean> {
  const formattedDate = formatDate(data.appointmentDate);
  const formattedHour = formatHour(data.appointmentHour);

  const html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8" /><title>Novo Agendamento</title></head>
<body style="margin:0;padding:0;background:#f4f6f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f8;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);max-width:560px;width:100%;">
          <tr>
            <td style="background:#1a2e4a;padding:24px 32px;">
              <p style="margin:0;font-size:11px;letter-spacing:3px;color:#c9a961;font-weight:600;text-transform:uppercase;">Sistema de Agendamento</p>
              <h2 style="margin:6px 0 0 0;font-size:20px;color:#ffffff;font-weight:400;">🗓 Novo Agendamento Recebido</h2>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr style="background:#f8f9fa;">
                  <td style="padding:10px 16px;font-size:13px;color:#888;border-bottom:1px solid #eee;width:140px;">Paciente</td>
                  <td style="padding:10px 16px;font-size:14px;color:#2c3e50;font-weight:600;border-bottom:1px solid #eee;">${data.patientName}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:13px;color:#888;border-bottom:1px solid #eee;">Telefone</td>
                  <td style="padding:10px 16px;font-size:14px;color:#2c3e50;font-weight:600;border-bottom:1px solid #eee;">${data.patientPhone}</td>
                </tr>
                <tr style="background:#f8f9fa;">
                  <td style="padding:10px 16px;font-size:13px;color:#888;border-bottom:1px solid #eee;">E-mail</td>
                  <td style="padding:10px 16px;font-size:14px;color:#2c3e50;border-bottom:1px solid #eee;">${data.patientEmail || "—"}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:13px;color:#888;border-bottom:1px solid #eee;">Unidade</td>
                  <td style="padding:10px 16px;font-size:14px;color:#2c3e50;font-weight:600;border-bottom:1px solid #eee;">Unidade ${data.unit}</td>
                </tr>
                <tr style="background:#f8f9fa;">
                  <td style="padding:10px 16px;font-size:13px;color:#888;border-bottom:1px solid #eee;">Data</td>
                  <td style="padding:10px 16px;font-size:14px;color:#2c3e50;font-weight:600;border-bottom:1px solid #eee;">${formattedDate}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;font-size:13px;color:#888;">Horário</td>
                  <td style="padding:10px 16px;font-size:14px;color:#c9a961;font-weight:700;">${formattedHour}</td>
                </tr>
              </table>

              <p style="margin:24px 0 0 0;font-size:13px;color:#999;text-align:center;">
                Acesse o painel administrativo para confirmar ou cancelar este agendamento.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#f8f9fa;padding:16px 32px;text-align:center;border-top:1px solid #eee;">
              <p style="margin:0;font-size:11px;color:#bbb;">Drudi e Almeida — Sistema de Agendamento Automático</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [CLINIC_EMAIL],
      subject: `🗓 Novo agendamento — ${data.patientName} | ${data.unit} | ${formattedDate} ${formattedHour}`,
      html,
    });
    if (error) {
      console.error("[Email] Clinic notification error:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[Email] Clinic notification exception:", err);
    return false;
  }
}
