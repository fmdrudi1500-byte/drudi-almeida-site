import 'dotenv/config';
import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read the JSON data
const data = JSON.parse(readFileSync(resolve('/home/ubuntu/generate_blog_articles.json'), 'utf8'));
const articles = data.results.filter(r => !r.error);

const categoryMap = {
  'catarata': 1,
  'ceratocone': 30001,
  'glaucoma': 30002,
  'retina': 30003,
  'estrabismo': 30004,
  'saude-ocular': 60001,
};

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  const conn = await createConnection(dbUrl);
  console.log(`Connected. Inserting ${articles.length} articles...`);

  let inserted = 0;
  let skipped = 0;

  for (let i = 0; i < articles.length; i++) {
    const o = articles[i].output;
    
    // Read content file
    let content = '';
    try {
      content = readFileSync(o.content_file, 'utf8');
    } catch (e) {
      console.log(`SKIP ${i}: Cannot read content file`);
      skipped++;
      continue;
    }

    const categoryId = categoryMap[o.category_slug] || 60001;
    const tags = JSON.stringify(o.tags.split(',').map(t => t.trim()));
    const readingTime = o.reading_time || 8;

    // Check if slug exists
    const [existing] = await conn.execute('SELECT id FROM blog_posts WHERE slug = ?', [o.slug]);
    if (existing.length > 0) {
      console.log(`SKIP ${i}: ${o.slug} already exists`);
      skipped++;
      continue;
    }

    await conn.execute(
      `INSERT INTO blog_posts (title, slug, excerpt, content, seoTitle, seoDescription, seoKeywords, contentType, status, categoryId, tags, authorId, authorName, readingTimeMin, publishedAt, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, 'article', 'published', ?, ?, 1, 'Drudi e Almeida', ?, NOW(), NOW(), NOW())`,
      [o.title, o.slug, o.excerpt, content, o.seo_title, o.seo_description, o.seo_keywords, categoryId, tags, readingTime]
    );

    inserted++;
    console.log(`OK ${i}: ${o.title.substring(0, 60)}...`);
  }

  console.log(`\nDone! Inserted: ${inserted}, Skipped: ${skipped}`);
  await conn.end();
}

main().catch(e => { console.error(e); process.exit(1); });
