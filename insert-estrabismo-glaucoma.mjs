/**
 * Insere os 4 artigos comerciais de estrabismo e glaucoma no banco de dados.
 */
import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { config } from 'dotenv';
config();

const data = JSON.parse(readFileSync('/home/ubuntu/generate_estrabismo_glaucoma_articles.json', 'utf8'));
const articles = data.results.map(r => r.output);

// Mapeamento de categorySlug para categoryId
const CATEGORY_IDS = {
  estrabismo: 5,
  glaucoma: 3,
};

// Datas de publicação escalonadas (Nov/2025 e Dez/2025 — após os artigos de SEO local)
const PUBLISH_DATES = [
  '2025-10-13 09:00:00',  // cirurgia-estrabismo-sao-paulo-preco-convenio
  '2025-10-27 10:00:00',  // cirurgia-estrabismo-adulto-vale-a-pena
  '2025-11-10 09:00:00',  // tratamento-glaucoma-coli-rio-cirurgia-convenio
  '2025-11-24 14:00:00',  // glaucoma-tem-cura-tratamento-sao-paulo
];

// IDs iniciais para os novos artigos
const START_ID = 150000;

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const id = START_ID + i;
    const categoryId = CATEGORY_IDS[art.categorySlug] ?? 1;
    const publishedAt = PUBLISH_DATES[i];

    // Verificar se já existe
    const [existing] = await conn.query('SELECT id FROM blog_posts WHERE slug = ?', [art.slug]);
    if (existing.length > 0) {
      console.log(`⏭️  Já existe: ${art.slug} (id: ${existing[0].id})`);
      continue;
    }

    await conn.query(
      `INSERT INTO blog_posts 
        (id, slug, title, excerpt, content, authorName, categoryId, status, publishedAt, readingTimeMin, coverImageUrl, seoTitle, seoDescription, authorId, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'published', ?, ?, NULL, ?, ?, 1, NOW(), NOW())`,
      [
        id,
        art.slug,
        art.title,
        art.excerpt,
        art.content,
        art.authorName,
        categoryId,
        publishedAt,
        art.readingTime ?? 8,
        art.title,
        art.excerpt,
      ]
    );

    console.log(`✅ Inserido: ${art.slug} (id: ${id}, cat: ${art.categorySlug}, autor: ${art.authorName})`);
  }

  await conn.end();
  console.log('\nConcluído!');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
