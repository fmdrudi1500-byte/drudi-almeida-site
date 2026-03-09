/* ============================================================
   Instituto do Ceratocone — Drudi e Almeida
   Página educativa completa — "Uma aula ao paciente"
   ============================================================ */
import { useState, useRef } from "react";
import {
  Eye, ChevronRight, Phone, MessageCircle, DollarSign,
  AlertCircle, CheckCircle, Palette, Star, MapPin, Users,
  Shield, Clock, Zap, Activity, Search, ArrowRight,
  ChevronDown, Glasses, Droplets, Sun, CircleDot, Calendar
} from "lucide-react";
import { Link } from "wouter";

import AnimateOnScroll, { StaggerContainer, StaggerItem } from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";
import InstitutoSchema from "@/components/InstitutoSchema";
import AgendarOnlineBtn from "@/components/AgendarOnlineBtn";

/* ---- Image URLs ---- */
const HERO_ART_IMG = `/images/ceratocone-hero_4839850a.webp`;
const IMG_PENTACAM = `/images/ceratocone-pentacam_54c0177a.webp`;
const IMG_LENTES_ESCLERAIS = `/images/ceratocone-lentes-esclerais_be81ebed.webp`;
const IMG_CROSSLINKING = `/images/ceratocone-crosslinking_be312842.webp`;
const IMG_ANEL_FERRARA = `/images/ceratocone-anel-ferrara_20881fd0.webp`;
const IMG_TRANSPLANTE = `/images/ceratocone-transplante_cf7bca9f.webp`;

/* ---- Constants ---- */
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de ceratocone.";
const PHONE = "(11) 91654-4653";

const unidades = [
  { id: "guarulhos-centro", name: "Guarulhos Centro", address: "Guarulhos - SP" },
  { id: "lapa", name: "Lapa", address: "São Paulo - SP" },
  { id: "santana", name: "Santana", address: "São Paulo - SP" },
  { id: "sao-miguel", name: "São Miguel", address: "São Paulo - SP" },
  { id: "tatupe", name: "Tatuapé", address: "São Paulo - SP" },
];

/* ---- Sintomas com fotos (zigzag) ---- */
const sintomasZigzag = [
  {
    title: "Visão Embaçada e Distorcida",
    desc: "A visão fica progressivamente borrada e as imagens parecem onduladas ou distorcidas. Linhas retas podem parecer curvas. É o sintoma mais comum e geralmente o primeiro a ser percebido.",
    img: "/images/ceratocone-sintoma-visao-emba_2ddb7aa2.webp",
  },
  {
    title: "Sensibilidade à Luz (Fotofobia)",
    desc: "Pacientes com ceratocone frequentemente apresentam desconforto intenso com luzes fortes, brilho excessivo e reflexos. Dirigir à noite torna-se especialmente difícil devido aos halos ao redor dos faróis.",
    img: "/images/ceratocone-sintoma-fotofobia_61063d7f.webp",
  },
  {
    title: "Troca Frequente de Óculos",
    desc: "Como a córnea muda de formato progressivamente, o grau dos óculos precisa ser alterado com frequência — às vezes a cada poucos meses. Mesmo com óculos novos, a visão pode não ficar totalmente nítida.",
    img: "/images/ceratocone-sintoma-oculos_6db1f062.webp",
  },
  {
    title: "Visão Dupla e Halos",
    desc: "Imagens fantasmas ou duplicadas em um mesmo olho (diplopia monocular) e halos luminosos ao redor das luzes são sinais característicos do astigmatismo irregular causado pelo ceratocone.",
    img: "/images/ceratocone-sintoma-halos_2ab35670.webp",
  },
  {
    title: "Coceira Persistente nos Olhos",
    desc: "Muitos pacientes com ceratocone têm histórico de alergia ocular e coceira crônica. O ato de coçar os olhos vigorosamente é um dos principais fatores de risco para o desenvolvimento e progressão da doença.",
    img: "/images/ceratocone-sintoma-coceira_6ad37407.webp",
  },
];

