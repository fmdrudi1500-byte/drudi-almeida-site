/* ============================================================
   Instituto do Estrabismo — Drudi e Almeida
   Página educativa completa — "Uma aula ao paciente"
   ============================================================ */
import { useState, useRef } from "react";
import {
  Eye, ChevronRight, Phone, MessageCircle, DollarSign,
  AlertCircle, CheckCircle, Palette, Star, MapPin, Users,
  Shield, Clock, Zap, Activity, Search, Target, Baby,
  Scissors, Glasses, Heart, ArrowRight
} from "lucide-react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import { IMAGES } from "@/lib/images";

/* ---- Image URLs ---- */
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ibNQCeyYILJFGyuH.png";
const IMG_TESTE_COBERTURA = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/IVfNepWlZgwuKTFO.png";

/* ---- Constants ---- */
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de estrabismo.";
const PHONE_NUM = "(11) 91654-4653";

const unidades = [
  { id: "jundiai", name: "Jundiaí", address: "Jundiaí - SP" },
  { id: "santana", name: "Santana (São Paulo)", address: "São Paulo - SP" },
];

/* ---- Tipos de Estrabismo ---- */
const tiposEstrabismo = [
  {
    title: "Esotropia",
    subtitle: "Olho desvia para dentro",
    desc: "Tipo mais comum em crianças. Pode ser infantil (antes dos 6 meses), acomodativa (causada por hipermetropia) ou adquirida. A esotropia acomodativa pode ser corrigida com óculos; as demais geralmente requerem cirurgia.",
    icon: "→←",
    badge: "Mais Comum",
  },
  {
    title: "Exotropia",
    subtitle: "Olho desvia para fora",
    desc: "Mais comum em adultos e na forma intermitente (aparece e desaparece). A exotropia intermitente pode ser tratada com exercícios ortópticos inicialmente. A forma constante geralmente requer cirurgia.",
    icon: "←→",
    badge: "Adultos",
  },
  {
    title: "Hipertropia / Hipotropia",
    subtitle: "Olho desvia para cima ou para baixo",
    desc: "Desvio vertical dos olhos. Frequentemente causado por paralisia do IV nervo craniano (oblíquo superior). Pode causar torcicolo compensatório — a criança inclina a cabeça para compensar o desvio.",
    icon: "↑↓",
    badge: "Vertical",
  },
  {
    title: "Estrabismo Paralítico",
    subtitle: "Causado por paralisia de nervos",
    desc: "Resulta da paralisia dos nervos cranianos III, IV ou VI que controlam os músculos oculares. Causas: AVC, trauma, diabetes, tumores. Pode ser tratado com prismas, toxina botulínica ou cirurgia.",
    icon: "⊘",
    badge: "Neurológico",
  },
  {
    title: "Estrabismo Restritivo",
    subtitle: "Restrição mecânica do movimento",
    desc: "O olho não se move livremente por restrição mecânica. Causas: doença de Graves (tireoide), fraturas orbitárias, fibrose muscular. Inclui a Síndrome de Duane e Síndrome de Brown.",
    icon: "⊗",
    badge: "Restritivo",
  },
];

/* ---- Sintomas por Faixa Etária ---- */
const sintomasCriancas = [
  { title: "Olhos desalinhados", desc: "Um ou ambos os olhos desviam para dentro, fora, cima ou baixo. Pode ser constante ou intermitente." },
  { title: "Fechar um olho na luz", desc: "Criança fecha um olho ao sol ou em ambientes iluminados — sinal clássico de exotropia intermitente." },
  { title: "Inclinar a cabeça", desc: "Torcicolo compensatório — a criança inclina a cabeça para usar os dois olhos juntos e evitar visão dupla." },
  { title: "Dificuldade escolar", desc: "Problemas de leitura, dificuldade de concentração e desempenho escolar abaixo do esperado podem estar relacionados ao estrabismo." },
  { title: "Ambliopia (olho preguiçoso)", desc: "O cérebro 'desliga' a imagem do olho desviado, causando perda de visão que pode se tornar permanente se não tratada antes dos 6-8 anos." },
];

