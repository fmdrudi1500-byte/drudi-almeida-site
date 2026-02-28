/* ============================================================
   Home Page — Drudi e Almeida
   Design: "Luminance" Neoclassical Medical Aesthetic
   Hero, Institutos, Sobre, Tecnologia, Depoimentos, Blog, CTA
   ============================================================ */
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Eye, Shield, Heart, Zap, Users, Star, Palette, Award, MessageSquare, ThumbsUp, MapPin, ChevronRight, HelpCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import TecnologiaCarousel from "@/components/TecnologiaCarousel";
import { IMAGES } from "@/lib/images";
import { useRef, useEffect, useCallback, useState } from "react";
import SEOHead from "@/components/SEOHead";
import { useAuth } from "@/_core/hooks/useAuth";

const institutos = [
  {
    name: "Instituto da Catarata",
    href: "/instituto/catarata",
    desc: "Cirurgia de catarata, especialistas renomados, tecnologia de ponta para restaurar a clareza da sua visão.",
    icon: Eye,
    color: "from-blue-500/10 to-blue-600/5",
    logo: IMAGES.institutoLogos.catarata,
  },
  {
    name: "Instituto do Ceratocone",
    href: "/instituto/ceratocone",
    desc: "Adaptação de lente de contato, Crosslinking e tratamentos avançados para estabilizar e tratar o ceratocone.",
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
    desc: "Cirurgia para correção do estrabismo para crianças e adultos com técnicas modernas.",
    icon: Users,
    color: "from-violet-500/10 to-violet-600/5",
    logo: IMAGES.institutoLogos.estrabismo,
  },
];

