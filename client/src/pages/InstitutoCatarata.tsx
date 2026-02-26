/* ============================================================
   Instituto da Catarata — Drudi e Almeida
   ============================================================ */
import { Eye, AlertCircle, CheckCircle } from "lucide-react";
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
