/* ============================================================
   FAQSection — Reusable FAQ with accordion + schema.org markup
   ============================================================ */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimateOnScroll from "./AnimateOnScroll";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
}

export default function FAQSection({ title = "Perguntas Frequentes", subtitle, items }: Props) {
  // Generate FAQ schema.org JSON-LD
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="section-padding">
      <div className="container">
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <AnimateOnScroll className="text-center mb-12">
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">FAQ</span>
          <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-3">{title}</h2>
          {subtitle && (
            <p className="font-body text-base text-muted-foreground max-w-xl mx-auto">{subtitle}</p>
          )}
          <div className="gold-line max-w-[80px] mx-auto mt-5" />
        </AnimateOnScroll>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {items.map((item, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <AccordionItem
                  value={`faq-${i}`}
                  className="border border-border/60 rounded-xl px-6 bg-white data-[state=open]:shadow-sm data-[state=open]:border-gold/30 transition-all"
                >
                  <AccordionTrigger className="font-display text-base text-navy hover:text-gold py-5 [&[data-state=open]]:text-gold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </AnimateOnScroll>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
