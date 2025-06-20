
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Brain, Lightbulb, ArrowLeft, Target, TrendingUp, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

const CognitiveRestructuring = () => {
  const [thought, setThought] = useState("");
  const [situation, setSituation] = useState("");
  const [restructuring, setRestructuring] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const processThought = async () => {
    if (!thought.trim()) return;
    
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.functions.invoke('cognitive-restructuring', {
        body: { thought, situation }
      });

      if (error) throw error;
      setRestructuring(data.restructuring);
    } catch (error) {
      console.error('Error processing thought:', error);
      setRestructuring('Unable to process cognitive restructuring at this time. Please try again or consult with a mental health professional.');
    } finally {
      setIsProcessing(false);
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
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Brain className="h-8 w-8 text-blue-400 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-playfair">
                CBT Thought Restructuring
              </span>
              <Lightbulb className="h-8 w-8 text-purple-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
              Cognitive Restructuring
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Transform negative thought patterns with AI-powered cognitive behavioral techniques.
            </p>
          </div>

          {/* Input Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
              <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                <Target className="h-8 w-8" />
                Identify Your Thought
                <Zap className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    What negative thought are you experiencing?
                  </label>
                  <Textarea
                    value={thought}
                    onChange={(e) => setThought(e.target.value)}
                    placeholder="I'm going to fail at this presentation and everyone will think I'm incompetent..."
                    className="min-h-24 text-lg p-4 border-2 border-blue-200 dark:border-blue-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl"
                  />
                </div>
                
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    What situation triggered this thought? (Optional)
                  </label>
                  <Input
                    value={situation}
                    onChange={(e) => setSituation(e.target.value)}
                    placeholder="Work presentation tomorrow morning"
                    className="text-lg p-4 border-2 border-purple-200 dark:border-purple-700 focus:border-purple-500 dark:focus:border-purple-400 rounded-xl"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={processThought}
                    disabled={!thought.trim() || isProcessing}
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isProcessing ? (
                      <>
                        <Brain className="h-6 w-6 mr-3 animate-spin" />
                        Restructuring Thought...
                      </>
                    ) : (
                      <>
                        <Lightbulb className="h-6 w-6 mr-3" />
                        Restructure This Thought
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Restructuring Results */}
          {restructuring && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
                <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                  <TrendingUp className="h-8 w-8" />
                  Your Cognitive Restructuring
                  <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                    CBT Analysis
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {restructuring}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* CBT Tips */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <p className="text-blue-800 dark:text-blue-200 text-lg">
                <strong>CBT Tip:</strong> Challenge your thoughts by asking: "Is this thought helpful? Is it realistic? What would I tell a friend having this thought?" Practice makes progress.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CognitiveRestructuring;
