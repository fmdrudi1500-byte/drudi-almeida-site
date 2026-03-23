/**
 * Escala as datas de publicação dos 48 artigos publicados ao longo de 12 meses,
 * de abril/2025 a março/2026, com cadência de 1–2 artigos por semana.
 */
import { createConnection } from 'mysql2/promise';
import { config } from 'dotenv';
config();

function toMysqlDate(date) {
  return date.toISOString().replace('T', ' ').substring(0, 19);
}

// Mapeamento completo: id → data de publicação
// Estratégia:
//   Abr-Mai/2025 → Pillar pages principais (ids 1, 30001-30004)
//   Mai-Jun/2025 → Artigos de saúde geral (60001-60005, 70001-70004)
//   Jun-Ago/2025 → Artigos de doenças comuns (120001-120020)
//   Set-Out/2025 → Artigos de SEO local (130001-130010)
//   Jan-Mar/2026 → Artigos comerciais (140000-140004)
const ARTICLE_SCHEDULE = [
  // === PILLAR PAGES (Abr/2025) ===
  { id: 1,      date: '2025-04-07 09:00:00' },
  { id: 30001,  date: '2025-04-10 10:00:00' },
  { id: 30002,  date: '2025-04-14 09:00:00' },
  { id: 30003,  date: '2025-04-17 14:00:00' },
  { id: 30004,  date: '2025-04-22 09:00:00' },

  // === SAÚDE GERAL (Mai/2025) ===
  { id: 60001,  date: '2025-05-05 09:00:00' },
  { id: 60002,  date: '2025-05-08 10:00:00' },
  { id: 60003,  date: '2025-05-12 09:00:00' },
  { id: 60004,  date: '2025-05-15 14:00:00' },
  { id: 60005,  date: '2025-05-19 09:00:00' },

  // === DOENÇAS COMUNS — SÉRIE 1 (Mai-Jun/2025) ===
  { id: 70001,  date: '2025-05-22 10:00:00' },
  { id: 70002,  date: '2025-05-26 09:00:00' },
  { id: 70003,  date: '2025-05-29 15:00:00' },
  { id: 70004,  date: '2025-06-02 09:00:00' },

  // === DOENÇAS COMUNS — SÉRIE 2 (Jun/2025) ===
  { id: 120001, date: '2025-06-05 10:00:00' },
  { id: 120002, date: '2025-06-09 09:00:00' },
  { id: 120003, date: '2025-06-12 14:00:00' },
  { id: 120004, date: '2025-06-16 09:00:00' },
  { id: 120005, date: '2025-06-19 10:00:00' },
  { id: 120006, date: '2025-06-23 09:00:00' },
  { id: 120007, date: '2025-06-26 15:00:00' },
  { id: 120008, date: '2025-06-30 09:00:00' },

  // === DOENÇAS COMUNS — SÉRIE 3 (Jul/2025) ===
  { id: 120009, date: '2025-07-03 10:00:00' },
  { id: 120010, date: '2025-07-07 09:00:00' },
  { id: 120011, date: '2025-07-10 14:00:00' },
  { id: 120012, date: '2025-07-14 09:00:00' },
  { id: 120013, date: '2025-07-17 10:00:00' },
  { id: 120014, date: '2025-07-21 09:00:00' },
  { id: 120015, date: '2025-07-24 15:00:00' },
  { id: 120016, date: '2025-07-28 09:00:00' },

  // === DOENÇAS COMUNS — SÉRIE 4 (Ago/2025) ===
  { id: 120017, date: '2025-08-04 10:00:00' },
  { id: 120018, date: '2025-08-07 09:00:00' },
  { id: 120019, date: '2025-08-11 14:00:00' },
  // id 120020 não existe, pulamos

  // === SEO LOCAL (Set-Out/2025) ===
  { id: 130001, date: '2025-09-01 09:00:00' },
  { id: 130002, date: '2025-09-04 10:00:00' },
  { id: 130003, date: '2025-09-08 09:00:00' },
  { id: 130004, date: '2025-09-11 14:00:00' },
  { id: 130005, date: '2025-09-15 09:00:00' },
  { id: 130006, date: '2025-09-18 10:00:00' },
  { id: 130007, date: '2025-09-22 09:00:00' },
  { id: 130008, date: '2025-09-25 15:00:00' },
  { id: 130009, date: '2025-09-29 09:00:00' },
  { id: 130010, date: '2025-10-02 10:00:00' },

  // === ARTIGOS COMERCIAIS (Jan-Mar/2026) ===
  { id: 140000, date: '2026-01-06 09:00:00' },
  { id: 140001, date: '2026-01-20 10:00:00' },
  { id: 140002, date: '2026-02-03 09:00:00' },
  { id: 140003, date: '2026-02-17 14:00:00' },
  { id: 140004, date: '2026-03-03 09:00:00' },
];

async function main() {
  const conn = await createConnection(process.env.DATABASE_URL);

  let updated = 0;
  let skipped = 0;

  for (const { id, date } of ARTICLE_SCHEDULE) {
    const [result] = await conn.query(
      'UPDATE blog_posts SET publishedAt = ? WHERE id = ?',
      [date, id]
    );
    if (result.affectedRows > 0) {
      console.log(`✅ id ${id} → ${date}`);
      updated++;
    } else {
      console.log(`⚠️  id ${id} não encontrado`);
      skipped++;
    }
  }

  await conn.end();
  console.log(`\nConcluído: ${updated} atualizados, ${skipped} não encontrados`);
}

main().catch(err => {
  console.error('Erro:', err.message);
  process.exit(1);
});
