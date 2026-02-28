/* ============================================================
   Instituto da Retina — Drudi e Almeida
   Página educativa completa — "Uma aula ao paciente"
   ============================================================ */
import { useState, useRef } from "react";
import {
  Eye, ChevronRight, Phone, MessageCircle, DollarSign,
  AlertCircle, CheckCircle, Palette, Star, MapPin, Users,
  Shield, Clock, Zap, Activity, Search, Target, CircleDot, Syringe
} from "lucide-react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";

/* ---- Image URLs ---- */
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/MozNCXrPhMWauJmt.png";
const IMG_OCT_SCAN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/iARxgYZkdHGrBNyp.png";
const IMG_INJECAO = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ZUJAJUjiWWSeRqav.png";

/* ---- Constants ---- */
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de retina.";
const PHONE_NUM = "(11) 91654-4653";

const unidades = [
  { id: "guarulhos-centro", name: "Guarulhos Centro" },
  { id: "lapa", name: "Lapa" },
  { id: "santana", name: "Santana" },
  { id: "sao-miguel", name: "São Miguel" },
  { id: "tatuape", name: "Tatuapé" },
];

/* ---- Doenças Retinianas ---- */
const doencas = [
  {
    title: "Retinopatia Diabética",
    desc: "Complicação microvascular do diabetes que afeta os vasos sanguíneos da retina. É a principal causa de cegueira em adultos em idade produtiva. Progride de formas não-proliferativas (microaneurismas, hemorragias) até a forma proliferativa com neovascularização.",
    icon: Activity,
    badge: "Mais Comum",
    detail: "Afeta 35% dos diabéticos",
  },
  {
    title: "Descolamento de Retina",
    desc: "Separação da retina neurossensorial do epitélio pigmentar. É uma emergência oftalmológica que requer tratamento urgente. Tipos: regmatogênico (mais comum — causado por rasgadura), tracional (tração vítrea) e exsudativo (acúmulo de líquido).",
    icon: AlertCircle,
    badge: "Emergência",
    detail: "Tratamento em até 24-48h",
  },
  {
    title: "Degeneração Macular (DMRI)",
    desc: "Principal causa de cegueira em idosos acima de 60 anos. A forma seca (atrófica) causa perda gradual com drusas e atrofia geográfica. A forma úmida (neovascular) causa perda rápida por vasos anormais que sangram sob a mácula.",
    icon: Eye,
    badge: "Idade > 60",
    detail: "Forma úmida: tratável com anti-VEGF",
  },
  {
    title: "Oclusões Vasculares",
    desc: "Bloqueio dos vasos sanguíneos da retina — veias (mais comum) ou artérias. A oclusão venosa causa edema e hemorragias. A oclusão arterial é uma emergência com perda súbita de visão.",
    icon: Zap,
    badge: "Vascular",
    detail: "Associada a fatores cardiovasculares",
  },
  {
    title: "Membrana Epirretiniana",
    desc: "Tecido fibroso que cresce sobre a superfície da retina, causando distorção e embaçamento visual. Também conhecida como 'celofane macular'. Quando sintomática, o tratamento é cirúrgico com vitrectomia e peeling da membrana.",
    icon: Shield,
    badge: "Cirúrgico",
    detail: "Vitrectomia com peeling",
  },
  {
    title: "Buraco Macular",
    desc: "Abertura na mácula (centro da retina) que causa perda da visão central e distorção de imagens. Mais comum em mulheres acima de 60 anos. Tratamento: vitrectomia com peeling de membrana limitante interna e tamponamento com gás.",
    icon: CircleDot,
    badge: "Cirúrgico",
    detail: "Taxa de fechamento > 90%",
  },
];

