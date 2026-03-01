import { useState, useEffect, useCallback } from "react";
import { X, Calendar, CheckCircle, Star } from "lucide-react";

interface ToastData {
  titulo: string;
  subtitulo: string;
  avatarEmoji: string;
  avatarBg: string;
  type: "green" | "blue" | "gold";
}

const NOTIFICATIONS: ToastData[] = [
  {
    titulo: "Novo agendamento realizado",
    subtitulo: "Avaliação de catarata — São Paulo · agora",
    avatarEmoji: "👁️",
    avatarBg: "#ECFDF5",
    type: "green",
  },
  {
    titulo: "Consulta confirmada",
    subtitulo: "Instituto do Ceratocone — Guarulhos · há 3 min",
    avatarEmoji: "📅",
    avatarBg: "#EFF6FF",
    type: "blue",
  },
  {
    titulo: "Avaliação agendada",
    subtitulo: "Instituto da Retina — São Paulo · há 7 min",
    avatarEmoji: "✅",
    avatarBg: "#ECFDF5",
    type: "green",
  },
  {
    titulo: "Paciente atendido",
    subtitulo: "Cirurgia de catarata realizada com sucesso · hoje",
    avatarEmoji: "⭐",
    avatarBg: "#FEF9EC",
    type: "gold",
  },
  {
    titulo: "Novo agendamento",
    subtitulo: "Exame de glaucoma — Guarulhos · há 12 min",
    avatarEmoji: "📋",
    avatarBg: "#EFF6FF",
    type: "blue",
  },
  {
    titulo: "Consulta confirmada",
    subtitulo: "Instituto do Estrabismo — São Paulo · há 5 min",
    avatarEmoji: "👁️",
    avatarBg: "#ECFDF5",
    type: "green",
  },
  {
    titulo: "Avaliação agendada",
    subtitulo: "Adaptação de lente de contato — hoje",
    avatarEmoji: "📅",
    avatarBg: "#EFF6FF",
    type: "blue",
  },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface ActiveToast extends ToastData {
  id: number;
  visible: boolean;
}

const TOAST_DURATION = 6000;
const TOAST_INTERVAL = 18000;
const INITIAL_DELAY = 12000;
const MAX_TOASTS = 4;

export default function SocialProofToasts() {
  const [toasts, setToasts] = useState<ActiveToast[]>([]);
  const [pool] = useState(() => shuffle(NOTIFICATIONS));
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(0);

  const removeToast = useCallback((id: number) => {
    setToasts(prev =>
      prev.map(t => (t.id === id ? { ...t, visible: false } : t))
    );
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 500);
  }, []);

  const showToast = useCallback(() => {
    setCount(c => {
      if (c >= MAX_TOASTS) return c;
      setIndex(i => {
        const idx = i % pool.length;
        const data = pool[idx];
        const id = Date.now();
        const newToast: ActiveToast = { ...data, id, visible: false };

        setToasts(prev => [...prev, newToast]);

        // Trigger visible after mount
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setToasts(prev =>
              prev.map(t => (t.id === id ? { ...t, visible: true } : t))
            );
          });
        });

        // Auto-remove
        setTimeout(() => removeToast(id), TOAST_DURATION);

        return idx + 1;
      });
      return c + 1;
    });
  }, [pool, removeToast]);

  useEffect(() => {
    const initial = setTimeout(() => {
      showToast();
      const interval = setInterval(showToast, TOAST_INTERVAL);
      return () => clearInterval(interval);
    }, INITIAL_DELAY);

    return () => clearTimeout(initial);
  }, [showToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed z-[99990] flex flex-col gap-2"
      style={{
        bottom: "24px",
        left: "20px",
      }}
    >
      <style>{`
        @keyframes toast-countdown {
          from { width: 100%; }
          to { width: 0%; }
        }
        @media (max-width: 480px) {
          .social-toast-wrap {
            left: 12px !important;
            right: 12px !important;
            bottom: 88px !important;
            max-width: none !important;
          }
        }
      `}</style>
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="relative flex items-center gap-3 bg-white rounded-2xl shadow-xl border border-gray-100 px-4 py-3 transition-all duration-500"
          style={{
            maxWidth: "320px",
            transform: toast.visible ? "translateX(0)" : "translateX(-120%)",
            opacity: toast.visible ? 1 : 0,
          }}
        >
          {/* Avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-base flex-shrink-0"
            style={{ background: toast.avatarBg }}
          >
            {toast.avatarEmoji}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold text-gray-800 leading-snug">
              {toast.titulo}
            </div>
            <div className="text-xs text-gray-400 mt-0.5 leading-tight">
              {toast.subtitulo}
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={() => removeToast(toast.id)}
            className="absolute top-2 right-2 opacity-0 hover:opacity-50 transition-opacity p-0.5 group-hover:opacity-40"
            aria-label="Fechar"
            style={{ opacity: 0 }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
          >
            <X className="w-3 h-3 text-gray-500" />
          </button>

          {/* Progress bar */}
          <div
            className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full overflow-hidden"
            style={{ background: "rgba(0,0,0,0.05)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #C9A86C, #E8D5AB)",
                animation: `toast-countdown ${TOAST_DURATION}ms linear forwards`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
