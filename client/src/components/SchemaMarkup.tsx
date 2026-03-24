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

const BASE_URL = "https://institutodrudiealmeida.com.br";

const CLINIC_BASE = {
  "@type": "MedicalClinic",
  name: "Drudi e Almeida Clínicas Oftalmológicas",
  alternateName: "Instituto Drudi e Almeida",
  url: BASE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${BASE_URL}/images/logo-horizontal-200w_opt.webp`,
    width: 200,
    height: 60,
  },
  image: `${BASE_URL}/og-image.jpg`,
  telephone: "+55-11-5430-2421",
  email: "contato@drudiealmeida.com",
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
    "https://www.instagram.com/drudiealmeida/",
    "https://www.facebook.com/drudiealmeida/",
  ],
  hasMap: "https://maps.google.com/?q=Drudi+e+Almeida+Oftalmologia+São+Paulo",
  location: [
    {
      "@type": "Place",
      name: "Unidade Lapa",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Barão de Jundiaí, 221",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "05040-010",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Santana",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Dr. César, 130",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "02013-001",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Tatuapé",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Tuiuti, 2429",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "03307-005",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade São Miguel Paulista",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Bernardo Marcondes, 108",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "08010-060",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Guarulhos",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Sete de Setembro, 375",
        addressLocality: "Guarulhos",
        addressRegion: "SP",
        postalCode: "07011-020",
        addressCountry: "BR",
      },
    },
  ],
};

const PHYSICIANS = {
  Fernando: {
    "@type": "Physician",
    "@id": `${BASE_URL}/medico/dr-fernando-drudi#physician`,
    name: "Dr. Fernando Macei Drudi",
    honorificPrefix: "Dr.",
    jobTitle: "Diretor Clínico — Especialista em Catarata e Retina Cirúrgica",
    description:
      "Médico oftalmologista especializado em Catarata e Retina Cirúrgica. Diretor Clínico da Drudi e Almeida Oftalmologia. Preceptor de Retina e Catarata no IAMSPE.",
    url: `${BASE_URL}/medico/dr-fernando-drudi`,
    medicalSpecialty: ["Ophthalmology", "Cataract Surgery", "Retina Surgery"],
    identifier: {
      "@type": "PropertyValue",
      name: "CRM-SP",
      value: "139300",
    },
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/dr-fernando-800w.webp`,
      width: 800,
      height: 1067,
    },
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
      url: BASE_URL,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "IAMSPE — Instituto de Assistência Médica ao Servidor Público Estadual",
    },
    memberOf: {
      "@type": "MedicalOrganization",
      name: "Conselho Brasileiro de Oftalmologia (CBO)",
    },
  },
  Priscilla: {
    "@type": "Physician",
    "@id": `${BASE_URL}/medico/dra-priscilla-almeida#physician`,
    name: "Dra. Priscilla Rodrigues de Almeida",
    honorificPrefix: "Dra.",
    jobTitle: "Diretora Técnica — Especialista em Córnea e Ceratocone",
    description:
      "Médica oftalmologista especializada em Córnea, Ceratocone e Lentes de Contato Especiais. Diretora Técnica da Drudi e Almeida. Fellowship em Córnea pela EPM/UNIFESP.",
    url: `${BASE_URL}/medico/dra-priscilla-almeida`,
    medicalSpecialty: ["Ophthalmology", "Corneal Disease Treatment", "Keratoconus Treatment", "Contact Lens Fitting"],
    identifier: [
      {
        "@type": "PropertyValue",
        name: "CRM-SP",
        value: "148173",
      },
      {
        "@type": "PropertyValue",
        name: "RQE",
        value: "59216",
      },
    ],
    image: {
      "@type": "ImageObject",
      url: `${BASE_URL}/images/dra-priscilla-800w.webp`,
      width: 800,
      height: 1067,
    },
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
      url: BASE_URL,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Escola Paulista de Medicina — EPM/UNIFESP",
    },
    memberOf: {
      "@type": "MedicalOrganization",
      name: "Conselho Brasileiro de Oftalmologia (CBO)",
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
          "@id": `${BASE_URL}/#organization`,
          name: "Drudi e Almeida Clínicas Oftalmológicas",
          url: BASE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${BASE_URL}/images/logo-horizontal-200w_opt.webp`,
            width: 200,
            height: 60,
          },
          sameAs: [
            "https://www.instagram.com/drudiealmeida/",
            "https://www.facebook.com/drudiealmeida/",
          ],
        },
        {
          ...CLINIC_BASE,
          "@id": `${BASE_URL}/#clinic`,
          parentOrganization: {
            "@id": `${BASE_URL}/#organization`,
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
        url: BASE_URL,
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
