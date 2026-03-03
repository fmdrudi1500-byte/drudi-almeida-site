# Evolução do Site - SEO, Áudios e Tecnologias

## Fase 1: SEO Técnico
- [ ] Meta tags (title, description) para cada página
- [ ] Open Graph tags para compartilhamento em redes sociais
- [ ] Schema.org JSON-LD (MedicalClinic, Physician, MedicalProcedure)
- [ ] Sitemap.xml
- [ ] robots.txt
- [ ] Canonical URLs
- [ ] Alt text em todas as imagens
- [ ] Heading hierarchy (H1 único por página)

## Fase 2: Otimização de Conteúdo SEO
- [ ] Títulos otimizados para palavras-chave de cada instituto
- [ ] Meta descriptions persuasivas com CTA
- [ ] Breadcrumb Schema.org
- [ ] FAQ Schema.org nas seções de perguntas

## Fase 3: Áudios ElevenLabs
- [ ] Áudio Instituto da Catarata
- [ ] Áudio Instituto do Ceratocone
- [ ] Áudio Instituto do Glaucoma
- [ ] Áudio Instituto da Retina
- [ ] Áudio Instituto do Estrabismo

## Fase 4: Integração de Áudios no Site
- [ ] Player de áudio elegante em cada página de instituto

## Fase 5: Guia de Orientação
- [ ] Guia para registro de domínio
- [ ] Guia para chatbot WhatsApp
- [ ] Recomendações de próximos passos tecnológicos

## Fase 6: Sistema de Blog com CMS
- [x] Schema do banco de dados (posts, categorias, comentários, mídias)
- [x] API backend (CRUD completo via tRPC)
- [x] Painel admin em /admin/blog (gerenciar posts, comentários, categorias)
- [x] Editor rich text (TipTap) com formatação completa
- [x] Upload de mídias: imagens, vídeos, áudios, documentos (S3)
- [x] Página pública de blog /blog com listagem, busca e filtros
- [x] Página de artigo /blog/:slug com comentários públicos
- [x] SEO automático por IA (título, description, keywords) ao criar/publicar
- [x] Sistema de comentários com moderação no painel admin
- [x] Categorias coloridas com gerenciamento no painel admin

## Fase 7: Substituição de Imagens
- [x] Upload das 4 imagens da sala de espera para CDN
- [x] Substituir imagens na galeria do Instituto da Catarata

## Fase 8: Melhorias de Conversão e SEO
- [x] Botão flutuante do WhatsApp com ícone verde e animação de pulso
- [x] Schema.org MedicalBusiness e Physician via JSON-LD no SEOHead
- [x] Sitemap XML dinâmico e robots.txt otimizados

## Fase 9: Blog — Imagens e Artigos Relacionados
- [x] Imagens dos 5 sintomas do Ceratocone geradas e aplicadas na página (substituindo Unsplash)
- [x] Capa do artigo do blog do Ceratocone gerada e atualizada no banco de dados
- [x] Imagem de capa fotorrealista para artigo da Catarata (paciente + médica, tom claro, texto em PT)
- [x] Atualizar artigo da Catarata no banco com a nova imagem de capa
- [x] Endpoint tRPC `blog.getRelated` para buscar artigos relacionados por categoria
- [x] Seção "Artigos Relacionados" no final de cada artigo dinâmico do blog (3 cards com imagem, título, excerpt e link)
- [x] Testes vitest para o novo endpoint getRelated

## Fase 10: Correções de UX
- [x] Scroll automático para o topo ao navegar entre páginas
- [x] Redesenhar botão flutuante do WhatsApp: maior, com texto visível, posicionado mais alto no canto direito
- [x] Tooltip do WhatsApp reaparecer em cada troca de página (especialmente nos institutos)

## Fase 11: Conversão Mobile
- [x] Sticky CTA Bar mobile: barra fixa "Agendar pelo WhatsApp" sempre visível no rodapé em telas pequenas
- [x] Ocultar botão flutuante circular no mobile (redundante com a barra sticky)

## Fase 12: Seção Convênios na Home
- [x] Criar componente ConveniosCarousel com carrossel de logos reais
- [x] Atualizar logo da PROPM na página de convênios existente
- [x] Inserir seção de convênios na home entre stats e institutos
- [x] Carrossel de convênios: suporte a drag/swipe do usuário com retomada automática do loop após pausa
- [x] Mover seção de convênios para depois da seção de institutos na home

