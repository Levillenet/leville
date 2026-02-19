import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Language } from "@/translations";

interface QuizStartProps {
  onStart: () => void;
  lang?: Language;
}

const QuizStart = ({ onStart, lang = "fi" }: QuizStartProps) => {
  // Multilingual content
  const content: Record<Language, {
    title: string;
    description: string;
    questions: string;
    multipleChoice: string;
    startButton: string;
  }> = {
    fi: {
      title: "Levi-tietovisa",
      description: "Testaa Levi-tietämyksesi! Vastaa 10 kysymykseen ja katso kuinka hyvin tunnet Suomen suosituimman hiihtokeskuksen.",
      questions: "10 kysymystä",
      multipleChoice: "Monivalinta",
      startButton: "Aloita visa"
    },
    en: {
      title: "Levi Quiz",
      description: "Test your knowledge about Levi! Answer 10 questions and see how well you know Finland's most popular ski resort.",
      questions: "10 questions",
      multipleChoice: "Multiple choice",
      startButton: "Start Quiz"
    },
    sv: {
      title: "Levi Quiz",
      description: "Testa dina kunskaper om Levi! Svara på 10 frågor och se hur väl du känner Finlands mest populära skidort.",
      questions: "10 frågor",
      multipleChoice: "Flerval",
      startButton: "Starta quiz"
    },
    de: {
      title: "Levi Quiz",
      description: "Teste dein Wissen über Levi! Beantworte 10 Fragen und sieh, wie gut du Finnlands beliebtestes Skigebiet kennst.",
      questions: "10 Fragen",
      multipleChoice: "Multiple Choice",
      startButton: "Quiz starten"
    },
    es: {
      title: "Quiz de Levi",
      description: "¡Pon a prueba tus conocimientos sobre Levi! Responde 10 preguntas y descubre cuánto sabes sobre la estación de esquí más popular de Finlandia.",
      questions: "10 preguntas",
      multipleChoice: "Opción múltiple",
      startButton: "Comenzar quiz"
    },
    fr: {
      title: "Quiz Levi",
      description: "Testez vos connaissances sur Levi ! Répondez à 10 questions et découvrez à quel point vous connaissez la station de ski la plus populaire de Finlande.",
      questions: "10 questions",
      multipleChoice: "Choix multiple",
      startButton: "Commencer le quiz"
    },
    nl: {
      title: "Levi Quiz",
      description: "Test uw kennis over Levi! Beantwoord 10 vragen en ontdek hoe goed u het populairste skigebied van Finland kent.",
      questions: "10 vragen",
      multipleChoice: "Meerkeuze",
      startButton: "Start quiz"
    }
  };

  const c = content[lang];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-card border-border/30 overflow-hidden">
        <CardContent className="p-6 sm:p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Brain className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
          </motion.div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            {c.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
            {c.description}
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 text-xs sm:text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              <span>{c.questions}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{c.multipleChoice}</span>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
          >
            {c.startButton}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizStart;
