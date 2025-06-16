import { Mail, MessageCircle, MapPin, Clock, Send, Phone, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollingBackground from "@/components/ScrollingBackground";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: "support@mindcareai.com",
      description: "Send us your questions or feedback"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      content: "Available 24/7",
      description: "Chat with our AI assistant"
    },
    {
      icon: MapPin,
      title: "Location",
      content: "Remote Team",
      description: "Serving users globally"
    },
    {
      icon: Clock,
      title: "Response Time",
      content: "Within 24 hours",
      description: "We'll get back to you soon"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <ScrollingBackground />
      <Navbar />
      
      <main className="container mx-auto px-4 py-20 relative z-10">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about MindCare AI? Need technical support? We're here to help you on your mental wellness journey.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form - keep existing content but add animations */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl animate-scale-in">
            <CardHeader>
              <CardTitle className="text-3xl text-gray-800 flex items-center gap-3">
                <Send className="h-8 w-8 text-blue-600" />
                Send us a Message
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      required
                      className="bg-white/70"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-white/70"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="bg-white/70"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    rows={6}
                    required
                    className="bg-white/70"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-5 w-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information - keep existing content but add animations */}
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Other Ways to Reach Us</h2>
              <p className="text-gray-600">Choose the method that works best for you</p>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <Card key={index} className="bg-white/60 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800 mb-1">{info.title}</h3>
                          <p className="text-lg text-blue-600 font-semibold mb-1">{info.content}</p>
                          <p className="text-gray-600">{info.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Emergency Notice */}
            <Card className="bg-red-50 border-2 border-red-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Phone className="h-8 w-8 text-red-600 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-800 mb-2">Crisis Support</h3>
                    <p className="text-red-700 mb-3">
                      If you're experiencing a mental health crisis, please don't wait for our response.
                    </p>
                    <div className="space-y-2">
                      <div className="text-red-800 font-semibold">
                        🚨 Call 988 (Suicide & Crisis Lifeline)
                      </div>
                      <div className="text-red-800 font-semibold">
                        📱 Text HOME to 741741 (Crisis Text Line)
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Section */}
        <section className="mt-20 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Explore Our Platform</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Link to="/assessment" className="group">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800">Assessment</h4>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/chat" className="group">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-green-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800">AI Chat</h4>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/resources" className="group">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-purple-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800">Resources</h4>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/about" className="group">
              <Card className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-4 text-center">
                  <MessageCircle className="h-8 w-8 mx-auto mb-2 text-orange-600 group-hover:animate-pulse" />
                  <h4 className="font-bold text-gray-800">About Us</h4>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* FAQ Section - keep existing content */}
        <section className="mt-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Questions</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                question: "Is MindCare AI a replacement for therapy?",
                answer: "No, MindCare AI is a screening tool that provides preliminary insights. It's designed to complement, not replace, professional mental health care."
              },
              {
                question: "How is my data protected?",
                answer: "We use advanced encryption and never store personal information permanently. Your privacy and anonymity are our top priorities."
              },
              {
                question: "How accurate are the assessments?",
                answer: "Our AI is trained on validated psychological assessments with a 98% accuracy rate, but professional diagnosis is always recommended."
              },
              {
                question: "Is the service free?",
                answer: "Yes, our basic mental health screening is completely free. We believe everyone should have access to mental health insights."
              }
            ].map((faq, index) => (
              <Card key={index} className="bg-white/60 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-800">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
