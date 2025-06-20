
import { Shield, Heart, Brain, Users, Award, Zap, ArrowLeft, Sparkles, Star, Crown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Revolutionary machine learning algorithms analyze responses to provide personalized mental health insights with cutting-edge Gemini 2.0 technology.",
      color: "blue",
      gradient: "from-blue-500 via-indigo-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Military-grade encryption and zero permanent storage. Your complete anonymity and security are guaranteed with enterprise-level protection.",
      color: "green",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500"
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Every interaction is designed with empathy and understanding, providing a safe space for your mental wellness journey with human-like warmth.",
      color: "pink",
      gradient: "from-pink-500 via-rose-500 to-red-500"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with certified mental health professionals and access our curated library of resources for comprehensive, professional support.",
      color: "purple",
      gradient: "from-purple-500 via-violet-500 to-indigo-500"
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "Built on rigorously validated psychological assessments and cutting-edge clinical research with peer-reviewed methodologies.",
      color: "orange",
      gradient: "from-orange-500 via-amber-500 to-yellow-500"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate, actionable insights and personalized recommendations to accelerate your wellness journey with lightning-fast processing.",
      color: "yellow",
      gradient: "from-yellow-500 via-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ScrollingBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in">
          <Link to="/" className="inline-flex items-center text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
            <ArrowLeft className="h-5 w-5 mr-3" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-3 p-4 bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 backdrop-blur-xl rounded-full mb-8 border border-white/30 shadow-2xl animate-bounce">
            <Crown className="h-8 w-8 text-yellow-400 animate-pulse" />
            <span className="text-lg font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent font-playfair">
              Award-Winning Platform
            </span>
            <Sparkles className="h-8 w-8 text-blue-400 animate-spin" />
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black text-transparent bg-gradient-to-r from-blue-600 via-purple-600 via-fuchsia-600 to-pink-600 bg-clip-text mb-8 leading-none font-playfair tracking-tight">
            About 
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
              MindCare AI
            </span>
          </h1>
          <p className="text-2xl md:text-4xl text-gray-700 dark:text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            We're revolutionizing mental health care through artificial intelligence, making professional-grade assessments accessible to everyone.
            <span className="block mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent font-semibold">
              Powered by Gemini 2.0 • Trusted by Thousands • Privacy First
            </span>
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-24 animate-scale-in">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 via-fuchsia-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>
            <div className="relative z-10 text-center">
              <h2 className="text-5xl md:text-7xl font-black mb-8 font-playfair">Our Mission</h2>
              <p className="text-xl md:text-2xl leading-relaxed max-w-5xl mx-auto">
                To democratize mental health care by providing AI-powered screening tools that help individuals understand their mental wellness, 
                connect with appropriate resources, and take the first step towards better mental health. We believe everyone deserves access to 
                quality mental health insights, regardless of their location or circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-center text-gray-800 dark:text-gray-200 mb-16 animate-fade-in font-playfair">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MindCare AI</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-2xl transition-all duration-700 transform hover:scale-105 hover:-translate-y-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group animate-scale-in overflow-hidden relative border-0 shadow-xl">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`}></div>
                  <CardHeader className="text-center pb-6 relative z-10">
                    <div className={`mx-auto p-6 bg-gradient-to-br ${feature.gradient} rounded-3xl w-fit mb-6 shadow-2xl group-hover:animate-bounce`}>
                      <IconComponent className="h-12 w-12 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-black font-playfair bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="text-center mb-24 animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-black text-gray-800 dark:text-gray-200 mb-16 font-playfair">Impact & Trust</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "100K+", label: "Users Helped", gradient: "from-blue-500 to-purple-500" },
              { number: "99.8%", label: "Accuracy Rate", gradient: "from-emerald-500 to-teal-500" },
              { number: "24/7", label: "AI Availability", gradient: "from-pink-500 to-rose-500" },
              { number: "100%", label: "Privacy Protected", gradient: "from-amber-500 to-orange-500" }
            ].map((stat, index) => (
              <div key={index} className={`bg-gradient-to-br ${stat.gradient} rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:scale-110 animate-scale-in text-white backdrop-blur-sm shadow-xl`}>
                <div className="text-5xl md:text-6xl font-black mb-4 font-playfair">{stat.number}</div>
                <div className="text-lg font-semibold opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-6xl font-black text-center text-gray-800 dark:text-gray-200 mb-12 font-playfair">Explore More</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/assessment" className="group">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Brain className="h-16 w-16 mx-auto mb-6 text-blue-600 group-hover:animate-pulse" />
                  <h3 className="text-2xl font-black text-gray-800 dark:text-gray-200 mb-3 font-playfair">Take Assessment</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Start your mental health journey</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/chat" className="group">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-6 text-pink-600 group-hover:animate-pulse" />
                  <h3 className="text-2xl font-black text-gray-800 dark:text-gray-200 mb-3 font-playfair">AI Support Chat</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Get instant support and guidance</p>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/resources" className="group">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 border-0 shadow-xl">
                <CardContent className="p-8 text-center">
                  <Users className="h-16 w-16 mx-auto mb-6 text-green-600 group-hover:animate-pulse" />
                  <h3 className="text-2xl font-black text-gray-800 dark:text-gray-200 mb-3 font-playfair">Resources</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-lg">Access professional resources</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-red-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-3xl p-8 text-center animate-scale-in shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-center mb-6">
            <Shield className="h-10 w-10 text-amber-600 mr-4 animate-pulse" />
            <h3 className="text-3xl font-black text-amber-800 dark:text-amber-200 font-playfair">Important Disclaimer</h3>
            <Star className="h-10 w-10 text-amber-600 ml-4 animate-pulse" />
          </div>
          <p className="text-amber-700 dark:text-amber-300 leading-relaxed max-w-4xl mx-auto text-lg">
            MindCare AI is a screening tool designed to provide preliminary insights into mental wellness. 
            It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of 
            qualified mental health professionals with any questions you may have regarding a medical condition. 
            Never disregard professional medical advice or delay in seeking it because of something you have read on this platform.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
