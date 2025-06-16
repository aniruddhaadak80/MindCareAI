import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, MessageCircle, ArrowLeft } from "lucide-react";
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
      content: "Hello! I'm your AI mental health companion. I'm here to listen and provide support. How are you feeling today?",
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
        content: "I understand you're reaching out, and I appreciate you sharing with me. While I'm here to provide support, please remember that if you're experiencing a mental health crisis, it's important to contact a professional immediately. Would you like to tell me more about what's on your mind?",
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
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              AI Mental Health <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Companion</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A safe space to share your thoughts and feelings. Remember, this is not a substitute for professional therapy.
            </p>
          </div>

          {/* Chat Container */}
          <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 animate-scale-in">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3">
                <MessageCircle className="h-6 w-6" />
                Confidential Chat Session
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex gap-3 max-w-[80%] ${message.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                      <div className={`p-2 rounded-full ${message.isUser ? 'bg-blue-600' : 'bg-purple-600'}`}>
                        {message.isUser ? (
                          <User className="h-5 w-5 text-white" />
                        ) : (
                          <Bot className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div
                        className={`p-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="text-sm md:text-base">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-2 rounded-full bg-purple-600">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className="bg-gray-100 p-4 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t bg-gray-50 p-4">
                <div className="flex gap-3">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your mind..."
                    className="flex-1 bg-white"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={sendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
              <Card className="bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800 mb-1">Take Assessment</h4>
                  <p className="text-sm text-gray-600">Evaluate your mental wellness</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/resources" className="group">
              <Card className="bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800 mb-1">Resources</h4>
                  <p className="text-sm text-gray-600">Professional help & tools</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/contact" className="group">
              <Card className="bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-purple-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800 mb-1">Contact</h4>
                  <p className="text-sm text-gray-600">Get in touch with us</p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-6 text-center animate-fade-in">
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
