/* ============================================================
   Image Constants — Drudi e Almeida
   Todas as imagens são servidas localmente via /images/
   Isso garante Cache-Control: max-age=31536000 via _headers do Cloudflare Pages,
   elimina dependência de CDN externo e resolve o aviso de cache do PageSpeed.
   ============================================================ */

const BASE = "/images";

// Responsive image helper — returns srcSet string for use in <img srcSet={}>
export function srcSet(base: string, variants: Record<number, string>): string {
  return Object.entries(variants)
    .map(([w, url]) => `${url} ${w}w`)
    .join(", ") + `, ${base} 1920w`;
}

export const IMAGES = {
  logo: {
    horizontal: `${BASE}/logo-footer-200w_56b3dc2d.webp`,
    circular: `${BASE}/logo-footer-200w_56b3dc2d.webp`,
  },
  // Responsive srcset variants for key images
  responsive: {
    heroMonet: {
      "360": `${BASE}/hero-monet-360w.webp`,
      "480": `${BASE}/hero-monet-480w_5af50fa4_d2802f0a.webp`,
      "960": `${BASE}/hero-monet-960w-q55_opt.webp`,
    },
    draPriscilla: {
      "412": `${BASE}/dra-priscilla-412w_213372a7.webp`,
      "824": `${BASE}/dra-priscilla-824w_baddef17.webp`,
    },
    drFernando: {
      "480": `${BASE}/dr-fernando-800w.webp`,
      "720": `${BASE}/dr-fernando-800w.webp`,
    },
    monetJapaneseBridge: {
      "400": `${BASE}/monet-japanese-bridge-400w_9cb272d9_ccc66b12.webp`,
      "700": `${BASE}/monet-japanese-bridge-700w_d37e053d_4c5b8c42.webp`,
    },
    artDegas: {
      "300": `${BASE}/art-degas-300w_ceb85a6c_ac752ae5.webp`,
      "600": `${BASE}/art-degas-600w_fe5d71f2_44dd38bb.webp`,
    },
    artVangogh: {
      "300": `${BASE}/art-vangogh-300w_ec1adebc_fab9e3db.webp`,
      "600": `${BASE}/art-vangogh-600w_61afdfcd_f834e739.webp`,
    },
  },
  hero: {
    main: `${BASE}/hero-monet-resized_00e348d0.webp`,
    starryNight: `${BASE}/starry-night-hero-v3-JqwHFQEiozpvaSGrn5zcqj.webp`,
    starryNightOpt: `${BASE}/starry-night-hero-opt.webp`,
    degasHero: `${BASE}/art-degas-hero_optimized.webp`,
    monetOpt: `${BASE}/monet-hero-opt.webp`,
    seuratOpt: `${BASE}/seurat-hero-opt.webp`,
    rembrandtOpt: `${BASE}/rembrandt-self-portrait_19758687.webp`,
    eyeAbstract: `${BASE}/eye-abstract_36effe98.webp`,
    doctorConsultation: `${BASE}/doctor-fernando_902033c6.webp`,
    technology: `${BASE}/technology_fed16422.webp`,
    happyFamily: `${BASE}/happy-family_6ee5e159.webp`,
  },
  // Instituto logos (128x128px WebP, 2x retina para display de 64px)
  institutoLogos: {
    catarata: `${BASE}/logo-catarata-128_4016b3c8.webp`,
    ceratocone: `${BASE}/logo-ceratocone-128_5f37b031.webp`,
    glaucoma: `${BASE}/logo-glaucoma-128_c3ccf9c1.webp`,
    retina: `${BASE}/logo-retina-128_88ef0fac.webp`,
    estrabismo: `${BASE}/logo-estrabismo-128_b8ca4997.webp`,
  },
  // Art & Vision — Famous paintings connected to eye conditions
  art: {
    monetBeforeAfter: `${BASE}/monet-before-after_d1badfa4.webp`,
    monetJapaneseBridge: `${BASE}/monet-japanese-bridge_7feeb7be.webp`,
    seuratGrandeJatte: `${BASE}/seurat-grande-jatte_8467105c.webp`,
    degasDancers: `${BASE}/art-degas-dancers_57775727.webp`,
    elGrecoToledo: `${BASE}/art-el-greco-toledo_24353633.webp`,
    daVinciStrabismus: `${BASE}/da-vinci-strabismus_b1164d80.webp`,
    rembrandtSelfPortrait: `${BASE}/rembrandt-self-portrait_19758687.webp`,
    vanGoghStarryNight: `${BASE}/van-gogh-starry-night_78be1262.webp`,
    vanGoghSelfPortrait: `${BASE}/van-gogh-self-portrait_cb3eabb8.webp`,
  },
  // Corpo Clínico — Fotos profissionais dos médicos
  doctors: {
    drFernando: `${BASE}/dr-fernando-800w.webp`,
    draPriscilla: `${BASE}/dra-priscilla-800w.webp`,
    draMariaAmelia: `${BASE}/doctor-maria-amelia_6dcb9a0f.webp`,
  },
  // Unsplash images for less prominent sections
  unsplash: {
    elderlySmiling: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    childEyes: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    eyeExam: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=800&q=80",
    modernClinic: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&q=80",
    teamMeeting: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
  },
} as const;
