import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import { HelpCircle, MessageSquare } from "lucide-react";

const faqData = [
  {
    q: "Quais convênios a Drudi e Almeida aceita?",
    a: "Aceitamos Prevent Senior, Bradesco Saúde, Mediservice, PROPM, Amil, Unimed Seguros e Ameplam. Todos os convênios cobrem consultas, exames diagnósticos e procedimentos cirúrgicos nos nossos 5 institutos especializados. Para pacientes particulares, oferecemos condições especiais."
  },
  {
    q: "Como faço para agendar uma consulta?",
    a: "Você pode agendar de 3 formas: pelo WhatsApp (11) 91654-4653 (forma mais rápida), pelo formulário de agendamento online no nosso site, ou ligando diretamente para qualquer uma das nossas 5 unidades. O atendimento funciona de segunda a sexta das 8h às 18h e sábados das 8h às 12h."
  },
  {
    q: "A cirurgia de catarata dói? Como é a recuperação?",
    a: "A cirurgia de catarata é indolor — é realizada com anestesia local por colírio e dura cerca de 15 a 20 minutos. A maioria dos pacientes já percebe melhora na visão no dia seguinte. A recuperação completa leva de 2 a 4 semanas, durante as quais o paciente deve usar colírios e evitar esforço físico."
  },
  {
    q: "O que é ceratocone e qual o tratamento?",
    a: "Ceratocone é uma doença progressiva que afina e deforma a córnea, causando visão distorcida. O tratamento depende do estágio: nos casos iniciais, óculos ou lentes de contato especiais corrigem a visão. O crosslinking de córnea é o padrão-ouro para estabilizar a progressão. Em casos avançados, pode ser necessário implante de anel intracorneano ou transplante de córnea."
  },
  {
    q: "Glaucoma tem cura? Como é o tratamento?",
    a: "O glaucoma não tem cura, mas pode ser controlado eficazmente. O tratamento geralmente começa com colírios que reduzem a pressão intraocular. Quando os colírios não são suficientes, existem opções como laser (trabeculoplastia seletiva) e cirurgias. O mais importante é o diagnóstico precoce, pois a visão perdida pelo glaucoma não pode ser recuperada."
  },
  {
    q: "Com que idade devo levar meu filho ao oftalmologista?",
    a: "O primeiro exame deve ser o Teste do Olhinho, feito na maternidade. Depois, recomendamos consultas aos 6 meses, 1 ano, 3 anos e antes de entrar na escola (5-6 anos). A partir daí, anualmente. Problemas como estrabismo, ambliopia (olho preguiçoso) e erros refrativos são mais fáceis de tratar quando detectados cedo."
  },
  {
    q: "Sou diabético. Com que frequência devo fazer exame de vista?",
    a: "Pacientes diabéticos devem fazer exame de fundo de olho (mapeamento de retina) pelo menos uma vez ao ano. A retinopatia diabética é uma das principais causas de cegueira no mundo e pode progredir silenciosamente. Com diagnóstico precoce, tratamentos como injeções intravítreas e laser podem preservar a visão."
  },
  {
    q: "Quais são as unidades da Drudi e Almeida?",
    a: "Temos 5 unidades na Grande São Paulo: Santana (Rua Dr. César, 130), Tatuapé (Rua Tuiuti, 2429), Lapa (Rua Barão de Jundiaí, 221), São Miguel Paulista (Rua Bernardo Marcondes, 108) e Guarulhos (Rua Sete de Setembro, 375). Todas as unidades contam com equipamentos de última geração e os mesmos padrões de qualidade."
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map(f => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a }
  }))
};

export default function HomeFAQ() {
  return (
    <>
      {/* Schema.org FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <AnimateOnScroll className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-gold/10 rounded-full px-4 py-1.5 mb-4">
          <HelpCircle className="w-4 h-4 text-gold" />
          <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">FAQ</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-navy mt-2 mb-4">
          Perguntas Frequentes
        </h2>
        <p className="font-body text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Reunimos as dúvidas mais comuns dos nossos pacientes. Se sua pergunta não estiver aqui, entre em contato pelo WhatsApp.
        </p>
        <div className="gold-line max-w-[80px] mx-auto mt-5" />
      </AnimateOnScroll>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="space-y-3">
          {faqData.map((faq, i) => (
            <AnimateOnScroll key={i} delay={i * 0.04}>
              <AccordionItem
                value={`home-faq-${i}`}
                className="border border-border/60 rounded-xl px-6 bg-white data-[state=open]:shadow-sm data-[state=open]:border-gold/30 transition-all"
              >
                <AccordionTrigger className="font-display text-base text-navy hover:text-gold py-5 [&[data-state=open]]:text-gold text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            </AnimateOnScroll>
          ))}
        </Accordion>
      </div>

      <AnimateOnScroll className="text-center mt-10">
        <p className="font-body text-sm text-muted-foreground mb-4">
          Não encontrou sua dúvida? Fale conosco!
        </p>
        <a
          href="https://wa.me/5511916544653?text=Olá! Tenho uma dúvida sobre..."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-6 py-3 rounded-md hover:bg-[#20BD5A] transition-colors"
        >
          <MessageSquare className="w-4 h-4" />
          Pergunte pelo WhatsApp
        </a>
      </AnimateOnScroll>
    </>
  );
}
