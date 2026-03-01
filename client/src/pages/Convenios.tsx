/* ============================================================
   Convênios — Drudi e Almeida
   Insurance plans accepted, with real logos and details
   Design: Neoclassical Medical Luminance
   ============================================================ */
import { CheckCircle, Phone, MessageCircle, Shield, Heart, Users } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";

interface Convenio {
  name: string;
  description: string;
  color: string;
  logo?: string;
  initial: string;
}

const convenios: Convenio[] = [
  {
    name: "Prevent Senior",
    description: "Plano de saúde referência para a terceira idade, com ampla cobertura em consultas, exames e cirurgias oftalmológicas.",
    color: "#1B3A6B",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ULBqqsZkuiKBoDrv.png",
    initial: "PS",
  },
  {
    name: "Bradesco Saúde",
    description: "Um dos maiores planos de saúde do Brasil, oferecendo cobertura completa para todos os procedimentos oftalmológicos.",
    color: "#CC092F",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/iwnJMoCNnwopchUF.png",
    initial: "BS",
  },
  {
    name: "Mediservice",
    description: "Plano corporativo do Bradesco com atendimento diferenciado e cobertura abrangente em oftalmologia.",
    color: "#0066B3",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/rPLmRznRbIQEDeuV.png",
    initial: "MS",
  },
  {
    name: "Instituto Pró-PM",
    description: "Plano de saúde com cobertura para consultas especializadas, exames diagnósticos e procedimentos cirúrgicos.",
    color: "#1B3A6B",
    logo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-propm_eea209fd.png",
    initial: "PR",
  },
  {
    name: "Amil",
    description: "Rede nacional com cobertura ampla em oftalmologia, incluindo consultas, exames de alta complexidade e cirurgias.",
    color: "#1A237E",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/vRtJJHZyrxFGQNnx.png",
    initial: "AM",
  },
  {
    name: "Unimed Seguros",
    description: "Maior sistema cooperativo de saúde do mundo, com cobertura completa para cuidados oftalmológicos.",
    color: "#00653A",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/mvWRpZFYQZpqvVDK.png",
    initial: "US",
  },
  {
    name: "Ameplam",
    description: "Plano de saúde com atendimento personalizado e cobertura para consultas e procedimentos em oftalmologia.",
    color: "#E53935",
    logo: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ZZpmIoRpTNvSnOWl.jpg",
    initial: "AP",
  },
];

const beneficios = [
  {
    icon: Shield,
    title: "Cobertura Completa",
    desc: "Todos os convênios listados cobrem consultas, exames diagnósticos e procedimentos cirúrgicos em nossos 5 institutos especializados.",
  },
  {
    icon: Heart,
    title: "Sem Burocracia",
    desc: "Processo de autorização simplificado. Nossa equipe cuida de toda a parte administrativa para que você foque na sua saúde.",
  },
  {
    icon: Users,
    title: "Atendimento Humanizado",
    desc: "Independente do convênio, todos os pacientes recebem o mesmo padrão de excelência e cuidado personalizado.",
  },
];

export default function Convenios() {
  return (
    <>
      <SEOHead
        title="Convênios — Planos de Saúde Aceitos"
        description="Confira os convênios e planos de saúde aceitos na Drudi e Almeida Oftalmologia. Atendemos os principais planos de São Paulo."
        keywords="convênios oftalmologia SP, planos de saúde aceitos, oftalmologista convênio São Paulo, Drudi e Almeida convênios"
        canonicalPath="/convenios"
      />
      <InstitutoHero
        title="Convênios"
        subtitle="Atendemos os principais planos de saúde para facilitar o seu acesso à oftalmologia de excelência."
        imageUrl={IMAGES.hero.doctorConsultation}
        breadcrumb="Convênios"
      />

      {/* Intro */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Planos Aceitos</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">Nossos Convênios</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed">
              A Drudi e Almeida Clínicas Oftalmológicas atende pacientes de diversos convênios médicos. Nossa equipe está preparada para orientá-lo sobre a cobertura do seu plano e auxiliar em todo o processo de autorização.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>
        </div>
      </section>

      {/* Convenios Grid */}
      <section className="section-padding bg-cream/50 pt-0">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {convenios.map((conv, i) => (
              <AnimateOnScroll key={conv.name} delay={i * 0.07}>
                <div className="group relative bg-white rounded-xl border border-border/60 p-6 h-full hover:shadow-lg hover:border-gold/30 transition-all duration-300 overflow-hidden">
                  {/* Accent top bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: conv.color }}
                  />

                  <div className="flex items-start gap-4 mt-2">
                    {/* Logo or fallback initial */}
                    {conv.logo ? (
                      <div className="w-16 h-16 rounded-xl bg-white border border-border/40 flex items-center justify-center shrink-0 p-2 shadow-sm">
                        <img
                          src={conv.logo}
                          alt={`Logo ${conv.name}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 text-white font-display text-lg font-bold shadow-sm"
                        style={{ backgroundColor: conv.color }}
                      >
                        {conv.initial}
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-display text-lg text-navy mb-1.5 group-hover:text-gold transition-colors">
                        {conv.name}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {conv.description}
                      </p>
                    </div>
                  </div>

                  {/* Coverage badges */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border/40">
                    {["Consultas", "Exames", "Cirurgias"].map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1 font-ui text-[10px] font-semibold tracking-wide uppercase text-navy/70 bg-cream/80 px-2.5 py-1 rounded-full"
                      >
                        <CheckCircle className="w-2.5 h-2.5 text-gold" />
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Diferenciais</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Por que Escolher a Drudi e Almeida?</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            {beneficios.map((b, i) => (
              <AnimateOnScroll key={b.title} delay={i * 0.1}>
                <div className="text-center p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">{b.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Not in the list? */}
      <section className="section-padding bg-cream/50">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <div className="bg-white rounded-xl border border-border/60 p-8 md:p-10 text-center shadow-sm">
              <h3 className="font-display text-2xl text-navy mb-4">Seu convênio não está na lista?</h3>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
                Estamos constantemente ampliando nossa rede de convênios. Entre em contato conosco para verificar se atendemos o seu plano ou para saber mais sobre nossas condições para atendimento particular.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://wa.me/5511916544653?text=Olá! Gostaria de saber se vocês atendem meu convênio."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Perguntar pelo WhatsApp
                </a>
                <a
                  href="tel:+5511916544653"
                  className="inline-flex items-center gap-2 border border-navy/20 text-navy font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy hover:text-cream transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (11) 91654-4653
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      <InstitutoCTA text="Agende sua consulta utilizando o seu convênio. Nossa equipe cuida de toda a autorização." />
    </>
  );
}
