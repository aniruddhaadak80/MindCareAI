
import { Bot, User } from "lucide-react";

interface Message {
  id: number;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}>
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
  );
};

export default ChatMessage;
