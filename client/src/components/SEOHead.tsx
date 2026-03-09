import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  schema?: object | object[];
}

const BASE_URL = "https://institutodrudiealmeida.com.br";
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/og-default_4b70bdbb.png`;

export default function SEOHead({
  title,
  description,
  keywords,
  canonicalPath = "/",
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
}: SEOHeadProps) {
  // Title is used as-is; each page must include brand name if desired and keep within 30-60 chars
  const fullTitle = title;
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;
  // Ensure ogImage is absolute URL
  const ogImageAbsolute = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImageAbsolute} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Drudi e Almeida Oftalmologia" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageAbsolute} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
