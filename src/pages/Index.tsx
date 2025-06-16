
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Shield, Users, Sparkles, Zap, Star, MessageSquare } from "lucide-react";
import AssessmentForm from "@/components/AssessmentForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

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
    <div className="min-h-screen relative">
      <AnimatedBackground />
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg animate-pulse">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MindCare AI
              </h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">Features</a>
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">About</a>
              <a href="#resources" className="text-gray-600 hover:text-blue-600 transition-colors duration-200 hover:underline">Resources</a>
              <Button 
                onClick={handleStartAssessment}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Start Assessment
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 relative">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-block p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 animate-bounce">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight">
            AI-Powered Mental Health
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent block animate-pulse">
              Assessment & Support
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
            Discover personalized insights into your mental wellness with our comprehensive AI-driven screening tool. 
            Take the first step towards better mental health with professional recommendations and continuous support.
          </p>
          
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6 mb-12 max-w-3xl mx-auto shadow-lg animate-pulse">
            <div className="flex items-center justify-center mb-3">
              <Shield className="h-6 w-6 text-amber-600 mr-2" />
              <strong className="text-amber-800">Privacy & Safety First</strong>
            </div>
            <p className="text-amber-700 text-sm leading-relaxed">
              This tool provides preliminary insights only and is not a substitute for professional medical advice. 
              Your data is processed securely and privately. Always consult qualified healthcare providers for diagnosis and treatment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              onClick={handleStartAssessment}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-4 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
            >
              <Zap className="h-6 w-6 mr-3 animate-pulse" />
              Start Your Journey
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-12 py-4 text-xl rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Star className="h-6 w-6 mr-3" />
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { number: "10K+", label: "Assessments Completed", icon: Brain },
              { number: "98%", label: "User Satisfaction", icon: Heart },
              { number: "24/7", label: "Support Available", icon: Shield },
              { number: "100%", label: "Privacy Protected", icon: Users }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center p-6 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <IconComponent className="h-8 w-8 text-blue-600 mx-auto mb-3 animate-pulse" />
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20 relative">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-800 mb-6">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MindCare AI?</span>
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge platform combines artificial intelligence with compassionate care to provide you with the most comprehensive mental health assessment experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Brain,
              title: "Advanced AI Analysis",
              description: "State-of-the-art machine learning algorithms analyze your responses to provide deeply personalized mental health insights and recommendations.",
              color: "blue",
              gradient: "from-blue-500 to-cyan-500"
            },
            {
              icon: Heart,
              title: "Compassionate Care",
              description: "Every aspect of our platform is designed with empathy and understanding to support your mental wellness journey with kindness.",
              color: "green",
              gradient: "from-green-500 to-emerald-500"
            },
            {
              icon: Shield,
              title: "Privacy First",
              description: "Your mental health data is sacred. We use advanced encryption and never store personal information, ensuring complete privacy and security.",
              color: "purple",
              gradient: "from-purple-500 to-indigo-500"
            },
            {
              icon: Users,
              title: "Professional Network",
              description: "Connect with certified mental health professionals and access curated resources for comprehensive support and guidance.",
              color: "orange",
              gradient: "from-orange-500 to-red-500"
            }
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`border-${feature.color}-100 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group`}>
                <CardHeader className="text-center pb-4">
                  <div className={`mx-auto p-4 bg-gradient-to-r ${feature.gradient} rounded-2xl w-fit mb-4 shadow-lg group-hover:animate-pulse`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className={`text-${feature.color}-800 text-xl font-bold`}>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-ping"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-ping delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
            Ready to Begin Your Wellness Journey?
          </h3>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
            Take our comprehensive assessment and receive personalized recommendations for your mental health. 
            Your journey to better wellness starts with a single click.
          </p>
          <Button 
            onClick={handleStartAssessment}
            size="lg"
            variant="secondary"
            className="bg-white text-purple-700 hover:bg-blue-50 px-12 py-4 text-xl rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2"
          >
            <MessageSquare className="h-6 w-6 mr-3 animate-bounce" />
            Start Your Assessment Now
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
