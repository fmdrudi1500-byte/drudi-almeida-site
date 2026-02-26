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
  ],
  "ceratocone-o-que-e-e-como-tratar": [
    "O ceratocone é uma doença ocular progressiva que afeta a córnea, tornando-a mais fina e curva em formato de cone. Essa deformação causa distorção das imagens, visão embaçada e astigmatismo irregular.",
    "A doença geralmente surge na adolescência ou início da idade adulta e pode progredir por décadas. Os principais sintomas incluem visão borrada, aumento rápido do grau, sensibilidade à luz e dificuldade para enxergar à noite.",
    "O crosslinking de córnea é o tratamento padrão-ouro para estabilizar o ceratocone. Utiliza riboflavina (vitamina B2) e luz ultravioleta para fortalecer as fibras de colágeno da córnea, impedindo a progressão da doença.",
    "Outras opções incluem o implante de anel intracorneano, que regulariza a curvatura da córnea, e lentes de contato especiais (rígidas ou esclerais) para corrigir o astigmatismo irregular.",
    "É fundamental evitar coçar os olhos, pois esse hábito é um dos principais fatores associados ao desenvolvimento e progressão do ceratocone. O diagnóstico precoce através da topografia corneana é essencial.",
  ],
  "glaucoma-ladrao-silencioso-da-visao": [
    "O glaucoma é chamado de 'ladrão silencioso da visão' porque, na maioria dos casos, não apresenta sintomas nas fases iniciais. A perda de visão ocorre de forma lenta e gradual, começando pela periferia do campo visual.",
    "Trata-se de um grupo de doenças que causam danos progressivos ao nervo óptico, geralmente associados ao aumento da pressão intraocular. Se não tratado, leva à perda irreversível da visão.",
    "Os principais fatores de risco incluem idade acima de 40 anos, histórico familiar, pressão intraocular elevada, descendência africana ou asiática, miopia elevada e diabetes.",
    "O tratamento visa controlar a pressão intraocular e pode incluir colírios, laser (trabeculoplastia seletiva) ou cirurgia. O glaucoma não tem cura, mas o tratamento adequado pode estabilizar a doença.",
    "A melhor forma de prevenção é realizar exames oftalmológicos regulares, especialmente após os 40 anos. A detecção precoce é fundamental para preservar a visão.",
  ],
  "retinopatia-diabetica-prevencao-tratamento": [
    "A retinopatia diabética é uma complicação do diabetes que afeta os vasos sanguíneos da retina. É a principal causa de cegueira em adultos em idade produtiva nos países desenvolvidos.",
    "Nas fases iniciais, a doença é assintomática. Por isso, todo paciente diabético deve realizar exame de fundo de olho pelo menos uma vez por ano, mesmo sem queixas visuais.",
    "O controle rigoroso da glicemia, pressão arterial e colesterol é fundamental para prevenir e retardar a progressão da retinopatia diabética.",
    "Os tratamentos modernos incluem injeções intravítreas de anti-VEGF, que bloqueiam o crescimento de vasos anormais, e fotocoagulação a laser para tratar áreas de isquemia na retina.",
    "Na Drudi e Almeida, contamos com OCT de alta resolução e mapeamento ultra-widefield para diagnóstico precoce e acompanhamento preciso da evolução da doença.",
  ],
  "estrabismo-infantil-quando-procurar-oftalmologista": [
    "O estrabismo é uma condição em que os olhos não estão alinhados na mesma direção. Afeta cerca de 4% da população e é mais comum na infância, embora possa surgir em qualquer idade.",
    "Em crianças, o tratamento precoce é fundamental para prevenir a ambliopia (olho preguiçoso) e garantir o desenvolvimento visual adequado. O ideal é que a primeira avaliação oftalmológica seja feita até os 3 anos.",
    "Os sinais de alerta incluem: olhos que parecem não olhar na mesma direção, inclinação frequente da cabeça, fechar um olho na luz forte e dificuldade de percepção de profundidade.",
    "O tratamento pode incluir uso de óculos, tampão ocular para tratar a ambliopia, exercícios ortópticos e, quando necessário, cirurgia para ajustar os músculos extraoculares.",
    "A cirurgia de estrabismo é segura e pode ser realizada em qualquer idade. Em adultos, além da melhora estética, pode melhorar a percepção de profundidade e reduzir a visão dupla.",
  ],
  "importancia-exame-oftalmologico-regular": [
    "Muitas doenças oculares graves, como glaucoma, retinopatia diabética e degeneração macular, são silenciosas em suas fases iniciais. Quando os sintomas aparecem, a perda de visão pode já ser significativa e irreversível.",
    "O exame oftalmológico completo vai muito além de medir o grau dos óculos. Inclui a medição da pressão intraocular, exame de fundo de olho, avaliação do campo visual e análise da córnea.",
    "A recomendação geral é realizar um exame oftalmológico completo pelo menos uma vez por ano. Pessoas com fatores de risco, como diabetes, histórico familiar de glaucoma ou idade acima de 40 anos, podem precisar de acompanhamento mais frequente.",
    "Crianças devem ter sua primeira avaliação oftalmológica até os 3 anos de idade, ou antes se houver qualquer sinal de problema visual, como estrabismo ou dificuldade para enxergar.",
    "Na Drudi e Almeida, nossos 5 institutos especializados garantem que cada paciente receba uma avaliação completa e personalizada, com acesso à tecnologia mais avançada para diagnóstico precoce.",
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
              <a
                href="https://wa.me/5511916544653?text=Olá! Li o artigo sobre {article.category} e gostaria de agendar uma consulta."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold text-navy font-ui text-sm font-bold px-6 py-3 rounded-md hover:bg-gold-light transition-colors"
              >
                Agendar Consulta
              </a>
            </motion.div>

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