const sintomasAdultos = [
  { title: "Visão dupla (diplopia)", desc: "Ver duas imagens do mesmo objeto. É o sintoma mais comum em adultos com estrabismo adquirido." },
  { title: "Fadiga visual", desc: "Cansaço nos olhos, dor de cabeça e dificuldade de concentração, especialmente em leitura e uso de computador." },
  { title: "Dificuldade social", desc: "Constrangimento no contato visual, impacto na autoestima e nas relações interpessoais e profissionais." },
  { title: "Perda de profundidade", desc: "Dificuldade em julgar distâncias — problemas ao estacionar, praticar esportes ou descer escadas." },
];

/* ---- Exames Diagnósticos ---- */
const exames = [
  { title: "Cover Test (Teste de Cobertura)", desc: "Teste fundamental que detecta e diferencia desvios manifestos (tropias) de desvios latentes (forias). Cobre-se um olho e observa-se o movimento do outro.", icon: Eye },
  { title: "Teste de Hirschberg", desc: "Avalia o reflexo de luz na córnea para estimar o ângulo de desvio. Cada milímetro de descentração corresponde a aproximadamente 15 dioptrias prismáticas.", icon: Target },
  { title: "Medida com Prismas", desc: "Quantifica o desvio com precisão usando barras de prismas ou prismas soltos. Essencial para planejar a cirurgia e determinar a quantidade de correção necessária.", icon: Search },
  { title: "Teste de Ducções e Versões", desc: "Avalia os movimentos oculares em todas as posições do olhar (9 posições). Detecta limitações, hiperfunções e padrões de incomitância.", icon: Activity },
  { title: "Avaliação Sensorial", desc: "Teste de Worth (4 pontos), teste de Titmus/Lang para estereoacuidade. Avalia fusão binocular, supressão e correspondência retiniana.", icon: Glasses },
  { title: "Refração sob Cicloplegia", desc: "Medida do grau com dilatação pupilar. Fundamental em crianças para detectar hipermetropia oculta que pode causar esotropia acomodativa.", icon: Zap },
];

/* ---- Tratamentos ---- */
const tratamentos = [
  {
    title: "Correção Óptica (Óculos)",
    desc: "Primeiro passo no tratamento. Óculos com correção de hipermetropia podem eliminar completamente a esotropia acomodativa. Lentes prismáticas compensam desvios pequenos. Bifocais são usados em esotropia acomodativa com excesso de convergência.",
    icon: Glasses,
    type: "Clínico",
    detail: "Pode resolver 100% da esotropia acomodativa",
  },
  {
    title: "Tratamento da Ambliopia",
    desc: "Oclusão (tampão) do olho bom por 2 a 6+ horas/dia para estimular o olho amblíope. Alternativa: atropina 1% no olho bom (penalização farmacológica). O tratamento é mais eficaz antes dos 6-8 anos, mas pode ter benefício até a adolescência.",
    icon: Shield,
    type: "Clínico",
    detail: "Período crítico: antes dos 6-8 anos",
  },
  {
    title: "Exercícios Ortópticos",
    desc: "Exercícios de convergência e terapia visual computadorizada. Indicados principalmente para exotropia intermitente e insuficiência de convergência. Melhoram o controle da fusão binocular e podem adiar ou evitar a cirurgia.",
    icon: Activity,
    type: "Terapia",
    detail: "Especialmente eficaz na exotropia intermitente",
  },
  {
    title: "Toxina Botulínica (Botox)",
    desc: "Injeção de toxina botulínica no músculo extraocular para enfraquecê-lo temporariamente. Alternativa à cirurgia em casos selecionados: estrabismo paralítico agudo, desvios pequenos, pacientes que não podem operar. Efeito dura 3-6 meses.",
    icon: Zap,
    type: "Procedimento",
    detail: "Efeito temporário: 3-6 meses",
  },
  {
    title: "Cirurgia de Estrabismo",
    desc: "Procedimento definitivo realizado nos músculos extraoculares. Técnicas: recessão (enfraquece), ressecção (fortalece), plicatura (fortalece sem cortar), transposição (para paralisias) e suturas ajustáveis (permite ajuste fino pós-operatório com resultados superiores).",
    icon: Scissors,
    type: "Cirurgia",
    detail: "Taxa de sucesso: 60-90% na primeira cirurgia",
  },
];

