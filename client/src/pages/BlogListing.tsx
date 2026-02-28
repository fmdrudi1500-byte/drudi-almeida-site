import { useState, useMemo } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import {
  Search,
  Clock,
  Eye,
  ArrowRight,
  FileText,
  Video,
  Music,
  GalleryHorizontal,
  Loader2,
  MessageSquare,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const CONTENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  article: <FileText className="w-3.5 h-3.5" />,
  video: <Video className="w-3.5 h-3.5" />,
  audio: <Music className="w-3.5 h-3.5" />,
  gallery: <GalleryHorizontal className="w-3.5 h-3.5" />,
};

const CONTENT_TYPE_LABELS: Record<string, string> = {
  article: "Artigo",
  video: "Vídeo",
  audio: "Áudio",
  gallery: "Galeria",
};

const POSTS_PER_PAGE = 9;

export default function BlogListing() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [offset, setOffset] = useState(0);

  // Debounce search
  const handleSearch = (value: string) => {
    setSearch(value);
    clearTimeout((window as any).__blogSearchTimeout);
    (window as any).__blogSearchTimeout = setTimeout(() => {
      setDebouncedSearch(value);
      setOffset(0);
    }, 400);
  };

  const { data: postsData, isLoading } = trpc.blog.listPublished.useQuery({
    limit: POSTS_PER_PAGE,
    offset,
    categoryId,
    search: debouncedSearch || undefined,
  });

  const { data: categories } = trpc.blog.listCategories.useQuery();

  const featuredPost = useMemo(
    () => offset === 0 && !debouncedSearch && !categoryId ? postsData?.posts[0] : undefined,
    [postsData, offset, debouncedSearch, categoryId]
  );

  const regularPosts = useMemo(() => {
    if (!postsData?.posts) return [];
    return featuredPost ? postsData.posts.slice(1) : postsData.posts;
  }, [postsData, featuredPost]);

  return (
    <>
      <SEOHead
        title="Blog — Saúde Ocular e Oftalmologia"
        description="Artigos, vídeos e conteúdos sobre saúde ocular, catarata, ceratocone, glaucoma, retina e estrabismo. Drudi e Almeida Oftalmologia."
        keywords="blog oftalmologia, saúde ocular, catarata, ceratocone, glaucoma, retina"
        canonicalPath="/blog"
      />

      {/* Hero */}
      <section className="bg-navy text-cream py-16">
        <div className="container">
          <AnimateOnScroll>
            <div className="max-w-2xl">
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Conteúdo Especializado
              </span>
              <h1 className="font-display text-4xl md:text-5xl mt-3 mb-4 leading-tight">
                Blog de Saúde Ocular
              </h1>
              <p className="font-body text-base text-cream/70 leading-relaxed">
                Artigos, vídeos e conteúdos educativos sobre cuidados com a visão, 
                elaborados pelos especialistas da Drudi e Almeida Oftalmologia.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Search */}
          <AnimateOnScroll delay={0.2} className="mt-8 max-w-xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-cream/50" />
              <input
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Buscar artigos, vídeos, podcasts..."
                className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-cream placeholder:text-cream/50 font-body text-sm focus:outline-none focus:border-gold/50 focus:bg-white/15 transition-all"
              />
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Category filters */}
      {categories && categories.length > 0 && (
        <section className="border-b border-border bg-white sticky top-0 z-10 shadow-sm">
          <div className="container py-3">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => { setCategoryId(undefined); setOffset(0); }}
                className={`font-ui text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                  !categoryId
                    ? "bg-navy text-cream"
                    : "bg-muted text-muted-foreground hover:bg-navy/10"
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => { setCategoryId(cat.id); setOffset(0); }}
                  className={`font-ui text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    categoryId === cat.id
                      ? "text-cream"
                      : "bg-muted text-muted-foreground hover:opacity-80"
                  }`}
                  style={categoryId === cat.id ? { backgroundColor: cat.color ?? "#1a2e4a" } : {}}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="container">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-gold" />
            </div>
          ) : postsData?.posts.length === 0 ? (
            <div className="text-center py-20">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-display text-xl text-navy mb-2">Nenhum artigo encontrado</h3>
              <p className="font-body text-sm text-muted-foreground">
                {debouncedSearch
                  ? `Nenhum resultado para "${debouncedSearch}".`
                  : "Ainda não há artigos publicados nesta categoria."}
              </p>
              {debouncedSearch && (
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => { handleSearch(""); setCategoryId(undefined); }}
                >
                  Limpar busca
                </Button>
              )}
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featuredPost && (
                <AnimateOnScroll className="mb-10">
                  <Link href={`/blog/${featuredPost.slug}`} className="group block">
                    <div className="relative rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[320px]">
                        {/* Image */}
                        <div className="relative bg-navy/10 min-h-[220px]">
                          {featuredPost.coverImageUrl ? (
                            <img
                              src={featuredPost.coverImageUrl}
                              alt={featuredPost.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy/70 flex items-center justify-center">
                              <div className="text-cream/30">
                                {CONTENT_TYPE_ICONS[featuredPost.contentType]}
                              </div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 lg:to-white/80" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className="bg-gold text-navy text-[10px] font-ui font-semibold">
                              Destaque
                            </Badge>
                            <Badge variant="outline" className="text-[10px] flex items-center gap-1">
                              {CONTENT_TYPE_ICONS[featuredPost.contentType]}
                              {CONTENT_TYPE_LABELS[featuredPost.contentType]}
                            </Badge>
                          </div>
                          <h2 className="font-display text-2xl md:text-3xl text-navy leading-tight mb-3 group-hover:text-gold transition-colors">
                            {featuredPost.title}
                          </h2>
                          {featuredPost.excerpt && (
                            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
                              {featuredPost.excerpt}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground font-body mb-4">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {featuredPost.readingTimeMin} min de leitura
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="w-3.5 h-3.5" />
                              {featuredPost.viewCount} visualizações
                            </span>
                          </div>
                          <span className="inline-flex items-center gap-2 font-ui text-sm font-semibold text-navy group-hover:text-gold transition-colors">
                            Ler artigo completo
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimateOnScroll>
              )}

              {/* Regular posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularPosts.map((post, i) => (
                  <AnimateOnScroll key={post.id} delay={i * 0.06}>
                    <Link href={`/blog/${post.slug}`} className="group block h-full">
                      <article className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                        {/* Cover */}
                        <div className="relative h-48 bg-navy/5 overflow-hidden">
                          {post.coverImageUrl ? (
                            <img
                              src={post.coverImageUrl}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-navy/10 to-navy/5 flex items-center justify-center">
                              <div className="text-navy/30 scale-[3]">
                                {CONTENT_TYPE_ICONS[post.contentType]}
                              </div>
                            </div>
                          )}
                          {/* Content type badge */}
                          <div className="absolute top-3 left-3">
                            <Badge variant="secondary" className="text-[10px] flex items-center gap-1 bg-white/90">
                              {CONTENT_TYPE_ICONS[post.contentType]}
                              {CONTENT_TYPE_LABELS[post.contentType]}
                            </Badge>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                          <h3 className="font-display text-lg text-navy leading-tight mb-2 group-hover:text-gold transition-colors line-clamp-2">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="font-body text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-3 flex-1">
                              {post.excerpt}
                            </p>
                          )}

                          {/* Tags */}
                          {post.tags && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {post.tags
                                .split(",")
                                .slice(0, 3)
                                .map((tag) => (
                                  <span
                                    key={tag}
                                    className="font-ui text-[10px] bg-gold/10 text-gold px-2 py-0.5 rounded-full"
                                  >
                                    {tag.trim()}
                                  </span>
                                ))}
                            </div>
                          )}

                          {/* Meta */}
                          <div className="flex items-center justify-between pt-3 border-t border-border/40 mt-auto">
                            <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-body">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {post.readingTimeMin} min
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {post.viewCount}
                              </span>
                            </div>
                            {post.publishedAt && (
                              <span className="font-body text-[11px] text-muted-foreground">
                                {format(new Date(post.publishedAt), "dd MMM yyyy", { locale: ptBR })}
                              </span>
                            )}
                          </div>
                        </div>
                      </article>
                    </Link>
                  </AnimateOnScroll>
                ))}
              </div>

              {/* Pagination */}
              {(postsData?.total ?? 0) > POSTS_PER_PAGE && (
                <div className="flex items-center justify-center gap-4 mt-10">
                  <Button
                    variant="outline"
                    disabled={offset === 0}
                    onClick={() => setOffset((o) => Math.max(0, o - POSTS_PER_PAGE))}
                  >
                    Anterior
                  </Button>
                  <span className="font-ui text-sm text-muted-foreground">
                    Página {Math.floor(offset / POSTS_PER_PAGE) + 1} de{" "}
                    {Math.ceil((postsData?.total ?? 0) / POSTS_PER_PAGE)}
                  </span>
                  <Button
                    variant="outline"
                    disabled={offset + POSTS_PER_PAGE >= (postsData?.total ?? 0)}
                    onClick={() => setOffset((o) => o + POSTS_PER_PAGE)}
                  >
                    Próxima
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream/50 py-12">
        <div className="container text-center">
          <h3 className="font-display text-2xl text-navy mb-3">Cuide da sua visão</h3>
          <p className="font-body text-sm text-muted-foreground mb-6 max-w-md mx-auto">
            Agende uma consulta com nossos especialistas e receba o melhor cuidado oftalmológico.
          </p>
          <a
            href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold/90 transition-colors"
          >
            Agendar pelo WhatsApp
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </>
  );
}
