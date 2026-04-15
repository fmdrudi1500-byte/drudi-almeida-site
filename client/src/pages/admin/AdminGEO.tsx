/**
 * /admin/geo — Dashboard GEO (Generative Engine Optimization)
 * Monitor de visibilidade da Drudi e Almeida nas IAs
 * ChatGPT · Gemini · Perplexity · Copilot · Claude
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Link } from "wouter";
import {
  Brain,
  TrendingUp,
  Eye,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  Copy,
  ExternalLink,
  BarChart3,
  Target,
  Zap,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts";

// ─── Tipos ─────────────────────────────────────────────────────────────────────
type Engine = "chatgpt" | "gemini" | "perplexity" | "copilot" | "claude";

const ENGINE_CONFIG: Record<Engine, { label: string; color: string; url: string; icon: string }> = {
  chatgpt: { label: "ChatGPT", color: "#10a37f", url: "https://chat.openai.com", icon: "🤖" },
  gemini: { label: "Gemini", color: "#4285f4", url: "https://gemini.google.com", icon: "✨" },
  perplexity: { label: "Perplexity", color: "#20808d", url: "https://www.perplexity.ai", icon: "🔍" },
  copilot: { label: "Copilot", color: "#0078d4", url: "https://copilot.microsoft.com", icon: "🪟" },
  claude: { label: "Claude", color: "#d97757", url: "https://claude.ai", icon: "🧠" },
};

const CATEGORY_LABELS: Record<string, string> = {
  catarata: "Catarata",
  retina: "Retina",
  glaucoma: "Glaucoma",
  ceratocone: "Ceratocone",
  estrabismo: "Estrabismo",
  geral: "Geral / Marca",
};

// ─── Componente de Barra de Progresso ─────────────────────────────────────────
function ProgressBar({ value, color = "#1a3a5c" }: { value: number; color?: string }) {
  return (
    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
      <div
        className="h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

// ─── Componente de Card de Estatística ────────────────────────────────────────
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color = "#1a3a5c",
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-gray-400 mt-1">{sub}</div>}
    </div>
  );
}

// ─── Modal de Registro de Resultado ───────────────────────────────────────────
function RegisterModal({
  prompt,
  category,
  onClose,
  onSaved,
}: {
  prompt: string;
  category: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [engine, setEngine] = useState<Engine>("chatgpt");
  const [mentioned, setMentioned] = useState<boolean | null>(null);
  const [position, setPosition] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [score, setScore] = useState(0);
  const [notes, setNotes] = useState("");

  const saveMutation = trpc.geo.saveResult.useMutation({
    onSuccess: () => {
      toast.success("Resultado registrado com sucesso!");
      onSaved();
      onClose();
    },
    onError: (err) => toast.error(`Erro: ${err.message}`),
  });

  function handleSave() {
    if (mentioned === null) {
      toast.error("Indique se a Drudi e Almeida foi mencionada");
      return;
    }
    saveMutation.mutate({
      engine,
      prompt,
      promptCategory: category,
      mentioned,
      mentionPosition: position ? parseInt(position) : null,
      aiResponse: aiResponse || null,
      score: mentioned ? score : 0,
      notes: notes || null,
    });
  }

  function copyPrompt() {
    navigator.clipboard.writeText(prompt);
    toast.success("Prompt copiado!");
  }

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Registrar Resultado GEO</h3>
          <p className="text-sm text-gray-500 mt-1">Registre o resultado do teste nesta IA</p>
        </div>

        <div className="p-6 space-y-5">
          {/* Prompt */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              Prompt testado
            </label>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm text-gray-700 flex items-start gap-2">
              <span className="flex-1">{prompt}</span>
              <button onClick={copyPrompt} className="text-gray-400 hover:text-navy shrink-0 mt-0.5">
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Engine */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              IA testada
            </label>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(ENGINE_CONFIG) as Engine[]).map((eng) => (
                <button
                  key={eng}
                  onClick={() => setEngine(eng)}
                  className={`p-2 rounded-lg border text-center text-xs font-medium transition-all ${
                    engine === eng
                      ? "border-navy bg-navy text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  <div className="text-lg mb-0.5">{ENGINE_CONFIG[eng].icon}</div>
                  {ENGINE_CONFIG[eng].label}
                </button>
              ))}
            </div>
          </div>

          {/* Mencionada? */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              Drudi e Almeida foi mencionada?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMentioned(true)}
                className={`flex items-center gap-2 p-3 rounded-lg border font-medium text-sm transition-all ${
                  mentioned === true
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                Sim, foi mencionada
              </button>
              <button
                onClick={() => setMentioned(false)}
                className={`flex items-center gap-2 p-3 rounded-lg border font-medium text-sm transition-all ${
                  mentioned === false
                    ? "border-red-400 bg-red-50 text-red-600"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <XCircle className="w-4 h-4" />
                Não foi mencionada
              </button>
            </div>
          </div>

          {/* Se mencionada: posição e score */}
          {mentioned === true && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Posição na resposta
                  </label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="1 = 1ª menção"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
                    Score (0-100)
                  </label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Qualidade da menção"
                    value={score}
                    onChange={(e) => setScore(parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
              <div className="text-xs text-gray-400 -mt-3">
                Score: 0-30 = citação vaga · 31-60 = menção direta · 61-85 = recomendação · 86-100 = 1ª indicação
              </div>
            </>
          )}

          {/* Resposta da IA */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              Trecho da resposta da IA (opcional)
            </label>
            <Textarea
              placeholder="Cole aqui o trecho relevante da resposta..."
              value={aiResponse}
              onChange={(e) => setAiResponse(e.target.value)}
              rows={3}
              maxLength={2000}
            />
          </div>

          {/* Notas */}
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-2">
              Observações (opcional)
            </label>
            <Input
              placeholder="Ex: mencionada junto com Hospital das Clínicas"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="bg-navy hover:bg-navy/90 text-white"
          >
            {saveMutation.isPending ? "Salvando..." : "Salvar Resultado"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Componente Principal ──────────────────────────────────────────────────────
export default function AdminGEO() {
  const { user, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<"prompts" | "resultados" | "analytics">("prompts");
  const [selectedEngine, setSelectedEngine] = useState<Engine | "all">("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [modalData, setModalData] = useState<{ prompt: string; category: string } | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    catarata: true,
    retina: true,
    glaucoma: true,
    ceratocone: true,
    estrabismo: true,
    geral: true,
  });

  const promptsQuery = trpc.geo.listPrompts.useQuery();
  const statsQuery = trpc.geo.getStats.useQuery();
  const resultsQuery = trpc.geo.listResults.useQuery({
    engine: selectedEngine,
    category: selectedCategory === "all" ? undefined : selectedCategory,
    limit: 100,
  });
  const deleteMutation = trpc.geo.deleteResult.useMutation({
    onSuccess: () => {
      toast.success("Resultado removido");
      resultsQuery.refetch();
      statsQuery.refetch();
    },
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-400">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const stats = statsQuery.data;
  const prompts = promptsQuery.data ?? [];
  const results = resultsQuery.data ?? [];

  // Agrupar prompts por categoria
  const promptsByCategory = prompts.reduce(
    (acc, p) => {
      if (!acc[p.category]) acc[p.category] = [];
      acc[p.category].push(p);
      return acc;
    },
    {} as Record<string, typeof prompts>
  );

  // Dados para o gráfico de barras por engine
  const engineChartData = stats?.byEngine.map((e) => ({
    name: ENGINE_CONFIG[e.engine as Engine]?.label ?? e.engine,
    "Taxa de Visibilidade (%)": e.visibilityRate,
    "Score Médio": e.avgScore,
  })) ?? [];

  // Dados para o gráfico de categorias
  const categoryChartData = stats?.byCategory.map((c) => ({
    name: CATEGORY_LABELS[c.category] ?? c.category,
    "Taxa (%)": c.visibilityRate,
    Testes: c.total,
  })) ?? [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ─── Header ─────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-navy/10 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-navy" />
              </div>
              <div>
                <span className="font-bold text-gray-900 text-sm">Dashboard GEO</span>
                <span className="text-gray-400 text-xs ml-2">Generative Engine Optimization</span>
              </div>
            </div>
            <nav className="flex items-center gap-1">
              <Link href="/admin/blog">
                <a className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100">
                  Blog
                </a>
              </Link>
              <Link href="/admin/agendamentos">
                <a className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100">
                  Agendamentos
                </a>
              </Link>
              <Link href="/admin/seo">
                <a className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100">
                  SEO
                </a>
              </Link>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-100 flex items-center gap-1"
              >
                Site <ExternalLink className="w-3 h-3" />
              </a>
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ─── Título ─────────────────────────────────────────────────────────── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Monitor de Visibilidade em IAs</h1>
          <p className="text-gray-500 text-sm mt-1">
            Acompanhe como a Drudi e Almeida é mencionada pelo ChatGPT, Gemini, Perplexity, Copilot e Claude
          </p>
        </div>

        {/* ─── Cards de Estatística ────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            label="Testes Realizados"
            value={stats?.total ?? 0}
            sub="total acumulado"
            icon={Target}
            color="#1a3a5c"
          />
          <StatCard
            label="Taxa de Visibilidade"
            value={`${stats?.visibilityRate ?? 0}%`}
            sub="menções / testes"
            icon={Eye}
            color={stats?.visibilityRate && stats.visibilityRate > 30 ? "#16a34a" : "#dc2626"}
          />
          <StatCard
            label="Score Médio"
            value={stats?.avgScore ?? 0}
            sub="qualidade das menções"
            icon={TrendingUp}
            color="#c9a961"
          />
          <StatCard
            label="Prompts Estratégicos"
            value={prompts.length}
            sub="30 perguntas monitoradas"
            icon={Brain}
            color="#7c3aed"
          />
        </div>

        {/* ─── Alerta de Baseline ──────────────────────────────────────────────── */}
        {(stats?.total ?? 0) === 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">Baseline ainda não estabelecido</p>
              <p className="text-sm text-amber-700 mt-0.5">
                Nenhum teste foi registrado ainda. Use a aba <strong>Prompts</strong> para copiar as perguntas,
                testá-las nas IAs e registrar os resultados. O dashboard mostrará a evolução ao longo do tempo.
              </p>
            </div>
          </div>
        )}

        {/* ─── Tabs ────────────────────────────────────────────────────────────── */}
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 w-fit">
          {(["prompts", "resultados", "analytics"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab === "prompts" && "📋 Prompts Estratégicos"}
              {tab === "resultados" && "📊 Histórico de Testes"}
              {tab === "analytics" && "📈 Analytics"}
            </button>
          ))}
        </div>

        {/* ─── Tab: Prompts ────────────────────────────────────────────────────── */}
        {activeTab === "prompts" && (
          <div className="space-y-4">
            {/* Instruções */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-sm text-blue-800">
                <strong>Como usar:</strong> Copie cada prompt e cole no ChatGPT, Gemini, Perplexity etc. Depois clique em{" "}
                <strong>Registrar Resultado</strong> para anotar se a Drudi e Almeida foi mencionada. Faça isso 1x/semana
                para acompanhar a evolução.
              </p>
            </div>

            {/* Links rápidos para as IAs */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(ENGINE_CONFIG) as Engine[]).map((eng) => (
                <a
                  key={eng}
                  href={ENGINE_CONFIG[eng].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-gray-300 hover:shadow-sm transition-all"
                >
                  <span>{ENGINE_CONFIG[eng].icon}</span>
                  {ENGINE_CONFIG[eng].label}
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              ))}
            </div>

            {/* Prompts por categoria */}
            {Object.entries(promptsByCategory).map(([category, categoryPrompts]) => (
              <div key={category} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }))
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900">
                      {CATEGORY_LABELS[category] ?? category}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {categoryPrompts.length} prompts
                    </Badge>
                  </div>
                  {expandedCategories[category] ? (
                    <ChevronUp className="w-4 h-4 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>

                {expandedCategories[category] && (
                  <div className="border-t border-gray-100 divide-y divide-gray-50">
                    {categoryPrompts.map((p) => (
                      <div key={p.id} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50">
                        <span className="text-xs font-mono text-gray-400 w-6 shrink-0">{p.id}</span>
                        <span className="flex-1 text-sm text-gray-700">{p.prompt}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(p.prompt);
                              toast.success("Prompt copiado!");
                            }}
                            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                            title="Copiar prompt"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-7 px-2.5 border-navy/30 text-navy hover:bg-navy/5"
                            onClick={() => setModalData({ prompt: p.prompt, category: p.category })}
                          >
                            <Plus className="w-3 h-3 mr-1" />
                            Registrar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── Tab: Resultados ─────────────────────────────────────────────────── */}
        {activeTab === "resultados" && (
          <div>
            {/* Filtros */}
            <div className="flex flex-wrap gap-3 mb-6">
              <select
                value={selectedEngine}
                onChange={(e) => setSelectedEngine(e.target.value as Engine | "all")}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-navy"
              >
                <option value="all">Todas as IAs</option>
                {(Object.keys(ENGINE_CONFIG) as Engine[]).map((eng) => (
                  <option key={eng} value={eng}>
                    {ENGINE_CONFIG[eng].icon} {ENGINE_CONFIG[eng].label}
                  </option>
                ))}
              </select>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:border-navy"
              >
                <option value="all">Todas as categorias</option>
                {Object.entries(CATEGORY_LABELS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v}
                  </option>
                ))}
              </select>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resultsQuery.refetch()}
                className="text-xs"
              >
                <RefreshCw className="w-3.5 h-3.5 mr-1" />
                Atualizar
              </Button>
            </div>

            {results.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <Brain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Nenhum resultado registrado ainda</p>
                <p className="text-gray-400 text-sm mt-1">
                  Vá até a aba Prompts e comece a registrar os testes
                </p>
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Data
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        IA
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Categoria
                      </th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Prompt
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Mencionada
                      </th>
                      <th className="text-center px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        Score
                      </th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {results.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                          {new Date(r.createdAt).toLocaleDateString("pt-BR")}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center gap-1 text-xs font-medium">
                            <span>{ENGINE_CONFIG[r.engine as Engine]?.icon}</span>
                            {ENGINE_CONFIG[r.engine as Engine]?.label ?? r.engine}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="text-xs capitalize">
                            {CATEGORY_LABELS[r.promptCategory ?? ""] ?? r.promptCategory ?? "—"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 max-w-xs">
                          <p className="text-xs text-gray-600 truncate" title={r.prompt}>
                            {r.prompt}
                          </p>
                          {r.notes && (
                            <p className="text-xs text-gray-400 mt-0.5 truncate">{r.notes}</p>
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.mentioned ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500 mx-auto" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-400 mx-auto" />
                          )}
                        </td>
                        <td className="px-4 py-3 text-center">
                          {r.mentioned ? (
                            <span
                              className={`text-xs font-bold ${
                                (r.score ?? 0) >= 70
                                  ? "text-green-600"
                                  : (r.score ?? 0) >= 40
                                  ? "text-amber-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {r.score ?? 0}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-300">—</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => {
                              if (confirm("Remover este resultado?")) {
                                deleteMutation.mutate({ id: r.id });
                              }
                            }}
                            className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ─── Tab: Analytics ──────────────────────────────────────────────────── */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            {(stats?.total ?? 0) === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
                <BarChart3 className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">Sem dados para exibir</p>
                <p className="text-gray-400 text-sm mt-1">
                  Registre pelo menos 5 testes para ver os gráficos de evolução
                </p>
              </div>
            ) : (
              <>
                {/* Visibilidade por IA */}
                {engineChartData.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-1">Visibilidade por IA</h3>
                    <p className="text-xs text-gray-400 mb-5">
                      % de prompts em que a Drudi e Almeida foi mencionada em cada IA
                    </p>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={engineChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip
                          formatter={(value) => [`${value}%`, "Visibilidade"]}
                          contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        />
                        <Bar dataKey="Taxa de Visibilidade (%)" fill="#1a3a5c" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Visibilidade por Especialidade */}
                {categoryChartData.length > 0 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-1">Visibilidade por Especialidade</h3>
                    <p className="text-xs text-gray-400 mb-5">
                      Quais especialidades têm maior visibilidade nas IAs
                    </p>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={categoryChartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip
                          formatter={(value, name) => [
                            name === "Taxa (%)" ? `${value}%` : value,
                            name === "Taxa (%)" ? "Visibilidade" : "Testes",
                          ]}
                          contentStyle={{ fontSize: 12, borderRadius: 8 }}
                        />
                        <Bar dataKey="Taxa (%)" fill="#c9a961" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Evolução Mensal */}
                {(stats?.monthlyTrend?.length ?? 0) > 1 && (
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="font-semibold text-gray-900 mb-1">Evolução Mensal</h3>
                    <p className="text-xs text-gray-400 mb-5">
                      Tendência de visibilidade e score médio ao longo dos meses
                    </p>
                    <ResponsiveContainer width="100%" height={240}>
                      <LineChart
                        data={stats!.monthlyTrend}
                        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                        <YAxis tick={{ fontSize: 12 }} domain={[0, 100]} />
                        <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="visibilityRate"
                          name="Visibilidade (%)"
                          stroke="#1a3a5c"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="avgScore"
                          name="Score Médio"
                          stroke="#c9a961"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Tabela de progresso por engine */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Progresso Detalhado por IA</h3>
                  <div className="space-y-4">
                    {stats?.byEngine.map((e) => (
                      <div key={e.engine}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                            <span>{ENGINE_CONFIG[e.engine as Engine]?.icon}</span>
                            {ENGINE_CONFIG[e.engine as Engine]?.label ?? e.engine}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-400">
                              {e.mentioned}/{e.total} testes
                            </span>
                            <span className="text-sm font-bold" style={{ color: ENGINE_CONFIG[e.engine as Engine]?.color ?? "#1a3a5c" }}>
                              {e.visibilityRate}%
                            </span>
                          </div>
                        </div>
                        <ProgressBar
                          value={e.visibilityRate}
                          color={ENGINE_CONFIG[e.engine as Engine]?.color ?? "#1a3a5c"}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* ─── Modal de Registro ───────────────────────────────────────────────── */}
      {modalData && (
        <RegisterModal
          prompt={modalData.prompt}
          category={modalData.category}
          onClose={() => setModalData(null)}
          onSaved={() => {
            statsQuery.refetch();
            resultsQuery.refetch();
          }}
        />
      )}
    </div>
  );
}