/* ---- Etapas da Cirurgia ---- */
const etapasCirurgia = [
  { step: "1", title: "Avaliação Pré-operatória", desc: "Medida precisa do desvio em todas as posições do olhar, avaliação sensorial e planejamento cirúrgico individualizado." },
  { step: "2", title: "Anestesia", desc: "Anestesia geral em crianças. Em adultos, pode ser local com sedação, permitindo o uso de suturas ajustáveis." },
  { step: "3", title: "Procedimento", desc: "Incisão na conjuntiva para acessar os músculos extraoculares. Recessão, ressecção ou plicatura conforme o planejamento. Duração: 30-60 minutos." },
  { step: "4", title: "Recuperação", desc: "Alta no mesmo dia. Desconforto leve por 3-5 dias. Colírios por 2-4 semanas. Retorno às atividades em 1-2 semanas. Resultado final em 4-6 semanas." },
];

/* ---- FAQ ---- */
const faqItems = [
  { question: "Com que idade pode operar estrabismo?", answer: "A cirurgia pode ser realizada em qualquer idade. Em crianças com esotropia infantil, a cirurgia precoce (antes dos 2 anos) melhora as chances de desenvolvimento da visão binocular. Em adultos, nunca é tarde para operar — a cirurgia melhora a qualidade de vida em todas as idades." },
  { question: "Estrabismo em adulto tem tratamento?", answer: "Sim! Estrabismo em adultos é tratável e a cirurgia é segura e eficaz. Além de melhorar a estética, pode restaurar a visão binocular, eliminar a visão dupla e melhorar significativamente a qualidade de vida, autoestima e interações sociais e profissionais." },
  { question: "Meu filho tem 'olho preguiçoso'. O que fazer?", answer: "O 'olho preguiçoso' (ambliopia) é a redução da visão causada pelo estrabismo. O tratamento envolve correção óptica (óculos), oclusão do olho bom (tampão) e, quando necessário, cirurgia do estrabismo. O tratamento é mais eficaz antes dos 6-8 anos — quanto mais cedo, melhor o resultado." },
  { question: "A cirurgia de estrabismo é definitiva?", answer: "Na maioria dos casos, sim. A taxa de sucesso na primeira cirurgia é de 60-90%. Alguns pacientes podem precisar de reoperação (10-30%), especialmente em estrabismos complexos. O uso de suturas ajustáveis melhora os resultados, permitindo ajuste fino no pós-operatório." },
  { question: "O estrabismo pode voltar depois da cirurgia?", answer: "Em alguns casos, pode haver recorrência parcial do desvio ao longo dos anos, especialmente em crianças em crescimento. Por isso, o acompanhamento a longo prazo é importante. Se necessário, uma segunda cirurgia pode ser realizada." },
  { question: "Óculos podem corrigir o estrabismo?", answer: "Sim, em alguns tipos. A esotropia acomodativa (causada por hipermetropia) pode ser completamente corrigida com óculos. Lentes prismáticas podem compensar desvios pequenos. Porém, a maioria dos estrabismos requer cirurgia para correção definitiva." },
  { question: "Estrabismo é hereditário?", answer: "Existe predisposição genética. Se um dos pais tem estrabismo, o risco para os filhos é maior. Porém, nem sempre é hereditário — pode ser causado por erro refrativo, paralisia de nervos, trauma ou doenças sistêmicas. Exame oftalmológico precoce é recomendado para filhos de pais com estrabismo." },
  { question: "A cirurgia de estrabismo dói?", answer: "O procedimento é realizado sob anestesia (geral em crianças, local com sedação em adultos). No pós-operatório, há desconforto leve a moderado por 3-5 dias, controlado com analgésicos comuns e colírios. A maioria dos pacientes descreve como 'sensação de areia no olho'." },
  { question: "Quando devo levar meu filho ao oftalmologista?", answer: "O primeiro exame oftalmológico deve ser feito entre 6 meses e 1 ano de idade. Se notar qualquer desalinhamento dos olhos, fechar um olho na luz, inclinar a cabeça ou dificuldade visual, procure um oftalmologista imediatamente, independentemente da idade." },
  { question: "O que são suturas ajustáveis?", answer: "Técnica cirúrgica em que os pontos são deixados acessíveis para ajuste fino no pós-operatório (geralmente no dia seguinte). Permite correção mais precisa do desvio. Especialmente útil em reoperações e estrabismos restritivos. Resultados estatisticamente melhores que suturas convencionais." },
];

