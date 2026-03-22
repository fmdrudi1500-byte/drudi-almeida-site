/**
 * SEO Meta Tags Server-Side Injection
 * 
 * Este módulo resolve o problema crítico de SEO do SPA:
 * O Googlebot recebe o mesmo index.html para todas as URLs.
 * Este middleware injeta title, description, canonical e OG tags
 * corretos no HTML ANTES de servir, garantindo que cada página
 * tenha meta tags únicas visíveis no código-fonte inicial.
 */

const BASE_URL = "https://institutodrudiealmeida.com.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default_4b70bdbb.png`;
const BRAND = "Drudi e Almeida";

interface PageMeta {
  title: string;
  description: string;
  canonical: string;
  ogType?: string;
  ogImage?: string;
  keywords?: string;
  breadcrumbs?: { name: string; url: string }[];
}

/**
 * Mapa de meta tags por rota.
 * Cada rota tem title, description e canonical únicos.
 * Títulos seguem o formato: "Keyword Principal | Drudi e Almeida" (máx 60 chars)
 * Descriptions: máx 160 chars, com CTA e localização.
 */
const ROUTE_META: Record<string, PageMeta> = {
  "/": {
    title: `Oftalmologista em São Paulo — ${BRAND}`,
    description:
      "Clínica oftalmológica com 5 institutos especializados em São Paulo. Catarata, glaucoma, retina, ceratocone e estrabismo. 5 unidades. Agende: (11) 5430-2421.",
    canonical: "/",
    keywords:
      "oftalmologista São Paulo, clínica de olhos SP, cirurgia catarata, ceratocone, glaucoma, retina, estrabismo, Drudi e Almeida",
  },
  "/sobre": {
    title: `Sobre a ${BRAND} — Oftalmologia de Referência em SP`,
    description:
      "Conheça a história da Drudi e Almeida Oftalmologia, fundada pelo Dr. Fernando Drudi e Dra. Priscilla de Almeida. +10 anos de experiência em saúde ocular.",
    canonical: "/sobre",
    keywords:
      "Drudi e Almeida, oftalmologia São Paulo, Dr. Fernando Drudi, Dra. Priscilla Almeida",
  },
  "/tecnologia": {
    title: `Tecnologia em Oftalmologia — 14 Equipamentos — ${BRAND}`,
    description:
      "Conheça os equipamentos de ponta: Pentacam AXL, OCT Spectralis, laser femtossegundo, facoemulsificação Centurion e mais. Diagnósticos precisos em SP.",
    canonical: "/tecnologia",
    keywords:
      "tecnologia oftalmológica, Pentacam, OCT, laser femtossegundo, facoemulsificação, equipamentos oftalmologia",
  },
  "/instituto/catarata": {
    title: `Cirurgia de Catarata em SP — Instituto da Catarata — ${BRAND}`,
    description:
      "Cirurgia de catarata com lentes multifocais, tóricas e monofocais em São Paulo. Atendemos Bradesco, Amil, Unimed. Agende sua avaliação: (11) 5430-2421.",
    canonical: "/instituto/catarata",
    keywords:
      "cirurgia de catarata SP, cirurgia catarata São Paulo, lente intraocular, facoemulsificação, catarata tratamento",
  },
  "/instituto/glaucoma": {
    title: `Tratamento de Glaucoma em São Paulo — ${BRAND}`,
    description:
      "Tratamento completo de glaucoma: colírios, laser SLT, cirurgia MIGS e trabeculectomia. Diagnóstico precoce com OCT e campo visual. 5 unidades em SP.",
    canonical: "/instituto/glaucoma",
    keywords:
      "glaucoma tratamento, glaucoma São Paulo, pressão ocular, campo visual, OCT glaucoma, laser SLT",
  },
  "/instituto/retina": {
    title: `Especialista em Retina SP — Cirurgia e Tratamento — ${BRAND}`,
    description:
      "Especialistas em retina cirúrgica: vitrectomia, injeção intravítrea, laser. Tratamento de descolamento de retina e retinopatia diabética em São Paulo.",
    canonical: "/instituto/retina",
    keywords:
      "retina cirúrgica SP, vitrectomia, injeção intravítrea, descolamento retina, retinopatia diabética",
  },
  "/instituto/ceratocone": {
    title: `Ceratocone: Crosslinking e Tratamento em SP — ${BRAND}`,
    description:
      "Tratamento de ceratocone em SP: crosslinking, anel intracorneal e lentes especiais. Diagnóstico com Pentacam AXL. Dra. Priscilla de Almeida. Agende.",
    canonical: "/instituto/ceratocone",
    keywords:
      "ceratocone tratamento, crosslinking SP, anel de Ferrara, lentes ceratocone, Pentacam",
  },
  "/instituto/estrabismo": {
    title: `Cirurgia de Estrabismo em São Paulo — ${BRAND}`,
    description:
      "Cirurgia de estrabismo para crianças e adultos em São Paulo. Técnicas modernas com recuperação rápida. Agende avaliação: (11) 5430-2421.",
    canonical: "/instituto/estrabismo",
    keywords:
      "cirurgia estrabismo SP, estrabismo infantil, estrabismo adulto, olho torto tratamento",
  },
  "/convenios": {
    title: `Convênios Aceitos — Bradesco, Amil, Unimed — ${BRAND}`,
    description:
      "Confira os convênios aceitos: Bradesco, Amil, Unimed, SulAmérica, Prevent Senior e mais. Atendimento particular e por planos em 5 unidades em SP.",
    canonical: "/convenios",
    keywords:
      "convênios oftalmologia SP, planos de saúde aceitos, Bradesco oftalmologista, Amil oftalmologista",
  },
  "/contato": {
    title: `Contato e Unidades — 5 Clínicas em SP — ${BRAND}`,
    description:
      "Entre em contato com a Drudi e Almeida. Tel: (11) 5430-2421. WhatsApp: (11) 91654-4653. 5 unidades: Guarulhos, Lapa, Santana, São Miguel e Tatuapé.",
    canonical: "/contato",
    keywords:
      "Drudi e Almeida contato, oftalmologista Guarulhos, oftalmologista Lapa, oftalmologista Santana, oftalmologista Tatuapé",
  },
  "/blog": {
    title: `Blog de Oftalmologia — Dicas e Informações — ${BRAND}`,
    description:
      "Artigos sobre saúde ocular, catarata, ceratocone, glaucoma, retina e estrabismo. Conteúdo educativo pelos especialistas da Drudi e Almeida.",
    canonical: "/blog",
    keywords:
      "blog oftalmologia, saúde ocular, dicas visão, catarata, glaucoma, ceratocone",
  },
  "/agendar": {
    title: `Agendar Consulta Online — ${BRAND}`,
    description:
      "Agende sua consulta oftalmológica online. Escolha a unidade, data e horário. Confirmação por e-mail. 5 unidades em São Paulo e Guarulhos.",
    canonical: "/agendar",
    keywords:
      "agendar consulta oftalmologista, consulta oftalmologia online, agendar oftalmologista SP",
  },
  "/trabalhe-conosco": {
    title: `Trabalhe Conosco — Vagas em Oftalmologia — ${BRAND}`,
    description:
      "Faça parte da equipe Drudi e Almeida Oftalmologia. Envie seu currículo para nossas 5 unidades em São Paulo e Guarulhos.",
    canonical: "/trabalhe-conosco",
    keywords:
      "vagas oftalmologia SP, trabalhe conosco clínica, emprego oftalmologia São Paulo",
  },
  "/politica-de-privacidade": {
    title: `Política de Privacidade — ${BRAND}`,
    description:
      "Política de privacidade e proteção de dados da Drudi e Almeida Oftalmologia, conforme a LGPD.",
    canonical: "/politica-de-privacidade",
  },
  "/unidade/guarulhos": {
    title: `Oftalmologista em Guarulhos — Clínica de Olhos — ${BRAND}`,
    description:
      "Clínica oftalmológica em Guarulhos Centro. Cirurgia de catarata, glaucoma, retina, ceratocone e estrabismo. Agende: (11) 5430-2421.",
    canonical: "/unidade/guarulhos",
    keywords:
      "oftalmologista Guarulhos, clínica de olhos Guarulhos, cirurgia catarata Guarulhos, oftalmologia Guarulhos",
    breadcrumbs: [
      { name: "Início", url: "/" },
      { name: "Unidades", url: "/contato" },
      { name: "Guarulhos", url: "/unidade/guarulhos" },
    ],
  },
  "/unidade/lapa": {
    title: `Oftalmologista na Lapa — Clínica de Olhos — ${BRAND}`,
    description:
      "Clínica oftalmológica na Lapa, zona oeste de São Paulo. Catarata, glaucoma, retina, ceratocone e estrabismo. Agende: (11) 5430-2421.",
    canonical: "/unidade/lapa",
    keywords:
      "oftalmologista Lapa SP, clínica de olhos Lapa, cirurgia catarata Lapa, oftalmologia zona oeste SP",
    breadcrumbs: [
      { name: "Início", url: "/" },
      { name: "Unidades", url: "/contato" },
      { name: "Lapa", url: "/unidade/lapa" },
    ],
  },
  "/unidade/santana": {
    title: `Oftalmologista em Santana — Clínica de Olhos — ${BRAND}`,
    description:
      "Clínica oftalmológica em Santana, zona norte de São Paulo. Catarata, glaucoma, retina, ceratocone e estrabismo. Próximo ao metrô. Agende: (11) 5430-2421.",
    canonical: "/unidade/santana",
    keywords:
      "oftalmologista Santana SP, clínica de olhos Santana, cirurgia catarata zona norte SP, oftalmologia Santana",
    breadcrumbs: [
      { name: "Início", url: "/" },
      { name: "Unidades", url: "/contato" },
      { name: "Santana", url: "/unidade/santana" },
    ],
  },
  "/unidade/sao-miguel": {
    title: `Oftalmologista em São Miguel Paulista — Clínica de Olhos — ${BRAND}`,
    description:
      "Clínica oftalmológica em São Miguel Paulista, zona leste de São Paulo. Catarata, glaucoma, retina, ceratocone e estrabismo. Agende: (11) 5430-2421.",
    canonical: "/unidade/sao-miguel",
    keywords:
      "oftalmologista São Miguel Paulista, clínica de olhos zona leste SP, cirurgia catarata zona leste, oftalmologia São Miguel",
    breadcrumbs: [
      { name: "Início", url: "/" },
      { name: "Unidades", url: "/contato" },
      { name: "São Miguel Paulista", url: "/unidade/sao-miguel" },
    ],
  },
  "/unidade/tatuape": {
    title: `Oftalmologista no Tatuapé — Clínica de Olhos — ${BRAND}`,
    description:
      "Clínica oftalmológica no Tatuapé, zona leste de São Paulo. Catarata, glaucoma, retina, ceratocone e estrabismo. Agende: (11) 5430-2421.",
    canonical: "/unidade/tatuape",
    keywords:
      "oftalmologista Tatuapé, clínica de olhos Tatuapé, cirurgia catarata Tatuapé, oftalmologia zona leste SP",
    breadcrumbs: [
      { name: "Início", url: "/" },
      { name: "Unidades", url: "/contato" },
      { name: "Tatuapé", url: "/unidade/tatuape" },
    ],
  },
};

