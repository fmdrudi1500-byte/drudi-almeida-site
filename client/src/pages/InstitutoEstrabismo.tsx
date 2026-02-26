/* ============================================================
   Instituto de Estrabismo — Drudi e Almeida
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
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/ibNQCeyYILJFGyuH.png";
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de estrabismo.";
const PHONE = "(11) 91654-4653";

const unidades = [
  { id: "jundiai", name: "Jundiaí", address: "Jundiaí - SP" },
  { id: "santana", name: "Santana (São Paulo)", address: "São Paulo - SP" },
];

const tipos = [
  { title: "Esotropia", desc: "Desvio convergente — um ou ambos os olhos se voltam para dentro (em direção ao nariz)." },
  { title: "Exotropia", desc: "Desvio divergente — um ou ambos os olhos se voltam para fora (em direção às orelhas)." },
  { title: "Hipertropia", desc: "Desvio vertical — um olho fica mais alto que o outro." },
  { title: "Estrabismo Paralítico", desc: "Causado por paralisia de um ou mais músculos extraoculares, frequentemente associado a condições neurológicas." },
];

const tratamentos = [
  { title: "Uso de Óculos", desc: "Em muitos casos, especialmente em crianças, o uso de óculos com a correção adequada pode alinhar os olhos." },
  { title: "Tampão Ocular (Oclusão)", desc: "Tratamento da ambliopia ('olho preguiçoso') que pode acompanhar o estrabismo, fortalecendo o olho mais fraco." },
  { title: "Toxina Botulínica", desc: "Injeção nos músculos oculares para enfraquecer temporariamente o músculo hiperativo e permitir o realinhamento." },
  { title: "Cirurgia de Estrabismo", desc: "Ajusta o comprimento ou a posição dos músculos extraoculares para alinhar os olhos de forma permanente." },
];

const faqItems = [
  { question: "Estrabismo em crianças pode ser corrigido?", answer: "Sim. Quanto mais cedo o tratamento for iniciado, melhores são os resultados. O ideal é que a avaliação seja feita nos primeiros anos de vida." },
  { question: "Adultos podem operar estrabismo?", answer: "Sim. A cirurgia de estrabismo pode ser realizada em qualquer idade. Em adultos, além da melhora estética, pode melhorar a percepção de profundidade e reduzir a visão dupla." },
  { question: "A cirurgia de estrabismo é segura?", answer: "Sim. É uma das cirurgias oculares mais realizadas no mundo. Como todo procedimento cirúrgico, possui riscos, mas as complicações graves são raras." },
  { question: "Meu filho tem 'olho torto' — é estrabismo?", answer: "Nem sempre. Em bebês, o pseudoestrabismo (falsa impressão de desvio) é comum devido à prega de pele no canto interno dos olhos. Porém, toda suspeita deve ser avaliada por um oftalmologista." },
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
              <span className="text-gold">Instituto de Estrabismo</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DE ESTRABISMO</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Estrabismo infantil e adulto com{" "}
              <span className="text-gold italic">cuidado</span> e{" "}
              <span className="text-gold italic">precisão</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Selecione a unidade mais próxima e receba informações sobre o tratamento de estrabismo com os melhores especialistas.
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
              <span className="font-body text-sm text-navy font-semibold">Especialista em Estrabismo</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É ========== */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Estrabismo?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">O estrabismo é uma condição em que os olhos não estão alinhados na mesma direção. Enquanto um olho olha para frente, o outro pode se desviar para dentro, para fora, para cima ou para baixo. Pode ser constante ou intermitente.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">Afeta cerca de 4% da população e pode surgir em qualquer idade, embora seja mais comum na infância. O tratamento precoce é fundamental para prevenir a ambliopia (olho preguiçoso) e garantir o desenvolvimento visual adequado.</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 4. TIPOS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Classificação</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Tipos de Estrabismo</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
            {tipos.map((t, i) => (
              <AnimateOnScroll key={t.title} delay={i * 0.08}>
                <div className="p-6 bg-white rounded-xl border border-border/60 h-full hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center mb-3"><AlertCircle className="w-4 h-4 text-gold" /></div>
                  <h3 className="font-display text-lg text-navy mb-2">{t.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Opções de Tratamento</h2>
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

      {/* ========== 6. ARTE E VISÃO — DA VINCI & REMBRANDT ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">Gênios com Estrabismo</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              Estudos científicos recentes revelam que dois dos maiores gênios da história da arte tinham estrabismo — e isso pode ter contribuído para sua genialidade.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.daVinciStrabismus} alt="Leonardo da Vinci - Análise do estrabismo" className="w-full h-64 object-cover object-top" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-cream mb-3">Leonardo da Vinci</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  Um estudo publicado no <strong className="text-gold">JAMA Ophthalmology</strong> (2018) analisou seis obras atribuídas a Da Vinci e concluiu que ele tinha <strong className="text-gold">exotropia intermitente</strong> — um tipo de estrabismo divergente.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Pesquisadores sugerem que essa condição pode ter dado a Da Vinci uma vantagem: a capacidade de alternar entre visão binocular (3D) e monocular (2D), facilitando a representação de profundidade.
                </p>
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.rembrandtSelfPortrait} alt="Rembrandt - Autorretrato" className="w-full h-64 object-cover object-top" />
              </div>
              <div className="mt-5">
                <h3 className="font-display text-2xl text-cream mb-3">Rembrandt van Rijn</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-3">
                  Rembrandt pintou mais de 90 autorretratos ao longo da vida. Em muitos deles, é possível notar um <strong className="text-gold">desalinhamento ocular</strong>.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed">
                  Assim como Da Vinci, acredita-se que o estrabismo de Rembrandt tenha contribuído para sua maestria em representar luz, sombra e profundidade.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          <AnimateOnScroll delay={0.2}>
            <div className="max-w-3xl mx-auto mt-12 text-center">
              <div className="bg-gradient-to-r from-gold/10 via-gold/5 to-gold/10 rounded-2xl p-8 border border-gold/20">
                <p className="font-body text-sm text-cream/80 leading-relaxed max-w-xl mx-auto">
                  O estrabismo não define limites — pode até revelar talentos. Mas o tratamento adequado é essencial para garantir saúde visual, conforto e qualidade de vida, especialmente em crianças em fase de desenvolvimento.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 7. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o estrabismo." />

      {/* ========== 8. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Agende sua <span className="text-gold">consulta avaliativa</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossos especialistas em estrabismo estão prontos para avaliar seu caso. Alinhamento ocular para crianças e adultos com técnicas modernas.
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
