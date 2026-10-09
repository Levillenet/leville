import { lazy, Suspense, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = lazy(() => import("@/pages/NotFound"));

interface SeoCatchAllProps {
  /** true once the seo_pages lookup has completed (success or failure) */
  resolved: boolean;
  /** starts the (de-duplicated) seo_pages lookup immediately */
  startLookup: () => void;
}

/**
 * Catch-all route element. While the seo_pages lookup is in flight it renders a neutral
 * shell (no 404 text, no robots meta, no 404 title) so crawlers never snapshot a transient
 * "not found" state. NotFound is rendered only after the lookup has resolved and no
 * dynamic route matched.
 */
const SeoCatchAll = ({ resolved, startLookup }: SeoCatchAllProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    startLookup();
  }, [startLookup]);

  if (resolved) {
    return (
      <Suspense fallback={<div className="min-h-screen" />}>
        <NotFound />
      </Suspense>
    );
  }

  const lang = pathname === "/en" || pathname.startsWith("/en/") ? "en" : "fi";
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1" />
      <Footer lang={lang} />
    </div>
  );
};

export default SeoCatchAll;
