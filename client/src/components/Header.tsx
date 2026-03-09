/* ============================================================
   Header — Drudi e Almeida
   Sticky navigation with:
   - Scroll progress bar (gold, top of page) — CSS-only
   - Mega-menu for Institutos with logo + name + description
   - Home anchor links (Institutos, Tecnologia, Unidades)
   - Glass effect on scroll
   - Mobile drawer menu
   - Animações via CSS transitions (sem framer-motion no caminho crítico)
   ============================================================ */
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone, MessageSquare, ArrowRight, LayoutDashboard, LogIn } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { IMAGES } from "@/lib/images";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

const LOGO_URL = "/images/logo-horizontal-resized_e945407b.webp";

const institutos = [
  {
    name: "Instituto da Catarata",
    href: "/instituto/catarata",
    desc: "Cirurgia de catarata com facoemulsificação e lentes premium.",
    logo: IMAGES.institutoLogos.catarata,
    color: "from-blue-500/10 to-blue-600/5",
    accent: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Instituto do Ceratocone",
    href: "/instituto/ceratocone",
    desc: "Crosslinking, anel de Ferrara e lentes de contato especiais.",
    logo: IMAGES.institutoLogos.ceratocone,
    color: "from-emerald-500/10 to-emerald-600/5",
    accent: "text-emerald-600 dark:text-emerald-400",
  },
  {
    name: "Instituto do Glaucoma",
    href: "/instituto/glaucoma",
    desc: "Diagnóstico precoce e tratamento contínuo do glaucoma.",
    logo: IMAGES.institutoLogos.glaucoma,
    color: "from-amber-500/10 to-amber-600/5",
    accent: "text-amber-600 dark:text-amber-400",
  },
  {
    name: "Instituto da Retina",
    href: "/instituto/retina",
    desc: "Vitrectomia, injeções intravítreas e retinopatia diabética.",
    logo: IMAGES.institutoLogos.retina,
    color: "from-rose-500/10 to-rose-600/5",
    accent: "text-rose-600 dark:text-rose-400",
  },
  {
    name: "Instituto de Estrabismo",
    href: "/instituto/estrabismo",
    desc: "Cirurgia de estrabismo para crianças e adultos.",
    logo: IMAGES.institutoLogos.estrabismo,
    color: "from-violet-500/10 to-violet-600/5",
    accent: "text-violet-600 dark:text-violet-400",
  },
];

