/* ============================================================
   Instituto da Retina — Drudi e Almeida
   ============================================================ */
import { AlertCircle, CheckCircle, Palette } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import FAQSection from "@/components/FAQSection";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";

const doencas = [
  { title: "Retinopatia Diabética", desc: "Complicação do diabetes que afeta os vasos sanguíneos da retina. O controle glicêmico e o acompanhamento regular são essenciais." },
  { title: "Degeneração Macular (DMRI)", desc: "Afeta a mácula, causando perda da visão central. Principal causa de perda de visão em pessoas com mais de 60 anos." },
  { title: "Descolamento de Retina", desc: "Emergência médica em que a retina se separa de sua posição normal. Requer tratamento cirúrgico imediato." },
  { title: "Oclusões Vasculares", desc: "Conhecidas como 'derrames no olho', ocorrem quando uma veia ou artéria da retina é bloqueada." },
];

const tratamentos = [
  { title: "OCT de Alta Resolução", desc: "Imagens transversais da retina com altíssima resolução para diagnóstico e acompanhamento." },
  { title: "Injeções Intravítreas (Anti-VEGF)", desc: "Bloqueiam o crescimento de vasos anormais, reduzindo inchaço e melhorando a visão." },
  { title: "Fotocoagulação a Laser", desc: "Trata áreas de isquemia e sela rasgos na retina, prevenindo o descolamento." },
  { title: "Vitrectomia", desc: "Microcirurgia intraocular para tratar descolamentos, hemorragias e condições complexas." },
];

const faqItems = [
  { question: "A retinopatia diabética tem sintomas no início?", answer: "Não. Nas fases iniciais, é assintomática. Todo paciente diabético deve realizar exame de fundo de olho pelo menos uma vez por ano." },
  { question: "As injeções no olho doem?", answer: "O procedimento é realizado com anestesia por colírios, é muito rápido e praticamente indolor. O paciente pode sentir uma leve pressão." },
  { question: "O que são as 'moscas volantes'?", answer: "São pequenas opacidades no vítreo que projetam sombras na retina. Na maioria dos casos são benignas, mas um aumento súbito acompanhado de flashes de luz requer avaliação urgente." },
  { question: "A DMRI pode levar à cegueira total?", answer: "A DMRI afeta a visão central, mas geralmente preserva a visão periférica. Não costuma levar à cegueira total, mas pode causar perda severa da visão central." },
];

export default function InstitutoRetina() {
  return (
    <>
      <InstitutoHero title="Instituto da Retina" subtitle="Alta tecnologia para o cuidado do coração do seu olho." imageUrl={IMAGES.hero.eyeAbstract} breadcrumb="Instituto da Retina" logoUrl={IMAGES.institutoLogos.retina} />

      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é a Retina?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">A retina é uma fina camada de tecido sensível à luz que reveste o interior do olho. Ela funciona como o filme de uma câmera fotográfica, capturando as imagens e enviando-as ao cérebro através do nervo óptico.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">A mácula, uma pequena área no centro da retina, é responsável pela visão central de detalhes e cores. Qualquer doença que afete a retina pode ter impacto significativo na visão.</p>
          </AnimateOnScroll>
        </div>
      </section>

      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Especialidades</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Doenças que Tratamos</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {doencas.map((d, i) => (
              <AnimateOnScroll key={d.title} delay={i * 0.08}>
                <div className="p-6 bg-white rounded-xl border border-border/60 h-full hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3"><AlertCircle className="w-4 h-4 text-gold" /></div>
                  <h3 className="font-display text-lg text-navy mb-2">{d.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Diagnóstico e Tratamento de Ponta</h2>
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

      {/* ========== ARTE E VISÃO — DEGAS & PONTILHISMO ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"2\"/%3E%3Ccircle cx=\"33\" cy=\"33\" r=\"2\"/%3E%3Ccircle cx=\"18\" cy=\"48\" r=\"1.5\"/%3E%3Ccircle cx=\"48\" cy=\"18\" r=\"1.5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">Degas, Seurat e a Retina</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              A história da arte está repleta de exemplos de como a visão influencia a criação artística. Dois grandes mestres nos ajudam a entender a retina.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {/* Degas */}
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.degasDancers} alt="Edgar Degas - Bailarinas, afetado por doença retiniana" className="w-full h-64 object-cover" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-cream mb-3">Edgar Degas</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  O mestre das bailarinas sofria de <strong className="text-gold">degeneração macular</strong>, uma doença da retina que destrói a visão central. Ao longo dos anos, suas pinturas passaram de detalhes nítidos para formas cada vez mais borradas e pastosas.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Degas migrou da pintura a óleo para o pastel e a escultura justamente porque sua retina já não permitia o trabalho de precisão que a pintura exigia.
                </p>
              </div>
            </AnimateOnScroll>

            {/* Seurat / Pontilhismo */}
            <AnimateOnScroll direction="right">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.seuratGrandeJatte} alt="Georges Seurat - Um Domingo na Grande Jatte, pontilhismo" className="w-full h-64 object-cover" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-cream mb-3">Pontilhismo e a Retina</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  Georges Seurat criou o <strong className="text-gold">pontilhismo</strong> — uma técnica que usa milhares de pontos coloridos que se misturam na retina do observador. É a própria retina que faz a "mistura" das cores.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Esta técnica demonstra como a retina é essencial para a percepção visual: ela não apenas capta a luz, mas interpreta e combina informações para formar as imagens que vemos.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre doenças da retina." />
      <InstitutoCTA text="Agende uma avaliação com nossos especialistas em retina." />
    </>
  );
}
