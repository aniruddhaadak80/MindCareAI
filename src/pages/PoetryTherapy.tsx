
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Feather, Sparkles, ArrowLeft, Crown, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

const PoetryTherapy = () => {
  const [selectedEmotion, setSelectedEmotion] = useState("");
  const [poem, setPoem] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const emotions = [
    { name: "Anxious", color: "bg-yellow-500", emoji: "😰" },
    { name: "Sad", color: "bg-blue-500", emoji: "😢" },
    { name: "Angry", color: "bg-red-500", emoji: "😠" },
    { name: "Lonely", color: "bg-purple-500", emoji: "😔" },
    { name: "Hopeful", color: "bg-green-500", emoji: "🌟" },
    { name: "Grateful", color: "bg-pink-500", emoji: "🙏" },
    { name: "Overwhelmed", color: "bg-orange-500", emoji: "😵" },
    { name: "Peaceful", color: "bg-teal-500", emoji: "🕊️" }
  ];

  const generatePoem = async (emotion: string) => {
    setSelectedEmotion(emotion);
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: `Create a therapeutic poem for someone feeling ${emotion.toLowerCase()}. The poem should:
          
          1. Acknowledge and validate the emotion
          2. Provide comfort and understanding
          3. Offer hope and healing
          4. Be between 12-20 lines
          5. Use gentle, supportive language
          6. Include metaphors from nature when appropriate
          7. End with empowerment or peace
          
          Make it personal, therapeutic, and beautiful. This is for mental health healing.`
        }
      });

      if (error) throw error;
      setPoem(data.response);
    } catch (error) {
      console.error('Error generating poem:', error);
      setPoem(`Even in this moment of ${emotion.toLowerCase()},
You are stronger than you know.
Each breath you take is courage,
Each heartbeat is hope.
Tomorrow holds new possibilities,
And you hold the power to heal.`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ScrollingBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8 animate-fade-in">
            <Link to="/" className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 mr-3" />
              Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-red-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent font-playfair">
                AI Poetry Therapist
              </span>
              <Feather className="h-8 w-8 text-pink-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
              Poetry Therapy
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Transform your emotions into healing poetry. Let AI create personalized verses that speak to your soul.
            </p>
          </div>

          {/* Emotion Selection */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white">
              <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                <Heart className="h-8 w-8" />
                How Are You Feeling?
                <Sparkles className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {emotions.map((emotion) => (
                  <Button
                    key={emotion.name}
                    onClick={() => generatePoem(emotion.name)}
                    disabled={isGenerating}
                    variant="outline"
                    size="lg"
                    className="h-20 flex flex-col items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-pink-300 dark:hover:border-pink-600"
                  >
                    <span className="text-2xl">{emotion.emoji}</span>
                    <span className="font-semibold">{emotion.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isGenerating && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
              <CardContent className="p-12 text-center">
                <Feather className="h-16 w-16 mx-auto mb-6 text-pink-600 animate-bounce" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 font-playfair">
                  Crafting Your Healing Poem...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Creating personalized verses for your {selectedEmotion.toLowerCase()} feelings
                </p>
              </CardContent>
            </Card>
          )}

          {/* Generated Poem */}
          {poem && !isGenerating && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 text-white">
                <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                  <Star className="h-8 w-8" />
                  Your Healing Poem
                  <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                    {selectedEmotion}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-6">
                  <div className="text-center">
                    <Feather className="h-12 w-12 mx-auto mb-6 text-pink-600" />
                    <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed text-xl font-medium italic">
                      {poem}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      setPoem("");
                      setSelectedEmotion("");
                    }}
                    size="lg"
                    className="bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 hover:from-pink-700 hover:via-rose-700 hover:to-purple-700 text-white text-lg font-bold px-8 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Create Another Poem
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Therapeutic Note */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-pink-900/20 dark:via-rose-900/20 dark:to-red-900/20 border-2 border-pink-200 dark:border-pink-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <p className="text-pink-800 dark:text-pink-200 text-lg">
                <strong>Poetry as Healing:</strong> Poetry therapy has been used for centuries to process emotions, find meaning, and promote healing. These personalized poems are created to support your emotional journey.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PoetryTherapy;
