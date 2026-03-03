/* ============================================================
   Admin Candidaturas — Drudi e Almeida
   Lists and manages job applications submitted via
   the Trabalhe Conosco page.
   Access: admin role only (enforced server-side via tRPC).
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import {
  Briefcase,
  ChevronLeft,
  FileText,
  ExternalLink,
  Filter,
  RefreshCw,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  new:        { label: "Nova",          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
  reviewing:  { label: "Em Análise",    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300" },
  interview:  { label: "Entrevista",    color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
  rejected:   { label: "Reprovado",     color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300" },
  hired:      { label: "Contratado",    color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" },
};

type AppStatus = "new" | "reviewing" | "interview" | "rejected" | "hired";

function formatDate(d: Date | string) {
  return new Date(d).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
  });
}

export default function AdminCandidaturas() {
  const { user, isAuthenticated } = useAuth();
  const [statusFilter, setStatusFilter] = useState<AppStatus | undefined>(undefined);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [notesInput, setNotesInput] = useState("");

  const utils = trpc.useUtils();

  const { data: applications, isLoading, refetch } = trpc.careers.list.useQuery({
    status: statusFilter,
    limit: 100,
  });

  const { data: selected } = trpc.careers.getById.useQuery(
    { id: selectedId! },
    { enabled: selectedId !== null }
  );

  const updateStatus = trpc.careers.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status atualizado com sucesso.");
      utils.careers.list.invalidate();
      utils.careers.getById.invalidate({ id: selectedId! });
    },
    onError: (err) => toast.error("Erro: " + err.message),
  });

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="font-ui text-lg text-muted-foreground mb-4">
            Acesso restrito a administradores.
          </p>
          <Link href="/" className="font-ui text-sm text-gold hover:underline">
            Voltar ao início
          </Link>
        </div>
      </div>
    );
  }

  const handleUpdateStatus = (status: AppStatus) => {
    if (!selectedId) return;
    updateStatus.mutate({ id: selectedId, status, adminNotes: notesInput || undefined });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/blog" className="text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <Briefcase className="w-5 h-5 text-gold" />
            <h1 className="font-display text-xl font-bold text-foreground">
              Candidaturas
            </h1>
            {applications && (
              <span className="font-ui text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full">
                {applications.length} total
              </span>
            )}
          </div>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-1.5 font-ui text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Atualizar
          </button>
        </div>
      </div>

      <div className="container py-6 flex gap-6">
        {/* Left panel: list */}
        <div className="w-full lg:w-96 shrink-0">
          {/* Filter */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-muted-foreground" />
            {([undefined, "new", "reviewing", "interview", "rejected", "hired"] as (AppStatus | undefined)[]).map((s) => (
              <button
                key={s ?? "all"}
                onClick={() => setStatusFilter(s)}
                className={`font-ui text-xs px-3 py-1 rounded-full border transition-colors ${
                  statusFilter === s
                    ? "bg-gold text-navy border-gold"
                    : "border-border text-muted-foreground hover:border-gold/40"
                }`}
              >
                {s ? STATUS_LABELS[s].label : "Todas"}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : !applications?.length ? (
            <div className="text-center py-12">
              <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <p className="font-body text-sm text-muted-foreground">
                Nenhuma candidatura encontrada.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {applications.map((app) => {
                const s = STATUS_LABELS[app.status];
                return (
                  <button
                    key={app.id}
                    onClick={() => { setSelectedId(app.id); setNotesInput(app.adminNotes ?? ""); }}
                    className={`w-full text-left rounded-lg border p-4 transition-all hover:border-gold/30 hover:shadow-sm ${
                      selectedId === app.id
                        ? "border-gold bg-gold/5"
                        : "border-border bg-card"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-ui text-sm font-semibold text-foreground truncate">
                        {app.name}
                      </p>
                      <span className={`font-ui text-[10px] px-2 py-0.5 rounded-full shrink-0 ${s.color}`}>
                        {s.label}
                      </span>
                    </div>
                    <p className="font-body text-xs text-gold truncate mb-1">{app.position}</p>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <span className="font-body text-xs flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {app.unit}
                      </span>
                      <span className="font-body text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(app.createdAt)}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Right panel: detail */}
        <div className="flex-1 min-w-0">
          {!selectedId ? (
            <div className="flex items-center justify-center h-64 text-center">
              <div>
                <User className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                <p className="font-body text-sm text-muted-foreground">
                  Selecione uma candidatura para ver os detalhes.
                </p>
              </div>
            </div>
          ) : !selected ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-6 h-6 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground mb-1">
                    {selected.name}
                  </h2>
                  <p className="font-ui text-sm text-gold">{selected.position}</p>
                </div>
                <span className={`font-ui text-xs px-3 py-1 rounded-full ${STATUS_LABELS[selected.status].color}`}>
                  {STATUS_LABELS[selected.status].label}
                </span>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-body text-sm truncate">{selected.email}</span>
                </a>
                <a
                  href={`tel:${selected.phone}`}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-body text-sm">{selected.phone}</span>
                </a>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-gold shrink-0" />
                  <span className="font-body text-sm">{selected.unit}</span>
                </div>
              </div>

              {/* Education + Date */}
              <div className="flex flex-wrap gap-4">
                {selected.education && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="w-4 h-4 text-gold" />
                    <span className="font-body text-sm">{selected.education}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span className="font-body text-sm">
                    Candidatura em {formatDate(selected.createdAt)}
                  </span>
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Experiência Profissional
                </h3>
                <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                  {selected.experience}
                </p>
              </div>

              {/* Motivation */}
              {selected.motivation && (
                <div>
                  <h3 className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Motivação
                  </h3>
                  <p className="font-body text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {selected.motivation}
                  </p>
                </div>
              )}

              {/* Resume */}
              {selected.resumeUrl && (
                <div>
                  <h3 className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Currículo
                  </h3>
                  <a
                    href={selected.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/20 rounded-md px-4 py-2 font-ui text-sm hover:bg-gold/20 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    {selected.resumeFileName ?? "Baixar Currículo"}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}

              {/* Admin Notes */}
              <div>
                <h3 className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Notas Internas
                </h3>
                <textarea
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  rows={3}
                  className="w-full font-body text-sm bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors resize-none"
                  placeholder="Adicione notas internas sobre esta candidatura..."
                />
              </div>

              {/* Status Actions */}
              <div>
                <h3 className="font-ui text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                  Atualizar Status
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(["reviewing", "interview", "hired", "rejected"] as AppStatus[]).map((s) => {
                    const icons: Record<string, React.ReactNode> = {
                      reviewing: <Clock className="w-3.5 h-3.5" />,
                      interview: <Star className="w-3.5 h-3.5" />,
                      hired: <CheckCircle className="w-3.5 h-3.5" />,
                      rejected: <XCircle className="w-3.5 h-3.5" />,
                    };
                    const isActive = selected.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => handleUpdateStatus(s)}
                        disabled={isActive || updateStatus.isPending}
                        className={`inline-flex items-center gap-1.5 font-ui text-xs px-3 py-2 rounded-md border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                          isActive
                            ? `${STATUS_LABELS[s].color} border-transparent`
                            : "border-border text-muted-foreground hover:border-gold/40 hover:text-foreground"
                        }`}
                      >
                        {icons[s]}
                        {STATUS_LABELS[s].label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
