/* ============================================================
   Ferramentas Oftalmológicas — Drudi e Almeida
   Hub de ferramentas interativas gratuitas para pacientes:
   - Teste de Risco de Ceratocone (CLEK / Amsler adaptado)
   - Calculadora de Maturidade da Catarata
   - Teste de Acuidade Visual Simplificado (Snellen Digital)
   ============================================================ */
import { useState } from "react";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, Eye, Activity, Calculator } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import AnimateOnScroll from "@/components/AnimateOnScroll";
import Breadcrumb from "@/components/Breadcrumb";

const WHATSAPP_CERATOCONE = "https://wa.me/5511916544653?text=Olá! Fiz o teste de risco de ceratocone no site e gostaria de agendar uma avaliação.";
const WHATSAPP_CATARATA = "https://wa.me/5511916544653?text=Olá! Fiz a calculadora de maturidade da catarata e gostaria de agendar uma consulta.";
const WHATSAPP_ACUIDADE = "https://wa.me/5511916544653?text=Olá! Fiz o teste de acuidade visual no site e gostaria de agendar uma avaliação.";

/* ============================================================
   FERRAMENTA 1 — TESTE DE RISCO DE CERATOCONE
   Baseado em fatores de risco validados clinicamente:
   - Histórico familiar (Rabinowitz, 1998)
   - Atopia/alergia ocular (Bawazeer et al., 2000)
   - Fricção ocular (Khor et al., 2011)
   - Sintomas visuais progressivos
   - Idade de início
   ============================================================ */

type CeratoconeQuestion = {
  id: string;
  text: string;
  options: { label: string; value: number }[];
  weight: number;
  info?: string;
};

const ceratoconeQuestions: CeratoconeQuestion[] = [
  {
    id: "familiar",
    text: "Algum familiar próximo (pais, irmãos) tem ceratocone ou usa lentes de contato rígidas por problema de córnea?",
    options: [
      { label: "Não sei / Não", value: 0 },
      { label: "Sim, um familiar", value: 2 },
      { label: "Sim, dois ou mais familiares", value: 3 },
    ],
    weight: 3,
    info: "O ceratocone tem componente hereditário em 10–15% dos casos. Familiares de primeiro grau têm risco 15–67 vezes maior.",
  },
  {
    id: "atopia",
    text: "Você tem ou já teve alguma das seguintes condições: asma, rinite alérgica, eczema ou conjuntivite alérgica?",
    options: [
      { label: "Não", value: 0 },
      { label: "Sim, uma delas", value: 1 },
      { label: "Sim, duas ou mais", value: 2 },
    ],
    weight: 2,
    info: "Doenças atópicas estão associadas ao ceratocone em até 53% dos casos, possivelmente pela liberação de enzimas inflamatórias que degradam o colágeno corneano.",
  },
  {
    id: "friccao",
    text: "Com que frequência você esfrega os olhos com força?",
    options: [
      { label: "Raramente ou nunca", value: 0 },
      { label: "Às vezes (algumas vezes por semana)", value: 1 },
      { label: "Com frequência (diariamente, com força)", value: 3 },
    ],
    weight: 3,
    info: "A fricção ocular vigorosa e repetida é um dos fatores de risco modificáveis mais importantes para progressão do ceratocone.",
  },
  {
    id: "grau",
    text: "Seu grau de óculos muda com frequência (mais de uma vez por ano) e a visão não fica totalmente nítida mesmo com óculos novos?",
    options: [
      { label: "Não, meu grau é estável", value: 0 },
      { label: "Muda, mas a visão fica boa com óculos", value: 1 },
      { label: "Muda e a visão não fica totalmente nítida", value: 3 },
    ],
    weight: 3,
    info: "A mudança frequente de grau com astigmatismo irregular é um sinal clássico de ceratocone em progressão.",
  },
  {
    id: "halos",
    text: "Você enxerga halos, fantasmas ou imagens duplas ao redor de luzes, especialmente à noite?",
    options: [
      { label: "Não", value: 0 },
      { label: "Às vezes", value: 1 },
      { label: "Sim, com frequência", value: 2 },
    ],
    weight: 2,
    info: "Halos e poliopia monocular (imagens duplas com um olho fechado) são sintomas característicos de irregularidade corneana.",
  },
  {
    id: "idade",
    text: "Qual é a sua faixa etária?",
    options: [
      { label: "Abaixo de 15 anos", value: 2 },
      { label: "15 a 30 anos", value: 3 },
      { label: "31 a 40 anos", value: 1 },
      { label: "Acima de 40 anos", value: 0 },
    ],
    weight: 2,
    info: "O ceratocone tipicamente se manifesta na adolescência e progride até os 30–40 anos. O diagnóstico precoce é fundamental.",
  },
  {
    id: "lentes",
    text: "Você já foi informado por algum oftalmologista que tem astigmatismo irregular ou que precisa de lentes de contato especiais (rígidas ou esclerais)?",
    options: [
      { label: "Não", value: 0 },
      { label: "Tenho astigmatismo, mas não sei se é irregular", value: 1 },
      { label: "Sim, fui informado sobre astigmatismo irregular", value: 4 },
    ],
    weight: 4,
    info: "O astigmatismo irregular é a marca registrada do ceratocone e não pode ser corrigido completamente com óculos convencionais.",
  },
];

