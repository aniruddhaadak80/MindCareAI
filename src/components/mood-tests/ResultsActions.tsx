
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileText, RefreshCw, Sparkles, ArrowLeft } from "lucide-react";

interface ResultsActionsProps {
  onGenerateReport: () => void;
  onResetQuiz: () => void;
}

const ResultsActions = ({ onGenerateReport, onResetQuiz }: ResultsActionsProps) => {
  return (
    <div className="text-center space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button 
          onClick={onGenerateReport}
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <FileText className="h-5 w-5 mr-2" />
          Generate Full Report
        </Button>
        
        <Button 
          onClick={onResetQuiz}
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
  );
};

export default ResultsActions;
