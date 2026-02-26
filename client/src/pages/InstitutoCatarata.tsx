/* ============================================================
   Instituto da Catarata — Drudi e Almeida
   Estrutura inspirada na Central da Visão, adaptada ao estilo
   navy/gold da Drudi e Almeida.
   Seções: Hero → O que é → Arte e Visão (Monet) → Sintomas (zigzag)
   → Tipos de Cirurgia → Lentes Intraoculares → Recuperação → FAQ → CTA
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import {
  Eye, AlertCircle, CheckCircle, Palette, ChevronRight,
  Clock, Shield, Sparkles, Sun, Moon, Glasses, RefreshCw,
  Droplets, Activity, ArrowRight, Timer, Calendar, Heart
} from "lucide-react";
import { motion } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";

/* ---- Data ---- */

const sintomasZigzag = [
  {
    title: "Visão embaçada ou turva",
    description: "Um dos sinais mais comuns da catarata. É como se você estivesse olhando através de uma janela suja ou enevoada, dificultando atividades como leitura ou reconhecimento de rostos.",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=700&q=80",
    icon: Eye,
  },
  {
    title: "Maior sensibilidade à luz",
    description: "Ambientes muito iluminados ou luzes fortes podem causar desconforto, dificultando tarefas simples como caminhar em dias ensolarados ou dirigir à noite com faróis de outros veículos.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=700&q=80",
    icon: Sun,
  },
  {
    title: "Dificuldade de enxergar à noite",
    description: "Especialmente ao dirigir, os faróis de outros veículos podem causar ofuscamento intenso, enquanto ruas pouco iluminadas parecem ainda mais escuras e difíceis de navegar.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=700&q=80",
    icon: Moon,
  },
  {
    title: "Trocas frequentes no grau dos óculos",
    description: "A catarata altera progressivamente a refração do olho, fazendo com que o grau dos óculos mude com frequência sem que a nova prescrição resolva completamente o problema visual.",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?w=700&q=80",
    icon: Glasses,
  },
  {
    title: "Alteração na percepção das cores",
    description: "As cores podem parecer desbotadas, amareladas ou menos vibrantes. Isso ocorre porque o cristalino opaco filtra a luz de forma irregular, alterando a percepção cromática.",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=80",
    icon: Palette,
  },
];

const tiposCirurgia = [
  {
    name: "Facoemulsificação",
    badge: "Mais Comum",
    description: "Técnica mais utilizada no mundo. Utiliza ultrassom para fragmentar e aspirar o cristalino opaco através de uma microincisão de apenas 2mm. Recuperação rápida e segura.",
    highlights: ["Microincisão de 2mm", "Anestesia tópica (colírio)", "Recuperação em 24-48h"],
  },
  {
    name: "Cirurgia a Laser (Femtossegundo)",
    badge: "Alta Tecnologia",
    description: "O laser de femtossegundo realiza as incisões e a fragmentação do cristalino com precisão micrométrica, guiado por computador. Maior previsibilidade e personalização do procedimento.",
    highlights: ["Precisão micrométrica", "Guiada por computador", "Menos energia ultrassônica"],
  },
  {
    name: "Cirurgia Combinada",
    badge: "Especializada",
    description: "Em alguns casos, a cirurgia de catarata pode ser combinada com outros procedimentos, como correção de glaucoma ou implante de lentes especiais para astigmatismo.",
    highlights: ["Catarata + Glaucoma", "Correção de astigmatismo", "Menos procedimentos"],
  },
];

const lentesIntraoculares = [
  {
    name: "Monofocal",
    description: "Corrige a visão para uma única distância (geralmente longe). Pode ser necessário o uso de óculos para leitura após a cirurgia.",
    ideal: "Pacientes que não se importam em usar óculos para perto",
  },
  {
    name: "Multifocal / Trifocal",
    description: "Permite enxergar em múltiplas distâncias (longe, intermediário e perto), reduzindo significativamente a dependência de óculos no dia a dia.",
    ideal: "Pacientes que desejam independência dos óculos",
  },
  {
    name: "Tórica",
    description: "Projetada para corrigir o astigmatismo além da catarata. Disponível em versões monofocal e multifocal para máxima personalização.",
    ideal: "Pacientes com astigmatismo significativo",
  },
  {
    name: "EDOF (Profundidade de Foco Estendida)",
    description: "Oferece uma faixa contínua de visão nítida, especialmente para longe e intermediário, com menor incidência de halos noturnos comparada às multifocais.",
    ideal: "Pacientes que priorizam visão intermediária (computador)",
  },
];

