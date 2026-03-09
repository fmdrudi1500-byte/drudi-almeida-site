import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cream via-background to-cream/60">
      <Helmet>
        <title>Página não encontrada | Drudi e Almeida Oftalmologia</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-full max-w-lg mx-4 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gold/10 rounded-full animate-pulse" />
            <AlertCircle className="relative h-16 w-16 text-gold" />
          </div>
        </div>

        <p className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3">
          Erro 404
        </p>

        <h1 className="font-display text-4xl md:text-5xl text-navy mb-4 leading-tight">
          Página não encontrada
        </h1>

        <p className="font-body text-base text-muted-foreground leading-relaxed mb-8 max-w-sm mx-auto">
          A página que você está procurando não existe ou foi movida. 
          Volte ao início para continuar navegando.
        </p>

        <Button
          onClick={() => setLocation("/")}
          className="bg-navy text-cream hover:bg-navy/90 font-ui font-semibold px-8 py-3 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Home className="w-4 h-4 mr-2" />
          Voltar ao Início
        </Button>
      </div>
    </div>
  );
}
