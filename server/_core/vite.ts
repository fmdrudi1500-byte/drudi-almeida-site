import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import { injectMetaTags } from "../seoMetaTags";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      let page = await vite.transformIndexHtml(url, template);

      // Inject route-specific meta tags for SEO (server-side)
      const pathname = new URL(url, "http://localhost").pathname;
      page = injectMetaTags(page, pathname);

      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  // Serve hashed assets (JS/CSS bundles) with long-lived immutable cache
  app.use(
    "/assets",
    express.static(path.join(distPath, "assets"), {
      maxAge: "1y",
      immutable: true,
      etag: true,
    })
  );

  // Serve images and fonts with long-lived immutable cache (filenames contain hash)
  app.use(
    "/images",
    express.static(path.join(distPath, "images"), {
      maxAge: "1y",
      immutable: true,
      etag: true,
    })
  );
  app.use(
    "/fonts",
    express.static(path.join(distPath, "fonts"), {
      maxAge: "1y",
      immutable: true,
      etag: true,
    })
  );

  // Serve other static files with short cache
  app.use(
    express.static(distPath, {
      maxAge: "1h",
      etag: true,
      lastModified: true,
      setHeaders(res, filePath) {
        // HTML files: short cache to allow meta tag updates
        if (filePath.endsWith(".html")) {
          res.setHeader("Cache-Control", "max-age=0, must-revalidate");
        }
        // WebP images with hash in name: long cache
        if (filePath.endsWith(".webp") || filePath.endsWith(".avif")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
        // Fonts: long cache
        if (filePath.endsWith(".woff2") || filePath.endsWith(".woff")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // fall through to index.html if the file doesn't exist
  // Inject route-specific meta tags for SEO before serving
  app.use("*", (req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    const html = fs.readFileSync(indexPath, "utf-8");
    const pathname = req.originalUrl.split("?")[0].split("#")[0];
    const injected = injectMetaTags(html, pathname);

    res.setHeader("Cache-Control", "max-age=0, must-revalidate");
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(injected);
  });
}
