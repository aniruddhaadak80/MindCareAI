import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Shield, Users, Sparkles, Zap, Star, MessageSquare, Rocket, Trophy, Award, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import AssessmentForm from "@/components/AssessmentForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";

export interface AssessmentResult {
  overallScore: number;
  riskLevel: 'low' | 'moderate' | 'high';
  categories: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
  };
  recommendations: string[];
}

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'assessment' | 'results'>('landing');
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const handleStartAssessment = () => {
    setCurrentStep('assessment');
  };

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result);
    setCurrentStep('results');
  };

  const handleRestart = () => {
    setCurrentStep('landing');
    setAssessmentResult(null);
  };

  if (currentStep === 'assessment') {
    return <AssessmentForm onComplete={handleAssessmentComplete} />;
  }

  if (currentStep === 'results' && assessmentResult) {
    return <ResultsDisplay result={assessmentResult} onRestart={handleRestart} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ScrollingBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center max-w-7xl mx-auto">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
            <Crown className="h-10 w-10 text-yellow-400 animate-pulse" />
            <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-playfair">
              #1 AI Mental Health Platform
            </span>
            <Sparkles className="h-10 w-10 text-blue-400 animate-spin" />
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-gradient-to-r from-violet-600 via-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text mb-8 leading-none animate-fade-in font-playfair tracking-tight">
            Transform Your
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
              Mental Wellness
            </span>
            <span className="block text-5xl md:text-7xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent">
              with AI Power
            </span>
          </h1>
          
          <p className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 mb-12 leading-relaxed max-w-5xl mx-auto animate-fade-in font-light">
            Experience the future of mental health with our revolutionary AI-powered platform. 
            <span className="block mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Personalized • Intelligent • Compassionate
            </span>
          </p>
          
          {/* Enhanced Privacy Badge */}
          <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-900/20 dark:via-teal-900/20 dark:to-cyan-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-3xl p-8 mb-16 max-w-4xl mx-auto shadow-2xl animate-scale-in backdrop-blur-sm">
            <div className="flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-emerald-600 mr-3 animate-pulse" />
              <strong className="text-2xl text-emerald-800 dark:text-emerald-200 font-playfair">Your Privacy is Sacred</strong>
              <Award className="h-8 w-8 text-emerald-600 ml-3 animate-pulse" />
            </div>
            <p className="text-emerald-700 dark:text-emerald-300 text-lg leading-relaxed">
              Military-grade encryption • Zero data storage • HIPAA compliant • 100% anonymous
            </p>
          </div>

          {/* Enhanced Action Buttons - Main Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in">
            <Link to="/assessment" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-700 hover:via-purple-700 hover:to-indigo-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-violet-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <Zap className="h-8 w-8 animate-bounce group-hover:animate-spin" />
                  <span>Start Assessment</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/mood-tests" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-fuchsia-600 via-pink-600 to-rose-600 hover:from-fuchsia-700 hover:via-pink-700 hover:to-rose-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <Brain className="h-8 w-8 animate-pulse group-hover:animate-bounce" />
                  <span>AI Mood Tests</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/chat" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-emerald-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <MessageSquare className="h-8 w-8 animate-pulse group-hover:animate-bounce" />
                  <span>AI Chat Support</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/dream-analysis" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-indigo-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">🌙</span>
                  <span>Dream Analysis</span>
                </div>
              </Button>
            </Link>
          </div>

          {/* New AI Therapy Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 animate-fade-in">
            <Link to="/poetry-therapy" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-pink-600 via-rose-600 to-red-600 hover:from-pink-700 hover:via-rose-700 hover:to-red-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">✍️</span>
                  <span>Poetry Therapy</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/meditation-guide" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-teal-600 via-cyan-600 to-blue-600 hover:from-teal-700 hover:via-cyan-700 hover:to-blue-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-teal-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-2xl">🧘</span>
                  <span>Meditation Guide</span>
                </div>
              </Button>
            </Link>
            
            <Link to="/resources" className="group">
              <Button 
                size="lg"
                className="w-full h-20 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white text-xl font-bold rounded-3xl shadow-2xl hover:shadow-orange-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 border-2 border-white/20"
              >
                <div className="flex flex-col items-center gap-2">
                  <Rocket className="h-8 w-8 animate-bounce group-hover:animate-spin" />
                  <span>Resources Hub</span>
                </div>
              </Button>
            </Link>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { number: "50K+", label: "AI Assessments Completed", icon: Brain, gradient: "from-blue-500 to-purple-500" },
              { number: "99.9%", label: "User Satisfaction Rate", icon: Heart, gradient: "from-pink-500 to-rose-500" },
              { number: "24/7", label: "AI Support Available", icon: Shield, gradient: "from-emerald-500 to-teal-500" },
              { number: "100%", label: "Privacy Protected", icon: Trophy, gradient: "from-amber-500 to-orange-500" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className={`text-center p-8 bg-gradient-to-br ${stat.gradient} rounded-3xl shadow-2xl hover:shadow-xl transition-all duration-500 transform hover:scale-110 animate-scale-in text-white backdrop-blur-sm border border-white/20`}>
                  <IconComponent className="h-12 w-12 mx-auto mb-4 animate-bounce" />
                  <div className="text-4xl font-black mb-2 font-playfair">{stat.number}</div>
                  <div className="text-sm font-semibold opacity-90">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="container mx-auto px-4 py-24 relative z-10">
        <div className="text-center mb-20 animate-fade-in">
          <h2 className="text-6xl md:text-8xl font-black text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text mb-8 font-playfair">
            Revolutionary Features
          </h2>
          <p className="text-2xl md:text-3xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Experience mental wellness like never before with our cutting-edge AI technology
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {[
            {
              icon: Brain,
              title: "AI Mood Analysis",
              description: "Revolutionary AI technology that creates personalized mental health quizzes based on your unique emotional patterns and provides real-time insights with precision accuracy.",
              gradient: "from-violet-600 via-purple-600 to-indigo-600",
              bgGradient: "from-violet-50 via-purple-50 to-indigo-50"
            },
            {
              icon: Heart,
              title: "Compassionate Care",
              description: "Every interaction is designed with empathy and understanding, providing a safe space for your mental wellness journey with the warmth of human compassion.",
              gradient: "from-pink-600 via-rose-600 to-red-600",
              bgGradient: "from-pink-50 via-rose-50 to-red-50"
            },
            {
              icon: Shield,
              title: "Ultimate Privacy",
              description: "Your mental health data is protected with military-grade encryption. We never store personal information, ensuring complete anonymity and peace of mind.",
              gradient: "from-emerald-600 via-teal-600 to-cyan-600",
              bgGradient: "from-emerald-50 via-teal-50 to-cyan-50"
            },
            {
              icon: Users,
              title: "Expert Network",
              description: "Connect with certified mental health professionals and access a curated library of resources for comprehensive support and professional guidance.",
              gradient: "from-amber-600 via-orange-600 to-red-600",
              bgGradient: "from-amber-50 via-orange-50 to-red-50"
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`border-0 hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm group animate-scale-in overflow-hidden relative`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                <CardHeader className="text-center pb-6 relative z-10">
                  <div className={`mx-auto p-6 bg-gradient-to-br ${feature.gradient} rounded-3xl w-fit mb-6 shadow-2xl group-hover:animate-bounce`}>
                    <IconComponent className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-3xl font-black font-playfair bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <CardDescription className="text-center text-gray-700 leading-relaxed text-lg">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="relative py-32 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 via-fuchsia-900 to-pink-900"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-64 h-64 bg-violet-500/20 rounded-full blur-3xl animate-ping"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-fuchsia-500/20 rounded-full blur-3xl animate-ping delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-10 right-10 w-32 h-32 bg-pink-500/30 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-10 left-10 w-40 h-40 bg-cyan-500/30 rounded-full blur-2xl animate-bounce delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-5xl md:text-8xl font-black text-white mb-8 animate-fade-in font-playfair">
            Begin Your Transformation
          </h3>
          <p className="text-xl md:text-3xl text-purple-100 mb-16 max-w-4xl mx-auto leading-relaxed animate-fade-in">
            Join thousands who have transformed their mental wellness with our revolutionary AI platform. 
            Your journey to better mental health starts now.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link to="/assessment">
              <Button 
                size="lg"
                className="bg-white text-purple-900 hover:bg-purple-50 px-16 py-6 text-2xl font-black rounded-3xl shadow-2xl hover:shadow-white/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-3 animate-scale-in border-2 border-purple-200"
              >
                <MessageSquare className="h-8 w-8 mr-4 animate-bounce" />
                Start Your Journey
              </Button>
            </Link>
            <Link to="/mood-tests">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white hover:from-fuchsia-700 hover:to-pink-700 px-16 py-6 text-2xl font-black rounded-3xl shadow-2xl hover:shadow-pink-500/50 transition-all duration-500 transform hover:scale-110 hover:-translate-y-3 animate-scale-in border-2 border-white/20"
              >
                <Brain className="h-8 w-8 mr-4 animate-bounce" />
                Try AI Tests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
