/* ============================================================
   Layout Component — Drudi e Almeida
   Wraps all pages with Header, Footer, and WhatsApp FAB
   ============================================================ */
import { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import MobileCTABar from "./MobileCTABar";
import SchemaOrg from "./SchemaOrg";

// Lazy-load non-critical UI components that appear after initial render
// This removes them from the critical bundle (index.js), reducing parse/compile time
const UrgencyBar = lazy(() => import("./UrgencyBar"));
const SocialProofToasts = lazy(() => import("./SocialProofToasts"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaOrg />
      {/* UrgencyBar is non-critical — lazy loaded to reduce initial bundle */}
      <Suspense fallback={null}>
        <UrgencyBar />
      </Suspense>
      <Header />
      {/* min-h-screen reserva espaço antes da hidratação do React, eliminando CLS */}
      <main className="flex-1 min-h-screen">{children}</main>
      <Footer />
      {/* FAB circular — hidden on mobile (replaced by sticky bar) */}
      <div className="hidden md:block">
        <WhatsAppButton />
      </div>
      {/* Sticky CTA bar — mobile only */}
      <MobileCTABar />
      {/* Social proof toasts — lazy loaded, appears after 3s delay anyway */}
      <Suspense fallback={null}>
        <SocialProofToasts />
      </Suspense>
    </div>
  );
}
