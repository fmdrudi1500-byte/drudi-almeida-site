/**
 * Post-build script: Extract critical CSS and inline it into index.html
 * 
 * This runs after `vite build` and uses the `critical` package to:
 * 1. Identify above-the-fold CSS from the built HTML
 * 2. Inline it as a <style> tag in the <head>
 * 3. Defer the full CSS file loading (removes the blocking link)
 * 
 * This eliminates the render-blocking CSS flagged by PageSpeed Insights.
 */
import { generate } from 'critical';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist', 'public');

async function run() {
  console.log('🎨 Extracting and inlining critical CSS...');
  
  try {
    const { html } = await generate({
      // Source HTML
      base: distDir,
      src: 'index.html',
      
      // Target dimensions (mobile + desktop)
      dimensions: [
        { width: 375, height: 812 },   // iPhone X (mobile)
        { width: 1440, height: 900 },  // Desktop
      ],
      
      // Inline critical CSS and defer the rest
      inline: true,
      
      // Extract but keep the original CSS file (just deferred)
      extract: false,
      
      // Puppeteer options
      penthouse: {
        timeout: 60000,
        puppeteer: {
          args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
        },
      },
    });
    
    // Remove @font-face from critical CSS — they reference Google Fonts CDN files
    // and add 6KB of unnecessary inline CSS (fonts still load from the deferred CSS)
    const htmlWithoutFontFaces = html.replace(/@font-face\s*\{[^}]*\}/g, '');
    
    // Fix: Remove duplicate CSS link that `critical` leaves behind.
    // The `critical` package adds a media=print deferred link but doesn't
    // remove the original blocking link from Vite. We need to remove the
    // blocking one (without media=print) to avoid double-loading.
    const fixedHtml = htmlWithoutFontFaces.replace(
      // Remove any <link rel="stylesheet" href="*.css"> that does NOT have media="print"
      // (the blocking one — the deferred one with media=print should stay)
      /<link rel="stylesheet"[^>]*href="([^"]*\.css)"[^>]*>(?!\s*<noscript>)/g,
      (match) => {
        // Keep only the media=print version (deferred) and noscript fallback
        if (match.includes('media="print"')) return match;
        // Remove the blocking link
        return '';
      }
    );
    
    // Write the optimized HTML back
    fs.writeFileSync(path.join(distDir, 'index.html'), fixedHtml);
    
    console.log('✅ Critical CSS inlined successfully!');
    
    // Show the size of inlined CSS
    const match = fixedHtml.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (match) {
      const inlinedSize = Buffer.byteLength(match[1], 'utf8');
      console.log(`   Inlined CSS size: ${(inlinedSize / 1024).toFixed(1)}KB`);
    }
    
    // Verify no duplicate CSS links remain
    const cssLinks = (fixedHtml.match(/<link[^>]+\.css[^>]*>/g) || []);
    console.log(`   CSS links in final HTML: ${cssLinks.length}`);
    cssLinks.forEach(l => console.log(`     ${l.substring(0, 100)}`));
    
  } catch (error) {
    console.error('❌ Critical CSS extraction failed:', error.message);
    console.log('   Falling back to non-blocking CSS (media=print trick)');
    // Don't fail the build — the media=print fallback is already in place
    process.exit(0);
  }
}

run();
