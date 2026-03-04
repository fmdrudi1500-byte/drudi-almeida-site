import { useState, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RichTextEditor from "@/components/RichTextEditor";
import MediaUploader from "@/components/MediaUploader";
import {
  ArrowLeft,
  Save,
  Eye,
  Sparkles,
  Loader2,
  Trash2,
  Image as ImageIcon,
  X,
  Tag,
  Globe,
  FileText,
  Music,
  Video,
  GalleryHorizontal,
} from "lucide-react";
import { toast } from "sonner";

interface BlogPostEditorProps {
  postId?: number;
}

const CONTENT_TYPE_ICONS: Record<string, React.ReactNode> = {
  article: <FileText className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  audio: <Music className="w-4 h-4" />,
  gallery: <GalleryHorizontal className="w-4 h-4" />,
};

export default function BlogPostEditor({ postId: postIdProp }: BlogPostEditorProps) {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const params = useParams<{ id?: string }>();
  const postId = postIdProp ?? (params.id ? parseInt(params.id, 10) : undefined);

  const isEditing = !!postId;

  // Form state
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("<p></p>");
  const [contentType, setContentType] = useState<"article" | "video" | "audio" | "gallery">("article");
  const [status, setStatus] = useState<"draft" | "published">("draft");
  const [categoryId, setCategoryId] = useState<number | undefined>();
  const [tags, setTags] = useState("");
  const [featured, setFeatured] = useState(false);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [autoSeo, setAutoSeo] = useState(true);
  const [currentPostId, setCurrentPostId] = useState<number | undefined>(postId);
  const [mediaList, setMediaList] = useState<{ id: number; url: string; mediaType: string; fileName: string | null }[]>([]);

  // Queries
  const { data: categories } = trpc.blog.listCategories.useQuery();
  const { data: postData, isLoading: loadingPost } = trpc.blog.adminGetPost.useQuery(
    { id: postId! },
    { enabled: isEditing }
  );

  // Mutations
  const createPost = trpc.blog.adminCreatePost.useMutation();
  const updatePost = trpc.blog.adminUpdatePost.useMutation();
  const deletePost = trpc.blog.adminDeletePost.useMutation();
  const regenerateSEO = trpc.blog.adminRegenerateSEO.useMutation();
  const deleteMedia = trpc.blog.adminDeleteMedia.useMutation();

  const utils = trpc.useUtils();

  // Load post data for editing
  useEffect(() => {
    if (postData?.post) {
      const p = postData.post;
      setTitle(p.title);
      setExcerpt(p.excerpt ?? "");
      setContent(p.content);
      setContentType(p.contentType);
      setStatus(p.status);
      setCategoryId(p.categoryId ?? undefined);
      setTags(p.tags ?? "");
      setFeatured(p.featured ?? false);
      setCoverImageUrl(p.coverImageUrl ?? "");
      setSeoTitle(p.seoTitle ?? "");
      setSeoDescription(p.seoDescription ?? "");
      setSeoKeywords(p.seoKeywords ?? "");
      setMediaList(postData.media.map((m) => ({ id: m.id, url: m.url, mediaType: m.mediaType, fileName: m.fileName })));
    }
  }, [postData]);

  const handleSave = async (saveStatus?: "draft" | "published") => {
    if (!title.trim()) {
      toast.error("O título é obrigatório.");
      return;
    }
    if (!content || content === "<p></p>") {
      toast.error("O conteúdo é obrigatório.");
      return;
    }

    const finalStatus = saveStatus ?? status;

    try {
      if (isEditing && currentPostId) {
        await updatePost.mutateAsync({
          id: currentPostId,
          title,
          excerpt,
          content,
          contentType,
          status: finalStatus,
          categoryId: categoryId ?? null,
          tags,
          featured,
          coverImageUrl: coverImageUrl || null,
          seoTitle,
          seoDescription,
          seoKeywords,
          autoSeo: autoSeo && !seoTitle,
        });
        setStatus(finalStatus);
        toast.success(finalStatus === "published" ? "Artigo publicado!" : "Rascunho salvo.");
      } else {
        const result = await createPost.mutateAsync({
          title,
          excerpt,
          content,
          contentType,
          status: finalStatus,
          categoryId,
          tags,
          featured,
          coverImageUrl: coverImageUrl || undefined,
          seoTitle,
          seoDescription,
          seoKeywords,
          autoSeo,
        });
        setCurrentPostId(result.post.id);
        setStatus(finalStatus);
        toast.success(finalStatus === "published" ? "Artigo publicado!" : "Rascunho salvo.");
        navigate(`/admin/blog/editar/${result.post.id}`);
      }
      utils.blog.adminListPosts.invalidate();
    } catch (err) {
      toast.error("Erro ao salvar o artigo.");
    }
  };

  const handleDelete = async () => {
    if (!currentPostId) return;
    if (!confirm("Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.")) return;
    try {
      await deletePost.mutateAsync({ id: currentPostId });
      toast.success("Artigo excluído.");
      navigate("/admin/blog");
    } catch {
      toast.error("Erro ao excluir o artigo.");
    }
  };

  const handleRegenerateSEO = async () => {
    if (!currentPostId) {
      toast.error("Salve o artigo antes de gerar SEO.");
      return;
    }
    try {
      const result = await regenerateSEO.mutateAsync({ id: currentPostId });
      if (result.seo) {
        setSeoTitle(result.seo.seoTitle);
        setSeoDescription(result.seo.seoDescription);
        setSeoKeywords(result.seo.seoKeywords);
        toast.success("SEO gerado automaticamente!");
      }
    } catch {
      toast.error("Erro ao gerar SEO.");
    }
  };

  const handleDeleteMedia = async (id: number) => {
    try {
      await deleteMedia.mutateAsync({ id });
      setMediaList((prev) => prev.filter((m) => m.id !== id));
      toast.success("Mídia removida.");
    } catch {
      toast.error("Erro ao remover mídia.");
    }
  };

  const isSaving = createPost.isPending || updatePost.isPending;

  if (loadingPost) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-gold" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border shadow-sm">
        <div className="container py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => navigate("/admin/blog")}>
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar
            </Button>
            <div>
              <h1 className="font-display text-lg text-navy">
                {isEditing ? "Editar Artigo" : "Novo Artigo"}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                <Badge variant={status === "published" ? "default" : "secondary"} className="text-[10px]">
                  {status === "published" ? "Publicado" : "Rascunho"}
                </Badge>
                {featured && (
                  <Badge variant="outline" className="text-[10px] border-gold text-gold">
                    Destaque
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isEditing && currentPostId && (
              <Button variant="outline" size="sm" asChild>
                <a href={`/blog/${postData?.post.slug}`} target="_blank" rel="noopener noreferrer">
                  <Eye className="w-4 h-4 mr-1" />
                  Visualizar
                </a>
              </Button>
            )}
            {isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSave("draft")}
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Save className="w-4 h-4 mr-1" />}
              Salvar rascunho
            </Button>
            <Button
              size="sm"
              onClick={() => handleSave("published")}
              disabled={isSaving}
              className="bg-navy text-cream hover:bg-navy-light"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : <Globe className="w-4 h-4 mr-1" />}
              Publicar
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Title */}
            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Título do artigo..."
                className="text-2xl font-display border-0 border-b border-border rounded-none px-0 focus-visible:ring-0 focus-visible:border-gold h-auto py-2"
              />
            </div>

            {/* Excerpt */}
            <div>
              <Label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Resumo / Descrição curta
              </Label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Breve descrição do artigo (aparece na listagem)..."
                rows={2}
                className="mt-1 resize-none"
              />
            </div>

            {/* Content Editor */}
            <div>
              <Label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 block">
                Conteúdo
              </Label>
              <RichTextEditor value={content} onChange={setContent} />
            </div>

            {/* Media */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base text-navy">Mídias do Artigo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <MediaUploader
                  postId={currentPostId}
                  onUploaded={(media) => setMediaList((prev) => [...prev, media])}
                />

                {mediaList.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
                    {mediaList.map((media) => (
                      <div key={media.id} className="relative group rounded-lg overflow-hidden border border-border">
                        {media.mediaType === "image" ? (
                          <img
                            src={media.url}
                            alt={media.fileName ?? ""}
                            className="w-full h-24 object-cover"
                          />
                        ) : (
                          <div className="w-full h-24 bg-muted flex flex-col items-center justify-center gap-1">
                            {media.mediaType === "video" && <Video className="w-6 h-6 text-muted-foreground" />}
                            {media.mediaType === "audio" && <Music className="w-6 h-6 text-muted-foreground" />}
                            {media.mediaType === "document" && <FileText className="w-6 h-6 text-muted-foreground" />}
                            <span className="font-ui text-[10px] text-muted-foreground truncate px-2 w-full text-center">
                              {media.fileName}
                            </span>
                          </div>
                        )}
                        <button
                          onClick={() => handleDeleteMedia(media.id)}
                          className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                        {/* Copy URL button */}
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(media.url);
                            toast.success("URL copiada!");
                          }}
                          className="absolute bottom-1 left-1 bg-black/60 text-white rounded text-[9px] px-1.5 py-0.5 opacity-0 group-hover:opacity-100 transition-opacity font-ui"
                        >
                          Copiar URL
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right: Settings */}
          <div className="space-y-4">
            {/* Publish settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base text-navy">Configurações</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Content type */}
                <div>
                  <Label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Tipo de conteúdo
                  </Label>
                  <Select value={contentType} onValueChange={(v) => setContentType(v as typeof contentType)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="article">
                        <span className="flex items-center gap-2">
                          <FileText className="w-4 h-4" /> Artigo
                        </span>
                      </SelectItem>
                      <SelectItem value="video">
                        <span className="flex items-center gap-2">
                          <Video className="w-4 h-4" /> Vídeo
                        </span>
                      </SelectItem>
                      <SelectItem value="audio">
                        <span className="flex items-center gap-2">
                          <Music className="w-4 h-4" /> Áudio / Podcast
                        </span>
                      </SelectItem>
                      <SelectItem value="gallery">
                        <span className="flex items-center gap-2">
                          <GalleryHorizontal className="w-4 h-4" /> Galeria
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <Label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Categoria
                  </Label>
                  <Select
                    value={categoryId?.toString() ?? "none"}
                    onValueChange={(v) => setCategoryId(v === "none" ? undefined : parseInt(v))}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Sem categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Sem categoria</SelectItem>
                      {categories?.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tags */}
                <div>
                  <Label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Tags (separadas por vírgula)
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Tag className="w-4 h-4 text-muted-foreground shrink-0" />
                    <Input
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="catarata, cirurgia, visão..."
                    />
                  </div>
                </div>

                {/* Featured */}
                <div className="flex items-center justify-between">
                  <Label className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Artigo em destaque
                  </Label>
                  <Switch checked={featured} onCheckedChange={setFeatured} />
                </div>
              </CardContent>
            </Card>

            {/* Cover image */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base text-navy flex items-center gap-2">
                  <ImageIcon className="w-4 h-4" /> Imagem de capa
                </CardTitle>
              </CardHeader>
              <CardContent>
                {coverImageUrl && (
                  <div className="relative mb-3 rounded-lg overflow-hidden">
                    <img src={coverImageUrl} alt="Capa" className="w-full h-32 object-cover" />
                    <button
                      onClick={() => setCoverImageUrl("")}
                      className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
                <Input
                  value={coverImageUrl}
                  onChange={(e) => setCoverImageUrl(e.target.value)}
                  placeholder="URL da imagem de capa..."
                  className="text-xs"
                />
                <p className="font-body text-[10px] text-muted-foreground mt-1">
                  Cole a URL de uma imagem ou use o upload de mídias acima.
                </p>
              </CardContent>
            </Card>

            {/* SEO */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-display text-base text-navy flex items-center gap-2">
                    <Globe className="w-4 h-4" /> SEO
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRegenerateSEO}
                    disabled={regenerateSEO.isPending}
                    className="text-xs h-7"
                  >
                    {regenerateSEO.isPending ? (
                      <Loader2 className="w-3 h-3 animate-spin mr-1" />
                    ) : (
                      <Sparkles className="w-3 h-3 mr-1" />
                    )}
                    Gerar com IA
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="font-ui text-xs text-muted-foreground">Auto-SEO ao salvar</Label>
                  <Switch checked={autoSeo} onCheckedChange={setAutoSeo} />
                </div>
                <div>
                  <Label className="font-ui text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Título SEO
                  </Label>
                  <Input
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder="Título para mecanismos de busca..."
                    className="mt-1 text-xs"
                    maxLength={60}
                  />
                  <p className="font-body text-[10px] text-muted-foreground text-right mt-0.5">
                    {seoTitle.length}/60
                  </p>
                </div>
                <div>
                  <Label className="font-ui text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Meta description
                  </Label>
                  <Textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder="Descrição para mecanismos de busca..."
                    rows={3}
                    className="mt-1 text-xs resize-none"
                    maxLength={160}
                  />
                  <p className="font-body text-[10px] text-muted-foreground text-right mt-0.5">
                    {seoDescription.length}/160
                  </p>
                </div>
                <div>
                  <Label className="font-ui text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                    Palavras-chave
                  </Label>
                  <Input
                    value={seoKeywords}
                    onChange={(e) => setSeoKeywords(e.target.value)}
                    placeholder="palavra1, palavra2, palavra3..."
                    className="mt-1 text-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
