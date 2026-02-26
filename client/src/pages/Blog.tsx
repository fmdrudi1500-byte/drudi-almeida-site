/* ============================================================
   Blog — Drudi e Almeida
   Informative blog with articles optimized for AI reading
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";

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
];

export default function Blog() {
  return (
    <>
      <InstitutoHero
        title="Blog Informativo"
        subtitle="Conteúdo confiável e atualizado sobre saúde ocular para você e sua família."
        imageUrl={IMAGES.hero.main}
        breadcrumb="Blog"
      />

      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Conhecimento</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">Artigos Recentes</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nossos especialistas compartilham informações valiosas sobre prevenção, diagnóstico e tratamento das principais doenças oculares.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>

          {/* Featured article */}
          <AnimateOnScroll className="mb-10">
            <Link href={`/blog/${blogArticles[0].slug}`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 rounded-xl border border-border/60 overflow-hidden bg-white hover:shadow-lg hover:border-gold/30 transition-all">
                <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={blogArticles[0].image}
                    alt={blogArticles[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col justify-center">
                  <span className="inline-block font-ui text-xs font-semibold tracking-wider uppercase text-gold mb-3">
                    {blogArticles[0].category}
                  </span>
                  <h3 className="font-display text-2xl text-navy mb-3 group-hover:text-gold transition-colors leading-snug">
                    {blogArticles[0].title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {blogArticles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <span className="flex items-center gap-1.5 font-ui text-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(blogArticles[0].date).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="flex items-center gap-1.5 font-ui text-xs">
                      <Clock className="w-3.5 h-3.5" />
                      {blogArticles[0].readTime}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </AnimateOnScroll>

          {/* Article grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.slice(1).map((article, i) => (
              <AnimateOnScroll key={article.slug} delay={i * 0.08}>
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
        </div>
      </section>
    </>
  );
}
