/* ============================================================
   SchemaOrg — Global structured data for SEO & AI optimization
   Includes: MedicalOrganization, MedicalBusiness, Physician (x2),
             WebSite, LocalBusiness (x5 units)
   ============================================================ */

const BASE_URL = "https://drudialmeida.com.br";
const PHONE = "+5511916544653";
const PHONE_LANDLINE = "+551150268521";
const EMAIL = "contato@drudialmeida.com.br";

// ── Opening hours shared by all units ──────────────────────────
const openingHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: "Saturday",
    opens: "08:00",
    closes: "12:00",
  },
];

// ── Main organization ──────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalOrganization", "MedicalBusiness"],
  "@id": `${BASE_URL}/#organization`,
  name: "Drudi e Almeida Clínicas Oftalmológicas",
  alternateName: ["Drudi e Almeida Oftalmologia", "Instituto da Catarata", "Instituto do Ceratocone"],
  description:
    "Clínica oftalmológica de referência em São Paulo com 5 institutos especializados: Catarata, Ceratocone, Glaucoma, Retina e Estrabismo. Tecnologia de ponta, cuidado humanizado e mais de 50.000 pacientes atendidos.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/og-image.jpg`,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "$$",
  currenciesAccepted: "BRL",
  paymentAccepted: "Dinheiro, Cartão de Crédito, Cartão de Débito, Convênio",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Dr. César, 130",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "02013-001",
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -23.4873,
    longitude: -46.6268,
  },
  openingHoursSpecification: openingHours,
  medicalSpecialty: [
    "Ophthalmology",
    "Cataract Surgery",
    "Glaucoma Treatment",
    "Retina Treatment",
    "Strabismus Treatment",
    "Keratoconus Treatment",
    "Corneal Disease Treatment",
    "Contact Lens Fitting",
  ],
  hasMap: "https://maps.google.com/maps?q=Drudi+e+Almeida+Santana",
  sameAs: [
    "https://instagram.com/drudialmeida",
    "https://facebook.com/drudialmeida",
    "https://www.google.com/maps/place/Drudi+e+Almeida/",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "847",
    bestRating: "5",
    worstRating: "1",
  },
};

// ── Physicians ─────────────────────────────────────────────────
const drFernandoSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${BASE_URL}/sobre#dr-fernando`,
  name: "Dr. Fernando Macei Drudi",
  givenName: "Fernando",
  familyName: "Drudi",
  honorificPrefix: "Dr.",
  description:
    "Oftalmologista especialista em Catarata e Retina Cirúrgica. Diretor Clínico da Drudi e Almeida Oftalmologia. Membro do Conselho Brasileiro de Oftalmologia (CBO). Preceptor de Retina e Catarata na Residência Médica do IAMSPE.",
  medicalSpecialty: ["Ophthalmology", "Cataract Surgery", "Retina Surgery"],
  identifier: {
    "@type": "PropertyValue",
    name: "CRM-SP",
    value: "139300",
  },
  worksFor: {
    "@id": `${BASE_URL}/#organization`,
  },
  jobTitle: "Diretor Clínico",
  url: `${BASE_URL}/sobre`,
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "IAMSPE — Instituto de Assistência Médica ao Servidor Público Estadual",
    },
  ],
  memberOf: {
    "@type": "MedicalOrganization",
    name: "Conselho Brasileiro de Oftalmologia (CBO)",
  },
};

const draPriscillaSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  "@id": `${BASE_URL}/sobre#dra-priscilla`,
  name: "Dra. Priscilla R. de Almeida",
  givenName: "Priscilla",
  familyName: "Almeida",
  honorificPrefix: "Dra.",
  description:
    "Oftalmologista especialista em Córnea, Segmento Anterior e Lentes de Contato Especiais. Diretora Técnica da Drudi e Almeida Oftalmologia. Fellowship em Córnea e Doenças Externas pela EPM/UNIFESP. Especialista em adaptação de lentes para ceratocone.",
  medicalSpecialty: [
    "Ophthalmology",
    "Corneal Disease Treatment",
    "Keratoconus Treatment",
    "Contact Lens Fitting",
  ],
  identifier: {
    "@type": "PropertyValue",
    name: "CRM-SP",
    value: "148173",
  },
  worksFor: {
    "@id": `${BASE_URL}/#organization`,
  },
  jobTitle: "Diretora Técnica",
  url: `${BASE_URL}/sobre`,
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Escola Paulista de Medicina — EPM/UNIFESP",
    },
  ],
  memberOf: {
    "@type": "MedicalOrganization",
    name: "Conselho Brasileiro de Oftalmologia (CBO)",
  },
};

// ── 5 Local Business units ─────────────────────────────────────
const units = [
  {
    name: "Drudi e Almeida — Unidade Santana",
    street: "Rua Dr. César, 130",
    postal: "02013-001",
    lat: -23.4873,
    lng: -46.6268,
    map: "https://maps.google.com/maps?q=Drudi+e+Almeida+Santana+Rua+Dr+César+130",
  },
  {
    name: "Drudi e Almeida — Unidade Tatuapé",
    street: "Rua Tuiuti, 2429",
    postal: "03307-001",
    lat: -23.5399,
    lng: -46.5739,
    map: "https://maps.google.com/maps?q=Drudi+e+Almeida+Tatuapé+Rua+Tuiuti+2429",
  },
  {
    name: "Drudi e Almeida — Unidade Lapa",
    street: "Rua Barão de Jundiaí, 221",
    postal: "05073-001",
    lat: -23.5238,
    lng: -46.7014,
    map: "https://maps.google.com/maps?q=Drudi+e+Almeida+Lapa+Rua+Barão+de+Jundiaí+221",
  },
  {
    name: "Drudi e Almeida — Unidade São Miguel",
    street: "Rua Bernardo Marcondes, 108",
    postal: "08010-001",
    lat: -23.4975,
    lng: -46.4401,
    map: "https://maps.google.com/maps?q=Drudi+e+Almeida+São+Miguel+Rua+Bernardo+Marcondes+108",
  },
  {
    name: "Drudi e Almeida — Unidade Guarulhos",
    street: "Rua Sete de Setembro, 375",
    postal: "07010-001",
    lat: -23.4628,
    lng: -46.5333,
    map: "https://maps.google.com/maps?q=Drudi+e+Almeida+Guarulhos+Rua+Sete+de+Setembro+375",
  },
];

const localBusinessSchemas = units.map((u) => ({
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "MedicalBusiness", "MedicalClinic"],
  name: u.name,
  parentOrganization: { "@id": `${BASE_URL}/#organization` },
  telephone: PHONE_LANDLINE,
  address: {
    "@type": "PostalAddress",
    streetAddress: u.street,
    addressLocality: u.name.includes("Guarulhos") ? "Guarulhos" : "São Paulo",
    addressRegion: "SP",
    postalCode: u.postal,
    addressCountry: "BR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: u.lat,
    longitude: u.lng,
  },
  hasMap: u.map,
  openingHoursSpecification: openingHours,
  medicalSpecialty: "Ophthalmology",
  priceRange: "$$",
}));

// ── Website ────────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE_URL}/#website`,
  name: "Drudi e Almeida Clínicas Oftalmológicas",
  url: BASE_URL,
  description:
    "Site oficial da Drudi e Almeida Clínicas Oftalmológicas — referência em catarata, ceratocone, glaucoma, retina e estrabismo em São Paulo.",
  inLanguage: "pt-BR",
  publisher: { "@id": `${BASE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const allSchemas = [
  organizationSchema,
  drFernandoSchema,
  draPriscillaSchema,
  websiteSchema,
  ...localBusinessSchemas,
];

export default function SchemaOrg() {
  return (
    <>
      {allSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
        />
      ))}
    </>
  );
}
