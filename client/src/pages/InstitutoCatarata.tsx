/* ============================================================
   Instituto da Catarata — Drudi e Almeida
   Réplica fiel da estrutura da Central da Visão, adaptada ao
   estilo navy/gold da Drudi e Almeida.
   ============================================================ */
import { useState, useRef } from "react";
import { Link } from "wouter";
import {
  Eye, ChevronRight, ArrowRight, Phone, MessageCircle,
  CheckCircle, Clock, Shield, Sparkles, Sun, Moon, Glasses,
  Droplets, Activity, Heart, AlertTriangle, DollarSign,
  Star, MapPin, Users, Stethoscope, CircleDot
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import AudioPlayer from "@/components/AudioPlayer";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";

/* ---- Constants ---- */
const HERO_ART_IMG = "https://private-us-east-1.manuscdn.com/sessionFile/VBswHKhWNC83TvZUgrFk36/sandbox/u4g0I4h1IGUE9ABNeQTXpr-img-1_1772141937000_na1fn_Y2F0YXJhdGEtaGVyby1hcnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVkJzd0hLaFdOQzgzVHZaVWdyRmszNi9zYW5kYm94L3U0ZzBJNGgxSUdVRTlBQk5lUVRYcHItaW1nLTFfMTc3MjE0MTkzNzAwMF9uYTFmbl9ZMkYwWVhKaGRHRXRhR1Z5YnkxaGNuUS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=C8TKw5YeNCoUokrvSuPBz6Hj1MIx4tVE6IYk5DTYvn6rPvMqchkPn-3uuCPPLmJmrGy3NPpjynhj3fIZcjK9fVK3LVGQVQCgIn0NzAVmpp9zwHKvgsLNMUCIcUBA1D9wosZHVjau~h-gmDPG704XUVxICzjpvyVDNR33BGF7jZCi-zgq4rBWIokUWsvh5QdD-e67Lm7Wp4fnP~S2EfWzJWfVp8Ct77u-xjsqZm0tASPy~xQlvHN~GaGzbR3OT954lxLGsY3rFj7II4MLpGQP1rv5dkkVY-ZA2RcDW47c1JfxTvBYaVMwp6gApMJXRGgMaMCUhNmVWfNmtT7Bdblo5A__";
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber o preço da cirurgia de catarata.";
const PHONE = "(11) 91654-4653";

/* ---- Unidades ---- */
const unidades = [
  { id: "guarulhos-centro", name: "Guarulhos Centro", address: "Guarulhos - SP" },
  { id: "lapa", name: "Lapa", address: "São Paulo - SP" },
  { id: "santana", name: "Santana", address: "São Paulo - SP" },
  { id: "sao-miguel", name: "São Miguel", address: "São Paulo - SP" },
  { id: "tatupe", name: "Tatuapé", address: "São Paulo - SP" },
];

/* ---- Como funciona ---- */
const comoFunciona = [
  {
    step: 1,
    title: "Agende uma consulta de avaliação",
    description: "Entre em contato pelo WhatsApp ou telefone e agende sua consulta com um de nossos especialistas em catarata.",
  },
  {
    step: 2,
    title: "Receba orientações de forma acolhedora",
    description: "Nossa equipe vai te receber com carinho, explicar todo o processo e tirar todas as suas dúvidas sobre a cirurgia.",
  },
  {
    step: 3,
    title: "Realize exames pré-operatórios",
    description: "Exames completos com equipamentos de última geração para garantir o melhor planejamento cirúrgico para o seu caso.",
  },
  {
    step: 4,
    title: "Cirurgia segura e recuperação rápida",
    description: "Procedimento rápido, indolor e com recuperação em poucos dias. Volte a enxergar com clareza e qualidade de vida.",
  },
];

/* ---- Sintomas da Catarata (zigzag) ---- */
const sintomasZigzag = [
  {
    title: "Visão embaçada ou turva",
    description: "Um dos primeiros sinais da catarata é a sensação de que a visão está constantemente embaçada, como se você estivesse olhando através de uma janela suja ou embaçada. Essa dificuldade pode afetar atividades simples como ler, reconhecer rostos ou assistir televisão.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=700&q=80",
  },
  {
    title: "Maior sensibilidade à luz",
    description: "A catarata pode causar um aumento significativo na sensibilidade à luz. Ambientes muito iluminados ou a luz do sol podem causar desconforto e até dor nos olhos. Dirigir à noite também se torna mais difícil, pois os faróis de outros veículos podem causar ofuscamento intenso.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
  },
  {
    title: "Dificuldade de enxergar à noite",
    description: "Especialmente ao dirigir, os faróis de outros veículos podem causar ofuscamento intenso, enquanto ruas pouco iluminadas parecem ainda mais escuras. Essa dificuldade noturna é um dos sintomas que mais impacta a qualidade de vida dos pacientes com catarata.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=80",
  },
  {
    title: "Visão dupla em um dos olhos",
    description: "Em alguns casos, a catarata pode causar visão dupla (diplopia) em apenas um dos olhos. Isso acontece porque a opacidade do cristalino faz com que a luz se disperse de forma irregular ao entrar no olho, criando imagens duplicadas.",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=700&q=80",
  },
  {
    title: "Cores parecem desbotadas",
    description: "As cores podem parecer mais amareladas, desbotadas ou menos vibrantes do que o normal. Isso ocorre porque o cristalino opaco filtra a luz de forma irregular, alterando a percepção cromática. Muitos pacientes só percebem essa mudança após a cirurgia, quando voltam a ver cores vivas.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
  },
];

/* ---- 4 Etapas da Cirurgia ---- */
const etapasCirurgia = [
  {
    step: 1,
    title: "Anestesia tópica + Sedação Venosa",
    description: "A cirurgia começa com a aplicação de colírios anestésicos, eliminando qualquer dor ou desconforto. Não é necessária anestesia geral, o que torna o procedimento mais seguro e com recuperação mais rápida.",
  },
  {
    step: 2,
    title: "Incisão mínima",
    description: "O cirurgião realiza uma microincisão de aproximadamente 2,4 mm na córnea. Essa incisão é tão pequena que geralmente não necessita de pontos e cicatriza naturalmente.",
  },
  {
    step: 3,
    title: "Fragmentação e remoção do cristalino",
    description: "Através da técnica de facoemulsificação, o cristalino opaco é fragmentado por ultrassom e aspirado. Todo o material opaco é removido com precisão, preservando a cápsula que sustentará a nova lente.",
  },
  {
    step: 4,
    title: "Implante da lente intraocular (LIO)",
    description: "Uma lente intraocular artificial é implantada no lugar do cristalino removido. A lente é dobrada e inserida pela mesma microincisão, onde se desdobra e se posiciona perfeitamente dentro do olho.",
  },
];

/* ---- Sintomas Pós-Cirurgia ---- */
const sintomasPos = [
  {
    title: "Visão embaçada ou turva",
    description: "É normal que a visão fique um pouco embaçada logo após a cirurgia. Isso acontece porque o olho está se adaptando à nova lente intraocular. A visão melhora progressivamente nos primeiros dias.",
    tip: "A maioria dos pacientes percebe melhora significativa na visão logo nos primeiros dias após a cirurgia.",
    color: "bg-sky-50 border-sky-200",
  },
  {
    title: "Sensibilidade à luz",
    description: "É comum sentir uma maior sensibilidade à luz nos primeiros dias. Use óculos escuros ao sair de casa e evite ambientes com iluminação muito forte.",
    tip: "Use óculos escuros sempre que sair de casa nos primeiros dias.",
    color: "bg-amber-50 border-amber-200",
  },
  {
    title: "Vermelhidão no olho",
    description: "Uma leve vermelhidão no olho operado é normal e faz parte do processo de cicatrização. Geralmente desaparece em poucos dias.",
    tip: "Aplique os colírios conforme a orientação médica para acelerar a recuperação.",
    color: "bg-rose-50 border-rose-200",
  },
  {
    title: "Sensação de olho seco",
    description: "Alguns pacientes podem sentir o olho seco ou com uma sensação de areia. Isso é temporário e pode ser aliviado com colírios lubrificantes prescritos pelo médico.",
    tip: "Use colírios lubrificantes conforme orientação do seu oftalmologista.",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Moscas volantes e flashes de luz",
    description: "Pequenos pontos ou linhas que parecem flutuar na visão podem aparecer temporariamente. Se forem intensos ou persistentes, procure seu médico.",
    tip: "Se os sintomas forem intensos, entre em contato com seu oftalmologista.",
    color: "bg-violet-50 border-violet-200",
  },
];

/* ---- Portal das Lentes URL ---- */
const PORTAL_LENTES_URL = "https://lentesapp-pikmz7he.manus.space";

/* ---- Riscos ---- */
const riscos = [
  {
    title: "Infecções ou inflamações",
    description: "Embora seja raro, o risco de infecção ou inflamação pode ocorrer após a cirurgia. Felizmente, esses problemas são normalmente controlados com o uso de medicamentos específicos prescritos pelo médico.",
    color: "bg-sky-50 border-sky-200",
  },
  {
    title: "Edema macular (inchaço na retina)",
    description: "Esse inchaço pode afetar temporariamente a visão, mas costuma ser tratado com sucesso com medicamentos e acompanhamento médico adequado.",
    color: "bg-emerald-50 border-emerald-200",
  },
  {
    title: "Descolamento de retina",
    description: "Embora seja um risco pouco comum, o descolamento de retina pode ocorrer. Caso isso aconteça, é fundamental procurar atendimento médico imediato para evitar complicações graves.",
    color: "bg-amber-50 border-amber-200",
  },
];

/* ---- Cuidados pré e pós ---- */
const cuidados = [
  {
    text: "Aplique os colírios conforme a orientação médica: esses medicamentos são fundamentais para prevenir infecções e auxiliar no processo de cicatrização.",
    color: "bg-sky-50 border-sky-200",
  },
  {
    text: "Use óculos escuros sempre que sair de casa: a luz intensa pode causar desconforto e prejudicar a recuperação, por isso, é essencial proteger os olhos ao se expor ao sol ou em ambientes com iluminação forte.",
    color: "bg-amber-50 border-amber-200",
  },
  {
    text: "Evite esforços físicos nos primeiros dias: atividades como levantar pesos ou exercícios intensos podem comprometer a recuperação, por isso, é recomendado respeitar o período de descanso indicado pelo seu médico.",
    color: "bg-rose-50 border-rose-200",
  },
  {
    text: "Não coce ou esfregue os olhos: isso pode deslocar a lente intraocular ou causar infecções. Use o protetor ocular para dormir conforme orientação.",
    color: "bg-emerald-50 border-emerald-200",
  },
];

/* ---- FAQ ---- */
const faqItems = [
  { question: "A cirurgia de catarata dói?", answer: "Não. A cirurgia é realizada com anestesia local (colírios anestésicos) e é completamente indolor. O paciente pode sentir um leve desconforto no pós-operatório, que é facilmente controlado com medicação prescrita pelo médico." },
  { question: "Quanto tempo dura a cirurgia?", answer: "O procedimento é muito rápido, durando em média de 10 a 20 minutos por olho. O paciente fica na clínica por algumas horas para preparação e observação pós-operatória." },
  { question: "A catarata pode voltar após a cirurgia?", answer: "Não. Uma vez que o cristalino opaco é removido e substituído pela lente intraocular, a catarata não retorna. O que pode ocorrer em alguns casos é a opacificação da cápsula posterior, resolvida com um procedimento a laser simples e rápido chamado capsulotomia com Yag Laser." },
  { question: "Quando poderei voltar às atividades normais?", answer: "A recuperação é rápida. A maioria dos pacientes retoma atividades como ler e assistir TV já no dia seguinte. Atividades físicas intensas e natação devem aguardar de 2 a 4 semanas, conforme orientação médica." },
  { question: "Qual a idade ideal para operar a catarata?", answer: "Não existe uma idade específica. A cirurgia é indicada quando a catarata começa a comprometer a qualidade de vida e as atividades diárias do paciente. Quanto mais cedo o diagnóstico, melhor o planejamento cirúrgico." },
  { question: "Posso operar os dois olhos no mesmo dia?", answer: "Geralmente, os olhos são operados em dias diferentes, com intervalo de 1 a 2 semanas entre cada procedimento. Isso permite acompanhar a recuperação do primeiro olho antes de operar o segundo." },
  { question: "Qual tipo de lente intraocular é melhor para mim?", answer: "A escolha da lente depende de diversos fatores: estilo de vida, atividades profissionais, presença de astigmatismo e expectativas do paciente. Para ajudá-lo nessa decisão, desenvolvemos o Portal de Lentes Intraoculares — um questionário personalizado que analisa seu perfil e sugere as melhores opções. Acesse nosso Portal de Lentes nesta mesma página para descobrir qual tecnologia pode ser mais adequada para você. Na consulta pré-operatória, nossos especialistas avaliam cada caso individualmente para a recomendação final." },
  { question: "A cirurgia é coberta pelo plano de saúde?", answer: "Sim. A cirurgia de catarata por facoemulsificação é coberta pelos planos de saúde. As lentes premium (multifocais, trifocais, tóricas) podem ter cobertura parcial, com complementação pelo paciente. Consulte seu plano para detalhes." },
];

/* ---- Shared CTA Button ---- */
function CTAButtons({ variant = "default" }: { variant?: "default" | "hero" | "dark" }) {
  const isHero = variant === "hero";
  const isDark = variant === "dark";
  return (
    <div className={`flex flex-wrap ${isHero ? "flex-col sm:flex-row" : ""} gap-3`}>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center gap-2 font-ui text-sm font-bold px-6 py-3.5 rounded-lg transition-all ${
          isDark
            ? "bg-gold text-navy hover:bg-gold-light"
            : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-600/20"
        }`}
      >
        <MessageCircle className="w-4 h-4" />
        Agende pelo WhatsApp
      </a>
      <a
        href={`tel:+55${PHONE.replace(/\D/g, "")}`}
        className={`inline-flex items-center justify-center gap-2 font-ui text-sm font-semibold px-6 py-3.5 rounded-lg border transition-all ${
          isDark
            ? "border-cream/30 text-cream hover:bg-cream/10"
            : "border-navy/20 text-navy hover:bg-navy/5"
        }`}
      >
        <Phone className="w-4 h-4" />
        Ligar: {PHONE}
      </a>
    </div>
  );
}

/* ---- Section Divider ---- */
function SectionDivider() {
  return <div className="w-20 h-0.5 bg-gold mx-auto" />;
}

/* ============================================================
   MAIN COMPONENT
   ============================================================ */
export default function InstitutoCatarata() {
  const [selectedUnidade, setSelectedUnidade] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);

  return (
    <>
      <SEOHead
        title="Instituto da Catarata — Cirurgia de Catarata em SP"
        description="Cirurgia de catarata com facoemulsificação e lentes premium. Especialistas renomados, tecnologia de ponta. 5 unidades em São Paulo e Guarulhos. Agende sua avaliação."
        keywords="cirurgia de catarata SP, catarata tratamento, facoemulsificação, lente intraocular, oftalmologista catarata São Paulo, preço cirurgia catarata"
        canonicalPath="/instituto/catarata"
      />
      {/* ========== 1. HERO WITH PARALLAX ========== */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Parallax Background — Obra de Arte Impressionista */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${HERO_ART_IMG})`,
            y: heroImageY,
            scale: heroImageScale,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"
          style={{ opacity: heroOverlayOpacity }}
        />

        {/* Content */}
        <div className="relative container py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">
                INSTITUTO DA CATARATA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Cirurgia de Catarata com{" "}
              <span className="text-gold italic">tecnologia</span> e{" "}
              <span className="text-gold italic">cuidado</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Selecione a unidade mais próxima e receba o preço da sua cirurgia de catarata com os melhores especialistas.
            </motion.p>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md"
            >
              <div className="space-y-4">
                <div>
                  <label className="font-ui text-xs font-semibold tracking-wider uppercase text-cream/60 mb-2 block">
                    Unidade
                  </label>
                  <select
                    value={selectedUnidade}
                    onChange={(e) => setSelectedUnidade(e.target.value)}
                    className="w-full bg-white text-navy font-body text-sm rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} — {u.address}</option>
                    ))}
                  </select>
                </div>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-3 bg-gold text-navy font-display text-[23px] font-extrabold px-8 py-5 rounded-xl hover:bg-gold-light transition-all shadow-xl shadow-gold/30 hover:shadow-2xl hover:-translate-y-0.5"
                >
                  <DollarSign className="w-5 h-5" />
                  Receber Preço
                </a>

                <a
                  href={`tel:+55${PHONE.replace(/\D/g, "")}`}
                  className="w-full inline-flex items-center justify-center gap-2 font-ui text-sm font-semibold px-6 py-3 rounded-lg border border-cream/30 text-cream hover:bg-cream/10 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Ligar: {PHONE}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 2. AVALIAÇÕES ========== */}
      <section className="py-8 bg-white border-b border-border/40">
        <div className="container">
          <div className="flex items-center justify-between gap-4 overflow-x-auto">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <div>
                <p className="font-display text-sm text-navy font-semibold">4,9 no Google</p>
                <p className="font-body text-xs text-muted-foreground">Avaliações reais de pacientes</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-gold" />
              <div>
                <p className="font-display text-sm text-navy font-semibold">+10 anos de experiência</p>
                <p className="font-body text-xs text-muted-foreground">Equipe altamente qualificada</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-gold" />
              <div>
                <p className="font-display text-sm text-navy font-semibold">5 unidades</p>
                <p className="font-body text-xs text-muted-foreground">Guarulhos, Lapa, Santana, São Miguel e Tatuapé</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-gold" />
              <div>
                <p className="font-display text-sm text-navy font-semibold">14 equipamentos</p>
                <p className="font-body text-xs text-muted-foreground">Tecnologia de última geração</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. COMO FUNCIONA ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div>
              <AnimateOnScroll>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Passo a Passo</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-3">Como funciona?</h2>
                <p className="font-body text-base text-muted-foreground mb-10 leading-relaxed">
                  Agende sua consulta e descubra como podemos ajudar você a enxergar melhor
                </p>
              </AnimateOnScroll>

              <div className="space-y-6">
                {comoFunciona.map((item) => (
                  <AnimateOnScroll key={item.step} delay={item.step * 0.1}>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center shrink-0 font-display text-sm font-bold">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-display text-base text-navy mb-1">{item.title}</h3>
                        <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </AnimateOnScroll>
                ))}
              </div>

              <AnimateOnScroll delay={0.5}>
                <div className="mt-8">
                  <CTAButtons />
                </div>
              </AnimateOnScroll>

              <AnimateOnScroll delay={0.6} className="mt-10">
                <div className="bg-white p-6 rounded-lg border border-blue-200 shadow-sm">
                  <h3 className="font-display text-lg text-navy mb-4">Ouça nossa mensagem de boas-vindas</h3>
                  <AudioPlayer
                    src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/boas-vindas-catarata_cf3cce61.mp3"
                    title="Instituto da Catarata"
                    subtitle="Mensagem de boas-vindas do Dr. Fernando Drudi"
                  />
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 4. NOSSAS UNIDADES ========== */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Nossas Clínicas</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Conheça nossas unidades</h2>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Guarulhos Centro",
                city: "Guarulhos - SP",
                description: "Nossa unidade em Guarulhos Centro oferece atendimento completo com equipamentos de última geração e equipe especializada em cirurgia de catarata.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v1_3860a616.png",
              },
              {
                name: "Lapa",
                city: "São Paulo - SP",
                description: "Nossa unidade na Lapa conta com infraestrutura moderna e fácil acesso, oferecendo o mesmo padrão de excelência em cirurgia de catarata.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v2_6cb18abf.png",
              },
              {
                name: "Santana",
                city: "São Paulo - SP",
                description: "Nossa unidade em Santana, na zona norte de São Paulo, oferece atendimento humanizado com equipamentos de ponta e fácil acesso pelo metrô.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v3_5717e0c0.png",
              },
              {
                name: "São Miguel",
                city: "São Paulo - SP",
                description: "Nossa unidade em São Miguel Paulista atende a zona leste com a mesma qualidade e tecnologia de todas as nossas clínicas.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v4_0b2982e6.png",
              },
              {
                name: "Tatuapé",
                city: "São Paulo - SP",
                description: "Nossa unidade no Tatuapé oferece atendimento especializado em catarata com infraestrutura completa e equipe altamente qualificada.",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v1_3860a616.png",
              },
            ].map((clinica, i) => (
              <AnimateOnScroll key={i} delay={i * 0.15}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-md transition-shadow">
                  <img src={clinica.image} alt={clinica.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg text-navy mb-1">{clinica.name}</h3>
                    <p className="font-ui text-xs text-gold font-semibold mb-3">{clinica.city}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{clinica.description}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. O QUE É CATARATA ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll>
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-6">
                  O que você precisa saber sobre a <span className="text-gold">cirurgia de catarata</span>
                </h2>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                  <p>
                    A <strong className="text-navy">catarata</strong> é uma condição ocular que causa a opacificação do cristalino, a lente natural do olho. Com o tempo, essa opacidade aumenta e compromete progressivamente a visão, podendo levar à cegueira se não tratada.
                  </p>
                  <p>
                    O cristalino é uma estrutura transparente que funciona como uma lente, focalizando a luz na retina para formar imagens nítidas. Quando ele se torna opaco, a luz não consegue passar adequadamente, resultando em <strong className="text-navy">visão embaçada, sensibilidade à luz e dificuldade para enxergar em ambientes escuros</strong>.
                  </p>
                  <p>
                    A <strong className="text-navy">cirurgia de catarata</strong> é o único tratamento definitivo. O procedimento consiste na remoção do cristalino opaco e sua substituição por uma lente intraocular artificial (LIO), devolvendo a visão clara e nítida ao paciente.
                  </p>
                  <p>
                    É a cirurgia oftalmológica mais realizada no mundo, com <strong className="text-navy">altíssima taxa de sucesso e recuperação rápida</strong>. Na Drudi e Almeida, realizamos o procedimento com equipamentos de última geração e equipe altamente especializada.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.2}>
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/cataract-eye_22b95078.jpg"
                  alt="Olho com catarata - opacificação do cristalino"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 6. SINTOMAS (ZIGZAG) ========== */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fique Atento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Quais são os <span className="text-gold">sintomas</span> da catarata?
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Se você apresenta algum destes sintomas, é importante consultar um oftalmologista para avaliação.
            </p>
          </AnimateOnScroll>

          <div className="space-y-16 max-w-5xl mx-auto">
            {sintomasZigzag.map((sintoma, i) => {
              const isReversed = i % 2 !== 0;
              return (
                <AnimateOnScroll key={i}>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${isReversed ? "md:[direction:rtl]" : ""}`}>
                    <div className={isReversed ? "md:[direction:ltr]" : ""}>
                      <div className="rounded-2xl overflow-hidden shadow-lg">
                        <img
                          src={sintoma.image}
                          alt={sintoma.title}
                          className="w-full h-[280px] object-cover"
                        />
                      </div>
                    </div>
                    <div className={isReversed ? "md:[direction:ltr]" : ""}>
                      <h3 className="font-display text-xl text-navy mb-3">{sintoma.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{sintoma.description}</p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          <AnimateOnScroll>
            <div className="text-center mt-12">
              <CTAButtons />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 7. COMO É FEITA A CIRURGIA ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">O Procedimento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Como é feita a <span className="text-gold">cirurgia de catarata</span>?
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              A técnica utilizada na Drudi e Almeida é a <strong className="text-navy">facoemulsificação</strong>, o procedimento mais moderno e seguro para a cirurgia de catarata. O procedimento geralmente ocorre em 4 etapas.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {etapasCirurgia.map((etapa) => (
              <AnimateOnScroll key={etapa.step} delay={etapa.step * 0.1}>
                <div className="bg-slate-50 rounded-2xl p-6 border border-border/40 h-full">
                  <div className="w-10 h-10 rounded-full bg-navy text-cream flex items-center justify-center font-display text-sm font-bold mb-4">
                    {etapa.step}
                  </div>
                  <h3 className="font-display text-base text-navy mb-2">{etapa.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{etapa.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8. QUANTO TEMPO DURA ========== */}
      <section className="py-12 bg-navy">
        <div className="container text-center">
          <AnimateOnScroll>
            <Clock className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl text-cream mb-4">
              Quanto tempo dura a cirurgia de catarata?
            </h2>
            <p className="font-body text-base text-cream/80 max-w-2xl mx-auto leading-relaxed">
              O procedimento é rápido, levando geralmente <strong className="text-gold">menos de 30 minutos</strong>. A maioria dos pacientes percebe uma melhora significativa na visão logo nos primeiros dias após a cirurgia.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 9. SINTOMAS PÓS-CIRURGIA ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Pós-Operatório</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Quais são os <span className="text-gold">sintomas pós-cirurgia</span> de catarata?
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              É normal apresentar alguns sintomas nos primeiros dias após a cirurgia. Conheça os mais comuns e saiba como lidar com cada um.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {sintomasPos.map((sintoma, i) => (
              <AnimateOnScroll key={i} delay={i * 0.08}>
                <div className={`rounded-2xl p-6 border ${sintoma.color} h-full`}>
                  <h3 className="font-display text-base text-navy mb-3">{sintoma.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{sintoma.description}</p>
                  <div className="bg-white/60 rounded-lg p-3">
                    <p className="font-body text-xs text-navy/80 leading-relaxed">
                      <strong>Dica:</strong> {sintoma.tip}
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 10. REPOUSO ========== */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <AnimateOnScroll className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl text-navy mb-6">
              Quanto tempo é o repouso após a cirurgia de catarata?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg text-navy mb-2">2 a 3 dias</h3>
                <p className="font-body text-sm text-muted-foreground">Atividades leves geralmente podem ser retomadas</p>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-border/40 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-lg text-navy mb-2">4 a 6 semanas</h3>
                <p className="font-body text-sm text-muted-foreground">Recuperação completa com visão estabilizada</p>
              </div>
            </div>
            <p className="font-body text-sm text-muted-foreground mt-6 leading-relaxed">
              Durante esse período, <strong className="text-navy">seguir as orientações do médico é essencial</strong> para prevenir complicações.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 11. LENTES INTRAOCULARES — PORTAL DAS LENTES ========== */}
      <section className="section-padding bg-gradient-to-br from-navy via-[#1a3a5c] to-navy relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-gold/30 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl" />
        </div>

        <div className="container relative z-10">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Lentes Intraoculares</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mt-3">
              Qual a <span className="text-gold">melhor lente</span> para você?
            </h2>
            <p className="font-body text-base text-white/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              A escolha da lente intraocular é uma das decisões mais importantes da cirurgia de catarata. Ela define como você vai enxergar pelo resto da vida.
            </p>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll>
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-8 md:p-14 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-display text-2xl md:text-3xl text-white mb-4">Portal de Lentes Intraoculares</h3>

                <p className="font-body text-base text-white/80 leading-relaxed mb-4 max-w-2xl mx-auto">
                  Existem diversos tipos de lentes intraoculares — <strong className="text-white">monofocais, multifocais, trifocais, tóricas, EDOF</strong> — e cada uma é projetada para corrigir necessidades visuais diferentes.
                </p>

                <p className="font-body text-base text-white/80 leading-relaxed mb-8 max-w-2xl mx-auto">
                  Para ajudá-lo a entender qual tecnologia pode ser mais adequada ao seu estilo de vida, desenvolvemos um <strong className="text-white">questionário personalizado de 10 perguntas</strong> que analisa suas atividades diárias, hobbies e expectativas visuais.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto">
                  {[
                    "Questionário personalizado",
                    "Recomendações por categoria",
                    "Informações completas",
                    "Apresentações visuais",
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 bg-white/5 rounded-xl p-4 border border-white/10">
                      <CheckCircle className="w-5 h-5 text-gold" />
                      <span className="font-body text-xs text-white/80 text-center">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={PORTAL_LENTES_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gold hover:bg-gold/90 text-navy font-display text-lg font-bold px-10 py-5 rounded-xl transition-all duration-300 shadow-xl shadow-gold/30 hover:shadow-2xl hover:shadow-gold/40 hover:-translate-y-1"
                >
                  <Eye className="w-6 h-6" />
                  Descobrir Minha Lente Ideal
                  <ArrowRight className="w-6 h-6" />
                </a>

                <p className="font-body text-xs text-white/50 mt-6 leading-relaxed max-w-lg mx-auto">
                  <strong className="text-white/60">Importante:</strong> Este questionário é uma ferramenta educacional. A escolha final da lente deve ser feita em consulta com seu oftalmologista.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 12. BENEFÍCIOS (ZIGZAG) ========== */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Transformação</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Benefícios da <span className="text-gold">cirurgia de catarata</span>
            </h2>
          </AnimateOnScroll>

          <div className="space-y-16 max-w-5xl mx-auto">
            {/* Benefit 1 */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-display text-xl text-navy mb-4">Recuperação da visão clara e nítida</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                    A cirurgia de catarata traz uma série de benefícios, sendo o principal deles a <strong className="text-navy">recuperação da visão clara e nítida.</strong>
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Isso permite que o paciente retome atividades que antes eram prejudicadas pela visão embaçada, como ler, dirigir ou até mesmo realizar tarefas cotidianas com mais facilidade e segurança.
                  </p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=700&q=80"
                    alt="Pessoa feliz com visão restaurada"
                    className="w-full h-[280px] object-cover"
                  />
                </div>
              </div>
            </AnimateOnScroll>

            {/* Benefit 2 */}
            <AnimateOnScroll>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center md:[direction:rtl]">
                <div className="md:[direction:ltr]">
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80"
                      alt="Pessoa no mercado escolhendo frutas"
                      className="w-full h-[280px] object-cover"
                    />
                  </div>
                </div>
                <div className="md:[direction:ltr]">
                  <h3 className="font-display text-xl text-navy mb-4">Maior autonomia e qualidade de vida</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                    Além de melhorar a qualidade de vida, a cirurgia <strong className="text-navy">promove maior autonomia,</strong> permitindo que o paciente se sinta mais independente nas ações do dia a dia.
                  </p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Ao recuperar a visão, muitos sentem uma <strong className="text-navy">renovação no bem-estar emocional e social,</strong> com mais liberdade para aproveitar as atividades que antes eram limitadas pela catarata.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 13. RISCOS ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Transparência</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Quais são os <span className="text-gold">riscos</span> da cirurgia de catarata?
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Embora a cirurgia de catarata seja bastante segura e eficaz, como qualquer procedimento médico, ela envolve alguns riscos.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {riscos.map((risco, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className={`rounded-2xl p-6 border ${risco.color} h-full`}>
                  <h3 className="font-display text-base text-navy mb-3">{risco.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{risco.description}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="bg-navy/5 rounded-2xl p-6 max-w-3xl mx-auto mt-10 text-center">
              <p className="font-body text-sm text-navy leading-relaxed">
                O segredo para reduzir esses riscos é <strong>seguir todas as orientações médicas antes, durante e após a cirurgia.</strong>
              </p>
              <p className="font-body text-sm text-muted-foreground mt-2 leading-relaxed">
                O cuidado pós-operatório adequado é essencial para garantir uma recuperação tranquila e minimizar qualquer complicação.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 14. RESULTADOS ESPERADOS ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-6">
                <span className="text-gold">Resultados esperados</span> após a cirurgia
              </h2>
              <div className="space-y-4 font-body text-base text-cream/80 leading-relaxed">
                <p>
                  Após a cirurgia, <strong className="text-cream">muitos pacientes notam uma melhora considerável na visão,</strong> com imagens mais nítidas, claras e coloridas, o que transforma o dia a dia de maneira significativa.
                </p>
                <p>
                  Atividades que antes eram desafiadoras, como ler um livro, usar o computador ou até dirigir, <strong className="text-cream">se tornam mais fáceis e seguras.</strong>
                </p>
                <p>
                  Embora os resultados possam variar de pessoa para pessoa, a <strong className="text-cream">maioria dos pacientes se sente extremamente satisfeita</strong> com as mudanças, experimentando uma sensação de liberdade e qualidade de vida renovada.
                </p>
                <p>
                  De modo geral, <strong className="text-cream">a taxa de satisfação após o procedimento é muito alta,</strong> reforçando a confiança e o sucesso dessa intervenção.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 15. CUIDADOS ANTES E APÓS ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            <AnimateOnScroll>
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Orientações</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-6">
                  <span className="text-gold">Cuidados</span> antes e após a cirurgia de catarata
                </h2>
                <div className="space-y-4 font-body text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Antes de realizar a cirurgia, o médico pode pedir <strong className="text-navy">exames específicos</strong> para avaliar a saúde dos seus olhos e garantir que tudo esteja em ordem para o procedimento.
                  </p>
                  <p>
                    Depois, seguir alguns cuidados após a cirurgia de catarata é fundamental para uma recuperação tranquila e bem-sucedida.
                  </p>
                  <p>Confira o que deve ser feito:</p>
                </div>
              </div>
            </AnimateOnScroll>

            <div className="space-y-4">
              {cuidados.map((cuidado, i) => (
                <AnimateOnScroll key={i} delay={i * 0.1}>
                  <div className={`rounded-xl p-5 border ${cuidado.color}`}>
                    <p className="font-body text-sm text-navy/80 leading-relaxed">{cuidado.text}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          <AnimateOnScroll>
            <p className="font-body text-sm text-navy text-center mt-10 max-w-2xl mx-auto leading-relaxed">
              Seguir essas orientações ajudará a garantir que o seu <strong>processo de recuperação seja o mais rápido e seguro possível.</strong>
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 16. COMO DESCOBRIR ========== */}
      <section className="py-16 bg-slate-50">
        <div className="container text-center max-w-3xl mx-auto">
          <AnimateOnScroll>
            <Eye className="w-12 h-12 text-gold mx-auto mb-5" />
            <h2 className="font-display text-2xl md:text-3xl text-navy mb-5">
              Como descobrir se eu tenho catarata?
            </h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-3">
              <strong className="text-navy">A forma mais segura é consultar um oftalmologista,</strong> que fará exames clínicos e de imagem para avaliar o cristalino e outras estruturas oculares.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Na Drudi e Almeida, contamos com equipamentos de última geração como o OCT Maestro 2 e o Pentacam AXL para um diagnóstico preciso e completo.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 17. FAQ ========== */}
      <FAQSection
        items={faqItems}
        subtitle="Tire suas dúvidas sobre a cirurgia de catarata e o pós-operatório."
      />

      {/* ========== 18. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Agende sua <span className="text-gold">consulta de avaliação</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossos especialistas em catarata estão prontos para avaliar seu caso e indicar o melhor tratamento. Recupere a clareza da sua visão com quem entende.
              </p>

              {/* Form repeated */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md mx-auto mb-8">
                <div className="space-y-4">
                  <select
                    value={selectedUnidade}
                    onChange={(e) => setSelectedUnidade(e.target.value)}
                    className="w-full bg-white text-navy font-body text-sm rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-gold"
                  >
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (
                      <option key={u.id} value={u.id}>{u.name} — {u.address}</option>
                    ))}
                  </select>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3.5 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
                  >
                    <DollarSign className="w-4 h-4" />
                    Receber Preço
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-gold font-ui text-sm font-semibold hover:text-gold-light transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Agende pelo WhatsApp
                </a>
                <a
                  href={`tel:+55${PHONE.replace(/\D/g, "")}`}
                  className="inline-flex items-center gap-2 text-cream/70 font-ui text-sm font-semibold hover:text-cream transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Ligar: {PHONE}
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
