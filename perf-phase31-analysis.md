# Performance Phase 31 Analysis

## Current Metrics (Mobile)
- FCP: 4.2s (red)
- LCP: 8.7s (red) — improved from 30.1s
- TBT: 480ms (orange)
- CLS: 0.135 (orange)
- Speed Index: 6.3s (red)

## Desktop Score: 89

## Key Issues from PSI
1. **Reduce unused JavaScript** — 147-148 KiB savings
2. **Reduce JavaScript** — 3 KiB savings
3. **Images without width/height** — causing CLS
4. **Large network payloads** — 5,639 KiB total
5. **Long main-thread tasks** — 4 tasks found
6. **Cache lifecycle** — 4,432 KiB savings
7. **Image delivery** — 4,341 KiB savings
8. **Layout shift causes** — CLS 0.135
9. **Forced reflow** — red
10. **Network dependency tree** — red
11. **Render-blocking resources** — now yellow (was red)

## Actions Completed
- [x] Fixed manualChunks: react/jsx-runtime now in vendor-react (not vendor-framer)
- [x] Bundle main reduced from 262KB to 55KB
- [x] Lazy loaded Toaster, HelmetProvider, TooltipProvider
- [x] Lazy loaded HomeFAQ, TecnologiaCarousel, ConveniosCarousel
- [x] Added width/height to Footer logo and ConveniosCarousel images

## Remaining Actions
- [ ] Inline critical CSS in prerender for instant styled FCP
- [ ] Add fetchpriority="high" to hero image in React component
- [ ] Reduce CLS: ensure all dynamic components have reserved space
- [ ] Consider removing framer-motion entirely from pages that don't need complex animations
- [ ] Optimize the Home chunk further (currently 86KB)
