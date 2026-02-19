import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, RotateCcw, Home, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { getResultMessage } from "@/data/quizQuestions";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { FacebookIcon } from "@/components/icons/SocialIcons";
import { Language } from "@/translations";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  lang?: Language;
}

const QuizResult = ({ score, totalQuestions, onRestart, lang = "fi" }: QuizResultProps) => {
  // For result message, we need fi or en (fallback for others)
  const resultLang = lang === "fi" ? "fi" : "en";
  const result = getResultMessage(score, totalQuestions, resultLang);
  const percentage = Math.round((score / totalQuestions) * 100);
  const { toast } = useToast();

  // Multilingual content
  const content: Record<Language, {
    correct: string;
    playAgain: string;
    share: string;
    copyLink: string;
    exploreLevi: string;
    linkCopied: string;
    shareWith: string;
    error: string;
    couldNotCopy: string;
    shareText: string;
  }> = {
    fi: {
      correct: "oikein",
      playAgain: "Pelaa uudelleen",
      share: "Jaa",
      copyLink: "Kopioi linkki",
      exploreLevi: "Tutustu Leviin",
      linkCopied: "Linkki kopioitu!",
      shareWith: "Jaa se ystävillesi",
      error: "Virhe",
      couldNotCopy: "Linkkiä ei voitu kopioida",
      shareText: `Sain ${score}/${totalQuestions} (${percentage}%) Levi-tietovisassa! Testaa oma tietämyksesi:`
    },
    en: {
      correct: "correct",
      playAgain: "Play Again",
      share: "Share",
      copyLink: "Copy Link",
      exploreLevi: "Explore Levi",
      linkCopied: "Link copied!",
      shareWith: "Share it with your friends",
      error: "Error",
      couldNotCopy: "Could not copy link",
      shareText: `I scored ${score}/${totalQuestions} (${percentage}%) on the Levi Quiz! Test your knowledge:`
    },
    sv: {
      correct: "rätt",
      playAgain: "Spela igen",
      share: "Dela",
      copyLink: "Kopiera länk",
      exploreLevi: "Utforska Levi",
      linkCopied: "Länk kopierad!",
      shareWith: "Dela med dina vänner",
      error: "Fel",
      couldNotCopy: "Kunde inte kopiera länk",
      shareText: `Jag fick ${score}/${totalQuestions} (${percentage}%) på Levi Quiz! Testa dina kunskaper:`
    },
    de: {
      correct: "richtig",
      playAgain: "Nochmal spielen",
      share: "Teilen",
      copyLink: "Link kopieren",
      exploreLevi: "Levi entdecken",
      linkCopied: "Link kopiert!",
      shareWith: "Teile es mit deinen Freunden",
      error: "Fehler",
      couldNotCopy: "Link konnte nicht kopiert werden",
      shareText: `Ich habe ${score}/${totalQuestions} (${percentage}%) beim Levi Quiz erreicht! Teste dein Wissen:`
    },
    es: {
      correct: "correctas",
      playAgain: "Jugar de nuevo",
      share: "Compartir",
      copyLink: "Copiar enlace",
      exploreLevi: "Explorar Levi",
      linkCopied: "¡Enlace copiado!",
      shareWith: "Compártelo con tus amigos",
      error: "Error",
      couldNotCopy: "No se pudo copiar el enlace",
      shareText: `¡Obtuve ${score}/${totalQuestions} (${percentage}%) en el Quiz de Levi! Pon a prueba tus conocimientos:`
    },
    fr: {
      correct: "correctes",
      playAgain: "Rejouer",
      share: "Partager",
      copyLink: "Copier le lien",
      exploreLevi: "Explorer Levi",
      linkCopied: "Lien copié !",
      shareWith: "Partagez-le avec vos amis",
      error: "Erreur",
      couldNotCopy: "Impossible de copier le lien",
      shareText: `J'ai obtenu ${score}/${totalQuestions} (${percentage}%) au Quiz Levi ! Testez vos connaissances :`
    },
    nl: {
      correct: "correct",
      playAgain: "Opnieuw spelen",
      share: "Delen",
      copyLink: "Link kopiëren",
      exploreLevi: "Ontdek Levi",
      linkCopied: "Link gekopieerd!",
      shareWith: "Deel het met je vrienden",
      error: "Fout",
      couldNotCopy: "Kon link niet kopiëren",
      shareText: `Ik scoorde ${score}/${totalQuestions} (${percentage}%) op de Levi Quiz! Test je kennis:`
    }
  };

  const quizUrls: Record<Language, string> = {
    fi: "https://www.leville.net/tietovisa",
    en: "https://www.leville.net/en/quiz",
    sv: "https://www.leville.net/sv/quiz",
    de: "https://www.leville.net/de/quiz",
    es: "https://www.leville.net/es/quiz",
    fr: "https://www.leville.net/fr/quiz",
    nl: "https://www.leville.net/nl/quiz"
  };

  const leviLinks: Record<Language, string> = {
    fi: "/levi",
    en: "/en/levi",
    sv: "/sv/levi",
    de: "/de/levi",
    es: "/es/levi",
    fr: "/fr/levi",
    nl: "/nl/levi"
  };

  const c = content[lang];
  const shareUrl = quizUrls[lang];

  const handleShareFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(c.shareText)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(c.shareText + " " + shareUrl);
      toast({
        title: c.linkCopied,
        description: c.shareWith,
      });
    } catch (err) {
      toast({
        title: c.error,
        description: c.couldNotCopy,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-card border-border/30 overflow-hidden">
        <CardContent className="p-6 sm:p-8 md:p-12 text-center">
          {/* Trophy icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Trophy className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </motion.div>

          {/* Result title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            {result.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8"
          >
            {result.message}
          </motion.p>

          {/* Score display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-baseline gap-2 p-4 sm:p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">{score}</span>
              <span className="text-xl sm:text-2xl text-muted-foreground">/ {totalQuestions}</span>
            </div>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              ({percentage}% {c.correct})
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-2 sm:gap-3 justify-center"
          >
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Button onClick={onRestart} variant="default" size="lg" className="text-sm sm:text-base">
                <RotateCcw className="w-4 h-4 mr-2" />
                {c.playAgain}
              </Button>
              <Button onClick={handleShareFacebook} variant="secondary" size="lg" className="bg-[#1877F2] hover:bg-[#1877F2]/90 text-white text-sm sm:text-base">
                <FacebookIcon className="w-4 h-4 mr-2" />
                {c.share}
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
              <Button onClick={handleCopyLink} variant="outline" size="lg" className="text-sm sm:text-base">
                <Copy className="w-4 h-4 mr-2" />
                {c.copyLink}
              </Button>
              <Button asChild variant="ghost" size="lg" className="text-sm sm:text-base">
                <Link to={leviLinks[lang]}>
                  <Home className="w-4 h-4 mr-2" />
                  {c.exploreLevi}
                </Link>
              </Button>
            </div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizResult;
