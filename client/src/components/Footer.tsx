/* ============================================================
   Footer — Drudi e Almeida
   Navy background with gold accents, links, and contact info
   ============================================================ */
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from "lucide-react";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/jXphKGejnsXpoASn.jpg";

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/90">
      {/* Gold line top */}
      <div className="h-1 bg-gradient-to-r from-gold/0 via-gold to-gold/0" />

      <div className="container section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img
              src={LOGO_URL}
              alt="Drudi e Almeida"
              className="h-14 w-auto mb-5 brightness-0 invert opacity-90"
            />
            <p className="font-body text-sm leading-relaxed text-cream/70 max-w-xs">
              Referência em oftalmologia com 5 institutos especializados. 
              Tecnologia de ponta e cuidado humanizado para a sua visão.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://instagram.com/drudialmeida"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/drudialmeida"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-cream/20 flex items-center justify-center hover:border-gold hover:text-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Institutos */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-widest uppercase text-gold mb-5">
              Nossos Institutos
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Instituto da Catarata", href: "/instituto/catarata" },
                { name: "Instituto do Ceratocone", href: "/instituto/ceratocone" },
                { name: "Instituto do Glaucoma", href: "/instituto/glaucoma" },
                { name: "Instituto da Retina", href: "/instituto/retina" },
                { name: "Instituto de Estrabismo", href: "/instituto/estrabismo" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-widest uppercase text-gold mb-5">
              Navegação
            </h4>
            <ul className="space-y-2.5">
              {[
                { name: "Sobre Nós", href: "/sobre" },
                { name: "Tecnologia", href: "/tecnologia" },
                { name: "Convênios", href: "/convenios" },
                { name: "Blog", href: "/blog" },
                { name: "Contato", href: "/contato" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-body text-sm text-cream/70 hover:text-gold transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-ui text-xs font-semibold tracking-widest uppercase text-gold mb-5">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <a href="tel:+5511916544653" className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                  (11) 91654-4653
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <a href="mailto:contato@drudialmeida.com.br" className="font-body text-sm text-cream/70 hover:text-gold transition-colors">
                  contato@drudialmeida.com.br
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span className="font-body text-sm text-cream/70">
                  São Paulo - SP
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-gold shrink-0" />
                <span className="font-body text-sm text-cream/70">
                  Seg-Sex: 8h-18h<br />Sáb: 8h-12h
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream/50">
            &copy; {new Date().getFullYear()} Drudi e Almeida Clínicas Oftalmológicas. Todos os direitos reservados.
          </p>
          <p className="font-body text-xs text-cream/50">
            CRM/SP 000000 | RQE 00000
          </p>
        </div>
      </div>
    </footer>
  );
}
