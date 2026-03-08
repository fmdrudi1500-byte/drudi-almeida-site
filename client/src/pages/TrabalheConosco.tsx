/* ============================================================
   Trabalhe Conosco — Drudi e Almeida
   Career page with job openings and application form.
   Form submits via tRPC to the database (with optional
   resume upload to S3 via the /api/upload-resume endpoint).
   ============================================================ */
import { useState, useRef } from "react";
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
  Upload,
  X,
  Loader2,
  FileText,
} from "lucide-react";

import { toast } from "sonner";
import Layout from "@/components/Layout";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { IMAGES } from "@/lib/images";
import { trpc } from "@/lib/trpc";
import SEOHead from "@/components/SEOHead";

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

const UNITS = [
  "Qualquer unidade",
  "Santana",
  "Guarulhos",
  "Tatuapé",
  "São Miguel",
  "Lapa",
];

const EDUCATION_OPTIONS = [
  "Ensino Médio Completo",
  "Técnico / Tecnólogo",
  "Graduação",
  "Pós-Graduação / Especialização",
  "Mestrado",
  "Doutorado",
];

const MAX_RESUME_SIZE_MB = 5;
const MAX_RESUME_SIZE_BYTES = MAX_RESUME_SIZE_MB * 1024 * 1024;

export default function TrabalheConosco() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    unit: "Qualquer unidade",
    experience: "",
    education: "",
    motivation: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const submitMutation = trpc.careers.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
    },
    onError: (err) => {
      toast.error("Erro ao enviar candidatura: " + err.message);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_RESUME_SIZE_BYTES) {
      toast.error(`O arquivo deve ter no máximo ${MAX_RESUME_SIZE_MB}MB.`);
      return;
    }
    const allowed = ["application/pdf", "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    if (!allowed.includes(file.type)) {
      toast.error("Apenas arquivos PDF ou Word (.doc/.docx) são aceitos.");
      return;
    }
    setResumeFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let resumeUrl: string | undefined;
    let resumeKey: string | undefined;
    let resumeFileName: string | undefined;

    // Upload resume if provided
    if (resumeFile) {
      setUploading(true);
      try {
        const formDataUpload = new FormData();
        formDataUpload.append("file", resumeFile);
        const res = await fetch("/api/upload-resume", {
          method: "POST",
          body: formDataUpload,
          credentials: "include",
        });
        if (!res.ok) throw new Error("Falha no upload do currículo.");
        const data = await res.json() as { url: string; key: string };
        resumeUrl = data.url;
        resumeKey = data.key;
        resumeFileName = resumeFile.name;
      } catch (err) {
        toast.error("Erro ao enviar currículo. Tente novamente.");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    submitMutation.mutate({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      position: formData.position,
      unit: formData.unit,
      experience: formData.experience,
      education: formData.education || undefined,
      motivation: formData.motivation || undefined,
      resumeUrl,
      resumeKey,
      resumeFileName,
    });
  };

  const isLoading = uploading || submitMutation.isPending;

  return (
    <Layout>
      <SEOHead
        title="Trabalhe Conosco — Vagas em Oftalmologia em São Paulo"
        description="Faça parte da equipe Drudi e Almeida Oftalmologia. Vagas para oftalmologistas, ortoptistas, técnicos e recepcionistas em SP. Candidate-se online."
        keywords="vagas oftalmologia São Paulo, trabalhe conosco clínica olhos, emprego oftalmologista SP"
        canonicalPath="/trabalhe-conosco"
      />

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
            <div style={{ animation: 'heroFadeUp 0.6s ease both' }}>
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
            </div>
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
      <section id="candidatura" className="section-padding bg-muted">
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
                  Preencha o formulário abaixo e nossa equipe de RH entrará em contato.
                  Você também pode enviar seu currículo diretamente pelo WhatsApp.
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
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", phone: "", position: "", unit: "Qualquer unidade", experience: "", education: "", motivation: "" });
                      setResumeFile(null);
                    }}
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
                  {/* Row 1: Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
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

                  {/* Row 2: Phone + Position */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Telefone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
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
                        name="position"
                        required
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                      >
                        <option value="">Selecione uma vaga</option>
                        {openings.map((job) => (
                          <option key={job.title} value={job.title}>
                            {job.title}
                          </option>
                        ))}
                        <option value="Candidatura Espontânea">Candidatura Espontânea</option>
                      </select>
                    </div>
                  </div>

                  {/* Row 3: Unit + Education */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Unidade de Preferência
                      </label>
                      <select
                        name="unit"
                        value={formData.unit}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                      >
                        {UNITS.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                        Escolaridade
                      </label>
                      <select
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors"
                      >
                        <option value="">Selecione</option>
                        {EDUCATION_OPTIONS.map((e) => (
                          <option key={e} value={e}>{e}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                      Resumo da Experiência Profissional *
                    </label>
                    <textarea
                      name="experience"
                      required
                      rows={4}
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                      placeholder="Descreva sua experiência profissional, formação e principais habilidades..."
                    />
                  </div>

                  {/* Motivation */}
                  <div>
                    <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                      Por que deseja trabalhar na Drudi e Almeida?
                    </label>
                    <textarea
                      name="motivation"
                      rows={3}
                      value={formData.motivation}
                      onChange={handleChange}
                      className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                      placeholder="Conte-nos sua motivação para fazer parte da nossa equipe..."
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label className="block font-ui text-xs font-semibold text-card-foreground mb-1.5">
                      Currículo (PDF ou Word — máx. {MAX_RESUME_SIZE_MB}MB)
                    </label>
                    {resumeFile ? (
                      <div className="flex items-center gap-3 bg-gold/5 border border-gold/20 rounded-md px-4 py-3">
                        <FileText className="w-5 h-5 text-gold shrink-0" />
                        <span className="font-body text-sm text-foreground truncate flex-1">
                          {resumeFile.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => { setResumeFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-border rounded-md px-4 py-4 text-muted-foreground hover:border-gold/40 hover:text-gold transition-colors font-body text-sm"
                      >
                        <Upload className="w-4 h-4" />
                        Clique para anexar seu currículo
                      </button>
                    )}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 inline-flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-navy-light transition-colors dark:bg-gold dark:text-navy dark:hover:bg-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {uploading ? "Enviando currículo..." : "Enviando candidatura..."}
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Enviar Candidatura
                        </>
                      )}
                    </button>
                    <a
                      href="https://wa.me/5511916544653?text=Olá! Gostaria de enviar meu currículo para a Drudi e Almeida."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-ui text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-navy hover:text-cream transition-colors dark:border-gold dark:text-gold dark:hover:bg-gold dark:hover:text-navy"
                    >
                      Enviar pelo WhatsApp
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
