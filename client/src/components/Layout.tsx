/* ============================================================
   Layout Component — Drudi e Almeida
   Wraps all pages with Header, Footer, and WhatsApp FAB
   ============================================================ */
import { ReactNode, lazy, Suspense } from "react";
import Header from "./Header";
import WhatsAppButton from "./WhatsAppButton";
import MobileCTABar from "./MobileCTABar";
import SchemaOrg from "./SchemaOrg";
import UrgencyBar from "./UrgencyBar";

// Lazy load heavy below-the-fold components to reduce TBT
const Footer = lazy(() => import("./Footer"));
// SocialProofToasts only appears after 5s — no need to be in critical bundle
const SocialProofToasts = lazy(() => import("./SocialProofToasts"));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaOrg />
      <UrgencyBar />
      <Header />
      {/* min-h-screen reserva espaço antes da hidratação do React, eliminando CLS */}
      <main className="flex-1 min-h-screen">{children}</main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      {/* FAB circular — hidden on mobile (replaced by sticky bar) */}
      <div className="hidden md:block">
        <WhatsAppButton />
      </div>
      {/* Sticky CTA bar — mobile only */}
      <MobileCTABar />
      {/* Social proof toasts — bottom left, lazy loaded */}
      <Suspense fallback={null}>
        <SocialProofToasts />
      </Suspense>
    </div>
  );
}
