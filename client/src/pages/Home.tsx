/* ============================================================
   Home Page — Drudi e Almeida
   Design: "Luminance" Neoclassical Medical Aesthetic
   Hero, Institutos, Sobre, Tecnologia, Depoimentos, Blog, CTA
   ============================================================ */
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Shield, Heart, Zap, Users, Star, Palette, Award } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { IMAGES } from "@/lib/images";

const institutos = [
  {
    name: "Instituto da Catarata",
    href: "/instituto/catarata",
    desc: "Cirurgia de catarata a laser com tecnologia de ponta para restaurar a clareza da sua visão.",
    icon: Eye,
    color: "from-blue-500/10 to-blue-600/5",
    logo: IMAGES.institutoLogos.catarata,
  },
  {
    name: "Instituto do Ceratocone",
    href: "/instituto/ceratocone",
    desc: "Crosslinking e tratamentos avançados para estabilizar e tratar o ceratocone.",
    icon: Shield,
    color: "from-emerald-500/10 to-emerald-600/5",
    logo: IMAGES.institutoLogos.ceratocone,
  },
  {
    name: "Instituto do Glaucoma",
    href: "/instituto/glaucoma",
    desc: "Diagnóstico precoce e tratamento contínuo para preservar sua visão do glaucoma.",
    icon: Eye,
    color: "from-amber-500/10 to-amber-600/5",
    logo: IMAGES.institutoLogos.glaucoma,
  },
  {
    name: "Instituto da Retina",
    href: "/instituto/retina",
    desc: "Tratamento especializado para doenças da retina com tecnologia de última geração.",
    icon: Heart,
    color: "from-rose-500/10 to-rose-600/5",
    logo: IMAGES.institutoLogos.retina,
  },
  {
    name: "Instituto de Estrabismo",
    href: "/instituto/estrabismo",
    desc: "Alinhamento ocular para crianças e adultos com técnicas cirúrgicas modernas.",
    icon: Users,
    color: "from-violet-500/10 to-violet-600/5",
    logo: IMAGES.institutoLogos.estrabismo,
  },
];

const stats = [
  { value: "25+", label: "Anos de Experiência" },
  { value: "50.000+", label: "Pacientes Atendidos" },
  { value: "5", label: "Institutos Especializados" },
  { value: "100%", label: "Compromisso com Você" },
];

