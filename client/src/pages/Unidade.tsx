/* ============================================================
   Unidade — Página individual de cada unidade/clínica
   SEO Local: Schema LocalBusiness, endereço, mapa, horários,
   especialidades, links para institutos.
   ============================================================ */
import { Link, useParams, Redirect } from "wouter";
import {
  MapPin, Clock, Phone, MessageCircle, ArrowRight,
  Eye, Shield, Heart, Users, Navigation, Calendar
} from "lucide-react";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import AgendarOnlineBtn from "@/components/AgendarOnlineBtn";

const WHATSAPP_LINK = "https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta.";
const PHONE_DISPLAY = "(11) 5430-2421";
const PHONE_WA = "(11) 91654-4653";
const BASE_URL = "https://institutodrudiealmeida.com.br";

interface UnidadeData {
  slug: string;
  name: string;
  fullName: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  region: string;
  mapEmbedQuery: string;
  description: string;
  nearbyLandmarks: string[];
  image: string;
  lat: number;
  lng: number;
}

const unidadesData: Record<string, UnidadeData> = {
  guarulhos: {
    slug: "guarulhos",
    name: "Guarulhos",
    fullName: "Drudi e Almeida Oftalmologia — Guarulhos",
    address: "Rua Sete de Setembro, 375",
    neighborhood: "Centro",
    city: "Guarulhos",
    state: "SP",
    cep: "07011-020",
    region: "Região Metropolitana de São Paulo",
    mapEmbedQuery: "Rua+Sete+de+Setembro+375+Centro+Guarulhos+SP",
    description: "Nossa unidade em Guarulhos Centro oferece atendimento oftalmológico completo com equipamentos de última geração. Localizada no coração de Guarulhos, com fácil acesso por transporte público e estacionamento próximo, atendemos pacientes de toda a região metropolitana.",
    nearbyLandmarks: ["Próximo ao Calçadão de Guarulhos", "Centro Comercial de Guarulhos", "Fácil acesso pela Rodovia Presidente Dutra"],
    image: "/images/clinica_guarulhos_8e7690c7.webp",
    lat: -23.4628,
    lng: -46.5333,
  },
  lapa: {
    slug: "lapa",
    name: "Lapa",
    fullName: "Drudi e Almeida Oftalmologia — Lapa",
    address: "Rua Barão de Jundiaí, 221",
    neighborhood: "Lapa",
    city: "São Paulo",
    state: "SP",
    cep: "05040-010",
    region: "Zona Oeste de São Paulo",
    mapEmbedQuery: "Rua+Barão+de+Jundiaí+221+Lapa+São+Paulo+SP",
    description: "Nossa unidade na Lapa, zona oeste de São Paulo, conta com infraestrutura moderna e fácil acesso por trem e ônibus. Oferecemos o mesmo padrão de excelência em todas as especialidades oftalmológicas.",
    nearbyLandmarks: ["Próximo à Estação Lapa (CPTM)", "Shopping Lapa", "Fácil acesso pela Marginal Tietê"],
    image: "/images/consultorio_lapa_be866546.webp",
    lat: -23.5261,
    lng: -46.7007,
  },
  santana: {
    slug: "santana",
    name: "Santana",
    fullName: "Drudi e Almeida Oftalmologia — Santana",
    address: "Rua Dr. César, 130",
    neighborhood: "Santana",
    city: "São Paulo",
    state: "SP",
    cep: "02013-001",
    region: "Zona Norte de São Paulo",
    mapEmbedQuery: "Rua+Dr+Cesar+130+Santana+São+Paulo+SP",
    description: "Nossa unidade em Santana é a sede principal da Drudi e Almeida Oftalmologia. Localizada na zona norte de São Paulo, próxima ao metrô, oferece atendimento completo com todos os equipamentos e especialistas disponíveis.",
    nearbyLandmarks: ["Próximo ao Metrô Santana", "Shopping Santana Parque", "Fácil acesso pela Av. Cruzeiro do Sul"],
    image: "/images/sala_espera_sofa_bege_v1_3860a616.webp",
    lat: -23.5087,
    lng: -46.6278,
  },
  "sao-miguel": {
    slug: "sao-miguel",
    name: "São Miguel Paulista",
    fullName: "Drudi e Almeida Oftalmologia — São Miguel Paulista",
    address: "Rua Bernardo Marcondes, 108",
    neighborhood: "São Miguel Paulista",
    city: "São Paulo",
    state: "SP",
    cep: "08010-060",
    region: "Zona Leste de São Paulo",
    mapEmbedQuery: "Rua+Bernardo+Marcondes+108+São+Miguel+Paulista+São+Paulo+SP",
    description: "Nossa unidade em São Miguel Paulista atende a zona leste de São Paulo com a mesma qualidade e tecnologia de todas as nossas clínicas. Acesso fácil por transporte público, atendendo pacientes de toda a região leste.",
    nearbyLandmarks: ["Próximo à Estação São Miguel Paulista (CPTM)", "Centro Comercial de São Miguel", "Fácil acesso pela Av. Marechal Tito"],
    image: "/images/sala_espera_sofa_bege_v4_0b2982e6.webp",
    lat: -23.5132,
    lng: -46.4452,
  },
  tatuape: {
    slug: "tatuape",
    name: "Tatuapé",
    fullName: "Drudi e Almeida Oftalmologia — Tatuapé",
    address: "Rua Tuiuti, 2429",
    neighborhood: "Tatuapé",
    city: "São Paulo",
    state: "SP",
    cep: "03307-005",
    region: "Zona Leste de São Paulo",
    mapEmbedQuery: "Rua+Tuiuti+2429+Tatuapé+São+Paulo+SP",
    description: "Nossa unidade no Tatuapé oferece atendimento especializado com infraestrutura completa e equipe altamente qualificada. Localizada em uma das regiões mais acessíveis da zona leste, próxima ao metrô.",
    nearbyLandmarks: ["Próximo ao Metrô Carrão", "Shopping Metrô Tatuapé", "Fácil acesso pela Radial Leste"],
    image: "/images/sala_espera_sofa_bege_v3_5717e0c0.webp",
    lat: -23.5375,
    lng: -46.5765,
  },
};

