import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  FileText,
  Video,
  Music,
  GalleryHorizontal,
  Star,
  MessageSquare,
  CheckCircle,
  XCircle,
  Clock,
  Loader2,
  Tag,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
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

export default function BlogAdmin() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published">("all");
  const [postsOffset, setPostsOffset] = useState(0);
  const [commentsOffset, setCommentsOffset] = useState(0);
  const [commentStatusFilter, setCommentStatusFilter] = useState<"pending" | "approved" | "rejected" | undefined>("pending");
  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");
  const [newCatColor, setNewCatColor] = useState("#1a2e4a");

  const POSTS_PER_PAGE = 10;

  const { data: postsData, isLoading: loadingPosts, refetch: refetchPosts } = trpc.blog.adminListPosts.useQuery({
    limit: POSTS_PER_PAGE,
    offset: postsOffset,
    status: statusFilter === "all" ? undefined : statusFilter,
    search: search || undefined,
  });

  const { data: commentsData, isLoading: loadingComments, refetch: refetchComments } = trpc.blog.adminListComments.useQuery({
    status: commentStatusFilter,
    limit: 20,
    offset: commentsOffset,
  });

  const { data: categories, refetch: refetchCategories } = trpc.blog.listCategories.useQuery();
  const { data: pendingCount } = trpc.blog.adminPendingCount.useQuery();

  const deletePost = trpc.blog.adminDeletePost.useMutation();
  const updateCommentStatus = trpc.blog.adminUpdateCommentStatus.useMutation();
  const deleteComment = trpc.blog.adminDeleteComment.useMutation();
  const createCategory = trpc.blog.adminCreateCategory.useMutation();
  const deleteCategory = trpc.blog.adminDeleteCategory.useMutation();

  const handleDeletePost = async (id: number, title: string) => {
    if (!confirm(`Excluir "${title}"? Esta ação não pode ser desfeita.`)) return;
    try {
      await deletePost.mutateAsync({ id });
      toast.success("Artigo excluído.");
      refetchPosts();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  const handleCommentAction = async (id: number, action: "approved" | "rejected") => {
    try {
      await updateCommentStatus.mutateAsync({ id, status: action });
      toast.success(action === "approved" ? "Comentário aprovado." : "Comentário rejeitado.");
      refetchComments();
    } catch {
      toast.error("Erro ao atualizar comentário.");
    }
  };

  const handleDeleteComment = async (id: number) => {
    if (!confirm("Excluir este comentário?")) return;
    try {
      await deleteComment.mutateAsync({ id });
      toast.success("Comentário excluído.");
      refetchComments();
    } catch {
      toast.error("Erro ao excluir.");
    }
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim() || !newCatSlug.trim()) {
      toast.error("Nome e slug são obrigatórios.");
      return;
    }
    try {
      await createCategory.mutateAsync({ name: newCatName, slug: newCatSlug, color: newCatColor });
      toast.success("Categoria criada.");
      setNewCatName("");
      setNewCatSlug("");
      refetchCategories();
    } catch {
      toast.error("Erro ao criar categoria.");
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!confirm(`Excluir a categoria "${name}"?`)) return;
    try {
      await deleteCategory.mutateAsync({ id });
      toast.success("Categoria excluída.");
      refetchCategories();
    } catch {
      toast.error("Erro ao excluir categoria.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy text-cream">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl">Gerenciador de Blog</h1>
              <p className="font-body text-sm text-cream/70 mt-1">
                Drudi e Almeida Oftalmologia
              </p>
            </div>
            <Button
              onClick={() => navigate("/admin/blog/novo")}
              className="bg-gold text-navy hover:bg-gold/90 font-ui font-semibold"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Artigo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="font-display text-2xl text-cream">{postsData?.total ?? 0}</div>
              <div className="font-ui text-xs text-cream/70">Total de artigos</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="font-display text-2xl text-cream">
                {postsData?.posts.filter((p) => p.status === "published").length ?? 0}
              </div>
              <div className="font-ui text-xs text-cream/70">Publicados</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="font-display text-2xl text-cream">
                {postsData?.posts.filter((p) => p.status === "draft").length ?? 0}
              </div>
              <div className="font-ui text-xs text-cream/70">Rascunhos</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <div className="font-display text-2xl text-cream">{pendingCount ?? 0}</div>
              <div className="font-ui text-xs text-cream/70">Comentários pendentes</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <Tabs defaultValue="posts">
          <TabsList className="mb-6">
            <TabsTrigger value="posts" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Artigos
            </TabsTrigger>
            <TabsTrigger value="comments" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Comentários
              {(pendingCount ?? 0) > 0 && (
                <Badge className="ml-1 bg-gold text-navy text-[10px] h-4 px-1.5">
                  {pendingCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Categorias
            </TabsTrigger>
          </TabsList>

          {/* POSTS TAB */}
          <TabsContent value="posts">
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPostsOffset(0); }}
                  placeholder="Buscar artigos..."
                  className="pl-9"
                />
              </div>
              <div className="flex gap-2">
                {(["all", "published", "draft"] as const).map((s) => (
                  <Button
                    key={s}
                    variant={statusFilter === s ? "default" : "outline"}
                    size="sm"
                    onClick={() => { setStatusFilter(s); setPostsOffset(0); }}
                    className={statusFilter === s ? "bg-navy text-cream" : ""}
                  >
                    {s === "all" ? "Todos" : s === "published" ? "Publicados" : "Rascunhos"}
                  </Button>
                ))}
              </div>
            </div>

            {loadingPosts ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-gold" />
              </div>
            ) : postsData?.posts.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="font-ui text-sm text-muted-foreground">Nenhum artigo encontrado.</p>
                <Button
                  onClick={() => navigate("/admin/blog/novo")}
                  className="mt-4 bg-navy text-cream"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Criar primeiro artigo
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {postsData?.posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white border border-border rounded-xl p-4 flex items-start gap-4 hover:shadow-sm transition-shadow"
                  >
                    {/* Cover thumbnail */}
                    {post.coverImageUrl ? (
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg shrink-0 hidden sm:block"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center shrink-0 hidden sm:block">
                        {CONTENT_TYPE_ICONS[post.contentType]}
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 flex-wrap">
                        <h3 className="font-display text-base text-navy leading-tight">{post.title}</h3>
                        {post.featured && <Star className="w-3.5 h-3.5 text-gold fill-gold shrink-0 mt-0.5" />}
                      </div>
                      <p className="font-body text-xs text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt ?? post.content.replace(/<[^>]+>/g, "").substring(0, 120)}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-[10px]">
                          {post.status === "published" ? "Publicado" : "Rascunho"}
                        </Badge>
                        <Badge variant="outline" className="text-[10px] flex items-center gap-1">
                          {CONTENT_TYPE_ICONS[post.contentType]}
                          {CONTENT_TYPE_LABELS[post.contentType]}
                        </Badge>
                        <span className="font-body text-[10px] text-muted-foreground">
                          {post.updatedAt
                            ? format(new Date(post.updatedAt), "dd MMM yyyy", { locale: ptBR })
                            : ""}
                        </span>
                        <span className="font-body text-[10px] text-muted-foreground flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {post.viewCount ?? 0}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {post.status === "published" && (
                        <Button variant="ghost" size="sm" asChild className="h-8 w-8 p-0">
                          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/blog/editar/${post.id}`)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {(postsData?.total ?? 0) > POSTS_PER_PAGE && (
                  <div className="flex items-center justify-center gap-3 pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={postsOffset === 0}
                      onClick={() => setPostsOffset((o) => Math.max(0, o - POSTS_PER_PAGE))}
                    >
                      Anterior
                    </Button>
                    <span className="font-ui text-xs text-muted-foreground">
                      {postsOffset + 1}–{Math.min(postsOffset + POSTS_PER_PAGE, postsData?.total ?? 0)} de{" "}
                      {postsData?.total}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={postsOffset + POSTS_PER_PAGE >= (postsData?.total ?? 0)}
                      onClick={() => setPostsOffset((o) => o + POSTS_PER_PAGE)}
                    >
                      Próxima
                    </Button>
                  </div>
                )}
              </div>
            )}
          </TabsContent>

          {/* COMMENTS TAB */}
          <TabsContent value="comments">
            <div className="flex gap-2 mb-4">
              {([undefined, "pending", "approved", "rejected"] as const).map((s) => (
                <Button
                  key={s ?? "all"}
                  variant={commentStatusFilter === s ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCommentStatusFilter(s)}
                  className={commentStatusFilter === s ? "bg-navy text-cream" : ""}
                >
                  {s === undefined ? "Todos" : s === "pending" ? "Pendentes" : s === "approved" ? "Aprovados" : "Rejeitados"}
                  {s === "pending" && (pendingCount ?? 0) > 0 && (
                    <Badge className="ml-1.5 bg-gold text-navy text-[10px] h-4 px-1">
                      {pendingCount}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {loadingComments ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-gold" />
              </div>
            ) : commentsData?.comments.length === 0 ? (
              <div className="text-center py-16">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="font-ui text-sm text-muted-foreground">Nenhum comentário encontrado.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {commentsData?.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white border border-border rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-ui text-sm font-semibold text-navy">
                            {comment.authorName}
                          </span>
                          {comment.authorEmail && (
                            <span className="font-body text-xs text-muted-foreground">
                              {comment.authorEmail}
                            </span>
                          )}
                          <Badge
                            variant={
                              comment.status === "approved"
                                ? "default"
                                : comment.status === "rejected"
                                ? "destructive"
                                : "secondary"
                            }
                            className="text-[10px]"
                          >
                            {comment.status === "pending" ? (
                              <span className="flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> Pendente
                              </span>
                            ) : comment.status === "approved" ? (
                              <span className="flex items-center gap-1">
                                <CheckCircle className="w-2.5 h-2.5" /> Aprovado
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <XCircle className="w-2.5 h-2.5" /> Rejeitado
                              </span>
                            )}
                          </Badge>
                          <span className="font-body text-[10px] text-muted-foreground">
                            {format(new Date(comment.createdAt), "dd MMM yyyy HH:mm", { locale: ptBR })}
                          </span>
                        </div>
                        <p className="font-body text-sm text-foreground/80 mt-2 leading-relaxed">
                          {comment.content}
                        </p>
                        <p className="font-body text-[10px] text-muted-foreground mt-1">
                          Artigo ID: {comment.postId}
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        {comment.status !== "approved" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCommentAction(comment.id, "approved")}
                            className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700"
                            title="Aprovar"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        {comment.status !== "rejected" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCommentAction(comment.id, "rejected")}
                            className="h-8 w-8 p-0 text-amber-600 hover:text-amber-700"
                            title="Rejeitar"
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteComment(comment.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* CATEGORIES TAB */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Create category */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base text-navy">Nova Categoria</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Nome
                    </label>
                    <Input
                      value={newCatName}
                      onChange={(e) => {
                        setNewCatName(e.target.value);
                        setNewCatSlug(
                          e.target.value
                            .toLowerCase()
                            .normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .replace(/[^a-z0-9\s-]/g, "")
                            .trim()
                            .replace(/\s+/g, "-")
                        );
                      }}
                      placeholder="Ex: Catarata"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Slug (URL)
                    </label>
                    <Input
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      placeholder="ex: catarata"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Cor
                    </label>
                    <div className="flex items-center gap-2 mt-1">
                      <input
                        type="color"
                        value={newCatColor}
                        onChange={(e) => setNewCatColor(e.target.value)}
                        className="w-10 h-10 rounded cursor-pointer border border-border"
                      />
                      <Input
                        value={newCatColor}
                        onChange={(e) => setNewCatColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={handleCreateCategory}
                    disabled={createCategory.isPending}
                    className="w-full bg-navy text-cream"
                  >
                    {createCategory.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    ) : (
                      <Plus className="w-4 h-4 mr-2" />
                    )}
                    Criar Categoria
                  </Button>
                </CardContent>
              </Card>

              {/* List categories */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base text-navy">
                    Categorias ({categories?.length ?? 0})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!categories || categories.length === 0 ? (
                    <p className="font-body text-sm text-muted-foreground text-center py-4">
                      Nenhuma categoria criada.
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <div
                          key={cat.id}
                          className="flex items-center justify-between bg-muted/30 rounded-lg px-3 py-2"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full shrink-0"
                              style={{ backgroundColor: cat.color ?? "#1a2e4a" }}
                            />
                            <div>
                              <p className="font-ui text-sm font-semibold text-navy">{cat.name}</p>
                              <p className="font-body text-[10px] text-muted-foreground">/{cat.slug}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteCategory(cat.id, cat.name)}
                            className="h-7 w-7 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