const recuperacaoTimeline = [
  { periodo: "Dia 1", titulo: "Pós-operatório imediato", descricao: "Repouso relativo. Uso de colírios prescritos. Evitar esforço físico e não coçar os olhos. Protetor ocular para dormir.", icon: Timer },
  { periodo: "1ª Semana", titulo: "Primeiros dias", descricao: "Melhora progressiva da visão. Retorno às atividades leves como ler e assistir TV. Consulta de revisão com o médico.", icon: Eye },
  { periodo: "2ª a 4ª Semana", titulo: "Recuperação intermediária", descricao: "Visão estabilizando. Liberação gradual para atividades físicas leves. Continuar com os colírios conforme orientação.", icon: Calendar },
  { periodo: "1 a 3 Meses", titulo: "Recuperação completa", descricao: "Visão estabilizada. Avaliação final do grau residual. Prescrição de óculos definitivos, se necessário. Alta médica.", icon: Heart },
];

const faqItems = [
  { question: "A cirurgia de catarata dói?", answer: "Não. A cirurgia é realizada com anestesia local (colírios anestésicos) e é completamente indolor. O paciente pode sentir um leve desconforto no pós-operatório, que é facilmente controlado com medicação prescrita pelo médico." },
  { question: "Quanto tempo dura a cirurgia?", answer: "O procedimento é muito rápido, durando em média de 10 a 20 minutos por olho. O paciente fica na clínica por algumas horas para preparação e observação pós-operatória." },
  { question: "A catarata pode voltar após a cirurgia?", answer: "Não. Uma vez que o cristalino opaco é removido e substituído pela lente intraocular, a catarata não retorna. O que pode ocorrer em alguns casos é a opacificação da cápsula posterior (membrana que sustenta a lente), resolvida com um procedimento a laser simples e rápido chamado capsulotomia com Yag Laser." },
  { question: "Quando poderei voltar às atividades normais?", answer: "A recuperação é rápida. A maioria dos pacientes retoma atividades como ler e assistir TV já no dia seguinte. Atividades físicas intensas e natação devem aguardar de 2 a 4 semanas, conforme orientação médica." },
  { question: "Qual a idade ideal para operar a catarata?", answer: "Não existe uma idade específica. A cirurgia é indicada quando a catarata começa a comprometer a qualidade de vida e as atividades diárias do paciente. Quanto mais cedo o diagnóstico, melhor o planejamento cirúrgico." },
  { question: "Posso operar os dois olhos no mesmo dia?", answer: "Geralmente, os olhos são operados em dias diferentes, com intervalo de 1 a 2 semanas entre cada procedimento. Isso permite acompanhar a recuperação do primeiro olho antes de operar o segundo." },
  { question: "Qual tipo de lente intraocular é melhor para mim?", answer: "A escolha da lente depende de diversos fatores: estilo de vida, atividades profissionais, presença de astigmatismo e expectativas do paciente. Na consulta pré-operatória, nossos especialistas avaliam cada caso individualmente para recomendar a melhor opção." },
  { question: "A cirurgia é coberta pelo plano de saúde?", answer: "Sim. A cirurgia de catarata por facoemulsificação é coberta pelos planos de saúde. As lentes premium (multifocais, trifocais, tóricas) podem ter cobertura parcial, com complementação pelo paciente. Consulte seu plano para detalhes." },
];

/* ---- Component ---- */

