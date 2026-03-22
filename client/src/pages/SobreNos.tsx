/* ============================================================
   Sobre Nós — Drudi e Almeida
   Design: Neoclassical Medical Luminance
   Navy (#2c3e50), Gold (#c9a961), cream backgrounds
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, Award, Users, Heart, Target, GraduationCap, Stethoscope, Globe, Eye, Lightbulb, Compass, ChevronLeft, ChevronRight } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import AgendarOnlineBtn from "@/components/AgendarOnlineBtn";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";
import { useState, useRef, useCallback } from "react";


// Fotos dos médicos — extensões .webp (convertidas na otimização)
const DR_FERNANDO_FORMAL = `/images/dr-fernando-800w.webp`;
const DRA_PRISCILLA_FORMAL = `/images/dra-priscilla-800w.webp`;
const DR_FERNANDO_AMAZONIA = `/images/dr-fernando-amazonia-elegant_0e59624a.webp`;

// ============================================================
// Missão, Visão e Valores — dados interativos
// ============================================================
const mvv = [
  {
    id: "missao",
    icon: Compass,
    label: "Missão",
    title: "Democratizar o Acesso à Oftalmologia de Excelência",
    accent: "#c9a961",
    description:
      "Nascemos com o propósito de unir o que há de mais avançado em tecnologia oftalmológica com um atendimento verdadeiramente humanizado. Acreditamos que toda pessoa, independentemente de sua condição social ou localização geográfica, merece ter acesso a cuidados de saúde ocular de alta qualidade.",
    pillars: [
      { icon: Heart, text: "Atendimento humanizado e acolhedor em cada consulta" },
      { icon: Award, text: "5 institutos especializados com protocolos de excelência" },
      { icon: Globe, text: "Alcance social: do centro de SP às comunidades ribeirinhas da Amazônia" },
    ],
    quote: "Cada paciente que entra pela nossa porta merece o mesmo cuidado que daríamos a um familiar.",
    quoteAuthor: "Dr. Fernando Drudi",
  },
  {
    id: "visao",
    icon: Eye,
    label: "Visão",
    title: "Ser Referência Nacional em Saúde Ocular Especializada",
    accent: "#c9a961",
    description:
      "Queremos ser reconhecidos como o grupo oftalmológico de maior impacto do Brasil — não apenas pela excelência técnica e pelos resultados cirúrgicos, mas pela forma como transformamos a experiência do paciente e ampliamos o acesso à saúde ocular de qualidade em todo o território nacional.",
    pillars: [
      { icon: Target, text: "Expansão contínua com novos institutos e unidades" },
      { icon: Lightbulb, text: "Inovação constante: tecnologias de diagnóstico e tratamento de ponta" },
      { icon: Users, text: "Formação de novos especialistas comprometidos com a excelência" },
    ],
    quote: "A visão que temos para o futuro começa com a visão que devolvemos aos nossos pacientes hoje.",
    quoteAuthor: "Dra. Priscilla de Almeida",
  },
  {
    id: "valores",
    icon: Award,
    label: "Valores",
    title: "Os Pilares que Guiam Cada Decisão",
    accent: "#c9a961",
    description:
      "Nossos valores não são palavras em uma parede — são critérios que aplicamos em cada consulta, cada cirurgia, cada interação com o paciente. São o DNA da Drudi e Almeida, construídos ao longo de anos de prática clínica e compromisso genuíno com a saúde ocular.",
    pillars: [
      { icon: Heart, text: "Cuidado Humanizado — cada paciente é único e merece atenção individualizada" },
      { icon: Award, text: "Excelência Técnica — profissionais em constante atualização científica" },
      { icon: Target, text: "Tecnologia de Ponta — investimento nos equipamentos mais modernos do mercado" },
      { icon: Users, text: "Acessibilidade — democratizar o acesso à saúde ocular de qualidade" },
    ],
    quote: "Excelência não é um destino — é uma escolha que fazemos todos os dias.",
    quoteAuthor: "Equipe Drudi e Almeida",
  },
];

// ============================================================
// Corpo Clínico
// ============================================================
const doctors = [
  {
    name: "Dr. Fernando Macei Drudi",
    crm: "CRM-SP 139.300 | RQE 50.645",
    role: "Diretor Clínico",
    specialty: "Especialista em Catarata e Retina Cirúrgica",
    image: DR_FERNANDO_FORMAL,
    institutes: ["Instituto da Catarata", "Instituto da Retina"],
    bio: `Médico oftalmologista com formação completa nas subespecialidades de Catarata e Retina Cirúrgica pelo Hospital dos Servidores Público Estadual (HSPE). Atualmente atua como médico concursado do HSPE desde 2020, com foco no ensino prático de técnicas cirúrgicas para residentes e fellows.

Além da excelência clínica, o Dr. Fernando é um profissional dedicado ao impacto social na saúde ocular da população brasileira. Participa há mais de 10 anos ativamente do Projeto Oftalmologia Humanitária na Amazônia, realizando cirurgias nas comunidades ribeirinhas de difícil acesso. Por essa contribuição, recebeu a condecoração "Amigo da Marinha", importante reconhecimento concedido pela Marinha do Brasil.

Co-fundador da Drudi e Almeida Oftalmologia, lidera a clínica com a missão de proporcionar acesso à oftalmologia de excelência para todos.`,
    highlights: [
      { icon: GraduationCap, text: "Subespecialidade em Catarata e Retina — HSPE" },
      { icon: Stethoscope, text: "Médico concursado do HSPE desde 2020" },
      { icon: Globe, text: "Condecoração 'Amigo da Marinha' — Projeto Amazônia" },
    ],
  },
  {
    name: "Dra. Priscilla Rodrigues de Almeida",
    crm: "CRM-SP 148.173 | RQE 59.216",
    role: "Diretora Técnica",
    specialty: "Especialista em Segmento Anterior e Lentes de Contato",
    image: DRA_PRISCILLA_FORMAL,
    institutes: ["Instituto do Ceratocone"],
    bio: `Construiu sua trajetória na oftalmologia a partir de uma formação sólida e vivência intensa em ambientes de alta complexidade. Formou-se em Medicina e realizou Residência em Oftalmologia pelo Hospital do Servidor Público do Estado de São Paulo (HSPE), onde atuou ativamente em atendimentos clínicos e cirúrgicos, realizando centenas de cirurgias de catarata.

Após a residência, aprofundou seus conhecimentos com Fellowship em Doenças Oculares Externas e Córnea Cirúrgica pela Escola Paulista de Medicina (EPM/UNIFESP), referência nacional em ensino e pesquisa, com atuação em cirurgias de córnea, acompanhamento de transplantes penetrantes e lamelares e manejo de doenças da superfície ocular.

Mantém participação constante em congressos nacionais e internacionais, cursos de atualização e produção científica, reforçando o compromisso com uma medicina baseada em evidência, técnica e segurança.`,
    highlights: [
      { icon: GraduationCap, text: "Fellowship em Córnea — EPM/UNIFESP" },
      { icon: Stethoscope, text: "Centenas de cirurgias de córnea." },
      { icon: Globe, text: "Congressos nacionais e internacionais" },
    ],
  },
];

// ============================================================
// Componente MVV — Fundo claro com foto da Amazônia
// ============================================================
function MVVSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = mvv[activeIndex];

  // Touch / mouse drag state
  const dragStartX = useRef<number | null>(null);
  const isDragging = useRef(false);

  const goNext = useCallback(() => setActiveIndex((i) => (i + 1) % mvv.length), []);
  const goPrev = useCallback(() => setActiveIndex((i) => (i - 1 + mvv.length) % mvv.length), []);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    dragStartX.current = null;
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    isDragging.current = false;
  };
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current !== null && Math.abs(e.clientX - dragStartX.current) > 5) {
      isDragging.current = true;
    }
  };
  const handleMouseUp = (e: React.MouseEvent) => {
    if (dragStartX.current === null) return;
    const diff = dragStartX.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    dragStartX.current = null;
  };

  return (
    <section className="section-padding bg-cream/40 relative">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-gold/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-navy/4 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        {/* Section header */}
        <AnimateOnScroll className="text-center mb-12">
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Identidade Institucional</span>
          <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
            Missão, Visão e Valores
          </h2>
          <div className="gold-line max-w-[80px] mx-auto mt-5" />
        </AnimateOnScroll>

        {/* Layout: tabs + content + foto Amazônia */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left column: tabs + content */}
          <div className="lg:col-span-7">
            {/* Tab navigation */}
            <div className="flex gap-2 mb-8 flex-wrap">
              {mvv.map((item, idx) => {
                const Icon = item.icon;
                const isActive = activeIndex === idx;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-ui text-sm font-semibold transition-all duration-300 border ${
                      isActive
                        ? "bg-navy text-cream border-navy shadow-md"
                        : "bg-white text-navy/70 border-border hover:border-navy/30 hover:text-navy"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Content panel — drag/swipe enabled */}
            <div
              key={activeIndex}
              className="animate-fade-in select-none cursor-grab active:cursor-grabbing"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => { dragStartX.current = null; }}
            >
              <h3 className="font-display text-2xl md:text-3xl text-navy mb-4 leading-tight">
                {current.title}
              </h3>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-7">
                {current.description}
              </p>

              {/* Pillars list */}
              <div className="space-y-3 mb-8">
                {current.pillars.map((pillar) => {
                  const PillarIcon = pillar.icon;
                  return (
                    <div
                      key={pillar.text}
                      className="flex items-start gap-3 bg-white rounded-xl p-4 border border-border/60 shadow-sm hover:border-gold/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center shrink-0 mt-0.5">
                        <PillarIcon className="w-4 h-4 text-gold" />
                      </div>
                      <p className="font-ui text-sm text-navy/80 leading-snug">{pillar.text}</p>
                    </div>
                  );
                })}
              </div>

              {/* Quote */}
              <div className="relative bg-navy rounded-2xl p-7 border border-navy/20 shadow-lg">
                <div className="absolute -top-3 left-7 w-8 h-8 bg-navy rounded-full flex items-center justify-center border-2 border-gold/40">
                  <span className="font-display text-2xl text-gold leading-none">"</span>
                </div>
                <blockquote className="font-display text-lg md:text-xl text-cream leading-relaxed italic mt-2 mb-4">
                  {current.quote}
                </blockquote>
                <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="w-6 h-0.5 bg-gold" />
                  <p className="font-ui text-sm text-gold font-semibold">{current.quoteAuthor}</p>
                </div>
              </div>

              {/* Navigation — integrado no card de citação */}
              <div className="flex items-center justify-between mt-5 px-1">
                <div className="flex items-center gap-2">
                  {mvv.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(idx)}
                      className={`transition-all duration-300 rounded-full ${
                        activeIndex === idx
                          ? "w-6 h-2 bg-gold"
                          : "w-2 h-2 bg-navy/20 hover:bg-navy/40"
                      }`}
                      aria-label={`Ver ${item.label}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={goPrev}
                    aria-label="Item anterior"
                    className="w-7 h-7 rounded-full bg-navy/8 flex items-center justify-center text-navy/50 hover:bg-navy hover:text-cream transition-all duration-200"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Próximo item"
                    className="w-7 h-7 rounded-full bg-navy/8 flex items-center justify-center text-navy/50 hover:bg-navy hover:text-cream transition-all duration-200"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Foto da Amazônia */}
          <div className="lg:col-span-5">
            <AnimateOnScroll direction="right">
              <div className="relative pb-6 pr-6">
                {/* Decorative gold frame */}
                <div className="absolute -inset-3 bg-gradient-to-br from-gold/20 via-gold/5 to-transparent rounded-2xl" />
                <div className="relative overflow-hidden rounded-xl shadow-xl">
                  <img
                    src={DR_FERNANDO_AMAZONIA}
                    alt="Dr. Fernando Drudi realizando cirurgia oftalmológica em comunidade ribeirinha da Amazônia — Projeto Humanitário"
                    className="w-full aspect-[4/5] object-cover object-center"
                    width={480}
                    height={600}
                    loading="lazy"
                    decoding="async"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />

                  {/* Selo — card retangular branco, canto superior esquerdo */}
                  <div className="absolute top-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-white/60 px-3 py-2.5 flex items-center gap-2.5">
                    <Award className="w-5 h-5 text-navy shrink-0" />
                    <div>
                      <p className="font-ui text-[10px] font-black text-navy leading-tight uppercase tracking-wide">Amigo da Marinha</p>
                      <p className="font-body text-[9px] text-navy/60 leading-tight">Marinha do Brasil</p>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4 text-gold" />
                      <span className="font-ui text-xs font-bold text-gold tracking-wide uppercase">Projeto Amazônia</span>
                    </div>
                    <p className="font-body text-sm text-white/90 leading-snug">
                      Dr. Fernando Drudi realizando cirurgia oftalmológica em comunidade ribeirinha
                    </p>
                    <p className="font-ui text-xs text-white/60 mt-1">
                      Condecorado "Amigo da Marinha" pela Marinha do Brasil
                    </p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SobreNos() {
  return (
    <>
      <SEOHead
        title="Sobre Nós | Drudi e Almeida Oftalmologia"
        description="Conheça a história da Drudi e Almeida Oftalmologia, fundada pelo Dr. Fernando Drudi e Dra. Priscilla de Almeida. +10 anos de experiência em saúde ocular."
        keywords="Drudi e Almeida história, Dr Fernando Drudi, Dra Priscilla Almeida, clínica oftalmológica São Paulo, equipe médica"
        canonicalPath="/sobre"
      />
      <InstitutoHero
        title="Sobre a Drudi e Almeida Oftalmologia"
        subtitle="Tradição, inovação e compromisso com a saúde ocular de cada paciente."
        imageUrl={IMAGES.hero.degasHero}
        breadcrumb="Sobre Nós"
      />

      {/* ====== MISSÃO, VISÃO E VALORES — Fundo claro com foto Amazônia ====== */}
      <MVVSection />

      {/* ====== CORPO CLÍNICO ====== */}
      <section className="section-padding" id="corpo-clinico">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Corpo Clínico</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Conheça Nossos Especialistas
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4">
              Profissionais com formação de excelência, experiência cirúrgica comprovada e compromisso com o cuidado humanizado em todas as etapas do tratamento.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="space-y-20">
            {doctors.map((doc, idx) => (
              <AnimateOnScroll key={doc.name}>
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start ${idx % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                  {/* Photo column — apenas uma foto por médico */}
                  <div className={`lg:col-span-4 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="relative group">
                      {/* Gold accent border */}
                      <div className="absolute -inset-2 bg-gradient-to-br from-gold/30 via-gold/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={doc.image}
                          alt={`${doc.name} — ${doc.role}, ${doc.specialty} — Drudi e Almeida Oftalmologia`}
                          className="w-full aspect-[3/4] object-cover object-top"
                          width={600}
                          height={800}
                          loading="lazy"
                          decoding="async"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
                        {/* Name overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <p className="font-display text-xl text-white">{doc.name}</p>
                          <p className="font-ui text-xs text-gold tracking-wide mt-1">{doc.crm}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio column */}
                  <div className={`lg:col-span-8 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
                    {/* Role badge */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block bg-gold/10 text-gold font-ui text-xs font-bold px-3 py-1 rounded-full tracking-wide uppercase">
                        {doc.role}
                      </span>
                    </div>

                    <h3 className="font-display text-2xl md:text-3xl text-navy mb-1">{doc.name}</h3>
                    <p className="font-ui text-sm text-gold font-semibold mb-5">{doc.specialty}</p>

                    {/* Institutes tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {doc.institutes.map((inst) => (
                        <span
                          key={inst}
                          className="inline-flex items-center gap-1.5 bg-navy/5 text-navy font-ui text-xs font-medium px-3 py-1.5 rounded-full"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                          {inst}
                        </span>
                      ))}
                    </div>

                    {/* Bio text */}
                    <div className="space-y-3 mb-6">
                      {doc.bio.split("\n\n").map((paragraph, pIdx) => (
                        <p key={pIdx} className="font-body text-base text-muted-foreground leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {doc.highlights.map((h) => (
                        <div
                          key={h.text}
                          className="flex items-start gap-3 bg-cream/60 rounded-lg p-3 border border-gold/10"
                        >
                          <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-0.5">
                            <h.icon className="w-4 h-4 text-gold" />
                          </div>
                          <p className="font-ui text-xs text-navy leading-snug">{h.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Divider between doctors */}
                {idx < doctors.length - 1 && (
                  <div className="mt-16 flex items-center gap-4">
                    <div className="flex-1 h-px bg-border" />
                    <div className="w-2 h-2 rounded-full bg-gold/40" />
                    <div className="flex-1 h-px bg-border" />
                  </div>
                )}
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ====== CTA — Fundo família feliz ====== */}
      <section
        className="relative section-padding overflow-hidden"
        style={{ backgroundImage: `url(${IMAGES.hero.happyFamily ?? ''})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/85" />

        <div className="relative container text-center z-10">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-3 block">Agende Sua Consulta</span>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Cuide da Sua Visão com Quem Entende
            </h2>
            <p className="font-body text-base text-white/70 max-w-lg mx-auto mb-8">
              Venha conhecer nossa clínica e descubra como nossos especialistas podem cuidar da sua saúde ocular.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar pelo WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <AgendarOnlineBtn variant="dark" />
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
