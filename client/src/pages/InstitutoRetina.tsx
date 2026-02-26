/* ============================================================
   Instituto da Retina — Drudi e Almeida
   Hero parallax com obra de arte + Receber Preço + CTA final
   ============================================================ */
import { useState, useRef } from "react";
import {
  Eye, ChevronRight, Phone, MessageCircle, DollarSign,
  AlertCircle, CheckCircle, Palette, Star, MapPin, Users
} from "lucide-react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import FAQSection from "@/components/FAQSection";
import { IMAGES } from "@/lib/images";

/* ---- Constants ---- */
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/MozNCXrPhMWauJmt.png";
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de retina.";
const PHONE = "(11) 91654-4653";

const unidades = [
  { id: "jundiai", name: "Jundiaí", address: "Jundiaí - SP" },
  { id: "santana", name: "Santana (São Paulo)", address: "São Paulo - SP" },
];

const doencas = [
  { title: "Retinopatia Diabética", desc: "Complicação do diabetes que afeta os vasos sanguíneos da retina. O controle glicêmico e o acompanhamento regular são essenciais." },
  { title: "Degeneração Macular (DMRI)", desc: "Afeta a mácula, causando perda da visão central. Principal causa de perda de visão em pessoas com mais de 60 anos." },
  { title: "Descolamento de Retina", desc: "Emergência médica em que a retina se separa de sua posição normal. Requer tratamento cirúrgico imediato." },
  { title: "Oclusões Vasculares", desc: "Conhecidas como 'derrames no olho', ocorrem quando uma veia ou artéria da retina é bloqueada." },
];

const tratamentos = [
  { title: "OCT de Alta Resolução", desc: "Imagens transversais da retina com altíssima resolução para diagnóstico e acompanhamento." },
  { title: "Injeções Intravítreas (Anti-VEGF)", desc: "Bloqueiam o crescimento de vasos anormais, reduzindo inchaço e melhorando a visão." },
  { title: "Fotocoagulação a Laser", desc: "Trata áreas de isquemia e sela rasgos na retina, prevenindo o descolamento." },
  { title: "Vitrectomia", desc: "Microcirurgia intraocular para tratar descolamentos, hemorragias e condições complexas." },
];

const faqItems = [
  { question: "A retinopatia diabética tem sintomas no início?", answer: "Não. Nas fases iniciais, é assintomática. Todo paciente diabético deve realizar exame de fundo de olho pelo menos uma vez por ano." },
  { question: "As injeções no olho doem?", answer: "O procedimento é realizado com anestesia por colírios, é muito rápido e praticamente indolor. O paciente pode sentir uma leve pressão." },
  { question: "O que são as 'moscas volantes'?", answer: "São pequenas opacidades no vítreo que projetam sombras na retina. Na maioria dos casos são benignas, mas um aumento súbito acompanhado de flashes de luz requer avaliação urgente." },
  { question: "A DMRI pode levar à cegueira total?", answer: "A DMRI afeta a visão central, mas geralmente preserva a visão periférica. Não costuma levar à cegueira total, mas pode causar perda severa da visão central." },
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
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6"
            >
              <Link href="/" className="hover:text-gold transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">Instituto da Retina</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DA RETINA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Tratamento de Retina com{" "}
              <span className="text-gold italic">alta tecnologia</span> e{" "}
              <span className="text-gold italic">excelência</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Selecione a unidade mais próxima e receba informações sobre o tratamento de doenças da retina com os melhores especialistas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-cream/10 max-w-md"
            >
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
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                ))}
              </div>
              <span className="font-body text-sm text-muted-foreground">Avaliação Google</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" />
              <span className="font-body text-sm text-navy font-semibold">2 Unidades</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gold" />
              <span className="font-body text-sm text-navy font-semibold">Especialistas em Retina</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É ========== */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é a Retina?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">A retina é uma fina camada de tecido sensível à luz que reveste o interior do olho. Ela funciona como o filme de uma câmera fotográfica, capturando as imagens e enviando-as ao cérebro através do nervo óptico.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">A mácula, uma pequena área no centro da retina, é responsável pela visão central de detalhes e cores. Qualquer doença que afete a retina pode ter impacto significativo na visão.</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 4. DOENÇAS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Especialidades</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Doenças que Tratamos</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {doencas.map((d, i) => (
              <AnimateOnScroll key={d.title} delay={i * 0.08}>
                <div className="p-6 bg-white rounded-xl border border-border/60 h-full hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3"><AlertCircle className="w-4 h-4 text-gold" /></div>
                  <h3 className="font-display text-lg text-navy mb-2">{d.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 5. TRATAMENTOS ========== */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Tratamentos</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Diagnóstico e Tratamento de Ponta</h2>
          </AnimateOnScroll>
          <div className="space-y-5">
            {tratamentos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-xl border border-border/60 bg-white hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0"><CheckCircle className="w-5 h-5 text-gold" /></div>
                  <div><h3 className="font-display text-lg text-navy mb-1">{t.title}</h3><p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p></div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. ARTE E VISÃO — DEGAS & PONTILHISMO ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Ccircle cx=\"3\" cy=\"3\" r=\"2\"/%3E%3Ccircle cx=\"33\" cy=\"33\" r=\"2\"/%3E%3Ccircle cx=\"18\" cy=\"48\" r=\"1.5\"/%3E%3Ccircle cx=\"48\" cy=\"18\" r=\"1.5\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">Degas, Seurat e a Retina</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              A história da arte está repleta de exemplos de como a visão influencia a criação artística.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.degasDancers} alt="Edgar Degas - Bailarinas" className="w-full h-64 object-cover" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-cream mb-3">Edgar Degas</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  O mestre das bailarinas sofria de <strong className="text-gold">degeneração macular</strong>, uma doença da retina que destrói a visão central. Ao longo dos anos, suas pinturas passaram de detalhes nítidos para formas cada vez mais borradas.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Degas migrou da pintura a óleo para o pastel e a escultura justamente porque sua retina já não permitia o trabalho de precisão.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.seuratGrandeJatte} alt="Georges Seurat - Pontilhismo" className="w-full h-64 object-cover" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-cream mb-3">Pontilhismo e a Retina</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  Georges Seurat criou o <strong className="text-gold">pontilhismo</strong> — uma técnica que usa milhares de pontos coloridos que se misturam na retina do observador.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Esta técnica demonstra como a retina é essencial para a percepção visual: ela não apenas capta a luz, mas interpreta e combina informações para formar as imagens que vemos.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 7. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre doenças da retina." />

      {/* ========== 8. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Agende sua <span className="text-gold">consulta avaliativa</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossos especialistas em retina estão prontos para avaliar seu caso e indicar o melhor tratamento. Cuide da saúde da sua retina.
              </p>

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
