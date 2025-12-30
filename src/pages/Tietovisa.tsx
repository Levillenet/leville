import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import SubpageBackground from "@/components/SubpageBackground";
import QuizStart from "@/components/quiz/QuizStart";
import QuizQuestion from "@/components/quiz/QuizQuestion";
import QuizResult from "@/components/quiz/QuizResult";
import { quizQuestions } from "@/data/quizQuestions";
import WhatsAppChat from "@/components/WhatsAppChat";
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

  const isEnglish = lang === "en";

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

  const metaTitle = isEnglish
    ? "Levi Quiz - Test Your Knowledge | Leville.net"
    : "Levi-tietovisa - Testaa tietämyksesi | Leville.net";

  const metaDescription = isEnglish
    ? "Test your knowledge about Levi ski resort with our fun quiz! 10 questions about Finland's most popular skiing destination."
    : "Testaa Levi-tietämyksesi hauskalla tietovisalla! 10 kysymystä Suomen suosituimmasta hiihtokeskuksesta.";

  return (
    <>
      <Helmet>
        <html lang={isEnglish ? "en" : "fi"} />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={isEnglish 
          ? "Levi quiz, Levi trivia, Finland ski resort quiz, Lapland quiz"
          : "Levi tietovisa, Levi visa, hiihtokeskus tietovisa, Lappi tietovisa"
        } />
        <link rel="canonical" href={isEnglish 
          ? "https://www.leville.net/en/quiz"
          : "https://www.leville.net/tietovisa"
        } />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={isEnglish 
          ? "https://www.leville.net/en/quiz"
          : "https://www.leville.net/tietovisa"
        } />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:locale" content={isEnglish ? "en_US" : "fi_FI"} />
        <meta property="og:site_name" content="Leville.net" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
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
      </div>
    </>
  );
};

export default Tietovisa;
