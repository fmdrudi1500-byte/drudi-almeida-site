/* ============================================================
   SatelliteArticles — Links internos para artigos do blog
   Usado nas pillar pages de instituto e nas páginas de médico.
   Conecta a autoridade das páginas principais aos artigos satélites.
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, BookOpen, Eye, Clock } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";
import { trpc } from "@/lib/trpc";

interface Props {
  /** Modo de busca: por categoria (pillar pages) ou por autor (páginas de médico) */
  mode: "category" | "author";
  /** Slug da categoria (ex: "catarata") ou keyword do autor (ex: "fernando") */
  query: string;
  /** Título da seção */
  title?: string;
  /** Subtítulo da seção */
  subtitle?: string;
  /** Número máximo de artigos */
  limit?: number;
  /** Cor de destaque (padrão: dourado) */
  accentColor?: string;
}

export default function SatelliteArticles({
  mode,
  query,
  title = "Artigos Relacionados",
  subtitle,
  limit = 4,
  accentColor = "#c9a84c",
}: Props) {
  const categoryQuery = trpc.blog.listByCategorySlug.useQuery(
    { categorySlug: query, limit },
    { enabled: mode === "category" }
  );
  const authorQuery = trpc.blog.listByAuthorKeyword.useQuery(
    { keyword: query, limit },
    { enabled: mode === "author" }
  );

  const result = mode === "category" ? categoryQuery : authorQuery;
  const posts = result.data?.posts ?? [];

  if (result.isLoading) {
    return (
      <section className="section-padding bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-border/40 p-5 animate-pulse">
                <div className="h-3 bg-muted rounded w-1/3 mb-3" />
                <div className="h-4 bg-muted rounded w-full mb-2" />
                <div className="h-4 bg-muted rounded w-3/4 mb-4" />
                <div className="h-3 bg-muted rounded w-1/4" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <AnimateOnScroll className="text-center mb-10">
          <span
            className="font-ui text-xs font-semibold tracking-[0.2em] uppercase"
            style={{ color: accentColor }}
          >
            Aprofunde seu Conhecimento
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="font-body text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="h-0.5 w-20 mx-auto mt-5" style={{ backgroundColor: accentColor }} />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {posts.map((post, i) => (
            <AnimateOnScroll key={post.id} delay={i * 0.07}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <article className="bg-white rounded-xl border border-border/50 p-5 h-full flex flex-col hover:shadow-md hover:border-gold/30 transition-all duration-300">
                  {post.coverImageUrl ? (
                    <div className="aspect-[16/9] rounded-lg overflow-hidden mb-4 -mx-1">
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] rounded-lg bg-gradient-to-br from-navy/8 to-gold/5 flex items-center justify-center mb-4 -mx-1">
                      <BookOpen className="w-8 h-8 text-navy/20" />
                    </div>
                  )}

                  <div className="flex-1 flex flex-col">
                    <h3 className="font-display text-sm text-navy group-hover:text-gold transition-colors leading-snug line-clamp-3 mb-2 flex-1">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/30">
                      {post.readingTimeMin && (
                        <span className="flex items-center gap-1 font-ui text-[10px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {post.readingTimeMin} min
                        </span>
                      )}
                      <span
                        className="inline-flex items-center gap-1 font-ui text-xs font-semibold group-hover:gap-2 transition-all"
                        style={{ color: accentColor }}
                      >
                        Ler artigo
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll className="text-center mt-8">
          <Link href="/blog">
            <span className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-navy hover:text-gold transition-colors">
              <Eye className="w-4 h-4" />
              Ver todos os artigos do blog
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
