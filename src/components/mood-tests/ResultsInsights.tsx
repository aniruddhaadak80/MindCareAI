
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface ResultsInsightsProps {
  insights: string;
}

const ResultsInsights = ({ insights }: ResultsInsightsProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
          <Brain className="h-6 w-6 text-purple-600" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed text-lg">{insights}</p>
      </CardContent>
    </Card>
  );
};

export default ResultsInsights;
