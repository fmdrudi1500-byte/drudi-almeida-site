/* ============================================================
   Instituto do Glaucoma — Drudi e Almeida
   ============================================================ */
import { AlertCircle, CheckCircle } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import FAQSection from "@/components/FAQSection";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";

const fatoresRisco = ["Idade acima de 40 anos", "Histórico familiar de glaucoma", "Pressão intraocular elevada", "Descendência africana ou asiática", "Miopia elevada", "Diabetes e outras condições metabólicas"];

const tratamentos = [
  { title: "Colírios", desc: "Forma mais comum de tratamento. Diversas classes de colírios ajudam a diminuir a produção de humor aquoso ou aumentar sua drenagem." },
  { title: "Laser (SLT)", desc: "Trabeculoplastia Seletiva a Laser — procedimento seguro e eficaz que estimula o sistema de drenagem do olho, reduzindo a pressão." },
  { title: "Cirurgia", desc: "Para casos avançados, a trabeculectomia ou implante de dispositivos de drenagem cria uma nova via para o humor aquoso." },
];

const faqItems = [
  { question: "Glaucoma tem cura?", answer: "Não, o glaucoma não tem cura, mas tem controle. O tratamento adequado pode estabilizar a doença e prevenir a perda de visão. A visão já perdida não pode ser recuperada." },
  { question: "O tratamento com colírios é para a vida toda?", answer: "Na maioria dos casos, sim. O glaucoma é uma doença crônica, e o uso contínuo dos colírios conforme a prescrição médica é essencial." },
  { question: "Alguém na minha família tem glaucoma. Eu também terei?", answer: "Ter um parente de primeiro grau com glaucoma aumenta significativamente o risco. Realize exames oftalmológicos regulares para diagnóstico precoce." },
  { question: "Pressão ocular alta significa glaucoma?", answer: "Não necessariamente. A hipertensão ocular é um fator de risco, mas nem todos que a possuem desenvolverão glaucoma. Apenas um oftalmologista pode fazer o diagnóstico correto." },
];

export default function InstitutoGlaucoma() {
  return (
    <>
      <InstitutoHero title="Instituto do Glaucoma" subtitle="Preservando sua visão com cuidado e tecnologia de ponta." imageUrl={IMAGES.hero.technology} breadcrumb="Instituto do Glaucoma" logoUrl={IMAGES.institutoLogos.glaucoma} />

      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Glaucoma?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">O glaucoma é um grupo de doenças oculares que causam danos progressivos ao nervo óptico, a estrutura que conecta o olho ao cérebro. Na maioria dos casos, está associado ao aumento da pressão intraocular. Se não tratado, leva à perda irreversível da visão.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">Conhecido como o "ladrão silencioso da visão", o glaucoma geralmente não apresenta sintomas em suas fases iniciais. A perda de visão ocorre de forma lenta e gradual. Por isso, consultas oftalmológicas regulares são fundamentais para o diagnóstico precoce.</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Prevenção</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Fatores de Risco</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fatoresRisco.map((s, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-border/60">
                  <AlertCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-navy">{s}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamentos</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Opções de Tratamento</h2>
          </AnimateOnScroll>
          <div className="space-y-5">
            {tratamentos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-xl border border-border/60 bg-white hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-navy mb-1">{t.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o glaucoma." />
      <InstitutoCTA text="Agende uma avaliação com nossos especialistas em glaucoma. O diagnóstico precoce é fundamental." />
    </>
  );
}
