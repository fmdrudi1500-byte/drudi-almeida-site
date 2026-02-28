import "dotenv/config";
import { readFileSync } from "fs";
import { createConnection } from "mysql2/promise";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const content = readFileSync(resolve(__dirname, "../blog-article-catarata.md"), "utf-8");

const title = "Catarata: Sintomas, Diagnóstico e Tratamento com Cirurgia de Facoemulsificação";
const slug = "catarata-sintomas-diagnostico-tratamento-facoemulsificacao-" + Date.now().toString(36);
const excerpt = "A catarata é responsável por 51% dos casos de cegueira reversível no mundo. Entenda os sintomas, quando operar e como funciona a cirurgia moderna de facoemulsificação com implante de lente intraocular.";
const seoTitle = "Catarata: Sintomas e Tratamento | Drudi e Almeida Oftalmologia";
const seoDescription = "Saiba tudo sobre catarata: sintomas como visão embaçada e sensibilidade à luz, quando operar e como funciona a cirurgia de facoemulsificação com lente intraocular.";
const seoKeywords = "catarata, cirurgia de catarata, facoemulsificação, lente intraocular, sintomas da catarata, tratamento catarata São Paulo, oftalmologista catarata";
const coverImageUrl = "https://private-us-east-1.manuscdn.com/sessionFile/VBswHKhWNC83TvZUgrFk36/sandbox/G9Tpw7zLvTmvEI9gUisRl0-img-1_1772121965000_na1fn_ZHJhLXByaXNjaWxsYS1jb25zdWx0b3Jpbw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVkJzd0hLaFdOQzgzVHZaVWdyRmszNi9zYW5kYm94L0c5VHB3N3pMdlRtdkVJOWdVaXNSbDAtaW1nLTFfMTc3MjEyMTk2NTAwMF9uYTFmbl9aSEpoTFhCeWFYTmphV3hzWVMxamIyNXpkV3gwYjNKcGJ3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=TTPlEJe6xmx3JcptNhtg1qrEtUbjuKUKa~KI7tuZqDumLMDmDQdnlKVKd1KY-IEDDybrJ1d8fWI7I12FSMXnFCcA~R7GWjp~XmlIsd4OO3hqE8rslDm4CSFl9AxnQeX2JOTrdvcY19Fs5QwBqcvRzFqGvp9V4TPXktsThC2CZyCYjTNtlEpPFlTAXqj3aCz3FY~eUKvjc0Vkjo7zTODXESLEuIlMYP1Vq9NbgPjbroq-FGYG49cbVrRDF6w2SOuJSEUSyCi~TVz6xaUNv6-xBlGlrVz-0yWiN~B7Zq3pStqLZ9ZYrr7sgT2JCERT8tUBpC41UJk8YtAET-lIwTOKIQ__";

const words = content.trim().split(/\s+/).length;
const readingTimeMin = Math.max(1, Math.ceil(words / 200));

const conn = await createConnection(process.env.DATABASE_URL);

try {
  // Check if a "Catarata" category exists, create if not
  const [cats] = await conn.execute("SELECT id FROM blog_categories WHERE slug = 'catarata' LIMIT 1");
  let categoryId;
  if (cats.length === 0) {
    const [result] = await conn.execute(
      "INSERT INTO blog_categories (name, slug, description, color, createdAt) VALUES (?, ?, ?, ?, NOW())",
      ["Catarata", "catarata", "Artigos sobre catarata, cirurgia e tratamento", "#2c3e50"]
    );
    categoryId = result.insertId;
    console.log("✅ Category 'Catarata' created with id:", categoryId);
  } else {
    categoryId = cats[0].id;
    console.log("ℹ️ Category 'Catarata' already exists with id:", categoryId);
  }

  // Insert the blog post
  const now = new Date();
  const [result] = await conn.execute(
    `INSERT INTO blog_posts
      (title, slug, excerpt, content, coverImageUrl, contentType, status, categoryId, tags, featured,
       seoTitle, seoDescription, seoKeywords, readingTimeMin, authorId, authorName,
       viewCount, publishedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      title,
      slug,
      excerpt,
      content,
      coverImageUrl,
      "article",
      "published",
      categoryId,
      "catarata, facoemulsificação, lente intraocular, cirurgia ocular, oftalmologia",
      1,
      seoTitle,
      seoDescription,
      seoKeywords,
      readingTimeMin,
      1,
      "Dr. Fernando Drudi & Dra. Priscilla de Almeida",
      0,
      now,
    ]
  );

  console.log("✅ Blog post published! ID:", result.insertId);
  console.log("📖 Slug:", slug);
  console.log("⏱️  Reading time:", readingTimeMin, "min");
} catch (err) {
  console.error("❌ Error:", err.message);
} finally {
  await conn.end();
}
