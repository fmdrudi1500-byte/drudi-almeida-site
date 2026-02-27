/* ============================================================
   Contato — Drudi e Almeida
   Contact page with 5 units, Google Maps, form, and info
   Design: Neoclassical Medical Luminance
   ============================================================ */
import { Phone, Mail, MapPin, Clock, MessageCircle, Navigation } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import InstitutoCTA from "@/components/InstitutoCTA";
import { IMAGES } from "@/lib/images";
import { useState } from "react";
import { toast } from "sonner";
import SEOHead from "@/components/SEOHead";

interface Unidade {
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  mapQuery: string;
}

const unidades: Unidade[] = [
  {
    name: "Unidade Santana",
    address: "Rua Dr. César, 130",
    neighborhood: "Santana",
    city: "São Paulo - SP",
    mapQuery: "Rua+Dr+Cesar+130+Santana+São+Paulo+SP",
  },
  {
    name: "Unidade Tatuapé",
    address: "Rua Tuiuti, 2429",
    neighborhood: "Tatuapé",
    city: "São Paulo - SP",
    mapQuery: "Rua+Tuiuti+2429+Tatuapé+São+Paulo+SP",
  },
  {
    name: "Unidade Lapa",
    address: "Rua Barão de Jundiaí, 221",
    neighborhood: "Lapa",
    city: "São Paulo - SP",
    mapQuery: "Rua+Barão+de+Jundiaí+221+Lapa+São+Paulo+SP",
  },
  {
    name: "Unidade São Miguel",
    address: "Rua Bernardo Marcondes, 108",
    neighborhood: "São Miguel Paulista",
    city: "São Paulo - SP",
    mapQuery: "Rua+Bernardo+Marcondes+108+São+Miguel+Paulista+São+Paulo+SP",
  },
  {
    name: "Unidade Guarulhos",
    address: "Rua Sete de Setembro, 375",
    neighborhood: "Centro",
    city: "Guarulhos - SP",
    mapQuery: "Rua+Sete+de+Setembro+375+Guarulhos+SP",
  },
];

