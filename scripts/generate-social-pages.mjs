import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const DIST_DIR = resolve("dist");
const template = readFileSync(resolve(DIST_DIR, "index.html"), "utf8" );
const SOCIAL_IMAGE = "https://leville.net/og-club-support.jpg";

const pages = [
  {
    path: "/seuratuki",
    lang: "fi",
    title: "Seuratuki – urheiluseuran varainhankinta ilman myyntiä | Leville.net",
    description:
      "Tue omaa seuraasi varaamalla majoitus Leviltä. Sinä maksat normaalin hinnan, seurasi saa 10 % majoituksen verottomasta hinnasta.",
    imageAlt: "Urheiluseura saapumassa majoitukseen Levillä",
  },
  {
    path: "/en/club-support",
    lang: "en",
    title: "Club support – fundraising without selling products | Leville.net",
    description:
      "Support your club by booking accommodation in Levi. You pay the normal price, your club receives 10% of the VAT-exclusive accommodation price.",
    imageAlt: "A sports club arriving at accommodation in Levi",
  },
];

const escapeAttribute = (value) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

for (const page of pages) {
  const canonical = `https://leville.net${page.path}`;
  const socialTags = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeAttribute(page.title)}" />
    <meta property="og:description" content="${escapeAttribute(page.description)}" />
    <meta property="og:image" content="${SOCIAL_IMAGE}" />
    <meta property="og:image:secure_url" content="${SOCIAL_IMAGE}" />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeAttribute(page.imageAlt)}" />
    <meta property="og:site_name" content="Leville.net" />
    <meta property="og:locale" content="${page.lang === "fi" ? "fi_FI" : "en_GB"}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttribute(page.title)}" />
    <meta name="twitter:description" content="${escapeAttribute(page.description)}" />
    <meta name="twitter:image" content="${SOCIAL_IMAGE}" />
    <meta name="twitter:image:alt" content="${escapeAttribute(page.imageAlt)}" />`;

  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${page.lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeAttribute(page.description)}" />`,
    )
    .replace("</head>", `${socialTags}\n  </head>`);

  const outputPath = resolve(DIST_DIR, page.path.slice(1), "index.html");
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, html);
}

console.log(`Generated ${pages.length} social-preview HTML pages.`);