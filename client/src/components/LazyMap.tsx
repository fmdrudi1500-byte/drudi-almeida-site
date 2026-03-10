/* ============================================================
   LazyMap — Drudi e Almeida
   Exibe um placeholder estático até o usuário clicar.
   O iframe do Google Maps só é carregado após interação,
   eliminando o custo de rede/CPU no carregamento inicial da página.
   ============================================================ */
import { useState, useRef, useEffect } from "react";
import { MapPin, ExternalLink } from "lucide-react";

interface LazyMapProps {
  /** URL do embed do Google Maps (output=embed) */
  src: string;
  /** Título acessível do iframe */
  title: string;
  /** Altura do container (default: 420px) */
  height?: number | string;
  /** Classes CSS adicionais para o container externo */
  className?: string;
  /** Nome da unidade exibido no placeholder */
  unitName?: string;
  /** URL para abrir o mapa no Google Maps (nova aba) */
  mapsUrl?: string;
}

export default function LazyMap({
  src,
  title,
  height = 420,
  className = "",
  unitName = "Drudi e Almeida Oftalmologia",
  mapsUrl,
}: LazyMapProps) {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Quando o usuário clica no placeholder, carrega o iframe
  function handleActivate() {
    setLoaded(true);
  }

  // Também carrega automaticamente quando o elemento entra em viewport
  // (IntersectionObserver com threshold alto — só quando quase 100% visível)
  useEffect(() => {
    if (loaded) return;
    const el = containerRef.current;
    if (!el || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Pequeno delay para não bloquear o LCP
          setTimeout(() => setLoaded(true), 800);
          observer.disconnect();
        }
      },
      { threshold: 0.8 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loaded]);

  const heightStyle = typeof height === "number" ? `${height}px` : height;

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-border/60 shadow-sm ${className}`}
      style={{ height: heightStyle }}
    >
      {loaded ? (
        <iframe
          title={title}
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0, display: "block" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        /* Placeholder — imagem estática do mapa + botão de ativação */
        <button
          onClick={handleActivate}
          className="group w-full h-full flex flex-col items-center justify-center gap-4 cursor-pointer bg-gradient-to-br from-slate-100 to-slate-200 dark:from-navy/40 dark:to-navy/60 hover:from-slate-200 hover:to-slate-300 dark:hover:from-navy/50 dark:hover:to-navy/70 transition-colors"
          aria-label={`Carregar mapa de ${unitName}`}
        >
          {/* Decorative grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          {/* Pin icon */}
          <div className="relative z-10 w-14 h-14 rounded-full bg-navy/10 dark:bg-cream/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <MapPin className="w-7 h-7 text-navy dark:text-cream" />
          </div>
          {/* Text */}
          <div className="relative z-10 text-center px-4">
            <p className="font-ui text-sm font-semibold text-navy dark:text-cream mb-1">
              {unitName}
            </p>
            <p className="font-body text-xs text-muted-foreground">
              Clique para carregar o mapa interativo
            </p>
          </div>
          {/* CTA */}
          <div className="relative z-10 flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-navy text-cream dark:bg-gold dark:text-navy font-ui text-xs font-semibold px-4 py-2 rounded-md group-hover:bg-navy-light dark:group-hover:bg-gold-light transition-colors">
              <MapPin className="w-3.5 h-3.5" />
              Ver Mapa
            </span>
            {mapsUrl && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 border border-border text-muted-foreground font-ui text-xs font-medium px-4 py-2 rounded-md hover:border-gold hover:text-navy dark:hover:text-cream transition-colors bg-white/80 dark:bg-navy/40"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Abrir no Google Maps
              </a>
            )}
          </div>
        </button>
      )}
    </div>
  );
}