// Anchor links — only shown on home page
const anchorLinks = [
  { name: "Institutos", anchor: "#institutos" },
  { name: "Tecnologia", anchor: "#tecnologia" },
  { name: "Unidades", anchor: "#unidades" },
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

function scrollToAnchor(anchor: string) {
  const id = anchor.replace("#", "");
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 88;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Header() {
  const { user, isAuthenticated } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileInstitutosOpen, setMobileInstitutosOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuTop, setMenuTop] = useState("5rem");
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const isHome = location === "/";
  const headerRef = useRef<HTMLElement>(null);

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // Scroll progress bar
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setMobileInstitutosOpen(false);
  }, [location]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Bloquear scroll da página quando o menu mobile estiver aberto
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Calcular o top do menu mobile dinamicamente com base na posição real do header
  useEffect(() => {
    function updateMenuTop() {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMenuTop(`${rect.bottom}px`);
      }
    }
    updateMenuTop();
    // Recalcular quando o banner aparece/desaparece (ResizeObserver no header)
    const ro = new ResizeObserver(updateMenuTop);
    if (headerRef.current) ro.observe(headerRef.current);
    // Também observar o pai (pode mudar quando UrgencyBar monta/desmonta)
    const parent = headerRef.current?.parentElement;
    if (parent) ro.observe(parent);
    window.addEventListener("resize", updateMenuTop);
    window.addEventListener("scroll", updateMenuTop, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateMenuTop);
      window.removeEventListener("scroll", updateMenuTop);
    };
  }, []);

  const handleMouseEnterDropdown = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  };

  const handleMouseLeaveDropdown = () => {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  };

  return (
    <>
      {/* ── Scroll Progress Bar (CSS-only) ─────────────────── */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gold z-[60] origin-left"
        style={{
          width: `${scrollProgress}%`,
          transition: "width 0.1s linear",
        }}
      />

      {/* ── Top Info Bar ────────────────────────────────────── */}
      <div className="bg-navy text-cream hidden md:block">
        <div className="container flex items-center justify-between py-2 text-xs font-ui tracking-wide">
          <div className="flex items-center gap-6">
            <span>Seg - Sex: 8h às 18h | Sáb: 8h às 12h</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+551154302421" onClick={() => trackPhoneClick("header")} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <Phone className="w-3 h-3" />
              (11) 5430-2421
            </a>
            <span className="text-cream/40">|</span>
            <a href="https://wa.me/5511916544653" target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsAppClick("header")} className="flex items-center gap-1.5 hover:text-gold transition-colors">
              <MessageSquare className="w-3 h-3" />
              (11) 91654-4653
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header ─────────────────────────────────────── */}
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-sm dark:bg-background" : "bg-white dark:bg-background"
        }`}
      >
        <div className="flex items-center justify-between h-20 px-4 sm:px-6 lg:container lg:mx-auto lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 mr-auto lg:mr-0">
            <img
              src={LOGO_URL}
              alt="Drudi e Almeida Clínicas Oftalmológicas"
              className="h-10 md:h-14 w-auto max-w-[160px] md:max-w-none object-contain object-left"
              width={250}
              height={48}
              style={{ aspectRatio: "250/48" }}
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <button
                    className={`font-ui text-sm font-medium px-4 py-2 rounded-md flex items-center gap-1 transition-colors hover:text-gold ${
                      location.startsWith("/instituto") ? "text-gold" : "text-foreground"
                    }`}
                  >
                    {link.name}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Mega-menu — CSS transition */}
                  <div
                    className="absolute top-full right-0 pt-3"
                    style={{
                      opacity: dropdownOpen ? 1 : 0,
                      transform: dropdownOpen
                        ? "translateY(0) scale(1)"
                        : "translateY(10px) scale(0.97)",
                      pointerEvents: dropdownOpen ? "auto" : "none",
                      transition: "opacity 0.18s ease-out, transform 0.18s ease-out",
                      transformOrigin: "top right",
                    }}
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                  >
                    <div className="bg-white dark:bg-card rounded-2xl shadow-2xl border border-border/60 p-4 w-[680px]">
                      <div className="flex items-center justify-between mb-3 pb-3 border-b border-border/40">
                        <span className="font-ui text-xs font-semibold tracking-[0.15em] uppercase text-gold">
                          Nossos Institutos Especializados
                        </span>
                        <Link
                          href="/#institutos"
                          onClick={() => { setDropdownOpen(false); setTimeout(() => scrollToAnchor("#institutos"), 100); }}
                          className="font-ui text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
                        >
                          Ver todos
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {link.children.map((inst, idx) => (
                          <Link
                            key={inst.href}
                            href={inst.href}
                            onClick={() => setDropdownOpen(false)}
                            className={`group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br ${inst.color} hover:shadow-md border border-transparent hover:border-border/40 transition-all duration-200`}
                            style={{
                              opacity: dropdownOpen ? 1 : 0,
                              transform: dropdownOpen ? "translateY(0)" : "translateY(8px)",
                              transition: `opacity 0.22s ease-out ${idx * 0.04}s, transform 0.22s ease-out ${idx * 0.04}s`,
                            }}
                          >
                            <img
                              src={inst.logo}
                              alt={`Logotipo ${inst.name} — Drudi e Almeida`}
                              className="w-10 h-10 object-contain rounded-lg shrink-0 group-hover:scale-110 transition-transform duration-200"
                            />
                            <div className="min-w-0">
                              <p className={`font-display text-sm font-semibold group-hover:text-gold transition-colors truncate ${inst.accent}`}>
                                {inst.name}
                              </p>
                              <p className="font-body text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                                {inst.desc}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t border-border/40 flex items-center justify-between">
                        <p className="font-body text-xs text-muted-foreground">
                          Não sabe qual instituto é o ideal para você?
                        </p>
                        <a
                          href="https://wa.me/5511916544653?text=Olá! Gostaria de saber qual instituto é indicado para meu caso."
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setDropdownOpen(false)}
                          className="inline-flex items-center gap-1.5 bg-gold text-navy font-ui text-xs font-bold px-3 py-1.5 rounded-md hover:bg-gold-light transition-colors shrink-0 ml-3"
                        >
                          Falar com especialista
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-ui text-sm font-medium px-4 py-2 rounded-md transition-colors hover:text-gold ${
                    location === link.href ? "text-gold" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          {/* CTA + Dark Mode Toggle + Mobile Toggle */}
          <div className="flex items-center gap-2">
            {/* Theme toggle — left of admin/login button */}
            <button
              onClick={toggleTheme}
              className="relative w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:text-gold hover:border-gold transition-all duration-300"
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              <span
                style={{
                  display: "inline-flex",
                  transition: "opacity 0.25s, transform 0.25s",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 3a9 9 0 0 1 0 18" fill="currentColor" stroke="none" />
                </svg>
              </span>
            </button>
            {/* Admin / Login button */}
            {isAuthenticated ? (
              user?.role === "admin" && (
                <Link
                  href="/admin/agendamentos"
                  className="hidden lg:inline-flex items-center gap-1.5 border border-border text-foreground font-ui text-xs font-semibold px-3 py-2 rounded-md hover:border-gold hover:text-gold transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Painel Admin
                </Link>
              )
            ) : (
              <a
                href={getLoginUrl()}
                className="hidden lg:inline-flex items-center gap-1.5 border border-border text-foreground font-ui text-xs font-semibold px-3 py-2 rounded-md hover:border-gold hover:text-gold transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                Área Restrita
              </a>
            )}

            <Link
              href="/agendar"
              className="hidden sm:inline-flex items-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-5 py-2.5 rounded-md hover:bg-navy-light transition-colors dark:bg-gold dark:text-navy dark:hover:bg-gold-light"
            >
              Agendar Consulta
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-foreground"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="gold-line" />
      </header>

      {/* ── Mobile Menu (CSS transition) ────────────────────── */}
      <div
        className="lg:hidden fixed left-0 right-0 bottom-0 z-40 bg-white dark:bg-background border-b border-border shadow-lg overflow-y-auto"
        style={{
          top: menuTop,
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen ? "translateY(0)" : "translateY(-8px)",
          pointerEvents: mobileOpen ? "auto" : "none",
          visibility: mobileOpen ? "visible" : "hidden",
          transition: "opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0s linear " + (mobileOpen ? "0s" : "0.2s"),
        }}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name}>
                <button
                  onClick={() => setMobileInstitutosOpen(!mobileInstitutosOpen)}
                  className="w-full flex items-center justify-between font-ui text-sm font-medium px-3 py-3 text-foreground rounded-md hover:bg-muted transition-colors"
                >
                  {link.name}
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileInstitutosOpen ? "rotate-180" : ""}`} />
                </button>
                <div
                  className="overflow-hidden"
                  style={{
                    maxHeight: mobileInstitutosOpen ? "500px" : "0",
                    opacity: mobileInstitutosOpen ? 1 : 0,
                    transition: "max-height 0.3s ease-out, opacity 0.2s ease-out",
                  }}
                >
                  {link.children.map((inst) => (
                    <Link
                      key={inst.href}
                      href={inst.href}
                      className="flex items-center gap-3 pl-6 pr-3 py-2.5 hover:bg-muted/50 rounded-md transition-colors"
                    >
                      <img src={inst.logo} alt={`Logotipo ${inst.name} — Drudi e Almeida`} className="w-8 h-8 object-contain rounded" loading="lazy" decoding="async" width={32} height={32} />
                      <div>
                        <p className="font-ui text-sm text-foreground">{inst.name}</p>
                        <p className="font-body text-xs text-muted-foreground line-clamp-1">{inst.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className={`font-ui text-sm font-medium px-3 py-3 rounded-md transition-colors hover:bg-muted ${
                  location === link.href ? "text-gold" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            )
          )}

          {isHome && (
            <button
              onClick={() => { scrollToAnchor("#unidades"); setMobileOpen(false); }}
              className="w-full text-left font-ui text-sm font-medium px-3 py-3 rounded-md transition-colors hover:bg-muted text-foreground"
            >
              Unidades
            </button>
          )}

          <div className="pt-3 mt-2 border-t border-border flex flex-col gap-2">
            {isAuthenticated ? (
              user?.role === "admin" && (
                <Link
                  href="/admin/agendamentos"
                  className="flex items-center justify-center gap-2 border border-border text-foreground font-ui text-sm font-semibold px-5 py-3 rounded-md w-full hover:border-gold hover:text-gold transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Painel Admin
                </Link>
              )
            ) : (
              <a
                href={getLoginUrl()}
                className="flex items-center justify-center gap-2 border border-border text-foreground font-ui text-sm font-semibold px-5 py-3 rounded-md w-full hover:border-gold hover:text-gold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Área Restrita
              </a>
            )}
            <Link
              href="/agendar"
              className="flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-semibold px-5 py-3 rounded-md w-full dark:bg-gold dark:text-navy"
            >
              Agendar Consulta
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
