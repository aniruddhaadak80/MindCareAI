
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  currentAnswer: string;
  onBack: () => void;
  onNext: () => void;
}

const QuizNavigation = ({ 
  currentQuestion, 
  totalQuestions, 
  currentAnswer, 
  onBack, 
  onNext 
}: QuizNavigationProps) => {
  const isLastQuestion = currentQuestion === totalQuestions - 1;
  const canGoBack = currentQuestion > 0;

  return (
    <div className="flex justify-between pt-6">
      <Button
        variant="outline"
        onClick={onBack}
        disabled={!canGoBack}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <Button
        onClick={onNext}
        disabled={!currentAnswer}
        className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {isLastQuestion ? (
          <>
            <Sparkles className="h-4 w-4" />
            Get Results
          </>
        ) : (
          <>
            Next
            <ArrowLeft className="h-4 w-4 rotate-180" />
          </>
        )}
      </Button>
    </div>
  );
};

export default QuizNavigation;
