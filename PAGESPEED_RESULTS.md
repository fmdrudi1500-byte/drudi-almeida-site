# PageSpeed Insights — Resultados (22 Mar 2026)

## Scores Mobile (institutodrudiealmeida.com.br)

| Categoria | Score |
|-----------|-------|
| Performance | 49 |
| Accessibility | 90 |
| Best Practices | 96 |
| SEO | 92 |

## Core Web Vitals (Mobile)

| Métrica | Valor | Status |
|---------|-------|--------|
| First Contentful Paint (FCP) | 4.4 s | Ruim (>3s) |
| Largest Contentful Paint (LCP) | 6.1 s | Ruim (>4s) |
| Total Blocking Time (TBT) | 450 ms | Ruim (>300ms) |
| Cumulative Layout Shift (CLS) | 0.135 | Precisa melhorar (>0.1) |
| Speed Index | 5.5 s | Ruim |

## Principais Problemas Identificados

### 1. CSS Bloqueante (290ms de economia)
- `/assets/index-AMiebTjC.css` (26.8 KiB) bloqueando render
- Solução: Carregar CSS de forma assíncrona (já implementado parcialmente)

### 2. Imagem Hero Muito Grande (68 KiB de economia)
- `/images/hero-monet-960w-q55_opt.webp` — 94.8 KiB, pode ser reduzida para ~31 KiB
- Imagem Amil: 188x192px servida em 39x40px — desperdício

### 3. LCP Breakdown (6.1s total)
- Resource load delay: 450ms
- Resource load duration: 780ms
- Element render delay: 640ms

### 4. Third-party Scripts (736ms de bloqueio)
- manuscdn.com: 182 KiB, 536ms (editor visual da plataforma)
- Google Tag Manager: 175 KiB, 202ms
- Plausible Analytics: 320ms de latência (sem preconnect)

### 5. CLS 0.135 (acima do limite 0.1)
- Layout shifts durante carregamento de fontes e imagens

### 6. JavaScript Execution Time: 1.6s
- ConveniosCarousel: execução pesada
- vendor-re.js: execução pesada

## Oportunidades de Melhoria Implementáveis

1. **Comprimir mais o hero-monet** (atual 94.8KB → meta 30KB)
2. **Preconnect para plausible.io** (economia 320ms)
3. **Corrigir imagem Amil** (188x192 → 39x40px)
4. **Reduzir DOM** (1.410 elementos — ideal <800)
5. **Fontes inline** (woff2 no critical path)
