
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AssessmentResult } from "@/pages/Index";
import { AlertTriangle, CheckCircle, Phone, ExternalLink, RefreshCw } from "lucide-react";

interface ResultsDisplayProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const ResultsDisplay = ({ result, onRestart }: ResultsDisplayProps) => {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'moderate': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <AlertTriangle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'anxiety': return 'Anxiety Level';
      case 'depression': return 'Depression Indicators';
      case 'stress': return 'Stress Level';
      case 'wellbeing': return 'Wellbeing Score';
      default: return category;
    }
  };

  const getCategoryColor = (category: string, score: number) => {
    if (category === 'wellbeing') {
      // Higher wellbeing is better
      if (score >= 70) return 'bg-green-500';
      if (score >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      // Lower scores are better for anxiety, depression, stress
      if (score <= 30) return 'bg-green-500';
      if (score <= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Mental Health Assessment Results</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Based on your responses, here's a personalized analysis of your mental wellness. 
            Remember, this is a screening tool and not a medical diagnosis.
          </p>
        </div>

        {/* Risk Level Alert */}
        {result.riskLevel === 'high' && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">Important Notice</h3>
                  <p className="text-red-700 mb-3">
                    Your responses indicate you may be experiencing significant mental health challenges. 
                    Please consider reaching out to a mental health professional.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      <Phone className="h-4 w-4 mr-2" />
                      Crisis Helpline: 988
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Find a Therapist
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Overall Score */}
        <Card className="mb-6 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-800">Overall Assessment Score</CardTitle>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="text-4xl font-bold text-gray-800">{result.overallScore}</div>
              <Badge className={`${getRiskLevelColor(result.riskLevel)} flex items-center gap-1`}>
                {getRiskLevelIcon(result.riskLevel)}
                {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)} Risk
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Category Breakdown */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Detailed Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(result.categories).map(([category, score]) => (
              <div key={category}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">{getCategoryLabel(category)}</span>
                  <span className="text-sm text-gray-600">{score}/100</span>
                </div>
                <Progress 
                  value={score} 
                  className="h-3"
                  style={{
                    // @ts-ignore
                    '--progress-background': getCategoryColor(category, score)
                  }}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {result.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{recommendation}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card className="mb-6 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-gray-800">Additional Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <div className="font-semibold text-gray-800">National Suicide Prevention Lifeline</div>
                  <div className="text-sm text-gray-600">Call or text 988 - Available 24/7</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <div className="font-semibold text-gray-800">Crisis Text Line</div>
                  <div className="text-sm text-gray-600">Text HOME to 741741</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <div className="font-semibold text-gray-800">SAMHSA Helpline</div>
                  <div className="text-sm text-gray-600">1-800-662-4357</div>
                </div>
              </Button>
              
              <Button variant="outline" className="h-auto p-4 text-left">
                <div>
                  <div className="font-semibold text-gray-800">Psychology Today</div>
                  <div className="text-sm text-gray-600">Find local therapists</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="text-center space-y-4">
          <Button 
            onClick={onRestart}
            size="lg"
            variant="outline"
            className="mr-4"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Take Assessment Again
          </Button>
          
          <div className="text-sm text-gray-500 max-w-2xl mx-auto">
            <p>
              This assessment is for informational purposes only and should not replace professional medical advice. 
              If you're experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDisplay;
