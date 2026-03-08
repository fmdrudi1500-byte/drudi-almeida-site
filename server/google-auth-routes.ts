/**
 * google-auth-routes.ts
 * Express routes for Google Calendar OAuth2 authorization flow.
 *
 * Routes:
 *  GET /api/google-auth/start   → Redirects to Google OAuth consent screen
 *  GET /api/google-auth/callback → Handles OAuth callback, saves refresh token
 *  GET /api/google-auth/status  → Returns current auth status (admin only)
 *  POST /api/google-auth/setup-calendars → Creates the 5 unit calendars (admin only)
 */
import { type Express } from "express";
import { google } from "googleapis";
import { ENV } from "./_core/env";
import { createUnitCalendar, listCalendars } from "./google-calendar";

const SCOPES = ["https://www.googleapis.com/auth/calendar"];

function getOAuth2Client() {
  return new google.auth.OAuth2(
    ENV.googleClientId,
    ENV.googleClientSecret,
    ENV.googleRedirectUri
  );
}

export function registerGoogleAuthRoutes(app: Express) {
  /**
   * Step 1: Redirect to Google consent screen.
   * Only accessible with a secret token to prevent unauthorized use.
   */
  app.get("/api/google-auth/start", (req, res) => {
    const secret = req.query.secret as string;
    if (secret !== "drudi2024setup") {
      return res.status(403).send("Acesso negado.");
    }

    const oauth2Client = getOAuth2Client();
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
      prompt: "consent", // Force consent to always get refresh_token
    });

    res.redirect(authUrl);
  });

  /**
   * Step 2: Handle OAuth callback from Google.
   * Exchanges code for tokens and displays the refresh token.
   */
  app.get("/api/google-auth/callback", async (req, res) => {
    const code = req.query.code as string;
    if (!code) {
      return res.status(400).send("Código de autorização não encontrado.");
    }

    try {
      const oauth2Client = getOAuth2Client();
      const { tokens } = await oauth2Client.getToken(code);

      if (!tokens.refresh_token) {
        return res.status(400).send(`
          <html><body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px">
            <h2>⚠️ Refresh Token não recebido</h2>
            <p>O Google não enviou um refresh token. Isso acontece quando a conta já autorizou o app anteriormente.</p>
            <p>Para resolver: acesse <a href="https://myaccount.google.com/permissions" target="_blank">Permissões da conta Google</a>, 
            remova o acesso do app "Agendamento Site" e tente novamente.</p>
            <a href="/api/google-auth/start?secret=drudi2024setup">Tentar novamente</a>
          </body></html>
        `);
      }

      const refreshToken = tokens.refresh_token;

      // Display the token so the admin can copy it to the environment variables
      res.send(`
        <html>
        <head><title>Google Calendar — Autorização Concluída</title></head>
        <body style="font-family:sans-serif;max-width:700px;margin:40px auto;padding:20px;background:#f9f9f9">
          <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
            <h2 style="color:#2c3e50">✅ Autorização concluída com sucesso!</h2>
            <p>Copie o token abaixo e adicione como variável de ambiente <strong>GOOGLE_REFRESH_TOKEN</strong>:</p>
            <textarea readonly onclick="this.select()" style="width:100%;height:80px;font-family:monospace;font-size:12px;padding:10px;border:2px solid #c9a961;border-radius:8px;background:#fffdf5">${refreshToken}</textarea>
            <br><br>
            <p style="color:#666;font-size:14px">
              Após salvar o token como variável de ambiente, reinicie o servidor e acesse 
              <a href="/api/google-auth/setup-calendars-page">/api/google-auth/setup-calendars-page</a> 
              para criar as 5 agendas automaticamente.
            </p>
            <hr>
            <p style="color:#999;font-size:12px">Este token é confidencial. Não compartilhe com ninguém.</p>
          </div>
        </body>
        </html>
      `);
    } catch (err) {
      console.error("[Google Auth] Callback error:", err);
      res.status(500).send(`Erro ao processar autorização: ${err}`);
    }
  });

  /**
   * Page to trigger calendar creation.
   */
  app.get("/api/google-auth/setup-calendars-page", async (_req, res) => {
    if (!ENV.googleRefreshToken) {
      return res.send(`
        <html><body style="font-family:sans-serif;max-width:600px;margin:40px auto;padding:20px">
          <h2>⚠️ GOOGLE_REFRESH_TOKEN não configurado</h2>
          <p>Primeiro complete a autorização OAuth em <a href="/api/google-auth/start?secret=drudi2024setup">/api/google-auth/start</a></p>
        </body></html>
      `);
    }

    res.send(`
      <html>
      <head><title>Configurar Agendas — Drudi e Almeida</title></head>
      <body style="font-family:sans-serif;max-width:700px;margin:40px auto;padding:20px;background:#f9f9f9">
        <div style="background:white;padding:30px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
          <h2 style="color:#2c3e50">📅 Configurar Agendas do Google Calendar</h2>
          <p>Clique no botão abaixo para criar automaticamente as 5 agendas das unidades no Google Calendar.</p>
          <button onclick="setupCalendars()" style="background:#2c3e50;color:white;border:none;padding:12px 24px;border-radius:8px;font-size:16px;cursor:pointer">
            Criar as 5 Agendas
          </button>
          <div id="result" style="margin-top:20px"></div>
        </div>
        <script>
          async function setupCalendars() {
            document.getElementById('result').innerHTML = '<p>⏳ Criando agendas...</p>';
            const res = await fetch('/api/google-auth/setup-calendars', { method: 'POST' });
            const data = await res.json();
            if (data.success) {
              let html = '<h3 style="color:green">✅ Agendas criadas com sucesso!</h3>';
              html += '<p>Adicione as seguintes variáveis de ambiente:</p><pre style="background:#f5f5f5;padding:15px;border-radius:8px;font-size:13px">';
              for (const [key, val] of Object.entries(data.envVars)) {
                html += key + '=' + val + '\\n';
              }
              html += '</pre><p style="color:#666">Após salvar as variáveis, reinicie o servidor.</p>';
              document.getElementById('result').innerHTML = html;
            } else {
              document.getElementById('result').innerHTML = '<p style="color:red">❌ Erro: ' + data.error + '</p>';
            }
          }
        </script>
      </body>
      </html>
    `);
  });

  /**
   * Creates the 5 unit calendars and returns their IDs.
   */
  app.post("/api/google-auth/setup-calendars", async (_req, res) => {
    if (!ENV.googleRefreshToken) {
      return res.json({ success: false, error: "GOOGLE_REFRESH_TOKEN não configurado" });
    }

    const units = [
      { name: "Lapa", envKey: "GCAL_LAPA" },
      { name: "Santana", envKey: "GCAL_SANTANA" },
      { name: "São Miguel", envKey: "GCAL_SAO_MIGUEL" },
      { name: "Tatuapé", envKey: "GCAL_TATUAPE" },
      { name: "Guarulhos", envKey: "GCAL_GUARULHOS" },
    ];

    const envVars: Record<string, string> = {};
    const errors: string[] = [];

    for (const unit of units) {
      // Check if calendar already exists
      const existing = await listCalendars();
      const found = existing.find((c) => c.summary.includes(unit.name));

      if (found) {
        envVars[unit.envKey] = found.id;
      } else {
        const calId = await createUnitCalendar(unit.name);
        if (calId) {
          envVars[unit.envKey] = calId;
        } else {
          errors.push(`Falha ao criar agenda para ${unit.name}`);
        }
      }
    }

    if (errors.length > 0) {
      return res.json({ success: false, error: errors.join("; ") });
    }

    res.json({ success: true, envVars });
  });

  /**
   * Returns current Google Calendar integration status.
   */
  app.get("/api/google-auth/status", (_req, res) => {
    res.json({
      hasClientId: !!ENV.googleClientId,
      hasClientSecret: !!ENV.googleClientSecret,
      hasRefreshToken: !!ENV.googleRefreshToken,
      calendars: {
        Lapa: !!ENV.gcalLapa,
        Santana: !!ENV.gcalSantana,
        "São Miguel": !!ENV.gcalSaoMiguel,
        Tatuapé: !!ENV.gcalTatuape,
        Guarulhos: !!ENV.gcalGuarulhos,
      },
    });
  });
}