function getCeratoconeRisk(score: number, maxScore: number): {
  level: "baixo" | "moderado" | "alto" | "muito-alto";
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  recommendation: string;
} {
  const pct = score / maxScore;
  if (pct < 0.25) return {
    level: "baixo",
    label: "Risco Baixo",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description: "Seus fatores de risco para ceratocone são baixos. Continue com consultas oftalmológicas anuais de rotina.",
    recommendation: "Recomendamos uma consulta de rotina anual para monitoramento preventivo.",
  };
  if (pct < 0.5) return {
    level: "moderado",
    label: "Risco Moderado",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "Você apresenta alguns fatores de risco para ceratocone. Uma avaliação com topografia corneana é recomendada.",
    recommendation: "Agende uma avaliação com topografia corneana para descartar ceratocone subclínico.",
  };
  if (pct < 0.75) return {
    level: "alto",
    label: "Risco Alto",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Você apresenta múltiplos fatores de risco para ceratocone. Uma avaliação especializada é fortemente recomendada.",
    recommendation: "Procure um especialista em córnea para avaliação com topografia e tomografia corneana.",
  };
  return {
    level: "muito-alto",
    label: "Risco Muito Alto",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Você apresenta fatores de risco significativos para ceratocone. Uma avaliação especializada urgente é necessária.",
    recommendation: "Agende uma consulta urgente com especialista em córnea. O diagnóstico precoce pode preservar sua visão.",
  };
}

