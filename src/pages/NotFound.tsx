
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex flex-col">
      <ScrollingBackground />
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-20 relative z-10">
        <Card className="bg-white/90 backdrop-blur-md shadow-2xl border-0 max-w-2xl w-full animate-scale-in">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 animate-pulse">
                <Search className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
              <h2 className="text-2xl font-bold text-gray-600 mb-4">Page Not Found</h2>
              <p className="text-lg text-gray-500 mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist. You might have mistyped the URL or the page may have been moved.
              </p>
            </div>

            <div className="space-y-4">
              <Link to="/">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Go Home
                </Button>
              </Link>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/assessment">
                  <Button variant="outline" className="px-6 py-2">
                    Take Assessment
                  </Button>
                </Link>
                <Link to="/chat">
                  <Button variant="outline" className="px-6 py-2">
                    AI Chat
                  </Button>
                </Link>
                <Link to="/resources">
                  <Button variant="outline" className="px-6 py-2">
                    Resources
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
