/* ============================================================
   Medico Page — Drudi e Almeida
   Página individual de cada médico com Schema Physician
   ============================================================ */
import { useRoute } from "wouter";
import { Link } from "wouter";
import {
  GraduationCap,
  Stethoscope,
  Globe,
  Award,
  MapPin,
  ArrowRight,
  Phone,
  Calendar,
  Heart,
  Eye,
  Shield,
  Users,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import SEOHead from "@/components/SEOHead";
import InstitutoCTA from "@/components/InstitutoCTA";
import Breadcrumb from "@/components/Breadcrumb";
import SatelliteArticles from "@/components/SatelliteArticles";
import NotFound from "./NotFound";

/* ============================================================
   Dados dos Médicos
   ============================================================ */
interface DoctorData {
  slug: string;
  name: string;
  fullName: string;
  crm: string;
  rqe: string;
  role: string;
  specialty: string;
  image: string;
  imageAlt: string;
  bio: string[];
  formation: { icon: React.ElementType; text: string }[];
  institutes: { name: string; href: string; icon: React.ElementType }[];
  awards: { icon: React.ElementType; text: string }[];
  areas: string[];
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
}

const doctors: Record<string, DoctorData> = {
  "dr-fernando-drudi": {
    slug: "dr-fernando-drudi",
    name: "Dr. Fernando Drudi",
    fullName: "Dr. Fernando Macei Drudi",
    crm: "CRM-SP 139.300",
    rqe: "RQE 50.645",
    role: "Diretor Clínico",
    specialty: "Especialista em Catarata e Retina Cirúrgica",
    image: "/images/dr-fernando-800w.webp",
    imageAlt: "Dr. Fernando Macei Drudi — Oftalmologista especialista em Catarata e Retina Cirúrgica em São Paulo",
    bio: [
      "O Dr. Fernando Macei Drudi é médico oftalmologista com formação completa nas subespecialidades de Catarata e Retina Cirúrgica pelo Hospital dos Servidores Público Estadual de São Paulo (HSPE). Atua como médico concursado do HSPE desde 2020, com foco no ensino prático de técnicas cirúrgicas avançadas para residentes e fellows.",
      "Além da excelência clínica, o Dr. Fernando é um profissional dedicado ao impacto social na saúde ocular da população brasileira. Participa há mais de 10 anos ativamente do Projeto Oftalmologia Humanitária na Amazônia, realizando cirurgias de catarata e retina nas comunidades ribeirinhas de difícil acesso. Por essa contribuição, recebeu a condecoração \"Amigo da Marinha\", importante reconhecimento concedido pela Marinha do Brasil.",
      "Co-fundador da Drudi e Almeida Oftalmologia, lidera a clínica com a missão de proporcionar acesso à oftalmologia de excelência para todos, combinando tecnologia de ponta com atendimento humanizado.",
      "Sua abordagem cirúrgica prioriza técnicas minimamente invasivas, como a facoemulsificação com implante de lentes intraoculares premium para cirurgia de catarata, e vitrectomia posterior para doenças da retina, sempre utilizando os equipamentos mais modernos disponíveis.",
    ],
    formation: [
      { icon: GraduationCap, text: "Graduação em Medicina" },
      { icon: GraduationCap, text: "Residência em Oftalmologia — HSPE/SP" },
      { icon: GraduationCap, text: "Subespecialidade em Catarata e Retina Cirúrgica — HSPE/SP" },
      { icon: Stethoscope, text: "Médico concursado do HSPE desde 2020" },
      { icon: BookOpen, text: "Preceptor de residentes e fellows em cirurgia oftalmológica" },
    ],
    institutes: [
      { name: "Instituto da Catarata", href: "/instituto/catarata", icon: Eye },
      { name: "Instituto da Retina", href: "/instituto/retina", icon: Heart },
    ],
    awards: [
      { icon: Award, text: "Condecoração \"Amigo da Marinha\" — Marinha do Brasil" },
      { icon: Globe, text: "+10 anos no Projeto Oftalmologia Humanitária na Amazônia" },
      { icon: Heart, text: "Centenas de cirurgias realizadas em comunidades ribeirinhas" },
    ],
    areas: [
      "Cirurgia de Catarata (Facoemulsificação)",
      "Lentes Intraoculares Premium (Multifocal, Tórica, EDOF)",
      "Vitrectomia Posterior",
      "Doenças da Retina e Vítreo",
      "Retinopatia Diabética",
      "Descolamento de Retina",
      "Injeções Intravítreas (Anti-VEGF)",
      "Degeneração Macular (DMRI)",
    ],
    seo: {
      title: "Dr. Fernando Drudi — Oftalmologista em SP | Catarata e Retina",
      description: "Dr. Fernando Macei Drudi, CRM-SP 139.300. Oftalmologista especialista em Catarata e Retina Cirúrgica. Diretor Clínico da Drudi e Almeida. HSPE. Agende: (11) 5026-8521.",
      keywords: "Dr Fernando Drudi, oftalmologista São Paulo, cirurgia de catarata, retina cirúrgica, CRM 139300, Drudi e Almeida",
    },
  },
  "dra-priscilla-almeida": {
    slug: "dra-priscilla-almeida",
    name: "Dra. Priscilla de Almeida",
    fullName: "Dra. Priscilla Rodrigues de Almeida",
    crm: "CRM-SP 148.173",
    rqe: "RQE 59.216",
    role: "Diretora Técnica",
    specialty: "Especialista em Segmento Anterior, Córnea e Lentes de Contato",
    image: "/images/dra-priscilla-800w.webp",
    imageAlt: "Dra. Priscilla Rodrigues de Almeida — Oftalmologista especialista em Córnea e Ceratocone em São Paulo",
    bio: [
      "A Dra. Priscilla Rodrigues de Almeida construiu sua trajetória na oftalmologia a partir de uma formação sólida e vivência intensa em ambientes de alta complexidade. Formou-se em Medicina e realizou Residência em Oftalmologia pelo Hospital do Servidor Público do Estado de São Paulo (HSPE), onde atuou ativamente em atendimentos clínicos e cirúrgicos, realizando centenas de cirurgias de catarata.",
      "Após a residência, aprofundou seus conhecimentos com Fellowship em Doenças Oculares Externas e Córnea Cirúrgica pela Escola Paulista de Medicina (EPM/UNIFESP), referência nacional em ensino e pesquisa, com atuação em cirurgias de córnea, acompanhamento de transplantes penetrantes e lamelares e manejo de doenças da superfície ocular.",
      "Mantém participação constante em congressos nacionais e internacionais, cursos de atualização e produção científica, reforçando o compromisso com uma medicina baseada em evidência, técnica e segurança.",
      "Sua expertise em lentes de contato especiais para ceratocone e outras ectasias corneanas é reconhecida por pacientes de todo o estado de São Paulo, que buscam na Drudi e Almeida o tratamento mais atualizado e personalizado para suas condições.",
    ],
    formation: [
      { icon: GraduationCap, text: "Graduação em Medicina" },
      { icon: GraduationCap, text: "Residência em Oftalmologia — HSPE/SP" },
      { icon: GraduationCap, text: "Fellowship em Córnea Cirúrgica — EPM/UNIFESP" },
      { icon: BookOpen, text: "Produção científica e congressos nacionais e internacionais" },
    ],
    institutes: [
      { name: "Instituto do Ceratocone", href: "/instituto/ceratocone", icon: Shield },
    ],
    awards: [
      { icon: Award, text: "Fellowship pela Escola Paulista de Medicina (EPM/UNIFESP)" },
      { icon: Globe, text: "Participação em congressos nacionais e internacionais" },
      { icon: BookOpen, text: "Produção científica em doenças da superfície ocular" },
    ],
    areas: [
      "Ceratocone — Diagnóstico e Tratamento",
      "Crosslinking Corneano",
      "Anel de Ferrara (Anel Intracorneano)",
      "Adaptação de Lentes de Contato Especiais",
      "Transplante de Córnea (Penetrante e Lamelar)",
      "Doenças da Superfície Ocular",
      "Olho Seco",
      "Cirurgia de Catarata",
      "Pterígio",
    ],
    seo: {
      title: "Dra. Priscilla de Almeida — Oftalmologista em SP | Córnea e Ceratocone",
      description: "Dra. Priscilla Rodrigues de Almeida, CRM-SP 148.173. Oftalmologista especialista em Córnea e Ceratocone. Fellowship EPM/UNIFESP. Diretora Técnica da Drudi e Almeida. Agende: (11) 5026-8521.",
      keywords: "Dra Priscilla Almeida, oftalmologista São Paulo, ceratocone, córnea, lentes de contato, CRM 148173, Drudi e Almeida",
    },
  },
};

/* ============================================================
   Schema Physician JSON-LD
   ============================================================ */
function PhysicianSchema({ doctor }: { doctor: DoctorData }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.fullName,
    image: `https://institutodrudiealmeida.com.br${doctor.image}`,
    description: doctor.seo.description,
    medicalSpecialty: "http://schema.org/Optometric",
    jobTitle: doctor.role,
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
      url: "https://institutodrudiealmeida.com.br",
      telephone: "+55-11-5430-2421",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "Rua Galvão Bueno, 425 - Sala 1",
          addressLocality: "São Paulo",
          addressRegion: "SP",
          postalCode: "01506-000",
          addressCountry: "BR",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "Rua Dona Primitiva Vianco, 740",
          addressLocality: "Guarulhos",
          addressRegion: "SP",
          postalCode: "07041-000",
          addressCountry: "BR",
        },
      ],
    },
    alumniOf: doctor.formation
      .filter((f) => f.text.includes("—"))
      .map((f) => ({
        "@type": "EducationalOrganization",
        name: f.text.split("—")[1]?.trim() || f.text,
      })),
    knowsAbout: doctor.areas,
    url: `https://institutodrudiealmeida.com.br/medico/${doctor.slug}`,
    sameAs: [],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/* ============================================================
   Componente Principal
   ============================================================ */
