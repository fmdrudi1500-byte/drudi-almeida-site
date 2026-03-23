/**
 * Adiciona links internos cruzados entre os artigos comerciais de catarata
 * e entre crosslinking e ceratocone.
 *
 * Estratégia: inserir um bloco HTML "Leia também" no final do <article>
 * ou antes do FAQ de cada artigo, usando um padrão de card de links.
 */
import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

const BASE_URL = 'https://institutodrudiealmeida.com.br';

// Define os links cruzados para cada artigo (slug → lista de artigos relacionados)
const CROSS_LINKS = {
  'cirurgia-catarata-preco-sao-paulo-2026': [
    { slug: 'cirurgia-catarata-pelo-convenio',                 title: 'Cirurgia de Catarata pelo Convênio: Como Funciona e Quais Planos Cobrem' },
    { slug: 'lente-intraocular-monofocal-vs-multifocal-vs-trifocal', title: 'Lente Intraocular: Monofocal, Multifocal ou Trifocal? Qual é a Melhor?' },
    { slug: 'catarata-sintomas-tratamento-guia-completo',      title: 'Catarata: Sintomas, Causas e Tratamento — Guia Completo' },
  ],
  'cirurgia-catarata-pelo-convenio': [
    { slug: 'cirurgia-catarata-preco-sao-paulo-2026',          title: 'Cirurgia de Catarata em SP: Preço, Convênios e O Que Esperar [2026]' },
    { slug: 'lente-intraocular-monofocal-vs-multifocal-vs-trifocal', title: 'Lente Intraocular: Monofocal, Multifocal ou Trifocal? Qual é a Melhor?' },
    { slug: 'catarata-sintomas-tratamento-guia-completo',      title: 'Catarata: Sintomas, Causas e Tratamento — Guia Completo' },
  ],
  'lente-intraocular-monofocal-vs-multifocal-vs-trifocal': [
    { slug: 'cirurgia-catarata-preco-sao-paulo-2026',          title: 'Cirurgia de Catarata em SP: Preço, Convênios e O Que Esperar [2026]' },
    { slug: 'cirurgia-catarata-pelo-convenio',                 title: 'Cirurgia de Catarata pelo Convênio: Como Funciona e Quais Planos Cobrem' },
    { slug: 'catarata-sintomas-tratamento-guia-completo',      title: 'Catarata: Sintomas, Causas e Tratamento — Guia Completo' },
  ],
  'crosslinking-preco-e-recuperacao': [
    { slug: 'ceratocone-o-que-e-e-como-tratar',               title: 'Ceratocone: O Que É, Sintomas e Como Tratar' },
    { slug: 'injecao-intravitrea-anti-vegf-como-funciona',     title: 'Injeção Intravítrea Anti-VEGF: O Que É e Para Quem É Indicada' },
  ],
  'injecao-intravitrea-anti-vegf-como-funciona': [
    { slug: 'retinopatia-diabetica-prevencao-tratamento',      title: 'Retinopatia Diabética: Prevenção e Tratamento' },
    { slug: 'crosslinking-preco-e-recuperacao',               title: 'Crosslinking para Ceratocone em SP: Preço, Convênio e Recuperação' },
    { slug: 'importancia-exame-oftalmologico-regular',        title: 'Por Que o Exame Oftalmológico Regular é Essencial?' },
  ],
};

function buildCrossLinksBlock(links) {
  const items = links.map(l => `
    <li style="margin: 0; padding: 0;">
      <a href="/blog/${l.slug}" 
         style="display:block; padding: 10px 14px; background: #f8f9fa; border-left: 3px solid #c9a961; border-radius: 4px; color: #2c3e50; text-decoration: none; font-size: 0.9rem; font-weight: 500; transition: background 0.2s;"
         onmouseover="this.style.background='#eef0f2'"
         onmouseout="this.style.background='#f8f9fa'">
        📖 ${l.title}
      </a>
    </li>`).join('\n');

  return `
<div class="internal-links-block" style="margin: 2rem 0; padding: 1.25rem 1.5rem; background: #fafafa; border: 1px solid #e8e8e8; border-radius: 8px;">
  <p style="margin: 0 0 0.75rem 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #c9a961;">Leia Também</p>
  <ul style="list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px;">
${items}
  </ul>
</div>`;
}

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);

  for (const [slug, links] of Object.entries(CROSS_LINKS)) {
    // Get current content
    const [rows] = await conn.query('SELECT id, content FROM blog_posts WHERE slug = ?', [slug]);
    if (!rows.length) {
      console.log(`⚠️  Artigo não encontrado: ${slug}`);
      continue;
    }
    const { id, content } = rows[0];

    // Check if cross links block already exists
    if (content && content.includes('internal-links-block')) {
      console.log(`⏭️  Links já existem em: ${slug}`);
      continue;
    }

    const linksBlock = buildCrossLinksBlock(links);

    // Insert the block before the last </section> or before the FAQ section (h2 containing "FAQ" or "Perguntas")
    let newContent = content;
    const faqMatch = content.match(/<h2[^>]*>[^<]*(FAQ|Perguntas Frequentes|Dúvidas)[^<]*<\/h2>/i);
    if (faqMatch) {
      newContent = content.replace(faqMatch[0], linksBlock + '\n' + faqMatch[0]);
    } else {
      // Append before closing tag of last section or at end
      const lastSectionClose = content.lastIndexOf('</section>');
      if (lastSectionClose !== -1) {
        newContent = content.slice(0, lastSectionClose) + linksBlock + '\n' + content.slice(lastSectionClose);
      } else {
        newContent = content + '\n' + linksBlock;
      }
    }

    await conn.query('UPDATE blog_posts SET content = ? WHERE id = ?', [newContent, id]);
    console.log(`✅ Links adicionados em: ${slug} (${links.length} links)`);
  }

  await conn.end();
  console.log('\nConcluído!');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
