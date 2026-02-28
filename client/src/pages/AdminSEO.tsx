/* ============================================================
   /admin/seo — Painel de SEO por Página
   Permite editar título, descrição e palavras-chave de cada
   página do site diretamente pela interface administrativa.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Search, Globe, Tag, FileText, CheckCircle2, AlertCircle, Pencil, X, ExternalLink } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { Link } from "wouter";

type PageSeo = {
  pagePath: string;
  pageLabel: string;
  title: string | null;
  description: string | null;
  keywords: string | null;
  updatedAt: Date | null;
};

function charCount(val: string | null, max: number) {
  const len = (val ?? "").length;
  const ok = len >= 1 && len <= max;
  return { len, ok };
}

function KeywordTag({ kw, onRemove }: { kw: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 bg-navy/8 text-navy text-xs font-ui font-medium px-2.5 py-1 rounded-full border border-navy/15">
      {kw}
      <button onClick={onRemove} className="hover:text-red-500 transition-colors ml-0.5">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function SEOPageCard({ page, onSaved }: { page: PageSeo; onSaved: () => void }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(page.title ?? "");
  const [description, setDescription] = useState(page.description ?? "");
  const [keywordsRaw, setKeywordsRaw] = useState(page.keywords ?? "");
  const [kwInput, setKwInput] = useState("");

  const keywords = keywordsRaw
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const saveMutation = trpc.seo.save.useMutation({
    onSuccess: () => {
      toast.success(`Configurações de "${page.pageLabel}" atualizadas.`);
      setEditing(false);
      onSaved();
    },
    onError: (err) => {
      toast.error(`Erro ao salvar: ${err.message}`);
    },
  });

  const titleInfo = charCount(title, 60);
  const descInfo = charCount(description, 160);
  const kwCount = keywords.length;

  function addKeyword() {
    const kw = kwInput.trim();
    if (!kw || keywords.includes(kw) || keywords.length >= 8) return;
    const updated = [...keywords, kw].join(", ");
    setKeywordsRaw(updated);
    setKwInput("");
  }

  function removeKeyword(idx: number) {
    const updated = keywords.filter((_, i) => i !== idx).join(", ");
    setKeywordsRaw(updated);
  }

  function handleSave() {
    saveMutation.mutate({
      pagePath: page.pagePath,
      pageLabel: page.pageLabel,
      title: title || null,
      description: description || null,
      keywords: keywordsRaw || null,
    });
  }

  function handleCancel() {
    setTitle(page.title ?? "");
    setDescription(page.description ?? "");
    setKeywordsRaw(page.keywords ?? "");
    setKwInput("");
    setEditing(false);
  }

  const hasData = page.title || page.description || page.keywords;

  return (
    <div className={`bg-white rounded-xl border transition-all duration-200 ${editing ? "border-gold/40 shadow-md" : "border-border/60 hover:border-gold/20 hover:shadow-sm"}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-navy/8 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 text-navy" />
          </div>
          <div className="min-w-0">
            <p className="font-ui text-sm font-semibold text-navy truncate">{page.pageLabel}</p>
            <a
              href={page.pagePath}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
            >
              {page.pagePath}
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {hasData ? (
            <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50 text-[10px] font-ui">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Configurado
            </Badge>
          ) : (
            <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 text-[10px] font-ui">
              <AlertCircle className="w-3 h-3 mr-1" /> Padrão
            </Badge>
          )}
          {!editing && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditing(true)}
              className="h-7 px-3 text-xs font-ui gap-1.5"
            >
              <Pencil className="w-3 h-3" /> Editar
            </Button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4 space-y-4">
        {/* Title */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-ui text-xs font-semibold text-navy flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" /> Título da Página
            </label>
            {editing && (
              <span className={`font-ui text-[10px] font-medium ${titleInfo.len > 60 ? "text-red-500" : titleInfo.len >= 30 ? "text-emerald-600" : "text-amber-500"}`}>
                {titleInfo.len}/60 chars
              </span>
            )}
          </div>
          {editing ? (
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Oftalmologista em São Paulo (30–60 caracteres)"
              className="font-body text-sm h-9"
              maxLength={70}
            />
          ) : (
            <p className="font-body text-sm text-foreground/80 bg-cream/40 rounded-lg px-3 py-2 border border-border/30 min-h-[36px]">
              {page.title || <span className="text-muted-foreground italic">Não definido — usando padrão do código</span>}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-ui text-xs font-semibold text-navy flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> Meta Descrição
            </label>
            {editing && (
              <span className={`font-ui text-[10px] font-medium ${descInfo.len > 160 ? "text-red-500" : descInfo.len >= 50 ? "text-emerald-600" : "text-amber-500"}`}>
                {descInfo.len}/160 chars
              </span>
            )}
          </div>
          {editing ? (
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Clínica oftalmológica especializada em catarata, glaucoma e retina. Agende sua consulta. (50–160 caracteres)"
              className="font-body text-sm resize-none"
              rows={3}
              maxLength={180}
            />
          ) : (
            <p className="font-body text-sm text-foreground/80 bg-cream/40 rounded-lg px-3 py-2 border border-border/30 min-h-[36px]">
              {page.description || <span className="text-muted-foreground italic">Não definido — usando padrão do código</span>}
            </p>
          )}
        </div>

        {/* Keywords */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="font-ui text-xs font-semibold text-navy flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Palavras-chave
            </label>
            <span className={`font-ui text-[10px] font-medium ${kwCount > 8 ? "text-red-500" : kwCount >= 3 ? "text-emerald-600" : "text-amber-500"}`}>
              {kwCount}/8 palavras-chave
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
            {keywords.length > 0 ? (
              keywords.map((kw, i) => (
                <KeywordTag
                  key={i}
                  kw={kw}
                  onRemove={editing ? () => removeKeyword(i) : () => {}}
                />
              ))
            ) : (
              <span className="font-body text-xs text-muted-foreground italic">Nenhuma palavra-chave definida</span>
            )}
          </div>

          {editing && (
            <div className="flex gap-2">
              <Input
                value={kwInput}
                onChange={(e) => setKwInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") { e.preventDefault(); addKeyword(); }
                }}
                placeholder="Digite e pressione Enter para adicionar..."
                className="font-body text-sm h-8 text-xs"
                disabled={keywords.length >= 8}
              />
              <Button
                size="sm"
                variant="outline"
                onClick={addKeyword}
                disabled={keywords.length >= 8 || !kwInput.trim()}
                className="h-8 px-3 text-xs font-ui shrink-0"
              >
                Adicionar
              </Button>
            </div>
          )}
        </div>

        {/* Actions */}
        {editing && (
          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="bg-navy text-cream hover:bg-navy/90 font-ui text-xs h-8 px-4"
            >
              {saveMutation.isPending ? "Salvando..." : "Salvar"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              className="font-ui text-xs h-8 px-4"
            >
              Cancelar
            </Button>
            {page.updatedAt && (
              <span className="font-body text-[10px] text-muted-foreground ml-auto">
                Última edição: {new Date(page.updatedAt).toLocaleDateString("pt-BR")}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminSEO() {
  const { user, loading } = useAuth();
  const { data: pages, refetch, isLoading } = trpc.seo.listAll.useQuery();

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream/30">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-navy border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="font-ui text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream/30">
        <div className="text-center max-w-sm">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h2 className="font-display text-xl text-navy mb-2">Acesso Restrito</h2>
          <p className="font-body text-sm text-muted-foreground mb-4">
            Você precisa estar autenticado para acessar o painel de SEO.
          </p>
          <Link href="/admin/blog">
            <Button className="bg-navy text-cream font-ui text-sm">Ir para Admin</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream/30">
      {/* Header */}
      <div className="bg-white border-b border-border/60 sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-navy flex items-center justify-center">
                <Search className="w-4.5 h-4.5 text-cream" />
              </div>
              <div>
                <h1 className="font-display text-lg text-navy">Painel de SEO</h1>
                <p className="font-body text-xs text-muted-foreground">
                  Edite título, descrição e palavras-chave de cada página
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/admin/blog">
                <Button variant="outline" size="sm" className="font-ui text-xs h-8">
                  Blog CMS
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="sm" className="font-ui text-xs h-8">
                  Ver Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        {/* Info banner */}
        <div className="bg-navy/5 border border-navy/15 rounded-xl px-5 py-4 mb-8 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-navy mt-0.5 shrink-0" />
          <div>
            <p className="font-ui text-sm font-semibold text-navy mb-1">Como funciona</p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              Os valores aqui salvos <strong>sobrescrevem</strong> os padrões do código em cada página.
              Título: 30–60 caracteres · Descrição: 50–160 caracteres · Palavras-chave: 3–8 termos.
              Clique em <strong>Editar</strong> na página desejada, ajuste os campos e salve.
            </p>
          </div>
        </div>

        {/* Pages grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {(pages ?? []).map((page) => (
            <SEOPageCard
              key={page.pagePath}
              page={page as PageSeo}
              onSaved={() => refetch()}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
