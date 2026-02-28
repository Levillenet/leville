import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import HreflangTags from "@/components/HreflangTags";
import JsonLd from "@/components/JsonLd";
import { getWebsiteSchema } from "@/utils/structuredData";
import QuizStart from "@/components/quiz/QuizStart";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResult from "@/components/quiz/QuizResult";
import { quizQuestions } from "@/data/quizQuestions";
import WhatsAppChat from "@/components/WhatsAppChat";
import StickyBookingBar from "@/components/StickyBookingBar";
import { Language } from "@/translations";
import { AnimatePresence } from "framer-motion";

type QuizState = "start" | "playing" | "finished";

interface TietovisaProps {
  lang?: Language;
}

const Tietovisa = ({ lang = "fi" }: TietovisaProps) => {
  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const location = useLocation();

  const advanceTimerRef = useRef<number | null>(null);

  const clearAdvanceTimer = () => {
    if (advanceTimerRef.current !== null) {
      window.clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearAdvanceTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Multilingual meta content
  const meta: Record<Language, { title: string; description: string; keywords: string; canonical: string }> = {
    fi: {
      title: "Levi-tietovisa - Testaa tietämyksesi | Leville.net",
      description: "Testaa Levi-tietämyksesi hauskalla tietovisalla! 10 kysymystä Suomen suosituimmasta hiihtokeskuksesta.",
      keywords: "Levi tietovisa, Levi visa, hiihtokeskus tietovisa, Lappi tietovisa",
      canonical: "https://www.leville.net/tietovisa"
    },
    en: {
      title: "Levi Quiz - Test Your Knowledge | Leville.net",
      description: "Test your knowledge about Levi ski resort with our fun quiz! 10 questions about Finland's most popular skiing destination.",
      keywords: "Levi quiz, Levi trivia, Finland ski resort quiz, Lapland quiz",
      canonical: "https://www.leville.net/en/quiz"
    },
    sv: {
      title: "Levi Quiz - Testa dina kunskaper | Leville.net",
      description: "Testa dina kunskaper om Levi skidort med vårt roliga quiz! 10 frågor om Finlands mest populära skidort.",
      keywords: "Levi quiz, Levi frågesport, Finland skidort quiz, Lappland quiz",
      canonical: "https://www.leville.net/sv/quiz"
    },
    de: {
      title: "Levi Quiz - Teste dein Wissen | Leville.net",
      description: "Teste dein Wissen über das Skigebiet Levi mit unserem lustigen Quiz! 10 Fragen über Finnlands beliebtestes Skigebiet.",
      keywords: "Levi Quiz, Levi Trivia, Finnland Skigebiet Quiz, Lappland Quiz",
      canonical: "https://www.leville.net/de/quiz"
    },
    es: {
      title: "Quiz de Levi - Pon a prueba tus conocimientos | Leville.net",
      description: "¡Pon a prueba tus conocimientos sobre la estación de esquí de Levi con nuestro divertido quiz! 10 preguntas sobre el destino de esquí más popular de Finlandia.",
      keywords: "Levi quiz, Levi trivia, Finlandia estación esquí quiz, Laponia quiz",
      canonical: "https://www.leville.net/es/quiz"
    },
    fr: {
      title: "Quiz Levi - Testez vos connaissances | Leville.net",
      description: "Testez vos connaissances sur la station de ski de Levi avec notre quiz amusant ! 10 questions sur la destination de ski la plus populaire de Finlande.",
      keywords: "Levi quiz, Levi trivia, Finlande station ski quiz, Laponie quiz",
      canonical: "https://www.leville.net/fr/quiz"
    },
    nl: {
      title: "Levi Quiz - Test je kennis | Leville.net",
      description: "Test je kennis over skigebied Levi met onze leuke quiz! 10 vragen over de populairste skibestemming van Finland.",
      keywords: "Levi quiz, Levi trivia, Finland skigebied quiz, Lapland quiz",
      canonical: "https://www.leville.net/nl/quiz"
    }
  };

  const localeMap: Record<Language, string> = {
    fi: "fi_FI", en: "en_US", sv: "sv_SE", de: "de_DE", es: "es_ES", fr: "fr_FR", nl: "nl_NL"
  };

  const m = meta[lang];

  const handleStart = () => {
    clearAdvanceTimer();
    setQuizState("playing");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    // Prevent double-triggering while we're waiting to advance
    if (advanceTimerRef.current !== null) return;

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    advanceTimerRef.current = window.setTimeout(() => {
      advanceTimerRef.current = null;

      if (nextIndex < quizQuestions.length) {
        setCurrentQuestionIndex(nextIndex);
      } else {
        setQuizState("finished");
      }
    }, 1500);
  };

  const handleRestart = () => {
    clearAdvanceTimer();
    setQuizState("start");
    setCurrentQuestionIndex(0);
    setScore(0);
  };

  return (
    <>
      <JsonLd data={getWebsiteSchema()} />
      <HreflangTags currentPath={location.pathname} currentLang={lang} />
      <Helmet>
        <html lang={lang} />
        <title>{m.title}</title>
        <meta name="description" content={m.description} />
        <meta name="keywords" content={m.keywords} />
        <link rel="canonical" href={m.canonical} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={m.canonical} />
        <meta property="og:title" content={m.title} />
        <meta property="og:description" content={m.description} />
        <meta property="og:locale" content={localeMap[lang]} />
        <meta property="og:site_name" content="Leville.net" />
        <meta property="og:image" content="https://leville.net/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={m.title} />
        <meta name="twitter:description" content={m.description} />
        <meta name="twitter:image" content="https://leville.net/og-image.png" />
        <meta name="twitter:image:alt" content={lang === "fi" ? "Levin hiihtokeskus Suomen Lapissa" : "Levi ski resort in Finnish Lapland"} />
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <SubpageBackground />
        <Header />
        <Breadcrumbs lang={lang} />
        <main className="pt-8 pb-20">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              {quizState === "start" && (
                <QuizStart key="start" onStart={handleStart} lang={lang} />
              )}
              {quizState === "playing" && (
                <QuizQuestion
                  key={`question-${currentQuestionIndex}`}
                  question={quizQuestions[currentQuestionIndex]}
                  currentIndex={currentQuestionIndex}
                  totalQuestions={quizQuestions.length}
                  onAnswer={handleAnswer}
                  lang={lang}
                />
              )}
              {quizState === "finished" && (
                <QuizResult
                  key="result"
                  score={score}
                  totalQuestions={quizQuestions.length}
                  onRestart={handleRestart}
                  lang={lang}
                />
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer lang={lang} />
        <WhatsAppChat lang={lang} />
        <StickyBookingBar lang={lang} />
      </div>
    </>
  );
};

export default Tietovisa;
