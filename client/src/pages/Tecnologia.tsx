/* ============================================================
   Tecnologia — Drudi e Almeida
   ============================================================ */
import { ArrowRight, Zap, ScanEye, Microscope, Crosshair, Ruler } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";

const equipamentos = [
  { icon: Zap, title: "Femto Laser", desc: "Precisão submicrométrica para a cirurgia de catarata, tornando o procedimento mais seguro, previsível e com uma recuperação visual mais rápida." },
  { icon: ScanEye, title: "Tomógrafo de Coerência Óptica (OCT)", desc: "Realiza um scan de altíssima resolução da retina e do nervo óptico, permitindo o diagnóstico precoce de doenças como glaucoma e DMRI." },
  { icon: Crosshair, title: "Crosslinking Acelerado", desc: "A mais moderna tecnologia para o tratamento do ceratocone, que fortalece a estrutura da córnea e estabiliza a progressão da doença." },
  { icon: Microscope, title: "Mapeamento Ultra-Widefield", desc: "Permite a visualização de mais de 80% da retina em uma única imagem, essencial para a detecção de problemas na periferia da retina." },
  { icon: Ruler, title: "Biômetro Óptico", desc: "Realiza o cálculo preciso da lente intraocular para a cirurgia de catarata, utilizando tecnologia a laser para o melhor resultado refrativo." },
];

export default function Tecnologia() {
  return (
    <>
      <InstitutoHero
        title="Tecnologia de Ponta"
        subtitle="Investimos continuamente nos equipamentos mais modernos para garantir diagnósticos precisos e tratamentos seguros."
        imageUrl={IMAGES.hero.technology}
        breadcrumb="Tecnologia"
      />

      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-14">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Infraestrutura</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-4">Nossos Equipamentos</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Cada equipamento foi selecionado para oferecer o máximo de precisão e segurança em cada procedimento.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-6" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipamentos.map((eq, i) => (
              <AnimateOnScroll key={eq.title} delay={i * 0.1}>
                <div className="flex gap-5 p-6 rounded-xl border border-border/60 bg-white hover:shadow-md hover:border-gold/30 transition-all">
                  <div className="w-12 h-12 rounded-lg bg-navy/5 flex items-center justify-center shrink-0">
                    <eq.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-navy mb-2">{eq.title}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{eq.desc}</p>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl text-cream mb-4">Compromisso com a Inovação</h2>
            <p className="font-body text-base text-cream/70 max-w-xl mx-auto mb-8 leading-relaxed">
              Participamos ativamente de congressos nacionais e internacionais para garantir que nossos pacientes tenham acesso ao que existe de mais moderno.
            </p>
            <a
              href="https://wa.me/5511916544653?text=Olá! Gostaria de saber mais sobre a tecnologia da clínica."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-7 py-3.5 rounded-md hover:bg-gold-light transition-colors"
            >
              Agendar Consulta
              <ArrowRight className="w-4 h-4" />
            </a>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
