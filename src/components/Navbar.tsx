
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Brain, Menu, X, MessageSquare, Shield, Users, BookOpen, Sparkles, Zap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Brain },
    { name: "Assessment", path: "/assessment", icon: MessageSquare },
    { name: "Mood Tests", path: "/mood-tests", icon: Zap },
    { name: "About", path: "/about", icon: Shield },
    { name: "Resources", path: "/resources", icon: BookOpen },
    { name: "Contact", path: "/contact", icon: Users },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              MindCare AI
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold"
                      : "text-gray-600 hover:text-indigo-600"
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
            <Link to="/chat">
              <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                <Sparkles className="h-4 w-4 mr-2" />
                AI Chat
              </Button>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gradient-to-r from-indigo-100 to-purple-100 bg-white/95 backdrop-blur-md">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 font-semibold"
                        : "text-gray-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 hover:text-indigo-600"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
              <Link
                to="/chat"
                onClick={() => setIsOpen(false)}
                className="mx-4 mt-2"
              >
                <Button className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600">
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Chat
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
