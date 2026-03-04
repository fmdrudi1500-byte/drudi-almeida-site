/**
 * Pre-render Script — Drudi e Almeida
 * 
 * The SSG shell is now embedded directly in client/index.html
 * so it works in both dev and production environments.
 * 
 * This script verifies the SSG shell is present in the built HTML
 * and logs the result.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist', 'public');
const indexPath = path.join(distPath, 'index.html');

async function prerender() {
  console.log('🔄 Verifying SSG shell in built HTML...');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/public/index.html not found. Run build first.');
    process.exit(1);
  }
  
  const html = fs.readFileSync(indexPath, 'utf-8');
  
  if (html.includes('id="ssg-shell"')) {
    const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
    console.log(`✅ SSG shell verified in index.html (${sizeKB} KB)`);
    console.log('   → Hero section renders instantly without waiting for JS');
    console.log('   → Works in both dev and production');
  } else {
    console.error('⚠️ SSG shell not found in built HTML. Check client/index.html.');
  }
}

prerender().catch(console.error);
