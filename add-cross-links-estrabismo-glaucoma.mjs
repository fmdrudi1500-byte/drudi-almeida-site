/**
 * Adiciona blocos "Leia Também" nos 4 artigos comerciais de estrabismo e glaucoma,
 * criando links cruzados entre os artigos do mesmo cluster temático.
 */
import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

// Bloco HTML do "Leia Também" para artigos de ESTRABISMO
const leiaTambemEstrabismoPreco = `
<div class="leia-tambem" style="background: linear-gradient(135deg, #f8f9fa 0%, #e8f4f8 100%); border-left: 4px solid #c9a961; border-radius: 8px; padding: 20px 24px; margin: 32px 0;">
  <p style="font-weight: 700; color: #2c3e50; margin: 0 0 12px 0; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;">Leia Também</p>
  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
    <li><a href="/blog/cirurgia-estrabismo-adulto-vale-a-pena" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Cirurgia de Estrabismo em Adultos: Vale a Pena? Mitos e Resultados</a></li>
    <li><a href="/instituto/estrabismo" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Instituto de Estrabismo — Drudi e Almeida: Conheça Nossa Especialidade</a></li>
    <li><a href="/blog/estrabismo-causas-diagnostico-tratamento-cirurgia-mm63sf9c" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Estrabismo: Causas, Diagnóstico e Tratamento Completo</a></li>
  </ul>
</div>`;

const leiaTambemEstrabismoAdulto = `
<div class="leia-tambem" style="background: linear-gradient(135deg, #f8f9fa 0%, #e8f4f8 100%); border-left: 4px solid #c9a961; border-radius: 8px; padding: 20px 24px; margin: 32px 0;">
  <p style="font-weight: 700; color: #2c3e50; margin: 0 0 12px 0; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;">Leia Também</p>
  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
    <li><a href="/blog/cirurgia-estrabismo-sao-paulo-preco-convenio" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Cirurgia de Estrabismo em SP: Preço, Convênios e O Que Esperar [2026]</a></li>
    <li><a href="/instituto/estrabismo" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Instituto de Estrabismo — Drudi e Almeida: Conheça Nossa Especialidade</a></li>
    <li><a href="/blog/estrabismo-causas-diagnostico-tratamento-cirurgia-mm63sf9c" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Estrabismo: Causas, Diagnóstico e Tratamento Completo</a></li>
  </ul>
</div>`;

// Bloco HTML do "Leia Também" para artigos de GLAUCOMA
const leiaTambemGlaucomaColírio = `
<div class="leia-tambem" style="background: linear-gradient(135deg, #f8f9fa 0%, #fff8e8 100%); border-left: 4px solid #c9a961; border-radius: 8px; padding: 20px 24px; margin: 32px 0;">
  <p style="font-weight: 700; color: #2c3e50; margin: 0 0 12px 0; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;">Leia Também</p>
  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
    <li><a href="/blog/glaucoma-tem-cura-tratamento-sao-paulo" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Glaucoma Tem Cura? Entenda o Tratamento e o Controle da Doença</a></li>
    <li><a href="/instituto/glaucoma" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Instituto do Glaucoma — Drudi e Almeida: Diagnóstico e Tratamento</a></li>
    <li><a href="/blog/glaucoma-diagnostico-precoce-tratamento-pressao-intraocular-mm63sf9c" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Glaucoma: Diagnóstico Precoce e Controle da Pressão Intraocular</a></li>
    <li><a href="/blog/pressao-ocular-alta-hipertensao-ocular-glaucoma" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Pressão Ocular Alta: Hipertensão Ocular e Risco de Glaucoma</a></li>
  </ul>
</div>`;

const leiaTambemGlaucomaTemCura = `
<div class="leia-tambem" style="background: linear-gradient(135deg, #f8f9fa 0%, #fff8e8 100%); border-left: 4px solid #c9a961; border-radius: 8px; padding: 20px 24px; margin: 32px 0;">
  <p style="font-weight: 700; color: #2c3e50; margin: 0 0 12px 0; font-size: 0.85rem; letter-spacing: 0.1em; text-transform: uppercase;">Leia Também</p>
  <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;">
    <li><a href="/blog/tratamento-glaucoma-coli-rio-cirurgia-convenio" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Tratamento do Glaucoma: Colírio, Cirurgia e Convênios em SP [2026]</a></li>
    <li><a href="/instituto/glaucoma" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Instituto do Glaucoma — Drudi e Almeida: Diagnóstico e Tratamento</a></li>
    <li><a href="/blog/glaucoma-angulo-fechado-crise-aguda-sintomas-emergencia" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Glaucoma de Ângulo Fechado: Crise Aguda e Emergência Oftalmológica</a></li>
    <li><a href="/blog/pressao-ocular-alta-hipertensao-ocular-glaucoma" style="color: #2c3e50; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 8px;"><span style="color: #c9a961;">→</span> Pressão Ocular Alta: Hipertensão Ocular e Risco de Glaucoma</a></li>
  </ul>
</div>`;

// Mapeamento: id do artigo → bloco de links cruzados
const CROSS_LINKS = [
  { id: 150000, block: leiaTambemEstrabismoPreco },
  { id: 150001, block: leiaTambemEstrabismoAdulto },
  { id: 150002, block: leiaTambemGlaucomaColírio },
  { id: 150003, block: leiaTambemGlaucomaTemCura },
];

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);

  for (const { id, block } of CROSS_LINKS) {
    // Buscar conteúdo atual
    const [rows] = await conn.query('SELECT content FROM blog_posts WHERE id = ?', [id]);
    if (!rows.length) {
      console.log(`⚠️  id ${id} não encontrado`);
      continue;
    }

    let content = rows[0].content;

    // Verificar se já tem o bloco leia-tambem
    if (content.includes('class="leia-tambem"')) {
      console.log(`⏭️  id ${id} já tem bloco "Leia Também"`);
      continue;
    }

    // Inserir o bloco antes do FAQ (antes do primeiro <h2> que contém "FAQ" ou "Perguntas")
    const faqMatch = content.match(/<h2[^>]*>[^<]*(?:FAQ|Perguntas Frequentes|Perguntas)[^<]*<\/h2>/i);
    if (faqMatch) {
      const insertPos = content.indexOf(faqMatch[0]);
      content = content.slice(0, insertPos) + block + content.slice(insertPos);
      console.log(`✅ id ${id} — bloco inserido antes do FAQ`);
    } else {
      // Fallback: inserir antes do último </section> ou no final
      content = content + block;
      console.log(`✅ id ${id} — bloco inserido no final (FAQ não encontrado)`);
    }

    await conn.query('UPDATE blog_posts SET content = ? WHERE id = ?', [content, id]);
  }

  await conn.end();
  console.log('\nConcluído!');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
