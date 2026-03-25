import "dotenv/config";
import express from "express";
import compression from "compression";
import { createServer } from "http";
import net from "net";
import path from "path";
import { fileURLToPath } from "url";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerSitemapRoutes } from "../sitemap.js";
import { registerResumeUploadRoute } from "../upload-resume.js";
import { registerGoogleAuthRoutes } from "../google-auth-routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    // Internal legacy URLs
    "/instituto-catarata": "/instituto/catarata",
    "/instituto-ceratocone": "/instituto/ceratocone",
    "/instituto-glaucoma": "/instituto/glaucoma",
    "/instituto-retina": "/instituto/retina",
    "/instituto-estrabismo": "/instituto/estrabismo",
    "/agendamento": "/agendar",
    // Wix legacy URLs (antigo site)
    "/copia-home": "/",
    "/blank": "/",
    "/blank-1": "/",
    "/blank-2": "/",
    "/blank-3": "/",
    "/blog-1": "/blog",
    "/contato-1": "/contato",
    "/sobre-1": "/sobre",
    "/servicos": "/",
    "/services": "/",
    "/galeria": "/tecnologia",
    "/gallery": "/tecnologia",
    "/equipe": "/sobre",
    "/team": "/sobre",
    "/faq": "/",
    "/depoimentos": "/",
    "/testimonials": "/",
    "/agendamento-1": "/agendar",
    "/agendar-consulta": "/agendar",
    // Short specialty URLs → institute pages
    "/catarata": "/instituto/catarata",
    "/glaucoma": "/instituto/glaucoma",
    "/retina": "/instituto/retina",
    "/ceratocone": "/instituto/ceratocone",
    "/estrabismo": "/instituto/estrabismo",
    "/cirurgia-de-catarata": "/instituto/catarata",
    "/tratamento-glaucoma": "/instituto/glaucoma",
    // Common Wix patterns
    "/nossos-medicos": "/sobre",
    "/nossos-servicos": "/",
    "/nossas-unidades": "/contato",
    "/unidades": "/contato",
    "/medicos": "/sobre",
    "/especialidades": "/",
    // Wix language routes (old site had /en, /pt-br, etc.)
    "/en": "/",
    "/en/": "/",
    "/pt": "/",
    "/pt/": "/",
    "/pt-br": "/",
    "/pt-br/": "/",
    "/home": "/",
    "/home/": "/",
    "/index": "/",
    "/index.html": "/",
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

  // ============================================================
  // Landing Pages estáticas (HTML puro, sem React bundle)
  // Servidas antes do Vite/static para máxima performance
  // Objetivo: LCP < 0.8s, sem JS framework overhead
  // ============================================================
  // Em dev: __dirname = server/_core/, '../lp' = server/lp/ ✓
  // Em prod: __dirname = dist/, 'lp' = dist/lp/ ✓ (copiado pelo build script)
  // Usar __dirname que funciona corretamente em ambos os ambientes:
  // - dev: server/_core/ -> ../lp = server/lp/
  // - prod: dist/ -> lp = dist/lp/
  const lpDir = process.env.NODE_ENV === 'production'
    ? path.join(__dirname, 'lp')
    : path.join(__dirname, '..', 'lp');

  // Homepage estática (HTML puro, sem React bundle) — máximo PageSpeed
  app.get('/', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.join(lpDir, 'home.html'));
  });

  app.get('/lp/catarata', (_req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.sendFile(path.join(lpDir, 'catarata.html'));
  });

  // ============================================================
  // Proxy reverso para Landing Pages hospedadas no GitHub Pages
  // A URL no browser permanece como institutodrudiealmeida.com.br/instituto/lp/*
  // O Express busca o HTML do GitHub Pages e serve diretamente
  // ============================================================
  const LP_GITHUB_PAGES = 'https://fmdrudi1500-byte.github.io/lp-catarata/';

  app.get('/instituto/lp/catarata', async (_req, res) => {
    try {
      const upstream = await fetch(LP_GITHUB_PAGES, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DrudioProxy/1.0)' },
        signal: AbortSignal.timeout(8000),
      });
      if (!upstream.ok) {
        return res.status(upstream.status).send('Erro ao carregar a página.');
      }
      const html = await upstream.text();
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=60');
      res.setHeader('X-Robots-Tag', 'noindex, nofollow');
      return res.send(html);
    } catch (err) {
      console.error('[lp-proxy] Error fetching GitHub Pages:', err);
      return res.status(502).send('Serviço temporariamente indisponível.');
    }
  });

  // Enable gzip/deflate compression for all responses
  app.use(compression());
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
