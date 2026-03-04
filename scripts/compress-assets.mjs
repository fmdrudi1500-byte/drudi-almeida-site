/**
 * Pre-compress static assets with Brotli and Gzip
 * 
 * Runs after `vite build` to create .br and .gz versions of all
 * compressible static assets. express-static-gzip will serve these
 * pre-compressed files instead of compressing on-the-fly.
 * 
 * Brotli at quality 11 (max) gives ~15-20% better compression than gzip
 * but is too slow for on-the-fly compression. Pre-compressing at build
 * time gives us the best of both worlds.
 */

import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist', 'public');

// File extensions to compress
const COMPRESSIBLE_EXTENSIONS = new Set([
  '.js', '.css', '.html', '.json', '.xml', '.svg', '.txt', '.map',
  '.woff', '.woff2', '.ttf', '.eot',
]);

// Minimum file size to compress (bytes)
const MIN_SIZE = 1024;

function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (entry.isFile()) {
      files.push(fullPath);
    }
  }
  return files;
}

async function compressFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!COMPRESSIBLE_EXTENSIONS.has(ext)) return null;
  
  const stat = fs.statSync(filePath);
  if (stat.size < MIN_SIZE) return null;
  
  const content = fs.readFileSync(filePath);
  const results = { file: path.relative(distPath, filePath), original: stat.size };
  
  // Brotli compression (quality 11 = max, slow but best ratio)
  try {
    const br = zlib.brotliCompressSync(content, {
      params: {
        [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
        [zlib.constants.BROTLI_PARAM_SIZE_HINT]: content.length,
      },
    });
    if (br.length < content.length) {
      fs.writeFileSync(filePath + '.br', br);
      results.br = br.length;
    }
  } catch (e) {
    console.warn(`  Brotli failed for ${filePath}: ${e.message}`);
  }
  
  // Gzip compression (level 9 = max)
  try {
    const gz = zlib.gzipSync(content, { level: 9 });
    if (gz.length < content.length) {
      fs.writeFileSync(filePath + '.gz', gz);
      results.gz = gz.length;
    }
  } catch (e) {
    console.warn(`  Gzip failed for ${filePath}: ${e.message}`);
  }
  
  return results;
}

async function main() {
  console.log('🗜️  Pre-compressing static assets...');
  
  const files = getAllFiles(distPath);
  let totalOriginal = 0;
  let totalBr = 0;
  let totalGz = 0;
  let count = 0;
  
  for (const file of files) {
    const result = await compressFile(file);
    if (result) {
      count++;
      totalOriginal += result.original;
      if (result.br) totalBr += result.br;
      if (result.gz) totalGz += result.gz;
    }
  }
  
  const pctBr = totalOriginal > 0 ? ((1 - totalBr / totalOriginal) * 100).toFixed(1) : 0;
  const pctGz = totalOriginal > 0 ? ((1 - totalGz / totalOriginal) * 100).toFixed(1) : 0;
  
  console.log(`✅ Compressed ${count} files:`);
  console.log(`   Original: ${(totalOriginal / 1024).toFixed(1)} KB`);
  console.log(`   Brotli:   ${(totalBr / 1024).toFixed(1)} KB (${pctBr}% smaller)`);
  console.log(`   Gzip:     ${(totalGz / 1024).toFixed(1)} KB (${pctGz}% smaller)`);
}

main().catch(console.error);
