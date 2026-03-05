/**
 * Post-build script: Extract critical CSS and inline it into index.html
 * 
 * This runs after `vite build` and uses the `critical` package to:
 * 1. Identify above-the-fold CSS from the built HTML
 * 2. Inline it as a <style> tag in the <head>
 * 3. Defer the full CSS file loading
 * 
 * This eliminates the render-blocking CSS flagged by PageSpeed Insights.
 */
import { generate } from 'critical';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
    
    // Write the optimized HTML back
    const fs = await import('node:fs');
    fs.writeFileSync(path.join(distDir, 'index.html'), html);
    
    console.log('✅ Critical CSS inlined successfully!');
    
    // Show the size of inlined CSS
    const match = html.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (match) {
      const inlinedSize = Buffer.byteLength(match[1], 'utf8');
      console.log(`   Inlined CSS size: ${(inlinedSize / 1024).toFixed(1)}KB`);
    }
  } catch (error) {
    console.error('❌ Critical CSS extraction failed:', error.message);
    console.log('   Falling back to non-blocking CSS (media=print trick)');
    // Don't fail the build — the media=print fallback is already in place
    process.exit(0);
  }
}

run();
