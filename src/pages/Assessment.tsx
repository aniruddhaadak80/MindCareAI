
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const questions = [
    "Over the last 2 weeks, how often have you felt down, depressed, or hopeless?",
    "How often have you felt nervous, anxious, or on edge?",
    "How often have you had trouble falling or staying asleep?",
    "How often have you felt tired or had little energy?",
    "How often have you had trouble concentrating on things?",
    "How often have you felt good about yourself?",
    "How often have you been able to cope with stress?",
    "How often have you felt overwhelmed by your responsibilities?"
  ];

  const options = [
    { text: "Not at all", value: 0 },
    { text: "Several days", value: 1 },
    { text: "More than half the days", value: 2 },
    { text: "Nearly every day", value: 3 }
  ];

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const getResult = () => {
    const total = answers.reduce((sum, answer) => sum + answer, 0);
    if (total <= 8) return { level: "Low", color: "green", message: "Your responses suggest minimal mental health concerns." };
    if (total <= 16) return { level: "Moderate", color: "yellow", message: "You may benefit from speaking with a mental health professional." };
    return { level: "High", color: "red", message: "We strongly recommend seeking professional help." };
  };

  if (showResults) {
    const result = getResult();
    return (
      <div className="min-h-screen relative">
        <AnimatedBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <CheckCircle className={`h-16 w-16 mx-auto mb-4 text-${result.color}-600`} />
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Assessment Complete</h1>
              <p className="text-xl text-gray-600">Your Mental Health Assessment Results</p>
            </div>

            <Card className="bg-white/80 backdrop-blur-sm shadow-2xl mb-8">
              <CardHeader>
                <CardTitle className={`text-2xl text-${result.color}-800`}>
                  Risk Level: {result.level}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-6">{result.message}</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/chat">
                    <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Chat with AI Support
                    </Button>
                  </Link>
                  <Link to="/resources">
                    <Button variant="outline">
                      View Resources
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost"
                    onClick={() => {
                      setCurrentQuestion(0);
                      setAnswers([]);
                      setShowResults(false);
                    }}
                  >
                    Retake Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Brain className="h-12 w-12 mx-auto mb-4 text-blue-600 animate-pulse" />
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Mental Health Assessment</h1>
            <p className="text-lg text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl animate-fade-in">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                {questions[currentQuestion]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full p-4 text-left justify-start hover:bg-blue-50 transition-all duration-300 transform hover:scale-105"
                    onClick={() => handleAnswer(option.value)}
                  >
                    {option.text}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-8">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Assessment;
