/* ============================================================
   Layout Component — Drudi e Almeida
   Wraps all pages with Header, Footer, and WhatsApp FAB
   Performance: lazy loads non-critical UI components
   - Header: critical (above the fold, needed for LCP)
   - Footer: lazy (below the fold, not needed for LCP/FID)
   - UrgencyBar: lazy (deferred until after first paint)
   - WhatsAppButton, MobileCTABar, SocialProofToasts: deferred
   ============================================================ */
import { ReactNode, lazy, Suspense, useEffect, useState } from "react";
import Header from "./Header";
import SchemaOrg from "./SchemaOrg";

// Lazy load below-the-fold and non-critical components
const Footer = lazy(() => import("./Footer"));
const UrgencyBar = lazy(() => import("./UrgencyBar"));
const WhatsAppButton = lazy(() => import("./WhatsAppButton"));
const MobileCTABar = lazy(() => import("./MobileCTABar"));
const SocialProofToasts = lazy(() => import("./SocialProofToasts"));

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
      <SchemaOrg />
      {/* UrgencyBar: lazy loaded but shown immediately after Suspense resolves */}
      <Suspense fallback={null}>
        <UrgencyBar />
      </Suspense>
      <Header />
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
