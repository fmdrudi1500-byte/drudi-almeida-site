/* ============================================================
   VejaTambem — Links internos entre institutos e páginas
   Melhora o SEO com links contextuais e reduz taxa de rejeição.
   ============================================================ */
import { Link } from "wouter";
import { ArrowRight, Eye, Shield, Heart, Users } from "lucide-react";
import AnimateOnScroll from "./AnimateOnScroll";

interface InstitutoLink {
  name: string;
  href: string;
  desc: string;
  icon: React.ElementType;
}

const todosInstitutos: InstitutoLink[] = [
  {
    name: "Instituto da Catarata",
    href: "/instituto/catarata",
    desc: "Cirurgia de catarata com facoemulsificação e lentes premium. Especialistas renomados em SP.",
    icon: Eye,
  },
  {
    name: "Instituto do Ceratocone",
    href: "/instituto/ceratocone",
    desc: "Crosslinking, anel de Ferrara e lentes de contato especiais para ceratocone.",
    icon: Shield,
  },
  {
    name: "Instituto do Glaucoma",
    href: "/instituto/glaucoma",
    desc: "Diagnóstico precoce e tratamento do glaucoma com laser e cirurgia.",
    icon: Eye,
  },
  {
    name: "Instituto da Retina",
    href: "/instituto/retina",
    desc: "Vitrectomia, injeções intravítreas e tratamento de doenças da retina.",
    icon: Heart,
  },
  {
    name: "Instituto de Estrabismo",
    href: "/instituto/estrabismo",
    desc: "Cirurgia de estrabismo para crianças e adultos com técnicas modernas.",
    icon: Users,
  },
];

interface Props {
  /** Slug do instituto atual (será excluído da lista) */
  currentInstituto: "catarata" | "ceratocone" | "glaucoma" | "retina" | "estrabismo";
  /** Título customizado (opcional) */
  title?: string;
}

export default function VejaTambem({ currentInstituto, title = "Conheça nossos outros institutos" }: Props) {
  const currentHref = `/instituto/${currentInstituto}`;
  const outros = todosInstitutos.filter((inst) => inst.href !== currentHref);

  return (
    <section className="section-padding bg-slate-50">
      <div className="container">
        <AnimateOnScroll className="text-center mb-10">
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
            Veja Também
          </span>
          <h2 className="font-display text-2xl md:text-3xl text-navy mt-3">
            {title}
          </h2>
          <div className="gold-line max-w-[80px] mx-auto mt-5" />
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
          {outros.map((inst) => {
            const Icon = inst.icon;
            return (
              <AnimateOnScroll key={inst.href}>
                <Link href={inst.href} className="group block h-full">
                  <div className="bg-white rounded-xl border border-border/60 p-6 h-full hover:shadow-md hover:border-gold/30 transition-all duration-300">
                    <div className="w-10 h-10 rounded-lg bg-navy/8 flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors">
                      <Icon className="w-5 h-5 text-navy group-hover:text-gold transition-colors" />
                    </div>
                    <h3 className="font-display text-base text-navy mb-2 group-hover:text-gold transition-colors">
                      {inst.name}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground leading-relaxed mb-3">
                      {inst.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 font-ui text-xs font-semibold text-navy group-hover:text-gold transition-colors">
                      Saiba mais
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
