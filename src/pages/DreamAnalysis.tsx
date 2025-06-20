
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Moon, Brain, Sparkles, ArrowLeft, Crown, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

const DreamAnalysis = () => {
  const [dreamText, setDreamText] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeDream = async () => {
    if (!dreamText.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: `As a dream analyst and therapist, provide a comprehensive analysis of this dream: "${dreamText}". 
          
          Please structure your response with:
          1. **Symbolic Interpretation**: What the key elements might represent psychologically
          2. **Emotional Themes**: The underlying emotions and feelings
          3. **Psychological Insights**: What this might reveal about the dreamer's mental state
          4. **Therapeutic Reflections**: Questions for self-reflection
          5. **Positive Affirmations**: Encouraging insights about growth and healing
          
          Keep the tone supportive, insightful, and therapeutic.`
        }
      });

      if (error) throw error;
      setAnalysis(data.response);
    } catch (error) {
      console.error('Error analyzing dream:', error);
      setAnalysis("I'm sorry, I couldn't analyze your dream right now. Please try again later. Remember, dreams are deeply personal and their meanings can vary greatly from person to person.");
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
            <Link to="/" className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 mr-3" />
              Back to Home
            </Link>
          </div>

          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-playfair">
                AI Dream Interpreter
              </span>
              <Moon className="h-8 w-8 text-blue-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
              Dream Analysis
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Unlock the hidden meanings in your dreams with AI-powered psychological analysis and therapeutic insights.
            </p>
          </div>

          {/* Dream Input Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                <Moon className="h-8 w-8" />
                Tell Me Your Dream
                <Sparkles className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <Textarea
                placeholder="Describe your dream in as much detail as you can remember... The more details you provide, the more comprehensive the analysis will be."
                value={dreamText}
                onChange={(e) => setDreamText(e.target.value)}
                className="min-h-[200px] text-lg bg-white/70 dark:bg-gray-700/70 border-2 border-purple-200 dark:border-purple-600 rounded-xl focus:border-purple-400 dark:focus:border-purple-400 resize-none"
              />
              <Button 
                onClick={analyzeDream}
                disabled={!dreamText.trim() || isAnalyzing}
                size="lg"
                className="w-full mt-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-xl font-bold py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {isAnalyzing ? (
                  <>
                    <Brain className="h-6 w-6 mr-3 animate-spin" />
                    Analyzing Your Dream...
                  </>
                ) : (
                  <>
                    <Star className="h-6 w-6 mr-3" />
                    Analyze My Dream
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
                <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                  <Brain className="h-8 w-8" />
                  Your Dream Analysis
                  <Sparkles className="h-8 w-8" />
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

          {/* Privacy Notice */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <p className="text-blue-800 dark:text-blue-200 text-lg">
                <strong>Privacy Note:</strong> Your dreams are not stored or saved. This analysis is confidential and for personal reflection only.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DreamAnalysis;