export default function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", assunto: "", unidade: "", mensagem: "" });
  const [activeUnit, setActiveUnit] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${formData.nome}.\n\nAssunto: ${formData.assunto}\nUnidade: ${formData.unidade || "Não especificada"}\n\n${formData.mensagem}\n\nContato: ${formData.email} | ${formData.telefone}`;
    window.open(`https://wa.me/5511916544653?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
  };

  return (
    <>
      <SEOHead
        title="Contato — Fale Conosco"
        description="Entre em contato com a Drudi e Almeida Oftalmologia. Telefone: (11) 5026-8521. WhatsApp: (11) 91654-4653. 5 unidades em SP e Guarulhos."
        keywords="contato Drudi e Almeida, telefone clínica oftalmológica, WhatsApp oftalmologista, endereço clínica olhos SP"
        canonicalPath="/contato"
      />
      <InstitutoHero
        title="Entre em Contato"
        subtitle="Estamos prontos para atender você. Agende sua consulta ou tire suas dúvidas em qualquer uma das nossas 5 unidades."
        imageUrl={IMAGES.hero.main}
        breadcrumb="Contato"
      />

      {/* Units Section */}
      <section className="section-padding">
        <div className="container">
          <AnimateOnScroll className="text-center mb-10">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Nossas Unidades</span>
            <h2 className="font-display text-3xl md:text-4xl text-navy mt-3 mb-3">5 Unidades para Atendê-lo</h2>
            <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto">
              Escolha a unidade mais próxima de você. Todas contam com a mesma estrutura de excelência e corpo clínico especializado.
            </p>
            <div className="gold-line max-w-[80px] mx-auto mt-5" />
          </AnimateOnScroll>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Unit Cards */}
            <div className="space-y-3">
              {unidades.map((unit, i) => (
                <AnimateOnScroll key={unit.name} delay={i * 0.05}>
                  <button
                    onClick={() => setActiveUnit(i)}
                    className={`w-full text-left p-5 rounded-xl border transition-all duration-300 ${
                      activeUnit === i
                        ? "bg-navy text-cream border-navy shadow-lg"
                        : "bg-white border-border/60 hover:border-gold/30 hover:shadow-md"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                          activeUnit === i ? "bg-gold/20" : "bg-gold/10"
                        }`}>
                          <MapPin className={`w-4 h-4 ${activeUnit === i ? "text-gold" : "text-gold"}`} />
                        </div>
                        <div>
                          <h3 className={`font-display text-base mb-1 ${
                            activeUnit === i ? "text-cream" : "text-navy"
                          }`}>
                            {unit.name}
                          </h3>
                          <p className={`font-body text-sm ${
                            activeUnit === i ? "text-cream/80" : "text-muted-foreground"
                          }`}>
                            {unit.address} — {unit.neighborhood}, {unit.city}
                          </p>
                        </div>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${unit.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`shrink-0 p-2 rounded-md transition-colors ${
                          activeUnit === i
                            ? "hover:bg-cream/10 text-gold"
                            : "hover:bg-gold/10 text-gold"
                        }`}
                        title="Abrir no Google Maps"
                      >
                        <Navigation className="w-4 h-4" />
                      </a>
                    </div>
                  </button>
                </AnimateOnScroll>
              ))}
            </div>

            {/* Google Maps Embed */}
            <AnimateOnScroll delay={0.15}>
              <div className="rounded-xl overflow-hidden border border-border/60 shadow-sm h-[420px] lg:h-full lg:min-h-[480px] sticky top-24">
                <iframe
                  title={`Mapa - ${unidades[activeUnit].name}`}
                  src={`https://www.google.com/maps?q=${unidades[activeUnit].mapQuery}&output=embed`}
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-cream/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fale Conosco</span>
                <h2 className="font-display text-3xl text-navy mt-3 mb-6">Informações de Contato</h2>

                <div className="space-y-5 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-ui text-xs font-semibold text-navy mb-0.5">Telefone</p>
                      <a href="tel:+5511916544653" className="font-body text-sm text-muted-foreground hover:text-gold transition-colors">
                        (11) 91654-4653
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-ui text-xs font-semibold text-navy mb-0.5">E-mail</p>
                      <a href="mailto:contato@drudialmeida.com.br" className="font-body text-sm text-muted-foreground hover:text-gold transition-colors">
                        contato@drudialmeida.com.br
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                      <Clock className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <p className="font-ui text-xs font-semibold text-navy mb-0.5">Horário de Atendimento</p>
                      <p className="font-body text-sm text-muted-foreground">
                        Segunda a Sexta: 8h às 18h<br />
                        Sábado: 8h às 12h
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/5511916544653?text=Olá! Gostaria de informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#20BD5A] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Falar pelo WhatsApp
                </a>
              </AnimateOnScroll>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <AnimateOnScroll delay={0.1}>
                <div className="bg-white rounded-xl border border-border/60 p-6 md:p-8 shadow-sm">
                  <h3 className="font-display text-xl text-navy mb-6">Envie sua Mensagem</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Nome Completo</label>
                        <input
                          type="text"
                          required
                          value={formData.nome}
                          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                          placeholder="Seu nome"
                        />
                      </div>
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">E-mail</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                          placeholder="seu@email.com"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Telefone</label>
                        <input
                          type="tel"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                          placeholder="(11) 99999-9999"
                        />
                      </div>
                      <div>
                        <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Unidade Preferida</label>
                        <select
                          value={formData.unidade}
                          onChange={(e) => setFormData({ ...formData, unidade: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                        >
                          <option value="qualquer">Qualquer unidade</option>
                          {unidades.map((u) => (
                            <option key={u.name} value={u.name}>{u.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Assunto</label>
                      <select
                        value={formData.assunto}
                        onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all"
                      >
                        <option value="consulta">Agendar Consulta</option>
                        <option value="catarata">Instituto da Catarata</option>
                        <option value="ceratocone">Instituto do Ceratocone</option>
                        <option value="glaucoma">Instituto do Glaucoma</option>
                        <option value="retina">Instituto da Retina</option>
                        <option value="estrabismo">Instituto de Estrabismo</option>
                        <option value="convenio">Dúvida sobre Convênio</option>
                        <option value="outro">Outro Assunto</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-ui text-xs font-semibold text-navy mb-1.5">Mensagem</label>
                      <textarea
                        rows={4}
                        required
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-md border border-border bg-background font-body text-sm focus:ring-2 focus:ring-gold/30 focus:border-gold outline-none transition-all resize-none"
                        placeholder="Como podemos ajudá-lo?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-navy text-cream font-ui text-sm font-semibold py-3 rounded-md hover:bg-navy-light transition-colors"
                    >
                      Enviar via WhatsApp
                    </button>
                    <p className="font-body text-xs text-muted-foreground text-center">
                      Ao enviar, você será redirecionado para o WhatsApp com sua mensagem.
                    </p>
                  </form>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </div>
      </section>

      <InstitutoCTA text="Agende sua consulta em qualquer uma das nossas 5 unidades. Estamos esperando por você." />
    </>
  );
}
