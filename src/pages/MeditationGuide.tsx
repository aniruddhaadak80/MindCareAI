
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Lotus, ArrowLeft, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

const MeditationGuide = () => {
  const [selectedType, setSelectedType] = useState("");
  const [meditationScript, setMeditationScript] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  const meditationTypes = [
    { name: "Anxiety Relief", duration: "10 min", color: "bg-blue-500", description: "Calm your anxious mind" },
    { name: "Sleep Meditation", duration: "15 min", color: "bg-purple-500", description: "Drift into peaceful sleep" },
    { name: "Stress Relief", duration: "12 min", color: "bg-green-500", description: "Release tension and stress" },
    { name: "Self-Compassion", duration: "8 min", color: "bg-pink-500", description: "Practice loving kindness" },
    { name: "Focus & Clarity", duration: "10 min", color: "bg-orange-500", description: "Enhance mental clarity" },
    { name: "Gratitude Practice", duration: "6 min", color: "bg-yellow-500", description: "Cultivate appreciation" }
  ];

  const generateMeditation = async (type: string) => {
    setSelectedType(type);
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: `Create a guided meditation script for ${type.toLowerCase()}. Structure it as follows:
          
          1. Start with a brief introduction and settling in (1-2 minutes)
          2. Breathing exercises (2-3 minutes)
          3. Main meditation practice specific to ${type.toLowerCase()} (5-8 minutes)
          4. Gentle return to awareness (1-2 minutes)
          5. Closing affirmations
          
          Format each section clearly with timestamps. Use calm, soothing language. Include specific instructions for breathing, body awareness, and visualization. Make it therapeutic and healing-focused.
          
          Also provide the script broken down into step-by-step instructions that can be followed sequentially.`
        }
      });

      if (error) throw error;
      
      const script = data.response;
      setMeditationScript(script);
      
      // Extract steps from the script (simple parsing)
      const stepMatches = script.split(/\d+\.|Step \d+|Phase \d+/).filter(step => step.trim().length > 20);
      setSteps(stepMatches.map(step => step.trim()));
      
    } catch (error) {
      console.error('Error generating meditation:', error);
      setMeditationScript(`Welcome to your ${type.toLowerCase()} meditation.
      
Find a comfortable position and close your eyes.
Take three deep breaths, allowing your body to relax with each exhale.
Focus on your breath as it flows naturally in and out.
Let go of any tension you're holding in your body.
Continue breathing mindfully for the next few minutes.
When you're ready, gently open your eyes and return to your day feeling refreshed.`);
      setSteps([
        "Find a comfortable position and close your eyes",
        "Take three deep breaths",
        "Focus on your natural breathing",
        "Release tension from your body",
        "Continue mindful breathing",
        "Gently return to awareness"
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  const startMeditation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
  };

  const pauseMeditation = () => {
    setIsPlaying(false);
  };

  const resetMeditation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsPlaying(false);
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
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent font-playfair">
                AI Meditation Master
              </span>
              <Lotus className="h-8 w-8 text-teal-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
              Meditation Guide
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience personalized guided meditations crafted by AI to heal your mind and nurture your spirit.
            </p>
          </div>

          {/* Meditation Type Selection */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 text-white">
              <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                <Lotus className="h-8 w-8" />
                Choose Your Meditation
                <Sparkles className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meditationTypes.map((type) => (
                  <Button
                    key={type.name}
                    onClick={() => generateMeditation(type.name)}
                    disabled={isGenerating}
                    variant="outline"
                    size="lg"
                    className="h-24 flex flex-col items-center justify-center gap-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 hover:border-teal-300 dark:hover:border-teal-600 p-4"
                  >
                    <div className={`w-4 h-4 rounded-full ${type.color} mb-1`}></div>
                    <span className="font-bold text-lg">{type.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{type.duration}</span>
                    <span className="text-xs text-center text-gray-500 dark:text-gray-500">{type.description}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isGenerating && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
              <CardContent className="p-12 text-center">
                <Lotus className="h-16 w-16 mx-auto mb-6 text-teal-600 animate-spin" />
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 font-playfair">
                  Creating Your Personalized Meditation...
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  Crafting a healing {selectedType.toLowerCase()} experience just for you
                </p>
              </CardContent>
            </Card>
          )}

          {/* Meditation Player */}
          {meditationScript && !isGenerating && (
            <div className="space-y-8">
              {/* Player Controls */}
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
                <CardHeader className="bg-gradient-to-r from-cyan-600 via-teal-600 to-green-600 text-white">
                  <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                    <Lotus className="h-8 w-8" />
                    {selectedType} Meditation
                    <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                      {isPlaying ? 'Playing' : 'Ready'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="flex justify-center gap-4 mb-8">
                    {!isPlaying ? (
                      <Button
                        onClick={startMeditation}
                        size="lg"
                        className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Play className="h-6 w-6 mr-3" />
                        Start Meditation
                      </Button>
                    ) : (
                      <Button
                        onClick={pauseMeditation}
                        size="lg"
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white text-xl font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                      >
                        <Pause className="h-6 w-6 mr-3" />
                        Pause
                      </Button>
                    )}
                    
                    <Button
                      onClick={resetMeditation}
                      size="lg"
                      variant="outline"
                      className="text-xl font-bold px-8 py-4 rounded-2xl border-2 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <RotateCcw className="h-6 w-6 mr-3" />
                      Reset
                    </Button>
                  </div>

                  {/* Current Step Display */}
                  {isPlaying && steps.length > 0 && (
                    <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-900/20 dark:via-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
                      <div className="mb-4">
                        <span className="text-sm text-teal-600 dark:text-teal-400 font-semibold">
                          Step {currentStep + 1} of {steps.length}
                        </span>
                      </div>
                      <p className="text-xl text-gray-800 dark:text-gray-200 leading-relaxed mb-6">
                        {steps[currentStep]}
                      </p>
                      <Button
                        onClick={nextStep}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-xl"
                      >
                        {currentStep < steps.length - 1 ? 'Next Step' : 'Complete'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Full Script */}
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
                <CardHeader className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white">
                  <CardTitle className="text-2xl font-black text-center font-playfair">
                    Complete Meditation Script
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {meditationScript}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Benefits Note */}
          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-teal-900/20 dark:via-cyan-900/20 dark:to-blue-900/20 border-2 border-teal-200 dark:border-teal-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
              <p className="text-teal-800 dark:text-teal-200 text-lg">
                <strong>Meditation Benefits:</strong> Regular meditation practice can reduce stress, improve focus, enhance emotional well-being, and promote better sleep. Find a quiet space and allow yourself this time for healing.
              </p>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MeditationGuide;