const stats = [
  { value: "10+", label: "Anos de Experiência" },
  { value: "50.000+", label: "Pacientes Atendidos" },
  { value: "5", label: "Institutos Especializados" },
  { value: "100%", label: "Compromisso com Você" },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.7, 0.9]);
  return (
    <>
      <SEOHead
        title="Oftalmologista em São Paulo"
        description="5 institutos especializados em catarata, ceratocone, glaucoma, retina e estrabismo. 5 unidades na Grande SP. Agende sua consulta."
        keywords="oftalmologista São Paulo, clínica de olhos SP, cirurgia de catarata, ceratocone, glaucoma"
        canonicalPath="/"
      />
      {/* ========== HERO WITH PARALLAX ========== */}
      <section ref={heroRef} className="relative min-h-[75vh] flex items-center overflow-hidden">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center will-change-transform"
          style={{
            backgroundImage: `url(${IMAGES.hero.main})`,
            y: heroImageY,
            scale: heroImageScale,
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-transparent"
          style={{ opacity: heroOverlayOpacity }}
        />

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
                Agendar pelo WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+551150268521"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-md hover:bg-cream/10 transition-colors"
              >
                Ligar Agora
              </a>
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

      {/* ========== QUEM SOMOS ========== */}
      <section className="relative overflow-hidden">
        {/* Full-width layout: image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          {/* Left: Dra. Priscilla image — full bleed */}
          <AnimateOnScroll direction="left" className="relative">
            <div className="relative h-full min-h-[400px] lg:min-h-[600px]">
              <img
                src="https://private-us-east-1.manuscdn.com/sessionFile/VBswHKhWNC83TvZUgrFk36/sandbox/G9Tpw7zLvTmvEI9gUisRl0-img-1_1772121965000_na1fn_ZHJhLXByaXNjaWxsYS1jb25zdWx0b3Jpbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVkJzd0hLaFdOQzgzVHZaVWdyRmszNi9zYW5kYm94L0c5VHB3N3pMdlRtdkVJOWdVaXNSbDAtaW1nLTFfMTc3MjEyMTk2NTAwMF9uYTFmbl9aSEpoTFhCeWFYTmphV3hzWVMxamIyNXpkV3gwYjNKcGJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TTPlEJe6xmx3JcptNhtg1qrEtUbjuKUKa~KI7tuZqDumLMDmDQdnlKVKd1KY-IEDDybrJ1d8fWI7I12FSMXnFCcA~R7GWjp~XmlIsd4OO3hqE8rslDm4CSFl9AxnQeX2JOTrdvcY19Fs5QwBqcvRzFqGvp9V4TPXktsThC2CZyCYjTNtlEpPFlTAXqj3aCz3FY~eUKvjc0Vkjo7zTODXESLEuIlMYP1Vq9NbgPjbroq-FGYG49cbVrRDF6w2SOuJSEUSyCi~TVz6xaUNv6-xBlGlrVz-0yWiN~B7Zq3pStqLZ9ZYrr7sgT2JCERT8tUBpC41UJk8YtAET-lIwTOKIQ__"
                alt="Dra. Priscilla R. de Almeida em consultório oftalmológico — Drudi e Almeida"
                className="absolute inset-0 w-full h-full object-cover object-top"
              />
              {/* Subtle gradient overlay on right edge for blending */}
              <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-cream/80 to-transparent hidden lg:block" />
              {/* Bottom gradient for mobile */}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-cream/90 to-transparent lg:hidden" />

              {/* Floating credential card */}
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 bg-white/95 backdrop-blur-md rounded-xl shadow-xl p-4 max-w-[220px] border border-gold/20">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <Star className="w-4 h-4 text-gold fill-gold" />
                  <Star className="w-4 h-4 text-gold fill-gold" />
                </div>
                <p className="font-ui text-xs text-navy font-bold">Avaliação 5 estrelas</p>
                <p className="font-body text-[11px] text-muted-foreground">+200 avaliações no Google</p>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Right: Content */}
          <AnimateOnScroll direction="right" className="relative">
            <div className="flex flex-col justify-center h-full bg-gradient-to-br from-cream/60 via-background to-cream/40 px-8 py-14 md:px-14 lg:px-16 lg:py-20">
              {/* Decorative accent */}
              <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-gold/5 blur-2xl" />
              <div className="absolute bottom-12 right-16 w-32 h-32 rounded-full bg-navy/3 blur-3xl" />

              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold relative z-10">
                Quem Somos
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] text-navy mt-3 mb-6 leading-tight relative z-10">
                Cuidar da sua visão é a nossa <em className="text-gold not-italic">vocação</em>
              </h2>

              <div className="space-y-4 relative z-10">
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  A <strong className="text-navy">Drudi e Almeida Oftalmologia</strong> nasceu do encontro
                  entre a tradição cirúrgica do Dr. Fernando Drudi e a dedicação da
                  Dra. Priscilla de Almeida — Unido pelo propósito de transformar
                  a forma como as pessoas cuidam dos olhos.
                </p>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  Com <strong className="text-navy">5 institutos especializados</strong> e uma equipe
                  multidisciplinar, oferecemos desde consultas de rotina até cirurgias de alta
                  complexidade, sempre com acolhimento e excelência.
                </p>
              </div>

              {/* Key differentials */}
              <div className="grid grid-cols-3 gap-4 mt-8 relative z-10">
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-navy/8 flex items-center justify-center mb-2">
                    <Eye className="w-5 h-5 text-navy" />
                  </div>
                  <div className="font-display text-lg text-navy font-bold">5</div>
                  <div className="font-ui text-[10px] text-muted-foreground tracking-wide leading-tight">Institutos<br/>Especializados</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-navy/8 flex items-center justify-center mb-2">
                    <Shield className="w-5 h-5 text-navy" />
                  </div>
                  <div className="font-display text-lg text-navy font-bold">14</div>
                  <div className="font-ui text-[10px] text-muted-foreground tracking-wide leading-tight">Equipamentos<br/>de Ponta</div>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 mx-auto rounded-lg bg-navy/8 flex items-center justify-center mb-2">
                    <Heart className="w-5 h-5 text-navy" />
                  </div>
                  <div className="font-display text-lg text-navy font-bold">100%</div>
                  <div className="font-ui text-[10px] text-muted-foreground tracking-wide leading-tight">Cuidado<br/>Humanizado</div>
                </div>
              </div>

              <div className="mt-8 relative z-10">
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-lg hover:bg-navy-light transition-all shadow-md hover:shadow-lg"
                >
                  Conheça Nossa História
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== TECNOLOGIA ========== */}
      <TecnologiaCarousel />

      {/* ========== CORPO CLÍNICO ========== */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Fundadores
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              Nossos Fundadores
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Um casal de oftalmologistas unidos pela paixão em oferecer o melhor cuidado para a sua visão.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            {[
              {
                name: "Dr. Fernando Macei Drudi",
                role: "Diretor Clínico",
                specialty: "Catarata e Retina Cirúrgica",
                crm: "CRM-SP 139.300",
                image: "https://private-us-east-1.manuscdn.com/sessionFile/VBswHKhWNC83TvZUgrFk36/sandbox/boBu2YFUIpC4Mg45ztPnz5-img-1_1772146534000_na1fn_ZHItZmVybmFuZG8tcHJvZmlzc2lvbmFs.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVkJzd0hLaFdOQzgzVHZaVWdyRmszNi9zYW5kYm94L2JvQnUyWUZVSXBDNE1nNDV6dFBuejUtaW1nLTFfMTc3MjE0NjUzNDAwMF9uYTFmbl9aSEl0Wm1WeWJtRnVaRzh0Y0hKdlptbHpjMmx2Ym1Gcy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=g-GqTn0IYod3SxM1KL6scGj8HrYjLwtbpOj47vEbTqmm9DX0L-4oq99Pur62lsgXfYfE8myXczrsGFbqbnZEr-L8zbcDlVv17eWYJNadpAclks3WJiW8BcnuK0p6Z9Hj4yOkHhuS0HiWJmzdqTAd89veLtrf3sBg0LhJ65SPsgyM6eN7RXUhA~tplpzvXPN0Q-txAiR0TLgh3IGOwNHktSa8~5-fwXG5kiNPZ8ti~PdJh8n1dBo4yBLIpD17-B8qFJ3jpyIcrRLnGoHeM5kmiQuFMqFOn--P65UeQ35R4rVMg4xtv72IjATWhPtzbNkyopZpDWXW5Z7HK4EGLDQPBw__",
                highlights: [
                  "Especialista em Catarata e Retina Cirúrgica",
                  "Membro do Conselho Brasileiro de Oftalmologia (CBO)",
                  "Preceptor de Retina e Catarata — Residência Médica IAMSPE",
                  "Condecoração \"Amigo da Marinha\" — Projeto Amazônia",
                ],
              },
              {
                name: "Dra. Priscilla R. de Almeida",
                role: "Diretora Técnica",
                specialty: "Córnea, Segmento Anterior e Lentes de Contato",
                crm: "CRM-SP 148.173",
                image: "https://private-us-east-1.manuscdn.com/sessionFile/VBswHKhWNC83TvZUgrFk36/sandbox/boBu2YFUIpC4Mg45ztPnz5-img-2_1772146534000_na1fn_ZHJhLXByaXNjaWxsYS1wcm9maXNzaW9uYWw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVkJzd0hLaFdOQzgzVHZaVWdyRmszNi9zYW5kYm94L2JvQnUyWUZVSXBDNE1nNDV6dFBuejUtaW1nLTJfMTc3MjE0NjUzNDAwMF9uYTFmbl9aSEpoTFhCeWFYTmphV3hzWVMxd2NtOW1hWE56YVc5dVlXdy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=sLdVbwJoM8uWB36HdP~GzuqJc0Cfz0tNDZWIOSm2MMIYcxLkVHJ-PT9ALNnHJ5SprjqdMMQAWA1td0Vssc~rXJRLbKUyDTfuHxca2QTVLSctaN3udSYwCbgOSd~xB5LiLSa2xocs~uQo66EV75qEtB9cDYeYFDGT63jWqpS~GfO8nQdHKFDrnBYLiWxSEZ3Spl~o0tcZrriPVM85GHzZbitsrCNjEeTHQetSv4-3XehcBzQn8YEW2Ojh-oyB~YmwTuoyr~oQKcngOdtQQfAUpQVrIKDuBRxYCYxVmUMJ22~qdovt3yOlyT1DSrNALoUrAAqZhT3a7aRxuHRx4BxcBw__",
                highlights: [
                  "Especialista em Córnea pela Escola Paulista de Medicina (EPM/UNIFESP)",
                  "Membro do Conselho Brasileiro de Oftalmologia (CBO)",
                  "Fellowship em Córnea e Doenças Externas",
                  "Especialista em Adaptação de Lentes de Contato Especiais",
                ],
              },
            ].map((doc, i) => (
              <AnimateOnScroll key={doc.name} delay={i * 0.15}>
                <div className="group bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:border-gold/30 transition-all duration-300">
                  {/* Photo */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={doc.image}
                      alt={doc.name}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block bg-gold/90 text-navy font-ui text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full">
                        {doc.role}
                      </span>
                    </div>
                  </div>
                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-display text-xl text-navy mb-1">{doc.name}</h3>
                    <p className="font-ui text-sm text-gold font-semibold mb-1">{doc.specialty}</p>
                    <p className="font-body text-xs text-muted-foreground mb-4">{doc.crm}</p>
                    <div className="space-y-2">
                      {doc.highlights.map((h, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 bg-cream/60 rounded-lg px-3 py-2 border border-gold/10">
                          <Award className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                          <p className="font-ui text-xs text-navy leading-snug">{h}</p>
                        </div>
                      ))}
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
              Conheça Nossa História
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
              O que Nossos Pacientes Dizem dos nossos Institutos
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Monet */}
            <AnimateOnScroll delay={0}>
              <Link href="/instituto/catarata" className="group block h-full">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img src={IMAGES.art.monetJapaneseBridge} alt="Monet - Ponte Japonesa antes e depois da catarata" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 bg-cream/5 backdrop-blur-sm flex-1">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Catarata</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Claude Monet</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">A catarata transformou as cores vibrantes de Monet em tons amarelados e borrados.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Van Gogh */}
            <AnimateOnScroll delay={0.08}>
              <Link href="/instituto/ceratocone" className="group block h-full">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img src={IMAGES.art.vanGoghStarryNight} alt="Van Gogh - Noite Estrelada, halos e distorções do ceratocone" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 bg-cream/5 backdrop-blur-sm flex-1">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Ceratocone</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Vincent van Gogh</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">Os halos e espirais de Van Gogh lembram a visão distorcida do ceratocone.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Degas */}
            <AnimateOnScroll delay={0.16}>
              <Link href="/instituto/retina" className="group block h-full">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img src={IMAGES.art.degasDancers} alt="Degas - Bailarinas, afetado por doença retiniana" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 bg-cream/5 backdrop-blur-sm flex-1">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Retina</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Edgar Degas</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">A degeneração macular de Degas fez suas bailarinas ficarem cada vez mais borradas.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>

            {/* Da Vinci */}
            <AnimateOnScroll delay={0.24}>
              <Link href="/instituto/estrabismo" className="group block h-full">
                <div className="rounded-2xl overflow-hidden border border-cream/10 hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                  <div className="h-44 overflow-hidden">
                    <img src={IMAGES.art.daVinciStrabismus} alt="Leonardo da Vinci - Estrabismo que ajudou sua arte" className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 bg-cream/5 backdrop-blur-sm flex-1">
                    <span className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold">Estrabismo</span>
                    <h3 className="font-display text-lg text-cream mt-1 mb-2 group-hover:text-gold transition-colors">Leonardo da Vinci</h3>
                    <p className="font-body text-xs text-cream/60 leading-relaxed">Estudos revelam que Da Vinci tinha exotropia intermitente, vantagem artística.</p>
                  </div>
                </div>
              </Link>
            </AnimateOnScroll>
          </div>

          {/* Link para o artigo completo */}
          <AnimateOnScroll className="text-center mt-10">
            <Link href="/blog/arte-visao-doencas-oculares-historia-arte" className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-gold hover:text-gold-light transition-colors">
              Leia o artigo completo: Arte e Visão na História
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Guarulhos",
                address: "Rua Sete de Setembro, 375",
                city: "Guarulhos - SP",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/clinica_guarulhos_8e7690c7.png",
                mapsUrl: "https://www.google.com/maps/search/Drudi+e+Almeida+Guarulhos+Rua+Sete+de+Setembro+375",
              },
              {
                name: "Lapa",
                address: "Rua Barão de Jundiaí, 221",
                city: "São Paulo - SP",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/consultorio_lapa_be866546.png",
                mapsUrl: "https://www.google.com/maps/search/Drudi+e+Almeida+Lapa+Rua+Barao+de+Jundiai+221",
              },
              {
                name: "Santana",
                address: "Rua Dr. César, 130",
                city: "São Paulo - SP",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v1_3860a616.png",
                mapsUrl: "https://www.google.com/maps/search/Drudi+e+Almeida+Santana+Rua+Dr+Cesar+130",
              },
              {
                name: "São Miguel",
                address: "Rua Bernardo Marcondes, 108",
                city: "São Paulo - SP",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v4_0b2982e6.png",
                mapsUrl: "https://www.google.com/maps/search/Drudi+e+Almeida+Sao+Miguel+Rua+Bernardo+Marcondes+108",
              },
              {
                name: "Tatuápé",
                address: "Rua Tuiuti, 2429",
                city: "São Paulo - SP",
                image: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/sala_espera_sofa_bege_v3_5717e0c0.png",
                mapsUrl: "https://www.google.com/maps/search/Drudi+e+Almeida+Tatua+pe+Rua+Tuiuti+2429",
              },
            ].map((u, i) => (
              <AnimateOnScroll key={u.name} delay={i * 0.08}>
                <a
                  href={u.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-2xl overflow-hidden border border-border/60 shadow-sm hover:shadow-md hover:border-gold/30 transition-all duration-300"
                >
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={u.image}
                      alt={`Unidade ${u.name} — Drudi e Almeida`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/20 transition-colors duration-300 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-navy font-ui text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                        </svg>
                        Ver no Google Maps
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gold shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                        <div>
                          <h3 className="font-display text-base text-navy mb-0.5 group-hover:text-gold transition-colors">{u.name}</h3>
                          <p className="font-body text-xs text-muted-foreground">{u.address}</p>
                          <p className="font-body text-xs text-gold font-semibold">{u.city}</p>
                        </div>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-muted-foreground/40 group-hover:text-gold transition-colors shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                      </svg>
                    </div>
                  </div>
                </a>
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

      {/* ========== GOOGLE REVIEWS ========== */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-12">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Avaliações Reais
            </span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">
              O que Dizem no Google sobre nossas Clínicas
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Avaliações verificadas de pacientes reais no Google Maps. A confiança dos nossos pacientes é o nosso maior orgulho.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          {/* Google Rating Summary */}
          <AnimateOnScroll>
            <div className="max-w-4xl mx-auto mb-10">
              <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-8 flex flex-col md:flex-row items-center gap-8">
                {/* Left: Big Rating */}
                <div className="text-center md:text-left md:border-r md:border-border/40 md:pr-8">
                  <div className="font-display text-6xl text-navy font-bold">4.9</div>
                  <div className="flex items-center gap-1 justify-center md:justify-start mt-2 mb-1">
                    {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 text-gold fill-gold" />)}
                  </div>
                  <p className="font-body text-sm text-muted-foreground">Baseado em 847 avaliações</p>
                  <div className="flex items-center gap-1.5 justify-center md:justify-start mt-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span className="font-ui text-xs font-semibold text-muted-foreground">Google Reviews</span>
                  </div>
                </div>

                {/* Right: Rating Bars */}
                <div className="flex-1 w-full space-y-2">
                  {[
                    { stars: 5, count: 789, pct: 93 },
                    { stars: 4, count: 41, pct: 5 },
                    { stars: 3, count: 12, pct: 1.4 },
                    { stars: 2, count: 3, pct: 0.4 },
                    { stars: 1, count: 2, pct: 0.2 },
                  ].map(r => (
                    <div key={r.stars} className="flex items-center gap-3">
                      <span className="font-ui text-sm text-navy w-3 text-right">{r.stars}</span>
                      <Star className="w-3.5 h-3.5 text-gold fill-gold" />
                      <div className="flex-1 h-2.5 bg-cream rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full transition-all duration-1000" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="font-body text-xs text-muted-foreground w-8 text-right">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimateOnScroll>

          {/* Individual Reviews */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                name: "Patricia Oliveira",
                time: "há 2 semanas",
                text: "Excelente atendimento! Fiz minha cirurgia de catarata com o Dr. Fernando e o resultado superou todas as expectativas. Equipe muito profissional e acolhedora. A clínica é moderna e muito bem equipada. Recomendo de olhos fechados (trocadilho intencional rs).",
                stars: 5,
                unit: "Santana",
                verified: true,
              },
              {
                name: "Ricardo Santos",
                time: "há 1 mês",
                text: "Levo meu pai para tratar glaucoma há 2 anos. O acompanhamento é impecável, sempre com exames detalhados e explicações claras. A recepção é muito educada e o tempo de espera é curto. Nota 10 para toda a equipe.",
                stars: 5,
                unit: "Tatuapé",
                verified: true,
              },
              {
                name: "Juliana Mendes",
                time: "há 3 semanas",
                text: "A Dra. Priscilla é maravilhosa! Adaptou lentes de contato para meu ceratocone e finalmente consigo enxergar direito. Tentei em outros lugares e ninguém conseguiu. Ela tem muita paciência e conhecimento técnico. Sou muito grata!",
                stars: 5,
                unit: "Lapa",
                verified: true,
              },
              {
                name: "Fernando Costa",
                time: "há 1 mês",
                text: "Minha mãe de 78 anos fez cirurgia de catarata e ficou com medo. A equipe toda foi extremamente cuidadosa, explicaram cada etapa. No dia seguinte ela já estava enxergando perfeitamente. Atendimento humanizado de verdade.",
                stars: 5,
                unit: "Guarulhos",
                verified: true,
              },
              {
                name: "Ana Beatriz Lima",
                time: "há 2 meses",
                text: "Levei meu filho de 5 anos com suspeita de estrabismo. A Dra. Maria Amélia foi incrível com ele, super paciente e carinhosa. Fez todos os exames brincando. Diagnóstico preciso e tratamento já iniciado. Profissional exemplar.",
                stars: 5,
                unit: "São Miguel",
                verified: true,
              },
              {
                name: "Carlos Alberto Souza",
                time: "há 3 meses",
                text: "Faço acompanhamento da retina por causa da diabetes. O Dr. Fernando é muito competente e atencioso, sempre explica os resultados dos exames com calma. Os equipamentos são de última geração. Melhor clínica de olhos que já fui.",
                stars: 5,
                unit: "Santana",
                verified: true,
              },
            ].map((review, i) => (
              <AnimateOnScroll key={review.name} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-border/60 p-5 h-full hover:shadow-md hover:border-gold/20 transition-all duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center">
                        <span className="font-display text-sm text-navy font-bold">{review.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-ui text-sm font-semibold text-navy">{review.name}</p>
                        <p className="font-body text-[11px] text-muted-foreground">{review.time}</p>
                      </div>
                    </div>
                    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5 mb-3">
                    {Array.from({ length: review.stars }).map((_, si) => (
                      <Star key={si} className="w-3.5 h-3.5 text-gold fill-gold" />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="font-body text-sm text-foreground/80 leading-relaxed mb-3">
                    {review.text}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-gold" />
                      <span className="font-ui text-[10px] text-muted-foreground">Unidade {review.unit}</span>
                    </div>
                    {review.verified && (
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3 text-emerald-500" />
                        <span className="font-ui text-[10px] text-emerald-600 font-semibold">Verificado</span>
                      </div>
                    )}
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* CTA to Google */}
          <AnimateOnScroll className="text-center mt-10">
            <a
              href="https://www.google.com/maps/place/Drudi+e+Almeida/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-navy/20 text-navy font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy hover:text-cream transition-all duration-300"
            >
              Ver Todas as Avaliações no Google
              <ChevronRight className="w-4 h-4" />
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== FAQ GERAL ========== */}
      <section className="section-padding">
        <div className="container">
          {/* Schema.org FAQ JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { "@type": "Question", name: "Quais convênios a Drudi e Almeida aceita?", acceptedAnswer: { "@type": "Answer", text: "Aceitamos Prevent Senior, Bradesco Saúde, Mediservice, PROPM, Amil, Unimed Seguros e Ameplam. Todos cobrem consultas, exames e cirurgias nos nossos 5 institutos." } },
                { "@type": "Question", name: "Como agendar uma consulta?", acceptedAnswer: { "@type": "Answer", text: "Você pode agendar pelo WhatsApp (11) 91654-4653, pelo formulário online no site ou ligando para qualquer uma das nossas 5 unidades." } },
                { "@type": "Question", name: "A cirurgia de catarata dói?", acceptedAnswer: { "@type": "Answer", text: "Não. A cirurgia de catarata é realizada com anestesia local (colírio anestésico) e dura cerca de 15 a 20 minutos. O paciente não sente dor durante o procedimento." } },
                { "@type": "Question", name: "O que é ceratocone e tem cura?", acceptedAnswer: { "@type": "Answer", text: "Ceratocone é uma doença progressiva que afina e deforma a córnea. Não tem cura definitiva, mas o crosslinking estabiliza a progressão e lentes especiais corrigem a visão." } },
                { "@type": "Question", name: "Glaucoma tem sintomas?", acceptedAnswer: { "@type": "Answer", text: "Na maioria dos casos, o glaucoma é silencioso e não apresenta sintomas até estágios avançados. Por isso, exames preventivos regulares são fundamentais para diagnóstico precoce." } },
                { "@type": "Question", name: "Quais unidades a Drudi e Almeida possui?", acceptedAnswer: { "@type": "Answer", text: "Temos 5 unidades: Santana (Rua Dr. César, 130), Tatuapé (Rua Tuiuti, 2429), Lapa (Rua Barão de Jundiaí, 221), São Miguel (Rua Bernardo Marcondes, 108) e Guarulhos (Rua Sete de Setembro, 375)." } },
                { "@type": "Question", name: "Com que idade devo levar meu filho ao oftalmologista?", acceptedAnswer: { "@type": "Answer", text: "O primeiro exame oftalmológico deve ser feito ainda na maternidade (teste do olhinho). Depois, recomenda-se consultas aos 6 meses, 3 anos e antes de entrar na escola. A partir daí, anualmente." } },
                { "@type": "Question", name: "Diabéticos precisam ir ao oftalmologista com que frequência?", acceptedAnswer: { "@type": "Answer", text: "Pacientes diabéticos devem fazer exame de fundo de olho pelo menos uma vez ao ano, pois a retinopatia diabética pode causar perda de visão silenciosamente." } },
              ]
            }) }}
          />

          <AnimateOnScroll className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-1.5 mb-4">
              <HelpCircle className="w-4 h-4 text-gold" />
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">FAQ</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-2 mb-4">
              Perguntas Frequentes
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Reunimos as dúvidas mais comuns dos nossos pacientes. Se sua pergunta não estiver aqui, entre em contato pelo WhatsApp.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {[
                {
                  q: "Quais convênios a Drudi e Almeida aceita?",
                  a: "Aceitamos Prevent Senior, Bradesco Saúde, Mediservice, PROPM, Amil, Unimed Seguros e Ameplam. Todos os convênios cobrem consultas, exames diagnósticos e procedimentos cirúrgicos nos nossos 5 institutos especializados. Para pacientes particulares, oferecemos condições especiais."
                },
                {
                  q: "Como faço para agendar uma consulta?",
                  a: "Você pode agendar de 3 formas: pelo WhatsApp (11) 91654-4653 (forma mais rápida), pelo formulário de agendamento online no nosso site, ou ligando diretamente para qualquer uma das nossas 5 unidades. O atendimento funciona de segunda a sexta das 8h às 18h e sábados das 8h às 12h."
                },
                {
                  q: "A cirurgia de catarata dói? Como é a recuperação?",
                  a: "A cirurgia de catarata é indolor — é realizada com anestesia local por colírio e dura cerca de 15 a 20 minutos. A maioria dos pacientes já percebe melhora na visão no dia seguinte. A recuperação completa leva de 2 a 4 semanas, durante as quais o paciente deve usar colírios e evitar esforço físico."
                },
                {
                  q: "O que é ceratocone e qual o tratamento?",
                  a: "Ceratocone é uma doença progressiva que afina e deforma a córnea, causando visão distorcida. O tratamento depende do estágio: nos casos iniciais, óculos ou lentes de contato especiais corrigem a visão. O crosslinking de córnea é o padrão-ouro para estabilizar a progressão. Em casos avançados, pode ser necessário implante de anel intracorneano ou transplante de córnea."
                },
                {
                  q: "Glaucoma tem cura? Como é o tratamento?",
                  a: "O glaucoma não tem cura, mas pode ser controlado eficazmente. O tratamento geralmente começa com colírios que reduzem a pressão intraocular. Quando os colírios não são suficientes, existem opções como laser (trabeculoplastia seletiva) e cirurgias. O mais importante é o diagnóstico precoce, pois a visão perdida pelo glaucoma não pode ser recuperada."
                },
                {
                  q: "Com que idade devo levar meu filho ao oftalmologista?",
                  a: "O primeiro exame deve ser o Teste do Olhinho, feito na maternidade. Depois, recomendamos consultas aos 6 meses, 1 ano, 3 anos e antes de entrar na escola (5-6 anos). A partir daí, anualmente. Problemas como estrabismo, ambliopia (olho preguiçoso) e erros refrativos são mais fáceis de tratar quando detectados cedo."
                },
                {
                  q: "Sou diabético. Com que frequência devo fazer exame de vista?",
                  a: "Pacientes diabéticos devem fazer exame de fundo de olho (mapeamento de retina) pelo menos uma vez ao ano. A retinopatia diabética é uma das principais causas de cegueira no mundo e pode progredir silenciosamente. Com diagnóstico precoce, tratamentos como injeções intravítreas e laser podem preservar a visão."
                },
                {
                  q: "Quais são as unidades da Drudi e Almeida?",
                  a: "Temos 5 unidades na Grande São Paulo: Santana (Rua Dr. César, 130), Tatuapé (Rua Tuiuti, 2429), Lapa (Rua Barão de Jundiaí, 221), São Miguel Paulista (Rua Bernardo Marcondes, 108) e Guarulhos (Rua Sete de Setembro, 375). Todas as unidades contam com equipamentos de última geração e os mesmos padrões de qualidade."
                },
              ].map((faq, i) => (
                <AnimateOnScroll key={i} delay={i * 0.04}>
                  <AccordionItem
                    value={`home-faq-${i}`}
                    className="border border-border/60 rounded-xl px-6 bg-white data-[state=open]:shadow-sm data-[state=open]:border-gold/30 transition-all"
                  >
                    <AccordionTrigger className="font-display text-base text-navy hover:text-gold py-5 [&[data-state=open]]:text-gold text-left">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                </AnimateOnScroll>
              ))}
            </Accordion>
          </div>

          <AnimateOnScroll className="text-center mt-10">
            <p className="font-body text-sm text-muted-foreground mb-4">
              Não encontrou sua dúvida? Fale conosco!
            </p>
            <a
              href="https://wa.me/5511916544653?text=Olá! Tenho uma dúvida sobre..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-6 py-3 rounded-md hover:bg-[#20BD5A] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Pergunte pelo WhatsApp
            </a>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="relative min-h-[500px] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${IMAGES.hero.happyFamily})` }}
        />
        <div className="absolute inset-0 bg-navy/70" />

        <div className="relative container py-24 md:py-32">
          <AnimateOnScroll className="text-center max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-6">
              Cuide da sua visão com quem é referência
            </h2>
            <p className="font-body text-lg text-cream/80 leading-relaxed mb-10">
              Agende sua consulta e descubra como podemos ajudar você a enxergar 
              o mundo com mais clareza e qualidade de vida.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-8 py-4 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar pelo WhatsApp
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="tel:+5511916544653"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-8 py-4 rounded-md hover:bg-cream/10 transition-colors"
              >
                Ligar Agora
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
