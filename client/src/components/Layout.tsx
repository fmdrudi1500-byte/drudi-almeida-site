/* ============================================================
   Layout Component — Drudi e Almeida
   Wraps all pages with Header, Footer, and WhatsApp FAB
   Performance: lazy loads non-critical UI components
   - Header: critical (above the fold) but lazy-loaded with skeleton
   - SchemaOrg: lazy (JSON-LD, not visual, can load after paint)
   - Footer: lazy (below the fold, not needed for LCP/FID)
   - UrgencyBar: lazy (deferred until after first paint)
   - WhatsAppButton, MobileCTABar, SocialProofToasts: deferred
   ============================================================ */
import { ReactNode, lazy, Suspense, useEffect, useState } from "react";

// Lazy load ALL non-critical components including Header and SchemaOrg
const Header = lazy(() => import("./Header"));
const SchemaOrg = lazy(() => import("./SchemaOrg"));
const Footer = lazy(() => import("./Footer"));
const UrgencyBar = lazy(() => import("./UrgencyBar"));
const WhatsAppButton = lazy(() => import("./WhatsAppButton"));
const MobileCTABar = lazy(() => import("./MobileCTABar"));
const SocialProofToasts = lazy(() => import("./SocialProofToasts"));

/* Lightweight header skeleton — matches the visual dimensions of the real
   Header so there is no CLS when the lazy chunk resolves. Renders pure
   CSS, zero JS, zero external imports. */
function HeaderSkeleton() {
  return (
    <>
      {/* Top info bar skeleton — hidden on mobile, matching real Header */}
      <div className="bg-navy hidden md:block" style={{ height: "36px" }} />
      {/* Main nav skeleton — sticky to match real Header */}
      <header
        className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm"
        style={{ height: "80px" }}
      >
        <div className="container flex items-center justify-between h-full">
          {/* Logo placeholder */}
          <div className="w-[120px] h-[48px] bg-muted/30 rounded animate-pulse" />
          {/* Nav links placeholder (hidden on mobile) */}
          <div className="hidden lg:flex gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="w-16 h-4 bg-muted/20 rounded animate-pulse"
              />
            ))}
          </div>
          {/* CTA placeholder */}
          <div className="w-[140px] h-[40px] bg-gold/20 rounded animate-pulse hidden md:block" />
        </div>
      </header>
    </>
  );
}

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  // Defer non-critical components until after first paint
  const [showDeferred, setShowDeferred] = useState(false);

  useEffect(() => {
    // Use requestIdleCallback or setTimeout to defer loading
    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => setShowDeferred(true), { timeout: 3000 });
    } else {
      const timer = setTimeout(() => setShowDeferred(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* SchemaOrg: lazy loaded — JSON-LD only, no visual impact */}
      <Suspense fallback={null}>
        <SchemaOrg />
      </Suspense>
      {/* UrgencyBar: lazy loaded but shown immediately after Suspense resolves */}
      <Suspense fallback={null}>
        <UrgencyBar />
      </Suspense>
      {/* Header: lazy loaded with skeleton to prevent CLS */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header />
      </Suspense>
      <main className="flex-1">{children}</main>
      {/* Footer: lazy loaded — below the fold, not critical for LCP/TBT */}
      <Suspense fallback={<div className="h-64 bg-navy" />}>
        <Footer />
      </Suspense>
      {showDeferred && (
        <Suspense fallback={null}>
          {/* FAB circular — hidden on mobile (replaced by sticky bar) */}
          <div className="hidden md:block">
            <WhatsAppButton />
          </div>
          {/* Sticky CTA bar — mobile only */}
          <MobileCTABar />
          {/* Social proof toasts — bottom left */}
          <SocialProofToasts />
        </Suspense>
      )}
    </div>
  );
}
