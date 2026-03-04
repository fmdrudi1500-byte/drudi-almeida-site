# Bundle Analysis — Critical Path

## Bundle principal (index.js = 262KB gzip 80KB)
Importa TODOS os vendor chunks porque:

### Cadeia de dependências do bundle principal:
```
main.tsx
  → @/lib/trpc (→ @trpc/react-query → vendor-trpc 98KB)
  → @trpc/client (→ vendor-trpc)
  → @tanstack/react-query (→ vendor-trpc)
  → superjson (→ vendor-trpc)
  → App.tsx
    → @/components/ui/sonner (→ sonner → vendor-sonner 33KB)
    → react-helmet-async (→ vendor-helmet 14KB)
    → @/components/ui/tooltip (→ @radix-ui/react-tooltip → vendor-radix 92KB)
    → NotFound (→ @/components/ui/button → @radix-ui/react-slot → vendor-radix)
    → Layout
      → Header (lucide-react → vendor-icons 39KB)
      → Footer (lucide-react → vendor-icons)
      → UrgencyBar (lucide-react → vendor-icons)
    → ErrorBoundary (lucide-react → vendor-icons)
    → ScrollToTopButton (lucide-react → vendor-icons)
```

## Problema: vendor-framer (123KB) no index.js
O framer-motion NÃO é importado por nenhum componente no caminho crítico.
Mas o index.js ainda o referencia. Isso pode ser porque:
1. Vite tree-shaking não consegue eliminar a referência
2. Algum chunk compartilhado o puxa

## Estratégia de otimização:
1. Lazy load Toaster (sonner) — não precisa estar no render inicial
2. Lazy load HelmetProvider — SEO já está no HTML estático
3. Lazy load TooltipProvider — não usado na Home
4. Mover NotFound para lazy load
5. Reduzir lucide-react: usar SVG inline para ícones no Header/Footer
6. Investigar por que vendor-framer está no index.js
