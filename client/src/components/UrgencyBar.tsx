import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { X, Clock, Eye, Calendar, AlertCircle } from "lucide-react";

const PHONE = "5511916544653";

function getMonthName() {
  const meses = [
    "janeiro","fevereiro","março","abril","maio","junho",
    "julho","agosto","setembro","outubro","novembro","dezembro",
  ];
  return meses[new Date().getMonth()];
}

function getPeriod() {
  const h = new Date().getHours();
  if (h >= 6 && h < 12) return "manha";
  if (h >= 12 && h < 18) return "tarde";
  return "noite";
}

interface BarData {
  texto: string;
  icone: "clock" | "eye" | "calendar" | "alert";
  ctaMsg: string;
}

const PAGE_DATA: Record<string, BarData> = {
  "/instituto/catarata": {
    texto: "A catarata tem tratamento definitivo — avaliação gratuita disponível em {mes}.",
    icone: "eye",
    ctaMsg: "Olá! Gostaria de agendar uma avaliação de catarata.",
  },
  "/instituto/ceratocone": {
    texto: "Diagnóstico precoce do ceratocone preserva sua visão — agende sua avaliação.",
    icone: "alert",
    ctaMsg: "Olá! Gostaria de uma avaliação para ceratocone.",
  },
  "/instituto/glaucoma": {
    texto: "O glaucoma não dói — mas pode causar cegueira. Detecte cedo. Agende agora.",
    icone: "clock",
    ctaMsg: "Olá! Gostaria de agendar um exame de glaucoma.",
  },
  "/instituto/retina": {
    texto: "Alterações na retina exigem atenção imediata — nossa equipe está disponível.",
    icone: "alert",
    ctaMsg: "Olá! Gostaria de uma avaliação de retina.",
  },
  "/instituto/estrabismo": {
    texto: "O tratamento do estrabismo é mais eficaz quanto mais cedo for iniciado.",
    icone: "calendar",
    ctaMsg: "Olá! Gostaria de agendar avaliação de estrabismo.",
  },
  "/": {
    texto: "Atendemos Bradesco, Amil, Unimed, Prevent Senior e mais — consulte sua cobertura.",
    icone: "calendar",
    ctaMsg: "Olá! Gostaria de agendar uma consulta na Drudi e Almeida.",
  },
};

const ICONS = {
  clock: Clock,
  eye: Eye,
  calendar: Calendar,
  alert: AlertCircle,
};

export default function UrgencyBar() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [barData, setBarData] = useState<BarData | null>(null);

  useEffect(() => {
    // Reset on route change
    setDismissed(false);
    setVisible(false);

    // Find matching page data
    let data: BarData | null = null;
    for (const [route, d] of Object.entries(PAGE_DATA)) {
      if (location === route || location.startsWith(route + "/")) {
        data = d;
        break;
      }
    }

    if (!data) return;

    // Replace {mes} placeholder
    const mes = getMonthName();
    data = { ...data, texto: data.texto.replace("{mes}", mes) };
    setBarData(data);

    // Show after short delay
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [location]);

  if (!barData || !visible || dismissed) return null;

  const Icon = ICONS[barData.icone];
  const waUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(barData.ctaMsg)}`;

  return (
    <div
      className="w-full border-b"
      style={{
        background: "#EFF6FF",
        borderBottomColor: "rgba(59,130,246,0.15)",
        animation: "urgbar-enter 0.4s ease",
      }}
    >
      <style>{`
        @keyframes urgbar-enter {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-center gap-3 flex-wrap">
        <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "#1E40AF" }} />
        <span
          className="text-sm font-medium text-center leading-snug"
          style={{ color: "#1E40AF" }}
          dangerouslySetInnerHTML={{
            __html: barData.texto.replace(
              /\*\*(.*?)\*\*/g,
              '<strong style="font-weight:700;color:#1E3A8A">$1</strong>'
            ),
          }}
        />
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold px-3 py-1 rounded-md flex-shrink-0 transition-colors"
          style={{
            color: "#1E40AF",
            background: "rgba(59,130,246,0.12)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.22)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.12)")}
        >
          Agendar →
        </a>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Fechar"
          className="flex-shrink-0 opacity-40 hover:opacity-70 transition-opacity p-1"
        >
          <X className="w-3.5 h-3.5" style={{ color: "#1E40AF" }} />
        </button>
      </div>
    </div>
  );
}
