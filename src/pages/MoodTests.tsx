import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, Sparkles, RefreshCw, ArrowLeft, Heart, Zap, Cloud, Sun, Moon, Star, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import MentalHealthReport from "@/components/MentalHealthReport";
import { supabase } from "@/integrations/supabase/client";

interface MoodOption {
  value: string;
  label: string;
  icon: any;
  description: string;
  color: string;
}

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

  const moodOptions: MoodOption[] = [
    {
      value: 'anxious',
      label: 'Anxious',
      icon: Cloud,
      description: 'Feeling worried, nervous, or uneasy',
      color: 'from-gray-500 to-blue-500'
    },
    {
      value: 'depressed',
      label: 'Down/Sad',
      icon: Moon,
      description: 'Feeling low, hopeless, or unmotivated',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      value: 'stressed',
      label: 'Stressed',
      icon: Zap,
      description: 'Feeling overwhelmed or under pressure',
      color: 'from-red-500 to-orange-500'
    },
    {
      value: 'tired',
      label: 'Exhausted',
      icon: Moon,
      description: 'Feeling drained, fatigued, or burnt out',
      color: 'from-purple-500 to-gray-500'
    },
    {
      value: 'confused',
      label: 'Confused',
      icon: Brain,
      description: 'Feeling unclear or having trouble deciding',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      value: 'positive',
      label: 'Good/Positive',
      icon: Sun,
      description: 'Want to maintain or improve current wellbeing',
      color: 'from-yellow-400 to-orange-400'
    }
  ];

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

  const getScoreColor = (score: number, isPositive: boolean = false) => {
    if (isPositive) {
      if (score >= 70) return 'text-green-600';
      if (score >= 40) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (score <= 30) return 'text-green-600';
      if (score <= 60) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getProgressColor = (score: number, isPositive: boolean = false) => {
    if (isPositive) {
      if (score >= 70) return 'bg-green-500';
      if (score >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      if (score <= 30) return 'bg-green-500';
      if (score <= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  if (isGenerating) {
    return (
      <div className="min-h-screen relative">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
              <CardContent className="p-12">
                <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-6"></div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">AI is Working...</h3>
                <p className="text-gray-600">
                  {currentStep === 'quiz' 
                    ? `Creating a personalized quiz for your ${selectedMood} mood...`
                    : 'Analyzing your responses and generating detailed insights...'
                  }
                </p>
              </CardContent>
            </Card>
          </div>
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

            {/* Scores Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.entries(quizResult.scores).map(([category, score]) => {
                const isPositive = category === 'wellbeing' || category === 'energy' || category === 'focus';
                return (
                  <Card key={category} className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-800 capitalize">{category}</h3>
                        <span className={`text-2xl font-bold ${getScoreColor(score, isPositive)}`}>
                          {score}%
                        </span>
                      </div>
                      <Progress 
                        value={score} 
                        className="h-3"
                      />
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Insights */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                  <Brain className="h-6 w-6 text-purple-600" />
                  AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed text-lg">{quizResult.insights}</p>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                  <Heart className="h-6 w-6 text-red-500" />
                  Personalized Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quizResult.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="text-center space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={generateReport}
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Generate Full Report
                </Button>
                
                <Button 
                  onClick={resetQuiz}
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Take Another Test
                </Button>
                
                <Link to="/chat">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
                  >
                    <Sparkles className="h-5 w-5 mr-2" />
                    Chat with AI Support
                  </Button>
                </Link>
              </div>
              
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

  if (currentStep === 'quiz') {
    const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
    const currentQ = quizQuestions[currentQuestion];
    const currentAnswer = answers[currentQ?.id];

    return (
      <div className="min-h-screen relative">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">AI Mood Assessment</h2>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                  {selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1)} Mode
                </Badge>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            <Card className="bg-white/90 backdrop-blur-sm shadow-2xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">{currentQ?.question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={currentAnswer || ''}
                  onValueChange={(value) => handleAnswerChange(currentQ.id, value)}
                >
                  {currentQ?.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="flex-1 cursor-pointer text-gray-700">
                        {option}
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
                    disabled={!currentAnswer}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    {currentQuestion === quizQuestions.length - 1 ? (
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
              </CardContent>
            </Card>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodOptions.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <Card 
                  key={mood.value}
                  className="cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/90 backdrop-blur-sm group"
                  onClick={() => handleMoodSelection(mood.value)}
                >
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-4 bg-gradient-to-r ${mood.color} rounded-2xl w-fit mb-4 shadow-lg group-hover:animate-pulse`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{mood.label}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed mb-4">
                      {mood.description}
                    </CardDescription>
                    <Button 
                      className={`w-full bg-gradient-to-r ${mood.color} hover:opacity-90 transition-all duration-300`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoodSelection(mood.value);
                      }}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Start AI Assessment
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

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
