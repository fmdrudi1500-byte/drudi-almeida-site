/* ============================================================
   InstitutoHero — Reusable hero section for institute pages
   Dark overlay on image with title, subtitle, logo, and breadcrumb
   ============================================================ */
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

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
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/60" />

      {/* Content */}
      <div className="relative h-full container flex flex-col justify-end pb-12">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-4"
        >
          <Link href="/" className="hover:text-gold transition-colors">Início</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-gold">{breadcrumb}</span>
        </motion.nav>

        <div className="flex items-center gap-5">
          {/* Instituto Logo */}
          {logoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="shrink-0 hidden md:block"
            >
              <img
                src={logoUrl}
                alt={title}
                className="w-24 h-24 lg:w-28 lg:h-28 object-contain rounded-xl bg-white/10 backdrop-blur-sm p-2 border border-cream/10"
              />
            </motion.div>
          )}

          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl text-cream max-w-3xl leading-tight"
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="font-body text-base md:text-lg text-cream/80 max-w-2xl mt-4 leading-relaxed"
            >
              {subtitle}
            </motion.p>
          </div>
        </div>

        {/* Gold accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="w-20 h-0.5 bg-gold mt-6 origin-left"
        />
      </div>
    </section>
  );
}
