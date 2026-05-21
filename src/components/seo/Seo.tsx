import { Helmet } from "react-helmet-async";
import { getPublicStorageUrl } from "../../supabaseClient";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
};

const fallbackSiteUrl = "https://gabrieletodaro-dev.it";
const defaultSeoImageUrl = getPublicStorageUrl("portfolio-assets/profile/gabriele.webp");

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
}: SeoProps) {
  const siteUrl = getSiteUrl();
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const seoImageUrl = imageUrl || defaultSeoImageUrl;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="it_IT" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      <meta property="og:image" content={seoImageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={seoImageUrl} />
    </Helmet>
  );
}
