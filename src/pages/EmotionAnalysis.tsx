
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Camera, ArrowLeft, Heart, TrendingUp, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

const EmotionAnalysis = () => {
  const [input, setInput] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeEmotions = async () => {
    if (!input.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('emotion-analysis', {
        body: { text: input }
      });

      if (error) throw error;
      setAnalysis(data.analysis);
    } catch (error) {
      console.error('Error analyzing emotions:', error);
      setAnalysis('Unable to analyze emotions at this time. Please try again.');
    } finally {
      setIsAnalyzing(false);
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
            <Link to="/" className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-red-600 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 mr-3" />
              Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-red-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Brain className="h-8 w-8 text-purple-400 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-playfair">
                AI Emotion Expert
              </span>
              <Heart className="h-8 w-8 text-pink-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
              Emotion Analysis
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Understand your emotions deeply with AI-powered analysis and personalized insights.
            </p>
          </div>

          {/* Input Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
              <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                <Heart className="h-8 w-8" />
                Share Your Feelings
                <TrendingUp className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Describe how you're feeling or what's on your mind:
                  </label>
                  <Textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="I've been feeling anxious about work lately. I keep thinking about all the things that could go wrong with my presentation tomorrow..."
                    className="min-h-32 text-lg p-4 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={analyzeEmotions}
                    disabled={!input.trim() || isAnalyzing}
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xl font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="h-6 w-6 mr-3 animate-spin" />
                        Analyzing Emotions...
                      </>
                    ) : (
                      <>
                        <Heart className="h-6 w-6 mr-3" />
                        Analyze My Emotions
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600 text-white">
                <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                  <Lightbulb className="h-8 w-8" />
                  Your Emotional Analysis
                  <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                    AI Insights
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {analysis}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips Section */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-red-900/20 border-2 border-purple-200 dark:border-purple-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <p className="text-purple-800 dark:text-purple-200 text-lg">
                <strong>Emotional Awareness Tips:</strong> Regular emotional check-ins can improve self-awareness and mental health. Try to describe your feelings in detail and notice patterns over time.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default EmotionAnalysis;
