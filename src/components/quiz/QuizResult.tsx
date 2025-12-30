import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, RotateCcw, Share2, Home } from "lucide-react";
import { motion } from "framer-motion";
import { getResultMessage } from "@/data/quizQuestions";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
  lang?: "fi" | "en";
}

const QuizResult = ({ score, totalQuestions, onRestart, lang = "fi" }: QuizResultProps) => {
  const isEnglish = lang === "en";
  const result = getResultMessage(score, totalQuestions, lang);
  const percentage = Math.round((score / totalQuestions) * 100);
  const { toast } = useToast();

  const handleShare = async () => {
    const shareText = isEnglish
      ? `I scored ${score}/${totalQuestions} (${percentage}%) on the Levi Quiz! Test your knowledge: `
      : `Sain ${score}/${totalQuestions} (${percentage}%) Levi-tietovisassa! Testaa oma tietämyksesi: `;

    const shareUrl = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: isEnglish ? "Levi Quiz" : "Levi-tietovisa",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(shareText + shareUrl);
      toast({
        title: isEnglish ? "Link copied!" : "Linkki kopioitu!",
        description: isEnglish
          ? "Share it with your friends"
          : "Jaa se ystävillesi",
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
        <CardContent className="p-8 md:p-12 text-center">
          {/* Trophy icon with animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Trophy className="w-12 h-12 text-primary" />
          </motion.div>

          {/* Result title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-2"
          >
            {result.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg text-muted-foreground mb-8"
          >
            {result.message}
          </motion.p>

          {/* Score display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="mb-8"
          >
            <div className="inline-flex items-baseline gap-2 p-6 rounded-2xl bg-primary/10 border border-primary/20">
              <span className="text-5xl md:text-6xl font-bold text-primary">{score}</span>
              <span className="text-2xl text-muted-foreground">/ {totalQuestions}</span>
            </div>
            <p className="mt-2 text-muted-foreground">
              ({percentage}% {isEnglish ? "correct" : "oikein"})
            </p>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button onClick={onRestart} variant="default" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              {isEnglish ? "Play Again" : "Pelaa uudelleen"}
            </Button>
            <Button onClick={handleShare} variant="secondary" size="lg">
              <Share2 className="w-4 h-4 mr-2" />
              {isEnglish ? "Share Result" : "Jaa tulos"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={isEnglish ? "/en/levi" : "/levi"}>
                <Home className="w-4 h-4 mr-2" />
                {isEnglish ? "Explore Levi" : "Tutustu Leviin"}
              </Link>
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizResult;
