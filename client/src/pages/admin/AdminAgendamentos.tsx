/* ============================================================
   Admin — Agendamentos
   Painel para a secretaria visualizar e gerenciar agendamentos
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CheckCircle,
  XCircle,
  Clock3,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { toast } from "sonner";

const UNITS = ["Santana", "Guarulhos", "Tatuapé", "São Miguel", "Lapa"] as const;

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { label: "Confirmado", color: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800 border-red-200" },
};

function formatDateBR(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function formatHour(h: number): string {
  return `${String(h).padStart(2, "0")}h00`;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
function getWeekday(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
}

export default function AdminAgendamentos() {
  const { user, loading } = useAuth();
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterUnit, setFilterUnit] = useState<string>("all");

  const { data: appointments, isLoading, refetch } = trpc.appointment.listAppointments.useQuery(
    { status: filterStatus as "all" | "pending" | "confirmed" | "cancelled", unit: filterUnit },
    { enabled: !!user && user.role === "admin" }
  );

  const updateMutation = trpc.appointment.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Status atualizado com sucesso.");
    },
    onError: (err) => toast.error(err.message),
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-navy" />
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div>
          <XCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-navy mb-2">Acesso Restrito</h1>
          <p className="font-body text-muted-foreground">Esta página é exclusiva para administradores.</p>
        </div>
      </div>
    );
  }

  const pending = appointments?.filter((a) => a.status === "pending").length ?? 0;
  const confirmed = appointments?.filter((a) => a.status === "confirmed").length ?? 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy text-cream px-6 py-6 md:px-10">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-ui text-xs text-gold tracking-widest uppercase mb-1">Drudi e Almeida — Admin</p>
            <h1 className="font-display text-2xl">Agendamentos</h1>
          </div>
          <div className="flex gap-3">
            <div className="bg-amber-500/20 border border-amber-400/30 rounded-lg px-4 py-2 text-center">
              <p className="font-display text-xl text-amber-300">{pending}</p>
              <p className="font-ui text-xs text-cream/70">Pendentes</p>
            </div>
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg px-4 py-2 text-center">
              <p className="font-display text-xl text-green-300">{confirmed}</p>
              <p className="font-ui text-xs text-cream/70">Confirmados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8">
        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6 items-center">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="pending">Pendentes</SelectItem>
              <SelectItem value="confirmed">Confirmados</SelectItem>
              <SelectItem value="cancelled">Cancelados</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterUnit} onValueChange={setFilterUnit}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Unidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as unidades</SelectItem>
              {UNITS.map((u) => (
                <SelectItem key={u} value={u}>Unidade {u}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Atualizar
          </Button>

          <span className="font-ui text-sm text-muted-foreground ml-auto">
            {appointments?.length ?? 0} agendamento(s)
          </span>
        </div>

        {/* Table / Cards */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="font-ui text-sm">Carregando agendamentos...</span>
          </div>
        ) : !appointments || appointments.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
            <p className="font-ui text-sm text-muted-foreground">Nenhum agendamento encontrado com os filtros selecionados.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {appointments.map((appt) => {
              const statusInfo = STATUS_LABELS[appt.status] ?? STATUS_LABELS.pending;
              return (
                <div
                  key={appt.id}
                  className="bg-card border border-border/60 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4 hover:shadow-sm transition-shadow"
                >
                  {/* Date/time block */}
                  <div className="flex-shrink-0 bg-navy/5 rounded-lg px-4 py-3 text-center min-w-[90px]">
                    <p className="font-ui text-xs text-muted-foreground">{getWeekday(appt.appointmentDate)}</p>
                    <p className="font-display text-xl text-navy leading-tight">{appt.appointmentDate.split("-")[2]}/{appt.appointmentDate.split("-")[1]}</p>
                    <p className="font-ui text-sm text-gold font-bold">{formatHour(appt.appointmentHour)}</p>
                  </div>

                  {/* Patient info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="font-ui text-base font-semibold text-navy">{appt.patientName}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-ui font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5 text-gold" /> Unidade {appt.unit}
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Phone className="w-3.5 h-3.5 text-gold" />
                        <a href={`tel:${appt.patientPhone}`} className="hover:text-navy transition-colors">{appt.patientPhone}</a>
                      </span>
                      {appt.patientEmail && (
                        <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Mail className="w-3.5 h-3.5 text-gold" />
                          <a href={`mailto:${appt.patientEmail}`} className="hover:text-navy transition-colors">{appt.patientEmail}</a>
                        </span>
                      )}
                    </div>
                    {appt.notes && (
                      <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-gold/30 pl-2">
                        {appt.notes}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 flex-shrink-0">
                    {appt.status !== "confirmed" && appt.status !== "cancelled" && (
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700 text-white gap-1.5"
                        disabled={updateMutation.isPending}
                        onClick={() => updateMutation.mutate({ id: appt.id, status: "confirmed" })}
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Confirmar
                      </Button>
                    )}
                    {appt.status !== "cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-200 text-red-600 hover:bg-red-50 gap-1.5"
                        disabled={updateMutation.isPending}
                        onClick={() => updateMutation.mutate({ id: appt.id, status: "cancelled" })}
                      >
                        <XCircle className="w-3.5 h-3.5" /> Cancelar
                      </Button>
                    )}
                    {appt.status === "cancelled" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-200 text-amber-700 hover:bg-amber-50 gap-1.5"
                        disabled={updateMutation.isPending}
                        onClick={() => updateMutation.mutate({ id: appt.id, status: "pending" })}
                      >
                        <Clock3 className="w-3.5 h-3.5" /> Reativar
                      </Button>
                    )}
                    <a
                      href={`https://wa.me/55${appt.patientPhone.replace(/\D/g, "")}?text=Olá, ${appt.patientName}! Somos da Drudi e Almeida Oftalmologia. Entramos em contato para confirmar seu agendamento.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-[#25D366] text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-[#1ea855] transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
