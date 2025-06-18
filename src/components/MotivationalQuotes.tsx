
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Heart, Star, Share, Copy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Quote {
  text: string;
  author: string;
  category: string;
  mood: string;
}

interface MotivationalQuotesProps {
  mood?: string;
  situation?: string;
}

const MotivationalQuotes = ({ mood = "general", situation = "" }: MotivationalQuotesProps) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuote, setCurrentQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Quote[]>([]);
  
  const { toast } = useToast();

  const generateQuotes = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          message: `Generate 5 motivational quotes specifically for someone feeling ${mood} ${situation ? `in this situation: ${situation}` : ''}. 
          
          Return ONLY a JSON array in this exact format:
          [
            {
              "text": "Quote text here",
              "author": "Famous person who said it or 'Anonymous'",
              "category": "Category like 'Resilience', 'Hope', 'Strength', etc.",
              "mood": "${mood}"
            }
          ]
          
          Make the quotes inspiring, relevant to their ${mood} mood, and from real famous motivational speakers, authors, or leaders when possible.`
        }
      });

      if (error) throw error;

      const responseText = data.response;
      const jsonMatch = responseText.match(/\[[\s\S]*\]/);
      
      if (jsonMatch) {
        const quotesData = JSON.parse(jsonMatch[0]);
        setQuotes(quotesData);
        setCurrentQuote(quotesData[0]);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error generating quotes:', error);
      // Fallback quotes
      const fallbackQuotes = [
        {
          text: "The only way out is through.",
          author: "Robert Frost",
          category: "Resilience",
          mood: mood
        },
        {
          text: "You are stronger than you think and more capable than you imagine.",
          author: "Anonymous",
          category: "Self-belief",
          mood: mood
        }
      ];
      setQuotes(fallbackQuotes);
      setCurrentQuote(fallbackQuotes[0]);
    }
    setIsLoading(false);
  };

  const getRandomQuote = () => {
    if (quotes.length > 0) {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setCurrentQuote(quotes[randomIndex]);
    }
  };

  const addToFavorites = (quote: Quote) => {
    if (!favorites.find(fav => fav.text === quote.text)) {
      const newFavorites = [...favorites, quote];
      setFavorites(newFavorites);
      localStorage.setItem('favoriteQuotes', JSON.stringify(newFavorites));
      toast({
        title: "Added to favorites",
        description: "Quote saved to your favorites!",
      });
    }
  };

  const copyToClipboard = async (quote: Quote) => {
    try {
      await navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`);
      toast({
        title: "Copied!",
        description: "Quote copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy quote",
        variant: "destructive",
      });
    }
  };

  const shareQuote = async (quote: Quote) => {
    const shareText = `"${quote.text}" - ${quote.author}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Motivational Quote',
          text: shareText,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyToClipboard(quote);
    }
  };

  const getMoodColor = () => {
    switch (mood) {
      case 'anxious': return 'from-blue-400 to-cyan-500';
      case 'sad': return 'from-indigo-400 to-purple-500';
      case 'stressed': return 'from-red-400 to-pink-500';
      case 'tired': return 'from-orange-400 to-yellow-500';
      case 'confused': return 'from-teal-400 to-green-500';
      default: return 'from-purple-400 to-pink-500';
    }
  };

  useEffect(() => {
    generateQuotes();
    
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteQuotes');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [mood, situation]);

  if (isLoading) {
    return (
      <Card className="bg-white/90 backdrop-blur-sm shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="animate-spin w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Generating personalized quotes...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Quote Display */}
      {currentQuote && (
        <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${getMoodColor()}`} />
          <CardHeader className="pb-4">
            <div className="flex justify-between items-start">
              <Badge className={`bg-gradient-to-r ${getMoodColor()} text-white`}>
                {currentQuote.category}
              </Badge>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => addToFavorites(currentQuote)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <Heart className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(currentQuote)}
                  className="text-gray-500 hover:text-gray-600 hover:bg-gray-50"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => shareQuote(currentQuote)}
                  className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                >
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6">
            <blockquote className="text-xl md:text-2xl font-medium text-gray-800 mb-4 leading-relaxed italic">
              "{currentQuote.text}"
            </blockquote>
            <div className="flex items-center justify-between">
              <cite className="text-lg text-gray-600 font-semibold">
                — {currentQuote.author}
              </cite>
              <div className="flex items-center gap-2 text-yellow-500">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={getRandomQuote}
          disabled={quotes.length === 0}
          className={`bg-gradient-to-r ${getMoodColor()} hover:opacity-90 text-white px-6 py-3`}
        >
          <RefreshCw className="w-5 h-5 mr-2" />
          New Quote
        </Button>
        
        <Button
          onClick={generateQuotes}
          variant="outline"
          className="px-6 py-3 border-2 border-purple-300 text-purple-700 hover:bg-purple-50"
        >
          Generate More
        </Button>
      </div>

      {/* All Quotes Grid */}
      {quotes.length > 1 && (
        <div className="grid md:grid-cols-2 gap-4">
          {quotes.slice(1).map((quote, index) => (
            <Card 
              key={index}
              className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
              onClick={() => setCurrentQuote(quote)}
            >
              <CardContent className="p-4">
                <p className="text-gray-700 mb-2 line-clamp-3">"{quote.text}"</p>
                <p className="text-sm text-gray-500">— {quote.author}</p>
                <Badge variant="outline" className="mt-2">
                  {quote.category}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Favorites Section */}
      {favorites.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-current" />
              Your Favorite Quotes ({favorites.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {favorites.map((quote, index) => (
                <div 
                  key={index}
                  className="p-3 bg-white/60 rounded-lg cursor-pointer hover:bg-white/80 transition-colors"
                  onClick={() => setCurrentQuote(quote)}
                >
                  <p className="text-sm text-gray-700 line-clamp-2">"{quote.text}"</p>
                  <p className="text-xs text-gray-500 mt-1">— {quote.author}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MotivationalQuotes;
