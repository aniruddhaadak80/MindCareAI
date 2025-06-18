
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  selectedMood: string;
}

const QuizProgress = ({ currentQuestion, totalQuestions, selectedMood }: QuizProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">AI Mood Assessment</h2>
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
          {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mode
        </Badge>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
};

export default QuizProgress;
