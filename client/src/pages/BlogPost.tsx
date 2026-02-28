/* ============================================================
   BlogPost — Individual article page with rich content
   Supports both static legacy articles and dynamic DB posts
   ============================================================ */
import { useState } from "react";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Share2, Eye, Tag, MessageSquare, Send, Loader2, FileText, Video, Music, GalleryHorizontal, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { blogArticles } from "./Blog";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import SEOHead from "@/components/SEOHead";
import AnimateOnScroll from "@/components/AnimateOnScroll";

// Full article content mapped by slug (legacy static content)
const articleContent: Record<string, string[]> = {
  "catarata-sintomas-tratamento-guia-completo": [
    "A catarata é a principal causa de cegueira reversível no mundo, afetando milhões de pessoas, especialmente acima dos 60 anos. Trata-se da opacificação progressiva do cristalino, a lente natural do olho responsável por focar a luz na retina.",
    "Os sintomas mais comuns incluem visão embaçada ou turva, dificuldade para enxergar à noite, sensibilidade à luz, percepção desbotada das cores e necessidade frequente de trocar o grau dos óculos. Muitos pacientes descrevem a sensação de olhar através de um vidro fosco.",
    "O único tratamento eficaz para a catarata é a cirurgia. O procedimento, chamado facoemulsificação, é rápido (10-15 minutos), seguro e realizado com anestesia local por colírios. O cristalino opaco é removido e substituído por uma lente intraocular artificial.",
    "Na Drudi e Almeida, utilizamos a tecnologia do Femto Laser, que realiza as incisões e a fragmentação do cristalino de forma automatizada, com precisão submicrométrica. Isso resulta em maior segurança, previsibilidade e uma recuperação visual mais rápida.",
    "A recuperação é rápida: a maioria dos pacientes retoma atividades como ler e assistir TV já no dia seguinte. Atividades físicas intensas devem aguardar algumas semanas, conforme orientação médica.",
    "É importante saber que a catarata não volta após a cirurgia. Em alguns casos, pode ocorrer uma opacificação da cápsula posterior (chamada de 'catarata secundária'), que é facilmente tratada com uma aplicação de laser YAG em consultório, sem necessidade de nova cirurgia.",
  ],
  "ceratocone-o-que-e-e-como-tratar": [
    "O ceratocone é uma doença ocular progressiva que afeta a córnea, tornando-a mais fina e curva em formato de cone. Essa deformação causa distorção das imagens, visão embaçada e astigmatismo irregular.",
    "A doença geralmente surge na adolescência ou início da idade adulta e pode progredir por décadas. Os principais sintomas incluem visão borrada, aumento rápido do grau, sensibilidade à luz e dificuldade para enxergar à noite.",
    "O crosslinking de córnea é o tratamento padrão-ouro para estabilizar o ceratocone. Utiliza riboflavina (vitamina B2) e luz ultravioleta para fortalecer as fibras de colágeno da córnea, impedindo a progressão da doença.",
    "Outras opções incluem o implante de anel intracorneano, que regulariza a curvatura da córnea, e lentes de contato especiais (rígidas ou esclerais) para corrigir o astigmatismo irregular.",
    "É fundamental evitar coçar os olhos, pois esse hábito é um dos principais fatores associados ao desenvolvimento e progressão do ceratocone. O diagnóstico precoce através da topografia corneana é essencial.",
    "Na Drudi e Almeida, a Dra. Priscilla Rodrigues de Almeida é especialista em segmento anterior e adaptação de lentes de contato, oferecendo acompanhamento personalizado para cada estágio do ceratocone.",
  ],
  "glaucoma-ladrao-silencioso-da-visao": [
    "O glaucoma é chamado de 'ladrão silencioso da visão' porque, na maioria dos casos, não apresenta sintomas nas fases iniciais. A perda de visão ocorre de forma lenta e gradual, começando pela periferia do campo visual.",
    "Trata-se de um grupo de doenças que causam danos progressivos ao nervo óptico, geralmente associados ao aumento da pressão intraocular. Se não tratado, leva à perda irreversível da visão.",
    "Os principais fatores de risco incluem idade acima de 40 anos, histórico familiar, pressão intraocular elevada, descendência africana ou asiática, miopia elevada e diabetes.",
    "O tratamento visa controlar a pressão intraocular e pode incluir colírios, laser (trabeculoplastia seletiva) ou cirurgia. O glaucoma não tem cura, mas o tratamento adequado pode estabilizar a doença.",
    "A melhor forma de prevenção é realizar exames oftalmológicos regulares, especialmente após os 40 anos. A detecção precoce é fundamental para preservar a visão.",
    "Curiosamente, alguns historiadores da arte sugerem que El Greco pode ter tido glaucoma, o que explicaria as figuras alongadas e a perspectiva peculiar de suas pinturas.",
  ],
  "retinopatia-diabetica-prevencao-tratamento": [
    "A retinopatia diabética é uma complicação do diabetes que afeta os vasos sanguíneos da retina. É a principal causa de cegueira em adultos em idade produtiva nos países desenvolvidos.",
    "Nas fases iniciais, a doença é assintomática. Por isso, todo paciente diabético deve realizar exame de fundo de olho pelo menos uma vez por ano, mesmo sem queixas visuais.",
    "O controle rigoroso da glicemia, pressão arterial e colesterol é fundamental para prevenir e retardar a progressão da retinopatia diabética.",
    "Os tratamentos modernos incluem injeções intravítreas de anti-VEGF, que bloqueiam o crescimento de vasos anormais, e fotocoagulação a laser para tratar áreas de isquemia na retina.",
    "Na Drudi e Almeida, o Dr. Fernando Macei Drudi é especialista em retina cirúrgica e conta com OCT de alta resolução e mapeamento ultra-widefield para diagnóstico precoce.",
    "A retinopatia diabética pode ser classificada em não-proliferativa (estágios iniciais) e proliferativa (estágio avançado com neovascularização). O edema macular diabético pode ocorrer em qualquer estágio.",
  ],
  "estrabismo-infantil-quando-procurar-oftalmologista": [
    "O estrabismo é uma condição em que os olhos não estão alinhados na mesma direção. Afeta cerca de 4% da população e é mais comum na infância, embora possa surgir em qualquer idade.",
    "Em crianças, o tratamento precoce é fundamental para prevenir a ambliopia (olho preguiçoso) e garantir o desenvolvimento visual adequado. O ideal é que a primeira avaliação oftalmológica seja feita até os 3 anos.",
    "Os sinais de alerta incluem: olhos que parecem não olhar na mesma direção, inclinação frequente da cabeça, fechar um olho na luz forte e dificuldade de percepção de profundidade.",
    "O tratamento pode incluir uso de óculos, tampão ocular para tratar a ambliopia, exercícios ortópticos e, quando necessário, cirurgia para ajustar os músculos extraoculares.",
    "A cirurgia de estrabismo é segura e pode ser realizada em qualquer idade. Em adultos, além da melhora estética, pode melhorar a percepção de profundidade e reduzir a visão dupla.",
    "Na Drudi e Almeida, a Dra. Maria Amélia Valladares de Melo é especialista em estrabismo pediátrico e adulto, com formação pela UNIFESP e experiência em casos complexos.",
  ],
  "importancia-exame-oftalmologico-regular": [
    "Muitas doenças oculares graves, como glaucoma, retinopatia diabética e degeneração macular, são silenciosas em suas fases iniciais. Quando os sintomas aparecem, a perda de visão pode já ser significativa e irreversível.",
    "O exame oftalmológico completo vai muito além de medir o grau dos óculos. Inclui a medição da pressão intraocular, exame de fundo de olho, avaliação do campo visual e análise da córnea.",
    "A recomendação geral é realizar um exame oftalmológico completo pelo menos uma vez por ano. Pessoas com fatores de risco precisam de acompanhamento mais frequente.",
    "Crianças devem ter sua primeira avaliação oftalmológica até os 3 anos de idade, ou antes se houver qualquer sinal de problema visual.",
    "Na Drudi e Almeida, nossos 5 institutos especializados garantem que cada paciente receba uma avaliação completa e personalizada.",
    "Além dos exames de rotina, é importante procurar um oftalmologista imediatamente em caso de perda súbita de visão, flashes de luz, aumento repentino de moscas volantes, dor ocular intensa ou trauma nos olhos.",
  ],
};

