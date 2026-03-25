/**
 * Post-build script: Prerender homepage HTML using Puppeteer
 *
 * Starts the production server, visits / with Puppeteer, waits for React to
 * finish rendering, then saves the full HTML to dist/public/index.html.
 * This eliminates the blank screen on first load and dramatically improves LCP.
 */

import puppeteer from '/home/ubuntu/drudi-almeida-site/node_modules/.pnpm/puppeteer@2.1.1/node_modules/puppeteer/index.js';
import { spawn } from 'child_process';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');
const distPublic = resolve(projectRoot, 'dist', 'public');
const indexHtmlPath = resolve(distPublic, 'index.html');

const PORT = 4173;

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

console.log('[Prerender] Server ready. Launching Puppeteer...');

let browser;
try {
  browser = await puppeteer.launch({
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium-browser',
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

} finally {
  if (browser) await browser.close();
  server.kill('SIGTERM');
  console.log('[Prerender] Done.');
}
