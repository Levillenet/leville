import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Flame, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubpageBackground from "@/components/SubpageBackground";
import FireplaceVideoPhase from "@/components/fireplace/FireplaceVideoPhase";
import FireplaceInstructionsPhase from "@/components/fireplace/FireplaceInstructionsPhase";
import FireplaceCodePhase from "@/components/fireplace/FireplaceCodePhase";
import FireplaceAdminPanel from "@/components/fireplace/FireplaceAdminPanel";

// Default constants
const DEFAULT_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
const DEFAULT_UNLOCK_CODE = "1234";
const DEFAULT_FALLBACK_TIMER = 60;

const t = {
  fi: {
    title: "Takan käyttöohje",
    subtitle:
      "Tervetuloa! Ennen takan käyttöä pyydämme sinua katsomaan lyhyen opastusvideon ja lukemaan käyttöohjeet. Tämän tarkoituksena ei ole kiusata tai vaatia liikaa – haluamme ainoastaan varmistaa, että takka on turvallinen käyttää. Väärin käytettynä takasta voi aiheutua vakavia vaaroja, kuten häkämyrkytys, joka on hengenvaarallinen.",
    metaTitle: "Takan käyttöohje | Leville.net",
    metaDesc: "Takan käyttöohjeet ja turvallisuusohjeet majoituskohteissamme.",
    step1: "Video",
    step2: "Ohjeet",
    step3: "Koodi",
  },
  en: {
    title: "Fireplace Instructions",
    subtitle:
      "Welcome! Before using the fireplace, please watch a short instructional video and read the safety instructions. This is not meant to be a hassle – we simply want to ensure that the fireplace is used safely. Improper use can cause serious hazards, including carbon monoxide poisoning, which can be fatal.",
    metaTitle: "Fireplace Instructions | Leville.net",
    metaDesc:
      "Fireplace usage and safety instructions for our accommodation guests.",
    step1: "Video",
    step2: "Instructions",
    step3: "Code",
  },
};

interface FireplaceInstructionsProps {
  lang?: "fi" | "en";
}

const FireplaceInstructions = ({
  lang = "fi",
}: FireplaceInstructionsProps) => {
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get("admin") === "true";

  const [currentPhase, setCurrentPhase] = useState(1);
  const [settings, setSettings] = useState({
    videoUrl: DEFAULT_VIDEO_URL,
    unlockCode: DEFAULT_UNLOCK_CODE,
    fallbackTimer: DEFAULT_FALLBACK_TIMER,
  });

  const strings = t[lang];

  const phases = [
    { number: 1, label: strings.step1 },
    { number: 2, label: strings.step2 },
    { number: 3, label: strings.step3 },
  ];

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{strings.metaTitle}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="description" content={strings.metaDesc} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 max-w-3xl">
            {/* Admin Panel */}
            {isAdmin && (
              <FireplaceAdminPanel
                settings={settings}
                onSave={setSettings}
              />
            )}

            {/* Hero Section */}
            <section className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/20 mb-6">
                <Flame className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {strings.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {strings.subtitle}
              </p>
            </section>

            {/* Progress Stepper */}
            <div className="flex items-center justify-center gap-2 mb-10">
              {phases.map((phase, index) => (
                <div key={phase.number} className="flex items-center">
                  {/* Step circle */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                        currentPhase > phase.number
                          ? "bg-green-500 text-white"
                          : currentPhase === phase.number
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {currentPhase > phase.number ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        phase.number
                      )}
                    </div>
                    <span
                      className={`text-xs mt-1 ${
                        currentPhase >= phase.number
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {phase.label}
                    </span>
                  </div>

                  {/* Connector line */}
                  {index < phases.length - 1 && (
                    <div
                      className={`w-12 md:w-20 h-0.5 mx-2 transition-all duration-300 ${
                        currentPhase > phase.number
                          ? "bg-green-500"
                          : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Phase Content */}
            {currentPhase === 1 && (
              <FireplaceVideoPhase
                lang={lang}
                videoUrl={settings.videoUrl}
                fallbackTimer={settings.fallbackTimer}
                onComplete={() => setCurrentPhase(2)}
              />
            )}

            {currentPhase === 2 && (
              <FireplaceInstructionsPhase
                lang={lang}
                onComplete={() => setCurrentPhase(3)}
              />
            )}

            {currentPhase === 3 && (
              <FireplaceCodePhase
                lang={lang}
                unlockCode={settings.unlockCode}
              />
            )}
          </div>
        </main>
        <Footer lang={lang} />
      </div>
    </>
  );
};

export default FireplaceInstructions;
