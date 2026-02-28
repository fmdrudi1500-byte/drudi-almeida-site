import "dotenv/config";
import { readFileSync } from "fs";
import { createConnection } from "mysql2/promise";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const articles = [
  {
    file: "blog-article-ceratocone.md",
    title: "Ceratocone: O Que É, Sintomas, Diagnóstico e Tratamentos Modernos",
    slug: "ceratocone-sintomas-diagnostico-tratamentos-crosslinking-" + Date.now().toString(36),
    excerpt: "O ceratocone afeta entre 1 em cada 375 a 1 em cada 2.000 pessoas, com início na adolescência. Entenda os sintomas, como é feito o diagnóstico com topografia corneana e quais são os tratamentos modernos: crosslinking, anel intracorneano e lentes esclerais.",
    seoTitle: "Ceratocone: Sintomas e Tratamento | Drudi e Almeida",
    seoDescription: "Tudo sobre ceratocone: sintomas, diagnóstico com topografia e tratamentos como crosslinking, anel intracorneano e lentes esclerais. Especialistas em São Paulo.",
    seoKeywords: "ceratocone, crosslinking, lente escleral, anel intracorneano, topografia corneana, tratamento ceratocone São Paulo",
    category: { name: "Ceratocone", slug: "ceratocone", description: "Artigos sobre ceratocone, córnea e tratamentos especializados", color: "#27ae60" },
    tags: "ceratocone, crosslinking, lente escleral, córnea, oftalmologia",
    featured: 1,
    author: "Dra. Priscilla R. de Almeida",
  },
  {
    file: "blog-article-glaucoma.md",
    title: "Glaucoma: O Ladrão Silencioso da Visão — Diagnóstico Precoce e Tratamento",
    slug: "glaucoma-diagnostico-precoce-tratamento-pressao-intraocular-" + Date.now().toString(36),
    excerpt: "O glaucoma afeta 2,4% da população acima de 40 anos no Brasil e metade dos pacientes não sabe que tem a doença. Entenda por que o diagnóstico precoce é vital, como é feito o exame de campo visual e quais são as opções de tratamento: colírios, laser e cirurgia.",
    seoTitle: "Glaucoma: Diagnóstico e Tratamento | Drudi e Almeida",
    seoDescription: "Glaucoma: sintomas, diagnóstico com campo visual e OCT, e tratamentos com colírios, laser e cirurgia. Especialistas em glaucoma em São Paulo e Guarulhos.",
    seoKeywords: "glaucoma, pressão intraocular, campo visual, trabeculoplastia, cirurgia glaucoma, oftalmologista glaucoma São Paulo",
    category: { name: "Glaucoma", slug: "glaucoma", description: "Artigos sobre glaucoma, pressão ocular e tratamentos", color: "#e67e22" },
    tags: "glaucoma, pressão intraocular, nervo óptico, campo visual, oftalmologia",
    featured: 1,
    author: "Dr. Fernando Macei Drudi",
  },
  {
    file: "blog-article-retina.md",
    title: "Doenças da Retina: Degeneração Macular, Retinopatia Diabética e Descolamento",
    slug: "doencas-retina-degeneracao-macular-retinopatia-diabetica-" + Date.now().toString(36),
    excerpt: "As doenças da retina são a principal causa de cegueira irreversível em adultos em idade produtiva. Saiba como identificar os sintomas da DMRI, retinopatia diabética e descolamento de retina, e quais são os tratamentos disponíveis: injeções intravítreas, laser e vitrectomia.",
    seoTitle: "Doenças da Retina: DMRI e Retinopatia | Drudi e Almeida",
    seoDescription: "Degeneração macular, retinopatia diabética e descolamento de retina: sintomas, diagnóstico e tratamentos com injeção intravítrea, laser e vitrectomia em SP.",
    seoKeywords: "retina, degeneração macular, retinopatia diabética, descolamento de retina, injeção intravítrea, especialista retina São Paulo",
    category: { name: "Retina", slug: "retina", description: "Artigos sobre doenças da retina e tratamentos especializados", color: "#e74c3c" },
    tags: "retina, degeneração macular, retinopatia diabética, vitrectomia, oftalmologia",
    featured: 1,
    author: "Dr. Fernando Macei Drudi",
  },
  {
    file: "blog-article-estrabismo.md",
    title: "Estrabismo: Causas, Diagnóstico e Tratamento em Crianças e Adultos",
    slug: "estrabismo-causas-diagnostico-tratamento-cirurgia-" + Date.now().toString(36),
    excerpt: "O estrabismo afeta entre 2% e 4% da população e, quando não tratado precocemente, pode levar à ambliopia (olho preguiçoso) e à perda permanente da visão binocular. Entenda as causas, como é feito o diagnóstico e quais são as opções de tratamento: óculos, oclusão, botox e cirurgia.",
    seoTitle: "Estrabismo: Tratamento em Crianças e Adultos | Drudi e Almeida",
    seoDescription: "Estrabismo em crianças e adultos: causas, diagnóstico com cover test e tratamentos com óculos, oclusão, toxina botulínica e cirurgia. Especialistas em SP.",
    seoKeywords: "estrabismo, cirurgia estrabismo, ambliopia, olho preguiçoso, cover test, oftalmologista estrabismo São Paulo",
    category: { name: "Estrabismo", slug: "estrabismo", description: "Artigos sobre estrabismo, ambliopia e tratamentos cirúrgicos", color: "#8e44ad" },
    tags: "estrabismo, ambliopia, cirurgia de estrabismo, visão binocular, oftalmologia pediátrica",
    featured: 1,
    author: "Equipe Drudi e Almeida",
  },
];

const conn = await createConnection(process.env.DATABASE_URL);

for (const article of articles) {
  try {
    const content = readFileSync(resolve(__dirname, "..", article.file), "utf-8");
    const words = content.trim().split(/\s+/).length;
    const readingTimeMin = Math.max(1, Math.ceil(words / 200));

    // Ensure category exists
    const [cats] = await conn.execute(
      "SELECT id FROM blog_categories WHERE slug = ? LIMIT 1",
      [article.category.slug]
    );
    let categoryId;
    if (cats.length === 0) {
      const [result] = await conn.execute(
        "INSERT INTO blog_categories (name, slug, description, color, createdAt) VALUES (?, ?, ?, ?, NOW())",
        [article.category.name, article.category.slug, article.category.description, article.category.color]
      );
      categoryId = result.insertId;
      console.log(`✅ Category '${article.category.name}' created with id: ${categoryId}`);
    } else {
      categoryId = cats[0].id;
      console.log(`ℹ️  Category '${article.category.name}' already exists with id: ${categoryId}`);
    }

    // Insert blog post
    const now = new Date();
    const [result] = await conn.execute(
      `INSERT INTO blog_posts
        (title, slug, excerpt, content, contentType, status, categoryId, tags, featured,
         seoTitle, seoDescription, seoKeywords, readingTimeMin, authorId, authorName,
         viewCount, publishedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        article.title,
        article.slug,
        article.excerpt,
        content,
        "article",
        "published",
        categoryId,
        article.tags,
        article.featured,
        article.seoTitle,
        article.seoDescription,
        article.seoKeywords,
        readingTimeMin,
        1,
        article.author,
        0,
        now,
      ]
    );

    console.log(`✅ Published: "${article.title}" | ID: ${result.insertId} | ⏱ ${readingTimeMin} min`);
  } catch (err) {
    console.error(`❌ Error publishing "${article.title}":`, err.message);
  }
}

await conn.end();
console.log("\n🎉 All articles processed!");
