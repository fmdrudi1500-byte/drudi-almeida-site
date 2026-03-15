/* ============================================================
   Política de Privacidade — Drudi e Almeida
   Conforme Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)
   ============================================================ */
import { Shield, Lock, Eye, FileText, Mail, Phone, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import SEOHead from "@/components/SEOHead";
import AnimateOnScroll from "@/components/AnimateOnScroll";

const LAST_UPDATE = "15 de março de 2026";
const CNPJ = "40.106.607/0001-75";
const RAZAO_SOCIAL = "Drudi e Almeida Participações Ltda";
const NOME_FANTASIA = "Drudi e Almeida Clínicas Oftalmológicas";
const ENDERECO = "Rua Dr. César, 130 — Santana, São Paulo/SP — CEP 02013-001";
const EMAIL_DPO = "privacidade@institutodrudiealmeida.com.br";
const WHATSAPP = "https://wa.me/5511916544653";
const TEL_DISPLAY = "(11) 91654-4653";

const sections = [
  {
    id: "controlador",
    icon: Shield,
    title: "1. Identificação do Controlador",
  },
  {
    id: "dados-coletados",
    icon: FileText,
    title: "2. Dados Pessoais Coletados",
  },
  {
    id: "finalidades",
    icon: Eye,
    title: "3. Finalidades do Tratamento",
  },
  {
    id: "base-legal",
    icon: Lock,
    title: "4. Base Legal",
  },
  {
    id: "compartilhamento",
    icon: Shield,
    title: "5. Compartilhamento de Dados",
  },
  {
    id: "retencao",
    icon: FileText,
    title: "6. Retenção e Eliminação",
  },
  {
    id: "cookies",
    icon: Eye,
    title: "7. Cookies e Tecnologias de Rastreamento",
  },
  {
    id: "direitos",
    icon: Lock,
    title: "8. Direitos do Titular",
  },
  {
    id: "seguranca",
    icon: Shield,
    title: "9. Segurança dos Dados",
  },
  {
    id: "menores",
    icon: FileText,
    title: "10. Menores de Idade",
  },
  {
    id: "alteracoes",
    icon: Eye,
    title: "11. Alterações desta Política",
  },
  {
    id: "contato",
    icon: Mail,
    title: "12. Contato e Encarregado (DPO)",
  },
];

export default function PoliticaPrivacidade() {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <SEOHead
        title="Política de Privacidade — LGPD"
        description="Política de Privacidade da Drudi e Almeida Clínicas Oftalmológicas. Saiba como tratamos seus dados pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018)."
        keywords="política de privacidade, LGPD, proteção de dados, Drudi e Almeida, oftalmologia"
        canonicalPath="/politica-de-privacidade"
      />

      {/* ── HERO ── */}
      <section className="relative bg-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url(/images/starry-night-hero-v3-JqwHFQEiozpvaSGrn5zcqj.webp)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
        <div className="relative container py-16 pb-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-cream/60 font-ui text-xs tracking-wide mb-6">
            <Link href="/" className="hover:text-gold transition-colors">Início</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cream/80">Política de Privacidade</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-gold" />
            </div>
            <div>
              <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
                Conformidade LGPD
              </span>
              <h1 className="font-display text-3xl md:text-4xl text-cream leading-tight mt-1">
                Política de <span className="text-gold italic">Privacidade</span>
              </h1>
            </div>
          </div>
          <p className="font-body text-cream/70 text-sm max-w-2xl leading-relaxed">
            Esta Política descreve como a <strong className="text-cream">{NOME_FANTASIA}</strong> coleta,
            utiliza, armazena e protege seus dados pessoais, em conformidade com a{" "}
            <strong className="text-cream">Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018)</strong>{" "}
            e demais normas aplicáveis.
          </p>
          <p className="font-ui text-xs text-cream/40 mt-4">
            Última atualização: {LAST_UPDATE}
          </p>
        </div>
      </section>

      {/* ── CONTEÚDO ── */}
      <div className="bg-background">
        <div className="container py-12 md:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">

            {/* Índice lateral */}
            <aside className="hidden lg:block sticky top-24">
              <AnimateOnScroll direction="left">
                <div className="glass rounded-xl border border-border/50 p-5">
                  <p className="font-ui text-xs font-bold tracking-widest uppercase text-gold mb-4">
                    Índice
                  </p>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => scrollTo(s.id)}
                        className="w-full text-left font-body text-sm text-muted-foreground hover:text-navy hover:bg-gold/5 px-3 py-2 rounded-lg transition-colors flex items-center gap-2 group"
                      >
                        <s.icon className="w-3.5 h-3.5 text-gold/60 group-hover:text-gold flex-shrink-0 transition-colors" />
                        {s.title}
                      </button>
                    ))}
                  </nav>
                </div>
              </AnimateOnScroll>
            </aside>

            {/* Texto principal */}
            <main className="space-y-12 font-body text-[15px] leading-relaxed text-text-body">

              {/* 1. Controlador */}
              <AnimateOnScroll>
                <section id="controlador" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">1. Identificação do Controlador</h2>
                  </div>
                  <div className="pl-11 space-y-3 text-muted-foreground">
                    <p>
                      O controlador dos dados pessoais tratados por meio deste site é:
                    </p>
                    <div className="bg-cream/60 border border-border/50 rounded-xl p-5 space-y-1.5 text-sm">
                      <p><strong className="text-navy">Razão Social:</strong> {RAZAO_SOCIAL}</p>
                      <p><strong className="text-navy">Nome Fantasia:</strong> {NOME_FANTASIA}</p>
                      <p><strong className="text-navy">CNPJ:</strong> {CNPJ}</p>
                      <p><strong className="text-navy">Endereço:</strong> {ENDERECO}</p>
                      <p><strong className="text-navy">Site:</strong> institutodrudiealmeida.com.br</p>
                      <p><strong className="text-navy">E-mail:</strong> {EMAIL_DPO}</p>
                      <p><strong className="text-navy">Telefone/WhatsApp:</strong> {TEL_DISPLAY}</p>
                    </div>
                    <p>
                      Ao acessar e utilizar nosso site, você reconhece ter lido e compreendido esta
                      Política de Privacidade e concorda com o tratamento de seus dados nos termos aqui
                      descritos.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 2. Dados Coletados */}
              <AnimateOnScroll>
                <section id="dados-coletados" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">2. Dados Pessoais Coletados</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Coletamos apenas os dados estritamente necessários para as finalidades descritas
                      nesta Política, observando os princípios da minimização e da necessidade previstos
                      no art. 6º da LGPD. Os dados coletados são:
                    </p>

                    <div className="space-y-3">
                      <div className="border border-border/60 rounded-xl overflow-hidden">
                        <div className="bg-navy/5 px-5 py-3 border-b border-border/40">
                          <p className="font-ui text-sm font-semibold text-navy">
                            2.1 Dados fornecidos diretamente pelo titular
                          </p>
                        </div>
                        <div className="p-5 space-y-2 text-sm">
                          <p className="text-muted-foreground">
                            Quando você entra em contato conosco por meio de formulários, WhatsApp ou
                            telefone, podemos coletar:
                          </p>
                          <ul className="space-y-1.5 mt-3">
                            {[
                              "Nome completo",
                              "Número de telefone e/ou WhatsApp",
                              "Endereço de e-mail",
                              "Unidade de interesse (cidade/bairro)",
                              "Mensagem ou dúvida enviada",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-gold mt-0.5 flex-shrink-0">▸</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="border border-border/60 rounded-xl overflow-hidden">
                        <div className="bg-navy/5 px-5 py-3 border-b border-border/40">
                          <p className="font-ui text-sm font-semibold text-navy">
                            2.2 Dados coletados automaticamente
                          </p>
                        </div>
                        <div className="p-5 space-y-2 text-sm">
                          <p className="text-muted-foreground">
                            Ao navegar pelo site, coletamos automaticamente dados técnicos e de
                            navegação por meio de cookies e ferramentas de análise:
                          </p>
                          <ul className="space-y-1.5 mt-3">
                            {[
                              "Endereço IP (anonimizado)",
                              "Tipo e versão do navegador",
                              "Sistema operacional e dispositivo",
                              "Páginas visitadas e tempo de permanência",
                              "Origem do acesso (mecanismo de busca, anúncio, link direto)",
                              "Identificadores de sessão e cookies de análise",
                            ].map((item) => (
                              <li key={item} className="flex items-start gap-2 text-muted-foreground">
                                <span className="text-gold mt-0.5 flex-shrink-0">▸</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm bg-gold/5 border border-gold/20 rounded-lg px-4 py-3">
                      <strong className="text-navy">Importante:</strong> Este site <strong>não coleta dados de saúde,
                      prontuários médicos ou informações sensíveis</strong> de pacientes. O tratamento de dados
                      clínicos ocorre exclusivamente nos sistemas internos das clínicas, regidos por
                      legislação específica do setor de saúde.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 3. Finalidades */}
              <AnimateOnScroll>
                <section id="finalidades" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">3. Finalidades do Tratamento</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Seus dados pessoais são tratados exclusivamente para as seguintes finalidades,
                      todas compatíveis com as bases legais aplicáveis:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        {
                          title: "Atendimento ao Contato",
                          desc: "Responder dúvidas, solicitações de agendamento e informações sobre serviços enviadas por formulário, WhatsApp ou telefone.",
                        },
                        {
                          title: "Agendamento de Consultas",
                          desc: "Processar e confirmar agendamentos de consultas e avaliações nas unidades da clínica.",
                        },
                        {
                          title: "Análise e Melhoria do Site",
                          desc: "Compreender como os usuários navegam pelo site para aprimorar a experiência, o conteúdo e a performance das páginas.",
                        },
                        {
                          title: "Marketing e Publicidade",
                          desc: "Exibir anúncios relevantes por meio do Google Ads e mensurar a efetividade das campanhas de marketing digital.",
                        },
                        {
                          title: "Cumprimento de Obrigações Legais",
                          desc: "Atender exigências de órgãos reguladores, autoridades fiscais e judiciais, quando aplicável.",
                        },
                        {
                          title: "Prevenção a Fraudes",
                          desc: "Identificar e prevenir acessos não autorizados, atividades fraudulentas ou uso indevido do site.",
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="border border-border/60 rounded-xl p-4 bg-background hover:border-gold/30 transition-colors"
                        >
                          <p className="font-ui text-sm font-semibold text-navy mb-1.5">{item.title}</p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 4. Base Legal */}
              <AnimateOnScroll>
                <section id="base-legal" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">4. Base Legal para o Tratamento</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Todo tratamento de dados realizado pela {NOME_FANTASIA} está fundamentado em uma
                      ou mais bases legais previstas no art. 7º da LGPD, conforme a tabela abaixo:
                    </p>
                    <div className="border border-border/60 rounded-xl overflow-hidden text-sm">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-navy/5 border-b border-border/40">
                            <th className="text-left px-4 py-3 font-ui font-semibold text-navy">Finalidade</th>
                            <th className="text-left px-4 py-3 font-ui font-semibold text-navy">Base Legal (LGPD)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          {[
                            ["Atendimento ao contato / agendamento", "Execução de contrato ou procedimentos preliminares (art. 7º, V)"],
                            ["Análise e melhoria do site", "Legítimo interesse (art. 7º, IX)"],
                            ["Marketing e publicidade (Google Ads)", "Consentimento (art. 7º, I)"],
                            ["Cumprimento de obrigações legais", "Cumprimento de obrigação legal (art. 7º, II)"],
                            ["Prevenção a fraudes", "Legítimo interesse (art. 7º, IX)"],
                          ].map(([fin, base]) => (
                            <tr key={fin} className="hover:bg-cream/40 transition-colors">
                              <td className="px-4 py-3 text-muted-foreground">{fin}</td>
                              <td className="px-4 py-3 text-muted-foreground">{base}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm">
                      Quando o tratamento for baseado em consentimento, você poderá revogá-lo a qualquer
                      momento, sem prejuízo da licitude dos tratamentos realizados antes da revogação.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 5. Compartilhamento */}
              <AnimateOnScroll>
                <section id="compartilhamento" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">5. Compartilhamento de Dados</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      A {NOME_FANTASIA} <strong className="text-navy">não vende, aluga ou comercializa</strong> seus
                      dados pessoais. O compartilhamento ocorre apenas nas seguintes situações e com os
                      terceiros indicados abaixo, todos sujeitos a obrigações de confidencialidade e
                      proteção de dados:
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          parceiro: "Google LLC (Google Analytics 4)",
                          finalidade: "Análise de tráfego e comportamento de navegação no site",
                          pais: "EUA",
                          garantia: "Cláusulas Contratuais Padrão (SCCs) da UE / adequação LGPD",
                        },
                        {
                          parceiro: "Google LLC (Google Ads)",
                          finalidade: "Mensuração de conversões e exibição de anúncios relevantes",
                          pais: "EUA",
                          garantia: "Cláusulas Contratuais Padrão (SCCs) da UE / adequação LGPD",
                        },
                        {
                          parceiro: "Meta Platforms (WhatsApp Business)",
                          finalidade: "Canal de comunicação e atendimento ao titular",
                          pais: "EUA",
                          garantia: "Termos de Serviço do WhatsApp Business",
                        },
                        {
                          parceiro: "Autoridades Públicas",
                          finalidade: "Cumprimento de ordem judicial, regulatória ou legal",
                          pais: "Brasil",
                          garantia: "Obrigação legal (art. 7º, II, LGPD)",
                        },
                      ].map((row) => (
                        <div key={row.parceiro} className="border border-border/60 rounded-xl p-4 text-sm">
                          <p className="font-ui font-semibold text-navy mb-2">{row.parceiro}</p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-muted-foreground">
                            <div><span className="font-semibold text-navy/70">Finalidade:</span> {row.finalidade}</div>
                            <div><span className="font-semibold text-navy/70">País:</span> {row.pais}</div>
                            <div><span className="font-semibold text-navy/70">Garantia:</span> {row.garantia}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm">
                      Transferências internacionais de dados para os EUA são realizadas com base em
                      mecanismos adequados de proteção, nos termos do art. 33 da LGPD.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 6. Retenção */}
              <AnimateOnScroll>
                <section id="retencao" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">6. Retenção e Eliminação de Dados</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Mantemos seus dados pelo tempo estritamente necessário para cumprir as finalidades
                      para as quais foram coletados, observando os prazos legais aplicáveis:
                    </p>
                    <div className="border border-border/60 rounded-xl overflow-hidden text-sm">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-navy/5 border-b border-border/40">
                            <th className="text-left px-4 py-3 font-ui font-semibold text-navy">Tipo de Dado</th>
                            <th className="text-left px-4 py-3 font-ui font-semibold text-navy">Prazo de Retenção</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border/30">
                          {[
                            ["Dados de contato (formulário/WhatsApp)", "Até 5 anos após o último contato, ou conforme exigência legal"],
                            ["Dados de agendamento", "Até 5 anos após a consulta, nos termos do CFM"],
                            ["Logs de navegação e cookies analíticos", "Até 26 meses (padrão Google Analytics 4)"],
                            ["Dados de campanhas (Google Ads)", "Até 90 dias após a conversão"],
                            ["Dados para cumprimento de obrigação legal", "Conforme prazo determinado pela legislação aplicável"],
                          ].map(([tipo, prazo]) => (
                            <tr key={tipo} className="hover:bg-cream/40 transition-colors">
                              <td className="px-4 py-3 text-muted-foreground">{tipo}</td>
                              <td className="px-4 py-3 text-muted-foreground">{prazo}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <p className="text-sm">
                      Após o término do prazo de retenção, os dados são eliminados de forma segura ou
                      anonimizados, de modo que não seja mais possível identificar o titular, conforme
                      o art. 16 da LGPD.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 7. Cookies */}
              <AnimateOnScroll>
                <section id="cookies" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">7. Cookies e Tecnologias de Rastreamento</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Utilizamos cookies e tecnologias similares para melhorar a experiência de navegação,
                      analisar o desempenho do site e exibir publicidade relevante. Os cookies utilizados
                      são classificados abaixo:
                    </p>
                    <div className="space-y-3">
                      {[
                        {
                          tipo: "Cookies Estritamente Necessários",
                          cor: "bg-green-50 border-green-200",
                          badge: "Sempre ativos",
                          badgeCor: "bg-green-100 text-green-700",
                          desc: "Essenciais para o funcionamento básico do site, como segurança de sessão e navegação entre páginas. Não podem ser desativados.",
                          exemplos: "Sessão, CSRF, preferências de idioma",
                        },
                        {
                          tipo: "Cookies Analíticos",
                          cor: "bg-blue-50 border-blue-200",
                          badge: "Requerem consentimento",
                          badgeCor: "bg-blue-100 text-blue-700",
                          desc: "Coletados pelo Google Analytics 4 para mensurar o número de visitantes, páginas mais acessadas e comportamento de navegação. Os dados são anonimizados.",
                          exemplos: "_ga, _ga_*, _gid (Google Analytics)",
                        },
                        {
                          tipo: "Cookies de Marketing",
                          cor: "bg-amber-50 border-amber-200",
                          badge: "Requerem consentimento",
                          badgeCor: "bg-amber-100 text-amber-700",
                          desc: "Utilizados pelo Google Ads para rastrear conversões e exibir anúncios personalizados com base em seus interesses e interações anteriores com o site.",
                          exemplos: "_gcl_au, _gcl_aw (Google Ads)",
                        },
                      ].map((c) => (
                        <div key={c.tipo} className={`border rounded-xl p-4 text-sm ${c.cor}`}>
                          <div className="flex items-center gap-3 mb-2">
                            <p className="font-ui font-semibold text-navy">{c.tipo}</p>
                            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.badgeCor}`}>
                              {c.badge}
                            </span>
                          </div>
                          <p className="text-muted-foreground mb-2">{c.desc}</p>
                          <p className="text-muted-foreground/70 text-xs">
                            <strong>Exemplos:</strong> {c.exemplos}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-2 text-sm">
                      <p>
                        <strong className="text-navy">Como gerenciar cookies:</strong> Você pode configurar
                        seu navegador para bloquear ou excluir cookies a qualquer momento. Observe que
                        desativar cookies analíticos e de marketing não afeta o funcionamento do site,
                        mas pode limitar a personalização de conteúdo e anúncios.
                      </p>
                      <p>
                        Para mais informações sobre como o Google utiliza os dados coletados, acesse:{" "}
                        <a
                          href="https://policies.google.com/technologies/partner-sites"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-navy font-semibold underline underline-offset-2 hover:text-gold transition-colors"
                        >
                          policies.google.com/technologies/partner-sites
                        </a>
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 8. Direitos do Titular */}
              <AnimateOnScroll>
                <section id="direitos" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Lock className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">8. Direitos do Titular dos Dados</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Nos termos dos arts. 17 a 22 da LGPD, você possui os seguintes direitos em relação
                      aos seus dados pessoais, que podem ser exercidos a qualquer momento:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { direito: "Confirmação e Acesso", desc: "Confirmar se tratamos seus dados e obter cópia das informações que mantemos sobre você." },
                        { direito: "Correção", desc: "Solicitar a atualização ou correção de dados incompletos, inexatos ou desatualizados." },
                        { direito: "Anonimização, Bloqueio ou Eliminação", desc: "Requerer que dados desnecessários, excessivos ou tratados em desconformidade com a LGPD sejam anonimizados, bloqueados ou eliminados." },
                        { direito: "Portabilidade", desc: "Solicitar a transferência de seus dados a outro fornecedor de serviço ou produto, mediante requisição expressa." },
                        { direito: "Eliminação por Consentimento", desc: "Solicitar a eliminação de dados tratados com base no seu consentimento, exceto nas hipóteses previstas em lei." },
                        { direito: "Informação sobre Compartilhamento", desc: "Obter informações sobre com quais entidades públicas e privadas seus dados são compartilhados." },
                        { direito: "Revogação do Consentimento", desc: "Revogar o consentimento a qualquer momento, sem prejuízo da licitude dos tratamentos anteriores." },
                        { direito: "Oposição", desc: "Opor-se a tratamentos realizados com fundamento em outras bases legais, em caso de descumprimento da LGPD." },
                        { direito: "Revisão de Decisões Automatizadas", desc: "Solicitar revisão de decisões tomadas unicamente com base em tratamento automatizado de dados pessoais." },
                        { direito: "Petição à ANPD", desc: "Apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD) em caso de violação dos seus direitos." },
                      ].map((d) => (
                        <div key={d.direito} className="border border-border/60 rounded-xl p-4 bg-background hover:border-gold/30 transition-colors">
                          <p className="font-ui text-sm font-semibold text-navy mb-1.5 flex items-center gap-2">
                            <span className="text-gold">✓</span> {d.direito}
                          </p>
                          <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-navy/5 border border-navy/10 rounded-xl p-4 text-sm">
                      <p className="font-ui font-semibold text-navy mb-1">Como exercer seus direitos</p>
                      <p className="text-muted-foreground">
                        Envie sua solicitação para{" "}
                        <a href={`mailto:${EMAIL_DPO}`} className="text-navy font-semibold underline underline-offset-2 hover:text-gold transition-colors">
                          {EMAIL_DPO}
                        </a>{" "}
                        ou pelo WhatsApp{" "}
                        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="text-navy font-semibold underline underline-offset-2 hover:text-gold transition-colors">
                          {TEL_DISPLAY}
                        </a>
                        . Responderemos em até <strong>15 dias úteis</strong>, conforme prazo previsto na LGPD.
                        Podemos solicitar a verificação de sua identidade antes de atender à requisição.
                      </p>
                    </div>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 9. Segurança */}
              <AnimateOnScroll>
                <section id="seguranca" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">9. Segurança dos Dados</h2>
                  </div>
                  <div className="pl-11 space-y-3 text-muted-foreground">
                    <p>
                      Adotamos medidas técnicas e organizacionais adequadas para proteger seus dados
                      pessoais contra acesso não autorizado, perda, alteração, divulgação ou destruição,
                      em conformidade com o art. 46 da LGPD e as boas práticas de segurança da informação:
                    </p>
                    <ul className="space-y-2">
                      {[
                        "Transmissão de dados criptografada via protocolo HTTPS/TLS",
                        "Controle de acesso restrito aos dados, com autenticação e autorização",
                        "Monitoramento contínuo de acessos e atividades suspeitas",
                        "Atualizações regulares de sistemas e correção de vulnerabilidades",
                        "Treinamento periódico da equipe em boas práticas de proteção de dados",
                        "Plano de resposta a incidentes de segurança",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <span className="text-gold mt-0.5 flex-shrink-0">▸</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm">
                      Em caso de incidente de segurança que possa acarretar risco ou dano relevante aos
                      titulares, notificaremos a ANPD e os titulares afetados nos prazos previstos pela
                      regulamentação vigente.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 10. Menores */}
              <AnimateOnScroll>
                <section id="menores" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">10. Menores de Idade</h2>
                  </div>
                  <div className="pl-11 space-y-3 text-muted-foreground">
                    <p>
                      Este site não é direcionado a menores de 18 anos e não coleta intencionalmente
                      dados pessoais de crianças ou adolescentes sem o consentimento expresso de seus
                      pais ou responsáveis legais, conforme exigido pelo art. 14 da LGPD.
                    </p>
                    <p>
                      Se tomarmos conhecimento de que coletamos dados de um menor sem o devido
                      consentimento, eliminaremos tais dados imediatamente. Caso você acredite que
                      coletamos dados de um menor indevidamente, entre em contato conosco pelo e-mail{" "}
                      <a href={`mailto:${EMAIL_DPO}`} className="text-navy font-semibold underline underline-offset-2 hover:text-gold transition-colors">
                        {EMAIL_DPO}
                      </a>.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 11. Alterações */}
              <AnimateOnScroll>
                <section id="alteracoes" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Eye className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">11. Alterações desta Política</h2>
                  </div>
                  <div className="pl-11 space-y-3 text-muted-foreground">
                    <p>
                      Esta Política de Privacidade pode ser atualizada periodicamente para refletir
                      mudanças em nossas práticas de tratamento de dados, na legislação aplicável ou
                      em nossos serviços. Sempre que realizarmos alterações relevantes, atualizaremos
                      a data de "Última atualização" no topo desta página.
                    </p>
                    <p>
                      Recomendamos que você revise esta Política periodicamente. O uso continuado do
                      site após a publicação de alterações constitui aceitação das novas condições.
                      Para alterações substanciais que afetem o tratamento de dados baseado em
                      consentimento, solicitaremos nova manifestação de concordância.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* 12. Contato / DPO */}
              <AnimateOnScroll>
                <section id="contato" className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-gold" />
                    </div>
                    <h2 className="font-display text-2xl text-navy">12. Contato e Encarregado (DPO)</h2>
                  </div>
                  <div className="pl-11 space-y-4 text-muted-foreground">
                    <p>
                      Para exercer seus direitos como titular, esclarecer dúvidas sobre esta Política
                      ou reportar qualquer questão relacionada ao tratamento de seus dados pessoais,
                      entre em contato com nosso Encarregado pelo Tratamento de Dados Pessoais (DPO):
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <a
                        href={`mailto:${EMAIL_DPO}`}
                        className="flex flex-col items-center gap-3 border border-border/60 rounded-xl p-5 hover:border-gold/40 hover:bg-gold/5 transition-all group text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                          <Mail className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-ui text-xs font-semibold text-navy mb-1">E-mail (DPO)</p>
                          <p className="text-sm text-muted-foreground break-all">{EMAIL_DPO}</p>
                        </div>
                      </a>
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-col items-center gap-3 border border-border/60 rounded-xl p-5 hover:border-gold/40 hover:bg-gold/5 transition-all group text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                          <Phone className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-ui text-xs font-semibold text-navy mb-1">WhatsApp</p>
                          <p className="text-sm text-muted-foreground">{TEL_DISPLAY}</p>
                        </div>
                      </a>
                      <div className="flex flex-col items-center gap-3 border border-border/60 rounded-xl p-5 text-center">
                        <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-ui text-xs font-semibold text-navy mb-1">ANPD</p>
                          <p className="text-sm text-muted-foreground">
                            <a
                              href="https://www.gov.br/anpd"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 hover:text-gold transition-colors"
                            >
                              gov.br/anpd
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm bg-gold/5 border border-gold/20 rounded-lg px-4 py-3">
                      <strong className="text-navy">Prazo de resposta:</strong> Nos comprometemos a
                      responder todas as solicitações de titulares em até <strong>15 dias úteis</strong>,
                      conforme previsto no art. 18, §5º, da LGPD.
                    </p>
                  </div>
                </section>
              </AnimateOnScroll>

              {/* Rodapé da política */}
              <div className="border-t border-border/50 pt-8 text-sm text-muted-foreground">
                <p>
                  Esta Política de Privacidade foi elaborada em conformidade com a{" "}
                  <strong className="text-navy">Lei nº 13.709/2018 (LGPD)</strong>, o{" "}
                  <strong className="text-navy">Marco Civil da Internet (Lei nº 12.965/2014)</strong> e
                  demais normas aplicáveis. Última atualização: <strong className="text-navy">{LAST_UPDATE}</strong>.
                </p>
              </div>

            </main>
          </div>
        </div>
      </div>
    </>
  );
}
