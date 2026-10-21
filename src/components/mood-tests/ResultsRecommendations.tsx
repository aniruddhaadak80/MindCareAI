
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ResultsRecommendationsProps {
  /** The recommendations of the AI. May be missing while the result loads. */
  recommendations?: string[] | null;
}

const ResultsRecommendations = ({ recommendations }: ResultsRecommendationsProps) => {
  const items = Array.isArray(recommendations) ? recommendations : [];

  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
          <Heart className="h-6 w-6 text-red-500" />
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {items.length > 0 ? (
          <div className="space-y-4">
            {items.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <p className="text-gray-700 leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 leading-relaxed text-lg italic">
            No recommendations are available yet. Please complete the assessment
            again to receive personalised suggestions.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ResultsRecommendations;
