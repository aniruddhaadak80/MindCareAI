
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface ResultsInsightsProps {
  /** The insights of the AI. May be missing while the result is loading. */
  insights?: string | null;
}

const ResultsInsights = ({ insights }: ResultsInsightsProps) => {
  const hasInsights = typeof insights === "string" && insights.trim().length > 0;

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
          <Brain className="h-6 w-6 text-purple-600" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasInsights ? (
          <p className="text-gray-700 leading-relaxed text-lg">{insights}</p>
        ) : (
          <p className="text-gray-500 leading-relaxed text-lg italic">
            No insights are available yet. Please complete the assessment again to
            receive a personalised analysis.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsInsights;
