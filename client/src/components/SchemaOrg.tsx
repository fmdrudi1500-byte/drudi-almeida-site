/* ============================================================
   SchemaOrg — Global structured data for AI optimization
   ============================================================ */

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: "Drudi e Almeida Clínicas Oftalmológicas",
  alternateName: "Drudi e Almeida Oftalmologia",
  description: "Clínica oftalmológica de referência com 5 institutos especializados: Catarata, Ceratocone, Glaucoma, Retina e Estrabismo. Tecnologia de ponta e cuidado humanizado.",
  url: "https://drudialmeida.com.br",
  telephone: "+5511916544653",
  email: "contato@drudialmeida.com.br",
  address: {
    "@type": "PostalAddress",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  openingHoursSpecification: [
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
  ],
  medicalSpecialty: [
    "Ophthalmology",
    "Cataract Surgery",
    "Glaucoma Treatment",
    "Retina Treatment",
    "Strabismus Treatment",
    "Keratoconus Treatment",
  ],
  sameAs: [
    "https://instagram.com/drudialmeida",
    "https://facebook.com/drudialmeida",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Drudi e Almeida Clínicas Oftalmológicas",
  url: "https://drudialmeida.com.br",
  description: "Site oficial da Drudi e Almeida Clínicas Oftalmológicas — referência em catarata, ceratocone, glaucoma, retina e estrabismo.",
  inLanguage: "pt-BR",
};

export default function SchemaOrg() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