export default function InstitutoCatarata() {
  return (
    <>
      {/* ========== HERO ========== */}
      <section className="relative min-h-[55vh] md:min-h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero.doctorConsultation})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/60" />

        <div className="relative h-full container flex flex-col justify-end pb-12 pt-32 md:pt-24">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6"
          >
            <Link href="/" className="hover:text-gold transition-colors">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">Instituto da Catarata</span>
          </motion.nav>

          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-5"
            >
              <Eye className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.15em] uppercase text-gold">Instituto da Catarata</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="font-display text-3xl md:text-5xl lg:text-6xl text-cream leading-tight"
            >
              Recupere a clareza e as cores da vida
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-base md:text-lg text-cream/80 max-w-2xl mt-5 leading-relaxed"
            >
              Cirurgia de catarata com tecnologia de última geração, equipe especializada e cuidado humanizado. Mais de 15 anos devolvendo a visão nítida aos nossos pacientes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta no Instituto da Catarata."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar Consulta
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+5511916544653"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-cream/10 transition-colors"
              >
                Ligar: (11) 91654-4653
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="w-20 h-0.5 bg-gold mt-8 origin-left"
          />
        </div>
      </section>

      {/* ========== MÉTRICAS ========== */}
      <section className="bg-navy/5 border-y border-border/40">
        <div className="container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "15+", label: "Anos de Experiência" },
              { value: "14", label: "Equipamentos de Ponta" },
              { value: "5", label: "Institutos Especializados" },
              { value: "100%", label: "Cuidado Humanizado" },
            ].map((stat, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div>
                  <span className="font-display text-2xl md:text-3xl text-gold">{stat.value}</span>
                  <p className="font-ui text-xs text-muted-foreground mt-1 tracking-wide">{stat.label}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== O QUE É CATARATA ========== */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagem comparativa */}
            <AnimateOnScroll>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-xl border border-border/40">
                  <img
                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&q=80"
                    alt="Exame oftalmológico detalhado"
                    className="w-full h-auto object-cover aspect-[4/3]"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-6 -right-4 md:-right-8 bg-white rounded-xl shadow-lg border border-border/40 p-4 max-w-[220px]">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <span className="font-ui text-xs font-bold text-navy">Procedimento Seguro</span>
                  </div>
                  <p className="font-body text-xs text-muted-foreground leading-relaxed">Cirurgia mais realizada no mundo com taxa de sucesso superior a 98%</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Texto */}
            <AnimateOnScroll delay={0.15}>
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
                <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é a Catarata?</h2>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  A catarata é a <strong className="text-navy">opacificação do cristalino</strong>, a lente natural do olho localizada atrás da íris e da pupila. Este processo, geralmente relacionado ao envelhecimento, torna a visão progressivamente embaçada — como se você olhasse através de um vidro fosco.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                  O cristalino é responsável por focar a luz na retina, formando as imagens que enxergamos. Com o tempo, as proteínas do cristalino se agrupam, criando áreas opacas que crescem gradualmente e comprometem a qualidade visual.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                  Embora mais comum após os 60 anos, a catarata também pode ser <strong className="text-navy">congênita, traumática ou causada por medicamentos</strong> e doenças metabólicas como o diabetes.
                </p>
                <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
                  <p className="font-body text-sm text-navy leading-relaxed">
                    <strong>Você sabia?</strong> A catarata é a principal causa de cegueira reversível no mundo. A boa notícia é que a cirurgia moderna é rápida, segura e devolve a visão com excelência.
                  </p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== ARTE E VISÃO — MONET ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />

        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">
              Quando Monet Perdeu as Cores
            </h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              Claude Monet, o pai do Impressionismo, desenvolveu catarata bilateral a partir dos 60 anos. A doença transformou profundamente sua percepção das cores — e suas pinturas são a prova viva disso.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-2xl">
                <img
                  src={IMAGES.art.monetJapaneseBridge}
                  alt="Monet - A Ponte Japonesa: comparação antes e depois da catarata (1899 vs 1920-1922)"
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-4 border border-cream/10">
                  <span className="font-display text-lg text-gold">1899</span>
                  <p className="font-body text-sm text-cream/60 mt-1">Visão normal — cores vibrantes, verdes e azuis nítidos</p>
                </div>
                <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-4 border border-cream/10">
                  <span className="font-display text-lg text-gold">1918–1920</span>
                  <p className="font-body text-sm text-cream/60 mt-1">Catarata avançando — tons amarelados e avermelhados dominam</p>
                </div>
                <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-4 border border-cream/10">
                  <span className="font-display text-lg text-gold">1922</span>
                  <p className="font-body text-sm text-cream/60 mt-1">Catarata severa — formas quase abstratas, vermelho e marrom</p>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.15}>
            <div className="max-w-3xl mx-auto mt-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                  <img
                    src={IMAGES.art.monetBeforeAfter}
                    alt="Monet - Pinturas antes e depois da catarata"
                    className="w-full h-auto"
                  />
                </div>
                <div>
                  <h3 className="font-display text-2xl text-cream mb-4">A Catarata Através dos Olhos de Monet</h3>
                  <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                    Em 1905, Monet começou a notar dificuldades visuais. Aos poucos, o cristalino opaco filtrava a luz azul, fazendo com que ele percebesse o mundo em tons cada vez mais amarelados e avermelhados.
                  </p>
                  <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                    Suas famosas Ninfeias e a Ponte Japonesa passaram a ser dominadas por tons quentes e formas imprecisas — um reflexo direto da progressão da catarata.
                  </p>
                  <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                    Em 1923, aos 82 anos, Monet finalmente aceitou realizar a cirurgia. Após o procedimento, ficou impressionado ao perceber que suas pinturas recentes tinham cores completamente diferentes do que ele imaginava.
                  </p>
                  <div className="bg-gold/10 rounded-xl p-4 border border-gold/20 mt-4">
                    <p className="font-body text-sm text-gold italic leading-relaxed">
                      "Percebo que as cores não são mais as mesmas... o vermelho começou a parecer lamacento, minha pintura está ficando cada vez mais sombria."
                    </p>
                    <span className="font-ui text-xs text-cream/50 mt-2 block">— Claude Monet, 1914</span>
                  </div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll delay={0.2}>
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl p-8 border border-gold/20">
                <Eye className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-display text-xl text-cream mb-3">Da Arte à Medicina Moderna</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed max-w-xl mx-auto">
                  Hoje, a cirurgia de catarata é um dos procedimentos mais seguros e realizados no mundo. Na Drudi e Almeida, utilizamos tecnologia de última geração que Monet jamais poderia imaginar — recuperando não apenas a visão, mas as cores e a nitidez da vida.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== SINTOMAS — LAYOUT ZIGZAG ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-16">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fique Atento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">
              Quais são os <span className="text-gold">sintomas</span> da catarata?
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              Os sintomas da catarata tendem a se desenvolver lentamente, o que faz com que muitas pessoas só percebam as mudanças na visão quando a condição já está mais avançada. Por isso, é fundamental estar atento aos sinais.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>

          <div className="space-y-16 md:space-y-24 max-w-5xl mx-auto">
            {sintomasZigzag.map((sintoma, i) => {
              const isReversed = i % 2 !== 0;
              const Icon = sintoma.icon;
              return (
                <AnimateOnScroll key={i}>
                  <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center ${isReversed ? "md:direction-rtl" : ""}`}>
                    {/* Image */}
                    <div className={`${isReversed ? "md:order-2" : "md:order-1"}`}>
                      <div className="rounded-2xl overflow-hidden shadow-lg border border-border/30">
                        <img
                          src={sintoma.image}
                          alt={sintoma.title}
                          className="w-full h-auto object-cover aspect-[4/3]"
                        />
                      </div>
                    </div>

                    {/* Text */}
                    <div className={`${isReversed ? "md:order-1" : "md:order-2"}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                          <Icon className="w-5 h-5 text-gold" />
                        </div>
                        <span className="font-ui text-xs font-semibold tracking-wider uppercase text-gold">Sintoma {i + 1}</span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl text-navy mb-4">{sintoma.title}</h3>
                      <p className="font-body text-base text-muted-foreground leading-relaxed">
                        {sintoma.description}
                      </p>
                    </div>
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>

          {/* CTA intermediário */}
          <AnimateOnScroll>
            <div className="text-center mt-16">
              <div className="bg-gold/5 border border-gold/20 rounded-2xl p-8 max-w-2xl mx-auto">
                <AlertCircle className="w-8 h-8 text-gold mx-auto mb-4" />
                <h3 className="font-display text-xl text-navy mb-3">Identificou algum desses sintomas?</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                  Não espere a catarata avançar. Quanto mais cedo o diagnóstico, melhor o resultado da cirurgia e mais rápida a recuperação.
                </p>
                <a
                  href="https://wa.me/5511916544653?text=Olá! Estou com sintomas de catarata e gostaria de agendar uma avaliação."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
                >
                  Agendar Avaliação
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== TIPOS DE CIRURGIA ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tipos de Cirurgia de Catarata</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              O único tratamento eficaz para a catarata é a cirurgia. Conheça as técnicas disponíveis na Drudi e Almeida.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {tiposCirurgia.map((tipo, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border/40 p-6 h-full flex flex-col shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-navy/5 flex items-center justify-center">
                      {i === 0 && <Droplets className="w-6 h-6 text-navy" />}
                      {i === 1 && <Sparkles className="w-6 h-6 text-gold" />}
                      {i === 2 && <Activity className="w-6 h-6 text-navy" />}
                    </div>
                    <span className={`font-ui text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${
                      i === 1 ? "bg-gold/10 text-gold" : "bg-navy/5 text-navy/70"
                    }`}>
                      {tipo.badge}
                    </span>
                  </div>
                  <h3 className="font-display text-lg text-navy mb-3">{tipo.name}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                    {tipo.description}
                  </p>
                  <div className="space-y-2 pt-4 border-t border-border/40">
                    {tipo.highlights.map((h, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-gold shrink-0" />
                        <span className="font-body text-xs text-navy">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== LENTES INTRAOCULARES ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Personalização</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tipos de Lentes Intraoculares</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
              A lente intraocular substitui o cristalino opaco e define a qualidade da sua visão após a cirurgia. Cada tipo atende a necessidades diferentes.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {lentesIntraoculares.map((lente, i) => (
              <AnimateOnScroll key={i} delay={i * 0.1}>
                <div className="bg-white rounded-2xl border border-border/40 p-6 hover:border-gold/30 transition-colors shadow-sm hover:shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0 mt-1">
                      <Eye className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-navy mb-2">{lente.name}</h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                        {lente.description}
                      </p>
                      <div className="bg-navy/5 rounded-lg px-4 py-2.5">
                        <span className="font-ui text-[10px] font-bold tracking-wider uppercase text-navy/60">Ideal para:</span>
                        <p className="font-body text-xs text-navy mt-0.5">{lente.ideal}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          <AnimateOnScroll>
            <div className="text-center mt-10">
              <p className="font-body text-sm text-muted-foreground mb-4">
                A escolha da lente ideal é feita em conjunto com o médico, considerando seu estilo de vida e necessidades visuais.
              </p>
              <Link
                href="/tecnologia"
                className="inline-flex items-center gap-2 text-gold font-ui text-sm font-semibold hover:text-gold-light transition-colors"
              >
                Conheça nossos equipamentos
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== RECUPERAÇÃO — TIMELINE ========== */}
      <section className="section-padding bg-navy text-cream">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Pós-Operatório</span>
            <h2 className="font-display text-3xl md:text-4xl text-cream mt-3">Recuperação da Cirurgia</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              A recuperação da cirurgia de catarata é rápida e progressiva. Veja o que esperar em cada fase.
            </p>
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gold/20" />

              <div className="space-y-8">
                {recuperacaoTimeline.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <AnimateOnScroll key={i} delay={i * 0.1}>
                      <div className="flex gap-5 md:gap-8 relative">
                        {/* Icon circle */}
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-navy border-2 border-gold/40 flex items-center justify-center shrink-0 z-10">
                          <Icon className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                        </div>

                        {/* Content */}
                        <div className="bg-cream/5 backdrop-blur-sm rounded-xl p-5 border border-cream/10 flex-1">
                          <span className="font-ui text-xs font-bold tracking-wider uppercase text-gold">{item.periodo}</span>
                          <h3 className="font-display text-lg text-cream mt-1 mb-2">{item.titulo}</h3>
                          <p className="font-body text-sm text-cream/70 leading-relaxed">{item.descricao}</p>
                        </div>
                      </div>
                    </AnimateOnScroll>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FAQ ========== */}
      <FAQSection
        items={faqItems}
        subtitle="Tire suas dúvidas sobre a cirurgia de catarata e o pós-operatório."
      />

      {/* ========== CTA FINAL ========== */}
      <InstitutoCTA
        title="Agende Sua Avaliação"
        text="Nossos especialistas em catarata estão prontos para avaliar seu caso e indicar o melhor tratamento. Recupere a clareza da sua visão com quem entende."
      />
    </>
  );
}
