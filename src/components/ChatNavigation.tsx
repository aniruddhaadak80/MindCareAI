
import { MessageCircle, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const ChatNavigation = () => {
  return (
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
      
      <Link to="/mood-tests" className="group">
        <Card className="bg-gradient-to-br from-pink-50/80 to-rose-50/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-pink-200">
          <CardContent className="p-4 text-center">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-pink-600 group-hover:animate-pulse" />
            <h4 className="font-bold text-pink-800 mb-1">Mood Tests</h4>
            <p className="text-sm text-pink-600">AI-powered assessments</p>
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
    </div>
  );
};

export default ChatNavigation;
