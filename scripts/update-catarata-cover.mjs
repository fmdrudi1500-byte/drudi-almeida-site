import "dotenv/config";
import { createConnection } from "mysql2/promise";

const conn = await createConnection(process.env.DATABASE_URL);

// First check what slugs exist
const [rows] = await conn.execute("SELECT id, slug, LEFT(IFNULL(coverImageUrl,'NULL'), 60) as cover FROM blog_posts ORDER BY id");
console.log("Current blog posts:");
rows.forEach(r => console.log(` id=${r.id} slug=${r.slug} cover=${r.cover}`));

// Update the catarata article - find by title keyword
const [result] = await conn.execute(
  "UPDATE blog_posts SET coverImageUrl = ? WHERE title LIKE ?",
  [
    "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/blog-cover-catarata-v2-2JexNpsTUZpdSdapSvEERQ.png",
    "%atarata%"
  ]
);
console.log("\nUpdate result:", result.affectedRows, "rows affected");

await conn.end();
