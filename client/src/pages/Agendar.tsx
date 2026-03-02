/* ============================================================
   Agendar Consulta — Drudi e Almeida
   Multi-step form: Unidade → Data/Hora → Dados → Confirmação
   ============================================================ */
import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { MapPin, Calendar, Clock, User, CheckCircle, ChevronRight, ChevronLeft, Phone, Mail, Loader2 } from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const UNITS = ["Santana", "Guarulhos", "Tatuapé", "São Miguel", "Lapa"] as const;
type Unit = (typeof UNITS)[number];

const UNIT_ADDRESSES: Record<Unit, string> = {
  Santana: "Av. Braz Leme, 1000 — Santana, São Paulo",
  Guarulhos: "Av. Salgado Filho, 500 — Centro, Guarulhos",
  Tatuapé: "R. Serra de Juréa, 200 — Tatuapé, São Paulo",
  "São Miguel": "Av. Marechal Tito, 3500 — São Miguel Paulista, São Paulo",
  Lapa: "R. Guaicurus, 1200 — Lapa, São Paulo",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDateBR(dateStr: string): string {
  const [y, m, d] = dateStr.split("-");
  return `${d}/${m}/${y}`;
}

function formatHour(h: number): string {
  return `${String(h).padStart(2, "0")}h00`;
}

function getNext30Days(): { value: string; label: string; disabled: boolean }[] {
  const days = [];
  const today = new Date();
  for (let i = 1; i <= 45; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dow = d.getDay();
    if (dow === 0) continue; // Skip Sunday
    const value = d.toISOString().split("T")[0];
    const weekdays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const label = `${weekdays[dow]}, ${d.getDate()} ${months[d.getMonth()]}`;
    days.push({ value, label, disabled: false });
    if (days.length >= 30) break;
  }
  return days;
}

// ─── Step indicator ───────────────────────────────────────────────────────────

const STEPS = [
  { icon: MapPin, label: "Unidade" },
  { icon: Calendar, label: "Data e Hora" },
  { icon: User, label: "Seus Dados" },
  { icon: CheckCircle, label: "Confirmação" },
];

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const Icon = step.icon;
        const done = i < current;
        const active = i === current;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  done
                    ? "bg-gold text-navy"
                    : active
                    ? "bg-navy text-cream ring-4 ring-navy/20"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Icon className="w-4 h-4" />
                )}
              </div>
              <span
                className={`font-ui text-[10px] mt-1.5 tracking-wide ${
                  active ? "text-navy font-semibold" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`w-12 md:w-20 h-0.5 mb-5 mx-1 transition-all duration-500 ${
                  done ? "bg-gold" : "bg-muted"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Agendar() {
  const [step, setStep] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const days = useMemo(() => getNext30Days(), []);

  // Fetch available slots when unit + date are selected
  const slotsQuery = trpc.appointment.getAvailableSlots.useQuery(
    { unit: selectedUnit!, date: selectedDate },
    { enabled: !!selectedUnit && !!selectedDate }
  );

  const createMutation = trpc.appointment.createAppointment.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      setStep(3);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  function handleSubmit() {
    if (!selectedUnit || !selectedDate || selectedHour === null) return;
    setError(null);
    createMutation.mutate({
      patientName: name,
      patientPhone: phone,
      patientEmail: email || undefined,
      unit: selectedUnit,
      appointmentDate: selectedDate,
      appointmentHour: selectedHour,
      notes: notes || undefined,
      siteOrigin: window.location.origin,
    });
  }

  return (
    <>
      <SEOHead
        title="Agendar Consulta — Drudi e Almeida Oftalmologia"
        description="Agende sua consulta oftalmológica nas unidades Santana, Guarulhos, Tatuapé, São Miguel e Lapa. Rápido, fácil e sem complicação."
        canonicalPath="/agendar"
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy/95 to-navy/80 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, #c9a961 0%, transparent 60%)" }}
        />
        <div className="container relative text-center">
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Drudi e Almeida</span>
          <h1 className="font-display text-3xl md:text-4xl text-cream mt-3 mb-3">
            Agendar Consulta
          </h1>
          <p className="font-body text-cream/70 max-w-lg mx-auto">
            Preencha o formulário abaixo e nossa equipe entrará em contato para confirmar todos os detalhes do seu atendimento.
          </p>
        </div>
      </section>

      {/* Form card */}
      <section className="section-padding bg-background">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-card border border-border/60 rounded-2xl shadow-lg p-6 md:p-10">
            <StepIndicator current={step} />

            {/* ── STEP 0: Unidade ── */}
            {step === 0 && (
              <AnimateOnScroll>
                <h2 className="font-display text-2xl text-navy mb-2">Escolha a unidade</h2>
                <p className="font-body text-sm text-muted-foreground mb-6">Selecione a unidade mais conveniente para você.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {UNITS.map((unit) => (
                    <button
                      key={unit}
                      onClick={() => setSelectedUnit(unit)}
                      className={`text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedUnit === unit
                          ? "border-gold bg-gold/5 shadow-sm"
                          : "border-border hover:border-navy/30 hover:bg-muted/40"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${selectedUnit === unit ? "text-gold" : "text-muted-foreground"}`} />
                        <div>
                          <p className={`font-ui text-sm font-semibold ${selectedUnit === unit ? "text-navy" : "text-foreground"}`}>
                            Unidade {unit}
                          </p>
                          <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                            {UNIT_ADDRESSES[unit]}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <Button
                    disabled={!selectedUnit}
                    onClick={() => setStep(1)}
                    className="bg-navy text-cream hover:bg-navy/90 gap-2"
                  >
                    Próximo <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── STEP 1: Data e Hora ── */}
            {step === 1 && (
              <AnimateOnScroll>
                <h2 className="font-display text-2xl text-navy mb-2">Escolha a data e horário</h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Atendemos de segunda a sexta das 9h às 17h e aos sábados das 9h às 12h.
                </p>

                {/* Date selector */}
                <div className="mb-6">
                  <Label className="font-ui text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-3 block">
                    Data
                  </Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-56 overflow-y-auto pr-1">
                    {days.map((d) => (
                      <button
                        key={d.value}
                        onClick={() => { setSelectedDate(d.value); setSelectedHour(null); }}
                        className={`py-2.5 px-3 rounded-lg border text-sm font-ui transition-all ${
                          selectedDate === d.value
                            ? "border-gold bg-gold/10 text-navy font-semibold"
                            : "border-border hover:border-navy/30 text-foreground"
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Hour selector */}
                {selectedDate && (
                  <div className="mb-6">
                    <Label className="font-ui text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-3 block">
                      Horário disponível
                    </Label>
                    {slotsQuery.isLoading ? (
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Loader2 className="w-4 h-4 animate-spin" /> Verificando disponibilidade...
                      </div>
                    ) : slotsQuery.data?.dayOff ? (
                      <p className="text-sm text-muted-foreground">Não atendemos neste dia.</p>
                    ) : slotsQuery.data?.slots.length === 0 ? (
                      <p className="text-sm text-amber-600 font-medium">Todos os horários estão ocupados nesta data. Escolha outro dia.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {slotsQuery.data?.slots.map((h) => (
                          <button
                            key={h}
                            onClick={() => setSelectedHour(h)}
                            className={`px-4 py-2 rounded-lg border font-ui text-sm transition-all ${
                              selectedHour === h
                                ? "border-gold bg-gold text-navy font-bold"
                                : "border-border hover:border-navy/30 text-foreground"
                            }`}
                          >
                            {formatHour(h)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(0)} className="gap-2">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button
                    disabled={!selectedDate || selectedHour === null}
                    onClick={() => setStep(2)}
                    className="bg-navy text-cream hover:bg-navy/90 gap-2"
                  >
                    Próximo <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── STEP 2: Dados pessoais ── */}
            {step === 2 && (
              <AnimateOnScroll>
                <h2 className="font-display text-2xl text-navy mb-2">Seus dados</h2>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Preencha seus dados para que nossa equipe possa entrar em contato.
                </p>

                {/* Summary card */}
                <div className="bg-muted/40 border border-border/60 rounded-xl p-4 mb-6 flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="font-semibold text-navy">Unidade {selectedUnit}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="text-foreground">{formatDateBR(selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="text-foreground">{formatHour(selectedHour!)}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="font-ui text-sm font-medium mb-1.5 block">
                      Nome completo <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="font-ui text-sm font-medium mb-1.5 block">
                      Telefone / WhatsApp <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        placeholder="(11) 99999-9999"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-9"
                        type="tel"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="font-ui text-sm font-medium mb-1.5 block">
                      E-mail <span className="text-muted-foreground text-xs font-normal">(opcional)</span>
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                        type="email"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Se informado, enviaremos uma confirmação por e-mail.</p>
                  </div>

                  <div>
                    <Label htmlFor="notes" className="font-ui text-sm font-medium mb-1.5 block">
                      Observações <span className="text-muted-foreground text-xs font-normal">(opcional)</span>
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Ex: Tenho dificuldade para enxergar de longe há 3 meses..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <Button variant="outline" onClick={() => setStep(1)} className="gap-2">
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Button>
                  <Button
                    disabled={!name.trim() || !phone.trim() || createMutation.isPending}
                    onClick={handleSubmit}
                    className="bg-gold text-navy hover:bg-gold-light font-bold gap-2"
                  >
                    {createMutation.isPending ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Enviando...</>
                    ) : (
                      <>Solicitar Agendamento <ChevronRight className="w-4 h-4" /></>
                    )}
                  </Button>
                </div>
              </AnimateOnScroll>
            )}

            {/* ── STEP 3: Sucesso ── */}
            {step === 3 && submitted && (
              <AnimateOnScroll className="text-center py-4">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="font-display text-2xl text-navy mb-3">Solicitação Recebida!</h2>
                <p className="font-body text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                  Obrigado, <strong className="text-navy">{name}</strong>! Recebemos sua solicitação com carinho. 
                  Nossa equipe entrará em contato pelo número <strong className="text-navy">{phone}</strong> para confirmar 
                  todos os detalhes e orientá-lo sobre o atendimento.
                </p>

                {/* Summary */}
                <div className="inline-flex flex-col gap-2 bg-muted/40 border border-border/60 rounded-xl p-5 mb-8 text-left">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span><strong>Unidade:</strong> {selectedUnit}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-gold flex-shrink-0" />
                    <span><strong>Data:</strong> {formatDateBR(selectedDate)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-gold flex-shrink-0" />
                    <span><strong>Horário:</strong> {formatHour(selectedHour!)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://wa.me/5511916544653?text=Olá! Acabei de solicitar um agendamento pelo site."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#1ea855] transition-colors"
                  >
                    Falar pelo WhatsApp
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-ui text-sm font-semibold px-6 py-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    Voltar ao início
                  </a>
                </div>
              </AnimateOnScroll>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
