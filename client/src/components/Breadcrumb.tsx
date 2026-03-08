/* ============================================================
   Breadcrumb — Drudi e Almeida
   Reusable breadcrumb navigation for internal pages.
   Renders structured JSON-LD for SEO (BreadcrumbList schema).
   CSS animations only — no framer-motion dependency
   ============================================================ */
import { Link } from "wouter";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string; // omit for the current (last) item
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: Props) {
  const allItems: BreadcrumbItem[] = [{ label: "Início", href: "/" }, ...items];

  // Build JSON-LD BreadcrumbList
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: allItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href
        ? { item: `https://drudiealmeida.com.br${item.href}` }
        : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Visual breadcrumb */}
      <nav
        aria-label="Navegação estrutural"
        className={`flex items-center gap-1 flex-wrap font-ui text-sm text-muted-foreground animate-fade-in ${className}`}
      >
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          return (
            <span key={index} className="flex items-center gap-1">
              {index === 0 && (
                <Home className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-gold transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "text-foreground font-medium" : ""}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" aria-hidden="true" />
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
}
