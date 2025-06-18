
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface ResultsRecommendationsProps {
  recommendations: string[];
}

const ResultsRecommendations = ({ recommendations }: ResultsRecommendationsProps) => {
  return (
    <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
      <CardHeader>
        <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
          <Heart className="h-6 w-6 text-red-500" />
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{recommendation}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsRecommendations;
