
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AssessmentResult } from "@/pages/Index";

interface Question {
  id: string;
  text: string;
  category: 'anxiety' | 'depression' | 'stress' | 'wellbeing';
}

const questions: Question[] = [
  { id: '1', text: 'How often have you felt nervous, anxious, or on edge?', category: 'anxiety' },
  { id: '2', text: 'How often have you not been able to stop or control worrying?', category: 'anxiety' },
  { id: '3', text: 'How often have you had trouble relaxing?', category: 'anxiety' },
  { id: '4', text: 'How often have you felt down, depressed, or hopeless?', category: 'depression' },
  { id: '5', text: 'How often have you had little interest or pleasure in doing things?', category: 'depression' },
  { id: '6', text: 'How often have you felt bad about yourself or that you are a failure?', category: 'depression' },
  { id: '7', text: 'How often have you felt overwhelmed by daily responsibilities?', category: 'stress' },
  { id: '8', text: 'How often have you had difficulty concentrating on tasks?', category: 'stress' },
  { id: '9', text: 'How often have you felt irritable or easily annoyed?', category: 'stress' },
  { id: '10', text: 'How satisfied are you with your current life situation?', category: 'wellbeing' },
  { id: '11', text: 'How often do you feel grateful for things in your life?', category: 'wellbeing' },
  { id: '12', text: 'How connected do you feel to friends and family?', category: 'wellbeing' },
];

const responseOptions = [
  { value: '0', label: 'Not at all', score: 0 },
  { value: '1', label: 'Several days', score: 1 },
  { value: '2', label: 'More than half the days', score: 2 },
  { value: '3', label: 'Nearly every day', score: 3 },
];

const wellbeingOptions = [
  { value: '3', label: 'Very satisfied/Often', score: 3 },
  { value: '2', label: 'Satisfied/Sometimes', score: 2 },
  { value: '1', label: 'Somewhat satisfied/Rarely', score: 1 },
  { value: '0', label: 'Not satisfied/Never', score: 0 },
];

interface AssessmentFormProps {
  onComplete: (result: AssessmentResult) => void;
}

const AssessmentForm = ({ onComplete }: AssessmentFormProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleResponseChange = (questionId: string, value: string) => {
    const score = parseInt(value);
    setResponses(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      processResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const processResults = async () => {
    setIsProcessing(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Calculate scores by category
    const categoryScores = {
      anxiety: 0,
      depression: 0,
      stress: 0,
      wellbeing: 0,
    };

    const categoryCounts = {
      anxiety: 0,
      depression: 0,
      stress: 0,
      wellbeing: 0,
    };

    questions.forEach(question => {
      const response = responses[question.id] || 0;
      categoryScores[question.category] += response;
      categoryCounts[question.category]++;
    });

    // Normalize scores (0-100)
    const normalizedScores = {
      anxiety: Math.round((categoryScores.anxiety / (categoryCounts.anxiety * 3)) * 100),
      depression: Math.round((categoryScores.depression / (categoryCounts.depression * 3)) * 100),
      stress: Math.round((categoryScores.stress / (categoryCounts.stress * 3)) * 100),
      wellbeing: Math.round((categoryScores.wellbeing / (categoryCounts.wellbeing * 3)) * 100),
    };

    // Calculate overall score (wellbeing is inverted)
    const overallScore = Math.round(
      (normalizedScores.anxiety + normalizedScores.depression + normalizedScores.stress + (100 - normalizedScores.wellbeing)) / 4
    );

    // Determine risk level
    let riskLevel: 'low' | 'moderate' | 'high';
    if (overallScore < 30) riskLevel = 'low';
    else if (overallScore < 60) riskLevel = 'moderate';
    else riskLevel = 'high';

    // Generate recommendations
    const recommendations = generateRecommendations(normalizedScores, riskLevel);

    const result: AssessmentResult = {
      overallScore,
      riskLevel,
      categories: normalizedScores,
      recommendations,
    };

    onComplete(result);
  };

  const generateRecommendations = (scores: any, riskLevel: string): string[] => {
    const recommendations = [];

    if (riskLevel === 'high') {
      recommendations.push("Consider speaking with a mental health professional immediately");
      recommendations.push("Contact your healthcare provider or a crisis helpline if you're having thoughts of self-harm");
    }

    if (scores.anxiety > 60) {
      recommendations.push("Practice deep breathing exercises and mindfulness meditation");
      recommendations.push("Consider limiting caffeine intake and establishing a regular sleep schedule");
    }

    if (scores.depression > 60) {
      recommendations.push("Engage in regular physical activity, even light walking can help");
      recommendations.push("Try to maintain social connections and seek support from friends and family");
    }

    if (scores.stress > 60) {
      recommendations.push("Implement stress management techniques like progressive muscle relaxation");
      recommendations.push("Consider time management strategies and setting boundaries");
    }

    if (scores.wellbeing < 40) {
      recommendations.push("Focus on activities that bring you joy and a sense of accomplishment");
      recommendations.push("Practice gratitude by writing down three things you're thankful for each day");
    }

    // General recommendations
    recommendations.push("Maintain a healthy lifestyle with regular exercise, balanced nutrition, and adequate sleep");
    recommendations.push("Consider joining a support group or community activity");

    return recommendations;
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const currentResponse = responses[currentQ.id];
  const options = currentQ.category === 'wellbeing' ? wellbeingOptions : responseOptions;

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Processing Your Assessment</h3>
            <p className="text-gray-600">Our AI is analyzing your responses to provide personalized insights...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Mental Health Assessment</h2>
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">{currentQ.text}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup
              value={currentResponse?.toString() || ''}
              onValueChange={(value) => handleResponseChange(currentQ.id, value)}
            >
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={currentResponse === undefined}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssessmentForm;
