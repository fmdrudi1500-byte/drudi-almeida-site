/* ============================================================
   InstitutoSchema — Schema.org MedicalClinic por instituto
   Gera JSON-LD específico para cada instituto especializado,
   melhorando a visibilidade no Google Knowledge Panel e AI Search.
   ============================================================ */

const BASE_URL = "https://institutodrudiealmeida.com.br";

// Fotos dos médicos para o Schema.org
const PHYSICIAN_IMAGES: Record<string, string> = {
  "Dr. Fernando Macei Drudi": `${BASE_URL}/images/dr-fernando-800w.webp`,
  "Dra. Priscilla Rodrigues de Almeida": `${BASE_URL}/images/dra-priscilla-800w.webp`,
};
const PHONE = "+5511916544653";
const PHONE_LANDLINE = "+551154302421";

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

type InstitutoType = "catarata" | "ceratocone" | "glaucoma" | "retina" | "estrabismo";

interface InstitutoConfig {
  name: string;
  description: string;
  specialty: string[];
  url: string;
  physician?: {
    name: string;
    crm: string;
    rqe?: string;
    specialty: string[];
  };
}

const institutos: Record<InstitutoType, InstitutoConfig> = {
  catarata: {
    name: "Instituto da Catarata — Drudi e Almeida",
    description:
      "Instituto especializado em diagnóstico e tratamento cirúrgico da catarata. Cirurgia de facoemulsificação com lentes intraoculares premium (monofocais, trifocais e tóricas). Tecnologia de laser femtossegundo e biometria óptica de alta precisão.",
    specialty: ["Ophthalmology", "Cataract Surgery"],
    url: `${BASE_URL}/instituto/catarata`,
    physician: {
      name: "Dr. Fernando Macei Drudi",
      crm: "139300",
      rqe: "50645",
      specialty: ["Ophthalmology", "Cataract Surgery", "Retina Surgery"],
    },
  },
  ceratocone: {
    name: "Instituto do Ceratocone — Drudi e Almeida",
    description:
      "Instituto especializado no diagnóstico e tratamento do ceratocone. Crosslinking de colágeno corneal, implante de anel de Ferrara, adaptação de lentes de contato especiais (RGP, esclerais, híbridas). Diagnóstico com Pentacam e OPD-Scan.",
    specialty: ["Ophthalmology", "Corneal Disease Treatment", "Keratoconus Treatment", "Contact Lens Fitting"],
    url: `${BASE_URL}/instituto/ceratocone`,
    physician: {
      name: "Dra. Priscilla Rodrigues de Almeida",
      crm: "148173",
      rqe: "59216",
      specialty: ["Ophthalmology", "Corneal Disease Treatment", "Keratoconus Treatment"],
    },
  },
  glaucoma: {
    name: "Instituto do Glaucoma — Drudi e Almeida",
    description:
      "Instituto especializado no diagnóstico precoce e tratamento do glaucoma. Tonometria, campo visual computadorizado, OCT de nervo óptico e camada de fibras nervosas. Tratamento clínico, laser (trabeculoplastia) e cirúrgico (trabeculectomia).",
    specialty: ["Ophthalmology", "Glaucoma Treatment"],
    url: `${BASE_URL}/instituto/glaucoma`,
    physician: {
      name: "Dr. Fernando Macei Drudi",
      crm: "139300",
      rqe: "50645",
      specialty: ["Ophthalmology", "Glaucoma Treatment", "Cataract Surgery"],
    },
  },
  retina: {
    name: "Instituto da Retina — Drudi e Almeida",
    description:
      "Instituto especializado em doenças da retina e vítreo. Vitrectomia, injeções intravítreas de anti-VEGF, fotocoagulação a laser, tratamento de retinopatia diabética, degeneração macular e descolamento de retina.",
    specialty: ["Ophthalmology", "Retina Surgery"],
    url: `${BASE_URL}/instituto/retina`,
    physician: {
      name: "Dr. Fernando Macei Drudi",
      crm: "139300",
      rqe: "50645",
      specialty: ["Ophthalmology", "Retina Surgery", "Cataract Surgery"],
    },
  },
  estrabismo: {
    name: "Instituto de Estrabismo — Drudi e Almeida",
    description:
      "Instituto especializado no diagnóstico e tratamento cirúrgico do estrabismo em crianças e adultos. Correção do desalinhamento ocular, tratamento da ambliopia (olho preguiçoso) e reabilitação da visão binocular.",
    specialty: ["Ophthalmology", "Strabismus Treatment"],
    url: `${BASE_URL}/instituto/estrabismo`,
    physician: {
      name: "Dra. Priscilla Rodrigues de Almeida",
      crm: "148173",
      rqe: "59216",
      specialty: ["Ophthalmology", "Strabismus Treatment", "Corneal Disease Treatment"],
    },
  },
};

interface Props {
  instituto: InstitutoType;
}

export default function InstitutoSchema({ instituto }: Props) {
  const config = institutos[instituto];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${config.url}#instituto`,
    name: config.name,
    description: config.description,
    url: config.url,
    telephone: PHONE,
    telephone2: PHONE_LANDLINE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua Dr. César, 130",
      addressLocality: "São Paulo",
      addressRegion: "SP",
      postalCode: "02013-001",
      addressCountry: "BR",
    },
    medicalSpecialty: config.specialty,
    openingHoursSpecification: openingHours,
    parentOrganization: {
      "@id": `${BASE_URL}/#organization`,
    },
    priceRange: "$$",
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Cartão de Crédito, Cartão de Débito, Convênio",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "847",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Add physician if available
  if (config.physician) {
    const identifiers: Record<string, unknown>[] = [
      {
        "@type": "PropertyValue",
        name: "CRM-SP",
        value: config.physician.crm,
      },
    ];
    if (config.physician.rqe) {
      identifiers.push({
        "@type": "PropertyValue",
        name: "RQE",
        value: config.physician.rqe,
      });
    }

    schema.availableService = {
      "@type": "MedicalTherapy",
      name: config.description.split(".")[0],
      provider: {
        "@type": "Physician",
        name: config.physician.name,
        medicalSpecialty: config.physician.specialty,
        identifier: identifiers,
        worksFor: { "@id": `${BASE_URL}/#organization` },
        ...(PHYSICIAN_IMAGES[config.physician.name] ? {
          image: {
            "@type": "ImageObject",
            url: PHYSICIAN_IMAGES[config.physician.name],
            width: 800,
            height: 1067,
          },
        } : {}),
      },
    };
  }

  // BreadcrumbList
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Institutos", item: `${BASE_URL}/#institutos` },
      { "@type": "ListItem", position: 3, name: config.name, item: config.url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 0) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