/**
 * Retorna as meta tags para uma rota específica.
 * Para rotas dinâmicas (blog posts), retorna meta tags genéricas
 * que serão sobrescritas pelo react-helmet no client-side.
 */
export function getMetaForRoute(pathname: string): PageMeta {
  // Exact match first
  if (ROUTE_META[pathname]) {
    return ROUTE_META[pathname];
  }

  // Blog post pattern: /blog/:slug
  if (pathname.startsWith("/blog/")) {
    const slug = pathname.replace("/blog/", "");
    return {
      title: `${slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} — Blog ${BRAND}`,
      description: `Leia este artigo sobre saúde ocular no blog da ${BRAND}. Conteúdo educativo elaborado por especialistas.`,
      canonical: pathname,
      ogType: "article",
    };
  }

  // Admin pages: noindex
  if (pathname.startsWith("/admin")) {
    return {
      title: `Admin — ${BRAND}`,
      description: "Painel administrativo.",
      canonical: pathname,
    };
  }

  // Default fallback
  return {
    title: `${BRAND} — Clínicas Oftalmológicas em São Paulo`,
    description:
      "Clínica oftalmológica com 5 institutos especializados em São Paulo. Catarata, glaucoma, retina, ceratocone e estrabismo. Agende: (11) 5430-2421.",
    canonical: pathname,
  };
}

