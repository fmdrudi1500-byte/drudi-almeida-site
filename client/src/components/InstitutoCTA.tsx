/* ============================================================
   InstitutoCTA — Reusable CTA section for institute pages
   ============================================================ */
import { ArrowRight } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

interface Props {
  title?: string;
  text?: string;
  backgroundImage?: string;
}

export default function InstitutoCTA({ title = "Agende Sua Consulta", text, backgroundImage }: Props) {
  return (
    <section
      className="relative section-padding overflow-hidden"
      style={backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}
    >
      <div className={`absolute inset-0 ${backgroundImage ? "bg-navy/85" : "bg-navy"}`} />
      <div className="relative container text-center z-10">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl text-cream mb-4">{title}</h2>
          <p className="font-body text-base text-cream/70 max-w-lg mx-auto mb-8 leading-relaxed">
            {text || "Entre em contato conosco para agendar uma avaliação com nossos especialistas."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
            >
              Agendar pelo WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="tel:+5511916544653"
              className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-cream/10 transition-colors"
            >
              Ligar: (11) 91654-4653
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
