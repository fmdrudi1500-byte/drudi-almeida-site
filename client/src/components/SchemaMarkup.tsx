/**
 * SchemaMarkup — JSON-LD structured data for Google rich results
 *
 * Usage:
 *   <SchemaMarkup type="clinic" />                 → MedicalClinic (all pages)
 *   <SchemaMarkup type="physician" name="Fernando" /> → Physician schema
 *   <SchemaMarkup type="specialty" specialty="Cataract Surgery" /> → MedicalSpecialty + MedicalWebPage
 */

const BASE_URL = "https://institutodrudiealmeida.com.br";

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
  url: BASE_URL,
  logo: `${BASE_URL}/logo-drudi-almeida.svg`,
  image: "https://files.manuscdn.com/user_upload_by_module/session_file/310419663028489100/TAgHZnKQbefMatka.png",
  telephone: "+55-11-5430-2421",
  email: "contato@drudiealmeida.com",
  description:
    "Clínica oftalmológica com 5 institutos especializados em catarata, ceratocone, glaucoma, retina e estrabismo. 5 unidades em São Paulo e Guarulhos.",
  medicalSpecialty: "http://schema.org/Optometric",
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
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "850",
    bestRating: "5",
    worstRating: "1",
  },
  location: [
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
        postalCode: "03307-001",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade Lapa",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Barão de Jundiaí, 221",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "05073-001",
        addressCountry: "BR",
      },
    },
    {
      "@type": "Place",
      name: "Unidade São Miguel",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Rua Bernardo Marcondes, 108",
        addressLocality: "São Paulo",
        addressRegion: "SP",
        postalCode: "08010-001",
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
        postalCode: "07010-001",
        addressCountry: "BR",
      },
    },
  ],
};

const PHYSICIANS = {
  Fernando: {
    "@type": "Physician",
    name: "Dr. Fernando Macei Drudi",
    honorificPrefix: "Dr.",
    jobTitle: "Oftalmologista — Especialista em Retina Cirúrgica e Catarata",
    description:
      "Médico oftalmologista especializado em retina cirúrgica e cirurgia de catarata. Diretor Clínico da Drudi e Almeida Oftalmologia. Membro do Conselho Brasileiro de Oftalmologia (CBO). Preceptor de Retina e Catarata na Residência Médica do IAMSPE.",
    url: `${BASE_URL}/sobre`,
    medicalSpecialty: ["http://schema.org/Optometric", "http://schema.org/Surgical"],
    identifier: {
      "@type": "PropertyValue",
      name: "CRM-SP",
      value: "139300",
    },
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
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
    name: "Dra. Priscilla R. de Almeida",
    honorificPrefix: "Dra.",
    jobTitle: "Oftalmologista — Especialista em Córnea e Ceratocone",
    description:
      "Médica oftalmologista especializada em córnea, ceratocone, crosslinking e adaptação de lentes de contato especiais. Diretora Técnica da Drudi e Almeida Oftalmologia. Fellowship em Córnea e Doenças Externas pela EPM/UNIFESP.",
    url: `${BASE_URL}/sobre`,
    medicalSpecialty: "http://schema.org/Optometric",
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
    worksFor: {
      "@type": "MedicalClinic",
      name: "Drudi e Almeida Clínicas Oftalmológicas",
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
            url: `${BASE_URL}/logo-drudi-almeida.svg`,
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
    // specialty — MedicalWebPage + MedicalCondition
    schema = {
      "@context": "https://schema.org",
      "@type": "MedicalWebPage",
      name: props.specialty,
      description: props.description,
      url: props.url.startsWith("http") ? props.url : `${BASE_URL}${props.url}`,
      lastReviewed: new Date().toISOString().split("T")[0],
      medicalAudience: {
        "@type": "PatientAudience",
        audienceType: "Patient",
      },
      about: {
        "@type": "MedicalCondition",
        name: props.specialty,
        associatedAnatomy: {
          "@type": "AnatomicalStructure",
          name: "Olho",
        },
      },
      isPartOf: {
        "@id": `${BASE_URL}/#website`,
      },
      mainEntity: {
        "@type": "MedicalClinic",
        "@id": `${BASE_URL}/#clinic`,
        name: "Drudi e Almeida Clínicas Oftalmológicas",
        url: BASE_URL,
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
    />
  );
}
