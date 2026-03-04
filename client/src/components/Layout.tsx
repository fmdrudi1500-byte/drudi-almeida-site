/* ============================================================
   Layout Component — Drudi e Almeida
   Wraps all pages with Header, Footer, and WhatsApp FAB
   Performance: lazy loads non-critical UI components
   ============================================================ */
import { ReactNode, lazy, Suspense, useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SchemaOrg from "./SchemaOrg";
import UrgencyBar from "./UrgencyBar";

// Lazy load non-critical components (they appear after page is interactive)
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
      <UrgencyBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
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
