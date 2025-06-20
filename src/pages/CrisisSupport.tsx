
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Phone, Heart, ArrowLeft, Shield, AlertTriangle, Headphones } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

const CrisisSupport = () => {
  const [message, setMessage] = useState("");
  const [support, setSupport] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const getSupportResponse = async () => {
    if (!message.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('crisis-intervention', {
        body: { message, riskLevel: 'unknown' }
      });

      if (error) throw error;
      setSupport(data.support);
    } catch (error) {
      console.error('Error getting crisis support:', error);
      setSupport('If you are in immediate danger, please call 911 or go to your nearest emergency room. For crisis support, call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line).');
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
            <Link to="/" className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent hover:from-orange-600 hover:to-yellow-600 transition-all duration-300">
              <ArrowLeft className="h-5 w-5 mr-3" />
              Back to Home
            </Link>
          </div>

          {/* Emergency Notice */}
          <Card className="bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 mb-8 animate-scale-in">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 text-red-800 dark:text-red-200">
                <AlertTriangle className="h-8 w-8 text-red-600" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Emergency Resources</h3>
                  <p className="text-lg">
                    <strong>Emergency:</strong> 911 | <strong>Crisis Lifeline:</strong> 988 | <strong>Crisis Text:</strong> Text HOME to 741741
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-yellow-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
              <Shield className="h-8 w-8 text-red-400 animate-pulse" />
              <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent font-playfair">
                Crisis Intervention AI
              </span>
              <Heart className="h-8 w-8 text-orange-400 animate-pulse" />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-transparent bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
              Crisis Support
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Get immediate support and resources when you need them most. You are not alone.
            </p>
          </div>

          {/* Input Section */}
          <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl mb-8 border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white">
              <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                <Heart className="h-8 w-8" />
                Share What's Happening
                <Headphones className="h-8 w-8" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Tell us how you're feeling right now:
                  </label>
                  <Textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="I'm struggling right now and don't know what to do. I feel overwhelmed and scared..."
                    className="min-h-32 text-lg p-4 border-2 border-red-200 dark:border-red-700 focus:border-red-500 dark:focus:border-red-400 rounded-xl"
                  />
                </div>
                
                <div className="flex justify-center">
                  <Button
                    onClick={getSupportResponse}
                    disabled={!message.trim() || isAnalyzing}
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white text-xl font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    {isAnalyzing ? (
                      <>
                        <Shield className="h-6 w-6 mr-3 animate-spin" />
                        Getting Support...
                      </>
                    ) : (
                      <>
                        <Heart className="h-6 w-6 mr-3" />
                        Get Support Now
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Support Response */}
          {support && (
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-2xl border-0 animate-scale-in">
              <CardHeader className="bg-gradient-to-r from-orange-600 via-yellow-600 to-green-600 text-white">
                <CardTitle className="text-3xl font-black text-center font-playfair flex items-center justify-center gap-3">
                  <Shield className="h-8 w-8" />
                  Support & Resources
                  <Badge className="bg-white/20 text-white text-lg px-4 py-2">
                    Immediate Help
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {support}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Crisis Resources */}
          <div className="mt-12">
            <Card className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/20 dark:via-indigo-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-2xl p-8 shadow-xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-6 text-center">
                24/7 Crisis Resources
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-200">Suicide & Crisis Lifeline</h4>
                      <p className="text-blue-700 dark:text-blue-300">Call or text 988</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-200">Crisis Text Line</h4>
                      <p className="text-blue-700 dark:text-blue-300">Text HOME to 741741</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-200">Emergency Services</h4>
                      <p className="text-blue-700 dark:text-blue-300">Call 911</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-6 w-6 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-blue-800 dark:text-blue-200">SAMHSA Helpline</h4>
                      <p className="text-blue-700 dark:text-blue-300">1-800-662-4357</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CrisisSupport;