/**
 * Injeta meta tags no HTML template antes de servir.
 * Substitui as meta tags estáticas do index.html pelas dinâmicas da rota.
 */
export function injectMetaTags(html: string, pathname: string): string {
  const meta = getMetaForRoute(pathname);
  const canonicalUrl = `${BASE_URL}${meta.canonical}`;
  const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
  const ogType = meta.ogType || "website";

  // Replace static <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(meta.title)}</title>`
  );

  // Replace static meta description
  html = html.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`
  );

  // Replace static meta keywords
  if (meta.keywords) {
    html = html.replace(
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escapeAttr(meta.keywords)}" />`
    );
  }

  // Replace canonical URL
  html = html.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
  );

  // Replace hreflang URLs
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="pt-BR"\s+href="[^"]*"\s*\/?>/,
    `<link rel="alternate" hreflang="pt-BR" href="${escapeAttr(canonicalUrl)}" />`
  );
  html = html.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[^"]*"\s*\/?>/,
    `<link rel="alternate" hreflang="x-default" href="${escapeAttr(canonicalUrl)}" />`
  );

  // Replace OG tags
  html = html.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeAttr(ogType)}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeAttr(ogImage)}" />`
  );

  // Replace Twitter Card tags
  html = html.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`
  );
  html = html.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`
  );

  // Add noindex for admin pages
  if (pathname.startsWith("/admin") || pathname.startsWith("/cancelar-agendamento")) {
    html = html.replace(
      /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
      `<meta name="robots" content="noindex, nofollow" />`
    );
  }

  // Inject BreadcrumbList schema for pages that have breadcrumbs
  const breadcrumbSchema = generateBreadcrumbSchema(pathname, meta);
  if (breadcrumbSchema) {
    html = html.replace(
      "</head>",
      `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>\n</head>`
    );
  }

  return html;
}

