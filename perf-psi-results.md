# PSI Mobile Results - 3 Mar 2026

Score: 41/100

## Metrics
- FCP: 4.4s (red)
- LCP: 30.1s (red critical!)
- TBT: 590ms (orange)
- CLS: 0.135 (orange)
- Speed Index: 6.4s (red)

## Insights (red triangles)
1. Render-blocking resources — save 980ms (Google Fonts CSS)
2. Cache lifecycle — save 20,992 KiB
3. Image delivery — save 17,138 KiB
4. Layout shift causes (CLS)
5. Forced reflow
6. Network dependency tree

## Diagnostics (red)
1. Minimize main thread work — 2.2s
2. Reduce unused JavaScript — save 134 KiB
3. Images without width/height
4. Reduce JavaScript — save 3 KiB
5. Large network payloads — 22,312 KiB total
6. Long tasks — 6 found

## Action Plan (Priority Order)
1. FIX LCP 30s: Hero image likely not loading properly or too large
2. FIX render-blocking: Make Google Fonts async (save 980ms on FCP)
3. FIX unused JS: Remove framer-motion from critical path, lazy load components
4. FIX images: Add width/height to all images, optimize formats
5. FIX cache: Add proper cache headers
6. FIX CLS: Explicit dimensions on images and containers
