import { Helmet } from "react-helmet-async";
import { getPublicStorageUrl } from "../../supabaseClient";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
  keywords?: string[];
};

const fallbackSiteUrl = "https://gabrieletodaro-dev.it";
const defaultSeoImageUrl = getPublicStorageUrl("portfolio-assets/profile/gabriele.webp");
const defaultKeywords = [
  "Gabriele Todaro",
  "Todaro Dev",
  "Tod Dev",
  "Tod sviluppatore",
  "sviluppatore full-stack",
  "sviluppatore React",
  "sviluppatore TypeScript",
  "sviluppatore Laravel",
  "portfolio developer",
];

function getSiteUrl() {
  const configuredSiteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const runtimeSiteUrl = typeof window !== "undefined" ? window.location.origin : "";

  return (configuredSiteUrl || runtimeSiteUrl || fallbackSiteUrl).replace(/\/$/, "");
}

export default function Seo({
  title,
  description,
  path = "/",
  imageUrl,
  keywords = [],
}: SeoProps) {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const seoImageUrl = imageUrl || defaultSeoImageUrl;
  const pageKeywords = [...defaultKeywords, ...keywords].join(", ");
  const personStructuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabriele Todaro",
    alternateName: ["Todaro Dev", "Tod Dev", "Gabriele Todaro Dev"],
    jobTitle: "Sviluppatore full-stack",
    url: siteUrl,
    image: seoImageUrl,
    knowsAbout: [
      "React",
      "TypeScript",
      "Laravel",
      "MySQL",
      "API REST",
      "Sviluppo web full-stack",
    ],
  };
  const websiteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Gabriele Todaro | Todaro Dev",
    alternateName: ["Todaro Dev", "Tod Dev"],
    url: siteUrl,
    inLanguage: "it-IT",
    description,
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={pageKeywords} />
      <meta name="author" content="Gabriele Todaro" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:site_name" content="Gabriele Todaro | Todaro Dev" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={seoImageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImageUrl} />

      <script type="application/ld+json">
        {JSON.stringify([personStructuredData, websiteStructuredData])}
      </script>
    </Helmet>
  );
}
