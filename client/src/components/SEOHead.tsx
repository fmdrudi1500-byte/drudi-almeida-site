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

function setMeta(property: string, content: string, isName = false) {
  const attr = isName ? "name" : "property";
  let el = document.querySelector(`meta[${attr}="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, property);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
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
    // Title
    document.title = fullTitle;

    // Meta description & keywords
    setMeta("description", description, true);
    if (keywords) setMeta("keywords", keywords, true);

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta("og:title", fullTitle);
    setMeta("og:description", description);
    setMeta("og:type", ogType);
    setMeta("og:url", canonicalUrl);
    setMeta("og:image", ogImage);
    setMeta("og:locale", "pt_BR");
    setMeta("og:site_name", "Drudi e Almeida Oftalmologia");

    // Twitter Card
    setMeta("twitter:card", "summary_large_image", true);
    setMeta("twitter:title", fullTitle, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:image", ogImage, true);

    // Schema.org JSON-LD
    let scriptEl: HTMLScriptElement | null = null;
    if (schema) {
      scriptEl = document.createElement("script");
      scriptEl.type = "application/ld+json";
      scriptEl.textContent = JSON.stringify(schema);
      document.head.appendChild(scriptEl);
    }

    return () => {
      if (scriptEl && scriptEl.parentNode) {
        scriptEl.parentNode.removeChild(scriptEl);
      }
    };
  }, [fullTitle, description, keywords, canonicalUrl, ogImage, ogType, schema]);

  return null;
}