/* ---- Sintomas de Alerta ---- */
const sintomasZigzag = [
  {
    title: "Moscas Volantes (Floaters)",
    desc: "Pequenos pontos, manchas ou filamentos que parecem flutuar no campo visual, especialmente visíveis contra fundos claros. O aparecimento súbito de muitas moscas volantes pode indicar descolamento de retina.",
    img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80",
  },
  {
    title: "Flashes de Luz (Fotopsias)",
    desc: "Percepção de clarões ou relâmpagos de luz, especialmente na visão periférica. Ocorrem quando o vítreo traciona a retina. Flashes novos e frequentes são um sinal de alerta importante para descolamento de retina.",
    img: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
  },
  {
    title: "Cortina Escura na Visão",
    desc: "Sensação de uma sombra ou cortina que se move sobre o campo visual. Este é o sintoma clássico do descolamento de retina e constitui uma emergência oftalmológica.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  },
  {
    title: "Distorção de Imagens (Metamorfopsia)",
    desc: "Linhas retas parecem onduladas ou tortas. É o sintoma característico de doenças maculares como DMRI úmida, membrana epirretiniana e edema macular. O teste da grade de Amsler ajuda na autoavaliação.",
    img: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=600&q=80",
  },
  {
    title: "Perda Súbita de Visão",
    desc: "Perda repentina e indolor da visão em um olho pode indicar oclusão vascular retiniana ou hemorragia vítrea. É uma emergência médica — quanto mais rápido o tratamento, maiores as chances de recuperação.",
    img: "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?w=600&q=80",
  },
];

/* ---- Exames Diagnósticos ---- */
const examesDiagnosticos = [
  {
    title: "OCT — Tomografia de Coerência Óptica",
    desc: "Exame não-invasivo que produz cortes transversais da retina em altíssima resolução (micrômetros). Permite visualizar cada camada da retina individualmente, detectando edema macular, membranas, buracos e alterações estruturais mínimas.",
    icon: Search,
    featured: true,
  },
  {
    title: "Mapeamento de Retina",
    desc: "Exame de fundo de olho com oftalmoscopia binocular indireta. Permite visualizar toda a retina, incluindo a periferia. Fundamental para detectar rasgaduras, degenerações periféricas e descolamentos.",
    icon: Eye,
    featured: false,
  },
  {
    title: "Angiofluoresceinografia",
    desc: "Avalia a circulação retiniana com injeção endovenosa de contraste (fluoresceína). Fotografias sequenciais revelam vazamentos, áreas de isquemia e neovascularização.",
    icon: Activity,
    featured: false,
  },
  {
    title: "OCT-Angiografia (OCT-A)",
    desc: "Tecnologia de ponta que mapeia os vasos retinianos sem necessidade de injeção de contraste. Detecta neovascularização, áreas de isquemia e alterações microvasculares com precisão.",
    icon: Target,
    featured: false,
  },
  {
    title: "Retinografia Colorida",
    desc: "Fotografia de alta resolução do fundo do olho que documenta o estado da retina, nervo óptico e vasos. Serve como registro para comparação ao longo do tempo.",
    icon: CircleDot,
    featured: false,
  },
  {
    title: "Ultrassonografia Ocular (Modo B)",
    desc: "Exame de ultrassom que avalia as estruturas internas do olho quando não é possível visualizar a retina diretamente (opacidade de meios, hemorragia vítrea densa).",
    icon: Zap,
    featured: false,
  },
];

/* ---- Tratamentos ---- */
const tratamentos = [
  {
    title: "Injeções Intravítreas de Anti-VEGF",
    desc: "Revolucionaram o tratamento de doenças retinianas. Medicamentos como ranibizumabe (Lucentis), aflibercept (Eylea), bevacizumabe (Avastin) e faricimabe (Vabysmo) bloqueiam o fator de crescimento vascular, reduzindo edema e neovascularização.",
    stats: "Previnem piora em 95% dos casos de DMRI úmida",
    indications: "DMRI úmida, edema macular diabético, oclusões venosas",
    type: "Anti-VEGF",
    hasImg: true,
  },
  {
    title: "Fotocoagulação a Laser",
    desc: "Aplicação de laser na retina para selar vasos anormais, tratar rasgaduras e reduzir áreas de isquemia. A panfotocoagulação (PRP) trata a retinopatia diabética proliferativa. O laser focal/grid trata o edema macular.",
    stats: "Padrão-ouro para retinopatia diabética proliferativa",
    indications: "Retinopatia diabética, rasgaduras, degenerações periféricas",
    type: "Laser",
    hasImg: false,
  },
  {
    title: "Vitrectomia Pars Plana (PPV)",
    desc: "Cirurgia minimamente invasiva com instrumentos de calibre 23G, 25G ou 27G. Remove o vítreo e permite acesso direto à retina para reparo de descolamentos, remoção de membranas, fechamento de buracos maculares e drenagem de hemorragias.",
    stats: "Calibre 25-27G: incisões de 0,5mm sem suturas",
    indications: "Descolamento de retina, hemorragia vítrea, buraco macular, membrana epirretiniana",
    type: "Cirurgia",
    hasImg: false,
  },
  {
    title: "Introflexão Escleral (Scleral Buckle)",
    desc: "Banda de silicone posicionada ao redor do olho que empurra a parede ocular contra a retina descolada, fechando a rasgadura. Técnica clássica para descolamento regmatogênico, especialmente em pacientes jovens.",
    stats: "Taxa de sucesso: 85-95% | Preserva o cristalino",
    indications: "Descolamento regmatogênico, rasgaduras inferiores",
    type: "Cirurgia",
    hasImg: false,
  },
  {
    title: "Retinopexia Pneumática",
    desc: "Injeção de gás expansível na cavidade vítrea que tampona a rasgadura retiniana, permitindo a reabsorção do líquido sub-retiniano. Procedimento ambulatorial para descolamentos superiores simples.",
    stats: "Ambulatorial | Sem incisão",
    indications: "Descolamento regmatogênico superior com rasgadura única",
    type: "Procedimento",
    hasImg: false,
  },
];

/* ---- FAQ ---- */
const faqItems = [
  { question: "O que são moscas volantes? Devo me preocupar?", answer: "Moscas volantes são pequenos pontos ou filamentos que flutuam no campo visual, causados por condensações no vítreo. São comuns e geralmente benignos, especialmente após os 50 anos. Porém, o aparecimento súbito de muitas moscas volantes, acompanhadas de flashes de luz, pode indicar descolamento de vítreo ou rasgadura de retina. Nesse caso, procure um oftalmologista urgentemente." },
  { question: "O que é injeção intravítrea? Dói?", answer: "A injeção intravítrea é a aplicação de medicamento diretamente dentro do olho (na cavidade vítrea). É realizada em ambiente estéril com anestesia tópica (colírio anestésico). A maioria dos pacientes relata desconforto mínimo — uma leve pressão, mas não dor. O procedimento dura poucos minutos." },
  { question: "Quantas injeções de anti-VEGF vou precisar?", answer: "O número varia conforme a doença e a resposta individual. Para DMRI úmida, geralmente inicia-se com 3 injeções mensais (fase de ataque) seguidas de intervalos progressivamente maiores (treat-and-extend). O acompanhamento com OCT guia as decisões de retratamento." },
  { question: "Descolamento de retina é uma emergência?", answer: "Sim! O descolamento de retina é uma emergência oftalmológica. Quanto mais rápido o tratamento (idealmente em 24-48 horas), maiores as chances de preservar a visão. Se notar flashes de luz, muitas moscas volantes novas ou uma sombra/cortina no campo visual, procure atendimento imediatamente." },
  { question: "Diabético precisa fazer exame de fundo de olho?", answer: "Sim, obrigatoriamente. Todo paciente diabético deve fazer mapeamento de retina pelo menos uma vez por ano, mesmo sem sintomas visuais. A retinopatia diabética pode estar presente sem causar sintomas nos estágios iniciais." },
  { question: "O que é DMRI e como prevenir?", answer: "A Degeneração Macular Relacionada à Idade (DMRI) é o envelhecimento da mácula. Fatores de prevenção: não fumar, dieta rica em vegetais verdes e peixes, uso de óculos de sol com proteção UV, suplementos AREDS2 (para quem já tem DMRI intermediária) e controle de pressão arterial e colesterol." },
  { question: "A vitrectomia é uma cirurgia segura?", answer: "Sim, a vitrectomia moderna é um procedimento seguro e eficaz. Com instrumentos de calibre 25-27G (0,5mm), as incisões são auto-selantes, sem necessidade de suturas. A taxa de complicações graves é baixa. A maioria dos pacientes retorna às atividades normais em 2-4 semanas." },
  { question: "Qual a diferença entre DMRI seca e úmida?", answer: "A DMRI seca (90% dos casos) progride lentamente com acúmulo de drusas e atrofia. Não tem tratamento específico, mas suplementos AREDS2 podem retardar a progressão. A DMRI úmida (10%) é mais agressiva — vasos anormais crescem sob a retina e vazam sangue/líquido. É tratável com injeções de anti-VEGF." },
  { question: "Posso ficar cego por retinopatia diabética?", answer: "Se não tratada, sim. A retinopatia diabética é a principal causa de cegueira em adultos em idade produtiva. Porém, com controle glicêmico adequado (HbA1c < 7%), exames regulares e tratamento oportuno (laser, anti-VEGF), a grande maioria dos pacientes mantém visão funcional." },
  { question: "O que é a grade de Amsler?", answer: "A grade de Amsler é um teste simples de autoavaliação que detecta distorções na visão central. É uma folha quadriculada com um ponto central. Linhas onduladas, manchas ou áreas faltantes podem indicar doença macular. Pacientes com DMRI devem fazer este teste semanalmente em casa." },
];

export default function InstitutoRetina() {
  const [selectedUnidade, setSelectedUnidade] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);

  return (
    <>
      <SEOHead
        title="Instituto da Retina — Retina Cirúrgica em SP"
        description="Tratamentos avançados para doenças da retina: vitrectomia, injeções intravítreas, retinopatia diabética. Dr. Fernando Drudi, especialista em retina cirúrgica."
        keywords="retina cirúrgica SP, vitrectomia São Paulo, retinopatia diabética, descolamento de retina, injeção intravítrea, oftalmologista retina"
        canonicalPath="/instituto/retina"
      />
      {/* ========== 1. HERO WITH PARALLAX ========== */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${HERO_ART_IMG})`, y: heroImageY, scale: heroImageScale }} />
        <motion.div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" style={{ opacity: heroOverlayOpacity }} />
        <div className="relative container py-20">
          <div className="max-w-2xl">

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DA RETINA</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6">
              Retina: tratamentos avançados para{" "}
              <span className="text-gold italic">preservar cada detalhe</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl">
              A retina é responsável por transformar luz em visão. Selecione sua unidade e receba informações sobre diagnóstico e tratamento com nossos especialistas.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="font-ui text-xs font-semibold tracking-wider uppercase text-cream/60 mb-2 block">Unidade</label>
                  <select value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)} className="w-full bg-white text-navy font-body text-sm rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-gold">
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (<option key={u.id} value={u.id}>{u.name}</option>))}
                  </select>
                </div>
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3.5 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20">
                  <DollarSign className="w-4 h-4" />Receber Preço
                </a>
                <a href={`tel:+55${PHONE_NUM.replace(/\D/g, "")}`} className="w-full inline-flex items-center justify-center gap-2 font-ui text-sm font-semibold px-6 py-3 rounded-lg border border-cream/30 text-cream hover:bg-cream/10 transition-all">
                  <Phone className="w-4 h-4" />Ligar: {PHONE_NUM}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== 2. AVALIAÇÕES ========== */}
      <section className="py-8 bg-white border-b border-border/40">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-gold text-gold" />))}</div>
              <span className="font-body text-sm text-navy font-semibold">4,9 no Google</span>
            </div>
            <div className="h-5 w-px bg-border/60" />
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /><span className="font-body text-sm text-navy font-semibold">5 Unidades</span></div>
            <div className="h-5 w-px bg-border/60" />
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-gold" /><span className="font-body text-sm text-navy font-semibold">+10 anos de experiência</span></div>
            <div className="h-5 w-px bg-border/60" />
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gold" /><span className="font-body text-sm text-navy font-semibold">Dr. Fernando Drudi — Retina Cirúrgica</span></div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É A RETINA ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimateOnScroll direction="left">
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Estrutura</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é a Retina?</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  A retina é uma <strong className="text-navy">fina camada de tecido nervoso</strong> que reveste a parte interna do olho, como o filme de uma câmera fotográfica. Ela contém milhões de células fotorreceptoras (cones e bastonetes) que captam a luz e a transformam em sinais elétricos enviados ao cérebro pelo nervo óptico.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  A <strong className="text-navy">mácula</strong> é a região central da retina, responsável pela visão de detalhes, leitura e reconhecimento de rostos. A <strong className="text-navy">fóvea</strong>, no centro da mácula, é o ponto de maior acuidade visual.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Doenças retinianas podem causar perda visual severa e até cegueira se não tratadas a tempo. O diagnóstico precoce e os avanços em tratamentos como injeções de anti-VEGF e vitrectomia moderna transformaram o prognóstico dessas condições.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div className="relative">
                <img src={IMG_OCT_SCAN} alt="OCT — Tomografia de Coerência Óptica da retina" className="rounded-2xl shadow-xl w-full" />
                <div className="absolute -bottom-4 -left-4 bg-navy text-cream rounded-xl p-4 shadow-lg max-w-[200px]">
                  <p className="font-ui text-xs font-semibold text-gold mb-1">OCT de Alta Resolução</p>
                  <p className="font-body text-xs text-cream/80">Visualização das camadas retinianas em micrômetros</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 4. DOENÇAS RETINIANAS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Condições Tratadas</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Doenças Retinianas</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Nosso instituto trata todas as principais doenças que afetam a retina e o vítreo.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {doencas.map((d, i) => (
              <AnimateOnScroll key={d.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <d.icon className="w-5 h-5 text-gold" />
                    </div>
                    <span className="inline-block bg-gold/10 text-gold font-ui text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">{d.badge}</span>
                  </div>
                  <h3 className="font-display text-lg text-navy mb-2">{d.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{d.desc}</p>
                  <div className="bg-cream/80 rounded-lg p-3">
                    <p className="font-body text-xs text-navy/70 font-medium">{d.detail}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. SINTOMAS ZIGZAG ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Sinais de Alerta</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Quando Procurar um Retinólogo?</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Estes sintomas podem indicar problemas retinianos que requerem avaliação urgente:</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="space-y-16 max-w-5xl mx-auto">
            {sintomasZigzag.map((s, i) => (
              <AnimateOnScroll key={s.title} direction={i % 2 === 0 ? "left" : "right"}>
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${i % 2 !== 0 ? "md:[direction:rtl] md:*:[direction:ltr]" : ""}`}>
                  <div className="rounded-2xl overflow-hidden shadow-lg">
                    <img src={s.img} alt={s.title} className="w-full h-64 object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center font-display text-sm text-gold font-bold">{i + 1}</span>
                      <h3 className="font-display text-xl text-navy">{s.title}</h3>
                    </div>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                    {i === 2 && (
                      <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                        <p className="font-body text-xs text-red-700">Emergência oftalmológica — procure atendimento imediato!</p>
                      </div>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. EXAMES DIAGNÓSTICOS ========== */}
      <section className="section-padding bg-navy text-cream">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Diagnóstico</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3">Exames Diagnósticos</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4">Contamos com equipamentos de última geração para diagnóstico preciso de todas as doenças retinianas.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          {/* OCT Featured */}
          <AnimateOnScroll className="mb-10">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <img src={IMG_OCT_SCAN} alt="OCT Retina" className="w-full h-64 md:h-full object-cover" />
                <div className="p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <Search className="w-5 h-5 text-gold" />
                    <h3 className="font-display text-xl text-cream">{examesDiagnosticos[0].title}</h3>
                  </div>
                  <p className="font-body text-sm text-cream/70 leading-relaxed">{examesDiagnosticos[0].desc}</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Outros exames */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
            {examesDiagnosticos.slice(1).map((exame, i) => (
              <AnimateOnScroll key={exame.title} delay={i * 0.05}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-cream/10 hover:border-gold/30 transition-all h-full">
                  <exame.icon className="w-5 h-5 text-gold mb-3" />
                  <h4 className="font-display text-sm text-cream mb-2">{exame.title}</h4>
                  <p className="font-body text-xs text-cream/60 leading-relaxed">{exame.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 7. TRATAMENTOS ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamentos</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tratamentos para Doenças Retinianas</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Do tratamento clínico à cirurgia de ponta, oferecemos todas as opções terapêuticas para doenças da retina.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="space-y-8 max-w-5xl mx-auto">
            {tratamentos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all overflow-hidden">
                  <div className={`grid grid-cols-1 ${t.hasImg ? "md:grid-cols-5" : ""} gap-0`}>
                    {t.hasImg && <img src={IMG_INJECAO} alt={t.title} className="w-full h-64 md:h-full object-cover md:col-span-2" />}
                    <div className={`p-6 ${t.hasImg ? "md:col-span-3" : ""}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-block bg-navy text-cream font-ui text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">{t.type}</span>
                      </div>
                      <h3 className="font-display text-xl text-navy mb-3">{t.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{t.desc}</p>
                      <div className="bg-gold/5 rounded-lg p-3 mb-3">
                        <p className="font-body text-xs text-navy/80">{t.stats}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                        <p className="font-body text-xs text-muted-foreground"><strong className="text-navy">Indicações:</strong> {t.indications}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8. ARTE E VISÃO — DEGAS ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">Degas e a Degeneração Retiniana</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.degasDancers} alt="Edgar Degas - Bailarinas" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div>
                <h3 className="font-display text-2xl text-cream mb-4">Edgar Degas — Quando a Retina Muda a Arte</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  Edgar Degas, o mestre das bailarinas, sofria de <strong className="text-gold">degeneração retiniana progressiva</strong> que começou por volta dos 36 anos. À medida que sua visão central deteriorava, suas obras passaram por uma transformação dramática.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  As pinceladas precisas de suas primeiras obras deram lugar a <strong className="text-gold">traços mais largos, cores mais vibrantes e formas mais abstratas</strong>. Degas migrou da pintura a óleo para o pastel, que permitia trabalhar com menos precisão visual.
                </p>
                <div className="bg-gold/10 rounded-xl p-5 border border-gold/20 mt-6">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-display text-base text-cream mb-2">A Retina e a Percepção</h4>
                      <p className="font-body text-sm text-cream/70 leading-relaxed">
                        Doenças retinianas como DMRI e retinopatia diabética afetam a visão central — exatamente o que usamos para ler, reconhecer rostos e apreciar detalhes. Hoje, com anti-VEGF e vitrectomia, podemos preservar o que Degas perdeu.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 9. NOSSAS CLÍNICAS ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Perto de Você</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">Nossas Clínicas</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              5 unidades na Grande São Paulo com o mesmo padrão de excelência e tecnologia de ponta.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Guarulhos Centro", city: "Guarulhos - SP", description: "Atendimento completo com equipamentos de última geração e equipe especializada.", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/clinica_guarulhos_8e7690c7.png" },
              { name: "Lapa", city: "São Paulo - SP", description: "Infraestrutura moderna e fácil acesso, com o mesmo padrão de excelência.", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/consultorio_lapa_be866546.png" },
              { name: "Santana", city: "São Paulo - SP", description: "Zona norte de São Paulo, atendimento humanizado com fácil acesso pelo metrô.", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v1_3860a616.png" },
              { name: "São Miguel", city: "São Paulo - SP", description: "Atende a zona leste com a mesma qualidade e tecnologia de todas as nossas clínicas.", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v4_0b2982e6.png" },
              { name: "Tatuapé", city: "São Paulo - SP", description: "Infraestrutura completa e equipe altamente qualificada na zona leste.", image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v3_5717e0c0.png" },
            ].map((clinica, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
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

      {/* ========== 10. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre doenças retinianas e seus tratamentos." />

      {/* ========== 10. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Cuide da sua retina — <span className="text-gold">agende sua avaliação</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                O Dr. Fernando Drudi, especialista em retina cirúrgica, e toda a equipe estão prontos para avaliar seu caso com os equipamentos mais modernos.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md mx-auto mb-8">
                <div className="space-y-4">
                  <select value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)} className="w-full bg-white text-navy font-body text-sm rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-gold">
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (<option key={u.id} value={u.id}>{u.name}</option>))}
                  </select>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3.5 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20">
                    <DollarSign className="w-4 h-4" />Receber Preço
                  </a>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold font-ui text-sm font-semibold hover:text-gold-light transition-colors">
                  <MessageCircle className="w-4 h-4" />Agende pelo WhatsApp
                </a>
                <a href={`tel:+55${PHONE_NUM.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-cream/70 font-ui text-sm font-semibold hover:text-cream transition-colors">
                  <Phone className="w-4 h-4" />Ligar: {PHONE_NUM}
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
