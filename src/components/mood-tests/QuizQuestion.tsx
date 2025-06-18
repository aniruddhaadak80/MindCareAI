
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

interface QuizQuestionProps {
  question: QuizQuestion;
  currentAnswer: string;
  onAnswerChange: (questionId: string, value: string) => void;
}

const QuizQuestionComponent = ({ question, currentAnswer, onAnswerChange }: QuizQuestionProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{question.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RadioGroup
          value={currentAnswer || ''}
          onValueChange={(value) => onAnswerChange(question.id, value)}
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option} className="flex-1 cursor-pointer text-gray-700">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
};

export default QuizQuestionComponent;
