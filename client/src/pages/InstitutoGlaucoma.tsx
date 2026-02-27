/* ============================================================
   Instituto do Glaucoma — Drudi e Almeida
   Página educativa completa — "Uma aula ao paciente"
   ============================================================ */
import { useState, useRef } from "react";
import {
  Eye, ChevronRight, Phone, MessageCircle, DollarSign,
  AlertCircle, CheckCircle, Palette, Star, MapPin, Users,
  Shield, Clock, Zap, Activity, Search, ArrowRight,
  Glasses, Droplets, Sun, CircleDot, Target, Gauge
} from "lucide-react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import { IMAGES } from "@/lib/images";

/* ---- Image URLs ---- */
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/WDorIHhiaQuwCSEJ.png";
const IMG_TONOMETRIA = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/oqEhfqRixPfOhYlT.png";
const IMG_CAMPO_VISUAL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/strSUfQfDmkrvSxb.png";

/* ---- Constants ---- */
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de glaucoma.";
const PHONE = "(11) 91654-4653";

const unidades = [
  { id: "jundiai", name: "Jundiaí", address: "Jundiaí - SP" },
  { id: "santana", name: "Santana (São Paulo)", address: "São Paulo - SP" },
];

/* ---- Tipos de Glaucoma ---- */
const tiposGlaucoma = [
  {
    title: "Glaucoma Primário de Ângulo Aberto (GPAA)",
    desc: "O tipo mais comum (90% dos casos). A drenagem do humor aquoso torna-se ineficiente, causando aumento gradual da pressão intraocular. Progressão lenta e indolor — o paciente geralmente não percebe até estágios avançados.",
    icon: Eye,
    badge: "Mais Comum",
  },
  {
    title: "Glaucoma de Ângulo Fechado",
    desc: "Emergência médica. A íris bloqueia subitamente a drenagem do humor aquoso, causando aumento rápido da pressão. Sintomas: dor ocular severa, vermelhidão, visão turva, halos ao redor de luzes, náusea e vômito.",
    icon: AlertCircle,
    badge: "Emergência",
  },
  {
    title: "Glaucoma de Tensão Normal",
    desc: "O dano ao nervo óptico ocorre mesmo com pressão intraocular dentro da faixa normal (< 21 mmHg). Frequentemente associado a condições vasculares como enxaqueca, síndrome de Raynaud e apneia do sono.",
    icon: Activity,
    badge: "Especial",
  },
  {
    title: "Glaucoma Congênito / Infantil",
    desc: "Presente ao nascimento ou nos primeiros anos de vida. Causado por desenvolvimento anormal do sistema de drenagem ocular. Sinais: olhos grandes (buftalmo), lacrimejamento excessivo, fotofobia e opacidade corneana.",
    icon: Shield,
    badge: "Pediátrico",
  },
];

