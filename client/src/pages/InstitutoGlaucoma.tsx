/* ============================================================
   Instituto do Glaucoma — Drudi e Almeida
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
const HERO_ART_IMG = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/WDorIHhiaQuwCSEJ.png";
const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de receber informações sobre o tratamento de glaucoma.";
const PHONE = "(11) 91654-4653";

const unidades = [
  { id: "jundiai", name: "Jundiaí", address: "Jundiaí - SP" },
  { id: "santana", name: "Santana (São Paulo)", address: "São Paulo - SP" },
];

const fatoresRisco = [
  "Idade acima de 40 anos",
  "Histórico familiar de glaucoma",
  "Pressão intraocular elevada",
  "Descendência africana ou asiática",
  "Miopia elevada",
  "Diabetes e outras condições metabólicas",
];

const tratamentos = [
  { title: "Colírios", desc: "Forma mais comum de tratamento. Diversas classes de colírios ajudam a diminuir a produção de humor aquoso ou aumentar sua drenagem." },
  { title: "Laser (SLT)", desc: "Trabeculoplastia Seletiva a Laser — procedimento seguro e eficaz que estimula o sistema de drenagem do olho, reduzindo a pressão." },
  { title: "Cirurgia", desc: "Para casos avançados, a trabeculectomia ou implante de dispositivos de drenagem cria uma nova via para o humor aquoso." },
];

const faqItems = [
  { question: "Glaucoma tem cura?", answer: "Não, o glaucoma não tem cura, mas tem controle. O tratamento adequado pode estabilizar a doença e prevenir a perda de visão. A visão já perdida não pode ser recuperada." },
  { question: "O tratamento com colírios é para a vida toda?", answer: "Na maioria dos casos, sim. O glaucoma é uma doença crônica, e o uso contínuo dos colírios conforme a prescrição médica é essencial." },
  { question: "Alguém na minha família tem glaucoma. Eu também terei?", answer: "Ter um parente de primeiro grau com glaucoma aumenta significativamente o risco. Realize exames oftalmológicos regulares para diagnóstico precoce." },
  { question: "Pressão ocular alta significa glaucoma?", answer: "Não necessariamente. A hipertensão ocular é um fator de risco, mas nem todos que a possuem desenvolverão glaucoma. Apenas um oftalmologista pode fazer o diagnóstico correto." },
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
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6"
            >
              <Link href="/" className="hover:text-gold transition-colors">Início</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gold">Instituto do Glaucoma</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Eye className="w-3.5 h-3.5 text-gold" />
              <span className="font-ui text-xs font-semibold text-gold tracking-wide">INSTITUTO DO GLAUCOMA</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.1] mb-6"
            >
              Tratamento de Glaucoma com{" "}
              <span className="text-gold italic">precisão</span> e{" "}
              <span className="text-gold italic">cuidado</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="font-body text-lg text-cream/80 leading-relaxed mb-8 max-w-xl"
            >
              Selecione a unidade mais próxima e receba informações sobre o tratamento de glaucoma com os melhores especialistas.
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
              <span className="font-body text-sm text-navy font-semibold">Especialistas em Glaucoma</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========== 3. O QUE É ========== */}
      <section className="section-padding">
        <div className="container max-w-3xl mx-auto">
          <AnimateOnScroll>
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Entenda a Condição</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-5">O que é o Glaucoma?</h2>
            <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">O glaucoma é um grupo de doenças oculares que causam danos progressivos ao nervo óptico, a estrutura que conecta o olho ao cérebro. Na maioria dos casos, está associado ao aumento da pressão intraocular. Se não tratado, leva à perda irreversível da visão.</p>
            <p className="font-body text-base text-muted-foreground leading-relaxed">Conhecido como o "ladrão silencioso da visão", o glaucoma geralmente não apresenta sintomas em suas fases iniciais. A perda de visão ocorre de forma lenta e gradual. Por isso, consultas oftalmológicas regulares são fundamentais para o diagnóstico precoce.</p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== 4. FATORES DE RISCO ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Prevenção</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3">Fatores de Risco</h2>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>
          <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
            {fatoresRisco.map((s, i) => (
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
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-8">Opções de Tratamento</h2>
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

      {/* ========== 6. ARTE E VISÃO — EL GRECO ========== */}
      <section className="section-padding bg-navy text-cream relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }} />
        <div className="container relative">
          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/20 rounded-full px-4 py-1.5 mb-4">
              <Palette className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Arte e Visão</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-2">El Greco e a Visão</h2>
            <p className="font-body text-base text-cream/70 max-w-2xl mx-auto mt-4 leading-relaxed">
              A relação entre arte e visão nos ajuda a compreender como as doenças oculares afetam a percepção do mundo.
            </p>
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto items-center">
            <AnimateOnScroll direction="left">
              <div className="rounded-2xl overflow-hidden border border-cream/10 shadow-xl">
                <img src={IMAGES.art.elGrecoToledo} alt="El Greco - Vista de Toledo" className="w-full h-auto" />
              </div>
            </AnimateOnScroll>

            <AnimateOnScroll direction="right">
              <div>
                <h3 className="font-display text-2xl text-cream mb-4">El Greco e o Astigmatismo</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  Desde 1913, pesquisadores debatem se as figuras alongadas e distorcidas de El Greco seriam resultado de um <strong className="text-gold">astigmatismo severo</strong> — uma condição que distorce a visão, alongando as imagens.
                </p>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">
                  Embora a teoria seja controversa, ela ilustra perfeitamente como alterações na visão podem mudar a forma como percebemos o mundo ao nosso redor.
                </p>
                <div className="bg-gold/10 rounded-xl p-5 border border-gold/20 mt-6">
                  <div className="flex items-start gap-3">
                    <Eye className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-display text-base text-cream mb-2">Glaucoma e a Visão Periférica</h4>
                      <p className="font-body text-sm text-cream/70 leading-relaxed">
                        Diferente do astigmatismo, o glaucoma ataca silenciosamente a <strong className="text-gold">visão periférica</strong>. Imagine ver o mundo como se olhasse através de um tubo — a visão central pode estar preservada, mas tudo ao redor desaparece gradualmente.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== 7. FAQ ========== */}
      <FAQSection items={faqItems} subtitle="Tire suas dúvidas sobre o glaucoma." />

      {/* ========== 8. CTA FINAL ========== */}
      <section className="section-padding bg-navy">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl text-cream mb-4">
                Agende sua <span className="text-gold">consulta avaliativa</span>
              </h2>
              <p className="font-body text-base text-cream/70 mb-8 leading-relaxed">
                Nossos especialistas em glaucoma estão prontos para avaliar seu caso. O diagnóstico precoce é fundamental para preservar sua visão.
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