/* ---- Exames diagnósticos ---- */
const exames = [
  {
    icon: Activity,
    title: "Topografia Corneana",
    desc: "Mapeia a curvatura da superfície anterior da córnea usando anéis de Placido. Detecta padrões de ceratocone como o afinamento inferior e astigmatismo assimétrico. É o exame de triagem inicial.",
  },
  {
    icon: Search,
    title: "Pentacam (Tomografia de Scheimpflug)",
    desc: "Padrão-ouro para diagnóstico precoce. Mapeia as superfícies anterior e posterior da córnea, gera mapas de espessura (paquimetria) e elevação, e calcula índices de progressão como o BAD-D (Belin/Ambrósio).",
  },
  {
    icon: Eye,
    title: "OCT de Segmento Anterior",
    desc: "Produz imagens de alta resolução das camadas da córnea. O mapa de espessura epitelial é extremamente sensível e pode detectar afinamento subclínico antes mesmo da topografia.",
  },
  {
    icon: CircleDot,
    title: "Paquimetria",
    desc: "Mede a espessura da córnea em diferentes pontos. No ceratocone, há afinamento no ápice do cone. É fundamental para indicação de crosslinking (córnea deve ter mais de 400µm).",
  },
];

/* ---- Classificação Amsler-Krumeich ---- */
const classificacao = [
  { grau: "I", k: "< 48 D", refr: "< 5 D", cicatriz: "Ausente", paq: "Normal", cor: "bg-emerald-50 border-emerald-200 text-emerald-800" },
  { grau: "II", k: "< 53 D", refr: "5–8 D", cicatriz: "Ausente", paq: "> 400 µm", cor: "bg-amber-50 border-amber-200 text-amber-800" },
  { grau: "III", k: "< 55 D", refr: "8–10 D", cicatriz: "Ausente", paq: "200–400 µm", cor: "bg-orange-50 border-orange-200 text-orange-800" },
  { grau: "IV", k: "> 55 D", refr: "Não mensurável", cicatriz: "Central", paq: "< 200 µm", cor: "bg-red-50 border-red-200 text-red-800" },
];

/* ---- FAQ expandido ---- */
const faqItems = [
  { question: "Coçar os olhos pode causar ceratocone?", answer: "Sim. O ato de coçar os olhos de forma crônica e vigorosa é um dos principais fatores de risco associados ao desenvolvimento e à progressão do ceratocone. Estudos mostram que o trauma mecânico repetitivo enfraquece as fibras de colágeno da córnea. É fundamental evitar esse hábito, especialmente em pacientes com alergia ocular." },
  { question: "Ceratocone tem cura?", answer: "O ceratocone não tem cura no sentido de reverter completamente a condição, mas os tratamentos modernos são extremamente eficazes. O crosslinking corneano estabiliza a progressão em mais de 95% dos casos. As lentes de contato especiais e os anéis intracorneanos melhoram significativamente a visão. Em casos avançados, o transplante de córnea tem taxa de sucesso superior a 90%." },
  { question: "O Crosslinking é doloroso?", answer: "O procedimento é realizado com anestesia por colírios e é bem tolerado. Durante o procedimento, o paciente pode sentir leve desconforto. Nos primeiros 2-3 dias após, pode haver dor leve a moderada, sensibilidade à luz e lacrimejamento, controlados com medicação. A recuperação visual completa ocorre em 1-3 meses." },
  { question: "Quem tem ceratocone pode fazer LASIK?", answer: "Não. A cirurgia refrativa a laser tradicional (LASIK/PRK) é contraindicada em pacientes com ceratocone, pois afina ainda mais a córnea, podendo desestabilizar e agravar significativamente a doença. Existem alternativas como lentes de contato especiais, anéis intracorneanos e, em alguns casos, lentes intraoculares fácicas." },
  { question: "Qual a diferença entre lente escleral e lente rígida?", answer: "A lente rígida gás-permeável (RGP) é menor e apoia-se diretamente sobre a córnea. A lente escleral é maior e apoia-se na esclera (parte branca do olho), sem tocar a córnea — criando uma câmara de líquido que hidrata e protege. As esclerais oferecem conforto superior e melhor acuidade visual em ceratocones avançados." },
  { question: "O anel de Ferrara pode substituir o transplante?", answer: "Em muitos casos, sim. Os segmentos intracorneanos (anel de Ferrara) podem adiar ou até eliminar a necessidade de transplante em ceratocones leves a moderados. Eles aplanam a córnea e melhoram a acuidade visual. Os resultados são estáveis por mais de 5 anos. Podem ser combinados com crosslinking para resultados ainda melhores." },
  { question: "Ceratocone é hereditário?", answer: "Existe um componente genético importante. Parentes de primeiro grau de pacientes com ceratocone têm 15 a 67 vezes mais risco de desenvolver a doença. Por isso, recomendamos que filhos e irmãos de pacientes com ceratocone realizem exames de topografia corneana preventivos a partir dos 10 anos de idade." },
  { question: "A partir de que idade o ceratocone para de progredir?", answer: "Geralmente, a progressão do ceratocone tende a estabilizar por volta dos 35-40 anos de idade. No entanto, isso varia de paciente para paciente. O crosslinking pode ser realizado em qualquer idade para estabilizar a doença precocemente, sendo especialmente importante em pacientes jovens com progressão documentada." },
  { question: "Qual o tipo de transplante indicado para ceratocone?", answer: "O transplante preferido para ceratocone é a Ceratoplastia Lamelar Anterior Profunda (DALK), que substitui apenas as camadas anteriores da córnea, preservando o endotélio do paciente. Isso resulta em menor risco de rejeição e recuperação mais rápida. Em alguns casos, pode ser necessário o transplante penetrante (PKP), que substitui toda a córnea." },
  { question: "Quanto tempo dura a recuperação do crosslinking?", answer: "A recuperação inicial leva de 3 a 7 dias, período em que o paciente usa lente de contato terapêutica e colírios. A visão pode ficar embaçada por 1-3 meses enquanto a córnea cicatriza. O efeito completo do crosslinking é avaliado após 6-12 meses. Durante esse período, o paciente é acompanhado com exames regulares." },
];

