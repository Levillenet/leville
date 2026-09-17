import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { MapPin, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import ScrollReveal from "@/components/ScrollReveal";
import SeoMeta from "@/components/SeoMeta";
import JsonLd from "@/components/JsonLd";
import HreflangTags from "@/components/HreflangTags";
import GroupInquiryForm from "@/components/GroupInquiryForm";
import { getBuildingPage } from "@/data/building-pages";

const BASE_URL = "https://leville.net";

interface Props {
  slug: string;
  lang?: "fi" | "en";
}

const BuildingPage = ({ slug, lang = "fi" }: Props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, lang]);

  const building = getBuildingPage(slug);
  if (!building) return <Navigate to="/majoitukset" replace />;

  const c = building[lang];
  const canonical = `${BASE_URL}${building.path[lang]}`;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const complexSchema = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name: building.name,
    description: c.metaDescription,
    url: canonical,
    numberOfAccommodationUnits: building.units,
    image: building.images.map((i) => `${BASE_URL}${i.src}`),
    address: {
      "@type": "PostalAddress",
      streetAddress: building.postal.street,
      postalCode: building.postal.postalCode,
      addressLocality: building.postal.locality,
      addressRegion: "Lappi",
      addressCountry: "FI",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: building.geo.lat,
      longitude: building.geo.lng,
    },
    amenityFeature: building.amenities.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a[lang],
      value: true,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "fi" ? "Etusivu" : "Home", item: lang === "fi" ? `${BASE_URL}/` : `${BASE_URL}/en` },
      { "@type": "ListItem", position: 2, name: building.name, item: canonical },
    ],
  };

  return (
    <>
      <SeoMeta
        title={c.metaTitle}
        description={c.metaDescription}
        canonicalUrl={canonical}
        lang={lang}
        ogType="website"
      />
      <HreflangTags
        currentPath={building.path[lang]}
        currentLang={lang}
        customUrls={{ fi: building.path.fi, en: building.path.en }}
      />
      <JsonLd data={complexSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />

        <main id="main-content" className="pt-28 pb-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <ScrollReveal>
              <header className="mb-8">
                <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{building.address}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">{c.h1}</h1>
                <p className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed">{c.lead}</p>
              </header>
            </ScrollReveal>

            <ScrollReveal>
              <section className="glass-card border border-border/30 rounded-xl p-5 sm:p-6 mb-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {c.facts.map((f) => (
                    <div key={f.label}>
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">{f.label}</div>
                      <div className="text-base sm:text-lg font-semibold text-foreground">{f.value}</div>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <div className="grid sm:grid-cols-3 gap-4 mb-12">
                {building.images.map((img, i) => (
                  <img
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    width={800}
                    height={600}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="rounded-xl object-cover w-full h-48 sm:h-40"
                  />
                ))}
              </div>
            </ScrollReveal>

            {c.sections.map((s) => (
              <ScrollReveal key={s.heading}>
                <section className="mb-12 max-w-3xl">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{s.heading}</h2>
                  <div className="space-y-4">
                    {s.paragraphs.map((p, i) => (
                      <p key={i} className="text-foreground/90 leading-relaxed">{p}</p>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            ))}

            <ScrollReveal>
              <section className="mb-12 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{c.groupHeading}</h2>
                <ul className="space-y-3">
                  {c.groupBullets.map((b) => (
                    <li key={b} className="flex gap-3 text-foreground/90 leading-relaxed">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="mb-12 max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">{c.locationHeading}</h2>
                <div className="space-y-4">
                  {c.locationParagraphs.map((p, i) => (
                    <p key={i} className="text-foreground/90 leading-relaxed">{p}</p>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="mb-14">
                <GroupInquiryForm
                  lang={lang}
                  buildingName={building.name}
                  heading={c.formHeading}
                  intro={c.formIntro}
                />
              </section>
            </ScrollReveal>

            <ScrollReveal>
              <section className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">{c.faqHeading}</h2>
                <div className="space-y-6">
                  {c.faqs.map((f) => (
                    <div key={f.q}>
                      <h3 className="font-semibold text-lg text-foreground mb-1">{f.q}</h3>
                      <p className="text-muted-foreground leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>
          </div>
        </main>

        <Footer lang={lang} />
      </div>
    </>
  );
};

export default BuildingPage;