// ─── Dynamic DB Post Component ───────────────────────────────────────────────

function DynamicBlogPost({ slug }: { slug: string }) {
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const { data, isLoading, error } = trpc.blog.getBySlug.useQuery({ slug });
  const submitComment = trpc.blog.submitComment.useMutation();

  // Fetch related posts once we have the current post data
  const { data: relatedPosts } = trpc.blog.getRelated.useQuery(
    { postId: data?.post.id ?? 0, categoryId: data?.post.categoryId ?? null, limit: 3 },
    { enabled: !!data?.post.id }
  );

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentContent.trim()) {
      toast.error("Nome e comentário são obrigatórios.");
      return;
    }
    try {
      await submitComment.mutateAsync({
        postId: data!.post.id,
        authorName: commentName,
        authorEmail: commentEmail || undefined,
        content: commentContent,
      });
      setCommentSubmitted(true);
      setCommentName("");
      setCommentEmail("");
      setCommentContent("");
      toast.success("Comentário enviado! Aguardando moderação.");
    } catch {
      toast.error("Erro ao enviar comentário.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: data?.post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copiado!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container py-20 text-center">
        <h2 className="font-display text-2xl text-navy mb-4">Artigo não encontrado</h2>
        <Link href="/blog">
          <Button className="bg-navy text-cream mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" /> Voltar ao Blog
          </Button>
        </Link>
      </div>
    );
  }

  const { post, media, comments, category } = data;
  const images = media.filter((m) => m.mediaType === "image");
  const videos = media.filter((m) => m.mediaType === "video");
  const audios = media.filter((m) => m.mediaType === "audio");
  const documents = media.filter((m) => m.mediaType === "document");

  return (
    <>
      <SEOHead
        title={post.seoTitle ?? post.title}
        description={post.seoDescription ?? post.excerpt ?? ""}
        keywords={post.seoKeywords ?? ""}
        canonicalPath={`/blog/${post.slug}`}
        ogImage={post.coverImageUrl ?? undefined}
      />

      {/* Breadcrumb */}
      <div className="border-b border-border bg-muted/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 font-ui text-xs text-muted-foreground">
            <Link href="/" className="hover:text-navy transition-colors">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blog" className="hover:text-navy transition-colors">Blog</Link>
            {category && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span style={{ color: category.color ?? undefined }}>{category.name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <article className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <div className="mb-6">
                  {category && (
                    <Badge
                      className="text-[10px] font-ui font-semibold text-white mb-3"
                      style={{ backgroundColor: category.color ?? "#1a2e4a" }}
                    >
                      {category.name}
                    </Badge>
                  )}
                  <h1 className="font-display text-3xl md:text-4xl text-navy leading-tight mb-4">
                    {post.title}
                  </h1>
                  {post.excerpt && (
                    <p className="font-body text-lg text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground font-body flex-wrap">
                    <span className="font-semibold text-navy">{post.authorName ?? "Drudi e Almeida"}</span>
                    {post.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {format(new Date(post.publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readingTimeMin} min de leitura
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {post.viewCount} visualizações
                    </span>
                    <button onClick={handleShare} className="flex items-center gap-1 hover:text-navy transition-colors">
                      <Share2 className="w-3.5 h-3.5" /> Compartilhar
                    </button>
                  </div>
                </div>
              </AnimateOnScroll>

              {post.coverImageUrl && (
                <AnimateOnScroll className="mb-8">
                  <img src={post.coverImageUrl} alt={post.title} className="w-full rounded-xl object-cover max-h-[500px]" />
                </AnimateOnScroll>
              )}

              {videos.length > 0 && (
                <AnimateOnScroll className="mb-8">
                  {videos.map((v) => (
                    <div key={v.id} className="rounded-xl overflow-hidden bg-black mb-4">
                      <video controls className="w-full max-h-[400px]" src={v.url} />
                      {v.caption && <p className="font-body text-xs text-muted-foreground text-center py-2 px-4">{v.caption}</p>}
                    </div>
                  ))}
                </AnimateOnScroll>
              )}

              {audios.length > 0 && (
                <AnimateOnScroll className="mb-8">
                  {audios.map((a) => (
                    <div key={a.id} className="bg-muted/30 rounded-xl p-4 border border-border mb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <Music className="w-5 h-5 text-gold" />
                        <span className="font-ui text-sm font-semibold text-navy">{a.caption ?? a.fileName ?? "Áudio"}</span>
                      </div>
                      <audio controls className="w-full" src={a.url} />
                    </div>
                  ))}
                </AnimateOnScroll>
              )}

              <AnimateOnScroll>
                <div
                  className="prose prose-navy max-w-none font-body [&_h1]:font-display [&_h2]:font-display [&_h3]:font-display [&_h1]:text-navy [&_h2]:text-navy [&_h3]:text-navy [&_a]:text-gold [&_a:hover]:text-gold/80 [&_blockquote]:border-l-gold [&_blockquote]:bg-gold/5 [&_blockquote]:rounded-r-lg [&_blockquote]:py-1"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </AnimateOnScroll>

              {images.length > 0 && (
                <AnimateOnScroll className="mt-8">
                  <h3 className="font-display text-xl text-navy mb-4">Galeria de Imagens</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {images.map((img) => (
                      <a key={img.id} href={img.url} target="_blank" rel="noopener noreferrer">
                        <img src={img.url} alt={img.altText ?? img.fileName ?? ""} className="w-full h-40 object-cover rounded-lg hover:opacity-90 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </AnimateOnScroll>
              )}

              {documents.length > 0 && (
                <AnimateOnScroll className="mt-8">
                  <h3 className="font-display text-xl text-navy mb-4">Documentos</h3>
                  {documents.map((doc) => (
                    <a key={doc.id} href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-muted/30 rounded-lg px-4 py-3 border border-border hover:border-gold/30 hover:bg-gold/5 transition-all mb-2">
                      <FileText className="w-5 h-5 text-gold shrink-0" />
                      <span className="font-ui text-sm text-navy">{doc.caption ?? doc.fileName ?? "Documento"}</span>
                    </a>
                  ))}
                </AnimateOnScroll>
              )}

              {post.tags && (
                <AnimateOnScroll className="mt-8">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-4 h-4 text-muted-foreground" />
                    {post.tags.split(",").map((tag) => (
                      <Link key={tag} href={`/blog?search=${encodeURIComponent(tag.trim())}`}>
                        <span className="font-ui text-xs bg-muted hover:bg-gold/10 hover:text-gold px-3 py-1 rounded-full cursor-pointer transition-colors">
                          {tag.trim()}
                        </span>
                      </Link>
                    ))}
                  </div>
                </AnimateOnScroll>
              )}

              {/* Related Articles */}
              {relatedPosts && relatedPosts.length > 0 && (
                <AnimateOnScroll className="mt-12">
                  <div className="border-t border-border pt-10">
                    <h3 className="font-display text-2xl text-navy mb-6">Artigos Relacionados</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {relatedPosts.map((related) => (
                        <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                          <div className="rounded-xl border border-border/60 overflow-hidden hover:shadow-md hover:border-gold/30 transition-all duration-300 h-full flex flex-col">
                            {related.coverImageUrl ? (
                              <div className="aspect-[16/10] overflow-hidden">
                                <img
                                  src={related.coverImageUrl}
                                  alt={related.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                            ) : (
                              <div className="aspect-[16/10] bg-gradient-to-br from-navy/10 to-gold/10 flex items-center justify-center">
                                <Eye className="w-8 h-8 text-navy/30" />
                              </div>
                            )}
                            <div className="p-4 flex-1 flex flex-col">
                              <h4 className="font-display text-sm text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2 mb-2">
                                {related.title}
                              </h4>
                              {related.excerpt && (
                                <p className="font-body text-xs text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                                  {related.excerpt}
                                </p>
                              )}
                              <div className="flex items-center gap-1 mt-3 font-ui text-xs font-semibold text-gold">
                                Ler artigo
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </AnimateOnScroll>
              )}

              {/* Comments */}
              <AnimateOnScroll className="mt-12">
                <div className="border-t border-border pt-10">
                  <h3 className="font-display text-2xl text-navy mb-6 flex items-center gap-2">
                    <MessageSquare className="w-6 h-6 text-gold" />
                    Comentários ({comments.length})
                  </h3>

                  {comments.length > 0 ? (
                    <div className="space-y-4 mb-8">
                      {comments.map((comment) => (
                        <div key={comment.id} className="bg-white border border-border rounded-xl p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-9 h-9 rounded-full bg-navy/10 flex items-center justify-center shrink-0">
                              <span className="font-display text-sm text-navy font-bold">{comment.authorName.charAt(0).toUpperCase()}</span>
                            </div>
                            <div>
                              <p className="font-ui text-sm font-semibold text-navy">{comment.authorName}</p>
                              <p className="font-body text-[11px] text-muted-foreground">
                                {format(new Date(comment.createdAt), "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
                              </p>
                            </div>
                          </div>
                          <p className="font-body text-sm text-foreground/80 leading-relaxed">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="font-body text-sm text-muted-foreground mb-8">Seja o primeiro a comentar neste artigo.</p>
                  )}

                  {commentSubmitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center">
                      <p className="font-ui text-sm font-semibold text-emerald-700">Comentário enviado com sucesso!</p>
                      <p className="font-body text-xs text-emerald-600 mt-1">Aguardando moderação.</p>
                      <Button variant="outline" size="sm" className="mt-3" onClick={() => setCommentSubmitted(false)}>
                        Escrever outro comentário
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitComment} className="space-y-4">
                      <h4 className="font-display text-lg text-navy">Deixe seu comentário</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome *</label>
                          <Input value={commentName} onChange={(e) => setCommentName(e.target.value)} placeholder="Seu nome" required className="mt-1" />
                        </div>
                        <div>
                          <label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-mail (opcional)</label>
                          <Input type="email" value={commentEmail} onChange={(e) => setCommentEmail(e.target.value)} placeholder="seu@email.com" className="mt-1" />
                        </div>
                      </div>
                      <div>
                        <label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">Comentário *</label>
                        <Textarea value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Escreva seu comentário..." rows={4} required className="mt-1 resize-none" />
                      </div>
                      <p className="font-body text-[11px] text-muted-foreground">Seu comentário será revisado antes de ser publicado.</p>
                      <Button type="submit" disabled={submitComment.isPending} className="bg-navy text-cream hover:bg-navy-light">
                        {submitComment.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                        Enviar Comentário
                      </Button>
                    </form>
                  )}
                </div>
              </AnimateOnScroll>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="bg-navy text-cream rounded-2xl p-6">
                <h3 className="font-display text-xl mb-2">Cuide da sua visão</h3>
                <p className="font-body text-sm text-cream/70 leading-relaxed mb-4">Agende uma consulta com nossos especialistas.</p>
                <a href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta." target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-5 py-3 rounded-lg hover:bg-gold/90 transition-colors w-full">
                  Agendar pelo WhatsApp
                </a>
                <a href="tel:+551150268521" className="flex items-center justify-center gap-2 border border-cream/30 text-cream font-ui text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-cream/10 transition-colors w-full mt-2">
                  Ligar: (11) 5026-8521
                </a>
              </div>
              <Link href="/blog">
                <div className="flex items-center gap-2 text-navy hover:text-gold transition-colors font-ui text-sm font-semibold cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
                </div>
              </Link>
              <div className="bg-muted/30 rounded-xl p-4 border border-border">
                <p className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Compartilhar</p>
                <div className="flex gap-2">
                  <a href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-xs font-semibold py-2 rounded-lg hover:bg-[#20BD5A] transition-colors">
                    WhatsApp
                  </a>
                  <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 bg-muted text-navy font-ui text-xs font-semibold py-2 rounded-lg hover:bg-muted/70 transition-colors">
                    <Share2 className="w-3.5 h-3.5" /> Copiar link
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}

// ─── Legacy Static Post Component ────────────────────────────────────────────

function StaticBlogPost({ slug }: { slug: string }) {
  const article = blogArticles.find((a) => a.slug === slug);
  const content = articleContent[slug];

  if (!article || !content) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-navy mb-4">Artigo não encontrado</h1>
          <Link href="/blog" className="font-ui text-sm text-gold hover:underline">Voltar ao Blog</Link>
        </div>
      </div>
    );
  }

  const related = blogArticles.filter((a) => a.category === article.category && a.slug !== article.slug).slice(0, 3);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Drudi e Almeida Clínicas Oftalmológicas" },
    publisher: { "@type": "Organization", name: "Drudi e Almeida Clínicas Oftalmológicas" },
    image: article.image,
    articleSection: article.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <section className="relative h-[40vh] min-h-[300px] max-h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/40" />
        <div className="relative h-full container flex flex-col justify-end pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-ui text-xs text-cream/60 hover:text-gold transition-colors mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Blog
            </Link>
            <span className="block font-ui text-xs font-semibold tracking-wider uppercase text-gold mb-3">{article.category}</span>
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl text-cream max-w-3xl leading-tight">{article.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-cream/60">
              <span className="flex items-center gap-1.5 font-ui text-xs"><Calendar className="w-3.5 h-3.5" />{new Date(article.date).toLocaleDateString("pt-BR")}</span>
              <span className="flex items-center gap-1.5 font-ui text-xs"><Clock className="w-3.5 h-3.5" />{article.readTime} de leitura</span>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {content.map((paragraph, i) => (
              <motion.p key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }} className="font-body text-base text-foreground/80 leading-[1.8] mb-6">
                {paragraph}
              </motion.p>
            ))}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-10 p-8 rounded-xl bg-navy/5 border border-border/60">
              <h3 className="font-display text-xl text-navy mb-3">Precisa de uma avaliação?</h3>
              <p className="font-body text-sm text-muted-foreground mb-5">Nossos especialistas estão prontos para cuidar da sua visão. Agende sua consulta.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/agendamento" className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3 rounded-md hover:bg-gold-light transition-colors">
                  Agendar Consulta
                </Link>
                <a href={`https://wa.me/5511916544653?text=${encodeURIComponent(`Olá! Li o artigo "${article.title}" e gostaria de agendar uma consulta.`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#20BD5A] transition-colors">
                  Falar pelo WhatsApp
                </a>
              </div>
            </motion.div>
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border/40">
                <h3 className="font-display text-xl text-navy mb-6">Artigos Relacionados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                      <div className="rounded-lg border border-border/60 overflow-hidden hover:shadow-md hover:border-gold/30 transition-all">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-display text-sm text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">{r.title}</h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-ui text-sm text-navy hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" /> Todos os artigos
              </Link>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="inline-flex items-center gap-1.5 font-ui text-sm text-muted-foreground hover:text-gold transition-colors">
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}

// ─── Router: decide which component to render ────────────────────────────────

// Slugs that exist as legacy static articles
const STATIC_SLUGS = new Set(Object.keys(articleContent));

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return null;

  if (STATIC_SLUGS.has(slug)) {
    return <StaticBlogPost slug={slug} />;
  }

  return <DynamicBlogPost slug={slug} />;
}
