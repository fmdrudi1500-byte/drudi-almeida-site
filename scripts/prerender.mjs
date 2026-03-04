/**
 * Pre-render Script — Drudi e Almeida
 * 
 * Injects critical above-the-fold HTML into the built index.html
 * to eliminate the blank screen while JavaScript loads.
 * 
 * This is a lightweight SSG approach that doesn't require a full
 * React SSR setup — we inject static HTML for the hero section
 * that gets hydrated when React boots.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '..', 'dist', 'public');
const indexPath = path.join(distPath, 'index.html');

// Critical above-the-fold HTML for the Home page
// This renders immediately without waiting for JS
const criticalHTML = `
<!-- SSG: Pre-rendered critical content for instant FCP -->
<div id="ssg-shell" style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
  <!-- Urgency Bar -->
  <div style="background:linear-gradient(90deg,#1a2744,#2c3e50);color:#fff;text-align:center;padding:10px 16px;font-size:13px;letter-spacing:0.02em">
    <span style="margin-right:6px">📋</span>
    Atendemos Bradesco, Amil, Unimed, Prevent Senior e mais — consulte sua cobertura.
    <a href="/agendar" style="color:#c9a961;margin-left:8px;font-weight:600;text-decoration:none">Agendar →</a>
  </div>
  
  <!-- Header placeholder -->
  <header style="background:rgba(255,255,255,0.97);border-bottom:1px solid rgba(0,0,0,0.06);padding:12px 0;position:sticky;top:0;z-index:50">
    <div style="max-width:1280px;margin:0 auto;padding:0 16px;display:flex;align-items:center;justify-content:space-between">
      <a href="/" style="display:flex;align-items:center;gap:8px;text-decoration:none">
        <img src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-opt_76d1d9d6.webp" alt="Drudi e Almeida" width="40" height="40" style="border-radius:8px" />
        <span style="font-weight:700;color:#1a2744;font-size:15px">DRUDI E ALMEIDA</span>
      </a>
      <a href="https://wa.me/5511916544653" style="background:#c9a961;color:#1a2744;padding:8px 20px;border-radius:6px;font-weight:700;font-size:13px;text-decoration:none;letter-spacing:0.02em">
        Agendar →
      </a>
    </div>
  </header>
  
  <!-- Hero Section -->
  <section style="position:relative;min-height:75vh;display:flex;align-items:center;overflow:hidden;background:#1a2744">
    <img 
      src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-monet-bridge-optimized_6ab2441a.webp"
      srcset="https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-mobile-v2-480_d5a97ad9.webp 480w, https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-mobile-v2-640_47731de7.webp 640w, https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-monet-tablet_7b629481.webp 1280w, https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-monet-bridge-optimized_6ab2441a.webp 1920w"
      sizes="(max-width: 640px) 480px, (max-width: 1280px) 1280px, 1920px"
      alt="Drudi e Almeida Oftalmologia" 
      width="1920" height="1080"
      fetchpriority="high"
      style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center"
    />
    <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(26,39,68,0.9),rgba(26,39,68,0.7),transparent)"></div>
    <div style="position:relative;max-width:1280px;margin:0 auto;padding:80px 16px">
      <div style="max-width:640px">
        <div style="display:inline-flex;align-items:center;gap:8px;background:rgba(201,169,97,0.15);border:1px solid rgba(201,169,97,0.3);border-radius:999px;padding:6px 16px;margin-bottom:24px">
          <span style="font-size:12px;font-weight:600;color:#c9a961;letter-spacing:0.1em">REFERÊNCIA EM OFTALMOLOGIA</span>
        </div>
        <h1 style="font-size:clamp(2rem,5vw,3.5rem);color:#faf8f5;line-height:1.1;margin:0 0 24px">
          Sua visão merece <em style="color:#c9a961;font-style:italic">excelência</em> e <em style="color:#c9a961;font-style:italic">cuidado</em>
        </h1>
        <p style="font-size:18px;color:rgba(250,248,245,0.8);line-height:1.6;margin:0 0 32px;max-width:560px">
          Na Drudi e Almeida, unimos tecnologia de ponta, especialistas renomados e 5 institutos dedicados para oferecer o melhor cuidado oftalmológico do Brasil.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:16px">
          <a href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta." style="display:inline-flex;align-items:center;gap:8px;background:#c9a961;color:#1a2744;font-weight:700;font-size:14px;padding:14px 28px;border-radius:6px;text-decoration:none">
            Agendar pelo WhatsApp →
          </a>
          <a href="tel:+551150268521" style="display:inline-flex;align-items:center;gap:8px;border:1px solid rgba(250,248,245,0.3);color:#faf8f5;font-weight:600;font-size:14px;padding:14px 28px;border-radius:6px;text-decoration:none">
            Ligar Agora
          </a>
        </div>
      </div>
    </div>
  </section>
  
  <!-- Stats Bar -->
  <section style="position:relative;margin-top:-48px;z-index:10;max-width:1280px;margin-left:auto;margin-right:auto;padding:0 16px">
    <div style="background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-radius:12px;box-shadow:0 4px 24px rgba(0,0,0,0.08);border:1px solid rgba(0,0,0,0.06);display:grid;grid-template-columns:repeat(4,1fr)">
      <div style="padding:24px;text-align:center;border-right:1px solid rgba(0,0,0,0.06)">
        <div style="font-size:clamp(1.5rem,3vw,2rem);color:#1a2744;font-weight:700">10+</div>
        <div style="font-size:12px;color:#666;margin-top:4px;letter-spacing:0.05em">Anos de Experiência</div>
      </div>
      <div style="padding:24px;text-align:center;border-right:1px solid rgba(0,0,0,0.06)">
        <div style="font-size:clamp(1.5rem,3vw,2rem);color:#1a2744;font-weight:700">50.000+</div>
        <div style="font-size:12px;color:#666;margin-top:4px;letter-spacing:0.05em">Pacientes Atendidos</div>
      </div>
      <div style="padding:24px;text-align:center;border-right:1px solid rgba(0,0,0,0.06)">
        <div style="font-size:clamp(1.5rem,3vw,2rem);color:#1a2744;font-weight:700">5</div>
        <div style="font-size:12px;color:#666;margin-top:4px;letter-spacing:0.05em">Institutos Especializados</div>
      </div>
      <div style="padding:24px;text-align:center">
        <div style="font-size:clamp(1.5rem,3vw,2rem);color:#1a2744;font-weight:700">100%</div>
        <div style="font-size:12px;color:#666;margin-top:4px;letter-spacing:0.05em">Compromisso com Você</div>
      </div>
    </div>
  </section>
</div>
<style>
  #ssg-shell { animation: ssgFadeIn 0.3s ease-out; }
  @keyframes ssgFadeIn { from { opacity: 0; } to { opacity: 1; } }
  @media (max-width: 768px) {
    #ssg-shell section:last-of-type > div { grid-template-columns: repeat(2, 1fr) !important; }
  }
</style>
`;

// Script to remove SSG shell once React hydrates
const hydrationScript = `
<script>
  // Remove SSG shell once React renders
  (function() {
    var observer = new MutationObserver(function(mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes.length > 0) {
          var shell = document.getElementById('ssg-shell');
          if (shell && document.querySelector('[data-reactroot], [data-react-root]') || 
              (shell && shell.nextElementSibling && shell.nextElementSibling.children.length > 0)) {
            shell.style.display = 'none';
            setTimeout(function() { shell.remove(); }, 100);
            observer.disconnect();
            return;
          }
        }
      }
    });
    var root = document.getElementById('root');
    if (root) {
      observer.observe(root, { childList: true, subtree: true });
      // Fallback: remove after 5 seconds regardless
      setTimeout(function() {
        var shell = document.getElementById('ssg-shell');
        if (shell) shell.remove();
        observer.disconnect();
      }, 5000);
    }
  })();
</script>
`;

async function prerender() {
  console.log('🔄 Pre-rendering critical HTML...');
  
  if (!fs.existsSync(indexPath)) {
    console.error('❌ dist/public/index.html not found. Run build first.');
    process.exit(1);
  }
  
  let html = fs.readFileSync(indexPath, 'utf-8');
  
  // Inject critical HTML into the root div
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${criticalHTML}</div>${hydrationScript}`
  );
  
  fs.writeFileSync(indexPath, html, 'utf-8');
  
  const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`✅ Pre-rendered index.html (${sizeKB} KB)`);
  console.log('   → Hero section rendered as static HTML');
  console.log('   → Will be replaced by React on hydration');
}

prerender().catch(console.error);
