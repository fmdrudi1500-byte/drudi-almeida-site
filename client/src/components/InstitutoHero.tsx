/* ============================================================
   InstitutoHero — CSS-only animations (no framer-motion)
   ============================================================ */
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
  imageUrl: string;
  breadcrumb: string;
  logoUrl?: string;
}

export default function InstitutoHero({ title, subtitle, imageUrl, breadcrumb, logoUrl }: Props) {
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[550px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/60" />

      <div className="relative h-full container flex flex-col justify-end pb-12">
        <nav
          className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-4 animate-fade-in"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <Link href="/" className="hover:text-gold transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold">{breadcrumb}</span>
        </nav>

        <div className="flex items-center gap-5">
          {logoUrl && (
            <div
              className="shrink-0 hidden md:block animate-fade-in"
              style={{ animationDelay: "0.25s", animationFillMode: "both" }}
            >
              <img
                src={logoUrl}
                alt={`Logotipo ${title} — Drudi e Almeida Clínicas Oftalmológicas`}
                className="w-24 h-24 lg:w-28 lg:h-28 object-contain rounded-xl bg-white/10 backdrop-blur-sm p-2 border border-cream/10"
                width={112}
                height={112}
                loading="eager"
              />
            </div>
          )}

          <div>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl text-cream max-w-3xl leading-tight animate-slide-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}
            >
              {title}
            </h1>

            <p
              className="font-body text-base md:text-lg text-cream/80 max-w-2xl mt-4 leading-relaxed animate-slide-up"
              style={{ animationDelay: "0.5s", animationFillMode: "both" }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        <div
          className="w-20 h-0.5 bg-gold mt-6 origin-left animate-scale-x"
          style={{ animationDelay: "0.7s", animationFillMode: "both" }}
        />
      </div>
    </section>
  );
}
