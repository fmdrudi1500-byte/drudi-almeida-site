/* ============================================================
   Instituto de Estrabismo — Drudi e Almeida
   ============================================================ */
import { AlertCircle, CheckCircle } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import FAQSection from "@/components/FAQSection";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";

const tipos = [
  { title: "Esotropia", desc: "Desvio convergente — um ou ambos os olhos se voltam para dentro (em direção ao nariz)." },
  { title: "Exotropia", desc: "Desvio divergente — um ou ambos os olhos se voltam para fora (em direção às orelhas)." },
  { title: "Hipertropia", desc: "Desvio vertical — um olho fica mais alto que o outro." },
  { title: "Estrabismo Paralítico", desc: "Causado por paralisia de um ou mais músculos extraoculares, frequentemente associado a condições neurológicas." },
];

const tratamentos = [
  { title: "Uso de Óculos", desc: "Em muitos casos, especialmente em crianças, o uso de óculos com a correção adequada pode alinhar os olhos." },
  { title: "Tampão Ocular (Oclusão)", desc: "Tratamento da ambliopia ('olho preguiçoso') que pode acompanhar o estrabismo, fortalecendo o olho mais fraco." },
  { title: "Toxina Botulínica", desc: "Injeção nos músculos oculares para enfraquecer temporariamente o músculo hiperativo e permitir o realinhamento." },
  { title: "Cirurgia de Estrabismo", desc: "Ajusta o comprimento ou a posição dos músculos extraoculares para alinhar os olhos de forma permanente." },
];

const faqItems = [
  { question: "Estrabismo em crianças pode ser corrigido?", answer: "Sim. Quanto mais cedo o tratamento for iniciado, melhores são os resultados. O ideal é que a avaliação seja feita nos primeiros anos de vida." },
  { question: "Adultos podem operar estrabismo?", answer: "Sim. A cirurgia de estrabismo pode ser realizada em qualquer idade. Em adultos, além da melhora estética, pode melhorar a percepção de profundidade e reduzir a visão dupla." },
  { question: "A cirurgia de estrabismo é segura?", answer: "Sim. É uma das cirurgias oculares mais realizadas no mundo. Como todo procedimento cirúrgico, possui riscos, mas as complicações graves são raras." },
  { question: "Meu filho tem 'olho torto' — é estrabismo?", answer: "Nem sempre. Em bebês, o pseudoestrabismo (falsa impressão de desvio) é comum devido à prega de pele no canto interno dos olhos. Porém, toda suspeita deve ser avaliada por um oftalmologista." },
];

export default function InstitutoEstrabismo() {
  return (
    <>
      <InstitutoHero title="Instituto de Estrabismo" subtitle="Alinhamento ocular para crianças e adultos com técnicas modernas e cuidado humanizado." imageUrl={IMAGES.hero.happyFamily} breadcrumb="Instituto de Estrabismo" logoUrl={IMAGES.institutoLogos.estrabismo} />

      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Estrabismo?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">O estrabismo é uma condição em que os olhos não estão alinhados na mesma direção. Enquanto um olho olha para frente, o outro pode se desviar para dentro, para fora, para cima ou para baixo. Pode ser constante ou intermitente.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">Afeta cerca de 4% da população e pode surgir em qualquer idade, embora seja mais comum na infância. O tratamento precoce é fundamental para prevenir a ambliopia (olho preguiçoso) e garantir o desenvolvimento visual adequado.</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Classificação</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tipos de Estrabismo</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {tipos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.08}>
                <div className="p-6 bg-white rounded-xl border border-border/60 h-full hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3"><AlertCircle className="w-4 h-4 text-gold" /></div>
                  <h3 className="font-display text-lg text-navy mb-2">{t.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
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
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5 text-gold" /></div>
                  <div><h3 className="font-display text-lg text-navy mb-1">{t.title}</h3><p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p></div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o estrabismo." />
      <InstitutoCTA text="Agende uma avaliação com nossos especialistas em estrabismo." />
    </>
  );
}
