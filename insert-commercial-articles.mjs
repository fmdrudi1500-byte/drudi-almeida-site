import { readFileSync } from 'fs';
import { createConnection } from 'mysql2/promise';
import * as dotenv from 'dotenv';

dotenv.config();

const data = JSON.parse(readFileSync('/home/ubuntu/generate_commercial_articles.json', 'utf-8'));
const articles = data.results.map(r => r.output);

// Published dates: spread over last 3 months, 1 per week
const baseDates = [
  '2026-01-06 10:00:00',
  '2026-01-20 10:00:00',
  '2026-02-03 10:00:00',
  '2026-02-17 10:00:00',
  '2026-03-03 10:00:00',
];

// Owner ID from env
const OWNER_ID = 1;

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);

  // Get max id to avoid collision
  const [rows] = await conn.query('SELECT MAX(id) as maxId FROM blog_posts');
  let nextId = Math.max(140000, (rows[0].maxId || 0) + 1);

  for (let i = 0; i < articles.length; i++) {
    const a = articles[i];
    const id = nextId + i;
    const publishedAt = baseDates[i];

    // Check if slug already exists
    const [existing] = await conn.query('SELECT id FROM blog_posts WHERE slug = ?', [a.slug]);
    if (existing.length > 0) {
      console.log(`⚠️  Slug já existe, pulando: ${a.slug}`);
      continue;
    }

    await conn.query(
      `INSERT INTO blog_posts 
        (id, title, slug, excerpt, content, seoTitle, seoDescription, contentType, status, categoryId, authorId, authorName, readingTimeMin, viewCount, featured, publishedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'article', 'published', ?, ?, ?, ?, 0, 0, ?)`,
      [
        id,
        a.title,
        a.slug,
        a.excerpt,
        a.html_content,
        a.seo_title,
        a.seo_description,
        a.category_id || null,
        OWNER_ID,
        a.author_name,
        a.reading_time_min || 10,
        publishedAt,
      ]
    );
    console.log(`✅ Inserido: [${id}] ${a.slug}`);
  }

  await conn.end();
  console.log('\nConcluído!');
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
