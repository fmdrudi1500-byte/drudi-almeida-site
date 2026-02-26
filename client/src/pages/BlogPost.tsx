/* ============================================================
   BlogPost — Individual article page with rich content
   Optimized for AI reading with structured data
   ============================================================ */
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { blogArticles } from "./Blog";

// Full article content mapped by slug
const articleContent: Record<string, string[]> = {
  "catarata-sintomas-tratamento-guia-completo": [
    "A catarata é a principal causa de cegueira reversível no mundo, afetando milhões de pessoas, especialmente acima dos 60 anos. Trata-se da opacificação progressiva do cristalino, a lente natural do olho responsável por focar a luz na retina.",
    "Os sintomas mais comuns incluem visão embaçada ou turva, dificuldade para enxergar à noite, sensibilidade à luz, percepção desbotada das cores e necessidade frequente de trocar o grau dos óculos. Muitos pacientes descrevem a sensação de olhar através de um vidro fosco.",
    "O único tratamento eficaz para a catarata é a cirurgia. O procedimento, chamado facoemulsificação, é rápido (10-15 minutos), seguro e realizado com anestesia local por colírios. O cristalino opaco é removido e substituído por uma lente intraocular artificial.",
    "Na Drudi e Almeida, utilizamos a tecnologia do Femto Laser, que realiza as incisões e a fragmentação do cristalino de forma automatizada, com precisão submicrométrica. Isso resulta em maior segurança, previsibilidade e uma recuperação visual mais rápida.",
    "A recuperação é rápida: a maioria dos pacientes retoma atividades como ler e assistir TV já no dia seguinte. Atividades físicas intensas devem aguardar algumas semanas, conforme orientação médica.",
    "É importante saber que a catarata não volta após a cirurgia. Em alguns casos, pode ocorrer uma opacificação da cápsula posterior (chamada de 'catarata secundária'), que é facilmente tratada com uma aplicação de laser YAG em consultório, sem necessidade de nova cirurgia.",
  ],
  "ceratocone-o-que-e-e-como-tratar": [
    "O ceratocone é uma doença ocular progressiva que afeta a córnea, tornando-a mais fina e curva em formato de cone. Essa deformação causa distorção das imagens, visão embaçada e astigmatismo irregular.",
    "A doença geralmente surge na adolescência ou início da idade adulta e pode progredir por décadas. Os principais sintomas incluem visão borrada, aumento rápido do grau, sensibilidade à luz e dificuldade para enxergar à noite.",
    "O crosslinking de córnea é o tratamento padrão-ouro para estabilizar o ceratocone. Utiliza riboflavina (vitamina B2) e luz ultravioleta para fortalecer as fibras de colágeno da córnea, impedindo a progressão da doença.",
    "Outras opções incluem o implante de anel intracorneano, que regulariza a curvatura da córnea, e lentes de contato especiais (rígidas ou esclerais) para corrigir o astigmatismo irregular.",
    "É fundamental evitar coçar os olhos, pois esse hábito é um dos principais fatores associados ao desenvolvimento e progressão do ceratocone. O diagnóstico precoce através da topografia corneana é essencial.",
    "Na Drudi e Almeida, a Dra. Priscilla Rodrigues de Almeida é especialista em segmento anterior e adaptação de lentes de contato, oferecendo acompanhamento personalizado para cada estágio do ceratocone.",
  ],
  "glaucoma-ladrao-silencioso-da-visao": [
    "O glaucoma é chamado de 'ladrão silencioso da visão' porque, na maioria dos casos, não apresenta sintomas nas fases iniciais. A perda de visão ocorre de forma lenta e gradual, começando pela periferia do campo visual.",
    "Trata-se de um grupo de doenças que causam danos progressivos ao nervo óptico, geralmente associados ao aumento da pressão intraocular. Se não tratado, leva à perda irreversível da visão.",
    "Os principais fatores de risco incluem idade acima de 40 anos, histórico familiar, pressão intraocular elevada, descendência africana ou asiática, miopia elevada e diabetes.",
    "O tratamento visa controlar a pressão intraocular e pode incluir colírios, laser (trabeculoplastia seletiva) ou cirurgia. O glaucoma não tem cura, mas o tratamento adequado pode estabilizar a doença.",
    "A melhor forma de prevenção é realizar exames oftalmológicos regulares, especialmente após os 40 anos. A detecção precoce é fundamental para preservar a visão.",
    "Curiosamente, alguns historiadores da arte sugerem que El Greco pode ter tido glaucoma, o que explicaria as figuras alongadas e a perspectiva peculiar de suas pinturas — uma visão artística que pode ter sido influenciada pela perda de campo visual periférico.",
  ],
  "retinopatia-diabetica-prevencao-tratamento": [
    "A retinopatia diabética é uma complicação do diabetes que afeta os vasos sanguíneos da retina. É a principal causa de cegueira em adultos em idade produtiva nos países desenvolvidos.",
    "Nas fases iniciais, a doença é assintomática. Por isso, todo paciente diabético deve realizar exame de fundo de olho pelo menos uma vez por ano, mesmo sem queixas visuais.",
    "O controle rigoroso da glicemia, pressão arterial e colesterol é fundamental para prevenir e retardar a progressão da retinopatia diabética.",
    "Os tratamentos modernos incluem injeções intravítreas de anti-VEGF, que bloqueiam o crescimento de vasos anormais, e fotocoagulação a laser para tratar áreas de isquemia na retina.",
    "Na Drudi e Almeida, o Dr. Fernando Macei Drudi é especialista em retina cirúrgica e conta com OCT de alta resolução e mapeamento ultra-widefield para diagnóstico precoce e acompanhamento preciso da evolução da doença.",
    "A retinopatia diabética pode ser classificada em não-proliferativa (estágios iniciais) e proliferativa (estágio avançado com neovascularização). O edema macular diabético pode ocorrer em qualquer estágio e é a principal causa de baixa visual nesses pacientes.",
  ],
  "estrabismo-infantil-quando-procurar-oftalmologista": [
    "O estrabismo é uma condição em que os olhos não estão alinhados na mesma direção. Afeta cerca de 4% da população e é mais comum na infância, embora possa surgir em qualquer idade.",
    "Em crianças, o tratamento precoce é fundamental para prevenir a ambliopia (olho preguiçoso) e garantir o desenvolvimento visual adequado. O ideal é que a primeira avaliação oftalmológica seja feita até os 3 anos.",
    "Os sinais de alerta incluem: olhos que parecem não olhar na mesma direção, inclinação frequente da cabeça, fechar um olho na luz forte e dificuldade de percepção de profundidade.",
    "O tratamento pode incluir uso de óculos, tampão ocular para tratar a ambliopia, exercícios ortópticos e, quando necessário, cirurgia para ajustar os músculos extraoculares.",
    "A cirurgia de estrabismo é segura e pode ser realizada em qualquer idade. Em adultos, além da melhora estética, pode melhorar a percepção de profundidade e reduzir a visão dupla.",
    "Na Drudi e Almeida, a Dra. Maria Amélia Valladares de Melo é especialista em estrabismo pediátrico e adulto, com formação pela UNIFESP e experiência em casos complexos.",
  ],
  "importancia-exame-oftalmologico-regular": [
    "Muitas doenças oculares graves, como glaucoma, retinopatia diabética e degeneração macular, são silenciosas em suas fases iniciais. Quando os sintomas aparecem, a perda de visão pode já ser significativa e irreversível.",
    "O exame oftalmológico completo vai muito além de medir o grau dos óculos. Inclui a medição da pressão intraocular, exame de fundo de olho, avaliação do campo visual e análise da córnea.",
    "A recomendação geral é realizar um exame oftalmológico completo pelo menos uma vez por ano. Pessoas com fatores de risco, como diabetes, histórico familiar de glaucoma ou idade acima de 40 anos, podem precisar de acompanhamento mais frequente.",
    "Crianças devem ter sua primeira avaliação oftalmológica até os 3 anos de idade, ou antes se houver qualquer sinal de problema visual, como estrabismo ou dificuldade para enxergar.",
    "Na Drudi e Almeida, nossos 5 institutos especializados garantem que cada paciente receba uma avaliação completa e personalizada, com acesso à tecnologia mais avançada para diagnóstico precoce.",
    "Além dos exames de rotina, é importante procurar um oftalmologista imediatamente em caso de perda súbita de visão, flashes de luz, aumento repentino de moscas volantes, dor ocular intensa ou trauma nos olhos.",
  ],
  // === 6 NOVOS ARTIGOS ===
  "quando-levar-crianca-ao-oftalmologista": [
    "A saúde ocular da criança começa a ser avaliada logo nos primeiros dias de vida, com o teste do olhinho (teste do reflexo vermelho). Esse exame simples e indolor detecta alterações graves como catarata congênita, glaucoma congênito e retinoblastoma.",
    "Entre 6 meses e 1 ano de idade, recomenda-se a primeira consulta com o oftalmologista pediátrico. Nessa fase, o médico avalia o alinhamento dos olhos, a capacidade de fixação e seguimento visual, e possíveis erros refrativos.",
    "Aos 3 anos, a criança já consegue colaborar com testes de acuidade visual usando figuras. Essa é uma idade crucial para detectar ambliopia (olho preguiçoso), que tem tratamento muito mais eficaz quando iniciado precocemente.",
    "Na idade escolar (6-7 anos), problemas visuais podem se manifestar como dificuldade de aprendizado, dor de cabeça, aproximar-se demais da TV ou do caderno, e desinteresse pela leitura. Muitas crianças não reclamam porque não sabem que enxergam diferente.",
    "Sinais de alerta em qualquer idade: olhos desviados ou desalinhados, lacrimejamento excessivo, sensibilidade à luz, pupilas de tamanhos diferentes, reflexo branco na pupila (em fotos com flash), e hábito de apertar ou coçar os olhos frequentemente.",
    "Na Drudi e Almeida, a Dra. Maria Amélia Valladares de Melo é especialista em oftalmologia pediátrica e estrabismo, oferecendo um atendimento acolhedor e especializado para crianças de todas as idades. Agende a consulta do seu filho.",
  ],
  "cuidados-pos-cirurgia-catarata": [
    "A cirurgia de catarata é um dos procedimentos mais seguros da medicina moderna, com taxa de sucesso superior a 98%. No entanto, os cuidados pós-operatórios são essenciais para garantir a melhor recuperação visual possível.",
    "Nas primeiras 24 horas após a cirurgia, é normal sentir leve desconforto, sensação de areia nos olhos e visão embaçada. Evite coçar ou pressionar o olho operado. Use o protetor ocular (tampão) para dormir durante a primeira semana.",
    "Os colírios prescritos pelo médico são fundamentais: geralmente incluem um antibiótico (para prevenir infecções), um anti-inflamatório (para controlar a inflamação) e um lubrificante. Siga rigorosamente os horários e a duração do tratamento.",
    "Nas primeiras duas semanas, evite: esforço físico intenso, abaixar a cabeça por períodos prolongados, nadar ou frequentar piscinas/praias, maquiagem nos olhos, e ambientes com muita poeira ou fumaça.",
    "A visão melhora progressivamente nos primeiros dias e estabiliza em 2 a 4 semanas. A prescrição de óculos definitivos (se necessária) geralmente é feita após 30 dias, quando a cicatrização está completa.",
    "Na Drudi e Almeida, o Dr. Fernando Macei Drudi realiza o acompanhamento pós-operatório com consultas de revisão no dia seguinte, após 1 semana e após 1 mês. Qualquer sintoma incomum — como dor intensa, perda súbita de visão ou vermelhidão acentuada — deve ser comunicado imediatamente.",
  ],
  "lentes-intraoculares-tipos-diferenca": [
    "Durante a cirurgia de catarata, o cristalino opaco é removido e substituído por uma lente intraocular (LIO) artificial. A escolha da lente é uma das decisões mais importantes do processo, pois influencia diretamente a qualidade visual pós-operatória.",
    "A lente monofocal é a mais tradicional e corrige a visão para uma única distância — geralmente longe. O paciente precisará de óculos para leitura e atividades de perto. É uma excelente opção para quem busca simplicidade e já está habituado ao uso de óculos para perto.",
    "A lente multifocal (bifocal) corrige a visão para longe e perto simultaneamente, reduzindo significativamente a dependência de óculos. Utiliza anéis concêntricos que dividem a luz em diferentes focos. Pode causar halos ao redor de luzes à noite em alguns pacientes.",
    "A lente trifocal é a tecnologia mais avançada disponível, corrigindo a visão para longe, intermediário (computador) e perto (leitura). Oferece a maior independência de óculos, sendo ideal para pacientes com estilo de vida ativo.",
    "Lentes tóricas são projetadas para corrigir o astigmatismo durante a cirurgia de catarata. Podem ser combinadas com tecnologia monofocal, multifocal ou trifocal, proporcionando uma correção visual mais completa.",
    "Na Drudi e Almeida, o Dr. Fernando Macei Drudi realiza uma avaliação detalhada do estilo de vida, necessidades visuais e saúde ocular de cada paciente para recomendar a lente mais adequada. A biometria óptica de alta precisão garante o cálculo correto do grau da lente.",
  ],
  "olho-seco-causas-tratamento": [
    "A síndrome do olho seco é uma das queixas mais comuns nos consultórios oftalmológicos, afetando até 30% da população adulta. Ocorre quando os olhos não produzem lágrimas suficientes ou quando a lágrima evapora rapidamente.",
    "Os sintomas incluem sensação de areia ou corpo estranho nos olhos, ardência, vermelhidão, visão embaçada que melhora ao piscar, lacrimejamento excessivo (paradoxalmente, o olho seco pode causar lacrimejamento reflexo) e fadiga ocular.",
    "As causas mais comuns incluem: uso prolongado de telas (computador, celular, tablet), ar-condicionado e ambientes secos, uso de lentes de contato, medicamentos (antidepressivos, anti-hipertensivos, anticoncepcionais), alterações hormonais (menopausa) e doenças autoimunes.",
    "O tratamento começa com medidas simples: a regra 20-20-20 (a cada 20 minutos, olhe para algo a 20 pés/6 metros por 20 segundos), piscar conscientemente ao usar telas, usar umidificador de ar e manter boa hidratação.",
    "Colírios lubrificantes (lágrimas artificiais) são a primeira linha de tratamento medicamentoso. Em casos moderados a graves, podem ser indicados colírios anti-inflamatórios, plugs lacrimais (para reter a lágrima por mais tempo) ou tratamento com luz pulsada intensa (IPL).",
    "Na Drudi e Almeida, a Dra. Priscilla Rodrigues de Almeida é especialista em superfície ocular e pode avaliar a qualidade e quantidade da sua lágrima com exames específicos, indicando o tratamento mais adequado para o seu caso.",
  ],
  "arte-e-visao-monet-catarata-historia": [
    "Claude Monet (1840-1926) é um dos pintores mais amados da história, fundador do Impressionismo e mestre das paisagens de luz e cor. O que muitos não sabem é que sua obra foi profundamente transformada por uma doença ocular: a catarata.",
    "A partir de 1905, Monet começou a notar que as cores pareciam mais amareladas e turvas. Ele escreveu em cartas: 'As cores não têm mais a mesma intensidade para mim. Os vermelhos parecem lamacentos. Minha pintura está ficando cada vez mais escura.'",
    "Comparando suas pinturas da Ponte Japonesa de Giverny ao longo dos anos, a transformação é impressionante. A versão de 1899, pintada com visão saudável, mostra cores vibrantes e detalhes nítidos. A versão de 1922, pintada com catarata avançada, apresenta tons avermelhados, formas borradas e perda de detalhes.",
    "Monet resistiu à cirurgia por anos, temendo perder sua capacidade artística. Finalmente, em 1923, aos 82 anos, operou o olho direito. Após a cirurgia, ficou chocado ao perceber que via tons azulados que antes não enxergava — e repintou várias obras que considerava 'erradas'.",
    "A história de Monet ilustra perfeitamente como a catarata altera a percepção visual: as cores ficam amareladas (porque o cristalino opaco filtra as ondas curtas de luz azul), os contrastes diminuem e os detalhes se perdem. É exatamente o que nossos pacientes descrevem antes da cirurgia.",
    "Na Drudi e Almeida, temos quadros de Monet em nossas clínicas para mostrar aos pacientes, de forma visual e emocionante, como a catarata afeta a visão — e como a cirurgia pode devolver a clareza e a riqueza de cores que a doença roubou. Agende sua avaliação no Instituto da Catarata.",
  ],
  "miopia-infantil-epidemia-digital": [
    "A miopia em crianças está crescendo em ritmo alarmante em todo o mundo. Estudos recentes mostram que até 50% dos jovens em países desenvolvidos são míopes, contra 25% há 30 anos. A Organização Mundial da Saúde projeta que metade da população mundial será míope até 2050.",
    "O principal fator de risco identificado pela ciência é o tempo excessivo em atividades de perto (telas, leitura, tarefas manuais) combinado com pouco tempo ao ar livre. A luz natural estimula a liberação de dopamina na retina, que inibe o crescimento excessivo do globo ocular.",
    "A recomendação da Sociedade Brasileira de Oftalmologia Pediátrica é que crianças passem pelo menos 2 horas por dia ao ar livre. Estudos mostram que essa simples medida pode reduzir o risco de desenvolver miopia em até 50%.",
    "Para crianças que já são míopes, existem tratamentos para controlar a progressão: colírios de atropina em baixa concentração, lentes de contato especiais (ortoceratologia ou lentes multifocais) e lentes oftálmicas com tecnologia de desfoco periférico.",
    "Limites de tela recomendados por idade: até 2 anos, evitar telas; 2-5 anos, máximo 1 hora/dia; 6-12 anos, máximo 2 horas/dia de tela recreativa; adolescentes, pausas frequentes e regra 20-20-20.",
    "Na Drudi e Almeida, oferecemos avaliação completa para crianças com miopia progressiva e orientamos as famílias sobre as melhores estratégias de controle. Quanto mais cedo o tratamento começa, melhores são os resultados a longo prazo.",
  ],
};

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);
  const content = slug ? articleContent[slug] : undefined;

  if (!article || !content) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-navy mb-4">Artigo não encontrado</h1>
          <Link href="/blog" className="font-ui text-sm text-gold hover:underline">Voltar ao Blog</Link>
        </div>
      </div>
    );
  }

  // Related articles (same category, excluding current)
  const related = blogArticles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // Article schema.org
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { "@type": "Organization", name: "Drudi e Almeida Clínicas Oftalmológicas" },
    publisher: { "@type": "Organization", name: "Drudi e Almeida Clínicas Oftalmológicas" },
    image: article.image,
    articleSection: article.category,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] max-h-[450px] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${article.image})` }} />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/70 to-navy/40" />
        <div className="relative h-full container flex flex-col justify-end pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Link href="/blog" className="inline-flex items-center gap-1.5 font-ui text-xs text-cream/60 hover:text-gold transition-colors mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Blog
            </Link>
            <span className="block font-ui text-xs font-semibold tracking-wider uppercase text-gold mb-3">{article.category}</span>
            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl text-cream max-w-3xl leading-tight">{article.title}</h1>
            <div className="flex items-center gap-4 mt-4 text-cream/60">
              <span className="flex items-center gap-1.5 font-ui text-xs"><Calendar className="w-3.5 h-3.5" />{new Date(article.date).toLocaleDateString("pt-BR")}</span>
              <span className="flex items-center gap-1.5 font-ui text-xs"><Clock className="w-3.5 h-3.5" />{article.readTime} de leitura</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <article className="section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {content.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="font-body text-base text-foreground/80 leading-[1.8] mb-6"
              >
                {paragraph}
              </motion.p>
            ))}

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 p-8 rounded-xl bg-navy/5 border border-border/60"
            >
              <h3 className="font-display text-xl text-navy mb-3">Precisa de uma avaliação?</h3>
              <p className="font-body text-sm text-muted-foreground mb-5">
                Nossos especialistas estão prontos para cuidar da sua visão. Agende sua consulta.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/agendamento"
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3 rounded-md hover:bg-gold-light transition-colors"
                >
                  Agendar Consulta
                </Link>
                <a
                  href={`https://wa.me/5511916544653?text=${encodeURIComponent(`Olá! Li o artigo "${article.title}" e gostaria de agendar uma consulta.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-semibold px-6 py-3 rounded-md hover:bg-[#20BD5A] transition-colors"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border/40">
                <h3 className="font-display text-xl text-navy mb-6">Artigos Relacionados</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                      <div className="rounded-lg border border-border/60 overflow-hidden hover:shadow-md hover:border-gold/30 transition-all">
                        <div className="aspect-[16/10] overflow-hidden">
                          <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-3">
                          <h4 className="font-display text-sm text-navy group-hover:text-gold transition-colors leading-snug line-clamp-2">{r.title}</h4>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-6 border-t border-border/40 flex items-center justify-between">
              <Link href="/blog" className="inline-flex items-center gap-1.5 font-ui text-sm text-navy hover:text-gold transition-colors">
                <ArrowLeft className="w-4 h-4" /> Todos os artigos
              </Link>
              <button
                onClick={() => navigator.clipboard?.writeText(window.location.href)}
                className="inline-flex items-center gap-1.5 font-ui text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Share2 className="w-4 h-4" /> Compartilhar
              </button>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
