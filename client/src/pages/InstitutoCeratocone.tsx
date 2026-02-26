/* ============================================================
   Instituto do Ceratocone — Drudi e Almeida
   ============================================================ */
import { AlertCircle, CheckCircle } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import FAQSection from "@/components/FAQSection";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";

const sintomas = ["Visão borrada e distorcida", "Aumento rápido do astigmatismo e miopia", "Necessidade de trocar óculos com frequência", "Visão de halos ao redor das luzes", "Visão dupla em um olho", "Sensibilidade à luz"];

const tratamentos = [
  { title: "Crosslinking de Córnea", desc: "Tratamento padrão-ouro que utiliza riboflavina e luz ultravioleta para enrijecer as fibras de colágeno da córnea, impedindo a progressão." },
  { title: "Anel Intracorneano", desc: "Implante de segmentos de anel na córnea para regularizar sua curvatura, melhorando a acuidade visual." },
  { title: "Lentes de Contato Especiais", desc: "Lentes rígidas gás-permeáveis ou esclerais para corrigir o astigmatismo irregular e proporcionar visão nítida." },
];

const faqItems = [
  { question: "Coçar os olhos pode causar ceratocone?", answer: "Sim. O ato de coçar os olhos de forma crônica e vigorosa é um dos principais fatores de risco associados ao desenvolvimento e à progressão do ceratocone. É fundamental evitar esse hábito." },
  { question: "Ceratocone tem cura?", answer: "O ceratocone não tem uma cura no sentido de reverter completamente a condição, mas os tratamentos modernos, como o crosslinking, são extremamente eficazes em estabilizar a progressão da doença." },
  { question: "O Crosslinking é doloroso?", answer: "O procedimento é realizado com anestesia por colírios e é bem tolerado. Pode haver desconforto e sensibilidade à luz nos primeiros dias, controlados com medicação." },
  { question: "Quem tem ceratocone pode fazer LASIK?", answer: "Não. A cirurgia refrativa a laser tradicional (LASIK) é contraindicada em pacientes com ceratocone, pois afina ainda mais a córnea, podendo agravar a doença." },
];

export default function InstitutoCeratocone() {
  return (
    <>
      <InstitutoHero title="Instituto do Ceratocone" subtitle="Tecnologia e cuidado para a estabilidade da sua visão." imageUrl={IMAGES.hero.eyeAbstract} breadcrumb="Instituto do Ceratocone" logoUrl={IMAGES.institutoLogos.ceratocone} />

      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Ceratocone?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">O ceratocone é uma doença ocular não inflamatória que afeta a córnea, a camada transparente na frente do olho. A córnea torna-se progressivamente mais fina e curva, adquirindo um formato de cone, causando distorção das imagens e visão embaçada.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">A causa exata é desconhecida, mas acredita-se em uma combinação de fatores genéticos e ambientais, como coçar os olhos. Geralmente surge na adolescência ou início da idade adulta. O diagnóstico precoce é fundamental.</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fique Atento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Sintomas do Ceratocone</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sintomas.map((s, i) => (
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Tratamentos Avançados</h2>
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

      {/* ========== ARTE E VISÃO — VAN GOGH ========== */}
      <section className="section-padding bg-navy text-cream overflow-hidden">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3">Van Gogh e a Visão Distorcida</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
            <AnimateOnScroll>
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                <img
                  src={IMAGES.art.vanGoghStarryNight}
                  alt="Noite Estrelada sobre o Ródano — Van Gogh, 1888"
                  className="w-full h-auto"
                />
                <div className="bg-navy-light p-3 text-center">
                  <p className="font-body text-xs text-cream/70">"Noite Estrelada sobre o Ródano" — Van Gogh, 1888</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <div className="space-y-5">
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Vincent van Gogh (1853–1890) é um dos artistas mais icônicos da história. Suas pinceladas vigorosas, espirais dramáticas e distorções visuais — tão evidentes em obras como "Noite Estrelada" — há muito intrigam pesquisadores sobre a relação entre sua arte e sua visão.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Estudos oftalmológicos sugerem que Van Gogh pode ter sofrido de <strong className="text-gold">astigmatismo irregular</strong>, uma condição em que a córnea tem curvatura desigual — exatamente o que ocorre no ceratocone. Essa irregularidade faz com que as luzes pareçam esticadas, com halos e raios, e as formas se distorçam.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Os famosos halos ao redor das estrelas e as ondulações nas paisagens de Van Gogh são notavelmente semelhantes à visão de um paciente com ceratocone. Embora não possamos diagnosticá-lo retroativamente, a conexão entre sua arte e os sintomas visuais do ceratocone é fascinante.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimateOnScroll delay={0.1} className="order-2 md:order-1">
              <div className="space-y-5">
                <h3 className="font-display text-2xl text-cream">O Olhar de Van Gogh</h3>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Em seus autorretratos, Van Gogh frequentemente se representava com olhos intensos e penetrantes. Pesquisadores notaram que ele pintava os próprios olhos com assimetrias sutis, o que pode indicar uma percepção visual alterada.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Na Drudi e Almeida, usamos a arte como ferramenta de conscientização: assim como Van Gogh transformou sua visão em obras-primas, nós trabalhamos para que nossos pacientes com ceratocone recuperem a nitidez e a qualidade visual que merecem.
                </p>
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm text-cream/90 italic">
                    "Se você vê halos ao redor das luzes ou as imagens parecem distorcidas, agende uma avaliação. O diagnóstico precoce do ceratocone é fundamental para preservar sua visão."
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15} className="order-1 md:order-2">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                <img
                  src={IMAGES.art.vanGoghSelfPortrait}
                  alt="Autorretrato — Van Gogh, 1887"
                  className="w-full h-auto"
                />
                <div className="bg-navy-light p-3 text-center">
                  <p className="font-body text-xs text-cream/70">"Autorretrato" — Van Gogh, 1887</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o ceratocone." />
      <InstitutoCTA text="Agende uma avaliação com nossos especialistas em ceratocone." />
    </>
  );
}
