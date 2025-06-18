
import { Cloud, Sun, Moon, Star, Brain, Zap, Heart } from "lucide-react";
import MoodSelectionCard from "./MoodSelectionCard";

interface MoodOption {
  value: string;
  label: string;
  icon: any;
  description: string;
  color: string;
}

interface MoodSelectionGridProps {
  onMoodSelect: (mood: string) => void;
}

const MoodSelectionGrid = ({ onMoodSelect }: MoodSelectionGridProps) => {
  const moodOptions: MoodOption[] = [
    {
      value: 'anxious',
      label: 'Anxious',
      icon: Cloud,
      description: 'Feeling worried, nervous, or uneasy',
      color: 'from-gray-500 to-blue-500'
    },
    {
      value: 'depressed',
      label: 'Down/Sad',
      icon: Moon,
      description: 'Feeling low, hopeless, or unmotivated',
      color: 'from-blue-600 to-indigo-600'
    },
    {
      value: 'stressed',
      label: 'Stressed',
      icon: Zap,
      description: 'Feeling overwhelmed or under pressure',
      color: 'from-red-500 to-orange-500'
    },
    {
      value: 'tired',
      label: 'Exhausted',
      icon: Moon,
      description: 'Feeling drained, fatigued, or burnt out',
      color: 'from-purple-500 to-gray-500'
    },
    {
      value: 'confused',
      label: 'Confused',
      icon: Brain,
      description: 'Feeling unclear or having trouble deciding',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      value: 'positive',
      label: 'Good/Positive',
      icon: Sun,
      description: 'Want to maintain or improve current wellbeing',
      color: 'from-yellow-400 to-orange-400'
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {moodOptions.map((mood) => (
        <MoodSelectionCard
          key={mood.value}
          mood={mood}
          onSelect={onMoodSelect}
        />
      ))}
    </div>
  );
};

export default MoodSelectionGrid;
