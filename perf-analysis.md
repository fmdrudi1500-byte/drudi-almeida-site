# Performance Analysis - PSI Mobile Score 41

## Current Bundle Sizes (Critical Path)
- index.js: 509KB (144KB gzip) — MAIN BUNDLE, loaded on every page
- vendor-framer: 131KB (44KB gzip) — loaded on every page via Header/AnimateOnScroll
- vendor-react: 36KB (12KB gzip)
- vendor-radix: 92KB (31KB gzip)
- vendor-trpc: 100KB (28KB gzip)
- vendor-icons: 39KB (7KB gzip)
- vendor-sonner: 33KB (9KB gzip)
- vendor-helmet: 8KB

## Root Causes
1. **index.js at 509KB** — contains Layout, Header, Footer, WhatsApp, MobileCTABar, SchemaOrg, UrgencyBar, SocialProofToasts, AnimateOnScroll, ConveniosCarousel, all imported eagerly
2. **Framer Motion in critical path** — Header uses motion, AnimateOnScroll uses motion, ScrollToTopButton uses motion — all in Layout
3. **Google Fonts blocking** — 3 families with many weights loaded via render-blocking <link>
4. **All Radix UI in one chunk** — even unused components loaded
5. **SocialProofToasts, UrgencyBar** — non-essential components loaded eagerly

## Action Plan
1. Replace framer-motion in Header with CSS animations (scroll progress bar, mega-menu)
2. Replace AnimateOnScroll with CSS IntersectionObserver (no framer dependency)
3. Replace ScrollToTopButton framer with CSS transitions
4. Lazy load SocialProofToasts, WhatsAppButton, UrgencyBar (not needed at FCP)
5. Load Google Fonts async (media="print" trick or font-display: swap with preload)
6. Split index.js: move heavy components out of Layout
7. Reduce Radix chunk: only include actually used components
