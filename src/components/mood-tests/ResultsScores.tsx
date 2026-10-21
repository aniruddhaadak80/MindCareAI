
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { QuizScores } from "@/lib/moodResults";

interface ResultsScoresProps {
  /** The scores of the result. May be missing while the result is loading. */
  result?: { scores?: Partial<QuizScores> | null } | null;
}

const ResultsScores = ({ result }: ResultsScoresProps) => {
  const scores = result?.scores;

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

  if (!scores || !Object.keys(scores).length) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl mb-8">
        <CardContent className="p-6">
          <p className="text-gray-500 leading-relaxed text-lg italic">
            No scores are available yet. Please complete the assessment again to
            receive a personalised analysis.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {Object.entries(scores).map(([category, score]) => {
        const isPositive = category === 'wellbeing' || category === 'energy' || category === 'focus';
        const value = typeof score === 'number' && Number.isFinite(score) ? score : 0;
        return (
          <Card key={category} className="bg-white/90 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-800 capitalize">{category}</h3>
                <span className={`text-2xl font-bold ${getScoreColor(value, isPositive)}`}>
                  {value}%
                </span>
              </div>
              <Progress 
                value={value} 
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
