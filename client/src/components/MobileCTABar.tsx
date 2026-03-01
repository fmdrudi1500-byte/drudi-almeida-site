/* ============================================================
   MobileCTABar — Sticky bottom CTA bar for mobile devices
   Visível apenas em telas < md (768px).
   Aparece com slide-up após 2s de scroll.
   Mensagem contextual por página (mesma lógica do WhatsAppButton).
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

const PHONE = "5511916544653";

const MENSAGENS: Record<string, string> = {
  "/instituto/catarata": "Olá! Gostaria de saber mais sobre cirurgia de catarata.",
  "/instituto/ceratocone": "Olá! Tenho interesse no tratamento de ceratocone.",
  "/instituto/glaucoma": "Olá! Gostaria de informações sobre acompanhamento de glaucoma.",
  "/instituto/retina": "Olá! Gostaria de saber mais sobre tratamento de retina.",
  "/instituto/estrabismo": "Olá! Gostaria de informações sobre cirurgia de estrabismo.",
  "/convenios": "Olá! Gostaria de saber se meu convênio é aceito.",
  "/contato": "Olá! Qual unidade é mais próxima de mim para agendar?",
  "/tecnologia": "Olá! Gostaria de saber mais sobre os exames disponíveis.",
  "/sobre": "Olá! Gostaria de conhecer melhor a clínica e agendar uma consulta.",
  "/agendamento": "Olá! Gostaria de agendar uma consulta.",
  "/blog": "Olá! Li um artigo do blog e gostaria de tirar uma dúvida.",
};

function getMessage(path: string): string {
  for (const [route, msg] of Object.entries(MENSAGENS)) {
    if (path.includes(route)) return msg;
  }
  return "Olá! Gostaria de agendar uma consulta.";
}

export default function MobileCTABar() {
  const [location] = useLocation();
  const [visible, setVisible] = useState(false);
  const scrolledRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Show bar after 2s OR after first scroll — whichever comes first
  useEffect(() => {
    setVisible(false);
    scrolledRef.current = false;

    // Auto-show after 2s regardless of scroll
    timerRef.current = setTimeout(() => {
      setVisible(true);
    }, 2000);

    function onScroll() {
      if (!scrolledRef.current) {
        scrolledRef.current = true;
        setVisible(true);
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [location]);

  function openWhatsApp() {
    const message = encodeURIComponent(getMessage(location));
    const url = `https://wa.me/${PHONE}?text=${message}`;
    const a = document.createElement("a");
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  return (
    <>
      {/* Spacer so page content isn't hidden behind the bar on mobile */}
      <div className="block md:hidden h-[60px]" aria-hidden="true" />

      {/* Sticky bar — mobile only */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-[99998]"
        style={{
          transform: visible ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Safe-area padding for iPhone home indicator */}
        <div
          style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
          className="bg-[#25D366] shadow-[0_-4px_20px_rgba(37,211,102,0.35)]"
        >
          <button
            onClick={openWhatsApp}
            className="w-full flex items-center justify-center gap-3 py-4 active:opacity-80 transition-opacity"
            aria-label="Agendar pelo WhatsApp"
          >
            {/* WhatsApp SVG icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 flex-shrink-0"
              fill="white"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492l4.612-1.474A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-2.168 0-4.19-.6-5.92-1.64l-.425-.254-2.735.875.875-2.61-.278-.442A9.77 9.77 0 012.182 12c0-5.412 4.406-9.818 9.818-9.818S21.818 6.588 21.818 12s-4.406 9.818-9.818 9.818z" />
            </svg>

            <span className="text-white font-semibold text-base tracking-wide">
              Agendar pelo WhatsApp
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
