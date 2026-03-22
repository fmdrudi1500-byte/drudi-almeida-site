# Diagnóstico SEO — Drudi e Almeida Oftalmologia
**Data:** Março 2026 | **Domínio:** institutodrudiealmeida.com.br

---

## 1. Estado Atual da Indexação

O site **já está indexado pelo Google**. A pesquisa `site:institutodrudiealmeida.com.br` retorna resultados orgânicos, incluindo a homepage, páginas institucionais e artigos do blog. Isso confirma que o Googlebot já rastreou e indexou parte do conteúdo.

**Situação atual:**
- Páginas indexadas no Google: ~10–15 (estimativa pela pesquisa site:)
- Páginas no sitemap (produção): **25 URLs**
- Páginas no sitemap (desenvolvimento): **64 URLs** — os 43 artigos e todas as páginas ainda não foram publicados no sitemap de produção
- Sitemap submetido ao Search Console: **Sim** (após configuração desta sessão)

**Gap crítico:** O sitemap em produção tem apenas 25 URLs, mas o servidor de desenvolvimento serve 64. Os 39 artigos novos (incluindo os 10 locais) **ainda não estão no sitemap de produção**. Isso ocorre porque o banco de dados de produção pode não ter os artigos criados no ambiente de desenvolvimento.

---

## 2. Auditoria Técnica SEO

| Item | Status | Observação |
|---|---|---|
| robots.txt | ✅ Correto | Permite todos os crawlers, bloqueia /api/, inclui Sitemap |
| sitemap.xml | ⚠️ Parcial | 25 URLs em produção vs 64 no dev |
| Meta tags (title/description) | ✅ Implementado | SEOHead em todas as páginas |
| Schema Markup — MedicalClinic | ✅ Implementado | SchemaMarkup component na Home |
| Schema Markup — Physician | ✅ Implementado | PhysicianSchema nas páginas de médicos |
| Schema Markup — Article (blog) | ✅ Implementado | MedicalWebPage + BreadcrumbList |
| Schema Markup — FAQPage | ⚠️ Parcial | Apenas na Home, falta nos institutos |
| Canonical URLs | ⚠️ Verificar | Não confirmado se há tags canonical |
| HTTPS | ✅ Ativo | Certificado SSL válido |
| Domínio canônico | ⚠️ Verificar | drudiealmeida.com redireciona para institutodrudiealmeida.com.br |
| Google Search Console | ✅ Verificado | Meta tag HTML, conta fmdrudi1500@gmail.com |
| Google Analytics | ❌ Não integrado | Necessário adicionar GA4 |
| Core Web Vitals | ❌ Não medido | Necessário executar PageSpeed Insights |
| Links internos automáticos | ✅ Implementado | Até 5 links por artigo |
| Open Graph / Twitter Cards | ⚠️ Verificar | Necessário confirmar implementação |

---

## 3. Análise de Keywords e Concorrência

### Keywords de Alto Volume (oportunidades principais)

| Keyword | Intenção | Concorrência | Página Atual |
|---|---|---|---|
| oftalmologista São Paulo | Transacional | Alta | Homepage |
| cirurgia de catarata SP | Transacional | Alta | Instituto Catarata |
| ceratocone tratamento SP | Transacional | Média | Instituto Ceratocone |
| glaucoma especialista SP | Transacional | Média | Instituto Glaucoma |
| oftalmologista Guarulhos | Local | Baixa | Artigo blog |
| oftalmologista Santana SP | Local | Baixa | Artigo blog |
| oftalmologista Tatuapé | Local | Baixa | Artigo blog |
| retina especialista São Paulo | Transacional | Média | Instituto Retina |
| crosslinking ceratocone SP | Transacional | Baixa | Falta página dedicada |
| lente intraocular premium SP | Transacional | Baixa | Falta página dedicada |

### Concorrentes Identificados

