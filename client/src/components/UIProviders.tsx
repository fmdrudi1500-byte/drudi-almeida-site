/* ============================================================
   UIProviders — Drudi e Almeida
   Lazy wrapper for non-critical UI providers (TooltipProvider, Toaster)
   These are deferred so vendor-radix and vendor-sonner don't block
   the critical rendering path of the Home page.
   ============================================================ */
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export default function UIProviders({ children }: Props) {
  return (
    <TooltipProvider>
      <Toaster />
      {children}
    </TooltipProvider>
  );
}
