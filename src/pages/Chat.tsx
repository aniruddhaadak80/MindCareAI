
import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageCircle, ArrowLeft, Sparkles, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I'm your AI mental health companion powered by Gemini 2.0. I'm here to listen with empathy and provide support in a safe, judgment-free space. How are you feeling today? 💙",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Call Gemini API through Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat', {
        body: { message: inputMessage }
      });

      if (error) {
        throw error;
      }

      const aiMessage: Message = {
        id: messages.length + 2,
        content: data.response,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling chat function:', error);
      // Fallback response for demo purposes
      const aiMessage: Message = {
        id: messages.length + 2,
        content: "I understand you're reaching out, and I appreciate you sharing with me. While I'm here to provide support, please remember that if you're experiencing a mental health crisis, it's important to contact a professional immediately. Would you like to tell me more about what's on your mind? 💜",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      <ScrollingBackground />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full animate-pulse">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Mental Health Companion
              </h1>
              <Heart className="h-8 w-8 text-red-400 animate-pulse" />
            </div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              A safe space powered by Gemini 2.0 to share your thoughts and feelings. Remember, this is not a substitute for professional therapy.
            </p>
          </div>

          {/* Chat Container */}
          <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0 animate-scale-in overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6" />
                Confidential AI Chat Session
                <div className="ml-auto flex items-center gap-2 text-sm bg-white/20 rounded-full px-3 py-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Gemini 2.0 Active
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-indigo-50/30 to-purple-50/30">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`p-2 rounded-full shadow-lg ${
                        message.isUser 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500' 
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}>
                        {message.isUser ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div
                        className={`p-4 rounded-2xl shadow-lg ${
                          message.isUser
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                            : 'bg-gradient-to-r from-gray-50 to-white text-gray-800 border border-purple-100'
                        }`}
                      >
                        <p className="text-sm md:text-base leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-indigo-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-2xl border border-purple-100 shadow-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t bg-gradient-to-r from-indigo-50 to-purple-50 p-4">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="flex-1 bg-white/80 border-purple-200 focus:border-indigo-400 focus:ring-indigo-400"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Cards */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Link to="/assessment" className="group">
              <Card className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-indigo-200">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-indigo-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-indigo-800 mb-1">Take Assessment</h4>
                  <p className="text-sm text-indigo-600">Evaluate your mental wellness</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/resources" className="group">
              <Card className="bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-green-200">
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-green-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-green-800 mb-1">Resources</h4>
                  <p className="text-sm text-green-600">Professional help & tools</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/contact" className="group">
              <Card className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-pink-200">
                <CardContent className="p-4 text-center">
                  <Sparkles className="h-8 w-8 mx-auto mb-2 text-pink-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-pink-800 mb-1">Contact</h4>
                  <p className="text-sm text-pink-600">Get in touch with us</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg p-6 text-center animate-fade-in shadow-lg">
            <p className="text-amber-800 text-sm">
              <strong>Important:</strong> This AI companion provides emotional support but is not a replacement for professional therapy. 
              If you're experiencing a mental health crisis, please contact emergency services or call 988 (Suicide & Crisis Lifeline).
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
