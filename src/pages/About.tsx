
import { Shield, Heart, Brain, Users, Award, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const About = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze responses to provide personalized mental health insights.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is encrypted and never stored permanently. Complete anonymity and security guaranteed.",
      color: "green"
    },
    {
      icon: Heart,
      title: "Compassionate Care",
      description: "Designed with empathy and understanding to support your mental wellness journey.",
      color: "pink"
    },
    {
      icon: Users,
      title: "Professional Network",
      description: "Connect with certified mental health professionals and access curated resources.",
      color: "purple"
    },
    {
      icon: Award,
      title: "Evidence-Based",
      description: "Built on validated psychological assessments and clinical research.",
      color: "orange"
    },
    {
      icon: Zap,
      title: "Instant Results",
      description: "Get immediate insights and recommendations to start your wellness journey.",
      color: "yellow"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MindCare AI</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're revolutionizing mental health care through artificial intelligence, making professional-grade assessments accessible to everyone while maintaining the highest standards of privacy and compassion.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl leading-relaxed max-w-4xl mx-auto">
                To democratize mental health care by providing AI-powered screening tools that help individuals understand their mental wellness, 
                connect with appropriate resources, and take the first step towards better mental health. We believe everyone deserves access to 
                quality mental health insights, regardless of their location or circumstances.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">MindCare AI</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="hover:shadow-2xl transition-all duration-500 transform hover:scale-105 bg-white/80 backdrop-blur-sm group">
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-4 bg-gradient-to-r from-${feature.color}-400 to-${feature.color}-600 rounded-2xl w-fit mb-4 group-hover:animate-pulse`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Stats Section */}
        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-12">Impact & Trust</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Users Helped" },
              { number: "98%", label: "Accuracy Rate" },
              { number: "24/7", label: "Availability" },
              { number: "100%", label: "Privacy Protected" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-amber-600 mr-3" />
            <h3 className="text-2xl font-bold text-amber-800">Important Disclaimer</h3>
          </div>
          <p className="text-amber-700 leading-relaxed max-w-4xl mx-auto">
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