export default function Medico() {
  const [, params] = useRoute("/medico/:slug");
  const slug = params?.slug || "";
  const doctor = doctors[slug];

  if (!doctor) return <NotFound />;

  return (
    <>
      <SEOHead
        title={doctor.seo.title}
        description={doctor.seo.description}
        keywords={doctor.seo.keywords}
        canonicalPath={`/medico/${doctor.slug}`}
        ogImage={doctor.image}
        ogType="profile"
        schema={{}}
      />
      <PhysicianSchema doctor={doctor} />

      {/* ========== HERO ========== */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy/90 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="container py-12 md:py-20">
          <Breadcrumb
            items={[
              { label: "Início", href: "/" },
              { label: "Sobre Nós", href: "/sobre" },
              { label: doctor.name },
            ]}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mt-8">
            {/* Photo */}
            <AnimateOnScroll direction="left">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <div className="absolute -inset-4 bg-gradient-to-br from-gold/20 to-gold/5 rounded-2xl blur-xl" />
                <img
                  src={doctor.image}
                  alt={doctor.imageAlt}
                  className="relative rounded-2xl shadow-2xl w-full object-cover aspect-[3/4]"
                  width={400}
                  height={533}
                />
                {/* CRM Badge */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-xl shadow-lg px-4 py-3 border border-gold/20">
                  <p className="font-ui text-xs font-bold text-navy">{doctor.crm}</p>
                  <p className="font-ui text-xs text-muted-foreground">{doctor.rqe}</p>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Info */}
            <AnimateOnScroll direction="right">
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                  {doctor.role}
                </span>
                <h1 className="font-display text-3xl md:text-4xl lg:text-5xl text-cream mt-3 mb-2 leading-tight">
                  {doctor.fullName}
                </h1>
                <p className="font-body text-lg text-gold/80 mb-6">{doctor.specialty}</p>

                {/* Institutes */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {doctor.institutes.map((inst) => (
                    <Link
                      key={inst.href}
                      href={inst.href}
                      className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-2 text-cream/90 hover:bg-gold/20 transition-colors"
                    >
                      <inst.icon className="w-4 h-4 text-gold" />
                      <span className="font-ui text-xs font-semibold">{inst.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Quick bio */}
                <p className="font-body text-base text-cream/70 leading-relaxed mb-8">
                  {doctor.bio[0]}
                </p>

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3 rounded-md hover:bg-gold-light transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Agendar Consulta
                  </a>
                  <a
                    href="tel:+551154302421"
                    className="inline-flex items-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-cream/10 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    (11) 5430-2421
                  </a>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== BIOGRAFIA COMPLETA ========== */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <AnimateOnScroll>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Trajetória Profissional
              </span>
              <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-8">
                Conheça a história do {doctor.name}
              </h2>
            </AnimateOnScroll>
            <div className="space-y-5">
              {doctor.bio.map((paragraph, i) => (
                <AnimateOnScroll key={i} delay={i * 0.1}>
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== FORMAÇÃO E RECONHECIMENTOS ========== */}
      <section className="section-padding bg-cream/30">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formação */}
            <AnimateOnScroll>
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                  Formação Acadêmica
                </span>
                <h2 className="font-display text-2xl text-navy mt-3 mb-6">
                  Educação e Especialização
                </h2>
                <div className="space-y-4">
                  {doctor.formation.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-border/50 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-navy" />
                      </div>
                      <p className="font-body text-sm text-foreground leading-relaxed pt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            {/* Reconhecimentos */}
            <AnimateOnScroll delay={0.2}>
              <div>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                  Reconhecimentos
                </span>
                <h2 className="font-display text-2xl text-navy mt-3 mb-6">
                  Prêmios e Contribuições
                </h2>
                <div className="space-y-4">
                  {doctor.awards.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/80 border border-gold/20 shadow-sm">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-gold" />
                      </div>
                      <p className="font-body text-sm text-foreground leading-relaxed pt-2">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* ========== ÁREAS DE ATUAÇÃO ========== */}
      <section className="section-padding bg-background">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Especialidades
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-4">
              Áreas de Atuação
            </h2>
            <div className="gold-line max-w-[80px] mx-auto" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {doctor.areas.map((area, i) => (
              <AnimateOnScroll key={area} delay={i * 0.05}>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-white/60 hover:border-gold/30 hover:shadow-md transition-all">
                  <Eye className="w-5 h-5 text-gold shrink-0" />
                  <span className="font-body text-sm text-foreground">{area}</span>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== INSTITUTOS ========== */}
      <section className="section-padding bg-cream/30">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Atendimento
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-4">
              Institutos onde atende
            </h2>
            <div className="gold-line max-w-[80px] mx-auto" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {doctor.institutes.map((inst, i) => (
              <AnimateOnScroll key={inst.href} delay={i * 0.1}>
                <Link href={inst.href} className="group block">
                  <div className="p-6 rounded-xl border border-border/60 bg-white/80 hover:shadow-lg hover:border-gold/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-navy/8 flex items-center justify-center">
                        <inst.icon className="w-6 h-6 text-navy group-hover:text-gold transition-colors" />
                      </div>
                      <div>
                        <h3 className="font-display text-lg text-navy group-hover:text-gold transition-colors">
                          {inst.name}
                        </h3>
                        <span className="inline-flex items-center gap-1 font-ui text-xs text-muted-foreground group-hover:text-gold transition-colors mt-1">
                          Saiba mais <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== UNIDADES ========== */}
      <section className="section-padding bg-background">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Localização
            </span>
            <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-4">
              Unidades de Atendimento
            </h2>
            <p className="font-body text-sm text-muted-foreground max-w-lg mx-auto">
              O {doctor.name} atende em nossas unidades em São Paulo e Guarulhos.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-4" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              { name: "Guarulhos", href: "/unidade/guarulhos", address: "R. Dona Primitiva Vianco, 740" },
              { name: "Lapa", href: "/unidade/lapa", address: "R. Catão, 72 — Sala 1104" },
              { name: "Santana", href: "/unidade/santana", address: "R. Voluntários da Pátria, 3811" },
              { name: "São Miguel Paulista", href: "/unidade/sao-miguel", address: "R. Dr. José Artur Nova, 105" },
              { name: "Tatuapé", href: "/unidade/tatuape", address: "R. Serra de Botucatu, 398" },
            ].map((unit, i) => (
              <AnimateOnScroll key={unit.href} delay={i * 0.05}>
                <Link href={unit.href} className="group block">
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-white/60 hover:border-gold/30 hover:shadow-md transition-all">
                    <MapPin className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                    <div>
                      <span className="font-ui text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                        {unit.name}
                      </span>
                      <p className="font-body text-xs text-muted-foreground mt-0.5">{unit.address}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto shrink-0 mt-1 group-hover:text-gold group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* ========== ARTIGOS REVISADOS ========== */}
      <SatelliteArticles
        mode="author"
        query={doctor.slug === "dr-fernando-drudi" ? "fernando" : "priscilla"}
        title={`Artigos revisados por ${doctor.name}`}
        subtitle={`Conteúdo científico sobre oftalmologia revisado e aprovado por ${doctor.name}, garantindo informações precisas e atualizadas para nossos pacientes.`}
        limit={4}
      />
      {/* ========== CTA ========== */}
      <InstitutoCTA
        title={`Agende com o ${doctor.name}`}
        text={`Entre em contato para agendar uma consulta com ${doctor.name}. Atendemos diversos convênios e oferecemos opções de atendimento particular.`}
      />
    </>
  );
}
