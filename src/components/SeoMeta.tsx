import { Helmet } from "react-helmet-async";

export interface SeoMetaProps {
  title: string;
  description: string;
  canonicalUrl: string;
  lang: string;
  ogType?: "website" | "article";
  ogImage?: string;
  ogImageAlt?: string;
  noindex?: boolean;
}

const localeMap: Record<string, string> = {
  fi: "fi_FI",
  en: "en_US",
  sv: "sv_SE",
  de: "de_DE",
  fr: "fr_FR",
  es: "es_ES",
  nl: "nl_NL",
};

const defaultOgImageAlt: Record<string, string> = {
  fi: "Levi hiihtokeskus Suomen Lapissa – lumisia tuntureita ja revontulia",
  en: "Levi ski resort in Finnish Lapland — snow-covered fells and Northern Lights",
  sv: "Levi skidort i Finska Lappland — snötäckta fjäll och norrsken",
  de: "Levi Skigebiet in Finnisch-Lappland — schneebedeckte Fjells und Nordlichter",
  fr: "Station de ski de Levi en Laponie finlandaise — fjells enneigés et aurores boréales",
  es: "Estación de esquí de Levi en la Laponia finlandesa — colinas nevadas y auroras boreales",
  nl: "Levi skigebied in Fins Lapland — besneeuwde fjälls en noorderlicht",
};

/**
 * Reusable SEO meta component that renders title, description, canonical,
 * Open Graph and Twitter Card tags into <head> via React Helmet.
 *
 * Usage:
 *   <SeoMeta
 *     title="Page Title"
 *     description="Page description"
 *     canonicalUrl="https://leville.net/path"
 *     lang="en"
 *     ogType="article"
 *   />
 *
 * For pages that already render <title> and <meta name="description"> via
 * their own <Helmet>, you can skip those and use SeoMeta only for OG/Twitter
 * by not rendering SeoMeta at all and instead using the helper `getOgTags()`.
 */
const SeoMeta = ({
  title,
  description,
  canonicalUrl,
  lang,
  ogType = "article",
  ogImage = "https://leville.net/og-image.png",
  ogImageAlt,
  noindex = false,
}: SeoMetaProps) => {
  const locale = localeMap[lang] || "en_US";
  const imageAlt = ogImageAlt || defaultOgImageAlt[lang] || defaultOgImageAlt.en;

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {!noindex && <meta name="robots" content="index, follow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Leville.net" />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />
    </Helmet>
  );
};

export default SeoMeta;
