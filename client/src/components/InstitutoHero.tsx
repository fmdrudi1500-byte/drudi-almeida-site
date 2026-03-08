/* ============================================================
   InstitutoHero — Reusable hero section for institute pages
   Dark overlay on image with title, subtitle, logo, and breadcrumb
   CSS animations only — no framer-motion dependency
   ============================================================ */
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

const STARRY_NIGHT_URL = "/images/starry-night-hero-v3-JqwHFQEiozpvaSGrn5zcqj.webp";

interface Props {
  title: string;
  subtitle: string;
  imageUrl?: string;
  breadcrumb: string;
  logoUrl?: string;
}

export default function InstitutoHero({ title, subtitle, imageUrl, breadcrumb, logoUrl }: Props) {
  const bgImage = imageUrl ?? STARRY_NIGHT_URL;
  return (
    <section className="relative h-[50vh] min-h-[400px] max-h-[550px] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/60" />

      {/* Content */}
      <div className="relative h-full container flex flex-col justify-end pb-12">
        {/* Breadcrumb */}
        <nav
          className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-4"
          style={{ animation: "heroFadeUp 0.5s ease 0.2s both" }}
        >
          <Link href="/" className="hover:text-gold transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold">{breadcrumb}</span>
        </nav>

        <div className="flex items-center gap-5">
          {/* Instituto Logo */}
          {logoUrl && (
            <div
              className="shrink-0 hidden md:block"
              style={{ animation: "heroScaleIn 0.5s ease 0.25s both" }}
            >
              <img
                src={logoUrl}
                alt={`Logotipo ${title} — Drudi e Almeida Clínicas Oftalmológicas`}
                className="w-24 h-24 lg:w-28 lg:h-28 object-contain rounded-xl bg-white/10 backdrop-blur-sm p-2 border border-cream/10"
              />
            </div>
          )}

          <div>
            <h1
              className="font-display text-3xl md:text-5xl lg:text-6xl text-cream max-w-3xl leading-tight"
              style={{ animation: "heroFadeUp 0.6s ease 0.3s both" }}
            >
              {title}
            </h1>

            <p
              className="font-body text-base md:text-lg text-cream/80 max-w-2xl mt-4 leading-relaxed"
              style={{ animation: "heroFadeUp 0.6s ease 0.5s both" }}
            >
              {subtitle}
            </p>
          </div>
        </div>

        {/* Gold accent */}
        <div
          className="w-20 h-0.5 bg-gold mt-6 origin-left"
          style={{ animation: "heroScaleX 0.8s ease 0.7s both" }}
        />
      </div>
    </section>
  );
}
