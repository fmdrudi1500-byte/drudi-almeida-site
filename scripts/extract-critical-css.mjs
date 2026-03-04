#!/usr/bin/env node
/**
 * Extract critical CSS for above-the-fold content and modify the built HTML
 * to inline it and async-load the full CSS file.
 *
 * Strategy:
 * 1. Extract CSS rules that match above-the-fold selectors (SSG shell content)
 * 2. Inline those rules in <head> as <style>
 * 3. Convert the CSS <link> to async loading with preload + onload trick
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist', 'public');
const indexPath = path.join(distPath, 'index.html');

function extractCriticalCSS(cssContent) {
  const criticalRules = [];

  // Extract :root variables
  const rootMatches = cssContent.match(/:root\s*\{[^}]+\}/g);
  if (rootMatches) criticalRules.push(...rootMatches);

  // Extract @layer theme blocks
  const themeLayerMatches = cssContent.match(/@layer\s+theme\s*\{[^}]*(?:\{[^}]*\}[^}]*)*\}/gs);
  if (themeLayerMatches) criticalRules.push(...themeLayerMatches);

  // Extract @theme inline blocks
  const themeInlineMatches = cssContent.match(/@theme\s+inline\s*\{[^}]*\}/gs);
  if (themeInlineMatches) criticalRules.push(...themeInlineMatches);

  // Extract *, html, body base rules
  for (const sel of ['\\*', 'html', 'body']) {
    const regex = new RegExp(`(?:^|\\n)\\s*${sel}\\s*(?:,\\s*\\S+\\s*)*\\{[^}]+\\}`, 'g');
    const matches = cssContent.match(regex);
    if (matches) criticalRules.push(...matches);
  }

  // Extract @layer base
  const baseLayerMatches = cssContent.match(/@layer\s+base\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/gs);
  if (baseLayerMatches) criticalRules.push(...baseLayerMatches);

  // Critical utility classes used in above-the-fold content
  const criticalClasses = [
    'container', 'flex', 'grid', 'hidden', 'block', 'inline-flex',
    'items-center', 'justify-center', 'justify-between',
    'relative', 'absolute', 'fixed', 'sticky', 'inset-0',
    'overflow-hidden', 'min-h-\\[75vh\\]',
    'gap-2', 'gap-4', 'gap-8', 'p-4', 'px-4', 'px-7', 'py-3\\.5',
    'py-6', 'py-20', 'mb-6', 'mb-8', 'mt-3',
    'font-display', 'font-body', 'font-ui', 'font-bold', 'font-semibold',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl',
    'leading-\\[1\\.1\\]', 'leading-relaxed', 'tracking-wide',
    'italic', 'not-italic', 'uppercase',
    'text-navy', 'text-gold', 'text-cream', 'text-white',
    'text-foreground', 'text-muted-foreground',
    'bg-background', 'bg-navy', 'bg-gold', 'bg-cream',
    'bg-white', 'border-border',
    'glass', 'gold-line', 'section-padding',
    'rounded-md', 'rounded-lg', 'rounded-xl', 'rounded-full',
    'shadow-lg', 'shadow-xl',
    'md\\:text-3xl', 'md\\:text-4xl', 'md\\:text-5xl', 'lg\\:text-6xl',
    'md\\:grid-cols-4', 'md\\:block', 'md\\:flex',
    'z-10', 'z-50',
    'transition-colors', 'transition-all',
    'object-cover', 'object-center', 'object-contain',
    'w-full', 'h-full', 'w-10', 'h-10', 'w-16', 'h-16',
    'max-w-2xl', 'max-w-xl',
    'border', 'border-b',
    'bg-gradient-to-r', 'bg-gradient-to-t', 'bg-gradient-to-br',
    'from-navy', 'to-transparent',
  ];

  for (const cls of criticalClasses) {
    const escaped = cls.replace(/\./g, '\\.').replace(/\[/g, '\\[').replace(/\]/g, '\\]');
    const regex = new RegExp(`\\.${escaped}\\s*\\{[^}]+\\}`, 'g');
    const matches = cssContent.match(regex);
    if (matches) criticalRules.push(...matches);
  }

  // Deduplicate
  const seen = new Set();
  const unique = [];
  for (const rule of criticalRules) {
    const stripped = rule.trim();
    if (stripped && !seen.has(stripped)) {
      seen.add(stripped);
      unique.push(stripped);
    }
  }

  return unique.join('\n');
}

function minifyCSS(css) {
  // Remove comments
  css = css.replace(/\/\*[^*]*\*+(?:[^/*][^*]*\*+)*\//g, '');
  // Remove extra whitespace
  css = css.replace(/\s+/g, ' ');
  // Remove spaces around { } : ; ,
  css = css.replace(/\s*\{\s*/g, '{');
  css = css.replace(/\s*\}\s*/g, '}');
  css = css.replace(/\s*:\s*/g, ':');
  css = css.replace(/\s*;\s*/g, ';');
  return css.trim();
}

function main() {
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/public/index.html not found');
    process.exit(1);
  }

  // Find CSS file
  const assetsDir = path.join(distPath, 'assets');
  const cssFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.css'));
  if (cssFiles.length === 0) {
    console.error('❌ No CSS files found in dist/public/assets/');
    process.exit(1);
  }

  const cssPath = path.join(assetsDir, cssFiles[0]);
  console.log(`📄 Processing: ${indexPath}`);
  console.log(`🎨 CSS file: ${cssPath}`);

  let html = fs.readFileSync(indexPath, 'utf-8');
  const css = fs.readFileSync(cssPath, 'utf-8');

  // Step 1: Extract critical CSS
  const critical = extractCriticalCSS(css);
  console.log(`📏 Critical CSS: ${critical.length} bytes`);

  // Step 2: Make CSS async
  const cssLinkRegex = /<link\s+rel="stylesheet"\s+crossorigin\s+href="(\/assets\/index-[^"]+\.css)">/;
  const match = html.match(cssLinkRegex);
  if (match) {
    const cssHref = match[1];
    const originalTag = match[0];
    const asyncCSS = `<link rel="preload" href="${cssHref}" as="style" crossorigin onload="this.onload=null;this.rel='stylesheet'">\n    <noscript><link rel="stylesheet" href="${cssHref}" crossorigin></noscript>`;
    html = html.replace(originalTag, asyncCSS);
    console.log(`✅ Converted ${cssHref} to async loading`);
  } else {
    console.warn('⚠️  CSS link tag not found in expected format');
  }

  // Step 3: Inline critical CSS
  if (critical) {
    const minified = minifyCSS(critical);
    const styleTag = `<style>${minified}</style>`;
    html = html.replace(
      '<link rel="preload" href="/assets/',
      `${styleTag}\n    <link rel="preload" href="/assets/`
    );
    console.log(`✅ Inlined ${minified.length} bytes of critical CSS`);
  }

  // Write result
  fs.writeFileSync(indexPath, html, 'utf-8');
  console.log(`✅ Optimized index.html written (${html.length} bytes)`);
}

main();
