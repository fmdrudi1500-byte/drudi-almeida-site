/* ============================================================
   TecnologiaCarousel — Drudi e Almeida
   Auto-scrolling horizontal carousel showcasing real equipment
   Pauses on hover/touch, resumes after interaction
   ============================================================ */
import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { ArrowRight, Zap, ChevronLeft, ChevronRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const equipamentos = [
  {
    name: "OCT com Angio-OCT",
    brand: "Maestro 2 — Topcon",
    highlight: "Automatizado — resultado em segundos",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ervHszJTapbyUNRh.png",
    category: "Diagnóstico" as const,
  },
  {
    name: "Pentacam AXL",
    brand: "Oculus",
    highlight: "Análise completa do segmento anterior",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/BjIDRRibGgbqaEgW.png",
    category: "Diagnóstico" as const,
  },
  {
    name: "Campo Visual",
    brand: "Humphrey 750i — Zeiss",
    highlight: "Padrão-ouro para glaucoma",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/uqfZPyapWiDmhgjZ.webp",
    category: "Diagnóstico" as const,
  },
  {
    name: "Laser Argônio Multipoint",
    brand: "Vitra 2 — Quantel Medical",
    highlight: "Multispot — tratamento mais rápido",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/LUSoVEgfmutwLJEX.png",
    category: "Tratamento" as const,
  },
  {
    name: "OPD-Scan III",
    brand: "Nidek",
    highlight: "5 exames em 1 único aparelho",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/tHthjLAVqdFduqHi.jpg",
    category: "Diagnóstico" as const,
  },
  {
    name: "Yag Laser",
    brand: "Optimis II — Quantel Medical",
    highlight: "Precisão com mínima energia",
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/uNpBHQmkJerdsODE.jpeg",
    category: "Cirúrgico" as const,
  },
];

const CARD_WIDTH = 300; // px (md)
const CARD_WIDTH_SM = 280; // px (mobile)
const GAP = 20; // px (gap-5 = 1.25rem = 20px)
const AUTO_SCROLL_INTERVAL = 3500; // ms between auto-scrolls

function getCategoryStyle(category: string) {
  if (category === "Diagnóstico") return "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300";
  if (category === "Tratamento") return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300";
  return "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300";
}

export default function TecnologiaCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Calculate which card is currently in view
  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isMd = window.innerWidth >= 768;
    const cardW = isMd ? CARD_WIDTH : CARD_WIDTH_SM;
    const step = cardW + GAP;
    const idx = Math.round(el.scrollLeft / step);
    setActiveIndex(Math.min(idx, equipamentos.length - 1));
  }, []);

  // Scroll to a specific card index
  const scrollToIndex = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const isMd = window.innerWidth >= 768;
    const cardW = isMd ? CARD_WIDTH : CARD_WIDTH_SM;
    const step = cardW + GAP;
    el.scrollTo({ left: step * index, behavior: "smooth" });
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      const isMd = window.innerWidth >= 768;
      const cardW = isMd ? CARD_WIDTH : CARD_WIDTH_SM;
      const step = cardW + GAP;
      const maxScroll = el.scrollWidth - el.clientWidth;
      const nextScroll = el.scrollLeft + step;

      if (nextScroll >= maxScroll + step / 2) {
        // Loop back to start
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Pause on user interaction, resume after 5s of inactivity
  const handleUserInteraction = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 5000);
  }, []);

  // Manual navigation arrows
  const scrollPrev = useCallback(() => {
    handleUserInteraction();
    const newIdx = Math.max(0, activeIndex - 1);
    scrollToIndex(newIdx);
  }, [activeIndex, scrollToIndex, handleUserInteraction]);

  const scrollNext = useCallback(() => {
    handleUserInteraction();
    const newIdx = Math.min(equipamentos.length - 1, activeIndex + 1);
    scrollToIndex(newIdx);
  }, [activeIndex, scrollToIndex, handleUserInteraction]);

  // Track scroll position
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => updateActiveIndex();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [updateActiveIndex]);

  return (
    <section className="section-padding bg-gradient-to-b from-background via-cream/30 to-background dark:via-navy/10">
      <div className="container">
        <AnimateOnScroll className="text-center mb-12">
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Infraestrutura
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-navy dark:text-cream mt-3 mb-4">
            Tecnologia de Ponta
          </h2>
          <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Contamos com <strong>14 equipamentos de última geração</strong> para garantir
            diagnósticos precisos e tratamentos seguros.
          </p>
          <div className="gold-line max-w-[80px] mx-auto mt-6" />
        </AnimateOnScroll>

        {/* Carousel container */}
        <div className="relative group/carousel">
          {/* Navigation arrows — visible on desktop */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-navy shadow-lg border border-border/60 items-center justify-center text-navy dark:text-cream hover:border-gold hover:text-gold transition-all opacity-0 group-hover/carousel:opacity-100"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-navy shadow-lg border border-border/60 items-center justify-center text-navy dark:text-cream hover:border-gold hover:text-gold transition-all opacity-0 group-hover/carousel:opacity-100"
            aria-label="Próximo"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleUserInteraction}
            className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {equipamentos.map((eq, i) => (
              <div
                key={eq.name}
                className="group snap-start shrink-0 w-[280px] md:w-[300px] bg-white dark:bg-navy/40 rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:border-gold/40 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-navy/60 dark:to-navy/40 flex items-center justify-center p-6 overflow-hidden">
                  <img
                    src={eq.image}
                    alt={eq.name}
                    className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 right-3">
                    <span className={`inline-block text-[10px] font-bold font-ui tracking-wider uppercase px-2.5 py-1 rounded-full ${getCategoryStyle(eq.category)}`}>
                      {eq.category}
                    </span>
                  </div>
                </div>
                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display text-lg text-navy dark:text-cream mb-0.5 group-hover:text-gold transition-colors">
                    {eq.name}
                  </h3>
                  <p className="font-ui text-xs text-muted-foreground mb-3">{eq.brand}</p>
                  <div className="flex items-center gap-2 bg-gold/8 border border-gold/15 rounded-lg px-3 py-2">
                    <Zap className="w-3.5 h-3.5 text-gold shrink-0" />
                    <span className="font-ui text-xs text-navy dark:text-cream/90 font-medium">{eq.highlight}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll hint gradients */}
          <div className="hidden md:block absolute top-0 right-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none dark:from-background" />
          <div className="hidden md:block absolute top-0 left-0 bottom-4 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none dark:from-background" />
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {equipamentos.map((_, i) => (
            <button
              key={i}
              onClick={() => { handleUserInteraction(); scrollToIndex(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-7 h-2.5 bg-gold"
                  : "w-2.5 h-2.5 bg-border hover:bg-gold/40"
              }`}
              aria-label={`Ir para equipamento ${i + 1}`}
            />
          ))}
        </div>

        {/* Stats + CTA */}
        <AnimateOnScroll className="mt-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-8 text-center">
              <div>
                <div className="font-display text-2xl text-navy dark:text-cream font-bold">14</div>
                <div className="font-ui text-[11px] text-muted-foreground tracking-wide">Equipamentos</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="font-display text-2xl text-navy dark:text-cream font-bold">6</div>
                <div className="font-ui text-[11px] text-muted-foreground tracking-wide">Fabricantes</div>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <div className="font-display text-2xl text-navy dark:text-cream font-bold">3</div>
                <div className="font-ui text-[11px] text-muted-foreground tracking-wide">Categorias</div>
              </div>
            </div>
            <Link
              href="/tecnologia"
              className="inline-flex items-center gap-2 bg-navy text-cream dark:bg-gold dark:text-navy font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy-light dark:hover:bg-gold-light transition-colors"
            >
              Ver Todos os Equipamentos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
