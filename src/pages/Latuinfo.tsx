import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const Latuinfo = () => {
  useEffect(() => {
    window.location.href = "https://ladut.lovable.app";
  }, []);

  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>Levin Latuinfo – Reaaliaikainen Latutilanne</title>
        <meta name="description" content="Tarkista Levin latujen kunto ja latutilanne reaaliajassa. Hiihtoladut, kunnostusajat ja olosuhteet yhdellä silmäyksellä." />
        <meta property="og:title" content="Levin Latuinfo – Reaaliaikainen Latutilanne" />
        <meta property="og:description" content="Tarkista Levin latujen kunto ja latutilanne reaaliajassa. Hiihtoladut, kunnostusajat ja olosuhteet." />
        <meta property="og:image" content="https://leville.net/og-latuinfo.png" />
        <meta property="og:url" content="https://leville.net/latuinfo" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:locale" content="fi_FI" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Levin Latuinfo – Reaaliaikainen Latutilanne" />
        <meta name="twitter:description" content="Tarkista Levin latujen kunto ja latutilanne reaaliajassa." />
        <meta name="twitter:image" content="https://leville.net/og-latuinfo.png" />
        <link rel="canonical" href="https://leville.net/latuinfo" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-foreground">Ohjataan latuinfoon...</p>
      </div>
    </>
  );
};

export default Latuinfo;
