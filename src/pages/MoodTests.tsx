
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import MentalHealthReport from "@/components/MentalHealthReport";
import { supabase } from "@/integrations/supabase/client";

// Import new components
import MoodSelectionGrid from "@/components/mood-tests/MoodSelectionGrid";
import LoadingState from "@/components/mood-tests/LoadingState";
import QuizProgress from "@/components/mood-tests/QuizProgress";
import QuizQuestionComponent from "@/components/mood-tests/QuizQuestion";
import QuizNavigation from "@/components/mood-tests/QuizNavigation";
import ResultsScores from "@/components/mood-tests/ResultsScores";
import ResultsInsights from "@/components/mood-tests/ResultsInsights";
import ResultsRecommendations from "@/components/mood-tests/ResultsRecommendations";
import ResultsActions from "@/components/mood-tests/ResultsActions";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
}

interface QuizResult {
  mood: string;
  scores: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
    energy: number;
    focus: number;
  };
  recommendations: string[];
  insights: string;
}

const MoodTests = () => {
  const [currentStep, setCurrentStep] = useState<'mood-selection' | 'quiz' | 'results' | 'report'>('mood-selection');
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const generateQuiz = async (mood: string) => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: `Generate a personalized mental health quiz for someone feeling ${mood}. Create exactly 8 questions that assess their current state and help provide accurate mental health insights. 

Return ONLY a JSON object in this exact format:
{
  "questions": [
    {
      "id": "1",
      "question": "Question text here",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"]
    }
  ]
}

Make the questions specific to ${mood} mood and focus on understanding their mental state, coping mechanisms, sleep patterns, social connections, and daily functioning. Each question should have 4 options ranging from positive to concerning responses.`
        }
      });

      if (error) throw error;

      const responseText = data.response;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const quizData = JSON.parse(jsonMatch[0]);
        setQuizQuestions(quizData.questions);
        setCurrentStep('quiz');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating quiz:', error);
      // Fallback questions
      const fallbackQuestions = [
        {
          id: "1",
          question: `How would you rate your current ${mood} feelings?`,
          options: ["Very mild", "Moderate", "Quite strong", "Very intense"]
        },
        {
          id: "2",
          question: "How long have you been feeling this way?",
          options: ["Just today", "A few days", "About a week", "More than a week"]
        },
        {
          id: "3",
          question: "How is this affecting your daily activities?",
          options: ["Not at all", "A little", "Quite a bit", "Severely"]
        }
      ];
      setQuizQuestions(fallbackQuestions);
      setCurrentStep('quiz');
    }
    setIsGenerating(false);
  };

  const generateResults = async () => {
    setIsGenerating(true);
    try {
      const answersText = Object.entries(answers)
        .map(([questionId, answer], index) => 
          `Q${parseInt(questionId)}: ${quizQuestions[index]?.question} - Answer: ${answer}`
        ).join('\n');

      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: `Analyze these mental health quiz responses for someone feeling ${selectedMood}:

${answersText}

Provide a comprehensive analysis with specific percentage scores and actionable recommendations. Return ONLY a JSON object in this exact format:

{
  "scores": {
    "anxiety": 45,
    "depression": 30,
    "stress": 60,
    "wellbeing": 40,
    "energy": 35,
    "focus": 50
  },
  "insights": "Detailed analysis of their current mental state and patterns",
  "recommendations": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3",
    "Specific actionable recommendation 4"
  ]
}

Base scores on their responses, with higher scores indicating more concern for anxiety/depression/stress, and higher scores indicating better wellbeing/energy/focus. Provide percentage values 0-100.`
        }
      });

      if (error) throw error;

      const responseText = data.response;
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        const resultData = JSON.parse(jsonMatch[0]);
        setQuizResult({
          mood: selectedMood,
          scores: resultData.scores,
          recommendations: resultData.recommendations,
          insights: resultData.insights
        });
        setCurrentStep('results');
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating results:', error);
      // Fallback result
      setQuizResult({
        mood: selectedMood,
        scores: {
          anxiety: 45,
          depression: 30,
          stress: 55,
          wellbeing: 60,
          energy: 40,
          focus: 50
        },
        recommendations: [
          "Consider practicing deep breathing exercises daily",
          "Try to maintain a regular sleep schedule",
          "Connect with supportive friends or family",
          "Consider speaking with a mental health professional"
        ],
        insights: "Based on your responses, you're experiencing some challenges but also showing resilience. Focus on self-care and don't hesitate to seek support when needed."
      });
      setCurrentStep('results');
    }
    setIsGenerating(false);
  };

  const generateReport = () => {
    setCurrentStep('report');
  };

  const handleMoodSelection = (mood: string) => {
    setSelectedMood(mood);
    generateQuiz(mood);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      generateResults();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentStep('mood-selection');
    setSelectedMood('');
    setQuizQuestions([]);
    setCurrentQuestion(0);
    setAnswers({});
    setQuizResult(null);
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen relative">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <LoadingState selectedMood={selectedMood} currentStep={currentStep === 'quiz' ? 'quiz' : 'results'} />
        </main>
      </div>
    );
  }

  if (currentStep === 'report' && quizResult) {
    const reportData = {
      ...quizResult,
      date: new Date().toLocaleDateString()
    };

    return (
      <div className="min-h-screen relative">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <Button
                onClick={() => setCurrentStep('results')}
                variant="outline"
                className="mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
              <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
                Your Mental Health Report
              </h1>
            </div>
            
            <MentalHealthReport reportData={reportData} />
            
            <div className="text-center mt-8">
              <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (currentStep === 'results' && quizResult) {
    return (
      <div className="min-h-screen relative">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <Star className="h-16 w-16 mx-auto mb-4 text-yellow-500 animate-pulse" />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Your AI-Powered Assessment Results</h1>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg px-6 py-2">
                Mood: {quizResult.mood.charAt(0).toUpperCase() + quizResult.mood.slice(1)}
              </Badge>
            </div>

            <ResultsScores result={quizResult} />
            <ResultsInsights insights={quizResult.insights} />
            <ResultsRecommendations recommendations={quizResult.recommendations} />
            <ResultsActions onGenerateReport={generateReport} onResetQuiz={resetQuiz} />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  if (currentStep === 'quiz') {
    const currentQ = quizQuestions[currentQuestion];
    const currentAnswer = answers[currentQ?.id];

    return (
      <div className="min-h-screen relative">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl mx-auto">
            <QuizProgress 
              currentQuestion={currentQuestion}
              totalQuestions={quizQuestions.length}
              selectedMood={selectedMood}
            />

            <QuizQuestionComponent
              question={currentQ}
              currentAnswer={currentAnswer}
              onAnswerChange={handleAnswerChange}
            />

            <QuizNavigation
              currentQuestion={currentQuestion}
              totalQuestions={quizQuestions.length}
              currentAnswer={currentAnswer}
              onBack={handleBack}
              onNext={handleNext}
            />
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <ScrollingBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
              <Brain className="h-12 w-12 text-purple-600 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              AI-Powered Mood Tests
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Select how you're feeling right now, and our AI will generate a personalized assessment 
              to provide insights and recommendations tailored specifically to your current mental state.
            </p>
          </div>

          <MoodSelectionGrid onMoodSelect={handleMoodSelection} />

          <div className="text-center mt-12">
            <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-800 text-lg">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MoodTests;
