
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, ArrowLeft, CheckCircle, Sparkles, Star, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";

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
    if (total <= 8) return { 
      level: "Low Risk", 
      color: "emerald", 
      message: "Your responses suggest minimal mental health concerns. You're doing great!",
      gradient: "from-emerald-500 to-teal-500"
    };
    if (total <= 16) return { 
      level: "Moderate Risk", 
      color: "amber", 
      message: "You may benefit from speaking with a mental health professional for additional support.",
      gradient: "from-amber-500 to-orange-500"
    };
    return { 
      level: "High Risk", 
      color: "red", 
      message: "We strongly recommend seeking professional help immediately. You're not alone in this journey.",
      gradient: "from-red-500 to-pink-500"
    };
  };

  if (showResults) {
    const result = getResult();
    return (
      <div className="min-h-screen relative overflow-hidden">
        <ScrollingBackground />
        <Navbar />
        
        <main className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
                <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
                <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-playfair">
                  Assessment Complete
                </span>
                <Sparkles className="h-8 w-8 text-blue-400 animate-spin" />
              </div>
              
              <CheckCircle className={`h-20 w-20 mx-auto mb-6 text-${result.color}-600 animate-pulse`} />
              <h1 className="text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-200 mb-6 font-playfair">Assessment Complete</h1>
              <p className="text-2xl md:text-3xl text-gray-600 dark:text-gray-400">Your Mental Health Assessment Results</p>
            </div>

            <Card className={`bg-gradient-to-br ${result.gradient} text-white shadow-2xl mb-12 border-0 animate-scale-in`}>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl md:text-5xl font-black mb-4 font-playfair">
                  Risk Level: {result.level}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                <p className="text-xl md:text-2xl mb-8 leading-relaxed">{result.message}</p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link to="/chat">
                    <Button size="lg" className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Brain className="h-6 w-6 mr-3" />
                      Chat with AI Support
                    </Button>
                  </Link>
                  <Link to="/resources">
                    <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-800 px-8 py-4 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                      <Star className="h-6 w-6 mr-3" />
                      View Resources
                    </Button>
                  </Link>
                  <Button 
                    size="lg"
                    variant="ghost"
                    className="text-white hover:bg-white/20 px-8 py-4 text-xl font-bold rounded-2xl transition-all duration-300"
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

            <Link to="/" className="inline-flex items-center text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <ArrowLeft className="h-6 w-6 mr-3" />
              Back to Home
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ScrollingBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Brain className="h-10 w-10 text-blue-600 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-playfair">
                AI-Powered Assessment
              </span>
              <Sparkles className="h-10 w-10 text-purple-600 animate-spin" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-gray-800 dark:text-gray-200 mb-6 font-playfair">Mental Health Assessment</h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-8">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-8 shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 h-4 rounded-full transition-all duration-500 shadow-lg"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl animate-scale-in border-0 overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8">
              <CardTitle className="text-2xl md:text-3xl font-black text-center font-playfair">
                {questions[currentQuestion]}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                {options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="lg"
                    className="w-full p-6 text-left justify-start hover:shadow-xl transition-all duration-300 transform hover:scale-105 text-lg font-semibold border-2 hover:border-purple-300 dark:hover:border-purple-600"
                    onClick={() => handleAnswer(option.value)}
                  >
                    <div className="flex items-center w-full">
                      <span className="flex-1">{option.text}</span>
                      <Star className="h-5 w-5 text-gray-400" />
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <Link to="/" className="inline-flex items-center text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <ArrowLeft className="h-6 w-6 mr-3" />
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