export default function InstitutoEstrabismo() {
  const [selectedUnidade, setSelectedUnidade] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);

  return (
    <>
      {/* ========== 1. HERO WITH PARALLAX ========== */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center overflow-hidden">
        <motion.div className="absolute inset-0 bg-cover bg-center will-change-transform" style={{ backgroundImage: `url(${HERO_ART_IMG})`, y: heroImageY, scale: heroImageScale }} />
        <motion.div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent" style={{ opacity: heroOverlayOpacity }} />
        <div className="relative container py-20">
          <div className="max-w-2xl">
            <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">Instituto do Estrabismo</span>
            </motion.nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DO ESTRABISMO</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6">
              Estrabismo: <span className="text-gold italic">alinhamento perfeito</span> para olhos e autoestima
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl">
              Tratamento especializado para crianças e adultos. Selecione sua unidade e receba informações sobre diagnóstico e cirurgia de estrabismo.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md">
              <div className="space-y-4">
                <div>
                  <label className="font-ui text-xs font-semibold tracking-wider uppercase text-cream/60 mb-2 block">Unidade</label>
                  <select value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)} className="w-full bg-white text-navy font-body text-sm rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-gold">
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (<option key={u.id} value={u.id}>{u.name} — {u.address}</option>))}
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
              <span className="font-body text-sm text-muted-foreground">Avaliação Google</span>
            </div>
            <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gold" /><span className="font-body text-sm text-navy font-semibold">2 Unidades</span></div>
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gold" /><span className="font-body text-sm text-navy font-semibold">Crianças e Adultos</span></div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É ESTRABISMO ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimateOnScroll direction="left">
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é Estrabismo?</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  O estrabismo é o <strong className="text-navy">desalinhamento dos olhos</strong> — um ou ambos os olhos desviam da posição normal, impedindo que ambos apontem para o mesmo objeto simultaneamente. Pode ser constante ou intermitente e afeta cerca de 4% da população.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  Em <strong className="text-navy">crianças</strong>, o estrabismo pode causar <strong className="text-navy">ambliopia</strong> (olho preguiçoso) — o cérebro "desliga" a imagem do olho desviado, causando perda de visão que pode se tornar permanente se não tratada antes dos 6-8 anos.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Em <strong className="text-navy">adultos</strong>, causa visão dupla (diplopia), fadiga visual e impacto significativo na autoestima e qualidade de vida. A boa notícia: <strong className="text-navy">nunca é tarde para tratar</strong>.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div className="relative">
                <img src={IMG_TESTE_COBERTURA} alt="Teste de cobertura em criança — diagnóstico de estrabismo" className="rounded-2xl shadow-xl w-full" />
                <div className="absolute -bottom-4 -left-4 bg-navy text-cream rounded-xl p-4 shadow-lg max-w-[220px]">
                  <p className="font-ui text-xs font-semibold text-gold mb-1">Diagnóstico Precoce</p>
                  <p className="font-body text-xs text-cream/80">Primeiro exame: entre 6 meses e 1 ano de idade</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 4. TIPOS DE ESTRABISMO ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Classificação</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tipos de Estrabismo</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">O estrabismo é classificado pela direção do desvio e pela causa subjacente.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tiposEstrabismo.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.08} className={i >= 3 ? "lg:col-span-1" : ""}>
                <div className="bg-white rounded-xl p-6 border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy flex items-center justify-center shrink-0">
                      <span className="text-gold font-bold text-sm">{t.icon}</span>
                    </div>
                    <span className="inline-block bg-gold/10 text-gold font-ui text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">{t.badge}</span>
                  </div>
                  <h3 className="font-display text-lg text-navy mb-1">{t.title}</h3>
                  <p className="font-ui text-xs text-gold mb-2">{t.subtitle}</p>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">{t.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. SINTOMAS — CRIANÇAS vs ADULTOS ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Sinais de Alerta</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Sintomas por Faixa Etária</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Crianças */}
            <AnimateOnScroll direction="left">
              <div className="bg-white rounded-2xl border border-border/60 overflow-hidden h-full">
                <div className="bg-navy p-6">
                  <div className="flex items-center gap-3">
                    <Baby className="w-6 h-6 text-gold" />
                    <h3 className="font-display text-xl text-cream">Em Crianças</h3>
                  </div>
                  <p className="font-body text-sm text-cream/70 mt-2">Fique atento a estes sinais desde os primeiros meses</p>
                </div>
                <div className="p-6 space-y-4">
                  {sintomasCriancas.map((s, i) => (
                    <div key={s.title} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="font-display text-xs text-gold font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-display text-sm text-navy mb-0.5">{s.title}</h4>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start gap-2 mt-4">
                    <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                    <p className="font-body text-xs text-red-700">Ambliopia pode ser irreversível após os 6-8 anos. Diagnóstico precoce é essencial!</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            {/* Adultos */}
            <AnimateOnScroll direction="right">
              <div className="bg-white rounded-2xl border border-border/60 overflow-hidden h-full">
                <div className="bg-navy p-6">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-gold" />
                    <h3 className="font-display text-xl text-cream">Em Adultos</h3>
                  </div>
                  <p className="font-body text-sm text-cream/70 mt-2">Nunca é tarde para tratar — melhora a qualidade de vida</p>
                </div>
                <div className="p-6 space-y-4">
                  {sintomasAdultos.map((s, i) => (
                    <div key={s.title} className="flex gap-3">
                      <div className="w-6 h-6 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="font-display text-xs text-gold font-bold">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-display text-sm text-navy mb-0.5">{s.title}</h4>
                        <p className="font-body text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                  <div className="bg-gold/5 border border-gold/20 rounded-lg p-3 flex items-start gap-2 mt-4">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <p className="font-body text-xs text-navy/70">A cirurgia em adultos é segura, eficaz e melhora significativamente a autoestima.</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 6. EXAMES DIAGNÓSTICOS ========== */}
      <section className="section-padding bg-navy text-cream">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Diagnóstico</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3">Exames Diagnósticos</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4">A avaliação completa do estrabismo envolve uma série de testes especializados para determinar o tipo, grau e causa do desvio.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {exames.map((e, i) => (
              <AnimateOnScroll key={e.title} delay={i * 0.06}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-cream/10 hover:border-gold/30 transition-all h-full">
                  <e.icon className="w-5 h-5 text-gold mb-3" />
                  <h4 className="font-display text-base text-cream mb-2">{e.title}</h4>
                  <p className="font-body text-sm text-cream/60 leading-relaxed">{e.desc}</p>
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Opções de Tratamento</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">O tratamento é individualizado e pode incluir óculos, terapia visual, toxina botulínica e/ou cirurgia.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="space-y-6 max-w-4xl mx-auto">
            {tratamentos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all p-6">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <t.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h3 className="font-display text-lg text-navy">{t.title}</h3>
                        <span className="inline-block bg-navy text-cream font-ui text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">{t.type}</span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{t.desc}</p>
                      <div className="bg-gold/5 rounded-lg p-3">
                        <p className="font-body text-xs text-navy/80 font-medium">{t.detail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8. ETAPAS DA CIRURGIA ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Cirurgia</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Como é a Cirurgia de Estrabismo?</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {etapasCirurgia.map((e, i) => (
              <AnimateOnScroll key={e.step} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-border/60 text-center h-full relative">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center mx-auto mb-4">
                    <span className="font-display text-lg text-gold font-bold">{e.step}</span>
                  </div>
                  <h4 className="font-display text-base text-navy mb-2">{e.title}</h4>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{e.desc}</p>
                  {i < 3 && <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gold z-10" />}
                </div>
              </AnimateOnScroll>
            ))}
          </div>
          {/* Técnicas Cirúrgicas */}
          <AnimateOnScroll className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl border border-border/60 p-8">
              <h3 className="font-display text-xl text-navy mb-6 text-center">Técnicas Cirúrgicas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: "Recessão Muscular", desc: "Enfraquece o músculo movendo sua inserção para trás. Indicada para músculos hiperativos." },
                  { name: "Ressecção Muscular", desc: "Fortalece o músculo encurtando-o. Indicada para músculos hipoativos." },
                  { name: "Plicatura Muscular", desc: "Fortalece o músculo dobrando-o, sem cortar. Técnica menos invasiva com recuperação mais rápida." },
                  { name: "Transposição Muscular", desc: "Redireciona músculos para compensar paralisias. Indicada em paralisia do VI nervo." },
                  { name: "Suturas Ajustáveis", desc: "Permite ajuste fino no pós-operatório. Resultados estatisticamente superiores às suturas convencionais." },
                  { name: "Cirurgia MISS", desc: "Cirurgia minimamente invasiva com incisões menores, menos inflamação e recuperação mais rápida." },
                ].map((t) => (
                  <div key={t.name} className="flex gap-3 p-3 rounded-lg bg-cream/30">
                    <Scissors className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-display text-sm text-navy mb-0.5">{t.name}</h4>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 9. ESTRABISMO INFANTIL vs ADULTO ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Para Todas as Idades</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Estrabismo Infantil e Adulto</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <AnimateOnScroll direction="left">
              <div className="bg-white rounded-2xl border border-border/60 p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <Baby className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl text-navy mb-4">Estrabismo Infantil</h3>
                <ul className="space-y-3">
                  {[
                    "Diagnóstico precoce é crucial — antes dos 6 anos",
                    "Período crítico de desenvolvimento visual",
                    "Ambliopia pode ser irreversível se não tratada a tempo",
                    "Cirurgia precoce melhora desenvolvimento binocular",
                    "Primeiro exame: entre 6 meses e 1 ano de idade",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div className="bg-white rounded-2xl border border-border/60 p-8 h-full">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl text-navy mb-4">Estrabismo em Adultos</h3>
                <ul className="space-y-3">
                  {[
                    "Nunca é tarde para tratar — cirurgia em qualquer idade",
                    "Melhora qualidade de vida, autoestima e interação social",
                    "Cirurgia segura e eficaz em todas as idades",
                    "Pode restaurar visão binocular em alguns casos",
                    "Suturas ajustáveis permitem resultado mais preciso",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="font-body text-sm text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 10. ARTE E VISÃO — REMBRANDT ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">Rembrandt e o Estrabismo</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.rembrandtSelfPortrait} alt="Rembrandt - Autorretrato" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div>
                <h3 className="font-display text-2xl text-cream mb-4">Rembrandt — O Mestre com Olhos Desalinhados</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  Pesquisadores da Universidade de Harvard analisaram 36 autorretratos de Rembrandt e descobriram evidências de <strong className="text-gold">exotropia</strong> — um olho que desvia para fora. O estudo, publicado no New England Journal of Medicine, sugere que essa condição pode ter sido uma vantagem artística.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  Com um olho dominante e o outro suprimido, Rembrandt naturalmente via o mundo de forma <strong className="text-gold">bidimensional</strong>, o que facilitava a transposição de cenas tridimensionais para a tela plana — uma habilidade essencial para a pintura.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  Da mesma forma, estudos publicados no <strong className="text-gold">JAMA Ophthalmology</strong> (2018) sugerem que Leonardo da Vinci também tinha exotropia intermitente, baseado na análise de seis obras atribuídas ao artista.
                </p>
                <div className="bg-gold/10 rounded-xl p-5 border border-gold/20 mt-6">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-display text-base text-cream mb-2">Estrabismo e Percepção</h4>
                      <p className="font-body text-sm text-cream/70 leading-relaxed">
                        Hoje sabemos que o estrabismo afeta a visão binocular e a percepção de profundidade. Com tratamento adequado, podemos restaurar o alinhamento e, em muitos casos, a visão tridimensional.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 11. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre estrabismo, ambliopia e cirurgia." />

      {/* ========== 12. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Alinhe os olhos, <span className="text-gold">transforme a vida</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossa equipe especializada em estrabismo está pronta para avaliar seu caso — crianças e adultos de todas as idades.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md mx-auto mb-8">
                <div className="space-y-4">
                  <select value={selectedUnidade} onChange={(e) => setSelectedUnidade(e.target.value)} className="w-full bg-white text-navy font-body text-sm rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-gold">
                    <option value="">Selecione a unidade</option>
                    {unidades.map((u) => (<option key={u.id} value={u.id}>{u.name} — {u.address}</option>))}
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
