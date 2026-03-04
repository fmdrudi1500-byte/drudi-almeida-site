import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
}

const BASE_URL = "https://drudiealmeida.com.br";
const DEFAULT_OG_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/TAgHZnKQbefMatka_4b70bdbb.png";

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

function setSchema(schema: object | object[]) {
  const existing = document.querySelector('script[data-seo-schema]');
  if (existing) existing.remove();
  const el = document.createElement("script");
  el.type = "application/ld+json";
  el.setAttribute("data-seo-schema", "true");
  el.textContent = JSON.stringify(schema);
  document.head.appendChild(el);
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalPath = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
}: SEOHeadProps) {
  const fullTitle = `${title} | Drudi e Almeida Oftalmologia`;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  useEffect(() => {
    document.title = fullTitle;
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setCanonical(canonicalUrl);

    // Open Graph
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType, "property");
    setMeta("og:url", canonicalUrl, "property");
    setMeta("og:image", ogImage, "property");
    setMeta("og:locale", "pt_BR", "property");
    setMeta("og:site_name", "Drudi e Almeida Oftalmologia", "property");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Schema.org JSON-LD
    if (schema) setSchema(schema);
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
}