## Fase 13: Gatilhos de Urgência
- [x] Módulo 1: Micro-copy dinâmico nos CTAs do hero (por horário do dia)
- [x] Módulo 2: Barra contextual de urgência por instituto (UrgencyBar)
- [x] Módulo 3: Social proof toasts de agendamento (SocialProofToasts)

## Fase 14: Sistema de Agendamento
- [x] Configurar Resend API key e instalar dependência
- [x] Schema de agendamentos no banco de dados (tabela appointments)
- [x] Helper de e-mail: confirmação ao paciente (acolhedor, sem confirmação definitiva)
- [x] Helper de e-mail: notificação para contato@drudiealmeida.com.br
- [x] tRPC: getAvailableSlots (horários livres por unidade/data)
- [x] tRPC: createAppointment (com validação de conflito)
- [x] tRPC: listAppointments + updateStatus (para painel admin)
- [x] Página /agendar: formulário multi-step (unidade → data/hora → dados → confirmação)
- [x] Página /cancelar-agendamento para autocancelamento via link do e-mail
- [x] Painel admin /admin/agendamentos para secretaria
- [x] 13 testes vitest para validação da lógica de agendamento (18 testes no total passando)

## Fase 15: Otimização de Cache e Performance
- [x] Cache de assets estáticos com headers de longa duração (immutable)
- [x] Compressão gzip/brotli no servidor Express
- [x] Cache de respostas tRPC públicas (blog posts, SEO data)
- [x] ETag e Cache-Control para o HTML principal

## Fase 16: Correções de SEO
- [x] Reduzir meta description para até 160 caracteres com WhatsApp
- [x] Ajustar palavras-chave para no máximo 10 (remover 3, adicionar 3 novas)

## Fase 17: Melhorias Planejadas (Mar 2026)

- [ ] Migrar todas as URLs session_file para CDN permanente (Home, Tecnologia, Convênios, Ceratocone, Glaucoma, Retina, Estrabismo)
- [ ] Ativar sistema de agendamento online com e-mail de confirmação e painel admin
- [ ] Criar e publicar posts iniciais no blog com conteúdo de saúde ocular

## Fase 18: SEO Técnico Avançado e Conformidade CFM
- [x] Corrigir CRM/RQE reais da Dra. Priscilla no rodapé (CRM-SP 148.173 | RQE 59.216)
- [x] Padronizar URLs dos institutos (garantir padrão /instituto/*)
- [x] Implementar Schema Markup: MedicalOrganization, MedicalClinic, Physician, FAQPage
- [x] Atualizar meta descriptions únicas por página (máx 160 chars com localização)
- [x] Gerar sitemap XML dinâmico e expor em /sitemap.xml

## Fase 19: Melhorias de Navegação
- [x] Mega-menu com preview dos 5 institutos (ícone + nome + descrição curta)
- [x] Sticky header com barra de progresso de scroll
- [x] Âncoras internas na Home (Institutos, Tecnologia, Unidades)
- [x] Breadcrumbs nas páginas internas

## Fase 20: Stagger mega-menu, scroll-to-top e Trabalhe Conosco
- [x] Stagger animation nos cards do mega-menu (delay 40ms entre institutos)
- [x] Botão flutuante scroll-to-top (aparece após 300px de scroll)
- [x] Schema DB: tabela job_applications com campos de candidatura
- [x] tRPC procedures: submitApplication (public) + listApplications (admin)
- [x] Página Trabalhe Conosco com formulário de candidatura completo
- [x] Painel admin para visualizar e gerenciar candidaturas

## Fase 21: Ícone de tema e atualização de telefone
- [x] Trocar ícone do botão de tema para Contraste (half-circle)
- [x] Atualizar telefone fixo para (11) 5430-2421 em todo o site

## Fase 22: Correção do menu mobile
- [x] Remover duplicação de itens no menu mobile (links principais + âncoras "Ir para seção" separados)

## Fase 23: Correção de endereços e e-mail de agendamento
- [x] Corrigir endereços das unidades na página de agendamento (igualar à home)
- [x] Atualizar destinatário do e-mail de agendamento para contato@drudiealmeida.com.br (já estava correto)

## Fase 24: Acessibilidade — atributos alt descritivos
- [x] Auditar e corrigir todos os atributos alt genéricos em imagens do site

## Fase 25: Correção do e-mail de contato
- [x] Substituir contato@drudiealmeida.com.br por contato@drudiealmeida.com em todo o site

## Fase 26: Performance e redes sociais
- [x] Adicionar loading="lazy" nas imagens das páginas de instituto e componentes
- [x] Implementar Open Graph e Twitter Card com imagem específica por página no SEOHead
