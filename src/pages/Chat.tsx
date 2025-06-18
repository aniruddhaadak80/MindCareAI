
import { useState } from "react";
import { Mic, Volume2, MessageCircle, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";
import VoiceChat from "@/components/VoiceChat";
import MotivationalQuotes from "@/components/MotivationalQuotes";
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import ChatInput from "@/components/ChatInput";
import ChatNavigation from "@/components/ChatNavigation";
import ChatDisclaimer from "@/components/ChatDisclaimer";
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
  const [isLoading, setIsLoading] = useState(false);
  const [currentMood, setCurrentMood] = useState("calm");

  const sendMessage = async (inputMessage: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      content: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
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

      // Extract mood from conversation for quotes
      if (inputMessage.toLowerCase().includes('anxious') || inputMessage.toLowerCase().includes('worried')) {
        setCurrentMood('anxious');
      } else if (inputMessage.toLowerCase().includes('sad') || inputMessage.toLowerCase().includes('depressed')) {
        setCurrentMood('sad');
      } else if (inputMessage.toLowerCase().includes('stressed') || inputMessage.toLowerCase().includes('overwhelmed')) {
        setCurrentMood('stressed');
      } else if (inputMessage.toLowerCase().includes('tired') || inputMessage.toLowerCase().includes('exhausted')) {
        setCurrentMood('tired');
      }
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

  return (
    <div className="min-h-screen relative flex flex-col">
      <ScrollingBackground />
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ChatHeader />

          {/* Main Content with Tabs */}
          <Tabs defaultValue="text-chat" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/90 backdrop-blur-md shadow-lg">
              <TabsTrigger value="text-chat" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                Text Chat
              </TabsTrigger>
              <TabsTrigger value="voice-chat" className="flex items-center gap-2">
                <Mic className="w-4 h-4" />
                Voice Chat
              </TabsTrigger>
              <TabsTrigger value="motivation" className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Motivation
              </TabsTrigger>
            </TabsList>

            {/* Text Chat Tab */}
            <TabsContent value="text-chat">
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
                  <ChatMessages messages={messages} isLoading={isLoading} />
                  <ChatInput onSendMessage={sendMessage} isLoading={isLoading} />
                </CardContent>
              </Card>
            </TabsContent>

            {/* Voice Chat Tab */}
            <TabsContent value="voice-chat">
              <VoiceChat />
            </TabsContent>

            {/* Motivation Tab */}
            <TabsContent value="motivation">
              <MotivationalQuotes mood={currentMood} />
            </TabsContent>
          </Tabs>

          <ChatNavigation />
          <ChatDisclaimer />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
