/* ============================================================
   Instituto da Catarata — Drudi e Almeida
   Inclui seção "Arte e Visão" com obras de Monet
   ============================================================ */
import { useState } from "react";
import { Eye, AlertCircle, CheckCircle, Palette } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import FAQSection from "@/components/FAQSection";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";

const sintomas = [
  "Visão embaçada, nublada ou turva",
  "Dificuldade para enxergar à noite",
  "Sensibilidade à luz e ao brilho",
  "Necessidade de luz mais forte para ler",
  "Visão de halos ao redor das luzes",
  "Alterações frequentes no grau dos óculos",
  "Percepção desbotada das cores",
  "Visão dupla em um dos olhos",
];

const beneficios = [
  "Maior precisão e segurança",
  "Procedimento mais rápido e suave",
  "Recuperação visual acelerada",
  "Possibilidade de corrigir miopia e astigmatismo",
];

const faqItems = [
  { question: "A cirurgia de catarata dói?", answer: "Não. A cirurgia é realizada com anestesia local (colírios) e é indolor. O paciente pode sentir um leve desconforto no pós-operatório, que é facilmente controlado com medicação." },
  { question: "Quanto tempo dura a cirurgia?", answer: "O procedimento é muito rápido, durando em média de 10 a 15 minutos por olho." },
  { question: "A catarata pode voltar após a cirurgia?", answer: "Não. Uma vez que o cristalino opaco é removido, a catarata não retorna. O que pode ocorrer em alguns casos é a opacificação da cápsula posterior, resolvida com um procedimento a laser simples chamado capsulotomia." },
  { question: "Quando poderei voltar às atividades normais?", answer: "A recuperação é rápida. A maioria dos pacientes retoma atividades como ler e assistir TV já no dia seguinte. Atividades físicas intensas devem aguardar algumas semanas." },
];

export default function InstitutoCatarata() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <>
      <InstitutoHero
        title="Instituto da Catarata"
        subtitle="Recupere a clareza e as cores da vida com cirurgia a laser de última geração."
        imageUrl={IMAGES.hero.doctorConsultation}
        breadcrumb="Instituto da Catarata"
        logoUrl={IMAGES.institutoLogos.catarata}
      />

      {/* O que é */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é a Catarata?</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                A catarata é a opacificação do cristalino, a lente natural do olho, que fica atrás da íris e da pupila. Este processo, geralmente relacionado à idade, torna a visão embaçada, como se olhássemos através de um vidro fosco, dificultando atividades como ler, dirigir ou reconhecer rostos.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                O cristalino é responsável por focar a luz que entra no olho na retina, formando as imagens. Com o envelhecimento, as proteínas do cristalino podem se agrupar, formando áreas opacas que crescem gradualmente. Embora mais comum em idosos, a catarata também pode ser congênita ou causada por traumas, medicamentos ou doenças metabólicas.
              </p>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== ARTE E VISÃO — MONET ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">
              Quando Monet Perdeu as Cores
            </h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              Claude Monet, o pai do Impressionismo, desenvolveu catarata bilateral a partir dos 60 anos. A doença transformou profundamente sua percepção das cores — e suas pinturas são a prova viva disso.
            </p>
          </AnimateOnScroll>

          {/* Monet Japanese Bridge Comparison */}
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-2xl">
                <img
                  src={IMAGES.art.monetJapaneseBridge}
                  alt="Monet - A Ponte Japonesa: comparação antes e depois da catarata (1899 vs 1920-1922)"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-4 border border-cream/10">
                  <span className="font-display text-lg text-gold">1899</span>
                  <p className="font-body text-sm text-cream/60 mt-1">Visão normal — cores vibrantes, verdes e azuis nítidos</p>
                </div>
                <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-4 border border-cream/10">
                  <span className="font-display text-lg text-gold">1918–1920</span>
                  <p className="font-body text-sm text-cream/60 mt-1">Catarata avançando — tons amarelados e avermelhados dominam</p>
                </div>
                <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-4 border border-cream/10">
                  <span className="font-display text-lg text-gold">1922</span>
                  <p className="font-body text-sm text-cream/60 mt-1">Catarata severa — formas quase abstratas, vermelho e marrom</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Monet Before/After vertical */}
          <AnimateOnScroll delay={0.15}>
            <div className="max-w-3xl mx-auto mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                  <img
                    src={IMAGES.art.monetBeforeAfter}
                    alt="Monet - Pinturas antes e depois da catarata"
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-cream mb-4">A Catarata Através dos Olhos de Monet</h3>
                  <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                    Em 1905, Monet começou a notar dificuldades visuais. Aos poucos, o cristalino opaco filtrava a luz azul, fazendo com que ele percebesse o mundo em tons cada vez mais amarelados e avermelhados.
                  </p>
                  <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                    Suas famosas Ninfeias e a Ponte Japonesa, que antes eram pintadas em verdes e azuis vibrantes, passaram a ser dominadas por tons quentes e formas imprecisas — um reflexo direto da progressão da catarata.
                  </p>
                  <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                    Em 1923, aos 82 anos, Monet finalmente aceitou realizar a cirurgia de catarata. Após o procedimento, ficou impressionado ao perceber que suas pinturas recentes tinham cores completamente diferentes do que ele imaginava.
                  </p>
                  <div className="bg-gold/10 rounded-xl p-4 border border-gold/20 mt-6">
                    <p className="font-body text-sm text-gold italic leading-relaxed">
                      "Percebo que as cores não são mais as mesmas... o vermelho começou a parecer lamacento, minha pintura está ficando cada vez mais sombria."
                    </p>
                    <span className="font-ui text-xs text-cream/50 mt-2 block">— Claude Monet, 1914</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Connection to modern treatment */}
          <AnimateOnScroll delay={0.2}>
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl p-8 border border-gold/20">
                <Eye className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-display text-xl text-cream mb-3">Da Arte à Medicina Moderna</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed max-w-xl mx-auto">
                  Hoje, a cirurgia de catarata é um dos procedimentos mais seguros e realizados no mundo. Na Drudi e Almeida, utilizamos tecnologia a laser de última geração que Monet jamais poderia imaginar — recuperando não apenas a visão, mas as cores e a nitidez da vida.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Sintomas */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fique Atento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Sintomas da Catarata</h2>
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

      {/* Tratamento */}
      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamento</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">Cirurgia de Catarata a Laser</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                O único tratamento eficaz para a catarata é a cirurgia. O procedimento, chamado facoemulsificação, é rápido, seguro e altamente tecnológico. Consiste na remoção do cristalino opaco e sua substituição por uma lente intraocular artificial e transparente.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                Na Drudi e Almeida, utilizamos a tecnologia do Femto Laser para realizar a cirurgia de forma ainda mais precisa e segura. O laser realiza as incisões e a fragmentação do cristalino de forma automatizada, aumentando a previsibilidade e contribuindo para uma recuperação visual mais rápida.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.1}>
              <h3 className="font-display text-xl text-navy mb-4">Benefícios da Cirurgia a Laser</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {beneficios.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-navy/5 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-navy">{b}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre a cirurgia de catarata." />
      <InstitutoCTA text="Agende uma avaliação com nossos especialistas em catarata e descubra o melhor tratamento para você." />
    </>
  );
}