const especialidades = [
  { name: "Catarata", href: "/instituto/catarata", icon: Eye, desc: "Cirurgia de catarata com lentes premium" },
  { name: "Ceratocone", href: "/instituto/ceratocone", icon: Shield, desc: "Crosslinking e lentes especiais" },
  { name: "Glaucoma", href: "/instituto/glaucoma", icon: Eye, desc: "Diagnóstico precoce e tratamento" },
  { name: "Retina", href: "/instituto/retina", icon: Heart, desc: "Vitrectomia e injeções intravítreas" },
  { name: "Estrabismo", href: "/instituto/estrabismo", icon: Users, desc: "Cirurgia para crianças e adultos" },
];

const horarios = [
  { dia: "Segunda a Sexta", horario: "08:00 — 18:00" },
  { dia: "Sábado", horario: "08:00 — 12:00" },
  { dia: "Domingo e Feriados", horario: "Fechado" },
];

export default function Unidade() {
  const params = useParams<{ slug: string }>();
  const unidade = unidadesData[params.slug || ""];

  if (!unidade) {
    return <Redirect to="/contato" />;
  }

  // Schema LocalBusiness JSON-LD
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["Ophthalmologist", "MedicalClinic", "LocalBusiness"],
    "@id": `${BASE_URL}/unidade/${unidade.slug}#clinic`,
    name: unidade.fullName,
    description: unidade.description,
    url: `${BASE_URL}/unidade/${unidade.slug}`,
    telephone: "+551154302421",
    image: `${BASE_URL}${unidade.image}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: unidade.address,
      addressLocality: unidade.city,
      addressRegion: unidade.state,
      postalCode: unidade.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: unidade.lat,
      longitude: unidade.lng,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Cartão de Crédito, Cartão de Débito, Convênio",
    medicalSpecialty: [
      "Ophthalmology",
      "Cataract Surgery",
      "Glaucoma Treatment",
      "Retina Surgery",
      "Keratoconus Treatment",
      "Strabismus Treatment",
    ],
    parentOrganization: {
      "@id": `${BASE_URL}/#organization`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "847",
      bestRating: "5",
      worstRating: "1",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Nossas Unidades", item: `${BASE_URL}/contato` },
      { "@type": "ListItem", position: 3, name: unidade.fullName, item: `${BASE_URL}/unidade/${unidade.slug}` },
    ],
  };

  return (
    <>
      <SEOHead
        title={`Oftalmologista em ${unidade.name} — ${unidade.fullName}`}
        description={unidade.description}
        keywords={`oftalmologista ${unidade.name}, clínica de olhos ${unidade.name}, cirurgia catarata ${unidade.name}, oftalmologia ${unidade.region}`}
        canonicalPath={`/unidade/${unidade.slug}`}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ========== HERO ========== */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${unidade.image})` }}
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative container py-16">
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-cream/60 font-ui text-xs mb-6">
              <Link href="/" className="hover:text-cream transition-colors">Início</Link>
              <span>/</span>
              <Link href="/contato" className="hover:text-cream transition-colors">Unidades</Link>
              <span>/</span>
              <span className="text-gold">{unidade.name}</span>
            </nav>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-4">
              Clínica Oftalmológica em{" "}
              <span className="text-gold">{unidade.name}</span>
            </h1>
            <p className="font-body text-lg text-cream/80 leading-relaxed mb-6 max-w-xl">
              {unidade.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3.5 rounded-lg hover:bg-gold-light transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Agendar pelo WhatsApp
              </a>
              <AgendarOnlineBtn variant="dark" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== INFO + MAPA ========== */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Info */}
            <AnimateOnScroll>
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                  Informações
                </span>
                <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-6">
                  Como chegar
                </h2>

                <div className="space-y-5">
                  {/* Endereço */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-navy mb-1">Endereço</h3>
                      <p className="font-body text-sm text-muted-foreground">
                        {unidade.address}<br />
                        {unidade.neighborhood}, {unidade.city} — {unidade.state}<br />
                        CEP: {unidade.cep}
                      </p>
                    </div>
                  </div>

                  {/* Horários */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-navy mb-1">Horário de Funcionamento</h3>
                      <div className="space-y-1">
                        {horarios.map((h) => (
                          <div key={h.dia} className="flex justify-between gap-6 font-body text-sm text-muted-foreground">
                            <span>{h.dia}</span>
                            <span className="font-semibold text-navy">{h.horario}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Telefones */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-navy mb-1">Telefones</h3>
                      <p className="font-body text-sm text-muted-foreground">
                        <a href="tel:+551154302421" className="hover:text-gold transition-colors">
                          {PHONE_DISPLAY}
                        </a>{" "}
                        (fixo)<br />
                        <a href="tel:+5511916544653" className="hover:text-gold transition-colors">
                          {PHONE_WA}
                        </a>{" "}
                        (WhatsApp)
                      </p>
                    </div>
                  </div>

                  {/* Referências */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Navigation className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h3 className="font-display text-base text-navy mb-1">Referências</h3>
                      <ul className="space-y-1">
                        {unidade.nearbyLandmarks.map((landmark) => (
                          <li key={landmark} className="font-body text-sm text-muted-foreground">
                            • {landmark}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${unidade.mapEmbedQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-bold px-5 py-3 rounded-lg hover:bg-navy/90 transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Abrir no Google Maps
                  </a>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Mapa */}
            <AnimateOnScroll delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-border/40 h-[400px] lg:h-full min-h-[400px]">
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${unidade.mapEmbedQuery}&zoom=16`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: 400 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Mapa da unidade ${unidade.name}`}
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== ESPECIALIDADES ========== */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Especialidades
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-navy mt-3">
              Atendemos todas as especialidades em {unidade.name}
            </h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto mt-3">
              Nossa unidade em {unidade.name} conta com equipe especializada e equipamentos de ponta para todas as áreas da oftalmologia.
            </p>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-5xl mx-auto">
            {especialidades.map((esp) => {
              const Icon = esp.icon;
              return (
                <StaggerItem key={esp.href}>
                  <Link href={esp.href} className="group block h-full">
                    <div className="bg-white rounded-xl border border-border/60 p-5 h-full text-center hover:shadow-md hover:border-gold/30 transition-all duration-300">
                      <div className="w-12 h-12 rounded-xl bg-navy/8 flex items-center justify-center mx-auto mb-3 group-hover:bg-gold/10 transition-colors">
                        <Icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
                      </div>
                      <h3 className="font-display text-sm text-navy mb-1 group-hover:text-gold transition-colors">
                        {esp.name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground leading-relaxed">
                        {esp.desc}
                      </p>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== CONVÊNIOS ========== */}
      <section className="py-12 bg-white">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="font-display text-2xl text-navy mb-4">
              Convênios aceitos nesta unidade
            </h2>
            <p className="font-body text-sm text-muted-foreground mb-6 max-w-xl mx-auto">
              Atendemos os principais convênios e planos de saúde. Também realizamos atendimento particular.
            </p>
            <Link
              href="/convenios"
              className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-gold hover:text-gold-light transition-colors"
            >
              Ver todos os convênios aceitos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimateOnScroll>
        </div>
      </section>

      {/* ========== OUTRAS UNIDADES ========== */}
      <section className="section-padding bg-slate-50">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Mais Perto de Você
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-navy mt-3">
              Conheça nossas outras unidades
            </h2>
          </AnimateOnScroll>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {Object.values(unidadesData)
              .filter((u) => u.slug !== unidade.slug)
              .map((u) => (
                <StaggerItem key={u.slug}>
                  <Link href={`/unidade/${u.slug}`} className="group block h-full">
                    <div className="bg-white rounded-xl border border-border/60 overflow-hidden h-full hover:shadow-md hover:border-gold/30 transition-all duration-300">
                      <img
                        src={u.image}
                        alt={`Unidade ${u.name} — Drudi e Almeida Oftalmologia`}
                        className="w-full h-32 object-cover"
                        loading="lazy"
                      />
                      <div className="p-4">
                        <h3 className="font-display text-sm text-navy mb-1 group-hover:text-gold transition-colors">
                          {u.name}
                        </h3>
                        <p className="font-body text-xs text-muted-foreground">
                          {u.address}, {u.neighborhood}
                        </p>
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ========== CTA FINAL ========== */}
      <section className="py-16 bg-navy">
        <div className="container text-center">
          <AnimateOnScroll>
            <Calendar className="w-10 h-10 text-gold mx-auto mb-4" />
            <h2 className="font-display text-2xl md:text-3xl text-cream mb-4">
              Agende sua consulta em {unidade.name}
            </h2>
            <p className="font-body text-base text-cream/70 mb-8 max-w-xl mx-auto">
              Nossa equipe está pronta para atender você com excelência e cuidado.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-lg hover:bg-gold-light transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Agendar pelo WhatsApp
              </a>
              <a
                href="tel:+551154302421"
                className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-7 py-3.5 rounded-lg hover:bg-cream/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Ligar: {PHONE_DISPLAY}
              </a>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
