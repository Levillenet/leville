import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ClipboardCheck, AlertTriangle, Wrench, Loader2 } from "lucide-react";

type ViewState = "loading" | "success" | "already" | "invalid" | "error";

const contentMap: Record<ViewState, {
  title: string;
  description: string;
  note?: string;
  icon: typeof CheckCircle2;
  iconClassName: string;
  buttonHref?: string;
  buttonLabel?: string;
}> = {
  loading: {
    title: "Käsitellään kuittausta",
    description: "Odota hetki, työ merkitään tehdyksi.",
    icon: Loader2,
    iconClassName: "bg-primary/15 text-primary",
  },
  success: {
    title: "Kiitos, työ hoidettu",
    description: "Tiketti on merkitty tehdyksi.",
    note: "Mukavaa päivää!",
    icon: CheckCircle2,
    iconClassName: "bg-primary/15 text-primary",
    buttonHref: "/",
    buttonLabel: "Etusivulle",
  },
  already: {
    title: "Työ on jo kuitattu",
    description: "Tämä tiketti oli jo merkitty tehdyksi.",
    icon: ClipboardCheck,
    iconClassName: "bg-accent/20 text-accent-foreground",
    buttonHref: "/",
    buttonLabel: "Etusivulle",
  },
  invalid: {
    title: "Linkki ei ole voimassa",
    description: "Tarkista linkki tai pyydä uusi viesti.",
    icon: AlertTriangle,
    iconClassName: "bg-destructive/15 text-destructive",
    buttonHref: "/yhteystiedot",
    buttonLabel: "Ota yhteyttä",
  },
  error: {
    title: "Käsittely ei onnistunut",
    description: "Yritä uudelleen hetken päästä.",
    icon: Wrench,
    iconClassName: "bg-destructive/15 text-destructive",
    buttonHref: "/yhteystiedot",
    buttonLabel: "Ota yhteyttä",
  },
};

export default function TicketResolved() {
  const [searchParams] = useSearchParams();
  const statusParam = searchParams.get("status");
  const token = searchParams.get("token");
  const titleParam = searchParams.get("title");

  const status: ViewState = token
    ? "loading"
    : statusParam === "success" || statusParam === "already" || statusParam === "invalid" || statusParam === "error"
      ? statusParam
      : "error";

  const apt = searchParams.get("apt");

  useEffect(() => {
    if (!token) return;

    let resolveUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/resolve-ticket-public?token=${encodeURIComponent(token)}`;
    if (apt) resolveUrl += `&apt=1`;
    window.location.replace(resolveUrl);
  }, [token, apt]);

  const content = contentMap[status];
  const Icon = content.icon;

  return (
    <>
      <Helmet>
        <html lang="fi" />
        <title>{content.title} | Leville.net</title>
        <meta name="description" content={content.description} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://leville.net/tiketti-ratkaistu" />
      </Helmet>

      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        <div className="relative flex min-h-screen items-center justify-center px-4 py-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.16),transparent_35%),radial-gradient(circle_at_bottom,hsl(var(--accent)/0.16),transparent_30%)]" />

          <Card className="relative w-full max-w-md border-border/50 bg-card/95 shadow-elegant backdrop-blur-sm">
            <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-10">
              <div className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${content.iconClassName}`}>
                <Icon className={`h-10 w-10 ${status === "loading" ? "animate-spin" : ""}`} />
              </div>

              <h1 className="text-3xl font-semibold text-foreground">{content.title}</h1>

              {titleParam ? (
                <p className="mt-3 text-sm font-medium text-muted-foreground">{titleParam}</p>
              ) : null}

              <p className="mt-4 text-base text-muted-foreground">{content.description}</p>

              {content.note ? (
                <p className="mt-2 text-lg font-medium text-foreground">{content.note}</p>
              ) : null}

              {content.buttonHref && content.buttonLabel ? (
                <Button asChild size="lg" className="mt-8 min-w-40">
                  <a href={content.buttonHref}>{content.buttonLabel}</a>
                </Button>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
