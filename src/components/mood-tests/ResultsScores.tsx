
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface QuizResult {
  scores: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
    energy: number;
    focus: number;
  };
}

interface ResultsScoresProps {
  result: QuizResult;
}

const ResultsScores = ({ result }: ResultsScoresProps) => {
  const getScoreColor = (score: number, isPositive: boolean = false) => {
    if (isPositive) {
      if (score >= 70) return 'text-green-600';
      if (score >= 40) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (score <= 30) return 'text-green-600';
      if (score <= 60) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {Object.entries(result.scores).map(([category, score]) => {
        const isPositive = category === 'wellbeing' || category === 'energy' || category === 'focus';
        return (
          <Card key={category} className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 capitalize">{category}</h3>
                <span className={`text-2xl font-bold ${getScoreColor(score, isPositive)}`}>
                  {score}%
                </span>
              </div>
              <Progress 
                value={score} 
                className="h-3"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ResultsScores;
