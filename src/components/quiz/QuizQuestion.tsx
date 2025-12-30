import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { QuizQuestion as QuizQuestionType } from "@/data/quizQuestions";
import { cn } from "@/lib/utils";

interface QuizQuestionProps {
  question: QuizQuestionType;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (isCorrect: boolean) => void;
  lang?: "fi" | "en";
}

const QuizQuestion = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  lang = "fi",
}: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const isEnglish = lang === "en";
  const questionText = isEnglish ? question.questionEn : question.question;
  const options = isEnglish ? question.optionsEn : question.options;
  const category = isEnglish ? question.categoryEn : question.category;

  const handleSelectAnswer = (index: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(index);
    setHasAnswered(true);

    // Parent handles the 1.5s delay + advancing to next question
    onAnswer(index === question.correctAnswer);
  };

  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-card border-border/30 overflow-hidden">
        <CardContent className="p-6 md:p-8">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                {isEnglish ? "Question" : "Kysymys"} {currentIndex + 1}/{totalQuestions}
              </span>
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Question */}
          <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-6">
            {questionText}
          </h2>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correctAnswer;
              const showResult = hasAnswered;

              return (
                <motion.button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  disabled={hasAnswered}
                  whileHover={!hasAnswered ? { scale: 1.02 } : {}}
                  whileTap={!hasAnswered ? { scale: 0.98 } : {}}
                  className={cn(
                    "w-full p-4 text-left rounded-lg border transition-all duration-200",
                    "flex items-center gap-3",
                    !hasAnswered && "hover:border-primary/50 hover:bg-primary/5 cursor-pointer",
                    !hasAnswered && "border-border/50 bg-background/50",
                    showResult && isCorrect && "border-green-500 bg-green-500/10",
                    showResult && isSelected && !isCorrect && "border-red-500 bg-red-500/10",
                    showResult && !isSelected && !isCorrect && "opacity-50"
                  )}
                >
                  <span
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0",
                      !hasAnswered && "bg-muted text-muted-foreground",
                      showResult && isCorrect && "bg-green-500 text-white",
                      showResult && isSelected && !isCorrect && "bg-red-500 text-white"
                    )}
                  >
                    {showResult && isCorrect ? (
                      <Check className="w-4 h-4" />
                    ) : showResult && isSelected && !isCorrect ? (
                      <X className="w-4 h-4" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </span>
                  <span className="text-foreground">{option}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Result message */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={cn(
                  "p-4 rounded-lg mb-6 text-center",
                  selectedAnswer === question.correctAnswer
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                )}
              >
                {selectedAnswer === question.correctAnswer
                  ? isEnglish
                    ? "Correct! 🎉"
                    : "Oikein! 🎉"
                  : isEnglish
                  ? "Wrong answer"
                  : "Väärä vastaus"}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Auto-advancing indicator */}
          {hasAnswered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground text-sm"
            >
              {isEnglish ? "Moving to next question..." : "Siirrytään seuraavaan..."}
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizQuestion;