export default function InstitutoCeratocone() {
  const [selectedUnidade, setSelectedUnidade] = useState("");

  const UnitSelect = ({ id }: { id: string }) => (
    <div className="space-y-4">
      <div>
        <label className="font-ui text-xs font-semibold tracking-wider uppercase text-cream/60 mb-2 block">Unidade</label>
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
        className="w-full inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3.5 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
      >
        <DollarSign className="w-4 h-4" />
        Receber Preço
      </a>
      <AgendarOnlineBtn variant="light" className="w-full justify-center" />
      <a
        href={`tel:+55${PHONE.replace(/\D/g, "")}`}
        className="w-full inline-flex items-center justify-center gap-2 font-ui text-sm font-semibold px-6 py-3 rounded-lg border border-cream/30 text-cream hover:bg-cream/10 transition-all"
      >
        <Phone className="w-4 h-4" />
        Ligar: {PHONE}
      </a>
    </div>
  );

  return (
    <>
      <SEOHead
        title="Ceratocone: Crosslinking e Tratamento | SP"
        description="Tratamento de ceratocone em SP: crosslinking, anel de Ferrara e lentes especiais. Diagnóstico com Pentacam. 5 unidades. Agende sua consulta."
        keywords="ceratocone tratamento SP, crosslinking São Paulo, anel de Ferrara, lente de contato ceratocone, Pentacam, oftalmologista ceratocone"
        canonicalPath="/instituto/ceratocone"
        ogImage="/images/van-gogh-starry-night_78be1262.webp"
        ogType="website"
      />
      <InstitutoSchema instituto="ceratocone" />
      {/* ========== 1. HERO WITH PARALLAX ========== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${HERO_ART_IMG})` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"
         
        />

        <div className="relative container py-14">
          <div className="max-w-2xl">

            <div
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DO CERATOCONE</span>
            </div>

            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Tratamento de{" "}
              <span className="text-gold italic gold-word-animate">Ceratocone</span>{" "}
              com especialistas em córnea
            </h1>

            <p
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Selecione a unidade mais próxima e receba informações sobre o tratamento de ceratocone com os melhores especialistas em córnea.
            </p>

            <div
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md"
            >
              <UnitSelect id="hero" />
            </div>
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
              <MapPin className="w-6 h-6 text-gold" />
              <div>
                <p className="font-display text-sm text-navy font-semibold">5 Unidades</p>
                <p className="font-body text-xs text-muted-foreground">Guarulhos, Lapa, Santana, São Miguel e Tatuapé</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex items-center gap-3">
              <Users className="w-6 h-6 text-gold" />
              <div>
                <p className="font-display text-sm text-navy font-semibold">Especialistas em Córnea</p>
                <p className="font-body text-xs text-muted-foreground">Equipe altamente qualificada</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-10 bg-border" />
            <div className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-gold" />
              <div>
                <p className="font-display text-sm text-navy font-semibold">Membro do CBO</p>
                <p className="font-body text-xs text-muted-foreground">Conselho Brasileiro de Oftalmologia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. COMO FUNCIONA (4 passos) ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Passo a Passo</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Como funciona?</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <StaggerContainer className="space-y-6">
              {[
                { n: "1", title: "Selecione a unidade", desc: "Escolha entre nossas 5 unidades: Guarulhos Centro, Lapa, Santana, São Miguel ou Tatuapé." },
                { n: "2", title: "Receba o atendimento", desc: "Nossa equipe entrará em contato para agendar sua consulta avaliativa." },
                { n: "3", title: "Avaliação completa", desc: "Realizamos exames de Pentacam, topografia e OPD para diagnóstico preciso." },
                { n: "4", title: "Plano de tratamento", desc: "Definimos o melhor tratamento: crosslinking, lentes especiais, anel ou transplante." },
              ].map((step, i) => (
                <StaggerItem key={i}>
                  <div className="h-full">
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-gold text-navy font-display text-lg font-bold flex items-center justify-center shrink-0">
                      {step.n}
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-navy mb-1">{step.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  </div>
                </StaggerItem>
              ))}

              <AnimateOnScroll delay={0.4}>
                <div className="flex flex-wrap gap-3 pt-4">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3 rounded-lg hover:bg-gold-light transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Receber Preço pelo WhatsApp
                  </a>
                </div>
              </AnimateOnScroll>
            </StaggerContainer>

            <AnimateOnScroll delay={0.2} direction="right">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img loading="lazy" src={IMG_PENTACAM} alt="Exame de Pentacam para diagnóstico de ceratocone" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 4. O QUE É CERATOCONE ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-6">O que é o Ceratocone?</h2>
              <div className="space-y-4">
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  O <strong className="text-navy">ceratocone</strong> é uma doença ocular progressiva que afeta a córnea — a camada transparente na frente do olho responsável por focalizar a luz. Na doença, a córnea torna-se progressivamente mais fina e assume um formato cônico irregular, causando distorção severa das imagens.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Geralmente surge na <strong className="text-navy">adolescência ou início da vida adulta</strong> e pode progredir até os 35-40 anos. Afeta aproximadamente 1 em cada 375 pessoas e é uma das principais indicações de transplante de córnea no mundo.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  A causa exata é desconhecida, mas envolve uma combinação de <strong className="text-navy">fatores genéticos e ambientais</strong>. Parentes de primeiro grau têm até 67 vezes mais risco. O hábito de coçar os olhos é o principal fator de risco modificável.
                </p>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mt-6">
                <p className="font-body text-sm text-navy italic">
                  "O diagnóstico precoce é fundamental. Com os tratamentos modernos, é possível estabilizar a doença e preservar a qualidade visual na grande maioria dos casos."
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15} direction="right">
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img loading="lazy" src="https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=600&q=80" alt="Exame oftalmológico" className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-border/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                      <AlertCircle className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <p className="font-display text-sm text-navy font-semibold">1 em cada 375</p>
                      <p className="font-body text-xs text-muted-foreground">pessoas são afetadas</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 5. SINTOMAS (zigzag com fotos) ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-8">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fique Atento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Sintomas do Ceratocone</h2>
            <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              Reconhecer os sinais precocemente é essencial para iniciar o tratamento antes que a doença progrida.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="space-y-16">
            {sintomasZigzag.map((s, i) => (
              <AnimateOnScroll key={i}>
                <div className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                  <div className={i % 2 === 1 ? "md:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                        <span className="font-display text-sm text-gold font-bold">{i + 1}</span>
                      </div>
                      <h3 className="font-display text-xl text-navy">{s.title}</h3>
                    </div>
                    <p className="font-body text-base text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                  <div className={`rounded-2xl overflow-hidden shadow-lg ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <img loading="lazy" src={s.img} alt={s.title} className="w-full h-64 object-cover" />
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
          <AnimateOnScroll className="text-center mb-8">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Diagnóstico</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3">Exames Diagnósticos</h2>
            <p className="font-body text-base text-cream/70 mt-4 max-w-2xl mx-auto">
              Na Drudi e Almeida, utilizamos os equipamentos mais modernos para o diagnóstico preciso e precoce do ceratocone.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <StaggerContainer className="grid md:grid-cols-2 gap-6">
            {exames.map((ex, i) => (
              <StaggerItem key={i}>
                <div className="h-full">
                <div className="bg-white/5 backdrop-blur-sm border border-cream/10 rounded-xl p-6 hover:border-gold/30 transition-all h-full">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/15 flex items-center justify-center shrink-0">
                      <ex.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-cream mb-2">{ex.title}</h3>
                      <p className="font-body text-sm text-cream/70 leading-relaxed">{ex.desc}</p>
                    </div>
                  </div>
                </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <AnimateOnScroll delay={0.3} className="mt-10">
            <div className="grid md:grid-cols-2 gap-8 items-center bg-white/5 rounded-2xl p-8 border border-cream/10">
              <div>
                <h3 className="font-display text-2xl text-cream mb-4">Pentacam: Padrão-Ouro</h3>
                <p className="font-body text-base text-cream/80 leading-relaxed mb-4">
                  O Pentacam utiliza a tecnologia de câmera Scheimpflug rotacional para capturar imagens tridimensionais completas da córnea em segundos. Gera mapas de curvatura, elevação e espessura que permitem detectar o ceratocone em estágios muito iniciais — antes mesmo de causar sintomas.
                </p>
                <p className="font-body text-sm text-cream/60 leading-relaxed">
                  Os índices BAD-D (Belin/Ambrósio Enhanced Ectasia Display) são calculados automaticamente, fornecendo uma análise probabilística da presença de ectasia corneana.
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img loading="lazy" src={IMG_PENTACAM} alt="Exame de Pentacam com mapa topográfico" className="w-full h-auto" />
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 7. CLASSIFICAÇÃO ========== */}
      <section className="section-padding">
        <div className="container max-w-5xl mx-auto">
          <AnimateOnScroll className="text-center mb-8">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Estadiamento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Classificação do Ceratocone</h2>
            <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              A classificação de Amsler-Krumeich divide o ceratocone em 4 graus, orientando o tratamento mais adequado para cada estágio.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          {/* Barra de progressão visual */}
          <div className="relative mb-10">
            <div className="absolute top-5 left-0 right-0 h-1 bg-border/40 rounded-full" />
            <div className="flex justify-between relative">
              {classificacao.map((c, i) => {
                const colors = [
                  "bg-emerald-500",
                  "bg-amber-500",
                  "bg-orange-500",
                  "bg-red-500",
                ];
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${colors[i]} flex items-center justify-center text-white font-display font-bold text-sm shadow-lg z-10`}>
                      {c.grau}
                    </div>
                    <span className="font-ui text-xs text-muted-foreground mt-2">Grau {c.grau}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between mt-1">
              <span className="font-body text-xs text-emerald-600">Leve</span>
              <span className="font-body text-xs text-red-600">Avançado</span>
            </div>
          </div>

          {/* Tabela elegante */}
          <AnimateOnScroll>
            <div className="overflow-hidden rounded-2xl border border-border/40 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="bg-navy">
                    <th className="font-display text-sm text-cream text-left px-6 py-4">Parâmetro</th>
                    {classificacao.map((c, i) => {
                      const headerColors = [
                        "text-emerald-300",
                        "text-amber-300",
                        "text-orange-300",
                        "text-red-300",
                      ];
                      return (
                        <th key={i} className={`font-display text-sm ${headerColors[i]} text-center px-4 py-4`}>
                          Grau {c.grau}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Ceratometria", key: "k" as const },
                    { label: "Miopia / Astigmatismo", key: "refr" as const },
                    { label: "Cicatriz corneana", key: "cicatriz" as const },
                    { label: "Paquimetria", key: "paq" as const },
                  ].map((row, ri) => (
                    <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-cream/30"}>
                      <td className="font-display text-sm text-navy px-6 py-4 font-semibold">{row.label}</td>
                      {classificacao.map((c, ci) => (
                        <td key={ci} className="font-body text-sm text-center text-muted-foreground px-4 py-4">
                          {c[row.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-gold/10">
                    <td className="font-display text-sm text-navy px-6 py-4 font-semibold">Tratamento indicado</td>
                    <td className="font-body text-xs text-center text-navy px-4 py-4">Crosslinking + Lentes</td>
                    <td className="font-body text-xs text-center text-navy px-4 py-4">Crosslinking + Anéis</td>
                    <td className="font-body text-xs text-center text-navy px-4 py-4">Anéis + Transplante</td>
                    <td className="font-body text-xs text-center text-navy px-4 py-4">Transplante de Córnea</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 8. TRATAMENTO 1: LENTES DE CONTATO ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-8">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Reabilitação Visual</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Lentes de Contato Especiais</h2>
            <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              Cerca de 90% dos pacientes com ceratocone utilizam lentes de contato especiais para correção visual. Conheça os tipos disponíveis.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-8">
            <AnimateOnScroll>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img loading="lazy" src={IMG_LENTES_ESCLERAIS} alt="Lentes esclerais para ceratocone" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <div className="space-y-6">
                {[
                  {
                    icon: Glasses,
                    title: "Lentes Rígidas Gás-Permeáveis (RGP)",
                    desc: "A superfície rígida da lente elimina as irregularidades da córnea, criando uma superfície óptica regular. Um filme lacrimal se forma entre a lente e a córnea, compensando o astigmatismo irregular. São a primeira opção para ceratocones leves a moderados.",
                  },
                  {
                    icon: CircleDot,
                    title: "Lentes Esclerais",
                    desc: "Maiores que as RGP, apoiam-se na esclera (parte branca) sem tocar a córnea. Criam uma câmara de líquido que hidrata e protege a córnea. Oferecem conforto superior e excelente acuidade visual. Indicadas para ceratocones avançados ou intolerância a RGP.",
                  },
                  {
                    icon: Eye,
                    title: "Lentes Híbridas e Piggyback",
                    desc: "As híbridas combinam centro rígido com periferia macia. O sistema piggyback usa uma lente rígida sobre uma macia. Ambas são alternativas para pacientes que não se adaptam às RGP convencionais.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-navy mb-1">{item.title}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 9. TRATAMENTO 2: CROSSLINKING ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamento Padrão-Ouro</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-6">Crosslinking Corneano (CXL)</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                O crosslinking é o <strong className="text-navy">único tratamento capaz de estabilizar a progressão do ceratocone</strong>. Utiliza riboflavina (vitamina B2) e luz ultravioleta A para fortalecer as ligações cruzadas entre as fibras de colágeno do estroma corneano.
              </p>

              <h3 className="font-display text-lg text-navy mb-3 mt-6">Como é realizado:</h3>
              <div className="space-y-3">
                {[
                  "Anestesia tópica com colírios — sem necessidade de anestesia geral",
                  "Remoção do epitélio corneano (protocolo epi-off padrão)",
                  "Aplicação de riboflavina (vitamina B2) por 30 minutos",
                  "Irradiação com luz UV-A por 30 minutos",
                  "Colocação de lente de contato terapêutica para proteção",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                    <span className="font-body text-sm text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gold" />
                  <span className="font-display text-sm text-navy font-semibold">Requisito importante</span>
                </div>
                <p className="font-body text-sm text-muted-foreground">
                  A córnea deve ter espessura mínima de 400µm para a realização segura do crosslinking. Por isso, o diagnóstico precoce é fundamental — quanto antes tratar, melhores as condições corneanas.
                </p>
              </div>

              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de receber o preço do crosslinking corneano."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gold text-navy font-display text-[15px] font-extrabold px-8 py-5 rounded-xl hover:bg-gold-light transition-all shadow-xl shadow-gold/30 hover:shadow-2xl hover:-translate-y-0.5 mt-6 w-full"
              >
                <DollarSign className="w-5 h-5" />
                Receber Preço do Crosslinking
              </a>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15} direction="right">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img loading="lazy" src={IMG_CROSSLINKING} alt="Procedimento de crosslinking corneano" className="w-full h-auto" />
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="bg-white rounded-lg p-3 text-center border border-border/60">
                  <Clock className="w-5 h-5 text-gold mx-auto mb-1" />
                  <p className="font-display text-sm text-navy font-semibold">~60 min</p>
                  <p className="font-body text-xs text-muted-foreground">Duração</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-border/60">
                  <Zap className="w-5 h-5 text-gold mx-auto mb-1" />
                  <p className="font-display text-sm text-navy font-semibold">&gt; 95%</p>
                  <p className="font-body text-xs text-muted-foreground">Estabilização</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center border border-border/60">
                  <Droplets className="w-5 h-5 text-gold mx-auto mb-1" />
                  <p className="font-display text-sm text-navy font-semibold">3-7 dias</p>
                  <p className="font-body text-xs text-muted-foreground">Recuperação</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 10. TRATAMENTO 3: ANEL DE FERRARA ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimateOnScroll delay={0.15}>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img loading="lazy" src={IMG_ANEL_FERRARA} alt="Anel de Ferrara — segmentos intracorneanos" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Implante Intracorneano</span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-6">Anel de Ferrara (ICRS)</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                Os <strong className="text-navy">segmentos intracorneanos</strong> (também conhecidos como Anel de Ferrara) são insertos semicirculares de PMMA (polimetilmetacrilato) implantados no estroma médio da córnea. Eles aplanam a curvatura corneana, reduzem o astigmatismo irregular e melhoram significativamente a acuidade visual.
              </p>

              <div className="space-y-4 mb-6">
                {[
                  { title: "Indicação", desc: "Ceratocone leve a moderado (Graus I-III) com intolerância a lentes de contato ou visão insatisfatória." },
                  { title: "Procedimento", desc: "Cirurgia ambulatorial de ~20 minutos com anestesia tópica. Os segmentos são inseridos em um túnel criado no estroma corneano." },
                  { title: "Resultados", desc: "Melhora da acuidade visual em 1-2 linhas. Resultados estáveis por mais de 5 anos. Procedimento reversível." },
                  { title: "Combinação", desc: "Pode ser combinado com crosslinking para estabilizar a córnea e melhorar a visão simultaneamente." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <CheckCircle className="w-4 h-4 text-gold mt-1 shrink-0" />
                    <div>
                      <span className="font-display text-sm text-navy font-semibold">{item.title}: </span>
                      <span className="font-body text-sm text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3 rounded-lg hover:bg-gold-light transition-all"
              >
                <DollarSign className="w-4 h-4" />
                Receber Preço do Anel de Ferrara
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 11. TRATAMENTO 4: TRANSPLANTE DE CÓRNEA ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-8">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Casos Avançados</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Transplante de Córnea</h2>
            <p className="font-body text-base text-muted-foreground mt-4 max-w-2xl mx-auto">
              Quando os tratamentos conservadores não são suficientes, o transplante de córnea é a solução definitiva. Apenas 10-15% dos pacientes com ceratocone necessitam deste procedimento.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <AnimateOnScroll>
              <div className="bg-white rounded-xl border border-border/60 p-8 h-full hover:shadow-lg hover:border-gold/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl text-navy mb-3">DALK — Ceratoplastia Lamelar Anterior Profunda</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  Técnica preferida para ceratocone. Substitui apenas as camadas anteriores da córnea, preservando o endotélio do paciente. Utiliza a técnica "big bubble" de Anwar para separação precisa das camadas.
                </p>
                <div className="space-y-2">
                  {["Menor risco de rejeição", "Recuperação mais rápida", "Preserva células endoteliais", "Técnica preferida para ceratocone"].map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-body text-xs text-muted-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <div className="bg-white rounded-xl border border-border/60 p-8 h-full hover:shadow-lg hover:border-gold/30 transition-all">
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-xl text-navy mb-3">PKP — Ceratoplastia Penetrante</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                  Transplante total da córnea. Remove toda a córnea do paciente e substitui por tecido doador. Indicado quando o DALK não é viável, como em casos com cicatrizes profundas ou envolvimento endotelial.
                </p>
                <div className="space-y-2">
                  {["Taxa de sucesso > 90%", "Visão 20/40 ou melhor na maioria", "Indicado para casos com cicatriz profunda", "Acompanhamento de longo prazo necessário"].map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-body text-xs text-muted-foreground">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll>
            <div className="rounded-2xl overflow-hidden shadow-xl max-w-3xl mx-auto">
              <img loading="lazy" src={IMG_TRANSPLANTE} alt="Transplante de córnea — PKP e DALK" className="w-full h-auto" />
              <div className="bg-white p-4 text-center border-t border-border/40">
                <p className="font-body text-xs text-muted-foreground">Ilustração comparativa: Ceratoplastia Penetrante (PKP) à esquerda e Ceratoplastia Lamelar Anterior Profunda (DALK) à direita</p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 12. ARTE E VISÃO — VAN GOGH ========== */}
      <section className="section-padding bg-navy text-cream overflow-hidden">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-2">Van Gogh e a Visão Distorcida</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
            <AnimateOnScroll>
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                <img loading="lazy" src={IMAGES.art.vanGoghStarryNight} alt="Noite Estrelada sobre o Ródano — Van Gogh, 1888" className="w-full h-auto" />
                <div className="bg-navy-light p-3 text-center">
                  <p className="font-body text-xs text-cream/70">"Noite Estrelada sobre o Ródano" — Van Gogh, 1888</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <div className="space-y-5">
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Vincent van Gogh (1853–1890) é um dos artistas mais ic
ônicos da história. Suas pinceladas vigorosas, espirais dramáticas e distorções visuais — tão evidentes em obras como "Noite Estrelada" — há muito intrigam pesquisadores sobre a relação entre sua arte e sua visão.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Estudos oftalmológicos sugerem que Van Gogh pode ter sofrido de <strong className="text-gold">astigmatismo irregular</strong>, uma condição em que a córnea tem curvatura desigual — exatamente o que ocorre no ceratocone.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Os famosos halos ao redor das estrelas e as ondulações nas paisagens de Van Gogh são notavelmente semelhantes à visão de um paciente com ceratocone. Na Drudi e Almeida, usamos a arte como ferramenta de conscientização.
                </p>
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm text-cream/90 italic">
                    "Se você vê halos ao redor das luzes ou as imagens parecem distorcidas, agende uma avaliação. O diagnóstico precoce do ceratocone é fundamental para preservar sua visão."
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimateOnScroll delay={0.15}>
              <div className="space-y-5">
                <h3 className="font-display text-2xl text-cream">O Olhar de Van Gogh</h3>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Em seus autorretratos, Van Gogh frequentemente se representava com olhos intensos e penetrantes. Pesquisadores notaram que ele pintava os próprios olhos com assimetrias sutis, o que pode indicar uma percepção visual alterada.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Assim como Van Gogh transformou sua visão em obras-primas, nós trabalhamos para que nossos pacientes com ceratocone recuperem a nitidez e a qualidade visual que merecem.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll className="order-first md:order-last">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                <img loading="lazy" src={IMAGES.art.vanGoghSelfPortrait} alt="Autorretrato — Van Gogh, 1887" className="w-full h-auto" />
                <div className="bg-navy-light p-3 text-center">
                  <p className="font-body text-xs text-cream/70">"Autorretrato" — Van Gogh, 1887</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 13. COMO DESCOBRIR ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container max-w-3xl mx-auto text-center">
          <AnimateOnScroll>
            <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gold" />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-navy mb-6">Como descobrir se tenho ceratocone?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
              O ceratocone só pode ser diagnosticado por um <strong className="text-navy">oftalmologista</strong> através de exames especializados como a topografia corneana e o Pentacam. Se você apresenta visão embaçada, troca frequente de óculos, sensibilidade à luz ou histórico familiar, procure um especialista.
            </p>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-8">
              Na Drudi e Almeida, nossa equipe de especialistas em córnea realiza a avaliação completa com os equipamentos mais modernos disponíveis, incluindo Pentacam e OCT de segmento anterior.
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-8 py-3.5 rounded-lg hover:bg-gold-light transition-all shadow-lg shadow-gold/20"
            >
              <MessageCircle className="w-4 h-4" />
              Agendar Avaliação
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 14. NOSSAS CLÍNICAS ========== */}
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Guarulhos Centro", city: "Guarulhos - SP", description: "Atendimento completo com equipamentos de última geração e equipe especializada.", image: "/images/clinica_guarulhos_8e7690c7.webp" },
              { name: "Lapa", city: "São Paulo - SP", description: "Infraestrutura moderna e fácil acesso, com o mesmo padrão de excelência.", image: "/images/consultorio_lapa_be866546.webp" },
              { name: "Santana", city: "São Paulo - SP", description: "Zona norte de São Paulo, atendimento humanizado com fácil acesso pelo metrô.", image: "/images/sala_espera_sofa_bege_v1_3860a616.webp" },
              { name: "São Miguel", city: "São Paulo - SP", description: "Atende a zona leste com a mesma qualidade e tecnologia de todas as nossas clínicas.", image: "/images/sala_espera_sofa_bege_v4_0b2982e6.webp" },
              { name: "Tatuapé", city: "São Paulo - SP", description: "Infraestrutura completa e equipe altamente qualificada na zona leste.", image: "/images/sala_espera_sofa_bege_v3_5717e0c0.webp" },
            ].map((clinica, i) => (
              <StaggerItem key={i}>
                <div className="h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:shadow-md transition-shadow">
                  <img loading="lazy" src={clinica.image} alt={`Unidade Drudi e Almeida ${clinica.name} — clínica oftalmológica`} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="font-display text-lg text-navy mb-1">{clinica.name}</h3>
                    <p className="font-ui text-xs text-gold font-semibold mb-3">{clinica.city}</p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{clinica.description}</p>
                  </div>
                </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== 15. FAQ ========== */}
      <FAQSection
        title="Perguntas Frequentes sobre Ceratocone"
        subtitle="Tire todas as suas dúvidas sobre o ceratocone, seus tratamentos e o que esperar."
        items={faqItems}
      />

      {/* ========== 15. CTA FINAL ========== */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero.happyFamily})` }}
        />
        <div className="absolute inset-0 bg-navy/70" />

        <div className="relative container py-14 md:py-16">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Agende sua <span className="text-gold">consulta avaliativa</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossos especialistas em córnea estão prontos para avaliar seu caso e indicar o melhor tratamento. Estabilize a progressão e recupere a qualidade visual.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md mx-auto mb-8">
                <UnitSelect id="cta-final" />
              </div>


            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
