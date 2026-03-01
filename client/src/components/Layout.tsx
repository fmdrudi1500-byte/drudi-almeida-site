/* ============================================================
   Layout Component — Drudi e Almeida
   Wraps all pages with Header, Footer, and WhatsApp FAB
   ============================================================ */
import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import MobileCTABar from "./MobileCTABar";
import SchemaOrg from "./SchemaOrg";
import UrgencyBar from "./UrgencyBar";
import SocialProofToasts from "./SocialProofToasts";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <SchemaOrg />
      <UrgencyBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      {/* FAB circular — hidden on mobile (replaced by sticky bar) */}
      <div className="hidden md:block">
        <WhatsAppButton />
      </div>
      {/* Sticky CTA bar — mobile only */}
      <MobileCTABar />
      {/* Social proof toasts — bottom left */}
      <SocialProofToasts />
    </div>
  );
}
