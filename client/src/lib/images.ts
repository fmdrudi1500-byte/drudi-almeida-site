/* ============================================================
   Image Constants — Drudi e Almeida
   Central registry for all image URLs used across the site
   All images served from CloudFront CDN (optimized WebP)
   ============================================================ */

export const IMAGES = {
  logo: {
    // Optimized: 4MB PNG -> 11KB WebP (99% reduction)
    horizontal: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-opt_76d1d9d6.webp",
    circular: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-opt_76d1d9d6.webp",
  },
  hero: {
    main: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-monet-bridge-optimized_6ab2441a.webp",
    eyeAbstract: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-eye-abstract-opt_93c6d332.webp",
    doctorConsultation: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/AChRUprKUpxeRdhT_2e6e6c5a.jpg",
    technology: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-technology-opt_69a1f34b.webp",
    happyFamily: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/hero-happy-family-opt_8b253d9a.webp",
  },
  // Instituto logos — optimized WebP 256x256
  institutoLogos: {
    catarata: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-catarata-opt_0cde19cb.webp",
    ceratocone: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-ceratocone-opt_89f6b10f.webp",
    glaucoma: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-glaucoma-opt_a09f3fb3.webp",
    retina: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-retina-opt_b7249005.webp",
    estrabismo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/logo-estrabismo-opt_0746fdc5.webp",
  },
  // Art & Vision — Famous paintings connected to eye conditions
  art: {
    monetBeforeAfter: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/wbNddNYgwjrdnWbs_d1badfa4.jpg",
    // Optimized: 1.2MB PNG -> 139KB WebP (88% reduction)
    monetJapaneseBridge: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/monet-japanese-bridge-opt_57fc5dca.webp",
    seuratGrandeJatte: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/oPEFYPdixVsjysRg_8467105c.jpg",
    degasDancers: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/WzCAlEOMPvceYawr_3290caaa.png",
    elGrecoToledo: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/CyllqkwfVkxboVaD_21b7d2dd.jpg",
    daVinciStrabismus: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/tjFAKPBlHLVpdwvV_b1164d80.jpg",
    rembrandtSelfPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/EuPODdxSBIgDitkq_19758687.jpg",
    vanGoghStarryNight: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/nuRRrdSXTUGgVztf_78be1262.jpg",
    vanGoghSelfPortrait: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/SaVZZRtMuqleSZBC_cb3eabb8.jpg",
  },
  // Corpo Clínico — Fotos profissionais dos médicos (optimized WebP)
  doctors: {
    // Optimized: 5.9MB PNG -> 44KB WebP (99% reduction)
    drFernando: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/dr-fernando-doctors-opt_36a804f5.webp",
    // Optimized: 6.7MB PNG -> 76KB WebP (99% reduction)
    draPriscilla: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/dra-priscilla-doctors-opt_a15c0bb2.webp",
    // Optimized: 6.1MB PNG -> 69KB WebP (99% reduction)
    draMariaAmelia: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/dra-maria-amelia-opt_c3d7a651.webp",
  },
  // Clinic photos (optimized WebP)
  clinics: {
    // Optimized: 83KB PNG -> 51KB WebP
    guarulhos: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/clinica-guarulhos-opt_cd560e5c.webp",
    // Optimized: 129KB PNG -> 75KB WebP
    lapa: "https://d2xsxph8kpxj0f.cloudfront.net/310419663028489100/bJpZLaNUAwiEuNvz3b7LGz/consultorio-lapa-opt_967db3ac.webp",
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
