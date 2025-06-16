
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Heart, Shield, Users } from "lucide-react";
import AssessmentForm from "@/components/AssessmentForm";
import ResultsDisplay from "@/components/ResultsDisplay";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Brain className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">MindCare AI</h1>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            AI-Powered Mental Health
            <span className="text-blue-600"> Assessment</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get personalized insights into your mental wellness with our comprehensive AI-driven screening tool. 
            Take the first step towards better mental health.
          </p>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> This tool provides preliminary insights only and is not a substitute for professional medical advice. 
              Always consult qualified healthcare providers for diagnosis and treatment.
            </p>
          </div>

          <Button 
            onClick={handleStartAssessment}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            Start Assessment
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-100 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-3">
                <Brain className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-blue-800">AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Advanced algorithms analyze your responses to provide personalized mental health insights
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-green-100 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-green-100 rounded-full w-fit mb-3">
                <Heart className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle className="text-green-800">Compassionate Care</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Designed with empathy and understanding to support your mental wellness journey
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-purple-100 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-purple-100 rounded-full w-fit mb-3">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle className="text-purple-800">Privacy First</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Your responses are processed securely and privately, with no personal data stored
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-orange-100 hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="text-center">
              <div className="mx-auto p-3 bg-orange-100 rounded-full w-fit mb-3">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle className="text-orange-800">Professional Support</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center text-gray-600">
                Connect with mental health professionals and access curated resources for support
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold mb-4">Ready to Begin Your Wellness Journey?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Take our comprehensive assessment and receive personalized recommendations for your mental health
          </p>
          <Button 
            onClick={handleStartAssessment}
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg rounded-lg shadow-lg"
          >
            Start Your Assessment
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