- **IMO (imo.com.br)** — maior referência em SP, domínio de autoridade muito alto
- **Hospital H.Olhos** — forte em catarata e cirurgias complexas
- **Clínica Oftovision** — boa presença em blog e SEO local
- **Nosé Oftalmologia** — forte em corpo clínico e especialidades
- **Eyexpert** — boa cobertura de especialidades

---

## 4. Roadmap SEO Priorizado

### 🔴 Prioridade Alta (implementar nos próximos 30 dias)

**4.1 Sincronizar banco de dados de produção**
Os 43 artigos criados no ambiente de desenvolvimento precisam estar no banco de produção. O sitemap de produção mostra apenas 25 URLs — os artigos novos (IDs 120001–130010) provavelmente não foram migrados para produção.

**4.2 Integrar Google Analytics 4**
Sem GA4, não há como medir tráfego, origem das visitas, conversões (cliques em WhatsApp/telefone) ou comportamento dos usuários. É a base para qualquer decisão de SEO.

**4.3 Adicionar tags Canonical**
Garantir que cada página tenha `<link rel="canonical">` para evitar conteúdo duplicado entre `www.` e sem `www.`, e entre os domínios `drudiealmeida.com` e `institutodrudiealmeida.com.br`.

**4.4 Medir Core Web Vitals**
Executar o PageSpeed Insights para identificar problemas de performance (LCP, CLS, FID) que afetam diretamente o ranqueamento. Sites médicos com boa performance têm vantagem significativa.

### 🟡 Prioridade Média (próximos 60 dias)

**4.5 FAQPage Schema nos Institutos**
Adicionar `FAQPage` JSON-LD nas páginas de catarata, ceratocone, glaucoma, retina e estrabismo. Perguntas frequentes aparecem como acordeões nos resultados do Google, aumentando o CTR em 15–30%.

**4.6 Páginas de Procedimentos Específicos**
Criar páginas dedicadas para procedimentos de alto volume de busca que ainda não existem:
- `/procedimento/crosslinking` — tratamento do ceratocone
- `/procedimento/facoemulsificacao` — cirurgia de catarata
- `/procedimento/laser-retina` — tratamento da retina
- `/procedimento/trabeculoplastia` — glaucoma

**4.7 Google Business Profile (Maps)**
Verificar e otimizar os perfis do Google Meu Negócio para cada unidade (Guarulhos, Santana, Tatuapé, Lapa, São Miguel). Avaliações e fotos atualizadas impactam diretamente o ranqueamento local.

**4.8 Open Graph e Twitter Cards**
Garantir que todas as páginas tenham meta tags OG corretas para compartilhamento em redes sociais — título, descrição, imagem 1200×630px.

### 🟢 Prioridade Baixa (próximos 90 dias)

**4.9 Review Schema (Depoimentos)**
Criar página de depoimentos com `AggregateRating` JSON-LD. Estrelas nos resultados de busca aumentam o CTR em até 30% para clínicas médicas.

**4.10 Monitoramento Automático do Sitemap**
Criar job semanal (toda segunda-feira) que submete o sitemap ao Google Search Console automaticamente, garantindo indexação rápida de novos artigos.

**4.11 Hreflang (se expandir para outras regiões)**
Não necessário agora, mas relevante se o site passar a ter conteúdo em inglês ou espanhol para pacientes internacionais.

**4.12 Breadcrumbs visuais**
Adicionar breadcrumbs visíveis nas páginas de instituto e artigos do blog — já existe o Schema, mas a navegação visual reforça a estrutura para o usuário e para o Google.

---

## 5. Próximas Ações Imediatas

1. **Verificar se os artigos novos estão em produção** — acessar o blog em `institutodrudiealmeida.com.br/blog` e confirmar se os 43 artigos aparecem
2. **Integrar Google Analytics 4** — adicionar o ID de rastreamento do `drudialmeida@gmail.com`
3. **Executar PageSpeed Insights** — medir Core Web Vitals e identificar problemas de performance
4. **Adicionar FAQPage nos institutos** — implementação rápida com alto impacto em rich snippets

---

*Documento gerado em março de 2026. Atualizar mensalmente conforme evolução do Search Console.*