/* ---- Sintomas com fotos (zigzag) ---- */
const sintomasZigzag = [
  {
    title: "Perda Gradual da Visão Periférica",
    desc: "O glaucoma ataca primeiro a visão lateral (periférica). O paciente começa a perder a capacidade de enxergar objetos ao lado sem virar a cabeça. Essa perda é tão gradual que muitos só percebem quando já é significativa.",
    img: "https://images.unsplash.com/photo-1494869042583-f6c911f04b4c?w=600&q=80",
  },
  {
    title: "Visão em Túnel",
    desc: "Em estágios avançados, o campo visual se estreita progressivamente, como se o paciente olhasse através de um tubo. A visão central pode estar preservada, mas tudo ao redor desaparece. Atividades como dirigir e caminhar tornam-se perigosas.",
    img: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=600&q=80",
  },
  {
    title: "Dor Ocular e Vermelhidão (Ângulo Fechado)",
    desc: "No glaucoma de ângulo fechado agudo, a pressão sobe rapidamente causando dor intensa no olho, vermelhidão, visão embaçada e halos coloridos ao redor de luzes. Pode ser acompanhado de náusea e vômito. É uma emergência médica.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  },
  {
    title: "Dificuldade de Adaptação ao Escuro",
    desc: "Pacientes com glaucoma podem notar dificuldade para se adaptar a ambientes com pouca iluminação. A transição de ambientes claros para escuros torna-se mais lenta, e a visão noturna fica comprometida.",
    img: "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
  },
];

/* ---- Exames Diagnósticos ---- */
const examesDiagnosticos = [
  {
    title: "Tonometria de Goldmann",
    desc: "Padrão-ouro para medir a pressão intraocular (PIO). O tonômetro de aplanação de Goldmann mede a força necessária para aplanar uma área da córnea. Valores normais: 10-21 mmHg. Valores elevados indicam risco de glaucoma.",
    icon: Gauge,
    img: IMG_TONOMETRIA,
  },
  {
    title: "Campo Visual Computadorizado (Humphrey)",
    desc: "Exame fundamental que mapeia a sensibilidade de toda a visão periférica e central. Detecta áreas de perda visual (escotomas) que o paciente ainda não percebe. Essencial para diagnóstico e acompanhamento da progressão.",
    icon: Target,
    img: IMG_CAMPO_VISUAL,
  },
  {
    title: "OCT do Nervo Óptico",
    desc: "A Tomografia de Coerência Óptica (OCT) mede a espessura da camada de fibras nervosas da retina ao redor do disco óptico. Detecta dano estrutural antes mesmo da perda funcional no campo visual — diagnóstico ultra-precoce.",
    icon: Search,
  },
  {
    title: "Gonioscopia",
    desc: "Exame que avalia o ângulo da câmara anterior do olho — a região onde o humor aquoso é drenado. Fundamental para classificar o glaucoma como de ângulo aberto ou fechado e definir a estratégia de tratamento.",
    icon: Eye,
  },
  {
    title: "Fundoscopia / Retinografia",
    desc: "Avaliação direta do nervo óptico para verificar a relação escavação/disco (C/D ratio). Uma escavação aumentada sugere dano glaucomatoso. A retinografia documenta fotograficamente o nervo para comparação ao longo do tempo.",
    icon: CircleDot,
  },
  {
    title: "Paquimetria Corneana",
    desc: "Mede a espessura da córnea. Córneas mais finas podem subestimar a PIO real, enquanto córneas mais espessas podem superestimá-la. Fator de correção essencial para a interpretação correta da tonometria.",
    icon: Activity,
  },
];

/* ---- Tratamentos ---- */
const tratamentoColirios = [
  { name: "Análogos de Prostaglandina", examples: "Latanoprost, Bimatoprost, Travoprost", mechanism: "Aumentam a drenagem do humor aquoso pela via uveoescleral. Uso 1x/dia à noite.", reduction: "25-33%" },
  { name: "Betabloqueadores", examples: "Timolol, Betaxolol", mechanism: "Reduzem a produção de humor aquoso pelo corpo ciliar. Uso 2x/dia.", reduction: "20-25%" },
  { name: "Inibidores da Anidrase Carbônica", examples: "Dorzolamida, Brinzolamida", mechanism: "Reduzem a produção de humor aquoso. Disponíveis em colírio e comprimido.", reduction: "15-20%" },
  { name: "Alfa-2 Agonistas", examples: "Brimonidina, Apraclonidina", mechanism: "Reduzem a produção e aumentam a drenagem do humor aquoso.", reduction: "20-25%" },
  { name: "Inibidores de Rho-Kinase", examples: "Netarsudil", mechanism: "Nova classe que atua diretamente na malha trabecular, melhorando a drenagem convencional.", reduction: "15-20%" },
];

const tratamentosLaser = [
  {
    title: "Trabeculoplastia Seletiva a Laser (SLT)",
    desc: "Procedimento ambulatorial que estimula o sistema de drenagem natural do olho (malha trabecular) sem destruir tecido. Pode ser repetido. Eficaz como tratamento inicial ou complementar aos colírios.",
    stats: "Reduz PIO em 20-30% | Efeito dura 3-5 anos | Pode ser repetido",
    icon: Zap,
  },
  {
    title: "Iridotomia Periférica a Laser (YAG)",
    desc: "Cria uma pequena abertura na íris para permitir a passagem do humor aquoso da câmara posterior para a anterior. Tratamento definitivo para o glaucoma de ângulo fechado e profilático para olhos em risco.",
    stats: "Procedimento de 5 minutos | Ambulatorial | Prevenção de crises agudas",
    icon: Target,
  },
  {
    title: "Ciclofotocoagulação",
    desc: "Laser aplicado no corpo ciliar para reduzir a produção de humor aquoso. Reservado para casos refratários que não responderam a outros tratamentos. Pode ser transescleral ou endoscópica.",
    stats: "Para casos avançados | Reduz produção de humor aquoso",
    icon: Sun,
  },
];

const cirurgias = [
  {
    title: "Trabeculectomia",
    desc: "Padrão-ouro cirúrgico. Cria uma fístula controlada que permite a drenagem do humor aquoso para um espaço sob a conjuntiva (bolha filtrante). Reduz significativamente a PIO.",
    stats: "Taxa de sucesso: 70-90% | Redução de PIO: 30-50%",
    type: "Convencional",
  },
  {
    title: "Implante de Válvula de Drenagem",
    desc: "Dispositivos como a válvula de Ahmed ou Baerveldt são implantados para criar uma via alternativa de drenagem do humor aquoso. Indicados quando a trabeculectomia falha ou em glaucomas complexos.",
    stats: "Para casos refratários | Controle de longo prazo",
    type: "Implante",
  },
  {
    title: "MIGS — Cirurgia Minimamente Invasiva",
    desc: "Nova geração de procedimentos com menor trauma cirúrgico: iStent, Xen Gel Stent, Hydrus Microstent. Perfil de segurança mais favorável, recuperação mais rápida e podem ser combinados com cirurgia de catarata.",
    stats: "Recuperação rápida | Menor risco | Pode combinar com catarata",
    type: "Minimamente Invasiva",
  },
  {
    title: "Esclerectomia Profunda / Canaloplastia",
    desc: "Técnicas não-penetrantes que melhoram a drenagem sem criar uma abertura completa na parede do olho. Menor risco de complicações como hipotonia. A canaloplastia dilata o canal de Schlemm com um microcateter.",
    stats: "Não-penetrante | Menor risco de hipotonia",
    type: "Não-Penetrante",
  },
];

/* ---- Fatores de Risco ---- */
const fatoresRisco = [
  { factor: "Idade acima de 40 anos", detail: "O risco aumenta significativamente após os 40 e dobra a cada década" },
  { factor: "Histórico familiar", detail: "Parentes de 1º grau com glaucoma aumentam o risco em 4-9 vezes" },
  { factor: "Pressão intraocular elevada", detail: "Principal fator de risco modificável — quanto maior, maior o risco" },
  { factor: "Descendência africana", detail: "Risco 6-8x maior de desenvolver glaucoma e 15x maior de cegueira" },
  { factor: "Miopia elevada", detail: "Olhos míopes têm nervo óptico mais vulnerável ao dano glaucomatoso" },
  { factor: "Córneas mais finas", detail: "Espessura corneana < 555 μm é fator de risco independente" },
  { factor: "Diabetes e hipertensão", detail: "Doenças vasculares comprometem a irrigação do nervo óptico" },
  { factor: "Uso de corticosteroides", detail: "Uso prolongado de corticoides (colírios, pomadas, sistêmicos) pode elevar a PIO" },
];

/* ---- FAQ ---- */
const faqItems = [
  { question: "Glaucoma tem cura?", answer: "Não, o glaucoma não tem cura, mas tem controle eficaz. O tratamento adequado pode estabilizar a doença e prevenir a progressão da perda visual. Porém, a visão já perdida pelo glaucoma não pode ser recuperada — por isso o diagnóstico precoce é tão importante." },
  { question: "O tratamento com colírios é para a vida toda?", answer: "Na maioria dos casos, sim. O glaucoma é uma doença crônica que requer tratamento contínuo. Os colírios devem ser usados diariamente conforme prescrição médica, mesmo quando o paciente se sente bem. A interrupção do tratamento pode levar à progressão silenciosa da doença." },
  { question: "Alguém na minha família tem glaucoma. Eu também terei?", answer: "Ter um parente de primeiro grau com glaucoma aumenta significativamente o risco (4-9 vezes). Porém, não é uma certeza. O mais importante é realizar exames oftalmológicos regulares a partir dos 40 anos (ou antes, se houver histórico familiar) para diagnóstico precoce." },
  { question: "Pressão ocular alta sempre significa glaucoma?", answer: "Não necessariamente. A hipertensão ocular isolada é um fator de risco, mas nem todos que a possuem desenvolverão glaucoma. Por outro lado, existe o glaucoma de tensão normal, onde o dano ocorre mesmo com pressão dentro da faixa normal. Apenas um exame completo pode fazer o diagnóstico correto." },
  { question: "Qual a diferença entre SLT e cirurgia convencional?", answer: "A SLT (Trabeculoplastia Seletiva a Laser) é um procedimento ambulatorial, não-invasivo, que estimula a drenagem natural do olho. Já a cirurgia convencional (trabeculectomia) cria uma nova via de drenagem. A SLT é indicada como primeiro passo ou complemento; a cirurgia é reservada para casos que não respondem a colírios e laser." },
  { question: "O que são as cirurgias MIGS?", answer: "MIGS (Minimally Invasive Glaucoma Surgery) são procedimentos de nova geração com menor trauma cirúrgico, como iStent e Xen Gel Stent. Oferecem recuperação mais rápida e menor risco de complicações. Podem ser combinados com cirurgia de catarata, reduzindo a necessidade de colírios." },
  { question: "Posso ficar cego por causa do glaucoma?", answer: "Se não tratado, sim. O glaucoma é a segunda causa de cegueira permanente no mundo. Porém, com diagnóstico precoce e tratamento adequado, a grande maioria dos pacientes mantém visão funcional por toda a vida. A chave é não faltar às consultas e usar os colírios corretamente." },
  { question: "Com que frequência devo fazer exames?", answer: "Para pessoas sem fatores de risco: a cada 2-4 anos antes dos 40, a cada 1-2 anos entre 40-65, e anualmente após 65. Com fatores de risco (histórico familiar, diabetes, miopia alta): exames anuais a partir dos 35 anos. Pacientes já diagnosticados: a cada 3-6 meses." },
  { question: "Colírios de glaucoma têm efeitos colaterais?", answer: "Sim, cada classe tem efeitos específicos. Prostaglandinas podem escurecer a íris e aumentar cílios. Betabloqueadores podem causar bradicardia e broncoespasmo. Alfa-agonistas podem causar alergia ocular. É importante relatar qualquer desconforto ao oftalmologista para ajustar o tratamento." },
  { question: "Posso dirigir se tenho glaucoma?", answer: "Depende do estágio da doença. Nos estágios iniciais, com campo visual preservado, geralmente sim. Em estágios avançados, com perda significativa de visão periférica, a capacidade de dirigir pode ficar comprometida. Uma avaliação do campo visual é essencial para determinar a aptidão." },
];

export default function InstitutoGlaucoma() {
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
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${HERO_ART_IMG})`, y: heroImageY, scale: heroImageScale }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"
          style={{ opacity: heroOverlayOpacity }}
        />
        <div className="relative container py-20">
          <div className="max-w-2xl">
            <motion.nav initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6">
              <Link href="/" className="hover:text-gold transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">Instituto do Glaucoma</span>
            </motion.nav>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DO GLAUCOMA</span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }} className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6">
              Glaucoma: diagnóstico precoce para{" "}
              <span className="text-gold italic">preservar sua visão</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl">
              O glaucoma é o "ladrão silencioso da visão". Selecione sua unidade e receba informações sobre diagnóstico e tratamento com especialistas.
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
                <a href={`tel:+55${PHONE.replace(/\D/g, "")}`} className="w-full inline-flex items-center justify-center gap-2 font-ui text-sm font-semibold px-6 py-3 rounded-lg border border-cream/30 text-cream hover:bg-cream/10 transition-all">
                  <Phone className="w-4 h-4" />Ligar: {PHONE}
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
            <div className="flex items-center gap-2"><Users className="w-4 h-4 text-gold" /><span className="font-body text-sm text-navy font-semibold">Especialistas em Glaucoma</span></div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É GLAUCOMA ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimateOnScroll direction="left">
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Glaucoma?</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  O glaucoma é um grupo de doenças oculares que causam <strong className="text-navy">danos progressivos e irreversíveis ao nervo óptico</strong>, a estrutura que conecta o olho ao cérebro e transmite as imagens que vemos. É a <strong className="text-navy">segunda causa de cegueira permanente no mundo</strong>.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  Na maioria dos casos, o dano é causado pelo aumento da pressão intraocular (PIO), que ocorre quando o humor aquoso — o líquido que preenche a parte anterior do olho — não é drenado adequadamente.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Conhecido como o <strong className="text-navy">"ladrão silencioso da visão"</strong>, o glaucoma geralmente não apresenta sintomas em suas fases iniciais. A perda de visão começa pela periferia e avança lentamente para o centro. Quando o paciente percebe, o dano já pode ser significativo e irreversível.
                </p>
                <div className="mt-6 bg-gold/5 border border-gold/20 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <p className="font-body text-sm text-navy leading-relaxed">
                      <strong>Dado importante:</strong> Estima-se que metade dos portadores de glaucoma no mundo não sabem que têm a doença. Consultas oftalmológicas regulares são a única forma de diagnóstico precoce.
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div className="relative">
                <img src={IMG_TONOMETRIA} alt="Tonometria de Goldmann — exame de pressão intraocular" className="rounded-2xl shadow-xl w-full" />
                <div className="absolute -bottom-4 -left-4 bg-navy text-cream rounded-xl p-4 shadow-lg max-w-[200px]">
                  <p className="font-ui text-xs font-semibold text-gold mb-1">Tonometria</p>
                  <p className="font-body text-xs text-cream/80">Medida da pressão intraocular — exame fundamental</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 4. TIPOS DE GLAUCOMA ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Classificação</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tipos de Glaucoma</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Existem diferentes formas de glaucoma, cada uma com características e abordagens terapêuticas distintas.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {tiposGlaucoma.map((tipo, i) => (
              <AnimateOnScroll key={tipo.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center shrink-0">
                      <tipo.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-display text-lg text-navy">{tipo.title}</h3>
                      </div>
                      <span className="inline-block bg-gold/10 text-gold font-ui text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full mb-3">{tipo.badge}</span>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{tipo.desc}</p>
                    </div>
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Sintomas do Glaucoma</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">O glaucoma de ângulo aberto é assintomático nos estágios iniciais. Fique atento a estes sinais:</p>
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
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4">O diagnóstico do glaucoma requer uma bateria completa de exames. Na Drudi e Almeida, contamos com todos os equipamentos de última geração.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          {/* Exames com imagem */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-10">
            {examesDiagnosticos.filter(e => e.img).map((exame, i) => (
              <AnimateOnScroll key={exame.title} delay={i * 0.1}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all">
                  <img src={exame.img} alt={exame.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <exame.icon className="w-5 h-5 text-gold" />
                      <h3 className="font-display text-lg text-cream">{exame.title}</h3>
                    </div>
                    <p className="font-body text-sm text-cream/70 leading-relaxed">{exame.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Exames sem imagem */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {examesDiagnosticos.filter(e => !e.img).map((exame, i) => (
              <AnimateOnScroll key={exame.title} delay={i * 0.05}>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-cream/10 hover:border-gold/30 transition-all h-full">
                  <exame.icon className="w-5 h-5 text-gold mb-3" />
                  <h4 className="font-display text-base text-cream mb-2">{exame.title}</h4>
                  <p className="font-body text-xs text-cream/60 leading-relaxed">{exame.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 7. FATORES DE RISCO ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Prevenção</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Fatores de Risco</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Conhecer os fatores de risco é o primeiro passo para a prevenção. Se você se identifica com algum deles, procure um oftalmologista.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {fatoresRisco.map((fr, i) => (
              <AnimateOnScroll key={fr.factor} delay={i * 0.05}>
                <div className="flex items-start gap-4 p-5 bg-white rounded-xl border border-border/60 hover:shadow-md hover:border-gold/30 transition-all">
                  <AlertCircle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <div>
                    <h4 className="font-display text-sm text-navy mb-1">{fr.factor}</h4>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed">{fr.detail}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 8. TRATAMENTO — COLÍRIOS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamento — Etapa 1</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Colírios Antiglaucomatosos</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">O tratamento inicial do glaucoma é geralmente com colírios. Existem diversas classes, cada uma com mecanismo de ação diferente.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-4xl mx-auto space-y-4">
            {tratamentoColirios.map((col, i) => (
              <AnimateOnScroll key={col.name} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-5 border border-border/60 hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Droplets className="w-4 h-4 text-gold shrink-0" />
                        <h4 className="font-display text-base text-navy">{col.name}</h4>
                      </div>
                      <p className="font-body text-xs text-muted-foreground mb-1"><strong className="text-navy">Exemplos:</strong> {col.examples}</p>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">{col.mechanism}</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg px-4 py-2 text-center shrink-0">
                      <p className="font-ui text-[10px] font-semibold text-gold/70 uppercase tracking-wider">Redução PIO</p>
                      <p className="font-display text-lg text-gold">{col.reduction}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 9. TRATAMENTO — LASER ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamento — Etapa 2</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Procedimentos a Laser</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Quando os colírios não são suficientes ou como alternativa inicial, procedimentos a laser oferecem resultados eficazes com mínima invasividade.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tratamentosLaser.map((laser, i) => (
              <AnimateOnScroll key={laser.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                    <laser.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-navy mb-3">{laser.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{laser.desc}</p>
                  <div className="bg-cream/80 rounded-lg p-3">
                    <p className="font-body text-xs text-navy/70">{laser.stats}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 10. TRATAMENTO — CIRURGIAS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamento — Etapa 3</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Cirurgias para Glaucoma</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">Para casos que não respondem adequadamente a colírios e laser, a cirurgia cria novas vias de drenagem para o humor aquoso.</p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {cirurgias.map((cir, i) => (
              <AnimateOnScroll key={cir.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-border/60 hover:shadow-lg hover:border-gold/30 transition-all h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-block bg-navy text-cream font-ui text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">{cir.type}</span>
                  </div>
                  <h3 className="font-display text-lg text-navy mb-3">{cir.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">{cir.desc}</p>
                  <div className="flex items-center gap-2 bg-gold/5 rounded-lg p-3">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    <p className="font-body text-xs text-navy/70">{cir.stats}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 11. CAMPO VISUAL — IMPORTÂNCIA ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={IMG_CAMPO_VISUAL} alt="Campo Visual Humphrey — exame fundamental no glaucoma" className="w-full" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Acompanhamento</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">A Importância do Campo Visual</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  O exame de campo visual computadorizado (perimetria de Humphrey) é o exame mais importante para <strong className="text-navy">monitorar a progressão do glaucoma</strong>. Ele mapeia a sensibilidade de cada ponto da sua visão.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  Através dele, o oftalmologista consegue detectar áreas de perda visual (escotomas) que você ainda não percebe, e acompanhar se o tratamento está sendo eficaz em estabilizar a doença.
                </p>
                <div className="space-y-3 mt-6">
                  {["Detecta perda visual antes do paciente perceber", "Monitora eficácia do tratamento ao longo do tempo", "Disponível nas duas unidades com Humphrey 750i"].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                      <span className="font-body text-sm text-navy">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 12. ARTE E VISÃO — EL GRECO ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">O Glaucoma e a Visão em Túnel</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.elGrecoToledo} alt="El Greco - Vista de Toledo" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll direction="right">
              <div>
                <h3 className="font-display text-2xl text-cream mb-4">El Greco e a Percepção Visual</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  As figuras alongadas e distorcidas de El Greco levaram pesquisadores a debater se o artista teria um <strong className="text-gold">astigmatismo severo</strong>. Essa teoria, embora controversa, ilustra como alterações visuais transformam a percepção do mundo.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  O glaucoma afeta a visão de forma diferente: em vez de distorcer, ele <strong className="text-gold">apaga progressivamente a periferia</strong>. Imagine contemplar esta obra-prima de El Greco, mas só conseguir ver o centro da tela — como se olhasse através de um tubo cada vez mais estreito.
                </p>
                <div className="bg-gold/10 rounded-xl p-5 border border-gold/20 mt-6">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-display text-base text-cream mb-2">Visão em Túnel</h4>
                      <p className="font-body text-sm text-cream/70 leading-relaxed">
                        A perda de campo visual no glaucoma é chamada de "visão em túnel". O paciente mantém a visão central, mas perde progressivamente a capacidade de ver ao redor — afetando mobilidade, direção e qualidade de vida.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 13. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o glaucoma e seus tratamentos." />

      {/* ========== 14. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Proteja sua visão — <span className="text-gold">agende sua avaliação</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                O diagnóstico precoce é a melhor arma contra o glaucoma. Nossos especialistas estão prontos para avaliar seu caso com os equipamentos mais modernos.
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
                <a href={`tel:+55${PHONE.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 text-cream/70 font-ui text-sm font-semibold hover:text-cream transition-colors">
                  <Phone className="w-4 h-4" />Ligar: {PHONE}
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
