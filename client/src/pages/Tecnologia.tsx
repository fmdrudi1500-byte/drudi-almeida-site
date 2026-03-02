/* ============================================================
   Tecnologia — Drudi e Almeida
   Design: Neoclássica Médica — navy + gold
   14 equipamentos reais com fotos e descrições técnicas
   ============================================================ */
import { useState } from "react";
import { ArrowRight, Search, Filter, Eye, Scan, Crosshair, Activity, Microscope, Waves, Target, Camera, Zap, Radio, CircleDot, Wind } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";

type Category = "Todos" | "Diagnóstico" | "Tratamento" | "Cirúrgico";

interface Equipment {
  name: string;
  fullName: string;
  description: string;
  category: "Diagnóstico" | "Tratamento" | "Cirúrgico";
  specialties: string[];
  image: string;
  icon: typeof Eye;
  highlight?: string;
}

const equipamentos: Equipment[] = [
  {
    name: "OCT com Angio-OCT",
    fullName: "Maestro 2 — Topcon",
    description: "Combina tomografia de coerência óptica (OCT) com fotografia colorida da retina e angiografia por OCT (OCTA). De forma totalmente automatizada, captura imagens de alta resolução da retina e do nervo óptico, permitindo análise detalhada da estrutura e vascularização do fundo do olho. Exame rápido, confortável e não-invasivo.",
    category: "Diagnóstico",
    specialties: ["Retina", "Glaucoma", "Catarata"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ervHszJTapbyUNRh.png",
    icon: Scan,
    highlight: "Automatizado — resultado em segundos",
  },
  {
    name: "OPD-Scan III",
    fullName: "Nidek",
    description: "Equipamento 5 em 1 que realiza aberrometria de frente de onda, topografia de córnea, autorrefração, autoceratometria e pupilometria. Fornece análise completa e precisa do estado refrativo do olho, essencial para prescrição de óculos, cirurgias refrativas e de catarata.",
    category: "Diagnóstico",
    specialties: ["Cirurgia Refrativa", "Catarata", "Córnea", "Lentes de Contato"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/tHthjLAVqdFduqHi.jpg",
    icon: Eye,
    highlight: "5 exames em 1 único aparelho",
  },
  {
    name: "Biometria Óptica",
    fullName: "Nidek AL-Scan",
    description: "Realiza medições precisas do olho em apenas 10 segundos. Utilizado principalmente no planejamento de cirurgias de catarata, mede parâmetros como comprimento axial e curvatura da córnea para o cálculo da lente intraocular. Exame rápido, confortável e não invasivo.",
    category: "Diagnóstico",
    specialties: ["Catarata", "Cirurgia Refrativa"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ozShiKgoMYRlZpZi.png",
    icon: Crosshair,
    highlight: "Medição em 10 segundos",
  },
  {
    name: "Pentacam AXL",
    fullName: "Oculus",
    description: "Tomógrafo que realiza análise completa do segmento anterior do olho, desde a córnea até o cristalino. Realiza topografia e tomografia de córnea, paquimetria, análise do ângulo da câmara anterior e biometria óptica. Fundamental para diagnósticos precisos e cálculo de lentes intraoculares.",
    category: "Diagnóstico",
    specialties: ["Cirurgia Refrativa", "Catarata", "Glaucoma"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/BjIDRRibGgbqaEgW.png",
    icon: CircleDot,
    highlight: "Análise completa do segmento anterior",
  },
  {
    name: "Microscopia Especular",
    fullName: "Nidek CEM-530",
    description: "Analisa a camada mais interna da córnea (endotélio), avaliando a quantidade e qualidade de suas células. Fundamental no pré-operatório de cirurgias de catarata e refrativas, garantindo a saúde da córnea e a segurança do procedimento. Resultados precisos em segundos.",
    category: "Diagnóstico",
    specialties: ["Córnea", "Catarata"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/UwIXSSFFnZALlTMB.png",
    icon: Microscope,
    highlight: "Avaliação celular da córnea",
  },
  {
    name: "Ultrassom Ocular",
    fullName: "Nidek US-500",
    description: "Realiza biometria e paquimetria ultrassônica. Mede o comprimento axial do olho para cálculo de lentes intraoculares em cirurgias de catarata e a espessura da córnea. Algoritmos avançados garantem medições precisas mesmo em casos de catarata densa.",
    category: "Diagnóstico",
    specialties: ["Catarata", "Córnea"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/MBbvIaDoHGwYuFaf.png",
    icon: Waves,
    highlight: "Preciso mesmo em cataratas densas",
  },
  {
    name: "Campo Visual",
    fullName: "Humphrey 750i — Zeiss",
    description: "Mapeia o campo de visão do paciente para detectar e monitorar a progressão de doenças como o glaucoma, que afetam a visão periférica. Exame rápido, confortável e não invasivo, fornecendo informações precisas para diagnóstico precoce e tratamento eficaz.",
    category: "Diagnóstico",
    specialties: ["Glaucoma", "Retina"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/uqfZPyapWiDmhgjZ.webp",
    icon: Target,
    highlight: "Padrão-ouro para glaucoma",
  },
  {
    name: "Retinógrafo Portátil",
    fullName: "Eyer II — Phelcom",
    description: "Dispositivo portátil e não-midriático que captura imagens de alta resolução do fundo do olho. Permite exames de retina em qualquer local, sem necessidade de dilatar a pupila, aumentando o conforto e a rapidez do procedimento. Fundamental para diagnóstico de retinopatia diabética.",
    category: "Diagnóstico",
    specialties: ["Retina", "Glaucoma"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ImNsrMQWFdGNUnQQ.png",
    icon: Camera,
    highlight: "Portátil — sem dilatação da pupila",
  },
  {
    name: "Laser de Argônio Multipoint",
    fullName: "Vitra 2 — Quantel Medical",
    description: "Equipamento de fotocoagulação a laser de 532nm para tratamento de patologias da retina. Possui modos SingleSpot e Multispot, permitindo a entrega de múltiplos pontos de laser de forma extremamente rápida e precisa. Tratamento mais confortável e rápido para o paciente.",
    category: "Tratamento",
    specialties: ["Retina"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/LUSoVEgfmutwLJEX.png",
    icon: Zap,
    highlight: "Multispot — tratamento mais rápido",
  },
  {
    name: "Yag Laser",
    fullName: "Optimis II — Quantel Medical",
    description: "Integra laser YAG de alta performance com lâmpada de fenda premium. Utilizado para capsulotomia e iridotomia, essenciais no tratamento de catarata e glaucoma. Mínimos níveis de energia evitam danos a tecidos adjacentes, garantindo recuperação mais confortável.",
    category: "Cirúrgico",
    specialties: ["Catarata", "Glaucoma"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/uNpBHQmkJerdsODE.jpeg",
    icon: Radio,
    highlight: "Precisão com mínima energia",
  },
  {
    name: "Topografia de Córnea",
    fullName: "Eyer — Phelcom",
    description: "Realiza mapeamento tridimensional da superfície da córnea. Gera mapas coloridos que permitem avaliar curvatura e regularidade da córnea. Fundamental para diagnóstico de ceratocone, adaptação de lentes de contato e planejamento de cirurgias refrativas e de catarata.",
    category: "Diagnóstico",
    specialties: ["Córnea", "Cirurgia Refrativa", "Catarata"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/hKzbMMpIykigLjwI.jpg",
    icon: Activity,
    highlight: "Mapeamento 3D da córnea",
  },
  {
    name: "OCT",
    fullName: "Nidek RS-3000 Advance 2",
    description: "Tomógrafo de coerência óptica de alta resolução que cria imagens transversais detalhadas da retina e do nervo óptico. Essencial para diagnóstico e acompanhamento de doenças da retina e glaucoma, detectando alterações antes que o paciente perceba qualquer sintoma.",
    category: "Diagnóstico",
    specialties: ["Retina", "Glaucoma"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/lTOdtQwqSqhZJwIW.jpg",
    icon: Scan,
    highlight: "Detecção precoce de alterações",
  },
  {
    name: "Biometria Óptica",
    fullName: "Topcon Aladdin",
    description: "Combina biometria óptica e topografia da córnea em um único dispositivo. Realiza nove medições essenciais do olho de forma rápida e não invasiva, incluindo comprimento axial, ceratometria e análise de frente de onda. Fundamental para planejamento de cirurgias de catarata.",
    category: "Diagnóstico",
    specialties: ["Catarata", "Cirurgia Refrativa"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/yOzCinuWFoJiUUSZ.png",
    icon: Crosshair,
    highlight: "9 medições em um único dispositivo",
  },
  {
    name: "Tonômetro de Sopro",
    fullName: "Topcon CT-80",
    description: "Mede a pressão intraocular (PIO) de forma rápida, precisa e confortável. Utiliza sopro de ar suave para medição sem contato, eliminando a necessidade de colírios anestésicos. Tecnologia de sensor duplo garante resultados confiáveis para diagnóstico e acompanhamento do glaucoma.",
    category: "Diagnóstico",
    specialties: ["Glaucoma", "Oftalmologia Geral"],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/mEkHZNLffeDUFwWC.jpg",
    icon: Wind,
    highlight: "Sem contato — sem colírio",
  },
];

const categories: Category[] = ["Todos", "Diagnóstico", "Tratamento", "Cirúrgico"];

const categoryColors: Record<string, string> = {
  "Diagnóstico": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "Tratamento": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "Cirúrgico": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

export default function Tecnologia() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = equipamentos.filter((eq) => {
    const matchCategory = activeCategory === "Todos" || eq.category === activeCategory;
    const matchSearch =
      searchTerm === "" ||
      eq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      eq.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchCategory && matchSearch;
  });

  const counts = {
    Todos: equipamentos.length,
    Diagnóstico: equipamentos.filter((e) => e.category === "Diagnóstico").length,
    Tratamento: equipamentos.filter((e) => e.category === "Tratamento").length,
    Cirúrgico: equipamentos.filter((e) => e.category === "Cirúrgico").length,
  };

  return (
    <>
      <SEOHead
        title="Tecnologia — Equipamentos de Última Geração"
        description="Conheça os equipamentos e tecnologias utilizados na Drudi e Almeida: Pentacam, OCT, laser femtossegundo, facoemulsificação e mais."
        keywords="tecnologia oftalmológica, Pentacam, OCT, laser femtossegundo, equipamentos oftalmologia, Drudi e Almeida tecnologia"
        canonicalPath="/tecnologia"
      />
      <InstitutoHero
        title="Tecnologia de Ponta"
        subtitle="Investimos continuamente nos equipamentos mais modernos para garantir diagnósticos precisos e tratamentos seguros."
        imageUrl={IMAGES.hero.technology}
        breadcrumb="Tecnologia"
      />

      {/* Stats Banner */}
      <section className="relative -mt-16 z-10">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "14", label: "Equipamentos", sublabel: "de última geração" },
              { number: "5", label: "Institutos", sublabel: "especializados" },
              { number: "5", label: "Unidades", sublabel: "em São Paulo" },
              { number: "100%", label: "Digital", sublabel: "prontuário eletrônico" },
            ].map((stat) => (
              <AnimateOnScroll key={stat.label}>
                <div className="bg-white dark:bg-navy/80 rounded-xl shadow-lg border border-border/40 p-5 text-center backdrop-blur-sm">
                  <span className="font-display text-3xl md:text-4xl text-gold">{stat.number}</span>
                  <p className="font-ui text-sm font-semibold text-navy dark:text-cream mt-1">{stat.label}</p>
                  <p className="font-body text-xs text-muted-foreground">{stat.sublabel}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Gallery */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Infraestrutura</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy dark:text-cream mt-3 mb-4">Nossos Equipamentos</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cada equipamento foi selecionado para oferecer o máximo de precisão e segurança em cada procedimento.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
            {/* Category Tabs */}
            <div className="flex gap-2 flex-wrap justify-center">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-navy text-cream shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-navy/10"
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  {cat}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    activeCategory === cat ? "bg-gold text-navy" : "bg-background"
                  }`}>
                    {counts[cat]}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar equipamento..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-all"
              />
            </div>
          </div>

          {/* Equipment Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((eq, i) => (
              <AnimateOnScroll key={eq.name + eq.fullName} delay={i * 0.05}>
                <div className="group bg-white dark:bg-card rounded-xl border border-border/60 overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-52 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-navy/20 dark:to-navy/40 overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={eq.image}
                      alt={`${eq.name} ${eq.fullName} — Drudi e Almeida`}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {/* Category Badge */}
                    <span className={`absolute top-3 right-3 text-xs font-ui font-semibold px-3 py-1 rounded-full ${categoryColors[eq.category]}`}>
                      {eq.category}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-navy/5 dark:bg-gold/10 flex items-center justify-center shrink-0">
                        <eq.icon className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-navy dark:text-cream leading-tight">{eq.name}</h3>
                        <p className="font-ui text-xs text-gold font-medium">{eq.fullName}</p>
                      </div>
                    </div>

                    {/* Highlight */}
                    {eq.highlight && (
                      <div className="bg-gold/10 dark:bg-gold/5 border border-gold/20 rounded-lg px-3 py-1.5 mb-3">
                        <p className="font-ui text-xs font-semibold text-gold flex items-center gap-1.5">
                          <Zap className="w-3 h-3" />
                          {eq.highlight}
                        </p>
                      </div>
                    )}

                    <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                      {eq.description}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {eq.specialties.map((spec) => (
                        <span key={spec} className="text-xs font-ui bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="font-display text-xl text-navy dark:text-cream mb-2">Nenhum equipamento encontrado</p>
              <p className="font-body text-sm text-muted-foreground">Tente ajustar os filtros ou termos de busca.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl text-cream mb-4">Compromisso com a Inovação</h2>
            <p className="font-body text-base text-cream/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Participamos ativamente de congressos nacionais e internacionais para garantir que nossos pacientes tenham acesso ao que existe de mais moderno em oftalmologia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/agendar"
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar Consulta
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de saber mais sobre a tecnologia da clínica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-cream/30 text-cream font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-cream/10 transition-colors"
              >
                Fale pelo WhatsApp
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
