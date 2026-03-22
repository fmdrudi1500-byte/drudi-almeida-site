/**
 * Tests for injectInternalLinks() — SEO internal link injection engine
 */
import { describe, it, expect } from "vitest";
import { injectInternalLinks } from "./blog-db";

const POSTS = [
  { id: 1, title: "Catarata: Sintomas e Tratamento", slug: "catarata-sintomas-tratamento", tags: '["catarata","facoemulsificação","cirurgia ocular"]' },
  { id: 2, title: "Ceratocone: O Que É e Como Tratar", slug: "ceratocone-o-que-e-tratar", tags: '["ceratocone","crosslinking","córnea"]' },
  { id: 3, title: "Glaucoma: Diagnóstico Precoce", slug: "glaucoma-diagnostico-precoce", tags: '["glaucoma","pressão intraocular","nervo óptico"]' },
  { id: 4, title: "Retina: Doenças e Tratamentos", slug: "retina-doencas-tratamentos", tags: '["retina","degeneração macular","vitrectomia"]' },
  { id: 5, title: "Estrabismo em Crianças e Adultos", slug: "estrabismo-criancas-adultos", tags: '["estrabismo","ambliopia","cirurgia"]' },
  { id: 6, title: "Conjuntivite: Tipos e Tratamento", slug: "conjuntivite-tipos-tratamento", tags: '["conjuntivite","olho vermelho","inflamação"]' },
];

describe("injectInternalLinks", () => {
  it("should inject a link for a matching keyword in the content", () => {
    const html = "<p>O ceratocone é uma doença progressiva da córnea que afeta jovens adultos.</p>";
    const result = injectInternalLinks(html, "artigo-atual", POSTS);
    expect(result).toContain('<a href="/blog/ceratocone-o-que-e-tratar"');
    expect(result).toContain("class=\"internal-link\"");
  });

  it("should NOT inject a link for the current article slug", () => {
    const html = "<p>O ceratocone é uma doença progressiva da córnea.</p>";
    const result = injectInternalLinks(html, "ceratocone-o-que-e-tratar", POSTS);
    // Should not link to itself
    expect(result).not.toContain('<a href="/blog/ceratocone-o-que-e-tratar"');
  });

  it("should limit injected links to MAX_LINKS (5)", () => {
    const html = `
      <p>O ceratocone é uma doença. O glaucoma é silencioso. A catarata afeta idosos.
      O estrabismo pode ser corrigido. A conjuntivite é comum. A retina precisa de cuidado.</p>
    `;
    const result = injectInternalLinks(html, "artigo-geral", POSTS);
    const linkCount = (result.match(/class="internal-link"/g) ?? []).length;
    expect(linkCount).toBeLessThanOrEqual(5);
  });

  it("should not inject duplicate links to the same target article", () => {
    // "catarata" appears twice — should only link once
    const html = "<p>A catarata é comum. A cirurgia de catarata é segura.</p>";
    const result = injectInternalLinks(html, "artigo-atual", POSTS);
    const catarataLinks = (result.match(/href="\/blog\/catarata-sintomas-tratamento"/g) ?? []).length;
    expect(catarataLinks).toBeLessThanOrEqual(1);
  });

  it("should not inject links inside existing anchor tags", () => {
    // Already has a link around "catarata" — should not double-wrap
    const html = '<p>Leia mais sobre <a href="/blog/catarata-sintomas-tratamento">catarata</a> aqui.</p>';
    const result = injectInternalLinks(html, "artigo-atual", POSTS);
    // Should not have nested <a> tags
    expect(result).not.toContain('<a href="/blog/catarata-sintomas-tratamento"><a');
  });

  it("should return unchanged HTML when no keywords match", () => {
    const html = "<p>Texto sem nenhuma palavra-chave relacionada aos artigos do blog.</p>";
    const result = injectInternalLinks(html, "artigo-atual", POSTS);
    expect(result).not.toContain("internal-link");
  });

  it("should handle empty posts array gracefully", () => {
    const html = "<p>Conteúdo de artigo sem links disponíveis.</p>";
    const result = injectInternalLinks(html, "artigo-atual", []);
    expect(result).toBe(html);
  });

  it("should handle posts with null tags gracefully", () => {
    const postsWithNullTags = [
      { id: 10, title: "Blefarite: Inflamação das Pálpebras", slug: "blefarite-inflamacao", tags: null },
    ];
    const html = "<p>A blefarite é uma inflamação comum das pálpebras.</p>";
    // Should not throw
    expect(() => injectInternalLinks(html, "artigo-atual", postsWithNullTags)).not.toThrow();
  });

  it("should inject link from tags when title keywords don't match", () => {
    const postsWithTags = [
      { id: 20, title: "Artigo Genérico Sobre Olhos", slug: "artigo-generico-olhos", tags: '["facoemulsificação","cristalino","lente intraocular"]' },
    ];
    const html = "<p>A facoemulsificação é a técnica mais moderna para cirurgia de catarata.</p>";
    const result = injectInternalLinks(html, "artigo-atual", postsWithTags);
    expect(result).toContain('/blog/artigo-generico-olhos');
  });
});
