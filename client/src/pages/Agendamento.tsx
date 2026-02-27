/* ============================================================
   Agendamento Online — Drudi e Almeida
   Full scheduling form that sends data to WhatsApp
   Design: Neoclassical Medical Luminance
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Calendar, Clock, MapPin, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

const institutos = [
  { value: "consulta-geral", label: "Consulta Geral" },
  { value: "catarata", label: "Instituto da Catarata" },
  { value: "ceratocone", label: "Instituto do Ceratocone" },
  { value: "glaucoma", label: "Instituto do Glaucoma" },
  { value: "retina", label: "Instituto da Retina" },
  { value: "estrabismo", label: "Instituto de Estrabismo" },
];

const unidades = [
  { value: "santana", label: "Santana — Rua Dr. César, 130" },
  { value: "tatuape", label: "Tatuapé — Rua Tuiuti, 2429" },
  { value: "lapa", label: "Lapa — Rua Barão de Jundiaí, 221" },
  { value: "sao-miguel", label: "São Miguel — Rua Bernardo Marcondes, 108" },
  { value: "guarulhos", label: "Guarulhos — Rua Sete de Setembro, 375" },
];

const convenios = [
  { value: "particular", label: "Particular" },
  { value: "prevent-senior", label: "Prevent Senior" },
  { value: "bradesco-saude", label: "Bradesco Saúde" },
  { value: "mediservice", label: "Mediservice" },
  { value: "propm", label: "PROPM" },
  { value: "amil", label: "Amil" },
  { value: "unimed-seguros", label: "Unimed Seguros" },
  { value: "ameplam", label: "Ameplam" },
  { value: "outro", label: "Outro Convênio" },
];

const periodos = [
  { value: "manha", label: "Manhã (8h - 12h)" },
  { value: "tarde", label: "Tarde (13h - 18h)" },
  { value: "qualquer", label: "Qualquer horário" },
];

interface FormData {
  nome: string;
  telefone: string;
  email: string;
  dataNascimento: string;
  instituto: string;
  unidade: string;
  convenio: string;
  periodo: string;
  urgencia: string;
  observacoes: string;
}

const initialForm: FormData = {
  nome: "",
  telefone: "",
  email: "",
  dataNascimento: "",
  instituto: "consulta-geral",
  unidade: "",
  convenio: "",
  periodo: "qualquer",
  urgencia: "normal",
  observacoes: "",
};

export default function Agendamento() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const updateField = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const canAdvance1 = form.nome.trim() && form.telefone.trim();
  const canAdvance2 = form.instituto && form.unidade;

  const handleSubmit = () => {
    const institutoLabel = institutos.find((i) => i.value === form.instituto)?.label || form.instituto;
    const unidadeLabel = unidades.find((u) => u.value === form.unidade)?.label || form.unidade;
    const convenioLabel = convenios.find((c) => c.value === form.convenio)?.label || form.convenio || "Não informado";
    const periodoLabel = periodos.find((p) => p.value === form.periodo)?.label || form.periodo;

    const msg = [
      `Olá! Gostaria de agendar uma consulta.`,
      ``,
      `*Dados do Paciente:*`,
      `Nome: ${form.nome}`,
      `Telefone: ${form.telefone}`,
      form.email ? `E-mail: ${form.email}` : "",
      form.dataNascimento ? `Data de Nascimento: ${form.dataNascimento}` : "",
      ``,
      `*Agendamento:*`,
      `Especialidade: ${institutoLabel}`,
      `Unidade: ${unidadeLabel}`,
      `Convênio: ${convenioLabel}`,
      `Período preferido: ${periodoLabel}`,
      form.urgencia === "urgente" ? `⚠️ Urgência: Sim` : "",
      form.observacoes ? `\nObservações: ${form.observacoes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/5511916544653?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    toast.success("Redirecionando para o WhatsApp...");
  };

  if (submitted) {
    return (
      <>
      <SEOHead
        title="Agendar Consulta — Marque sua Avaliação"
        description="Agende sua consulta oftalmológica na Drudi e Almeida. Escolha a unidade mais próxima e o instituto especializado. Atendimento rápido e humanizado."
        keywords="agendar consulta oftalmologista SP, marcar consulta olhos, agendamento oftalmologia São Paulo"
        canonicalPath="/agendamento"
      />
        <InstitutoHero
          title="Agendamento Online"
          subtitle="Agende sua consulta de forma rápida e prática."
          imageUrl={IMAGES.hero.doctorConsultation}
          breadcrumb="Agendamento"
        />
        <section className="section-padding">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center"
            >
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="font-display text-3xl text-navy mb-4">Solicitação Enviada!</h2>
              <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                Sua solicitação de agendamento foi enviada pelo WhatsApp. Nossa equipe entrará em contato em breve para confirmar o horário da sua consulta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => { setSubmitted(false); setStep(1); setForm(initialForm); }}
                  className="inline-flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-navy-light transition-colors"
                >
                  Novo Agendamento
                </button>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 border border-border text-navy font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-cream/50 transition-colors"
                >
                  Voltar ao Início
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <InstitutoHero
        title="Agendamento Online"
        subtitle="Agende sua consulta de forma rápida e prática. Preencha o formulário e nossa equipe confirmará seu horário."
        imageUrl={IMAGES.hero.doctorConsultation}
        breadcrumb="Agendamento"
      />

      <section className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Progress Steps */}
            <AnimateOnScroll className="mb-10">
              <div className="flex items-center justify-center gap-0">
                {[
                  { num: 1, label: "Seus Dados" },
                  { num: 2, label: "Consulta" },
                  { num: 3, label: "Confirmação" },
                ].map((s, i) => (
                  <div key={s.num} className="flex items-center">
                    <button
                      onClick={() => {
                        if (s.num < step) setStep(s.num);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                        step === s.num
                          ? "bg-navy text-cream shadow-md"
                          : step > s.num
                          ? "bg-gold/20 text-gold cursor-pointer hover:bg-gold/30"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full flex items-center justify-center font-ui text-xs font-bold ${
                        step === s.num
                          ? "bg-gold text-navy"
                          : step > s.num
                          ? "bg-gold/40 text-navy"
                          : "bg-muted-foreground/20 text-muted-foreground"
                      }`}>
                        {step > s.num ? "✓" : s.num}
                      </span>
                      <span className="font-ui text-xs font-semibold hidden sm:inline">{s.label}</span>
                    </button>
                    {i < 2 && (
                      <div className={`w-8 sm:w-16 h-0.5 mx-1 ${step > s.num ? "bg-gold/40" : "bg-border"}`} />
                    )}
                  </div>
                ))}
              </div>
            </AnimateOnScroll>

            {/* Form Card */}
            <div className="bg-white rounded-xl border border-border/60 shadow-sm overflow-hidden">
              <AnimatePresence mode="wait">
                {/* STEP 1: Personal Data */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8"
                  >
                    <h3 className="font-display text-xl text-navy mb-1">Seus Dados</h3>
                    <p className="font-body text-sm text-muted-foreground mb-6">Preencha suas informações para o agendamento.</p>

                    <div className="space-y-4">
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">
                          Nome Completo <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={form.nome}
                          onChange={(e) => updateField("nome", e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                          placeholder="Seu nome completo"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-ui text-xs font-semibold text-navy mb-1.5">
                            Telefone / WhatsApp <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={form.telefone}
                            onChange={(e) => updateField("telefone", e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="(11) 99999-9999"
                          />
                        </div>
                        <div>
                          <label className="block font-ui text-xs font-semibold text-navy mb-1.5">E-mail</label>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateField("email", e.target.value)}
                            className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                            placeholder="seu@email.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Data de Nascimento</label>
                        <input
                          type="date"
                          value={form.dataNascimento}
                          onChange={(e) => updateField("dataNascimento", e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <button
                        onClick={() => canAdvance1 && setStep(2)}
                        disabled={!canAdvance1}
                        className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-7 py-3 rounded-md hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Próximo
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 2: Appointment Details */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8"
                  >
                    <h3 className="font-display text-xl text-navy mb-1">Detalhes da Consulta</h3>
                    <p className="font-body text-sm text-muted-foreground mb-6">Escolha a especialidade, unidade e convênio.</p>

                    <div className="space-y-5">
                      {/* Instituto */}
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-2">
                          Especialidade / Instituto <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {institutos.map((inst) => (
                            <button
                              key={inst.value}
                              onClick={() => updateField("instituto", inst.value)}
                              className={`p-3 rounded-lg border text-left transition-all ${
                                form.instituto === inst.value
                                  ? "border-gold bg-gold/10 shadow-sm"
                                  : "border-border hover:border-gold/30"
                              }`}
                            >
                              <span className={`font-ui text-xs font-semibold block ${
                                form.instituto === inst.value ? "text-navy" : "text-muted-foreground"
                              }`}>
                                {inst.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Unidade */}
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-2">
                          Unidade Preferida <span className="text-red-500">*</span>
                        </label>
                        <div className="space-y-2">
                          {unidades.map((u) => (
                            <button
                              key={u.value}
                              onClick={() => updateField("unidade", u.value)}
                              className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                                form.unidade === u.value
                                  ? "border-gold bg-gold/10 shadow-sm"
                                  : "border-border hover:border-gold/30"
                              }`}
                            >
                              <MapPin className={`w-4 h-4 shrink-0 ${form.unidade === u.value ? "text-gold" : "text-muted-foreground"}`} />
                              <span className={`font-ui text-xs font-semibold ${form.unidade === u.value ? "text-navy" : "text-muted-foreground"}`}>
                                {u.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Convênio */}
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Convênio</label>
                        <select
                          value={form.convenio}
                          onChange={(e) => updateField("convenio", e.target.value)}
                          className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        >
                          <option value="">Selecione seu convênio</option>
                          {convenios.map((c) => (
                            <option key={c.value} value={c.value}>{c.label}</option>
                          ))}
                        </select>
                      </div>

                      {/* Período */}
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-2">Período Preferido</label>
                        <div className="flex flex-wrap gap-2">
                          {periodos.map((p) => (
                            <button
                              key={p.value}
                              onClick={() => updateField("periodo", p.value)}
                              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border transition-all ${
                                form.periodo === p.value
                                  ? "border-gold bg-gold/10 shadow-sm"
                                  : "border-border hover:border-gold/30"
                              }`}
                            >
                              <Clock className={`w-3.5 h-3.5 ${form.periodo === p.value ? "text-gold" : "text-muted-foreground"}`} />
                              <span className={`font-ui text-xs font-semibold ${form.periodo === p.value ? "text-navy" : "text-muted-foreground"}`}>
                                {p.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 border border-border text-navy font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-cream/50 transition-colors"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={() => canAdvance2 && setStep(3)}
                        disabled={!canAdvance2}
                        className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-7 py-3 rounded-md hover:bg-navy-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Próximo
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3: Confirmation */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 md:p-8"
                  >
                    <h3 className="font-display text-xl text-navy mb-1">Confirme seus Dados</h3>
                    <p className="font-body text-sm text-muted-foreground mb-6">Revise as informações e envie sua solicitação.</p>

                    {/* Summary */}
                    <div className="bg-cream/50 rounded-xl border border-gold/10 p-5 mb-6 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">Nome</p>
                          <p className="font-body text-sm text-navy">{form.nome}</p>
                        </div>
                        <div>
                          <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">Telefone</p>
                          <p className="font-body text-sm text-navy">{form.telefone}</p>
                        </div>
                        {form.email && (
                          <div>
                            <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">E-mail</p>
                            <p className="font-body text-sm text-navy">{form.email}</p>
                          </div>
                        )}
                        <div>
                          <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">Especialidade</p>
                          <p className="font-body text-sm text-navy">{institutos.find((i) => i.value === form.instituto)?.label}</p>
                        </div>
                        <div>
                          <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">Unidade</p>
                          <p className="font-body text-sm text-navy">{unidades.find((u) => u.value === form.unidade)?.label}</p>
                        </div>
                        <div>
                          <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">Convênio</p>
                          <p className="font-body text-sm text-navy">{convenios.find((c) => c.value === form.convenio)?.label || "Não informado"}</p>
                        </div>
                        <div>
                          <p className="font-ui text-[10px] font-semibold tracking-wider uppercase text-gold mb-0.5">Período</p>
                          <p className="font-body text-sm text-navy">{periodos.find((p) => p.value === form.periodo)?.label}</p>
                        </div>
                      </div>
                    </div>

                    {/* Urgência */}
                    <div className="mb-5">
                      <label className="block font-ui text-xs font-semibold text-navy mb-2">É urgente?</label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateField("urgencia", "normal")}
                          className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                            form.urgencia === "normal" ? "border-gold bg-gold/10" : "border-border"
                          }`}
                        >
                          <span className="font-ui text-xs font-semibold text-navy">Não, posso aguardar</span>
                        </button>
                        <button
                          onClick={() => updateField("urgencia", "urgente")}
                          className={`flex-1 p-3 rounded-lg border text-center transition-all ${
                            form.urgencia === "urgente" ? "border-red-400 bg-red-50" : "border-border"
                          }`}
                        >
                          <span className="font-ui text-xs font-semibold text-red-600">Sim, é urgente</span>
                        </button>
                      </div>
                    </div>

                    {/* Observações */}
                    <div className="mb-6">
                      <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Observações (opcional)</label>
                      <textarea
                        rows={3}
                        value={form.observacoes}
                        onChange={(e) => updateField("observacoes", e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all resize-none"
                        placeholder="Alguma informação adicional? (sintomas, medicamentos, etc.)"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-3">
                      <button
                        onClick={() => setStep(2)}
                        className="inline-flex items-center justify-center gap-2 border border-border text-navy font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-cream/50 transition-colors"
                      >
                        Voltar
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-8 py-3.5 rounded-md hover:bg-[#20BD5A] transition-colors shadow-md"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Enviar pelo WhatsApp
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Alternative contact */}
            <AnimateOnScroll className="mt-8">
              <div className="bg-cream/50 rounded-xl border border-border/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-ui text-xs font-semibold text-navy">Prefere ligar?</p>
                    <p className="font-body text-sm text-muted-foreground">Ligue para (11) 91654-4653</p>
                  </div>
                </div>
                <a
                  href="tel:+5511916544653"
                  className="inline-flex items-center gap-2 bg-navy text-cream font-ui text-xs font-semibold px-5 py-2.5 rounded-md hover:bg-navy-light transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  Ligar Agora
                </a>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
