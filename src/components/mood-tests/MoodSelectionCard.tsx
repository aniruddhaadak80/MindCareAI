
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface MoodOption {
  value: string;
  label: string;
  icon: any;
  description: string;
  color: string;
}

interface MoodSelectionCardProps {
  mood: MoodOption;
  onSelect: (moodValue: string) => void;
}

const MoodSelectionCard = ({ mood, onSelect }: MoodSelectionCardProps) => {
  const IconComponent = mood.icon;

  return (
    <Card 
      className="cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 bg-white/90 backdrop-blur-sm group"
      onClick={() => onSelect(mood.value)}
    >
      <CardHeader className="text-center">
        <div className={`mx-auto p-4 bg-gradient-to-r ${mood.color} rounded-2xl w-fit mb-4 shadow-lg group-hover:animate-pulse`}>
          <IconComponent className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-800">{mood.label}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-gray-600 leading-relaxed mb-4">
          {mood.description}
        </CardDescription>
        <Button 
          className={`w-full bg-gradient-to-r ${mood.color} hover:opacity-90 transition-all duration-300`}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(mood.value);
          }}
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Start AI Assessment
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodSelectionCard;
