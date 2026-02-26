/* ============================================================
   Trabalhe Conosco — Drudi e Almeida
   Career page with job openings and application form
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import {
  Briefcase,
  Heart,
  Users,
  TrendingUp,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Stethoscope,
  Eye,
  GraduationCap,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { IMAGES } from "@/lib/images";

const benefits = [
  {
    icon: Heart,
    title: "Ambiente Acolhedor",
    description:
      "Trabalhamos com respeito, empatia e colaboração. Valorizamos cada membro da equipe como parte essencial da nossa missão.",
  },
  {
    icon: TrendingUp,
    title: "Crescimento Profissional",
    description:
      "Investimos no desenvolvimento contínuo com treinamentos, congressos e oportunidades de especialização na área oftalmológica.",
  },
  {
    icon: Users,
    title: "Equipe Multidisciplinar",
    description:
      "Faça parte de um time diversificado de profissionais comprometidos com a excelência no cuidado visual dos pacientes.",
  },
  {
    icon: Star,
    title: "Reconhecimento",
    description:
      "Valorizamos o desempenho e a dedicação. Oferecemos plano de carreira e reconhecimento pelo trabalho bem feito.",
  },
];

const openings = [
  {
    title: "Oftalmologista — Retina e Vítreo",
    type: "Tempo Integral",
    location: "Santana / Tatuapé",
    description:
      "Buscamos oftalmologista com fellowship em retina e vítreo para atuar em nosso Instituto da Retina, realizando consultas, exames especializados e procedimentos cirúrgicos.",
    requirements: [
      "CRM ativo e RQE em Oftalmologia",
      "Fellowship em Retina e Vítreo",
      "Experiência em injeções intravítreas e cirurgia vitreorretiniana",
    ],
  },
  {
    title: "Ortoptista",
    type: "Tempo Integral",
    location: "Todas as Unidades",
    description:
      "Procuramos ortoptista para atuar no Instituto de Estrabismo, realizando avaliações ortópticas, testes de motilidade ocular e acompanhamento de pacientes pré e pós-operatórios.",
    requirements: [
      "Formação em Ortóptica",
      "Experiência em avaliação de estrabismo",
      "Conhecimento em testes de visão binocular",
    ],
  },
  {
    title: "Técnico(a) em Exames Oftalmológicos",
    type: "Tempo Integral",
    location: "Lapa / Guarulhos",
    description:
      "Vaga para técnico(a) em exames oftalmológicos com experiência em OCT, campimetria, topografia corneana e biometria. Atuação em nossas unidades com equipamentos de última geração.",
    requirements: [
      "Curso técnico em Oftalmologia ou área correlata",
      "Experiência com equipamentos diagnósticos",
      "Boa comunicação com pacientes",
    ],
  },
  {
    title: "Recepcionista / Atendimento ao Paciente",
    type: "Tempo Integral",
    location: "São Miguel",
    description:
      "Buscamos profissional para recepção e atendimento ao paciente, com foco em acolhimento humanizado, agendamento de consultas e organização do fluxo de atendimento.",
    requirements: [
      "Ensino médio completo",
      "Experiência em atendimento na área da saúde",
      "Domínio de sistemas de agendamento",
    ],
  },
];

export default function TrabalheConosco() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cargo: "",
    mensagem: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `*Candidatura — Trabalhe Conosco*%0A%0A` +
      `*Nome:* ${formData.nome}%0A` +
      `*E-mail:* ${formData.email}%0A` +
      `*Telefone:* ${formData.telefone}%0A` +
      `*Vaga de Interesse:* ${formData.cargo}%0A` +
      `*Mensagem:* ${formData.mensagem}`;
    window.open(`https://wa.me/5511916544653?text=${text}`, "_blank");
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative bg-navy text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${IMAGES.unsplash.teamMeeting})` }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />

        <div className="container relative section-padding">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-gold" />
                </div>
                <span className="font-ui text-xs tracking-widest uppercase text-gold">
                  Carreiras
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-cream mb-6">
                Trabalhe <span className="text-gold">Conosco</span>
              </h1>
              <p className="font-body text-lg md:text-xl text-cream/80 leading-relaxed max-w-2xl">
                Junte-se à equipe da Drudi e Almeida e faça parte de uma das clínicas
                oftalmológicas mais completas de São Paulo. Buscamos profissionais
                comprometidos com a excelência no cuidado visual.
              </p>
            </motion.div>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />
      </section>

      {/* Por que trabalhar conosco */}
      <section className="section-padding bg-background">
        <div className="container">
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-ui text-xs tracking-widest uppercase text-gold">
                Por Que Nos Escolher
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Por Que Trabalhar na Drudi e Almeida?
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Oferecemos um ambiente de trabalho que valoriza o desenvolvimento
                profissional, o bem-estar da equipe e a excelência no atendimento.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => (
              <AnimateOnScroll key={benefit.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 h-full hover:border-gold/30 hover:shadow-md transition-all duration-300 group">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                    <benefit.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-card-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Números */}
      <section className="bg-navy text-cream py-16">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: Eye, value: "5", label: "Institutos Especializados" },
              { icon: MapPin, value: "5", label: "Unidades na Grande SP" },
              { icon: Stethoscope, value: "50+", label: "Profissionais na Equipe" },
              { icon: GraduationCap, value: "20+", label: "Anos de Experiência" },
            ].map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 0.1}>
                <div>
                  <stat.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                  <p className="font-display text-3xl md:text-4xl font-bold text-gold">
                    {stat.value}
                  </p>
                  <p className="font-body text-sm text-cream/70 mt-1">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Vagas Abertas */}
      <section className="section-padding bg-background">
        <div className="container">
          <AnimateOnScroll>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="font-ui text-xs tracking-widest uppercase text-gold">
                Oportunidades
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                Vagas Abertas
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed">
                Confira nossas vagas disponíveis e encontre a oportunidade ideal para
                sua carreira na oftalmologia.
              </p>
            </div>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {openings.map((job, i) => (
              <AnimateOnScroll key={job.title} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-lg p-6 h-full hover:border-gold/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-lg font-semibold text-card-foreground">
                      {job.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 font-ui text-xs bg-gold/10 text-gold px-3 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {job.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-ui text-xs bg-navy/10 text-navy dark:bg-cream/10 dark:text-cream px-3 py-1 rounded-full">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </span>
                  </div>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {job.description}
                  </p>
                  <div>
                    <p className="font-ui text-xs font-semibold text-card-foreground mb-2">
                      Requisitos:
                    </p>
                    <ul className="space-y-1.5">
                      {job.requirements.map((req) => (
                        <li
                          key={req}
                          className="flex items-start gap-2 font-body text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-3.5 h-3.5 text-gold mt-0.5 shrink-0" />
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário de Candidatura */}
      <section className="section-padding bg-muted">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <AnimateOnScroll>
              <div className="text-center mb-10">
                <span className="font-ui text-xs tracking-widest uppercase text-gold">
                  Envie Seu Currículo
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
                  Candidate-se
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Preencha o formulário abaixo e entraremos em contato. Você também pode
                  enviar seu currículo diretamente pelo WhatsApp.
                </p>
              </div>
            </AnimateOnScroll>

            {submitted ? (
              <AnimateOnScroll>
                <div className="bg-card border border-gold/30 rounded-lg p-10 text-center">
                  <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-5">
                    <CheckCircle className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-card-foreground mb-3">
                    Candidatura Enviada!
                  </h3>
                  <p className="font-body text-muted-foreground mb-6">
                    Obrigado pelo seu interesse em fazer parte da equipe Drudi e Almeida.
                    Analisaremos seu perfil e entraremos em contato em breve.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="font-ui text-sm text-gold hover:text-gold-dark transition-colors underline underline-offset-4"
                  >
                    Enviar outra candidatura
                  </button>
                </div>
              </AnimateOnScroll>
            ) : (
              <AnimateOnScroll>
                <form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-lg p-8 space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="nome"
                        required
                        value={formData.nome}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        E-mail *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="telefone"
                        required
                        value={formData.telefone}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Vaga de Interesse *
                      </label>
                      <select
                        name="cargo"
                        required
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                      >
                        <option value="">Selecione uma vaga</option>
                        {openings.map((job) => (
                          <option key={job.title} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                        <option value="Outra">Outra / Candidatura Espontânea</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                      Mensagem / Resumo Profissional
                    </label>
                    <textarea
                      name="mensagem"
                      rows={4}
                      value={formData.mensagem}
                      onChange={handleChange}
                      className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                      placeholder="Conte-nos sobre sua experiência profissional, formação e por que deseja trabalhar na Drudi e Almeida..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-navy-light transition-colors dark:bg-gold dark:text-navy dark:hover:bg-gold-light"
                    >
                      <Send className="w-4 h-4" />
                      Enviar Candidatura via WhatsApp
                    </button>
                    <a
                      href="mailto:rh@drudialmeida.com.br?subject=Candidatura — Trabalhe Conosco"
                      className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-ui text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-navy hover:text-cream transition-colors dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-navy"
                    >
                      Enviar por E-mail
                    </a>
                  </div>

                  <p className="font-body text-xs text-muted-foreground text-center pt-2">
                    Ao enviar, você concorda com nossa política de privacidade. Seus dados
                    serão utilizados exclusivamente para fins de recrutamento.
                  </p>
                </form>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-navy text-cream py-16">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-cream mb-4">
              Não Encontrou a Vaga Ideal?
            </h2>
            <p className="font-body text-cream/70 max-w-xl mx-auto mb-8">
              Envie sua candidatura espontânea. Estamos sempre em busca de talentos que
              compartilham nossa paixão pela saúde visual.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de enviar meu currículo para a Drudi e Almeida."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-semibold px-8 py-3.5 rounded-md hover:bg-gold-light transition-colors"
              >
                Enviar Currículo pelo WhatsApp
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center gap-2 border-2 border-cream/30 text-cream font-ui text-sm font-semibold px-8 py-3.5 rounded-md hover:border-gold hover:text-gold transition-colors"
              >
                Fale Conosco
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </Layout>
  );
}
