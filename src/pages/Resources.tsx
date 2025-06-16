
import { BookOpen, ExternalLink, Phone, MessageCircle, Heart, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

const Resources = () => {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      phone: "988",
      description: "24/7 crisis support for suicide prevention",
      available: "24/7"
    },
    {
      name: "Crisis Text Line",
      phone: "Text HOME to 741741",
      description: "Free, 24/7 crisis support via text message",
      available: "24/7"
    },
    {
      name: "NAMI Helpline",
      phone: "1-800-950-NAMI (6264)",
      description: "Information and support for mental health",
      available: "Mon-Fri 10am-10pm ET"
    }
  ];

  const mentalHealthResources = [
    {
      title: "Depression and Anxiety",
      resources: [
        { name: "Anxiety and Depression Association of America", url: "https://adaa.org" },
        { name: "Depression and Bipolar Support Alliance", url: "https://www.dbsalliance.org" },
        { name: "Mental Health America", url: "https://www.mhanational.org" }
      ]
    },
    {
      title: "Stress Management",
      resources: [
        { name: "American Psychological Association", url: "https://www.apa.org" },
        { name: "Mindfulness-Based Stress Reduction", url: "https://www.mindfulnesscds.com" },
        { name: "Stress Management Society", url: "https://www.stress.org.uk" }
      ]
    },
    {
      title: "General Mental Health",
      resources: [
        { name: "National Alliance on Mental Illness", url: "https://www.nami.org" },
        { name: "Mental Health First Aid", url: "https://www.mentalhealthfirstaid.org" },
        { name: "National Institute of Mental Health", url: "https://www.nimh.nih.gov" }
      ]
    }
  ];

  const selfCareTools = [
    {
      icon: Heart,
      title: "Meditation Apps",
      description: "Guided meditation and mindfulness practices",
      tools: ["Headspace", "Calm", "Insight Timer", "Ten Percent Happier"]
    },
    {
      icon: BookOpen,
      title: "Mental Health Books",
      description: "Recommended reading for mental wellness",
      tools: ["The Anxiety and Worry Workbook", "Feeling Good", "The Mindful Way Through Depression"]
    },
    {
      icon: Users,
      title: "Support Groups",
      description: "Connect with others who understand",
      tools: ["NAMI Support Groups", "Depression and Bipolar Support Alliance", "Anxiety Support Groups"]
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
            Mental Health <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Resources</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access professional resources, crisis support, and self-care tools to support your mental wellness journey.
          </p>
        </div>

        {/* Crisis Resources */}
        <section className="mb-20">
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8 mb-12">
            <div className="text-center mb-8">
              <Phone className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-red-800 mb-4">Crisis Support</h2>
              <p className="text-red-700 text-lg">If you're in crisis or having thoughts of self-harm, please reach out immediately:</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {crisisResources.map((resource, index) => (
                <Card key={index} className="border-red-200 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <CardTitle className="text-red-800">{resource.name}</CardTitle>
                    <CardDescription className="text-lg font-bold text-red-600">
                      {resource.phone}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-gray-700 mb-2">{resource.description}</p>
                    <p className="text-sm text-gray-600 font-medium">{resource.available}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mental Health Organizations */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Professional <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Organizations</span>
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {mentalHealthResources.map((category, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-800 flex items-center gap-2">
                    <BookOpen className="h-6 w-6" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {category.resources.map((resource, resourceIndex) => (
                      <div key={resourceIndex} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        <span className="text-gray-800 font-medium">{resource.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Self-Care Tools */}
        <section className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Self-Care <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Tools</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {selfCareTools.map((tool, index) => {
              const IconComponent = tool.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="text-center">
                    <div className="mx-auto p-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl w-fit mb-4">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{tool.title}</CardTitle>
                    <CardDescription className="text-gray-600">{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tool.tools.map((item, itemIndex) => (
                        <div key={itemIndex} className="p-2 bg-green-50 rounded-lg text-center text-gray-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold mb-6">Need Professional Help?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            While these resources are helpful, nothing replaces professional mental health care. 
            Consider reaching out to a licensed therapist or counselor in your area.
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-purple-700 hover:bg-blue-50">
            <MessageCircle className="h-5 w-5 mr-2" />
            Find a Therapist Near You
          </Button>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Resources;
