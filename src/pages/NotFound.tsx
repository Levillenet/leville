import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CONTENT = {
  fi: {
    lang: "fi",
    title: "Sivua ei löytynyt | Leville.net",
    description:
      "Etsimääsi sivua ei löytynyt. Siirry Levillen etusivulle, majoituksiin, mökkeihin tai Levi-oppaaseen.",
    heading: "404 – Sivua ei löytynyt",
    body: "Etsimääsi sivua ei ole olemassa tai se on siirretty – alta löydät suosituimmat sivumme.",
    links: [
      { to: "/", label: "Etusivu" },
      { to: "/majoitukset", label: "Majoitukset" },
      { to: "/mokit-levilla", label: "Mökit" },
      { to: "/opas/majoitus-levilla", label: "Levi-opas" },
      { to: "/yhteystiedot", label: "Yhteystiedot" },
    ],
  },
  en: {
    lang: "en",
    title: "Page not found | Leville.net",
    description:
      "The page you were looking for was not found. Go to the Leville.net home page, accommodation, cabins or the Levi guide.",
    heading: "404 – Page not found",
    body: "This page doesn't exist or has been moved – here are our most popular pages instead.",
    links: [
      { to: "/en", label: "Home" },
      { to: "/en/accommodations", label: "Accommodation" },
      { to: "/en/log-cabins-levi", label: "Cabins" },
      { to: "/en/guide/accommodation-in-levi", label: "Levi guide" },
      { to: "/en/contact", label: "Contact" },
    ],
  },
} as const;

const NotFound = () => {
  const location = useLocation();
  const isEnglish = location.pathname === "/en" || location.pathname.startsWith("/en/");
  const t = isEnglish ? CONTENT.en : CONTENT.fi;

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <html lang={t.lang} />
        <title>{t.title}</title>
        <meta name="description" content={t.description} />
        <meta name="robots" content="noindex, follow" />
        <meta name="googlebot" content="noindex, follow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4 py-24">
          <div className="max-w-xl text-center">
            <h1 className="mb-4 text-3xl md:text-4xl font-bold text-foreground">{t.heading}</h1>
            <p className="mb-8 text-muted-foreground">{t.body}</p>
            <nav className="flex flex-wrap justify-center gap-3">
              {t.links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default NotFound;
