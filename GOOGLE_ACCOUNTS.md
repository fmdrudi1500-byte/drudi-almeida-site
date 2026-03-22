# Contas Google — Drudi e Almeida

> Documento de referência interno. Não compartilhar publicamente.

## Mapeamento de Contas por Serviço

| Serviço | Conta | Permissão |
|---|---|---|
| Google Search Console | contato@drudiealmeida.com | Proprietária do domínio |
| Google Analytics | drudialmeida@gmail.com | Administrador |
| Google Ads | drudialmeida@gmail.com | Administrador |
| Google Calendar (agendas das unidades) | fmdrudi1500@gmail.com | Autorização OAuth2 |
| Google Cloud Console (projeto OAuth) | contato@drudiealmeida.com | Proprietária do projeto |
| OAuth Refresh Token (servidor) | fmdrudi1500@gmail.com | Token ativo com escopos Calendar + Search Console |

## Projeto Google Cloud

- **Nome do projeto:** Drudi e Almeida Agendamento
- **ID do projeto:** `drudi-e-almeida-agendamento`
- **Organização:** drudiealmeida.com
- **Client ID:** `1037474091907-vdfj6c8pecids00r3or42s3js2hg6ruq.apps.googleusercontent.com`
- **Status do app OAuth:** Em produção (público)

## Token OAuth2 Atual (GOOGLE_REFRESH_TOKEN)

- **Conta:** fmdrudi1500@gmail.com
- **Escopos autorizados:**
  - `https://www.googleapis.com/auth/calendar` — Google Agenda (todas as unidades)
  - `https://www.googleapis.com/auth/webmasters` — Google Search Console
- **Usado para:** agendamento de consultas + submissão de sitemap via API

## Observações Importantes

1. O **Google Search Console** foi verificado com a conta `contato@drudiealmeida.com` via Tag HTML (meta tag no `<head>` do site). **Não remover a meta tag** ou a verificação será perdida.

2. O **token OAuth2** foi gerado com `fmdrudi1500@gmail.com` porque essa conta foi adicionada como proprietária no Search Console. A conta `contato@drudiealmeida.com` é a proprietária original do domínio no Search Console.

3. Se precisar regenerar o token, acesse:
   ```
   https://institutodrudiealmeida.com.br/api/google-auth/start-gsc?secret=drudi2024setup
   ```
   E autorize com a conta que tem permissão no Search Console (`fmdrudi1500@gmail.com` ou `contato@drudiealmeida.com`).

4. Para integrar o Google Analytics ao site, usar as credenciais do `drudialmeida@gmail.com`.

## Senhas (armazenar com segurança)

> ⚠️ Remover este bloco após anotar em gerenciador de senhas seguro.

- `fmdrudi1500@gmail.com` — Einstein$$871!@
- `contato@drudiealmeida.com` — Einstein$$871!@
- `drudialmeida@gmail.com` — Einstin$$871@
