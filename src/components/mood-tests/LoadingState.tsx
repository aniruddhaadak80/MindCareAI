
import { Card, CardContent } from "@/components/ui/card";

interface LoadingStateProps {
  selectedMood: string;
  currentStep: 'quiz' | 'results';
}

const LoadingState = ({ selectedMood, currentStep }: LoadingStateProps) => {
  return (
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
  );
};

export default LoadingState;