export default function Home() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero.eyeAbstract})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/50" />

        {/* Content */}
        <div className="relative container py-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Zap className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">
                REFERÊNCIA EM OFTALMOLOGIA
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Sua visão merece{" "}
              <span className="text-gold italic">excelência</span> e{" "}
              <span className="text-gold italic">cuidado</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Na Drudi e Almeida, unimos tecnologia de ponta, especialistas renomados e 
              5 institutos dedicados para oferecer o melhor cuidado oftalmológico do Brasil.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar Consulta
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-cream/10 transition-colors"
              >
                Conheça a Clínica
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="relative -mt-12 z-10">
        <div className="container">
          <div className="glass rounded-xl shadow-lg border border-border/50 grid grid-cols-2 md:grid-cols-4 divide-x divide-border/50">
            {stats.map((stat, i) => (
              <AnimateOnScroll key={stat.label} delay={i * 0.1} className="px-6 py-6 text-center">
                <div className="font-display text-2xl md:text-3xl text-navy font-bold">{stat.value}</div>
                <div className="font-ui text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== NOSSOS INSTITUTOS ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Acessibilidade e Especialização
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              Nossos Institutos
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cada instituto é dedicado a uma especialidade, garantindo que você receba o cuidado 
              mais especializado e atualizado para a sua condição.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {institutos.map((inst, i) => (
              <AnimateOnScroll key={inst.href} delay={i * 0.08}>
                <Link href={inst.href} className="group block">
                  <div className={`relative rounded-xl border border-border/60 p-7 h-full bg-gradient-to-br ${inst.color} hover:shadow-lg hover:border-gold/30 transition-all duration-300`}>
                    <img
                      src={inst.logo}
                      alt={inst.name}
                      className="w-16 h-16 object-contain mb-4 rounded-lg"
                    />
                    <h3 className="font-display text-xl text-navy mb-2 group-hover:text-gold transition-colors">
                      {inst.name}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                      {inst.desc}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-ui text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                      Saiba mais
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== SOBRE NÓS (PREVIEW) ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <AnimateOnScroll direction="left">
              <div className="relative">
                <img
                  src={IMAGES.hero.doctorConsultation}
                  alt="Consulta oftalmológica na Drudi e Almeida"
                  className="rounded-xl shadow-lg w-full aspect-[4/3] object-cover"
                />
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-4 md:right-6 glass rounded-lg shadow-lg p-4 max-w-[200px]">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <Star className="w-4 h-4 text-gold fill-gold" />
                    <Star className="w-4 h-4 text-gold fill-gold" />
                  </div>
                  <p className="font-ui text-xs text-navy font-semibold">Avaliação 5 estrelas</p>
                  <p className="font-body text-[11px] text-muted-foreground">Google Reviews</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Quem Somos
              </span>
              <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">
                Tradição e Inovação em Oftalmologia
              </h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                A Drudi e Almeida Clínicas Oftalmológicas é referência em saúde ocular, 
                combinando a experiência de profissionais altamente qualificados com a 
                tecnologia mais avançada disponível no mercado.
              </p>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                Nossos 5 institutos especializados foram criados com o propósito de trazer 
                acessibilidade e excelência no tratamento das principais doenças oculares, 
                garantindo que cada paciente receba um cuidado personalizado e humanizado.
              </p>
              <Link
                href="/sobre"
                className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy-light transition-colors"
              >
                Conheça Nossa História
                <ArrowRight className="w-4 h-4" />
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== TECNOLOGIA ========== */}
      <section className="relative section-padding overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero.technology})` }}
        />
        <div className="absolute inset-0 bg-navy/90" />

        <div className="relative container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Infraestrutura
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3 mb-4">
              Tecnologia de Ponta
            </h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto leading-relaxed">
              Investimos continuamente nos equipamentos mais modernos para garantir 
              diagnósticos precisos e tratamentos seguros.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Femto Laser", desc: "Precisão submicrométrica para cirurgia de catarata a laser." },
              { title: "OCT de Alta Resolução", desc: "Scan detalhado da retina e nervo óptico para diagnóstico precoce." },
              { title: "Crosslinking Acelerado", desc: "Tecnologia moderna para estabilizar o ceratocone de forma rápida." },
            ].map((tech, i) => (
              <AnimateOnScroll key={tech.title} delay={i * 0.15}>
                <div className="glass-dark rounded-xl p-7 h-full">
                  <div className="w-10 h-10 rounded-lg bg-gold/15 flex items-center justify-center mb-4">
                    <Zap className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-display text-lg text-cream mb-2">{tech.title}</h3>
                  <p className="font-body text-sm text-cream/60 leading-relaxed">{tech.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="text-center mt-10">
            <Link
              href="/tecnologia"
              className="inline-flex items-center gap-2 border border-gold/40 text-gold font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-gold/10 transition-colors"
            >
              Ver Todos os Equipamentos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== CORPO CLÍNICO ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Corpo Clínico
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              Nossos Especialistas
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Profissionais com formação de excelência e compromisso com o cuidado humanizado.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Fernando Macei Drudi",
                role: "Diretor Clínico",
                specialty: "Catarata e Retina Cirúrgica",
                crm: "CRM-SP 139.300",
                image: IMAGES.doctors.drFernando,
                highlight: "Condecoração \"Amigo da Marinha\" — Projeto Amazônia",
              },
              {
                name: "Dra. Priscilla R. de Almeida",
                role: "Diretora Técnica",
                specialty: "Segmento Anterior e Lentes de Contato",
                crm: "CRM-SP 148.173",
                image: IMAGES.doctors.draPriscilla,
                highlight: "Fellowship em Córnea — EPM/UNIFESP",
              },
              {
                name: "Dra. Maria Amélia V. de Melo",
                role: "Cirurgiã de Estrabismo",
                specialty: "Estrabismo e Oftalmologia Pediátrica",
                crm: "CRM-SP 199.188",
                image: IMAGES.doctors.draMariaAmelia,
                highlight: "Especialização em Estrabismo",
              },
            ].map((doc, i) => (
              <AnimateOnScroll key={doc.name} delay={i * 0.12}>
                <div className="group bg-white rounded-xl border border-border/60 overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300">
                  {/* Photo */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <span className="inline-block bg-gold/90 text-navy font-ui text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                        {doc.role}
                      </span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-5">
                    <h3 className="font-display text-lg text-navy mb-0.5">{doc.name}</h3>
                    <p className="font-ui text-xs text-gold font-semibold mb-1">{doc.specialty}</p>
                    <p className="font-body text-[11px] text-muted-foreground mb-3">{doc.crm}</p>
                    <div className="flex items-start gap-2 bg-cream/60 rounded-lg p-2.5 border border-gold/10">
                      <Award className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                      <p className="font-ui text-[11px] text-navy leading-snug">{doc.highlight}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="text-center mt-10">
            <Link
              href="/sobre#corpo-clinico"
              className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy-light transition-colors"
            >
              Conheça Nossos Especialistas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== DEPOIMENTOS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Depoimentos
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              O que Nossos Pacientes Dizem
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A satisfação dos nossos pacientes é a nossa maior recompensa. Confira alguns relatos de quem confiou na Drudi e Almeida.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Dona Aparecida G.",
                age: 74,
                unit: "Unidade Santana",
                text: "Eu já não conseguia mais ler o nome dos netos no celular. Achava que era da idade, mas era catarata nos dois olhos. O Dr. Fernando operou o primeiro olho e, no dia seguinte, eu chorei de emoção — as cores voltaram, tudo ficou nítido. Parecia que tinham limpado um vidro sujo que eu nem sabia que existia.",
                instituto: "Instituto da Catarata",
                stars: 5,
              },
              {
                name: "Lucas T.",
                age: 22,
                unit: "Unidade Tatuapé",
                text: "Com 17 anos descobri o ceratocone e entrei em pânico achando que ia ficar cego. A Dra. Priscilla me acalmou, explicou tudo com desenhos e fez o crosslinking. Hoje, 5 anos depois, meu grau estabilizou e uso lente escleral que ela mesma adaptou. Mudou minha vida.",
                instituto: "Instituto do Ceratocone",
                stars: 5,
              },
              {
                name: "Sônia Maria R.",
                age: 61,
                unit: "Unidade Lapa",
                text: "Descobri o glaucoma por acaso, num exame de rotina. Não sentia nada. A equipe me explicou que já tinha perdido um pouco do campo visual e que sem tratamento ia piorar. Faço acompanhamento há 4 anos, uso os colírios direitinho e a pressão está controlada. Agradeço por terem pego a tempo.",
                instituto: "Instituto do Glaucoma",
                stars: 5,
              },
              {
                name: "Seu Antônio P.",
                age: 69,
                unit: "Unidade Guarulhos",
                text: "Sou diabético há 20 anos e comecei a ver umas manchas escuras. O Dr. Fernando fez o mapeamento da retina e viu que tinha vazamento de sangue. Fiz as injeções no olho — confesso que tinha medo, mas não doeu nada. Minha visão melhorou muito e continuo o acompanhamento.",
                instituto: "Instituto da Retina",
                stars: 5,
              },
              {
                name: "Camila F.",
                age: 32,
                unit: "Unidade São Miguel",
                text: "Minha filha Sofia, de 4 anos, tinha um olhinho que virava para dentro. A Dra. Maria Amélia foi tão carinhosa que a Sofia nem chorou. Fez a cirurgia e em uma semana os olhinhos dela estavam alinhados. Na escola, pararam de perguntar 'o que tem no olho dela'. Sou muito grata.",
                instituto: "Instituto de Estrabismo",
                stars: 5,
              },
              {
                name: "Marcos V.",
                age: 48,
                unit: "Unidade Santana",
                text: "Trabalho com computador o dia todo e estava com os olhos sempre vermelhos e ardendo. Fui na Drudi e Almeida e descobri que era olho seco severo. A Dra. Priscilla montou um tratamento personalizado e em 2 meses melhorou 90%. O diferencial é que eles investigam a causa, não só dão colírio.",
                instituto: "Consulta Geral",
                stars: 5,
              },
            ].map((dep, i) => (
              <AnimateOnScroll key={dep.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-border/60 p-6 h-full hover:shadow-md transition-shadow duration-300">
                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: dep.stars }).map((_, si) => (
                      <Star key={si} className="w-4 h-4 text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="font-body text-sm text-foreground/80 leading-relaxed mb-5 italic">
                    "{dep.text}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/40">
                    <div>
                      <p className="font-ui text-sm font-semibold text-navy">{dep.name}</p>
                      <p className="font-body text-xs text-muted-foreground">{dep.age} anos • {dep.unit}</p>
                    </div>
                    <span className="font-ui text-[10px] font-semibold tracking-wide uppercase text-gold/80 bg-gold/8 px-2.5 py-1 rounded-full">
                      {dep.instituto}
                    </span>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARTE E VISÃO ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">
              Quando a Arte Revela a Visão
            </h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              Grandes mestres da pintura tinham condições oculares que transformaram suas obras. Na Drudi e Almeida, usamos essas histórias para conectar arte, ciência e cuidado com a visão.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Monet */}
            <AnimateOnScroll delay={0}>
              <Link href="/instituto/catarata" className="group block">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={IMAGES.art.monetJapaneseBridge} alt="Monet - Ponte Japonesa antes e depois da catarata" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 bg-cream/5 backdrop-blur-sm">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Catarata</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Claude Monet</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">A catarata transformou as cores vibrantes de Monet em tons amarelados e borrados — visível em suas pinturas.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Degas */}
            <AnimateOnScroll delay={0.1}>
              <Link href="/instituto/retina" className="group block">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={IMAGES.art.degasDancers} alt="Degas - Bailarinas, afetado por doença retiniana" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 bg-cream/5 backdrop-blur-sm">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Retina</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Edgar Degas</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">A degeneração macular de Degas fez suas bailarinas ficarem cada vez mais borradas e pastosas.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Da Vinci */}
            <AnimateOnScroll delay={0.2}>
              <Link href="/instituto/estrabismo" className="group block">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img src={IMAGES.art.daVinciStrabismus} alt="Leonardo da Vinci - Estrabismo que ajudou sua arte" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 bg-cream/5 backdrop-blur-sm">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Estrabismo</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Leonardo da Vinci</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">Estudos revelam que Da Vinci tinha exotropia intermitente, o que pode ter contribuído para sua genialidade.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== UNIDADES ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Perto de Você
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              Nossas Unidades
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              5 unidades estrategicamente localizadas na Grande São Paulo para facilitar o seu acesso.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "Santana", address: "Rua Dr. César, 130", city: "São Paulo - SP" },
              { name: "Tatuapé", address: "Rua Tuiuti, 2429", city: "São Paulo - SP" },
              { name: "Lapa", address: "Rua Barão de Jundiaí, 221", city: "São Paulo - SP" },
              { name: "São Miguel", address: "Rua Bernardo Marcondes, 108", city: "São Paulo - SP" },
              { name: "Guarulhos", address: "Rua Sete de Setembro, 375", city: "Guarulhos - SP" },
            ].map((u, i) => (
              <AnimateOnScroll key={u.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-border/60 p-5 text-center hover:shadow-md hover:border-gold/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-base text-navy mb-1">{u.name}</h3>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">{u.address}</p>
                  <p className="font-body text-xs text-muted-foreground">{u.city}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll className="text-center mt-8">
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy-light transition-colors"
            >
              Ver Todas as Unidades no Mapa
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="relative rounded-2xl overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${IMAGES.hero.happyFamily})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/50" />

            <div className="relative px-8 py-16 md:px-16 md:py-20">
              <AnimateOnScroll>
                <h2 className="font-display text-3xl md:text-4xl text-cream max-w-lg leading-tight mb-4">
                  Cuide da sua visão com quem é referência
                </h2>
                <p className="font-body text-base text-cream/80 max-w-md leading-relaxed mb-8">
                  Agende sua consulta e descubra como podemos ajudar você a enxergar 
                  o mundo com mais clareza e qualidade de vida.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
                  >
                    Agendar pelo WhatsApp
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="tel:+5511916544653"
                    className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-cream/10 transition-colors"
                  >
                    Ligar Agora
                  </a>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
