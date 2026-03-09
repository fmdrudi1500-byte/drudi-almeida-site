import { createConnection } from 'mysql2/promise';

const AUTHOR_ID = 1;
const AUTHOR_NAME = 'Drudi e Almeida Oftalmologia';
const CATEGORY_SAUDE_OCULAR = 60001;
const CATEGORY_CERATOCONE = 30001;
const CATEGORY_GLAUCOMA = 30002;

const articles = [
  {
    id: 70001,
    title: 'Síndrome do Olho Seco: Causas, Sintomas e Tratamentos Eficazes',
    slug: 'sindrome-olho-seco-causas-sintomas-tratamentos',
    excerpt: 'A síndrome do olho seco afeta milhões de brasileiros e pode comprometer a qualidade de vida. Saiba identificar os sintomas, as causas e os tratamentos mais eficazes disponíveis.',
    content: `<h2>O que é a Síndrome do Olho Seco?</h2>
<p>A síndrome do olho seco (ceratoconjuntivite seca) é uma das condições oftalmológicas mais prevalentes no Brasil, afetando cerca de 30% da população adulta. Ela ocorre quando os olhos não produzem lágrimas suficientes ou quando as lágrimas evaporam muito rapidamente, comprometendo a lubrificação e a saúde da superfície ocular.</p>
<p>As lágrimas são compostas por três camadas: lipídica (oleosa), aquosa e mucosa. Qualquer desequilíbrio nessas camadas pode levar ao olho seco, seja por deficiência de produção ou por evaporação excessiva.</p>

<h2>Causas Mais Comuns do Olho Seco</h2>
<p>O olho seco pode ter origem multifatorial. Entre as causas mais frequentes estão:</p>
<ul>
<li><strong>Uso excessivo de telas</strong> (computadores, celulares, tablets): reduz a frequência de piscar, de 15-20 vezes por minuto para 5-7 vezes</li>
<li><strong>Envelhecimento</strong>: a produção lacrimal diminui naturalmente com a idade, especialmente após os 50 anos</li>
<li><strong>Alterações hormonais</strong>: a menopausa é um fator de risco importante para mulheres</li>
<li><strong>Medicamentos</strong>: anti-histamínicos, antidepressivos, diuréticos e anticoncepcionais podem reduzir a produção de lágrimas</li>
<li><strong>Doenças sistêmicas</strong>: Síndrome de Sjögren, artrite reumatoide, lúpus e diabetes</li>
<li><strong>Blefarite</strong>: inflamação das pálpebras que compromete as glândulas de Meibômio</li>
<li><strong>Ambiente</strong>: ar condicionado, vento, baixa umidade e poluição</li>
<li><strong>Uso prolongado de lentes de contato</strong></li>
<li><strong>Cirurgias refrativas</strong> (LASIK, PRK): podem causar olho seco temporário ou permanente</li>
</ul>

<h2>Sintomas do Olho Seco</h2>
<p>Os sintomas variam de leves a graves e incluem:</p>
<ul>
<li>Sensação de areia ou corpo estranho nos olhos</li>
<li>Ardência, coceira ou queimação ocular</li>
<li>Visão embaçada que melhora ao piscar</li>
<li>Olhos vermelhos e irritados</li>
<li>Lacrimejamento excessivo (paradoxalmente, o olho seco pode provocar lacrimejamento reflexo)</li>
<li>Dificuldade para usar lentes de contato</li>
<li>Sensibilidade à luz (fotofobia)</li>
<li>Cansaço visual, especialmente ao final do dia</li>
<li>Secreção esbranquiçada nos cantos dos olhos ao acordar</li>
</ul>

<h2>Como é Feito o Diagnóstico?</h2>
<p>O diagnóstico do olho seco é clínico e laboratorial. O oftalmologista realizará uma avaliação completa que pode incluir:</p>
<ul>
<li><strong>Teste de Schirmer</strong>: mede a produção lacrimal com uma tira de papel filtro colocada na pálpebra inferior por 5 minutos</li>
<li><strong>Tempo de ruptura do filme lacrimal (TBUT)</strong>: avalia a estabilidade das lágrimas com corante fluorescente</li>
<li><strong>Biomicroscopia com lâmpada de fenda</strong>: examina a superfície ocular em detalhes</li>
<li><strong>Coloração com rosa-bengala ou verde de lisamina</strong>: identifica células danificadas na córnea e conjuntiva</li>
<li><strong>Osmolaridade lacrimal</strong>: exame moderno que mede a concentração das lágrimas</li>
</ul>

<h2>Tratamentos Disponíveis</h2>
<p>O tratamento do olho seco é individualizado e depende da causa e gravidade. As principais opções incluem:</p>

<h3>Lágrimas Artificiais</h3>
<p>São a primeira linha de tratamento para casos leves a moderados. Existem diversas formulações (com e sem conservantes, em gel, em pomada) que o médico escolherá conforme o perfil do paciente. Para uso frequente (mais de 4 vezes ao dia), recomenda-se versões sem conservantes para evitar toxicidade.</p>

<h3>Medicamentos Anti-inflamatórios</h3>
<p>Para casos moderados a graves, o oftalmologista pode prescrever colírios de ciclosporina ou lifitegraste, que reduzem a inflamação da superfície ocular e aumentam a produção de lágrimas naturais.</p>

<h3>Tampões Punctais</h3>
<p>Pequenos dispositivos inseridos nos canais lacrimais para reduzir a drenagem das lágrimas, mantendo-as por mais tempo na superfície ocular.</p>

<h3>Tratamento das Glândulas de Meibômio</h3>
<p>Para olho seco evaporativo causado por disfunção das glândulas de Meibômio, podem ser indicados: compressas mornas, higiene palpebral, suplementação com ômega-3 e procedimentos como IPL (luz pulsada intensa) ou LipiFlow.</p>

<h3>Soro Autólogo</h3>
<p>Para casos graves, colírios preparados com o próprio sangue do paciente (soro autólogo) oferecem fatores de crescimento que promovem a regeneração da superfície ocular.</p>

<h2>Dicas para Prevenir e Aliviar o Olho Seco no Dia a Dia</h2>
<ul>
<li>Faça pausas regulares ao usar telas (regra 20-20-20: a cada 20 minutos, olhe para algo a 20 pés por 20 segundos)</li>
<li>Pisque conscientemente com mais frequência</li>
<li>Use umidificador de ar nos ambientes</li>
<li>Evite ar condicionado diretamente nos olhos</li>
<li>Use óculos de proteção em ambientes com vento ou poeira</li>
<li>Mantenha-se hidratado (beba pelo menos 2 litros de água por dia)</li>
<li>Inclua ômega-3 na dieta (peixes, linhaça, chia)</li>
<li>Não esfregue os olhos</li>
</ul>

<h2>Quando Procurar um Oftalmologista?</h2>
<p>Se os sintomas persistirem por mais de uma semana, piorarem progressivamente ou interferirem nas atividades diárias, é fundamental consultar um oftalmologista. O olho seco não tratado pode evoluir para complicações como úlceras de córnea e comprometimento permanente da visão.</p>
<p>Na Drudi e Almeida Oftalmologia, nossa equipe especializada realiza avaliação completa da superfície ocular e oferece tratamentos personalizados para cada paciente. <a href="/agendar">Agende sua consulta</a> e cuide da saúde dos seus olhos.</p>`,
    seoTitle: 'Síndrome do Olho Seco: Causas, Sintomas e Tratamento | Drudi e Almeida',
    seoDescription: 'Olho seco afeta 30% dos adultos. Conheça as causas (telas, ar condicionado, menopausa), sintomas e tratamentos eficazes. Consulte um especialista em São Paulo.',
    seoKeywords: 'olho seco, síndrome do olho seco, ceratoconjuntivite seca, tratamento olho seco, lágrimas artificiais, olho seco sintomas, olho seco causas',
    categoryId: CATEGORY_SAUDE_OCULAR,
    tags: JSON.stringify(['olho seco', 'superfície ocular', 'lágrimas artificiais', 'blefarite', 'meibômio']),
    readingTimeMin: 8,
    featured: 1,
    coverImageUrl: 'https://d3n3iy9uy8yjfp.cloudfront.net/blog/olho-seco-cover.webp',
    publishedAt: new Date('2026-02-15T10:00:00Z'),
  },
  {
    id: 70002,
    title: 'Lentes de Contato para Ceratocone: Tipos, Indicações e Cuidados Essenciais',
    slug: 'lentes-contato-ceratocone-tipos-indicacoes-cuidados',
    excerpt: 'Para pacientes com ceratocone, as lentes de contato especiais são frequentemente a melhor opção para corrigir a visão. Entenda os tipos disponíveis, como escolher e os cuidados necessários.',
    content: `<h2>Por Que Lentes de Contato São Importantes no Ceratocone?</h2>
<p>O ceratocone é uma doença progressiva que causa o afinamento e a protrusão da córnea, resultando em distorções visuais que os óculos convencionais muitas vezes não conseguem corrigir adequadamente. Nesse contexto, as lentes de contato especializadas se tornam a principal ferramenta para reabilitar a visão desses pacientes.</p>
<p>Ao contrário dos óculos, que apenas compensam a refração, as lentes de contato criam uma nova superfície óptica regular sobre a córnea irregular, proporcionando uma visão significativamente melhor.</p>

<h2>Tipos de Lentes de Contato para Ceratocone</h2>

<h3>1. Lentes Rígidas Gás-Permeáveis (RGP)</h3>
<p>São as mais tradicionais e ainda amplamente utilizadas. Por serem rígidas, "mascaram" a irregularidade da córnea e proporcionam boa acuidade visual. No entanto, podem ser menos confortáveis inicialmente e exigem adaptação.</p>

<h3>2. Lentes Esclerais</h3>
<p>Lentes de grande diâmetro (16-24mm) que se apoiam na esclera (parte branca do olho), sem tocar a córnea. São preenchidas com solução salina, criando um "reservatório" de líquido entre a lente e a córnea. Oferecem excelente conforto e são indicadas para ceratocones avançados ou pacientes que não toleraram lentes menores.</p>

<h3>3. Lentes Híbridas</h3>
<p>Combinam centro rígido (para boa acuidade visual) com periferia macia (para conforto). São uma boa opção para pacientes que buscam o equilíbrio entre visão nítida e conforto.</p>

<h3>4. Lentes Piggyback</h3>
<p>Consiste em usar uma lente macia descartável como "almofada" sob a lente rígida, aumentando o conforto. Indicada quando a lente rígida sozinha causa desconforto excessivo.</p>

<h3>5. Lentes de Contato Personalizadas (Topografia-Guiadas)</h3>
<p>Fabricadas com base no mapa topográfico individual da córnea do paciente, oferecem adaptação mais precisa e confortável. São especialmente úteis em ceratocones com geometrias irregulares.</p>

<h2>Como é Feita a Adaptação de Lentes para Ceratocone?</h2>
<p>A adaptação de lentes para ceratocone é um processo especializado que requer:</p>
<ol>
<li><strong>Topografia corneana</strong>: mapeamento detalhado da curvatura da córnea</li>
<li><strong>Paquimetria</strong>: medição da espessura corneana</li>
<li><strong>Avaliação clínica completa</strong>: estágio do ceratocone, acuidade visual, refração</li>
<li><strong>Seleção e prova de lentes</strong>: o especialista testa diferentes lentes e parâmetros</li>
<li><strong>Avaliação com lâmpada de fenda</strong>: verifica o ajuste e o padrão de fluoresceína</li>
<li><strong>Treinamento do paciente</strong>: colocação, remoção e higiene das lentes</li>
</ol>
<p>O processo pode exigir múltiplas consultas até encontrar a lente ideal. Na Drudi e Almeida, o Instituto do Ceratocone conta com especialistas experientes em adaptação de lentes para todos os estágios da doença.</p>

<h2>Cuidados Essenciais com as Lentes</h2>
<p>O uso correto e a higiene adequada são fundamentais para evitar infecções e prolongar a vida útil das lentes:</p>
<ul>
<li><strong>Lave sempre as mãos</strong> antes de manipular as lentes</li>
<li><strong>Limpe e desinfete</strong> as lentes conforme orientação do especialista</li>
<li><strong>Nunca use água da torneira</strong> para lavar ou armazenar lentes</li>
<li><strong>Troque o estojo regularmente</strong> (a cada 1-3 meses)</li>
<li><strong>Respeite o tempo de uso</strong> diário recomendado</li>
<li><strong>Não durma</strong> com as lentes (exceto lentes especificamente indicadas para uso contínuo)</li>
<li><strong>Consulte o especialista</strong> imediatamente se sentir dor, vermelhidão intensa ou piora da visão</li>
<li><strong>Mantenha consultas regulares</strong> para monitorar a progressão do ceratocone</li>
</ul>

<h2>Lentes de Contato vs. Crosslinking: São Excludentes?</h2>
<p>Não. O crosslinking (CXL) é um tratamento para <strong>estabilizar</strong> o ceratocone e interromper sua progressão, mas não corrige a visão. As lentes de contato são usadas para <strong>reabilitar a visão</strong>. Na maioria dos casos, o paciente faz o crosslinking para estabilizar a doença e continua usando lentes para enxergar bem.</p>

<h2>Quando as Lentes Não São Suficientes?</h2>
<p>Em casos avançados onde as lentes não proporcionam visão satisfatória ou não são toleradas, pode ser indicado o transplante de córnea (ceratoplastia). Porém, com os avanços nas lentes esclerais e personalizadas, cada vez menos pacientes chegam a esse estágio.</p>

<h2>Agende sua Avaliação</h2>
<p>Se você tem ceratocone ou suspeita da condição, o Instituto do Ceratocone da Drudi e Almeida oferece avaliação completa e adaptação especializada de lentes. <a href="/agendar">Agende sua consulta</a> com nossos especialistas.</p>`,
    seoTitle: 'Lentes de Contato para Ceratocone: Tipos e Cuidados | Drudi e Almeida',
    seoDescription: 'Conheça os tipos de lentes para ceratocone: esclerais, rígidas, híbridas. Como é a adaptação, cuidados essenciais e quando indicar. Especialistas em SP.',
    seoKeywords: 'lentes de contato ceratocone, lentes esclerais, lentes rígidas ceratocone, adaptação lentes ceratocone, ceratocone tratamento visão',
    categoryId: CATEGORY_CERATOCONE,
    tags: JSON.stringify(['ceratocone', 'lentes de contato', 'lentes esclerais', 'adaptação de lentes', 'córnea']),
    readingTimeMin: 9,
    featured: 0,
    coverImageUrl: 'https://d3n3iy9uy8yjfp.cloudfront.net/blog/lentes-ceratocone-cover.webp',
    publishedAt: new Date('2026-02-20T10:00:00Z'),
  },
  {
    id: 70003,
    title: 'Exame de Vista Completo: O Que Avalia, Com Que Frequência Fazer e Por Que É Essencial',
    slug: 'exame-de-vista-completo-o-que-avalia-frequencia-importancia',
    excerpt: 'O exame de vista completo vai muito além de medir o grau dos óculos. Descubra o que é avaliado, com que frequência você deve consultar um oftalmologista e por que a prevenção é fundamental.',
    content: `<h2>O Que É um Exame de Vista Completo?</h2>
<p>Muitas pessoas acreditam que o exame de vista se resume à medição do grau para prescrição de óculos ou lentes de contato. Na realidade, um exame oftalmológico completo é uma avaliação abrangente da saúde ocular que pode detectar dezenas de condições — algumas sem nenhum sintoma inicial — que, se não tratadas, podem levar à perda permanente da visão.</p>
<p>A consulta com um oftalmologista é diferente de um simples teste de acuidade visual realizado em óticas. O médico oftalmologista é o único profissional habilitado para diagnosticar e tratar doenças oculares.</p>

<h2>O Que é Avaliado no Exame Oftalmológico Completo?</h2>

<h3>1. Anamnese (Histórico Clínico)</h3>
<p>O médico investiga queixas visuais, histórico familiar de doenças oculares (glaucoma, degeneração macular, ceratocone), doenças sistêmicas (diabetes, hipertensão, doenças autoimunes) e medicamentos em uso.</p>

<h3>2. Acuidade Visual</h3>
<p>Avaliação da nitidez da visão com e sem correção óptica, usando a tabela de Snellen ou tabelas digitais. Testa cada olho separadamente e os dois juntos.</p>

<h3>3. Refração (Medição do Grau)</h3>
<p>Determina se há miopia, hipermetropia, astigmatismo ou presbiopia e qual a correção óptica necessária. Pode ser feita de forma objetiva (com autorrefratômetro) e subjetiva (com lentes de prova).</p>

<h3>4. Biomicroscopia (Lâmpada de Fenda)</h3>
<p>Exame detalhado das estruturas anteriores do olho: pálpebras, conjuntiva, córnea, íris, cristalino e câmara anterior. Detecta catarata, ceratocone, conjuntivites, pterígio, entre outros.</p>

<h3>5. Tonometria (Pressão Intraocular)</h3>
<p>Medição da pressão dentro do olho. Pressão elevada é um fator de risco importante para o glaucoma. O exame é rápido e indolor (tonômetro de sopro ou de aplanação).</p>

<h3>6. Fundoscopia (Exame do Fundo de Olho)</h3>
<p>Avaliação da retina, nervo óptico e vasos sanguíneos. Detecta retinopatia diabética, degeneração macular, descolamento de retina, glaucoma avançado e alterações vasculares. Pode ser feita com ou sem dilatação da pupila.</p>

<h3>7. Campimetria (Campo Visual)</h3>
<p>Avalia a amplitude do campo visual periférico. Fundamental para o diagnóstico e acompanhamento do glaucoma e de doenças neurológicas.</p>

<h3>8. Exames Complementares (quando indicados)</h3>
<ul>
<li><strong>Topografia corneana</strong>: mapeamento da curvatura da córnea (ceratocone, pré-operatório de cirurgia refrativa)</li>
<li><strong>OCT (Tomografia de Coerência Óptica)</strong>: imagem de alta resolução da retina e nervo óptico</li>
<li><strong>Retinografia</strong>: fotografia do fundo de olho para documentação e acompanhamento</li>
<li><strong>Angiofluoresceinografia</strong>: avaliação da circulação retiniana com contraste</li>
<li><strong>Paquimetria</strong>: medição da espessura da córnea</li>
<li><strong>Biometria</strong>: cálculo do implante de lente intraocular antes da cirurgia de catarata</li>
</ul>

<h2>Com Que Frequência Fazer o Exame Oftalmológico?</h2>
<p>A frequência ideal varia conforme a idade e fatores de risco:</p>

<table>
<thead>
<tr><th>Faixa Etária / Situação</th><th>Frequência Recomendada</th></tr>
</thead>
<tbody>
<tr><td>Recém-nascidos</td><td>Teste do reflexo vermelho na maternidade</td></tr>
<tr><td>6 meses a 3 anos</td><td>Pelo menos 1 consulta</td></tr>
<tr><td>3 a 6 anos (pré-escolar)</td><td>Anualmente</td></tr>
<tr><td>6 a 18 anos</td><td>A cada 1-2 anos</td></tr>
<tr><td>18 a 40 anos (sem fatores de risco)</td><td>A cada 2-3 anos</td></tr>
<tr><td>40 a 60 anos</td><td>Anualmente</td></tr>
<tr><td>Acima de 60 anos</td><td>A cada 6-12 meses</td></tr>
<tr><td>Diabéticos</td><td>Anualmente (ou conforme orientação médica)</td></tr>
<tr><td>Hipertensos</td><td>Anualmente</td></tr>
<tr><td>Histórico familiar de glaucoma</td><td>Anualmente a partir dos 40 anos</td></tr>
<tr><td>Usuários de lentes de contato</td><td>Anualmente</td></tr>
</tbody>
</table>

<h2>Por Que a Prevenção É Fundamental?</h2>
<p>Diversas doenças oculares graves evoluem de forma silenciosa, sem sintomas perceptíveis nas fases iniciais:</p>
<ul>
<li><strong>Glaucoma</strong>: chamado de "ladrão silencioso da visão", pode destruir 40% das fibras do nervo óptico antes de causar qualquer sintoma</li>
<li><strong>Retinopatia diabética</strong>: principal causa de cegueira em adultos em idade produtiva, frequentemente assintomática no início</li>
<li><strong>Degeneração macular seca</strong>: progride lentamente e pode ser monitorada e tratada se detectada precocemente</li>
<li><strong>Ceratocone</strong>: tem melhor prognóstico quando diagnosticado e tratado nas fases iniciais</li>
</ul>
<p>O diagnóstico precoce é a diferença entre preservar e perder a visão. Um simples exame anual pode mudar completamente o prognóstico de uma doença ocular grave.</p>

<h2>Sinais de Alerta: Quando Consultar Imediatamente</h2>
<p>Independentemente da última consulta, procure um oftalmologista urgentemente se apresentar:</p>
<ul>
<li>Perda súbita de visão (total ou parcial)</li>
<li>Flashes de luz ou aumento repentino de moscas volantes</li>
<li>Dor ocular intensa</li>
<li>Olho vermelho com secreção purulenta</li>
<li>Visão dupla de início súbito</li>
<li>Trauma ocular</li>
</ul>

<h2>Agende Seu Exame na Drudi e Almeida</h2>
<p>A Drudi e Almeida Oftalmologia oferece exame oftalmológico completo com equipamentos de última geração em 5 unidades na Grande São Paulo. Nossa equipe multidisciplinar está preparada para diagnosticar e tratar qualquer condição ocular com excelência e acolhimento. <a href="/agendar">Agende sua consulta</a> hoje mesmo.</p>`,
    seoTitle: 'Exame de Vista Completo: O Que Avalia e Com Que Frequência Fazer | Drudi e Almeida',
    seoDescription: 'Saiba o que é avaliado no exame oftalmológico completo, com que frequência fazer por idade e por que a prevenção é essencial para preservar a visão. Agende em SP.',
    seoKeywords: 'exame de vista completo, consulta oftalmologista, exame oftalmológico, frequência exame olhos, prevenção doenças oculares, tonometria, fundoscopia',
    categoryId: CATEGORY_SAUDE_OCULAR,
    tags: JSON.stringify(['exame de vista', 'prevenção', 'saúde ocular', 'oftalmologista', 'diagnóstico precoce']),
    readingTimeMin: 10,
    featured: 1,
    coverImageUrl: 'https://d3n3iy9uy8yjfp.cloudfront.net/blog/exame-vista-completo-cover.webp',
    publishedAt: new Date('2026-03-01T10:00:00Z'),
  },
  {
    id: 70004,
    title: 'Glaucoma de Ângulo Fechado: Sintomas de Emergência e Como Agir',
    slug: 'glaucoma-angulo-fechado-crise-aguda-sintomas-emergencia',
    excerpt: 'A crise aguda de glaucoma de ângulo fechado é uma emergência oftalmológica. Saiba reconhecer os sintomas e o que fazer para evitar a perda permanente da visão.',
    content: `<h2>O Que é o Glaucoma de Ângulo Fechado?</h2>
<p>O glaucoma é uma doença do nervo óptico, geralmente associada ao aumento da pressão intraocular. Existem dois tipos principais: o glaucoma de ângulo aberto (mais comum, crônico e silencioso) e o glaucoma de ângulo fechado (menos comum, mas potencialmente mais urgente).</p>
<p>No glaucoma de ângulo fechado, a íris bloqueia o ângulo de drenagem do humor aquoso (líquido interno do olho), causando aumento súbito e grave da pressão intraocular. Quando isso ocorre de forma aguda, constitui uma emergência oftalmológica que pode causar cegueira permanente em horas se não tratada.</p>

<h2>Fatores de Risco</h2>
<p>Algumas características anatômicas e condições aumentam o risco de glaucoma de ângulo fechado:</p>
<ul>
<li><strong>Hipermetropia</strong>: olhos mais curtos têm câmara anterior mais rasa</li>
<li><strong>Idade</strong>: o cristalino aumenta com a idade, estreitando o ângulo</li>
<li><strong>Sexo feminino</strong>: mulheres têm maior prevalência</li>
<li><strong>Ascendência asiática</strong>: maior predisposição anatômica</li>
<li><strong>Histórico familiar</strong></li>
<li><strong>Uso de certos medicamentos</strong>: anticolinérgicos, antidepressivos, descongestionantes nasais</li>
<li><strong>Ambientes escuros</strong>: a pupila dilata em locais escuros, podendo desencadear a crise</li>
</ul>

<h2>Sintomas da Crise Aguda de Glaucoma</h2>
<p>A crise aguda de glaucoma de ângulo fechado é dramática e inconfundível:</p>
<ul>
<li><strong>Dor ocular intensa e súbita</strong> (frequentemente descrita como "a pior dor da vida")</li>
<li><strong>Visão turva ou embaçada</strong></li>
<li><strong>Halos coloridos ao redor de luzes</strong></li>
<li><strong>Olho vermelho</strong></li>
<li><strong>Pupila dilatada e não reativa à luz</strong></li>
<li><strong>Olho duro ao toque</strong></li>
<li><strong>Náuseas e vômitos</strong> (podem ser tão intensos que o paciente pensa em problema gastrointestinal)</li>
<li><strong>Dor de cabeça intensa</strong></li>
</ul>
<p><strong>Atenção:</strong> Os sintomas sistêmicos (náusea, vômito, dor de cabeça) podem desviar o diagnóstico para causas neurológicas ou gastrointestinais, atrasando o tratamento. Se houver dor ocular associada, procure imediatamente um pronto-socorro oftalmológico.</p>

<h2>O Que Fazer em uma Crise Aguda?</h2>
<p>A crise aguda de glaucoma é uma emergência médica. Siga estas orientações:</p>
<ol>
<li><strong>Procure imediatamente</strong> um pronto-socorro oftalmológico ou emergência hospitalar</li>
<li><strong>Não espere</strong> — cada hora conta para preservar a visão</li>
<li><strong>Informe</strong> o médico sobre todos os medicamentos em uso</li>
<li><strong>Não use</strong> colírios sem prescrição médica</li>
</ol>
<p>O tratamento de emergência inclui colírios para reduzir a pressão intraocular, medicamentos sistêmicos (acetazolamida, manitol) e, após estabilização, iridotomia a laser para criar uma abertura na íris e prevenir novas crises.</p>

<h2>Glaucoma de Ângulo Fechado Crônico</h2>
<p>Nem todo glaucoma de ângulo fechado se apresenta como crise aguda. Existe também a forma crônica, que evolui lentamente e pode ser assintomática por anos — similar ao glaucoma de ângulo aberto. Por isso, o exame oftalmológico regular é fundamental para detectar o estreitamento do ângulo antes que ocorra uma crise.</p>

<h2>Prevenção: Iridotomia Profilática</h2>
<p>Pacientes com ângulo estreito identificado no exame oftalmológico podem se beneficiar da iridotomia a laser profilática — um procedimento simples e ambulatorial que cria uma pequena abertura na íris, eliminando o risco de bloqueio pupilar e crise aguda.</p>

<h2>Acompanhamento no Instituto do Glaucoma</h2>
<p>O Instituto do Glaucoma da Drudi e Almeida oferece diagnóstico avançado com topografia do nervo óptico, campimetria computadorizada e OCT, além de tratamento clínico e cirúrgico para todas as formas de glaucoma. <a href="/agendar">Agende sua avaliação</a> preventiva.</p>`,
    seoTitle: 'Glaucoma de Ângulo Fechado: Crise Aguda, Sintomas e Emergência | Drudi e Almeida',
    seoDescription: 'Crise aguda de glaucoma é emergência oftalmológica. Reconheça os sintomas: dor ocular intensa, náuseas, halos. Saiba o que fazer e como prevenir. Especialistas em SP.',
    seoKeywords: 'glaucoma ângulo fechado, crise aguda glaucoma, glaucoma emergência, sintomas glaucoma agudo, iridotomia laser, glaucoma tratamento',
    categoryId: CATEGORY_GLAUCOMA,
    tags: JSON.stringify(['glaucoma', 'crise aguda', 'emergência oftalmológica', 'pressão ocular', 'iridotomia']),
    readingTimeMin: 7,
    featured: 0,
    coverImageUrl: 'https://d3n3iy9uy8yjfp.cloudfront.net/blog/glaucoma-angulo-fechado-cover.webp',
    publishedAt: new Date('2026-03-05T10:00:00Z'),
  },
];

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL || '');
  
  for (const article of articles) {
    try {
      await conn.execute(
        `INSERT INTO blog_posts 
          (id, title, slug, excerpt, content, coverImageUrl, seoTitle, seoDescription, seoKeywords, 
           contentType, status, categoryId, tags, authorId, authorName, readingTimeMin, featured, publishedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'article', 'published', ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           title = VALUES(title),
           slug = VALUES(slug),
           excerpt = VALUES(excerpt),
           content = VALUES(content),
           seoTitle = VALUES(seoTitle),
           seoDescription = VALUES(seoDescription),
           seoKeywords = VALUES(seoKeywords),
           status = VALUES(status)`,
        [
          article.id,
          article.title,
          article.slug,
          article.excerpt,
          article.content,
          article.coverImageUrl,
          article.seoTitle,
          article.seoDescription,
          article.seoKeywords,
          article.categoryId,
          article.tags,
          AUTHOR_ID,
          AUTHOR_NAME,
          article.readingTimeMin,
          article.featured,
          article.publishedAt,
        ]
      );
      console.log(`✅ Artigo inserido/atualizado: ${article.title}`);
    } catch (err) {
      console.error(`❌ Erro ao inserir "${article.title}":`, err.message);
    }
  }
  
  await conn.end();
  console.log('\n✅ Seed de artigos concluído!');
}

main().catch(console.error);
