import "dotenv/config";
import express from "express";
import compression from "compression";
import zlib from "zlib";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerSitemapRoutes } from "../sitemap.js";
import { registerResumeUploadRoute } from "../upload-resume.js";
import { registerGoogleAuthRoutes } from "../google-auth-routes.js";

// Domains that should redirect to the canonical domain (301 Permanent)
const CANONICAL_DOMAIN = "institutodrudiealmeida.com.br";
const REDIRECT_DOMAINS = new Set([
  "drudiealmeida.com",
  "www.drudiealmeida.com",
  "drudiealmeida.com.br",
  "www.drudiealmeida.com.br",
  "www.institutodrudiealmeida.com.br",
]);

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Redirect alternative domains to canonical domain (301 Permanent)
  // This ensures all traffic consolidates to institutodrudiealmeida.com.br for SEO
  app.use((req, res, next) => {
    const forwardedHost = req.headers["x-forwarded-host"] as string | undefined;
    const host = (forwardedHost || req.headers.host || "").split(":")[0].toLowerCase();
    if (REDIRECT_DOMAINS.has(host)) {
      const redirectUrl = `https://${CANONICAL_DOMAIN}${req.originalUrl}`;
      return res.redirect(301, redirectUrl);
    }
    next();
  });

  // Redirect legacy URLs (404s from old site structure) to correct paths
  const LEGACY_REDIRECTS: Record<string, string> = {
    "/instituto-catarata": "/instituto/catarata",
    "/instituto-ceratocone": "/instituto/ceratocone",
    "/instituto-glaucoma": "/instituto/glaucoma",
    "/instituto-retina": "/instituto/retina",
    "/instituto-estrabismo": "/instituto/estrabismo",
    "/agendamento": "/agendar",
  };
  app.use((req, res, next) => {
    const target = LEGACY_REDIRECTS[req.path];
    if (target) {
      return res.redirect(301, target);
    }
    next();
  });

  // ============================================================
  // Keep-Alive: /ping endpoint para monitoramento externo
  // Configure o UptimeRobot (gratuito) para fazer GET /ping a cada 5 min
  // URL: https://uptimerobot.com — adicione o domínio institutodrudiealmeida.com.br/ping
  // Isso evita o cold start que causa TTFB de 3-8s e score PageSpeed de 23
  // ============================================================
  app.get('/ping', (_req, res) => {
    res.status(200).json({ status: 'ok', ts: Date.now() });
  });

  // Enable Brotli + gzip compression for all responses
  // Brotli compresses ~15-20% better than gzip (Node.js native zlib support)
  app.use((req, res, next) => {
    const acceptEncoding = req.headers["accept-encoding"] || "";
    if (/\bbr\b/.test(acceptEncoding)) {
      const _write = res.write.bind(res);
      const _end = res.end.bind(res);
      const brotli = zlib.createBrotliCompress({
        params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 4 }, // quality 4 = fast, good ratio
      });
      res.setHeader("Content-Encoding", "br");
      res.removeHeader("Content-Length");
      brotli.on("data", (chunk: Buffer) => _write(chunk));
      brotli.on("end", () => _end());
      (res as any).write = (chunk: any, ...args: any[]) => brotli.write(chunk);
      (res as any).end = (chunk?: any, ...args: any[]) => {
        if (chunk) brotli.write(chunk);
        brotli.end();
      };
      return next();
    }
    // Fallback to gzip for browsers that don't support Brotli
    compression()(req, res, next);
  });
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // Sitemap and robots.txt
  registerSitemapRoutes(app);
  // Resume upload endpoint
  registerResumeUploadRoute(app);
  // Google Calendar OAuth2 routes
  registerGoogleAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);

    // Auto-ping interno: faz um request a si mesmo a cada 4 minutos
    // Isso mantém o processo Node.js ativo e evita cold start
    // O Manus hiberna servidores inativos; este ping previne a hibernação
    if (process.env.NODE_ENV === 'production') {
      const selfPingUrl = `http://localhost:${port}/ping`;
      setInterval(async () => {
        try {
          const res = await fetch(selfPingUrl);
          if (!res.ok) console.warn('[keep-alive] ping failed:', res.status);
        } catch (e) {
          console.warn('[keep-alive] ping error:', e);
        }
      }, 4 * 60 * 1000); // 4 minutos
      console.log('[keep-alive] Auto-ping ativado (a cada 4 min)');
    }
  });
}

startServer().catch(console.error);
