import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';
dotenv.config();

const ARTICLE_ID = 240002;
const OWNER_ID = 1;
const CATEGORY_ID = 30003; // Retina
const PUBLISHED_AT = '2026-04-14 09:00:00';

const title = 'Valeda para DMRI Seca: O Primeiro Tratamento Aprovado pelo FDA para Melhorar a Visão na Degeneração Macular';
const slug = 'valeda-dmri-seca-fotobiomodulacao-tratamento';
const excerpt = 'Em novembro de 2024, o FDA autorizou o Valeda Light Delivery System para DMRI seca — o primeiro tratamento capaz de melhorar a visão nessa condição. Conheça a ciência por trás da fotobiomodulação, os dados do ensaio LIGHTSITE III e o que os pacientes podem esperar.';
const seoTitle = 'Valeda para DMRI Seca: Fotobiomodulação Aprovada pelo FDA | Drudi e Almeida';
const seoDescription = 'O Valeda Light Delivery System foi aprovado pelo FDA em 2024 como primeiro tratamento para melhorar a visão na DMRI seca. Saiba como funciona a fotobiomodulação, os resultados do LIGHTSITE III e a disponibilidade no Brasil.';
const seoKeywords = 'valeda dmri, fotobiomodulação degeneração macular, tratamento dmri seca, valeda light delivery system, lightsite iii, dmri seca tratamento 2024, degeneração macular seca cura, valeda brasil, fotobiomodulação retina';
const authorName = 'Dr. Fernando Drudi';
const coverImageUrl = 'https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/valeda_dmri_capa_e10cc565.jpg';
const readingTimeMin = 12;

