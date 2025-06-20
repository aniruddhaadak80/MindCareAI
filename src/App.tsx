
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Resources from "./pages/Resources";
import Chat from "./pages/Chat";
import Assessment from "./pages/Assessment";
import MoodTests from "./pages/MoodTests";
import DreamAnalysis from "./pages/DreamAnalysis";
import PoetryTherapy from "./pages/PoetryTherapy";
import MeditationGuide from "./pages/MeditationGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/mood-tests" element={<MoodTests />} />
          <Route path="/dream-analysis" element={<DreamAnalysis />} />
          <Route path="/poetry-therapy" element={<PoetryTherapy />} />
          <Route path="/meditation-guide" element={<MeditationGuide />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
