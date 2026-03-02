/* ============================================================
   Cancelar Agendamento — Drudi e Almeida
   Patient self-cancellation via token from email link
   ============================================================ */
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export default function CancelarAgendamento() {
  const [location] = useLocation();
  const [token, setToken] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [alreadyCancelled, setAlreadyCancelled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get("token");
    setToken(t);
  }, [location]);

  const cancelMutation = trpc.appointment.cancelByToken.useMutation({
    onSuccess: (data) => {
      setDone(true);
      setAlreadyCancelled(data.alreadyCancelled);
    },
    onError: (err) => {
      setError(err.message);
    },
  });

  useEffect(() => {
    if (token && !done && !error && !cancelMutation.isPending) {
      cancelMutation.mutate({ token });
    }
  }, [token]);

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center bg-card border border-border/60 rounded-2xl shadow-lg p-10">
        {cancelMutation.isPending && (
          <>
            <Loader2 className="w-12 h-12 text-navy mx-auto mb-4 animate-spin" />
            <h1 className="font-display text-2xl text-navy mb-2">Processando...</h1>
            <p className="font-body text-muted-foreground">Cancelando sua solicitação de agendamento.</p>
          </>
        )}

        {done && !alreadyCancelled && (
          <>
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-navy mb-3">Agendamento Cancelado</h1>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Seu agendamento foi cancelado com sucesso. Se desejar reagendar, estamos à disposição.
            </p>
            <a
              href="/agendar"
              className="inline-flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-bold px-6 py-3 rounded-lg hover:bg-navy/90 transition-colors"
            >
              Reagendar consulta
            </a>
          </>
        )}

        {done && alreadyCancelled && (
          <>
            <CheckCircle className="w-14 h-14 text-amber-500 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-navy mb-3">Já Cancelado</h1>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">
              Este agendamento já havia sido cancelado anteriormente.
            </p>
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 border border-border text-foreground font-ui text-sm font-semibold px-6 py-3 rounded-lg hover:bg-muted transition-colors"
            >
              Voltar ao início
            </a>
          </>
        )}

        {error && (
          <>
            <XCircle className="w-14 h-14 text-red-500 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-navy mb-3">Link Inválido</h1>
            <p className="font-body text-muted-foreground leading-relaxed mb-6">{error}</p>
            <a
              href="https://wa.me/5511916544653"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-6 py-3 rounded-lg hover:bg-[#1ea855] transition-colors"
            >
              Falar pelo WhatsApp
            </a>
          </>
        )}

        {!token && !cancelMutation.isPending && (
          <>
            <XCircle className="w-14 h-14 text-red-400 mx-auto mb-4" />
            <h1 className="font-display text-2xl text-navy mb-3">Link Inválido</h1>
            <p className="font-body text-muted-foreground">
              O link de cancelamento é inválido ou expirou. Entre em contato pelo WhatsApp.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
