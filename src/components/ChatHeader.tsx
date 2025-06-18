
import { ArrowLeft, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const ChatHeader = () => {
  return (
    <>
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
          A safe space powered by Gemini 2.0 to share your thoughts and feelings. Choose how you'd like to interact with your AI companion.
        </p>
      </div>
    </>
  );
};

export default ChatHeader;