/**
 * Gera Schema BreadcrumbList para a rota.
 * Melhora a exibição no Google com breadcrumbs no SERP.
 */
function generateBreadcrumbSchema(pathname: string, meta: PageMeta): Record<string, unknown> | null {
  // Use custom breadcrumbs if defined
  if (meta.breadcrumbs && meta.breadcrumbs.length > 0) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: meta.breadcrumbs.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: `${BASE_URL}${crumb.url}`,
      })),
    };
  }

  // Auto-generate breadcrumbs from URL structure
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const breadcrumbs: { name: string; url: string }[] = [
    { name: "Início", url: "/" },
  ];

  const segmentNames: Record<string, string> = {
    instituto: "Institutos",
    catarata: "Catarata",
    ceratocone: "Ceratocone",
    glaucoma: "Glaucoma",
    retina: "Retina",
    estrabismo: "Estrabismo",
    sobre: "Sobre Nós",
    tecnologia: "Tecnologia",
    convenios: "Convênios",
    contato: "Contato",
    blog: "Blog",
    agendar: "Agendar",
    unidade: "Unidades",
  };

  let currentPath = "";
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const name = segmentNames[segment] || segment.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
    breadcrumbs.push({ name, url: currentPath });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: `${BASE_URL}${crumb.url}`,
    })),
  };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
