
import { Github, Linkedin, Twitter, Mail, MessageCircle, ExternalLink, Code, User, Link } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aniruddha-adak", icon: Linkedin, color: "text-blue-600 hover:text-blue-700" },
    { name: "GitHub", url: "https://github.com/AniruddhaAdak", icon: Github, color: "text-gray-800 hover:text-gray-900" },
    { name: "Twitter", url: "https://x.com/aniruddhadak", icon: Twitter, color: "text-sky-500 hover:text-sky-600" },
    { name: "Dev.to", url: "https://dev.to/aniruddhaadak", icon: Code, color: "text-gray-900 hover:text-black" },
    { name: "CodePen", url: "https://codepen.io/aniruddhaadak", icon: ExternalLink, color: "text-gray-700 hover:text-gray-800" },
    { name: "Portfolio", url: "https://aniruddha-adak.vercel.app", icon: User, color: "text-purple-600 hover:text-purple-700" },
    { name: "Email", url: "mailto:aniruddhaadak80@gmail.com", icon: Mail, color: "text-red-600 hover:text-red-700" },
    { name: "Telegram", url: "https://t.me/aniruddhaadak", icon: MessageCircle, color: "text-blue-500 hover:text-blue-600" },
    { name: "Linktree", url: "https://linktr.ee/aniruddha.adak", icon: Link, color: "text-green-600 hover:text-green-700" },
  ];

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 animate-pulse"></div>
      
      <div className="relative container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Connect with the Developer
          </h3>
          <p className="text-gray-300 mb-6">
            Built with ❤️ by Aniruddha Adak - Full Stack Developer & AI Enthusiast
          </p>
          
          {/* Social Links Grid */}
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4 max-w-4xl mx-auto mb-8">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} transition-all duration-300 transform hover:scale-110 hover:rotate-3 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 group`}
                  title={link.name}
                >
                  <IconComponent className="h-6 w-6 mx-auto group-hover:animate-bounce" />
                  <span className="text-xs mt-1 block opacity-75 group-hover:opacity-100">{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mb-6"></div>

        {/* Copyright and App Info */}
        <div className="text-center space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-400">
              <p>&copy; {currentYear} <strong>Aniruddha Adak</strong>. All rights reserved.</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>MindCare AI - Empowering Mental Wellness Through Technology</p>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 max-w-2xl mx-auto">
            <p className="mb-2">
              <strong>Disclaimer:</strong> This application is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
            <p>
              Always seek the advice of qualified mental health professionals for any questions regarding mental health conditions.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
