import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface QuizStartProps {
  onStart: () => void;
  lang?: "fi" | "en";
}

const QuizStart = ({ onStart, lang = "fi" }: QuizStartProps) => {
  const isEnglish = lang === "en";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="glass-card border-border/30 overflow-hidden">
        <CardContent className="p-8 md:p-12 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
          >
            <Brain className="w-10 h-10 text-primary" />
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {isEnglish ? "Levi Quiz" : "Levi-tietovisa"}
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            {isEnglish
              ? "Test your knowledge about Levi! Answer 10 questions and see how well you know Finland's most popular ski resort."
              : "Testaa Levi-tietämyksesi! Vastaa 10 kysymykseen ja katso kuinka hyvin tunnet Suomen suosituimman hiihtokeskuksen."}
          </p>

          <div className="flex items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>{isEnglish ? "10 questions" : "10 kysymystä"}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span>{isEnglish ? "Multiple choice" : "Monivalinta"}</span>
          </div>

          <Button
            onClick={onStart}
            size="lg"
            className="px-8 py-6 text-lg font-semibold"
          >
            {isEnglish ? "Start Quiz" : "Aloita visa"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QuizStart;
