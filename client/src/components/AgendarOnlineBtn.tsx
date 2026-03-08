/**
 * AgendarOnlineBtn — Opção 1
 * Botão com ícone de calendário + subtexto "Consulta disponível em até 48h"
 * Usado em todo o site para substituir o botão outline genérico.
 */
import { Link } from "wouter";
import { Calendar } from "lucide-react";

interface AgendarOnlineBtnProps {
  /** Texto principal do botão (padrão: "Agendar Online") */
  label?: string;
  /** Subtexto abaixo do label (padrão: "Consulta disponível em até 48h") */
  subtext?: string;
  /** Variante de cor: "light" para hero escuro, "dark" para seções claras */
  variant?: "light" | "dark";
  className?: string;
}

export default function AgendarOnlineBtn({
  label = "Agendar Online",
  subtext = "Consulta disponível em até 48h",
  variant = "light",
  className = "",
}: AgendarOnlineBtnProps) {
  const isLight = variant === "light";

  return (
    <Link href="/agendar">
      <a
        className={[
          "inline-flex flex-col items-start gap-0.5 px-6 py-3 rounded-md border transition-all duration-200 group no-underline",
          "border-gold/40 text-cream bg-navy hover:bg-navy/80 hover:border-gold/60",
          className,
        ].join(" ")}
      >
        {/* Linha principal */}
        <span className="flex items-center gap-2 font-ui text-sm font-semibold leading-tight">
          <Calendar
            className={[
              "w-4 h-4 flex-shrink-0 transition-colors",
              isLight ? "text-gold" : "text-gold",
            ].join(" ")}
          />
          {label}
        </span>
        {/* Subtexto */}
        <span
          className={[
            "font-ui text-[11px] font-medium pl-6 leading-tight transition-colors",
            isLight ? "text-gold/80" : "text-gold",
          ].join(" ")}
        >
          {subtext}
        </span>
      </a>
    </Link>
  );
}
