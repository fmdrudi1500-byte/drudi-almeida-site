/* ============================================================
   Sobre Nós — Drudi e Almeida
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, Award, Users, Heart, Target } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";

const values = [
  { icon: Heart, title: "Cuidado Humanizado", desc: "Cada paciente é único. Oferecemos atendimento personalizado e acolhedor." },
  { icon: Award, title: "Excelência Técnica", desc: "Profissionais altamente qualificados e em constante atualização." },
  { icon: Target, title: "Tecnologia de Ponta", desc: "Investimos nos equipamentos mais modernos do mercado." },
  { icon: Users, title: "Acessibilidade", desc: "Nossos institutos existem para democratizar o acesso à saúde ocular." },
];

export default function SobreNos() {
  return (
    <>
      <InstitutoHero
        title="Sobre a Drudi e Almeida"
        subtitle="Tradição, inovação e compromisso com a saúde ocular de cada paciente."
        imageUrl={IMAGES.hero.main}
        breadcrumb="Sobre Nós"
      />

      {/* Missão e Valores */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Nossa Missão</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">
                Democratizar o Acesso à Oftalmologia de Excelência
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                A Drudi e Almeida Clínicas Oftalmológicas nasceu com o propósito de unir o que há de mais avançado em tecnologia oftalmológica com um atendimento verdadeiramente humanizado. Acreditamos que toda pessoa merece ter acesso a cuidados de saúde ocular de alta qualidade.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                Nossos 5 institutos especializados — Catarata, Ceratocone, Glaucoma, Retina e Estrabismo — foram criados para oferecer tratamento focado e aprofundado em cada uma dessas áreas, garantindo que nossos pacientes recebam o melhor cuidado possível.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed">
                Cada instituto conta com profissionais dedicados exclusivamente àquela especialidade, equipamentos de última geração e protocolos de tratamento atualizados com as mais recentes evidências científicas internacionais.
              </p>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <img
                src={IMAGES.hero.doctorConsultation}
                alt="Equipe Drudi e Almeida em consulta"
                className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover"
              />
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Nossos Pilares</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Nossos Valores</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <AnimateOnScroll key={v.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border/60 p-6 h-full text-center hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">{v.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl text-navy mb-4">Agende Sua Consulta</h2>
            <p className="font-body text-base text-muted-foreground max-w-lg mx-auto mb-8">
              Venha conhecer nossa clínica e descubra como podemos cuidar da sua visão.
            </p>
            <a
              href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
            >
              Agendar pelo WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
