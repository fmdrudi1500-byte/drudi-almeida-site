/* ============================================================
   Instituto do Ceratocone — Drudi e Almeida
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
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/FNcnFFJFKrDuNgLS.png";
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de ceratocone.";
const PHONE = "(11) 91654-4653";

const unidades = [
  { id: "jundiai", name: "Jundiaí", address: "Jundiaí - SP" },
  { id: "santana", name: "Santana (São Paulo)", address: "São Paulo - SP" },
];

const sintomas = [
  "Visão borrada e distorcida",
  "Aumento rápido do astigmatismo e miopia",
  "Necessidade de trocar óculos com frequência",
  "Visão de halos ao redor das luzes",
  "Visão dupla em um olho",
  "Sensibilidade à luz",
];

const tratamentos = [
  { title: "Crosslinking de Córnea", desc: "Tratamento padrão-ouro que utiliza riboflavina e luz ultravioleta para enrijecer as fibras de colágeno da córnea, impedindo a progressão." },
  { title: "Anel Intracorneano", desc: "Implante de segmentos de anel na córnea para regularizar sua curvatura, melhorando a acuidade visual." },
  { title: "Lentes de Contato Especiais", desc: "Lentes rígidas gás-permeáveis ou esclerais para corrigir o astigmatismo irregular e proporcionar visão nítida." },
];

const faqItems = [
  { question: "Coçar os olhos pode causar ceratocone?", answer: "Sim. O ato de coçar os olhos de forma crônica e vigorosa é um dos principais fatores de risco associados ao desenvolvimento e à progressão do ceratocone. É fundamental evitar esse hábito." },
  { question: "Ceratocone tem cura?", answer: "O ceratocone não tem uma cura no sentido de reverter completamente a condição, mas os tratamentos modernos, como o crosslinking, são extremamente eficazes em estabilizar a progressão da doença." },
  { question: "O Crosslinking é doloroso?", answer: "O procedimento é realizado com anestesia por colírios e é bem tolerado. Pode haver desconforto e sensibilidade à luz nos primeiros dias, controlados com medicação." },
  { question: "Quem tem ceratocone pode fazer LASIK?", answer: "Não. A cirurgia refrativa a laser tradicional (LASIK) é contraindicada em pacientes com ceratocone, pois afina ainda mais a córnea, podendo agravar a doença." },
];

export default function InstitutoCeratocone() {
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
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6"
            >
              <Link href="/" className="hover:text-gold transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">Instituto do Ceratocone</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DO CERATOCONE</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Tratamento de Ceratocone com{" "}
              <span className="text-gold italic">tecnologia</span> e{" "}
              <span className="text-gold italic">cuidado</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Selecione a unidade mais próxima e receba informações sobre o tratamento de ceratocone com os melhores especialistas.
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
              <span className="font-body text-sm text-navy font-semibold">Especialistas em Córnea</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É ========== */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Ceratocone?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">O ceratocone é uma doença ocular não inflamatória que afeta a córnea, a camada transparente na frente do olho. A córnea torna-se progressivamente mais fina e curva, adquirindo um formato de cone, causando distorção das imagens e visão embaçada.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">A causa exata é desconhecida, mas acredita-se em uma combinação de fatores genéticos e ambientais, como coçar os olhos. Geralmente surge na adolescência ou início da idade adulta. O diagnóstico precoce é fundamental.</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 4. SINTOMAS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fique Atento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Sintomas do Ceratocone</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {sintomas.map((s, i) => (
              <AnimateOnScroll key={i} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-border/60">
                  <AlertCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                  <span className="font-body text-sm text-navy">{s}</span>
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Tratamentos Avançados</h2>
          </AnimateOnScroll>
          <div className="space-y-5">
            {tratamentos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-xl border border-border/60 bg-white hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-navy mb-1">{t.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== 6. ARTE E VISÃO — VAN GOGH ========== */}
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
                <img src={IMAGES.art.vanGoghStarryNight} alt="Noite Estrelada sobre o Ródano — Van Gogh, 1888" className="w-full h-auto" />
                <div className="bg-navy-light p-3 text-center">
                  <p className="font-body text-xs text-cream/70">"Noite Estrelada sobre o Ródano" — Van Gogh, 1888</p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15}>
              <div className="space-y-5">
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Vincent van Gogh (1853–1890) é um dos artistas mais icônicos da história. Suas pinceladas vigorosas, espirais dramáticas e distorções visuais — tão evidentes em obras como "Noite Estrelada" — há muito intrigam pesquisadores sobre a relação entre sua arte e sua visão.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Estudos oftalmológicos sugerem que Van Gogh pode ter sofrido de <strong className="text-gold">astigmatismo irregular</strong>, uma condição em que a córnea tem curvatura desigual — exatamente o que ocorre no ceratocone.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Os famosos halos ao redor das estrelas e as ondulações nas paisagens de Van Gogh são notavelmente semelhantes à visão de um paciente com ceratocone.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <AnimateOnScroll delay={0.1} className="order-2 md:order-1">
              <div className="space-y-5">
                <h3 className="font-display text-2xl text-cream">O Olhar de Van Gogh</h3>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Em seus autorretratos, Van Gogh frequentemente se representava com olhos intensos e penetrantes. Pesquisadores notaram que ele pintava os próprios olhos com assimetrias sutis, o que pode indicar uma percepção visual alterada.
                </p>
                <p className="font-body text-base text-cream/85 leading-relaxed">
                  Na Drudi e Almeida, usamos a arte como ferramenta de conscientização: assim como Van Gogh transformou sua visão em obras-primas, nós trabalhamos para que nossos pacientes com ceratocone recuperem a nitidez e a qualidade visual que merecem.
                </p>
                <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mt-4">
                  <p className="font-body text-sm text-cream/90 italic">
                    "Se você vê halos ao redor das luzes ou as imagens parecem distorcidas, agende uma avaliação. O diagnóstico precoce do ceratocone é fundamental para preservar sua visão."
                  </p>
                </div>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll delay={0.15} className="order-1 md:order-2">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gold/20">
                <img src={IMAGES.art.vanGoghSelfPortrait} alt="Autorretrato — Van Gogh, 1887" className="w-full h-auto" />
                <div className="bg-navy-light p-3 text-center">
                  <p className="font-body text-xs text-cream/70">"Autorretrato" — Van Gogh, 1887</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 7. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o ceratocone." />

      {/* ========== 8. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Agende sua <span className="text-gold">consulta avaliativa</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossos especialistas em ceratocone estão prontos para avaliar seu caso e indicar o melhor tratamento. Estabilize a progressão e recupere a qualidade visual.
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
