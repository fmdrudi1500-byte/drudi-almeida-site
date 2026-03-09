/**
 * SchemaMarkup — JSON-LD structured data for Google rich results
 *
 * Usage:
 *   <SchemaMarkup type="clinic" />                 → MedicalClinic (all pages)
 *   <SchemaMarkup type="physician" name="Fernando" /> → Physician schema
 *   <SchemaMarkup type="specialty" specialty="Cataract Surgery" /> → MedicalSpecialty
 */

interface ClinicSchemaProps {
  type: "clinic";
}

interface PhysicianSchemaProps {
  type: "physician";
  name: "Fernando" | "Priscilla";
}

interface SpecialtySchemaProps {
  type: "specialty";
  specialty: string;
  description: string;
  url: string;
}

type SchemaMarkupProps = ClinicSchemaProps | PhysicianSchemaProps | SpecialtySchemaProps;

const CLINIC_BASE = {
  "@type": "MedicalClinic",
  name: "Drudi e Almeida Clínicas Oftalmológicas",
  alternateName: "Instituto Drudi e Almeida",
  url: "https://www.institutodrudiealmeida.com.br",
  logo: "https://www.institutodrudiealmeida.com.br/logo-drudi-almeida.svg",
  image: "https://www.institutodrudiealmeida.com.br/og-image.jpg",
  telephone: "+55-11-5430-2421",
  email: "contato@institutodrudiealmeida.com.br",
  description:
    "Clínica oftalmológica com 5 institutos especializados em catarata, ceratocone, glaucoma, retina e estrabismo. 5 unidades em São Paulo e Guarulhos.",
  medicalSpecialty: "Ophthalmology",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "12:00",
    },
  ],
  sameAs: [
    "https://www.instagram.com/drudiealmeida",
    "https://www.facebook.com/drudiealmeida",
  ],
  hasMap: "https://maps.google.com/?q=Drudi+e+Almeida+Oftalmologia+São+Paulo",
  location: [
    {
      "@type": "Place",
      name: "Unidade Lapa",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Pompeia, 1200",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "05023-000",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Santana",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Braz Leme, 1717",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "02511-000",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Tatuapé",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Tuiuti, 1700",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "03307-005",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade São Miguel",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Marechal Tito, 3900",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "08110-000",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Guarulhos",
      address: {
        "@type": "PostalAddress",
        streetAddress: "R. Sete de Setembro, 1000",
        addressLocality: "Guarulhos",
        addressRegion: "SP",
        postalCode: "07020-000",
        addressCountry: "BR",
      },
    },
  ],
};

const PHYSICIANS = {
  Fernando: {
    "@type": "Physician",
    name: "Dr. Fernando Drudi",
    honorificPrefix: "Dr.",
    jobTitle: "Oftalmologista — Especialista em Retina Cirúrgica",
    description:
      "Médico oftalmologista especializado em retina cirúrgica, com mais de 10 anos de experiência. Participa do Projeto Oftalmologia Humanitária na Amazônia.",
    url: "https://www.institutodrudiealmeida.com.br/sobre-nos",
    medicalSpecialty: "Ophthalmology",
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Universidade de São Paulo (USP)",
    },
    award: "Amigo da Marinha — Marinha do Brasil",
  },
  Priscilla: {
    "@type": "Physician",
    name: "Dra. Priscilla R. de Almeida",
    honorificPrefix: "Dra.",
    jobTitle: "Oftalmologista — Especialista em Ceratocone e Córnea",
    description:
      "Médica oftalmologista especializada em ceratocone, crosslinking e adaptação de lentes de contato especiais.",
    url: "https://www.institutodrudiealmeida.com.br/sobre-nos",
    medicalSpecialty: "Ophthalmology",
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
    },
  },
};

export default function SchemaMarkup(props: SchemaMarkupProps) {
  let schema: Record<string, unknown>;

  if (props.type === "clinic") {
    schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://institutodrudiealmeida.com.br/#organization",
          name: "Drudi e Almeida Cl\u00ednicas Oftalmol\u00f3gicas",
          url: "https://institutodrudiealmeida.com.br",
          logo: {
            "@type": "ImageObject",
            url: "https://institutodrudiealmeida.com.br/logo-drudi-almeida.svg",
            width: 200,
            height: 60,
          },
          sameAs: [
            "https://www.instagram.com/drudiealmeida",
            "https://www.facebook.com/drudiealmeida",
          ],
        },
        {
          ...CLINIC_BASE,
          "@id": "https://institutodrudiealmeida.com.br/#clinic",
          parentOrganization: {
            "@id": "https://institutodrudiealmeida.com.br/#organization",
          },
        },
      ],
    };
  } else if (props.type === "physician") {
    schema = {
      "@context": "https://schema.org",
      ...PHYSICIANS[props.name],
    };
  } else {
    // specialty
    schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: props.specialty,
      description: props.description,
      url: props.url,
      about: {
        "@type": "MedicalCondition",
        name: props.specialty,
      },
      isPartOf: {
        "@type": "MedicalClinic",
        name: "Drudi e Almeida Clínicas Oftalmológicas",
        url: "https://www.institutodrudiealmeida.com.br",
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
