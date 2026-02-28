import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const db = await mysql.createConnection(process.env.DATABASE_URL);

const [rows] = await db.execute(
  "SELECT id, title, slug, coverImageUrl FROM blog_posts WHERE title LIKE ? OR slug LIKE ?",
  ["%eratocone%", "%ceratocone%"]
);

console.log("Artigos encontrados:", rows);

if (rows.length > 0) {
  const [result] = await db.execute(
    "UPDATE blog_posts SET coverImageUrl = ? WHERE id = ?",
    [
      "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/ceratocone-blog-capa_527afd61.png",
      rows[0].id,
    ]
  );
  console.log("Atualizado com sucesso:", result);
} else {
  console.log("Nenhum artigo de ceratocone encontrado no banco.");
}

await db.end();