const content = `<article class="blog-article" itemscope itemtype="https://schema.org/MedicalWebPage">

<h2>Introdução</h2>

<p>Durante décadas, o diagnóstico de degeneração macular relacionada à idade (DMRI) na forma seca representou uma sentença sem resposta terapêutica eficaz. Enquanto a DMRI exsudativa (úmida) contava com injeções intravítreas de antiangiogênicos, a forma seca — responsável por 85 a 90% de todos os casos — permanecia sem tratamento capaz de melhorar a acuidade visual. Esse cenário mudou em novembro de 2024, quando o FDA (Food and Drug Administration) dos Estados Unidos autorizou o marketing do <strong>Valeda Light Delivery System</strong> (LumiThera/Alcon) para o tratamento de pacientes com DMRI seca intermediária.</p>

<p>A autorização representa um marco histórico na oftalmologia: pela primeira vez, existe um tratamento aprovado por uma agência regulatória de referência mundial com capacidade demonstrada de <strong>melhorar a acuidade visual</strong> em pacientes com DMRI seca. Este artigo apresenta os fundamentos científicos da tecnologia, os dados dos ensaios clínicos que embasaram a aprovação e o que os pacientes podem esperar desse tratamento.</p>

<h2>O que é a DMRI Seca?</h2>

<p>A degeneração macular relacionada à idade é a principal causa de perda central de visão em pessoas com mais de 55 anos em países desenvolvidos. Sua prevalência global era de 195,6 milhões de pessoas em 2020, com projeção de atingir 243,3 milhões até 2030 — um aumento de 24% impulsionado pelo envelhecimento populacional. No Brasil, estima-se que mais de 2 milhões de pessoas sejam afetadas pela doença.</p>

<p>A DMRI seca é caracterizada pelo acúmulo progressivo de depósitos lipoproteicos entre a retina e a coroide, conhecidos como <strong>drusas</strong>, e pela degeneração gradual das células do epitélio pigmentar da retina (EPR) e dos fotorreceptores. Em estágios avançados, evolui para <strong>atrofia geográfica</strong> — a perda irreversível de células da retina central, resultando em escotoma central que compromete gravemente a leitura, o reconhecimento de faces e a independência funcional do paciente.</p>

<p>A prevalência da DMRI aumenta progressivamente com a idade: de 4,2% na faixa dos 45 a 49 anos, chega a 27,2% entre 80 e 85 anos. Fatores de risco estabelecidos incluem tabagismo, histórico familiar, exposição cumulativa à luz ultravioleta, hipertensão arterial e dieta pobre em antioxidantes. O Dr. Fernando Drudi e a Dra. Priscilla Almeida, especialistas em retina da Drudi e Almeida Oftalmologia, ressaltam que o diagnóstico precoce — antes do desenvolvimento de atrofia geográfica — é determinante para o prognóstico e para a elegibilidade aos novos tratamentos.</p>

<h2>O que é o Valeda Light Delivery System?</h2>

<p>O Valeda é um dispositivo médico de fotobiomodulação (PBM) desenvolvido pela LumiThera e atualmente distribuído pela Alcon, a maior empresa de oftalmologia do mundo. O sistema entrega três comprimentos de onda de luz terapêutica de forma não invasiva, diretamente na retina:</p>

<table>
  <thead>
    <tr>
      <th>Comprimento de Onda</th>
      <th>Cor</th>
      <th>Irradiância</th>
      <th>Duração por Pulso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>590 nm</td>
      <td>Amarelo</td>
      <td>4 mW/cm²</td>
      <td>2 × 35 segundos</td>
    </tr>
    <tr>
      <td>660 nm</td>
      <td>Vermelho</td>
      <td>65 mW/cm²</td>
      <td>2 × 90 segundos</td>
    </tr>
    <tr>
      <td>850 nm</td>
      <td>Infravermelho próximo</td>
      <td>0,6 mW/cm²</td>
      <td>2 × 35 segundos</td>
    </tr>
  </tbody>
</table>

<p>Cada sessão de tratamento dura aproximadamente 5 minutos por olho e é completamente indolor. O protocolo aprovado consiste em <strong>9 sessões ao longo de 3 a 5 semanas</strong>, formando uma "série de tratamento". No ensaio clínico pivotal, os pacientes receberam 6 séries ao longo de 24 meses, com intervalos de 4 meses entre cada série.</p>

<h2>Como a Fotobiomodulação Atua na Retina?</h2>

<p>A fotobiomodulação é uma modalidade terapêutica que utiliza energia luminosa de baixa intensidade para estimular processos biológicos celulares. Na retina, o mecanismo de ação envolve múltiplas vias complementares.</p>

<p><strong>Ativação mitocondrial:</strong> Os cromóforos celulares — especialmente a citocromo c oxidase, enzima-chave da cadeia respiratória mitocondrial — absorvem os fótons dos comprimentos de onda terapêuticos. Essa absorção estimula a produção de ATP (adenosina trifosfato), a principal moeda energética da célula. As células do EPR e os fotorreceptores são altamente dependentes de energia mitocondrial, tornando-as particularmente responsivas a esse mecanismo.</p>

<p><strong>Modulação do estresse oxidativo:</strong> A PBM regula as espécies reativas de oxigênio (ROS), reduzindo o estresse oxidativo crônico que contribui para a degeneração das células da retina. O desequilíbrio oxidativo é um dos principais mecanismos patogênicos da DMRI seca.</p>

<p><strong>Efeitos anti-inflamatórios:</strong> A terapia modula vias inflamatórias locais, incluindo a redução de citocinas pró-inflamatórias como IL-1β e TNF-α, que contribuem para a progressão da doença.</p>

<p><strong>Neuroproteção:</strong> Estudos pré-clínicos demonstraram que a PBM pode promover a sobrevivência de fotorreceptores e células ganglionares da retina em modelos de degeneração retiniana.</p>

<h2>O Ensaio Clínico LIGHTSITE III: A Base Científica da Aprovação</h2>

<p>O estudo que fundamentou a aprovação do FDA foi o <strong>LIGHTSITE III</strong>, um ensaio clínico randomizado, duplo-cego e controlado por sham (tratamento simulado), publicado na revista <em>Retina</em> em março de 2024.</p>

<h3>Desenho do Estudo</h3>

<p>O LIGHTSITE III incluiu 100 pacientes (148 olhos) com DMRI intermediária seca, com ou sem atrofia geográfica não foveal. Os participantes foram randomizados para receber PBM real (91 olhos) ou tratamento sham (54 olhos) — um procedimento idêntico em aparência, mas sem emissão de luz terapêutica, garantindo o cegamento dos pacientes.</p>

<h3>Resultados Primários (13 Meses)</h3>

<p>No ponto de análise primária pré-especificado aos 13 meses (após 4 séries de tratamento), o grupo PBM apresentou ganho médio de <strong>5,4 letras ETDRS</strong> (P &lt; 0,0001), enquanto o grupo sham ganhou 3,0 letras. A diferença entre os grupos foi estatisticamente significativa (P = 0,02), representando o equivalente a uma linha no optotipo de Snellen.</p>

<h3>Resultados aos 24 Meses</h3>

<p>Ao final do estudo, com 24 meses de seguimento e 6 séries de tratamento, os resultados foram ainda mais favoráveis:</p>

<table>
  <thead>
    <tr>
      <th>Desfecho</th>
      <th>Grupo PBM</th>
      <th>Grupo Sham</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Ganho médio de letras ETDRS</td>
      <td>+5,9 letras</td>
      <td>+1,0 letra</td>
    </tr>
    <tr>
      <td>Variação no volume de drusas</td>
      <td>+0,006 mm³ (estável)</td>
      <td>+0,049 mm³ (aumento)</td>
    </tr>
    <tr>
      <td>Desenvolvimento de nova atrofia geográfica</td>
      <td>1/87 olhos (1,1%)</td>
      <td>5/50 olhos (10%)</td>
    </tr>
  </tbody>
</table>

<p>A diferença na taxa de progressão para atrofia geográfica foi estatisticamente significativa (P = 0,024), com odds ratio de 9,4 — indicando que os pacientes não tratados com PBM tiveram risco quase 10 vezes maior de desenvolver nova atrofia geográfica.</p>

<h2>LIGHTSITE IIIB: Benefícios Sustentados por até 4,5 Anos</h2>

<p>Apresentado no congresso ARVO (Association for Research in Vision and Ophthalmology) em maio de 2025, o estudo de extensão <strong>LIGHTSITE IIIB</strong> trouxe dados de longo prazo que reforçam o perfil do Valeda como tratamento modificador da doença.</p>

<p>O estudo incluiu 36 pacientes (63 olhos) que haviam participado do LIGHTSITE III. Um dado relevante: houve um intervalo médio de <strong>599 dias</strong> (aproximadamente 20 meses) sem tratamento entre os dois estudos. Durante esse período, todos os grupos — incluindo os que haviam recebido PBM — perderam entre 2 e 6 letras de acuidade visual, confirmando que os benefícios não persistem indefinidamente sem manutenção.</p>

<p>Após a retomada do tratamento com Valeda, todos os grupos recuperaram visão. Após 8 séries de PBM, com 3,7 anos desde o início do tratamento, o grupo que havia recebido PBM desde o início manteve ganho médio de <strong>5,5 letras</strong>. Mais de 60% dos pacientes que receberam Valeda em ambos os estudos ainda apresentavam benefício superior a uma linha de visão. Os benefícios foram documentados em até <strong>4,5 anos</strong> de seguimento — o maior período de acompanhamento já registrado para qualquer tratamento de DMRI seca.</p>

<p>Esses dados sugerem que o Valeda pode ser um tratamento de manutenção contínua, similar ao modelo de tratamento das doenças crônicas, em que a terapia regular previne a progressão e sustenta os ganhos visuais.</p>

<h2>Segurança e Tolerabilidade</h2>

<p>O perfil de segurança do Valeda foi consistentemente favorável nos estudos clínicos. O tratamento é não invasivo, indolor e não requer anestesia, dilatação pupilar ou recuperação pós-procedimento. Não foram observados eventos adversos oculares graves relacionados ao tratamento no LIGHTSITE III.</p>

<p>É importante ressaltar que a fototoxicidade — um risco teórico com qualquer terapia luminosa — não foi observada nos estudos com o Valeda em pacientes adultos com DMRI. Os parâmetros de irradiância utilizados estão bem abaixo dos limiares de segurança estabelecidos para exposição ocular à luz.</p>

<h2>Quem Pode se Beneficiar do Tratamento?</h2>

<p>Com base nos critérios de inclusão do LIGHTSITE III e nas indicações aprovadas pelo FDA, o Valeda é indicado para pacientes com DMRI intermediária seca (estágio 3 da classificação AREDS), presença de drusas de tamanho médio a grande (≥63 µm), e acuidade visual entre 20/25 e 20/200. Pacientes com atrofia geográfica não foveal também foram incluídos nos estudos.</p>

<p>O tratamento <strong>não é indicado</strong> para DMRI exsudativa (úmida) ativa, para atrofia geográfica foveal avançada com perda visual grave, ou para pacientes com outras doenças retinianas significativas concomitantes.</p>

<p>A avaliação de elegibilidade inclui exame de acuidade visual, mapeamento de retina por OCT (tomografia de coerência óptica), retinografia e, em alguns casos, angiofluoresceinografia. Na Drudi e Almeida Oftalmologia, o Dr. Fernando Drudi e a Dra. Priscilla Almeida realizam avaliação individualizada para determinar se o paciente é candidato ao tratamento com Valeda.</p>

<h2>Valeda no Brasil: Disponibilidade e Perspectivas</h2>

<p>O Valeda possui marcação CE (Europa) e UKCA (Reino Unido) e está disponível em países selecionados da América Latina. Com a aprovação do FDA em novembro de 2024 e a distribuição pela Alcon, a expectativa é de que o processo de aprovação pela ANVISA (Agência Nacional de Vigilância Sanitária) seja acelerado, seguindo o precedente regulatório americano.</p>

<p>Centros de excelência em retina no Brasil já acompanham de perto os desenvolvimentos clínicos do Valeda. A Drudi e Almeida Oftalmologia, com seus especialistas em retina, está atenta às atualizações regulatórias e científicas para oferecer aos pacientes o acesso mais rápido possível a essa tecnologia quando disponível no país.</p>

<h2>Perspectiva Clínica: O que os Especialistas Dizem</h2>

<p>A aprovação do Valeda pelo FDA gerou debate na comunidade científica sobre a magnitude do benefício clínico e a melhor forma de incorporar o tratamento à prática clínica.</p>

<p>Defensores do tratamento destacam que, além do ganho visual, os dados anatômicos são particularmente relevantes: a estabilização do volume de drusas e a redução significativa na progressão para atrofia geográfica representam um potencial efeito modificador da doença — não apenas sintomático. Em uma condição progressiva e irreversível como a DMRI seca, prevenir a progressão para atrofia geográfica é um objetivo terapêutico de alto valor clínico.</p>

<p>Críticos apontam que o tamanho amostral do LIGHTSITE III foi relativamente pequeno e que a variabilidade natural da acuidade visual na DMRI intermediária pode atingir até 9 letras ETDRS em 3 meses em olhos não tratados, questionando se o ganho de 5 letras reflete um efeito terapêutico real. Revisões sistemáticas publicadas em 2024 e 2025 indicam que a diferença média entre PBM e sham em meta-análises foi de 1,76 letras — abaixo da diferença mínima clinicamente importante (MCID) de 5 letras.</p>

<p>O consenso emergente é que o Valeda representa um avanço genuíno — o primeiro tratamento aprovado com capacidade de melhorar a visão na DMRI seca —, mas que estudos de maior escala e seguimento prolongado são necessários para definir com precisão os subgrupos de maior benefício e o protocolo de manutenção ideal.</p>

<h2>Perguntas Frequentes sobre o Valeda</h2>

<div class="faq-section" itemscope itemtype="https://schema.org/FAQPage">

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">O Valeda cura a degeneração macular?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">Não. O Valeda não cura a DMRI seca, mas demonstrou capacidade de melhorar a acuidade visual e retardar a progressão da doença em pacientes com DMRI intermediária. A DMRI é uma doença crônica e progressiva que requer acompanhamento contínuo.</p>
  </div>
</div>

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">O tratamento com Valeda é doloroso?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">Não. O procedimento é completamente indolor e não invasivo. O paciente senta-se diante do dispositivo e recebe a luz terapêutica pelos olhos abertos. Cada sessão dura aproximadamente 5 minutos por olho.</p>
  </div>
</div>

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">Quantas sessões são necessárias?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">O protocolo consiste em 9 sessões ao longo de 3 a 5 semanas (uma série). Os estudos clínicos utilizaram 6 séries ao longo de 24 meses, com intervalos de 4 meses. O tratamento de manutenção pode ser necessário indefinidamente para sustentar os benefícios.</p>
  </div>
</div>

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">O Valeda substitui as injeções intravítreas?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">Não. O Valeda é indicado para DMRI seca intermediária. As injeções intravítreas de antiangiogênicos são o tratamento padrão para DMRI exsudativa (úmida) — uma condição diferente. Os dois tratamentos não são concorrentes, mas complementares para diferentes formas da doença.</p>
  </div>
</div>

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">O Valeda já está disponível no Brasil?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">O Valeda foi aprovado pelo FDA em novembro de 2024 e está disponível em países selecionados da América Latina. O processo de aprovação pela ANVISA está em andamento. Consulte um especialista em retina para informações atualizadas sobre disponibilidade.</p>
  </div>
</div>

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">Quem não pode usar o Valeda?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">Pacientes com DMRI exsudativa ativa, atrofia geográfica foveal avançada, ou outras doenças retinianas significativas geralmente não são candidatos. A avaliação de elegibilidade deve ser realizada por um oftalmologista especializado em retina.</p>
  </div>
</div>

<div class="faq-item" itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
  <h3 itemprop="name">Quais são os efeitos colaterais do Valeda?</h3>
  <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
    <p itemprop="text">O perfil de segurança nos estudos clínicos foi favorável, sem eventos adversos oculares graves relacionados ao tratamento. Sensação transitória de luz brilhante durante o procedimento é esperada e normal.</p>
  </div>
</div>

</div>

<h2>Conclusão</h2>

<p>O Valeda Light Delivery System representa uma virada histórica no tratamento da DMRI seca — uma condição que afetava milhões de pacientes sem qualquer opção terapêutica eficaz. Com aprovação do FDA baseada em evidências de ensaios clínicos randomizados e dados de seguimento de até 4,5 anos, o Valeda demonstrou capacidade de melhorar a acuidade visual, estabilizar o volume de drusas e reduzir significativamente a progressão para atrofia geográfica.</p>

<p>A fotobiomodulação, por sua natureza não invasiva, indolor e sem efeitos colaterais significativos, representa um paradigma terapêutico diferente das abordagens farmacológicas tradicionais — e potencialmente complementar a elas. À medida que novos dados de estudos de extensão e estudos de fase IV acumulam-se, a comunidade científica terá subsídios para definir com maior precisão os pacientes que mais se beneficiam e o protocolo de manutenção ideal.</p>

<p>Para pacientes com DMRI seca intermediária, a mensagem é clara: existe, pela primeira vez, uma opção terapêutica aprovada com potencial de melhorar a visão. O acompanhamento regular com um especialista em retina — como o Dr. Fernando Drudi e a Dra. Priscilla Almeida, da Drudi e Almeida Oftalmologia — é essencial para identificar o estágio da doença, avaliar a elegibilidade ao tratamento e monitorar a resposta terapêutica.</p>

<h2>Referências</h2>

<ol>
  <li>Markowitz SN, Devenyi RG, Munk MR, et al. A Double-Masked, Randomized, Sham-Controlled, Single-Center Study with Photobiomodulation for the Treatment of Dry Age-Related Macular Degeneration. <em>Retina</em>. 2024;44(3):387-396. doi:10.1097/IAE.0000000000003963</li>
  <li>Do DV, Nguyen QD, et al. LIGHTSITE IIIB: Long-Term Extension Study of Photobiomodulation for Dry AMD — 4.5-Year Follow-Up Data. Presented at: ARVO Annual Meeting; May 2025; Salt Lake City, UT.</li>
  <li>Colucciello M, Rassi T, Berinstein DM. Can Photobiomodulation Regulate Dry AMD? <em>Retinal Physician</em>. March 2026.</li>
  <li>Wong WL, Su X, Li X, et al. Global prevalence of age-related macular degeneration and disease burden projection for 2020 and 2040: a systematic review and meta-analysis. <em>Lancet Glob Health</em>. 2014;2(2):e106-e116.</li>
  <li>Rassi T, et al. Photobiomodulation for intermediate age-related macular degeneration: systematic review and meta-analysis. <em>Ophthalmol Retina</em>. 2024.</li>
  <li>US Food and Drug Administration. De Novo Request for Valeda Light Delivery System. November 2024.</li>
</ol>

</article>`;

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);
  
  // Check if slug already exists
  const [existing] = await conn.query('SELECT id FROM blog_posts WHERE slug = ?', [slug]);
  if (existing.length > 0) {
    console.log(`Artigo já existe com ID: ${existing[0].id}. Atualizando...`);
    await conn.query(
      `UPDATE blog_posts SET 
        title = ?, excerpt = ?, content = ?, coverImageUrl = ?,
        seoTitle = ?, seoDescription = ?, seoKeywords = ?,
        status = 'published', categoryId = ?, authorName = ?,
        readingTimeMin = ?, featured = 1, publishedAt = ?
       WHERE slug = ?`,
      [title, excerpt, content, coverImageUrl, seoTitle, seoDescription, seoKeywords,
       CATEGORY_ID, authorName, readingTimeMin, PUBLISHED_AT, slug]
    );
    console.log('Artigo atualizado com sucesso!');
  } else {
    await conn.query(
      `INSERT INTO blog_posts 
        (id, title, slug, excerpt, content, coverImageUrl, seoTitle, seoDescription, seoKeywords,
         contentType, status, categoryId, authorId, authorName, readingTimeMin, viewCount, featured, publishedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'article', 'published', ?, ?, ?, ?, 0, 1, ?)`,
      [ARTICLE_ID, title, slug, excerpt, content, coverImageUrl, seoTitle, seoDescription, seoKeywords,
       CATEGORY_ID, OWNER_ID, authorName, readingTimeMin, PUBLISHED_AT]
    );
    console.log(`Artigo inserido com ID: ${ARTICLE_ID}`);
  }
  
  // Verify
  const [rows] = await conn.query('SELECT id, title, slug, status, featured, publishedAt FROM blog_posts WHERE slug = ?', [slug]);
  console.log('Verificação:', JSON.stringify(rows[0], null, 2));
  
  await conn.end();
  console.log('\nConcluído!');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
