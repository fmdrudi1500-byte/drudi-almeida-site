/* ============================================================
   Blog — Drudi e Almeida
   Informative blog with articles optimized for AI reading
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, Search } from "lucide-react";
import { useState, useMemo } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";
import SEOHead from "@/components/SEOHead";

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
}

export const blogArticles: BlogArticle[] = [
  // === ORIGINAL 6 ===
  {
    slug: "catarata-sintomas-tratamento-guia-completo",
    title: "Catarata: Sintomas, Causas e Tratamento — Guia Completo",
    excerpt: "Tudo o que você precisa saber sobre a catarata, desde os primeiros sintomas até a cirurgia a laser. Entenda quando procurar um especialista.",
    category: "Catarata",
    date: "2026-02-20",
    readTime: "8 min",
    image: IMAGES.hero.doctorConsultation,
  },
  {
    slug: "ceratocone-o-que-e-e-como-tratar",
    title: "Ceratocone: O que é, Diagnóstico e Tratamentos Modernos",
    excerpt: "Descubra o que é o ceratocone, como é diagnosticado e quais são os tratamentos mais avançados disponíveis, incluindo o crosslinking.",
    category: "Ceratocone",
    date: "2026-02-15",
    readTime: "7 min",
    image: IMAGES.hero.eyeAbstract,
  },
  {
    slug: "glaucoma-ladrao-silencioso-da-visao",
    title: "Glaucoma: Por que é Chamado de Ladrão Silencioso da Visão?",
    excerpt: "O glaucoma não apresenta sintomas nas fases iniciais. Saiba como o diagnóstico precoce pode salvar sua visão e quais são os tratamentos.",
    category: "Glaucoma",
    date: "2026-02-10",
    readTime: "6 min",
    image: IMAGES.hero.technology,
  },
  {
    slug: "retinopatia-diabetica-prevencao-tratamento",
    title: "Retinopatia Diabética: Prevenção e Tratamento",
    excerpt: "Se você tem diabetes, precisa conhecer os riscos da retinopatia diabética e como proteger sua visão com acompanhamento regular.",
    category: "Retina",
    date: "2026-02-05",
    readTime: "7 min",
    image: IMAGES.hero.main,
  },
  {
    slug: "estrabismo-infantil-quando-procurar-oftalmologista",
    title: "Estrabismo Infantil: Quando Procurar o Oftalmologista?",
    excerpt: "Entenda os sinais de estrabismo em crianças, a importância do diagnóstico precoce e as opções de tratamento disponíveis.",
    category: "Estrabismo",
    date: "2026-01-28",
    readTime: "5 min",
    image: IMAGES.hero.happyFamily,
  },
  {
    slug: "importancia-exame-oftalmologico-regular",
    title: "A Importância do Exame Oftalmológico Regular",
    excerpt: "Muitas doenças oculares são silenciosas. Descubra por que consultas regulares ao oftalmologista podem salvar sua visão.",
    category: "Prevenção",
    date: "2026-01-20",
    readTime: "4 min",
    image: IMAGES.hero.doctorConsultation,
  },
  // === 6 NOVOS ARTIGOS ===
  {
    slug: "quando-levar-crianca-ao-oftalmologista",
    title: "Quando Levar a Criança ao Oftalmologista? Guia por Idade",
    excerpt: "Desde o teste do olhinho até a adolescência: saiba quais exames são recomendados em cada fase da vida e os sinais de alerta que os pais devem observar.",
    category: "Pediatria",
    date: "2026-02-22",
    readTime: "6 min",
    image: IMAGES.hero.happyFamily,
  },
  {
    slug: "cuidados-pos-cirurgia-catarata",
    title: "Cuidados Pós-Cirurgia de Catarata: O que Fazer e Evitar",
    excerpt: "Operou de catarata? Saiba o passo a passo da recuperação, quais atividades evitar, como usar os colírios e quando a visão estabiliza completamente.",
    category: "Catarata",
    date: "2026-02-18",
    readTime: "7 min",
    image: IMAGES.hero.technology,
  },
  {
    slug: "lentes-intraoculares-tipos-diferenca",
    title: "Lentes Intraoculares: Monofocal, Multifocal ou Trifocal?",
    excerpt: "Entenda as diferenças entre os tipos de lentes implantadas na cirurgia de catarata e como escolher a melhor opção para o seu estilo de vida.",
    category: "Catarata",
    date: "2026-02-12",
    readTime: "8 min",
    image: IMAGES.hero.eyeAbstract,
  },
  {
    slug: "olho-seco-causas-tratamento",
    title: "Síndrome do Olho Seco: Causas, Sintomas e Tratamentos",
    excerpt: "O uso excessivo de telas e ar-condicionado agrava o olho seco. Conheça as causas, como diagnosticar e os tratamentos disponíveis para aliviar o desconforto.",
    category: "Prevenção",
    date: "2026-02-08",
    readTime: "5 min",
    image: IMAGES.hero.main,
  },
  {
    slug: "arte-e-visao-monet-catarata-historia",
    title: "Arte e Visão: Como a Catarata Transformou as Pinturas de Monet",
    excerpt: "Claude Monet pintou por décadas com catarata. Descubra como a doença alterou suas obras-primas e o que isso revela sobre a visão humana.",
    category: "Arte e Visão",
    date: "2026-01-25",
    readTime: "9 min",
    image: IMAGES.art.monetBeforeAfter,
  },
  {
    slug: "arte-visao-doencas-oculares-historia-arte",
    title: "Arte e Visão: Como Doenças Oculares Transformaram a História da Arte",
    excerpt: "De Monet a Van Gogh, de El Greco a Da Vinci: descubra como catarata, ceratocone, glaucoma e estrabismo influenciaram as obras-primas que definiram a história da arte.",
    category: "Arte e Visão",
    date: "2026-02-24",
    readTime: "12 min",
    image: IMAGES.art.monetJapaneseBridge,
  },
  {
    slug: "miopia-infantil-epidemia-digital",
    title: "Miopia Infantil: A Epidemia da Era Digital",
    excerpt: "A miopia em crianças cresce em ritmo alarmante no mundo todo. Entenda o papel das telas, da luz natural e como prevenir a progressão.",
    category: "Pediatria",
    date: "2026-01-15",
    readTime: "6 min",
    image: IMAGES.hero.happyFamily,
  },
];

const categories = ["Todos", ...Array.from(new Set(blogArticles.map((a) => a.category)))];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered = useMemo(() => {
    return blogArticles.filter((a) => {
      const matchCat = activeCategory === "Todos" || a.category === activeCategory;
      const matchSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, activeCategory]);

  return (
    <>
      <SEOHead
        title="Blog — Artigos sobre Saúde Ocular"
        description="Artigos educativos sobre catarata, ceratocone, glaucoma, retina, estrabismo e saúde ocular. Informação de qualidade para cuidar da sua visão."
        keywords="blog oftalmologia, artigos saúde ocular, catarata blog, glaucoma informações, ceratocone artigos"
        canonicalPath="/blog"
      />
      <InstitutoHero
        title="Blog Informativo"
        subtitle="Conteúdo confiável e atualizado sobre saúde ocular para você e sua família."
        imageUrl={IMAGES.hero.main}
        breadcrumb="Blog"
      />

      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Conhecimento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">Artigos Recentes</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nossos especialistas compartilham informações valiosas sobre prevenção, diagnóstico e tratamento das principais doenças oculares.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>

          {/* Search + Filters */}
          <AnimateOnScroll className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar artigos..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-white font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-ui text-xs font-semibold px-4 py-2 rounded-full transition-all ${
                      activeCategory === cat
                        ? "bg-navy text-cream shadow-sm"
                        : "bg-cream text-navy hover:bg-gold/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>

          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="font-body text-muted-foreground">Nenhum artigo encontrado para sua busca.</p>
            </div>
          ) : (
            <>
              {/* Featured article */}
              <AnimateOnScroll className="mb-10">
                <Link href={`/blog/${filtered[0].slug}`} className="group block">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl border border-border/60 overflow-hidden bg-white hover:shadow-lg hover:border-gold/30 transition-all">
                    <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                      <img
                        src={filtered[0].image}
                        alt={filtered[0].title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 lg:p-8 flex flex-col justify-center">
                      <span className="inline-block font-ui text-xs font-semibold tracking-wider uppercase text-gold mb-3">
                        {filtered[0].category}
                      </span>
                      <h3 className="font-display text-2xl text-navy mb-3 group-hover:text-gold transition-colors leading-snug">
                        {filtered[0].title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                        {filtered[0].excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-ui text-xs">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(filtered[0].date).toLocaleDateString("pt-BR")}
                        </span>
                        <span className="flex items-center gap-1.5 font-ui text-xs">
                          <Clock className="w-3.5 h-3.5" />
                          {filtered[0].readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>

              {/* Article grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.slice(1).map((article, i) => (
                  <AnimateOnScroll key={article.slug} delay={i * 0.06}>
                    <Link href={`/blog/${article.slug}`} className="group block h-full">
                      <div className="rounded-xl border border-border/60 overflow-hidden bg-white hover:shadow-lg hover:border-gold/30 transition-all h-full flex flex-col">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <span className="inline-block font-ui text-xs font-semibold tracking-wider uppercase text-gold mb-2">
                            {article.category}
                          </span>
                          <h3 className="font-display text-lg text-navy mb-2 group-hover:text-gold transition-colors leading-snug flex-1">
                            {article.title}
                          </h3>
                          <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/40">
                            <span className="flex items-center gap-1.5 font-ui text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(article.date).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="flex items-center gap-1 font-ui text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                              Ler mais
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
