
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MicOff, Volume2, VolumeX, Bot, Sparkles } from "lucide-react";

interface AIAvatarProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  onToggleListening?: () => void;
  onToggleSpeaking?: () => void;
  mood?: string;
}

const AIAvatar = ({ 
  isListening = false, 
  isSpeaking = false, 
  onToggleListening, 
  onToggleSpeaking,
  mood = "calm"
}: AIAvatarProps) => {
  const [avatarState, setAvatarState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [eyeAnimation, setEyeAnimation] = useState(0);

  useEffect(() => {
    if (isSpeaking) setAvatarState('speaking');
    else if (isListening) setAvatarState('listening');
    else setAvatarState('idle');
  }, [isListening, isSpeaking]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEyeAnimation(prev => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const getAvatarColor = () => {
    switch (mood) {
      case 'anxious': return 'from-blue-400 to-indigo-600';
      case 'sad': return 'from-gray-400 to-blue-500';
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'stressed': return 'from-red-400 to-pink-500';
      case 'calm': return 'from-green-400 to-teal-500';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  const getAnimationClass = () => {
    switch (avatarState) {
      case 'listening': return 'animate-pulse scale-110';
      case 'speaking': return 'animate-bounce';
      default: return 'hover:scale-105';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Avatar */}
      <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${getAvatarColor()} shadow-2xl transition-all duration-300 ${getAnimationClass()}`}>
        {/* Face */}
        <div className="absolute inset-4 bg-white/20 rounded-full backdrop-blur-sm">
          {/* Eyes */}
          <div className="absolute top-6 left-6 w-3 h-3 bg-white rounded-full animate-pulse" 
               style={{ animationDelay: `${eyeAnimation * 0.1}s` }} />
          <div className="absolute top-6 right-6 w-3 h-3 bg-white rounded-full animate-pulse"
               style={{ animationDelay: `${eyeAnimation * 0.1 + 0.1}s` }} />
          
          {/* Mouth */}
          <div className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 w-6 h-3 ${
            avatarState === 'speaking' ? 'bg-white rounded-full animate-pulse' : 
            avatarState === 'listening' ? 'bg-white/70 rounded-sm' : 'bg-white/50 rounded-full'
          }`} />
          
          {/* Speaking indicator */}
          {avatarState === 'speaking' && (
            <div className="absolute -top-2 -right-2">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-ping" />
              <Volume2 className="absolute top-0 left-0 w-4 h-4 text-white" />
            </div>
          )}
          
          {/* Listening indicator */}
          {avatarState === 'listening' && (
            <div className="absolute -top-2 -left-2">
              <div className="w-4 h-4 bg-blue-400 rounded-full animate-pulse" />
              <Mic className="absolute top-0 left-0 w-4 h-4 text-white" />
            </div>
          )}
        </div>
        
        {/* Aura effect */}
        <div className={`absolute -inset-2 rounded-full bg-gradient-to-br ${getAvatarColor()} opacity-30 blur-md ${
          avatarState !== 'idle' ? 'animate-pulse' : ''
        }`} />
      </div>

      {/* Status */}
      <Card className="bg-white/90 backdrop-blur-sm shadow-lg">
        <CardContent className="p-3 text-center">
          <p className="text-sm font-semibold text-gray-700 flex items-center gap-2 justify-center">
            <Bot className="w-4 h-4" />
            {avatarState === 'listening' ? 'Listening...' :
             avatarState === 'speaking' ? 'Speaking...' : 'Ready to help'}
          </p>
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex gap-3">
        <Button
          onClick={onToggleListening}
          variant={isListening ? "default" : "outline"}
          size="sm"
          className={`${isListening ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </Button>
        
        <Button
          onClick={onToggleSpeaking}
          variant={isSpeaking ? "default" : "outline"}
          size="sm"
          className={`${isSpeaking ? 'bg-green-500 hover:bg-green-600' : ''}`}
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
};

export default AIAvatar;
