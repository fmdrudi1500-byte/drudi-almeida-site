/* ============================================================
   Admin — Agendamentos
   Painel para a secretaria visualizar, gerenciar agendamentos
   e bloquear datas por unidade.
   ============================================================ */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Clock3,
  Loader2,
  RefreshCw,
  Ban,
  PlusCircle,
  Trash2,
  AlertTriangle,
  Stethoscope,
  CreditCard,
  MessageSquare,
} from "lucide-react";
import { toast } from "sonner";

const UNITS = ["Santana", "Guarulhos", "Tatuapé", "São Miguel", "Lapa"] as const;
type Unit = (typeof UNITS)[number];

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending: { label: "Pendente", color: "bg-amber-100 text-amber-800 border-amber-200" },
  confirmed: { label: "Confirmado", color: "bg-green-100 text-green-800 border-green-200" },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800 border-red-200" },
};

function formatDateBR(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function formatSlot(h: number, m?: number | null): string {
  return `${String(h).padStart(2, "0")}h${String(m ?? 0).padStart(2, "0")}`;
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
function getWeekday(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return WEEKDAYS[new Date(y, m - 1, d).getDay()];
}

// ─── Block Day Dialog ─────────────────────────────────────────────────────────

function BlockDayDialog({ onBlocked }: { onBlocked: () => void }) {
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState<Unit>("Santana");
  const [date, setDate] = useState("");
  const [reason, setReason] = useState("");

  const blockMutation = trpc.appointment.blockDay.useMutation({
    onSuccess: (data) => {
      if (data.alreadyBlocked) {
        toast.info("Este dia já estava bloqueado para esta unidade.");
      } else {
        toast.success("Dia bloqueado com sucesso.");
      }
      setOpen(false);
      setDate("");
      setReason("");
      onBlocked();
    },
    onError: (err) => toast.error(err.message),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2 border-red-200 text-red-600 hover:bg-red-50">
          <Ban className="w-3.5 h-3.5" /> Bloquear dia
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display text-navy">Bloquear dia para agendamentos</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div>
            <Label className="font-ui text-sm font-medium mb-1.5 block">Unidade</Label>
            <Select value={unit} onValueChange={(v) => setUnit(v as Unit)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNITS.map((u) => (
                  <SelectItem key={u} value={u}>Unidade {u}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="font-ui text-sm font-medium mb-1.5 block">Data</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div>
            <Label className="font-ui text-sm font-medium mb-1.5 block">
              Motivo <span className="text-muted-foreground text-xs font-normal">(opcional)</span>
            </Label>
            <Textarea
              placeholder="Ex: Feriado, manutenção, evento interno..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={2}
              className="resize-none"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
            <Button
              disabled={!date || blockMutation.isPending}
              onClick={() => blockMutation.mutate({ unit, date, reason: reason || undefined })}
              className="bg-red-600 text-white hover:bg-red-700 gap-2"
            >
              {blockMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Ban className="w-4 h-4" />}
              Confirmar bloqueio
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Blocked Days Tab ─────────────────────────────────────────────────────────

function BlockedDaysTab() {
  const [filterUnit, setFilterUnit] = useState<string>("all");

  const { data: blocks, isLoading, refetch } = trpc.appointment.listDayBlocks.useQuery(
    { unit: filterUnit },
    { refetchInterval: 30000 }
  );

  const unblockMutation = trpc.appointment.unblockDay.useMutation({
    onSuccess: () => {
      toast.success("Bloqueio removido.");
      refetch();
    },
    onError: (err) => toast.error(err.message),
  });

  const today = new Date().toISOString().split("T")[0];
  const upcoming = blocks?.filter((b) => b.blockedDate >= today) ?? [];
  const past = blocks?.filter((b) => b.blockedDate < today) ?? [];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 items-center">
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

        <Button variant="outline" size="sm" onClick={() => refetch()} className="gap-2">
          <RefreshCw className="w-3.5 h-3.5" /> Atualizar
        </Button>

        <BlockDayDialog onBlocked={refetch} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-ui text-sm">Carregando bloqueios...</span>
        </div>
      ) : upcoming.length === 0 && past.length === 0 ? (
        <div className="text-center py-20">
          <Calendar className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
          <p className="font-ui text-sm text-muted-foreground">Nenhum dia bloqueado.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {upcoming.length > 0 && (
            <div>
              <h3 className="font-ui text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Próximos bloqueios ({upcoming.length})
              </h3>
              <div className="space-y-2">
                {upcoming.map((block) => (
                  <div
                    key={block.id}
                    className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-red-100 rounded-lg px-3 py-2 text-center min-w-[80px]">
                        <p className="font-ui text-xs text-red-500">{getWeekday(block.blockedDate)}</p>
                        <p className="font-display text-lg text-red-700 leading-tight">
                          {block.blockedDate.split("-")[2]}/{block.blockedDate.split("-")[1]}
                        </p>
                      </div>
                      <div>
                        <p className="font-ui text-sm font-semibold text-red-800">
                          <MapPin className="w-3.5 h-3.5 inline mr-1" />
                          Unidade {block.unit}
                        </p>
                        {block.reason && (
                          <p className="font-body text-xs text-red-600 mt-0.5 italic">{block.reason}</p>
                        )}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-300 text-red-600 hover:bg-red-100 gap-1.5 flex-shrink-0"
                      disabled={unblockMutation.isPending}
                      onClick={() => unblockMutation.mutate({ unit: block.unit as Unit, date: block.blockedDate })}
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remover
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div>
              <h3 className="font-ui text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Bloqueios passados ({past.length})
              </h3>
              <div className="space-y-2 opacity-60">
                {past.slice(0, 10).map((block) => (
                  <div
                    key={block.id}
                    className="bg-muted border border-border rounded-xl p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="bg-muted-foreground/10 rounded-lg px-3 py-2 text-center min-w-[80px]">
                        <p className="font-ui text-xs text-muted-foreground">{getWeekday(block.blockedDate)}</p>
                        <p className="font-display text-lg text-foreground leading-tight">
                          {block.blockedDate.split("-")[2]}/{block.blockedDate.split("-")[1]}
                        </p>
                      </div>
                      <div>
                        <p className="font-ui text-sm font-semibold text-foreground">
                          <MapPin className="w-3.5 h-3.5 inline mr-1" />
                          Unidade {block.unit}
                        </p>
                        {block.reason && (
                          <p className="font-body text-xs text-muted-foreground mt-0.5 italic">{block.reason}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Appointments Tab ─────────────────────────────────────────────────────────

function AppointmentsTab() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterUnit, setFilterUnit] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");

  const { data: appointments, isLoading, refetch } = trpc.appointment.listAppointments.useQuery(
    {
      status: filterStatus as "all" | "pending" | "confirmed" | "cancelled",
      unit: filterUnit,
      date: filterDate || undefined,
    },
    { refetchInterval: 30000 }
  );

  const updateMutation = trpc.appointment.updateStatus.useMutation({
    onSuccess: () => {
      refetch();
      toast.success("Status atualizado com sucesso.");
    },
    onError: (err) => toast.error(err.message),
  });

  const pending = appointments?.filter((a) => a.status === "pending").length ?? 0;
  const confirmed = appointments?.filter((a) => a.status === "confirmed").length ?? 0;

  return (
    <div>
      {/* Stats */}
      {(pending > 0 || confirmed > 0) && (
        <div className="flex gap-3 mb-6">
          {pending > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span className="font-ui text-sm font-semibold text-amber-800">{pending} pendente{pending > 1 ? "s" : ""}</span>
            </div>
          )}
          {confirmed > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="font-ui text-sm font-semibold text-green-800">{confirmed} confirmado{confirmed > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      )}

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

        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-44 font-ui text-sm"
          />
          {filterDate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterDate("")}
              className="text-muted-foreground hover:text-foreground"
            >
              ×
            </Button>
          )}
        </div>

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

      {/* List */}
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
                className="bg-card border border-border/60 rounded-xl p-5 flex flex-col md:flex-row md:items-start gap-4 hover:shadow-sm transition-shadow"
              >
                {/* Date/time block */}
                <div className="flex-shrink-0 bg-navy/5 rounded-lg px-4 py-3 text-center min-w-[90px]">
                  <p className="font-ui text-xs text-muted-foreground">{getWeekday(appt.appointmentDate)}</p>
                  <p className="font-display text-xl text-navy leading-tight">
                    {appt.appointmentDate.split("-")[2]}/{appt.appointmentDate.split("-")[1]}
                  </p>
                  <p className="font-ui text-sm text-gold font-bold">
                    {formatSlot(appt.appointmentHour, appt.appointmentMinute)}
                  </p>
                </div>

                {/* Patient info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-ui text-base font-semibold text-navy">{appt.patientName}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-ui font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
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
                  <div className="flex flex-wrap gap-x-4 gap-y-1">
                    {appt.specialty && (
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Stethoscope className="w-3 h-3 text-navy/50" /> {appt.specialty}
                      </span>
                    )}
                    {appt.healthPlan && (
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CreditCard className="w-3 h-3 text-navy/50" /> {appt.healthPlan}
                      </span>
                    )}
                  </div>
                  {appt.notes && (
                    <p className="mt-2 text-xs text-muted-foreground italic border-l-2 border-gold/30 pl-2 flex items-start gap-1">
                      <MessageSquare className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      {appt.notes}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 flex-shrink-0">
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
                    href={`https://wa.me/55${appt.patientPhone.replace(/\D/g, "")}?text=Olá, ${encodeURIComponent(appt.patientName)}! Somos da Drudi e Almeida Oftalmologia. Entramos em contato para confirmar seu agendamento para ${formatDateBR(appt.appointmentDate)} às ${formatSlot(appt.appointmentHour, appt.appointmentMinute)} na unidade ${appt.unit}.`}
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
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function AdminAgendamentos() {
  const { user, loading } = useAuth();

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
          <p className="font-body text-sm text-muted-foreground mt-2">
            Faça login com uma conta de administrador para continuar.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-navy text-cream px-6 py-6 md:px-10 border-b border-navy/20">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-ui text-xs text-gold tracking-widest uppercase mb-1">Drudi e Almeida — Admin</p>
            <h1 className="font-display text-2xl">Central de Agendamentos</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-ui text-xs text-cream/60">
              Logado como <strong className="text-cream">{user.name}</strong>
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-10 py-8">
        <Tabs defaultValue="appointments">
          <TabsList className="mb-6">
            <TabsTrigger value="appointments" className="gap-2">
              <Calendar className="w-4 h-4" /> Agendamentos
            </TabsTrigger>
            <TabsTrigger value="blocks" className="gap-2">
              <Ban className="w-4 h-4" /> Dias Bloqueados
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsTab />
          </TabsContent>

          <TabsContent value="blocks">
            <BlockedDaysTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