function TesteCeratocone() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const maxScore = ceratoconeQuestions.reduce((acc, q) => acc + q.options[q.options.length - 1].value * q.weight, 0);
  const totalScore = Object.entries(answers).reduce((acc, [id, val]) => {
    const q = ceratoconeQuestions.find(q => q.id === id);
    return acc + (q ? val * q.weight : 0);
  }, 0);

  const handleSelect = (value: number) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption === null) return;
    const q = ceratoconeQuestions[currentQ];
    setAnswers(prev => ({ ...prev, [q.id]: selectedOption }));
    setSelectedOption(null);
    if (currentQ < ceratoconeQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setSelectedOption(null);
  };

  const progress = ((currentQ) / ceratoconeQuestions.length) * 100;
  const risk = getCeratoconeRisk(totalScore, maxScore);

  if (showResult) {
    return (
      <div className={`rounded-2xl border-2 ${risk.borderColor} ${risk.bgColor} p-8`}>
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm font-bold ${risk.color} ${risk.bgColor} border ${risk.borderColor} mb-4`}>
            <Activity className="w-4 h-4" />
            {risk.label}
          </div>
          <h3 className="font-display text-2xl text-navy mb-3">Resultado do Teste</h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {risk.description}
          </p>
        </div>

        {/* Score bar */}
        <div className="mb-6">
          <div className="flex justify-between font-ui text-xs text-muted-foreground mb-2">
            <span>Pontuação de risco</span>
            <span>{totalScore} / {maxScore} pontos</span>
          </div>
          <div className="h-3 bg-white/70 rounded-full overflow-hidden border border-border/30">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                risk.level === "baixo" ? "bg-emerald-500" :
                risk.level === "moderado" ? "bg-amber-500" :
                risk.level === "alto" ? "bg-orange-500" : "bg-red-500"
              }`}
              style={{ width: `${(totalScore / maxScore) * 100}%` }}
            />
          </div>
        </div>

        {/* Recommendation */}
        <div className="bg-white/80 rounded-xl p-5 border border-border/30 mb-6">
          <p className="font-ui text-xs font-semibold text-navy uppercase tracking-wide mb-2">Recomendação</p>
          <p className="font-body text-sm text-foreground leading-relaxed">{risk.recommendation}</p>
          <p className="font-body text-xs text-muted-foreground mt-3 italic">
            Este teste é uma ferramenta educativa e não substitui a avaliação clínica. Apenas um oftalmologista pode diagnosticar o ceratocone com topografia corneana.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={WHATSAPP_CERATOCONE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-5 py-3.5 rounded-lg hover:bg-[#1ebe5d] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar Avaliação pelo WhatsApp
          </a>
          <Link
            href="/instituto/ceratocone"
            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-ui text-sm font-semibold px-5 py-3.5 rounded-lg hover:bg-navy hover:text-white transition-colors"
          >
            Saiba mais sobre Ceratocone
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={handleRestart}
          className="mt-4 w-full font-ui text-xs text-muted-foreground hover:text-navy transition-colors underline underline-offset-2"
        >
          Refazer o teste
        </button>
      </div>
    );
  }

  const q = ceratoconeQuestions[currentQ];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div>
        <div className="flex justify-between font-ui text-xs text-muted-foreground mb-2">
          <span>Pergunta {currentQ + 1} de {ceratoconeQuestions.length}</span>
          <span>{Math.round(progress)}% concluído</span>
        </div>
        <div className="h-2 bg-border/30 rounded-full overflow-hidden">
          <div
            className="h-full bg-navy rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm">
        <p className="font-body text-base text-foreground leading-relaxed mb-5 font-medium">
          {q.text}
        </p>

        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-body text-sm transition-all duration-200 ${
                selectedOption === opt.value
                  ? "border-navy bg-navy/5 text-navy font-semibold"
                  : "border-border/40 bg-background hover:border-navy/40 hover:bg-navy/3 text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {q.info && (
          <div className="mt-4 p-3 bg-cream/60 rounded-lg border border-gold/20">
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-navy">Saiba mais: </span>{q.info}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`w-full inline-flex items-center justify-center gap-2 font-ui text-sm font-bold px-6 py-4 rounded-xl transition-all duration-200 ${
          selectedOption !== null
            ? "bg-navy text-cream hover:bg-navy-light shadow-md"
            : "bg-border/30 text-muted-foreground cursor-not-allowed"
        }`}
      >
        {currentQ < ceratoconeQuestions.length - 1 ? "Próxima pergunta" : "Ver resultado"}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ============================================================
   FERRAMENTA 2 — CALCULADORA DE MATURIDADE DA CATARATA
   Baseada nos critérios de indicação cirúrgica:
   - Acuidade visual (BCVA)
   - Impacto nas atividades diárias
   - Sintomas de glare/halos
   - Tempo de evolução
   ============================================================ */

type CatarataQuestion = {
  id: string;
  text: string;
  options: { label: string; value: number }[];
  info?: string;
};

const catarataQuestions: CatarataQuestion[] = [
  {
    id: "visao",
    text: "Como está sua visão atualmente, mesmo usando óculos ou lentes de contato?",
    options: [
      { label: "Boa — consigo ler, dirigir e fazer atividades normalmente", value: 0 },
      { label: "Razoável — tenho dificuldade em algumas atividades", value: 2 },
      { label: "Ruim — tenho dificuldade em atividades do dia a dia", value: 4 },
      { label: "Muito ruim — só consigo ver vultos ou luz", value: 6 },
    ],
    info: "A acuidade visual é o principal critério para indicação cirúrgica. Abaixo de 20/40 (0,5) já há indicação em muitos casos.",
  },
  {
    id: "dirigir",
    text: "Você dirige ou dirigia? Como está sua capacidade de dirigir?",
    options: [
      { label: "Não dirijo", value: 0 },
      { label: "Dirijo sem dificuldade", value: 0 },
      { label: "Tenho dificuldade para dirigir, especialmente à noite", value: 2 },
      { label: "Parei de dirigir por causa da visão", value: 4 },
    ],
    info: "A incapacidade de dirigir com segurança é uma das principais indicações funcionais para cirurgia de catarata.",
  },
  {
    id: "glare",
    text: "Você sente incômodo intenso com luzes (faróis, sol, lâmpadas) — sensação de ofuscamento ou halos?",
    options: [
      { label: "Não", value: 0 },
      { label: "Leve incômodo", value: 1 },
      { label: "Incômodo moderado que atrapalha atividades", value: 3 },
      { label: "Incômodo intenso, difícil de tolerar", value: 5 },
    ],
    info: "O glare (ofuscamento) é causado pela dispersão da luz pela catarata e é um critério funcional importante para indicação cirúrgica.",
  },
  {
    id: "leitura",
    text: "Como está sua capacidade de ler (livros, celular, documentos)?",
    options: [
      { label: "Leio normalmente", value: 0 },
      { label: "Preciso de mais luz ou lupa para ler", value: 2 },
      { label: "Tenho grande dificuldade para ler", value: 4 },
    ],
    info: "A dificuldade de leitura impacta diretamente a qualidade de vida e é considerada na indicação cirúrgica.",
  },
  {
    id: "tempo",
    text: "Há quanto tempo você percebe a piora da visão?",
    options: [
      { label: "Menos de 6 meses", value: 1 },
      { label: "6 meses a 2 anos", value: 2 },
      { label: "Mais de 2 anos", value: 3 },
    ],
    info: "A catarata é progressiva. Quanto mais tempo de evolução, maior a densidade da opacidade e a indicação cirúrgica.",
  },
  {
    id: "diagnostico",
    text: "Algum oftalmologista já diagnosticou catarata nos seus olhos?",
    options: [
      { label: "Não fui avaliado", value: 0 },
      { label: "Sim, foi dito que tenho catarata incipiente (inicial)", value: 2 },
      { label: "Sim, foi dito que tenho catarata avançada", value: 5 },
    ],
    info: "O diagnóstico médico é fundamental. A avaliação inclui biomicroscopia e medida da acuidade visual.",
  },
];

function getCatarataStage(score: number): {
  stage: "inicial" | "moderada" | "avancada" | "cirurgica";
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
  recommendation: string;
} {
  if (score <= 5) return {
    stage: "inicial",
    label: "Catarata Inicial ou Ausente",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-200",
    description: "Seus sintomas sugerem catarata inicial ou ausente. Acompanhamento periódico é suficiente neste momento.",
    recommendation: "Recomendamos consulta anual para monitoramento. A catarata é progressiva e o acompanhamento regular é fundamental.",
  };
  if (score <= 11) return {
    stage: "moderada",
    label: "Catarata Moderada",
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200",
    description: "Seus sintomas são compatíveis com catarata em estágio moderado. Uma avaliação especializada é recomendada.",
    recommendation: "Agende uma consulta para avaliação completa. Dependendo da acuidade visual e impacto funcional, a cirurgia pode ser indicada.",
  };
  if (score <= 17) return {
    stage: "avancada",
    label: "Catarata Avançada",
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    description: "Seus sintomas sugerem catarata avançada com impacto significativo na qualidade de vida.",
    recommendation: "A cirurgia de catarata provavelmente está indicada. Agende uma avaliação para confirmar e discutir as opções de lentes.",
  };
  return {
    stage: "cirurgica",
    label: "Indicação Cirúrgica Provável",
    color: "text-red-700",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    description: "Seus sintomas são compatíveis com catarata com forte indicação cirúrgica. A cirurgia pode restaurar sua visão.",
    recommendation: "Agende uma consulta urgente. A cirurgia de catarata moderna (facoemulsificação) é segura, rápida e altamente eficaz.",
  };
}

function CalculadoraCatarata() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
  const stage = getCatarataStage(totalScore);
  const progress = ((currentQ) / catarataQuestions.length) * 100;

  const handleSelect = (value: number) => setSelectedOption(value);

  const handleNext = () => {
    if (selectedOption === null) return;
    const q = catarataQuestions[currentQ];
    setAnswers(prev => ({ ...prev, [q.id]: selectedOption }));
    setSelectedOption(null);
    if (currentQ < catarataQuestions.length - 1) {
      setCurrentQ(prev => prev + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQ(0);
    setAnswers({});
    setShowResult(false);
    setSelectedOption(null);
  };

  if (showResult) {
    return (
      <div className={`rounded-2xl border-2 ${stage.borderColor} ${stage.bgColor} p-8`}>
        <div className="text-center mb-6">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-ui text-sm font-bold ${stage.color} ${stage.bgColor} border ${stage.borderColor} mb-4`}>
            <Eye className="w-4 h-4" />
            {stage.label}
          </div>
          <h3 className="font-display text-2xl text-navy mb-3">Resultado da Avaliação</h3>
          <p className="font-body text-base text-muted-foreground leading-relaxed max-w-lg mx-auto">
            {stage.description}
          </p>
        </div>

        <div className="bg-white/80 rounded-xl p-5 border border-border/30 mb-6">
          <p className="font-ui text-xs font-semibold text-navy uppercase tracking-wide mb-2">Recomendação</p>
          <p className="font-body text-sm text-foreground leading-relaxed">{stage.recommendation}</p>
          <p className="font-body text-xs text-muted-foreground mt-3 italic">
            Esta calculadora é uma ferramenta educativa. Apenas um oftalmologista pode diagnosticar e indicar tratamento para catarata.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={WHATSAPP_CATARATA}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-5 py-3.5 rounded-lg hover:bg-[#1ebe5d] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar Consulta pelo WhatsApp
          </a>
          <Link
            href="/instituto/catarata"
            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-navy text-navy font-ui text-sm font-semibold px-5 py-3.5 rounded-lg hover:bg-navy hover:text-white transition-colors"
          >
            Saiba mais sobre Catarata
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={handleRestart}
          className="mt-4 w-full font-ui text-xs text-muted-foreground hover:text-navy transition-colors underline underline-offset-2"
        >
          Refazer a avaliação
        </button>
      </div>
    );
  }

  const q = catarataQuestions[currentQ];

  return (
    <div className="space-y-6">
      <div>
        <div className="flex justify-between font-ui text-xs text-muted-foreground mb-2">
          <span>Pergunta {currentQ + 1} de {catarataQuestions.length}</span>
          <span>{Math.round(progress)}% concluído</span>
        </div>
        <div className="h-2 bg-border/30 rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm">
        <p className="font-body text-base text-foreground leading-relaxed mb-5 font-medium">{q.text}</p>
        <div className="space-y-3">
          {q.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt.value)}
              className={`w-full text-left px-4 py-3.5 rounded-xl border-2 font-body text-sm transition-all duration-200 ${
                selectedOption === opt.value
                  ? "border-gold bg-gold/5 text-navy font-semibold"
                  : "border-border/40 bg-background hover:border-gold/40 hover:bg-gold/3 text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        {q.info && (
          <div className="mt-4 p-3 bg-cream/60 rounded-lg border border-gold/20">
            <p className="font-body text-xs text-muted-foreground leading-relaxed">
              <span className="font-semibold text-navy">Saiba mais: </span>{q.info}
            </p>
          </div>
        )}
      </div>

      <button
        onClick={handleNext}
        disabled={selectedOption === null}
        className={`w-full inline-flex items-center justify-center gap-2 font-ui text-sm font-bold px-6 py-4 rounded-xl transition-all duration-200 ${
          selectedOption !== null
            ? "bg-gold text-navy hover:bg-gold-light shadow-md"
            : "bg-border/30 text-muted-foreground cursor-not-allowed"
        }`}
      >
        {currentQ < catarataQuestions.length - 1 ? "Próxima pergunta" : "Ver resultado"}
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ============================================================
   FERRAMENTA 3 — TESTE DE ACUIDADE VISUAL (SNELLEN DIGITAL)
   Versão simplificada para triagem domiciliar
   Instruções baseadas nas diretrizes da AAO (American Academy of Ophthalmology)
   ============================================================ */

const snellenLines = [
  { size: 72, letter: "E", acuity: "20/200", label: "20/200 — Visão muito reduzida" },
  { size: 58, letter: "F P", acuity: "20/160", label: "20/160" },
  { size: 48, letter: "T O Z", acuity: "20/100", label: "20/100" },
  { size: 38, letter: "L P E D", acuity: "20/70", label: "20/70" },
  { size: 30, letter: "P E C F D", acuity: "20/50", label: "20/50" },
  { size: 24, letter: "E D F C Z P", acuity: "20/40", label: "20/40 — Mínimo para dirigir" },
  { size: 18, letter: "F E L O P Z D", acuity: "20/30", label: "20/30" },
  { size: 14, letter: "D E F P O T E C", acuity: "20/25", label: "20/25" },
  { size: 11, letter: "L E F O D P C T", acuity: "20/20", label: "20/20 — Visão normal" },
];

function TesteAcuidade() {
  const [step, setStep] = useState<"instrucoes" | "teste" | "resultado">("instrucoes");
  const [currentLine, setCurrentLine] = useState(0);
  const [lastReadLine, setLastReadLine] = useState(0);
  const [eye, setEye] = useState<"direito" | "esquerdo">("direito");
  const [resultOD, setResultOD] = useState<string | null>(null);
  const [resultOE, setResultOE] = useState<string | null>(null);

  const handleCanRead = () => {
    setLastReadLine(currentLine);
    if (currentLine < snellenLines.length - 1) {
      setCurrentLine(prev => prev + 1);
    } else {
      finishEye("20/20");
    }
  };

  const handleCannotRead = () => {
    const acuity = currentLine === 0 ? "< 20/200" : snellenLines[lastReadLine].acuity;
    finishEye(acuity);
  };

  const finishEye = (acuity: string) => {
    if (eye === "direito") {
      setResultOD(acuity);
      setEye("esquerdo");
      setCurrentLine(0);
      setLastReadLine(0);
    } else {
      setResultOE(acuity);
      setStep("resultado");
    }
  };

  const getAcuityColor = (acuity: string | null) => {
    if (!acuity) return "text-muted-foreground";
    if (acuity === "20/20" || acuity === "20/25") return "text-emerald-700";
    if (acuity === "20/30" || acuity === "20/40") return "text-amber-700";
    if (acuity === "20/50" || acuity === "20/70") return "text-orange-700";
    return "text-red-700";
  };

  const needsEvaluation = (acuity: string | null) => {
    if (!acuity) return false;
    return !["20/20", "20/25", "20/30"].includes(acuity);
  };

  if (step === "instrucoes") {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-border/50 p-6 shadow-sm">
          <h3 className="font-display text-lg text-navy mb-4">Como realizar o teste corretamente</h3>
          <ol className="space-y-3">
            {[
              "Afaste-se 50 cm da tela do celular ou 1 metro do monitor do computador.",
              "Certifique-se de estar em um ambiente bem iluminado.",
              "Cubra um olho com a mão (sem pressionar) e mantenha o outro aberto.",
              "Use seus óculos ou lentes de contato habituais, se tiver.",
              "Leia as letras de cima para baixo. Clique em 'Consigo ler' enquanto conseguir identificar as letras.",
              "Quando não conseguir mais ler, clique em 'Não consigo ler'.",
              "Repita o processo para o outro olho.",
            ].map((instrucao, i) => (
              <li key={i} className="flex gap-3 font-body text-sm text-foreground leading-relaxed">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-navy text-cream font-ui text-xs font-bold flex items-center justify-center">{i + 1}</span>
                {instrucao}
              </li>
            ))}
          </ol>
          <div className="mt-5 p-3 bg-amber-50 rounded-lg border border-amber-200">
            <p className="font-body text-xs text-amber-800 leading-relaxed">
              <span className="font-semibold">Atenção: </span>Este teste é uma triagem domiciliar simplificada e não substitui o exame oftalmológico completo com equipamentos calibrados.
            </p>
          </div>
        </div>
        <button
          onClick={() => setStep("teste")}
          className="w-full inline-flex items-center justify-center gap-2 bg-navy text-cream font-ui text-sm font-bold px-6 py-4 rounded-xl hover:bg-navy-light transition-colors shadow-md"
        >
          Iniciar o Teste — Olho Direito
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  if (step === "resultado") {
    const needsOD = needsEvaluation(resultOD);
    const needsOE = needsEvaluation(resultOE);
    const needsAny = needsOD || needsOE;

    return (
      <div className={`rounded-2xl border-2 ${needsAny ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"} p-8`}>
        <div className="text-center mb-6">
          <h3 className="font-display text-2xl text-navy mb-3">Resultado do Teste</h3>
          <p className="font-body text-sm text-muted-foreground">Acuidade visual estimada por olho</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/80 rounded-xl p-4 border border-border/30 text-center">
            <p className="font-ui text-xs text-muted-foreground uppercase tracking-wide mb-1">Olho Direito</p>
            <p className={`font-display text-2xl font-bold ${getAcuityColor(resultOD)}`}>{resultOD}</p>
            {needsOD && <p className="font-body text-xs text-orange-700 mt-1">Avaliação recomendada</p>}
          </div>
          <div className="bg-white/80 rounded-xl p-4 border border-border/30 text-center">
            <p className="font-ui text-xs text-muted-foreground uppercase tracking-wide mb-1">Olho Esquerdo</p>
            <p className={`font-display text-2xl font-bold ${getAcuityColor(resultOE)}`}>{resultOE}</p>
            {needsOE && <p className="font-body text-xs text-orange-700 mt-1">Avaliação recomendada</p>}
          </div>
        </div>

        <div className="bg-white/80 rounded-xl p-5 border border-border/30 mb-6">
          <p className="font-ui text-xs font-semibold text-navy uppercase tracking-wide mb-2">Interpretação</p>
          <p className="font-body text-sm text-foreground leading-relaxed">
            {needsAny
              ? "Seu resultado sugere que a acuidade visual em um ou ambos os olhos está abaixo do esperado. Uma avaliação oftalmológica completa é recomendada para identificar a causa e o tratamento adequado."
              : "Sua acuidade visual está dentro da faixa normal neste teste. Recomendamos consultas anuais de rotina para manter a saúde ocular."}
          </p>
          <p className="font-body text-xs text-muted-foreground mt-3 italic">
            Este é um teste de triagem domiciliar. Apenas um exame oftalmológico completo pode avaliar com precisão sua saúde ocular.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={WHATSAPP_ACUIDADE}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-5 py-3.5 rounded-lg hover:bg-[#1ebe5d] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Agendar Avaliação pelo WhatsApp
          </a>
          <Link
            href="/agendar"
            className="flex-1 inline-flex items-center justify-center gap-2 border-2 border-navy bg-white text-navy font-ui text-sm font-semibold px-5 py-3.5 rounded-lg hover:bg-navy hover:text-white transition-colors"
          >
            Agendar Online
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <button
          onClick={() => { setStep("instrucoes"); setCurrentLine(0); setLastReadLine(0); setEye("direito"); setResultOD(null); setResultOE(null); }}
          className="mt-4 w-full font-ui text-xs text-muted-foreground hover:text-navy transition-colors underline underline-offset-2"
        >
          Refazer o teste
        </button>
      </div>
    );
  }

  // Teste em andamento
  const line = snellenLines[currentLine];
  return (
    <div className="space-y-6">
      <div className="bg-navy/5 rounded-xl p-4 border border-navy/10 text-center">
        <p className="font-ui text-xs font-semibold text-navy uppercase tracking-wide">
          Testando: Olho {eye === "direito" ? "Direito" : "Esquerdo"}
        </p>
        <p className="font-body text-xs text-muted-foreground mt-1">
          Cubra o olho {eye === "direito" ? "esquerdo" : "direito"} com a mão
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-border/50 p-8 shadow-sm text-center min-h-[200px] flex flex-col items-center justify-center">
        <p className="font-mono font-bold text-navy tracking-[0.3em] leading-none select-none" style={{ fontSize: `${line.size}px` }}>
          {line.letter}
        </p>
        <p className="font-ui text-xs text-muted-foreground mt-4">{line.label}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleCanRead}
          className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white font-ui text-sm font-bold px-4 py-4 rounded-xl hover:bg-emerald-700 transition-colors"
        >
          Consigo ler
        </button>
        <button
          onClick={handleCannotRead}
          className="inline-flex items-center justify-center gap-2 bg-red-500 text-white font-ui text-sm font-bold px-4 py-4 rounded-xl hover:bg-red-600 transition-colors"
        >
          Nao consigo ler
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   PÁGINA PRINCIPAL — HUB DE FERRAMENTAS
   ============================================================ */

const tools = [
  {
    id: "ceratocone",
    title: "Teste de Risco de Ceratocone",
    subtitle: "7 perguntas — 3 minutos",
    description: "Avalie seus fatores de risco para ceratocone com base em critérios clínicos validados. Desenvolvido com base nas diretrizes do CLEK Study e literatura oftalmológica atual.",
    icon: Activity,
    color: "from-blue-500/10 to-blue-600/5",
    accentColor: "text-blue-600",
    borderColor: "border-blue-200",
    component: TesteCeratocone,
  },
  {
    id: "catarata",
    title: "Calculadora de Maturidade da Catarata",
    subtitle: "6 perguntas — 2 minutos",
    description: "Avalie o estágio funcional da sua catarata e saiba se a cirurgia pode estar indicada. Baseado nos critérios de indicação cirúrgica da Sociedade Brasileira de Oftalmologia.",
    icon: Calculator,
    color: "from-amber-500/10 to-amber-600/5",
    accentColor: "text-amber-600",
    borderColor: "border-amber-200",
    component: CalculadoraCatarata,
  },
  {
    id: "acuidade",
    title: "Teste de Acuidade Visual",
    subtitle: "Tabela de Snellen Digital",
    description: "Realize uma triagem domiciliar da sua acuidade visual com a tabela de Snellen adaptada para telas. Baseado nas diretrizes da American Academy of Ophthalmology.",
    icon: Eye,
    color: "from-emerald-500/10 to-emerald-600/5",
    accentColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    component: TesteAcuidade,
  },
];

export default function Ferramentas() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Ferramentas Oftalmológicas Gratuitas — Drudi e Almeida",
    "description": "Teste de risco de ceratocone, calculadora de catarata e teste de acuidade visual gratuitos. Ferramentas desenvolvidas por especialistas em oftalmologia.",
    "url": "https://institutodrudiealmeida.com.br/ferramentas",
    "publisher": {
      "@type": "MedicalOrganization",
      "name": "Drudi e Almeida Clínicas Oftalmológicas",
      "url": "https://institutodrudiealmeida.com.br",
    },
    "hasPart": tools.map(t => ({
      "@type": "WebApplication",
      "name": t.title,
      "description": t.description,
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "BRL" },
    })),
  };

  return (
    <>
      <SEOHead
        title="Ferramentas Oftalmológicas Gratuitas — Drudi e Almeida"
        description="Teste de risco de ceratocone, calculadora de maturidade da catarata e teste de acuidade visual. Ferramentas gratuitas desenvolvidas por especialistas em oftalmologia em São Paulo."
        keywords="teste ceratocone, calculadora catarata, teste acuidade visual, ferramentas oftalmologia, triagem ocular gratuita, risco ceratocone, Drudi e Almeida"
        canonicalPath="/ferramentas"
        schema={schema}
      />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "32px 32px" }} />
        <div className="container relative">
          <Breadcrumb items={[{ label: "Ferramentas", href: "/ferramentas" }]} />
          <AnimateOnScroll className="max-w-3xl mt-6">
            <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">
              Ferramentas Gratuitas
            </span>
            <h1 className="font-display text-4xl md:text-5xl text-cream mt-3 mb-5 leading-tight">
              Cuide da sua visão com <span className="text-gold italic">informação de qualidade</span>
            </h1>
            <p className="font-body text-lg text-cream/80 leading-relaxed max-w-2xl">
              Ferramentas interativas desenvolvidas com base em evidências científicas para ajudar você a entender melhor sua saúde ocular. Gratuitas, sem cadastro e validadas por especialistas.
            </p>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Aviso médico */}
      <div className="bg-amber-50 border-b border-amber-200">
        <div className="container py-3">
          <p className="font-body text-xs text-amber-800 text-center leading-relaxed">
            Estas ferramentas são para fins educativos e de triagem. Não substituem a consulta e o exame oftalmológico completo. Em caso de dúvida, consulte um oftalmologista.
          </p>
        </div>
      </div>

      {/* Tools grid */}
      <section className="section-padding">
        <div className="container">
          {!activeTool ? (
            <>
              <AnimateOnScroll className="text-center mb-12">
                <h2 className="font-display text-3xl text-navy mb-4">Escolha uma ferramenta</h2>
                <p className="font-body text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Selecione abaixo a ferramenta que deseja utilizar. Cada teste leva menos de 5 minutos e fornece orientações baseadas em critérios clínicos.
                </p>
              </AnimateOnScroll>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {tools.map((tool, i) => (
                  <AnimateOnScroll key={tool.id} delay={i * 0.1}>
                    <button
                      onClick={() => setActiveTool(tool.id)}
                      className={`group w-full text-left rounded-2xl border-2 ${tool.borderColor} bg-gradient-to-br ${tool.color} p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center mb-5 shadow-sm`}>
                        <tool.icon className={`w-6 h-6 ${tool.accentColor}`} />
                      </div>
                      <p className="font-ui text-xs font-semibold text-muted-foreground mb-2">{tool.subtitle}</p>
                      <h3 className="font-display text-xl text-navy mb-3 group-hover:text-navy-dark transition-colors leading-tight">
                        {tool.title}
                      </h3>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                        {tool.description}
                      </p>
                      <span className={`inline-flex items-center gap-1.5 font-ui text-xs font-bold ${tool.accentColor}`}>
                        Iniciar teste
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </AnimateOnScroll>
                ))}
              </div>

              {/* Seção educativa — por que usar */}
              <AnimateOnScroll>
                <div className="bg-gradient-to-br from-cream/60 to-background rounded-2xl border border-border/50 p-8 md:p-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    <div>
                      <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">Por que usar</span>
                      <h2 className="font-display text-2xl md:text-3xl text-navy mt-3 mb-5 leading-tight">
                        Diagnóstico precoce salva visão
                      </h2>
                      <p className="font-body text-base text-muted-foreground leading-relaxed mb-4">
                        O ceratocone e a catarata são condições progressivas que, quando detectadas precocemente, têm tratamentos muito mais eficazes e menos invasivos. A triagem domiciliar não substitui o exame médico, mas pode identificar sinais de alerta que motivam uma consulta preventiva.
                      </p>
                      <p className="font-body text-base text-muted-foreground leading-relaxed">
                        As ferramentas desta página foram desenvolvidas com base em critérios clínicos validados pela literatura científica e revisados pelos especialistas da Drudi e Almeida.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { value: "90%", label: "dos casos de cegueira são evitáveis com diagnóstico precoce (OMS)" },
                        { value: "10%", label: "da população tem algum grau de ceratocone subclínico" },
                        { value: "95%", label: "de sucesso na cirurgia de catarata com tecnologia moderna" },
                        { value: "5 min", label: "é o tempo médio para completar cada ferramenta" },
                      ].map((stat) => (
                        <div key={stat.value} className="bg-white rounded-xl p-5 border border-border/40 shadow-sm">
                          <div className="font-display text-2xl text-navy font-bold mb-1">{stat.value}</div>
                          <div className="font-body text-xs text-muted-foreground leading-relaxed">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            </>
          ) : (
            <>
              {/* Ferramenta ativa */}
              <div className="max-w-2xl mx-auto">
                <button
                  onClick={() => setActiveTool(null)}
                  className="inline-flex items-center gap-2 font-ui text-sm text-muted-foreground hover:text-navy transition-colors mb-8"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  Voltar para todas as ferramentas
                </button>

                {tools.filter(t => t.id === activeTool).map(tool => (
                  <div key={tool.id}>
                    <div className="mb-8">
                      <span className="font-ui text-xs font-semibold tracking-[0.2em] uppercase text-gold">{tool.subtitle}</span>
                      <h2 className="font-display text-3xl text-navy mt-2 mb-3">{tool.title}</h2>
                      <p className="font-body text-base text-muted-foreground leading-relaxed">{tool.description}</p>
                    </div>
                    <tool.component />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA final */}
      <section className="bg-navy section-padding">
        <div className="container text-center">
          <AnimateOnScroll>
            <h2 className="font-display text-3xl md:text-4xl text-cream mb-5">
              Pronto para uma avaliação completa?
            </h2>
            <p className="font-body text-lg text-cream/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Nossas ferramentas são um primeiro passo. O exame oftalmológico completo com equipamentos de última geração é o único caminho para um diagnóstico preciso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511916544653?text=Olá! Gostaria de agendar uma consulta oftalmológica."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-ui text-sm font-bold px-7 py-4 rounded-lg hover:bg-[#1ebe5d] transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Agendar pelo WhatsApp
              </a>
              <Link
                href="/agendar"
                className="inline-flex items-center justify-center gap-2 bg-white text-navy font-ui text-sm font-bold px-7 py-4 rounded-lg hover:bg-cream transition-colors"
              >
                Agendar Online
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </>
  );
}
