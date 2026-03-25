/**
 * Post-build script: Prerender homepage HTML using Puppeteer
 *
 * Starts the production server, visits / with Puppeteer, waits for React to
 * finish rendering, then saves the full HTML to dist/public/index.html.
 * This eliminates the blank screen on first load and dramatically improves LCP.
 *
 * NOTE: This script is OPTIONAL. If Puppeteer or Chromium is not available
 * (e.g., in CI/CD environments), it exits gracefully without failing the build.
 */

import { spawn } from 'child_process';
import { writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distPublic = resolve(projectRoot, 'dist', 'public');
const indexHtmlPath = resolve(distPublic, 'index.html');

const PORT = 4173;

// Detect Chromium executable
const chromiumPath = process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser';
const chromiumExists = existsSync(chromiumPath);

if (!chromiumExists) {
  console.log(`[Prerender] Chromium not found at ${chromiumPath}. Skipping prerender.`);
  console.log('[Prerender] The site will work normally as a client-side SPA.');
  process.exit(0);
}

// Try to import puppeteer — it may not be installed in all environments
let puppeteer;
try {
  // Use dynamic import with the package name (not an absolute path)
  const require = createRequire(import.meta.url);
  // Try to find puppeteer from node_modules relative to project root
  const puppeteerPaths = [
    resolve(projectRoot, 'node_modules', 'puppeteer'),
    resolve(projectRoot, 'node_modules', '.pnpm', 'puppeteer@2.1.1', 'node_modules', 'puppeteer'),
  ];
  
  let puppeteerPath = null;
  for (const p of puppeteerPaths) {
    if (existsSync(p)) {
      puppeteerPath = p;
      break;
    }
  }
  
  if (!puppeteerPath) {
    // Try to find via require.resolve
    try {
      puppeteerPath = require.resolve('puppeteer');
    } catch {
      // Not found
    }
  }
  
  if (!puppeteerPath) {
    console.log('[Prerender] Puppeteer not found. Skipping prerender.');
    console.log('[Prerender] The site will work normally as a client-side SPA.');
    process.exit(0);
  }
  
  const mod = await import(puppeteerPath.endsWith('.js') ? puppeteerPath : puppeteerPath + '/index.js');
  puppeteer = mod.default || mod;
} catch (err) {
  console.log('[Prerender] Could not load Puppeteer:', err.message);
  console.log('[Prerender] Skipping prerender. The site will work normally as a client-side SPA.');
  process.exit(0);
}

console.log('[Prerender] Starting production server on port', PORT);
const server = spawn('node', ['dist/index.js'], {
  cwd: projectRoot,
  env: { ...process.env, NODE_ENV: 'production', PORT: String(PORT) },
  stdio: 'pipe',
});

server.stderr.on('data', (d) => {
  const msg = d.toString();
  if (msg.includes('Error') || msg.includes('error')) {
    console.error('[Server]', msg.trim());
  }
});

// Poll until server is ready
try {
  await new Promise((resolve, reject) => {
    let attempts = 0;
    const poll = setInterval(async () => {
      attempts++;
      try {
        const res = await fetch(`http://localhost:${PORT}/`);
        if (res.ok) { clearInterval(poll); resolve(); }
      } catch {
        if (attempts > 30) { clearInterval(poll); reject(new Error('Server timeout')); }
      }
    }, 1000);
  });
} catch (err) {
  console.error('[Prerender] Server failed to start:', err.message);
  server.kill('SIGTERM');
  process.exit(0); // Don't fail the build
}

console.log('[Prerender] Server ready. Launching Puppeteer...');

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: chromiumPath,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--no-zygote'],
    headless: true,
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  await page.setRequestInterception(true);
  page.on('request', (req) => {
    req.resourceType() === 'media' ? req.abort() : req.continue();
  });

  console.log('[Prerender] Navigating to homepage...');
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0', timeout: 60000 });

  // Wait for React to render the main content
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return root && root.innerHTML.length > 5000 && root.innerHTML.includes('Instituto da Catarata');
    },
    { timeout: 30000 }
  );

  console.log('[Prerender] React rendered. Capturing HTML...');
  const html = await page.content();

  if (!html.includes('Instituto da Catarata')) {
    throw new Error('Captured HTML missing expected content');
  }

  writeFileSync(indexHtmlPath, html, 'utf-8');
  console.log(`[Prerender] SUCCESS: Saved ${Math.round(html.length / 1024)}KB to dist/public/index.html`);

} catch (err) {
  console.error('[Prerender] Prerender failed:', err.message);
  console.log('[Prerender] Skipping prerender. The site will work normally as a client-side SPA.');
  // Don't fail the build
} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
  console.log('[Prerender] Done.');
  process.exit(0); // Always exit cleanly
}
