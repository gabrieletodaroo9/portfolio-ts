import { Helmet } from "react-helmet-async";

type SeoProps = {
  title: string;
  description: string;
  path?: string;
  imageUrl?: string;
};

const fallbackSiteUrl = "https://gabrieletodaro-dev.it";

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

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />

      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
    </Helmet>
  );
}
