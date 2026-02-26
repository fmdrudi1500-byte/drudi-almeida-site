/* ============================================================
   Header — Drudi e Almeida
   Fixed navigation with glass effect, logo, nav links, and CTA
   ============================================================ */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/jXphKGejnsXpoASn.jpg";

const institutos = [
  { name: "Instituto da Catarata", href: "/instituto/catarata" },
  { name: "Instituto do Ceratocone", href: "/instituto/ceratocone" },
  { name: "Instituto do Glaucoma", href: "/instituto/glaucoma" },
  { name: "Instituto da Retina", href: "/instituto/retina" },
  { name: "Instituto de Estrabismo", href: "/instituto/estrabismo" },
];

const navLinks = [
  { name: "Início", href: "/" },
  { name: "Sobre Nós", href: "/sobre" },
  { name: "Institutos", href: "#", children: institutos },
  { name: "Tecnologia", href: "/tecnologia" },
  { name: "Convênios", href: "/convenios" },
  { name: "Blog", href: "/blog" },
  { name: "Contato", href: "/contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [location]);

  return (
    <>
      {/* Top bar */}
      <div className="bg-navy text-cream hidden md:block">
        <div className="container flex items-center justify-between py-2 text-xs font-ui tracking-wide">
          <div className="flex items-center gap-6">
            <span>Seg - Sex: 8h às 18h | Sáb: 8h às 12h</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+5511916544653" className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              (11) 91654-4653
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-sm"
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={LOGO_URL}
              alt="Drudi e Almeida Clínicas Oftalmológicas"
              className="h-12 md:h-14 w-auto"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    className={`font-ui text-sm font-medium px-4 py-2 rounded-md flex items-center gap-1 transition-colors hover:text-gold ${
                      location.startsWith("/instituto") ? "text-gold" : "text-navy"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 pt-2"
                      >
                        <div className="glass rounded-lg shadow-lg border border-border/50 py-2 min-w-[240px]">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 font-ui text-sm transition-colors hover:bg-gold/10 hover:text-gold ${
                                location === child.href ? "text-gold bg-gold/5" : "text-navy"
                              }`}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-ui text-sm font-medium px-4 py-2 rounded-md transition-colors hover:text-gold ${
                    location === link.href ? "text-gold" : "text-navy"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/agendamento"
              className="hidden sm:inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-navy-light transition-colors"
            >
              Agendar Consulta
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-navy"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="gold-line" />
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden fixed top-[calc(5rem+1px)] left-0 right-0 z-40 bg-white border-b border-border shadow-lg overflow-hidden"
          >
            <nav className="container py-4 flex flex-col gap-1">
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.name}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="w-full flex items-center justify-between font-ui text-sm font-medium px-3 py-3 text-navy rounded-md hover:bg-cream transition-colors"
                    >
                      {link.name}
                      <ChevronDown className={`w-4 h-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    <AnimatePresence>
                      {dropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block pl-8 pr-3 py-2.5 font-ui text-sm text-warm-gray hover:text-gold transition-colors"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`font-ui text-sm font-medium px-3 py-3 rounded-md transition-colors hover:bg-cream ${
                      location === link.href ? "text-gold" : "text-navy"
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
              <div className="pt-3 mt-2 border-t border-border">
                <Link
                  href="/agendamento"
                  className="flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-5 py-3 rounded-md w-full"
                >
                  Agendar Consulta
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
