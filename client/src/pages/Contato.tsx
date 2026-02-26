/* ============================================================
   Contato — Drudi e Almeida
   Contact page with form, map placeholder, and info
   ============================================================ */
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import InstitutoHero from "@/components/InstitutoHero";
import { IMAGES } from "@/lib/images";
import { useState } from "react";
import { toast } from "sonner";

export default function Contato() {
  const [formData, setFormData] = useState({ nome: "", email: "", telefone: "", assunto: "", mensagem: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message from form
    const msg = `Olá! Meu nome é ${formData.nome}.\n\nAssunto: ${formData.assunto}\n\n${formData.mensagem}\n\nContato: ${formData.email} | ${formData.telefone}`;
    window.open(`https://wa.me/5511916544653?text=${encodeURIComponent(msg)}`, "_blank");
    toast.success("Redirecionando para o WhatsApp...");
  };

  const contactInfo = [
    { icon: Phone, label: "Telefone", value: "(11) 91654-4653", href: "tel:+5511916544653" },
    { icon: Mail, label: "E-mail", value: "contato@drudialmeida.com.br", href: "mailto:contato@drudialmeida.com.br" },
    { icon: MapPin, label: "Endereço", value: "São Paulo - SP", href: undefined },
    { icon: Clock, label: "Horário", value: "Seg-Sex: 8h-18h | Sáb: 8h-12h", href: undefined },
  ];

  return (
    <>
      <InstitutoHero
        title="Entre em Contato"
        subtitle="Estamos prontos para atender você. Agende sua consulta ou tire suas dúvidas."
        imageUrl={IMAGES.hero.main}
        breadcrumb="Contato"
      />

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Contact Info */}
            <div className="lg:col-span-2">
              <AnimateOnScroll>
                <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Fale Conosco</span>
                <h2 className="font-display text-3xl text-navy mt-3 mb-6">Informações de Contato</h2>

                <div className="space-y-5 mb-8">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-4 h-4 text-gold" />
                      </div>
                      <div>
                        <p className="font-ui text-xs font-semibold text-navy mb-0.5">{info.label}</p>
                        {info.href ? (
                          <a href={info.href} className="font-body text-sm text-muted-foreground hover:text-gold transition-colors">
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-body text-sm text-muted-foreground">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
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
                          <option value="outro">Outro Assunto</option>
                        </select>
                      </div>
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
    </>
  );
}
