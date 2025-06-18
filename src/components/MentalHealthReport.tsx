
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, Share, Image as ImageIcon, FileText, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";

interface ReportData {
  scores: {
    anxiety: number;
    depression: number;
    stress: number;
    wellbeing: number;
    energy: number;
    focus: number;
  };
  insights: string;
  recommendations: string[];
  mood: string;
  date: string;
}

interface MentalHealthReportProps {
  reportData: ReportData;
}

const MentalHealthReport = ({ reportData }: MentalHealthReportProps) => {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [reportImage, setReportImage] = useState<string | null>(null);
  const reportRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generateReportImage = async () => {
    if (!reportRef.current) return;

    setIsGeneratingImage(true);
    try {
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true,
        height: reportRef.current.scrollHeight,
        width: reportRef.current.scrollWidth,
      });

      const imageDataUrl = canvas.toDataURL('image/png', 1.0);
      setReportImage(imageDataUrl);
      
      toast({
        title: "Report generated!",
        description: "Your mental health report image is ready to share.",
      });
    } catch (error) {
      console.error('Error generating image:', error);
      toast({
        title: "Error",
        description: "Failed to generate report image",
        variant: "destructive",
      });
    }
    setIsGeneratingImage(false);
  };

  const downloadReport = () => {
    if (!reportImage) return;

    const link = document.createElement('a');
    link.download = `mental-health-report-${new Date().toISOString().split('T')[0]}.png`;
    link.href = reportImage;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareReport = async () => {
    if (!reportImage) return;

    try {
      // Convert data URL to blob
      const response = await fetch(reportImage);
      const blob = await response.blob();
      
      const file = new File([blob], 'mental-health-report.png', { type: 'image/png' });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My Mental Health Report',
          text: 'Check out my mental health assessment results!',
          files: [file],
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `Check out my mental health assessment results! Overall wellbeing: ${reportData.scores.wellbeing}%`
        );
        toast({
          title: "Copied to clipboard",
          description: "Report summary copied to clipboard!",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Error",
        description: "Failed to share report",
        variant: "destructive",
      });
    }
  };

  const getScoreColor = (score: number, isPositive: boolean = false) => {
    if (isPositive) {
      if (score >= 70) return 'text-green-600';
      if (score >= 40) return 'text-yellow-600';
      return 'text-red-600';
    } else {
      if (score <= 30) return 'text-green-600';
      if (score <= 60) return 'text-yellow-600';
      return 'text-red-600';
    }
  };

  const getProgressColor = (score: number, isPositive: boolean = false) => {
    if (isPositive) {
      if (score >= 70) return 'bg-green-500';
      if (score >= 40) return 'bg-yellow-500';
      return 'bg-red-500';
    } else {
      if (score <= 30) return 'bg-green-500';
      if (score <= 60) return 'bg-yellow-500';
      return 'bg-red-500';
    }
  };

  const getOverallStatus = () => {
    const positive = (reportData.scores.wellbeing + reportData.scores.energy + reportData.scores.focus) / 3;
    const negative = (reportData.scores.anxiety + reportData.scores.depression + reportData.scores.stress) / 3;
    const overall = (positive + (100 - negative)) / 2;

    if (overall >= 70) return { status: 'Excellent', color: 'from-green-400 to-green-600', emoji: '🌟' };
    if (overall >= 50) return { status: 'Good', color: 'from-yellow-400 to-yellow-600', emoji: '😊' };
    if (overall >= 30) return { status: 'Fair', color: 'from-orange-400 to-orange-600', emoji: '😐' };
    return { status: 'Needs Attention', color: 'from-red-400 to-red-600', emoji: '💪' };
  };

  const overallStatus = getOverallStatus();

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button
          onClick={generateReportImage}
          disabled={isGeneratingImage}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
        >
          {isGeneratingImage ? (
            <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
          ) : (
            <ImageIcon className="w-4 h-4 mr-2" />
          )}
          Generate Image
        </Button>

        {reportImage && (
          <>
            <Button
              onClick={downloadReport}
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>

            <Button
              onClick={shareReport}
              variant="outline"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
            >
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
          </>
        )}
      </div>

      {/* Report Content */}
      <div
        ref={reportRef}
        className="bg-white p-8 rounded-2xl shadow-2xl max-w-4xl mx-auto"
        style={{ minHeight: '800px' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className={`inline-block p-4 rounded-full bg-gradient-to-r ${overallStatus.color} mb-4`}>
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Mental Health Report</h1>
          <p className="text-gray-600 text-lg">Generated on {reportData.date}</p>
          <Badge className={`bg-gradient-to-r ${overallStatus.color} text-white text-lg px-6 py-2 mt-4`}>
            {overallStatus.emoji} Overall Status: {overallStatus.status}
          </Badge>
        </div>

        {/* Mood Badge */}
        <div className="text-center mb-8">
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-base px-4 py-2">
            Current Mood: {reportData.mood.charAt(0).toUpperCase() + reportData.mood.slice(1)}
          </Badge>
        </div>

        {/* Scores Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {Object.entries(reportData.scores).map(([category, score]) => {
            const isPositive = category === 'wellbeing' || category === 'energy' || category === 'focus';
            return (
              <Card key={category} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-gray-800 capitalize">{category}</h3>
                    <span className={`text-3xl font-bold ${getScoreColor(score, isPositive)}`}>
                      {score}%
                    </span>
                  </div>
                  <Progress 
                    value={score} 
                    className="h-4"
                  />
                  <div className={`w-full bg-gray-200 rounded-full h-4 overflow-hidden`}>
                    <div 
                      className={`h-full ${getProgressColor(score, isPositive)} transition-all duration-500`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Insights */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-purple-600" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed text-lg">{reportData.insights}</p>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
              <FileText className="h-6 w-6 text-green-600" />
              Personalized Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reportData.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{recommendation}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            This report is generated by AI and should not replace professional medical advice.
          </p>
          <p className="text-gray-400 text-xs mt-2">
            MindCare AI © 2024 - Your Mental Health Companion
          </p>
        </div>
      </div>

      {/* Generated Image Preview */}
      {reportImage && (
        <Card className="bg-white/95 backdrop-blur-sm shadow-xl">
          <CardHeader>
            <CardTitle className="text-center">Generated Report Image</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <img 
              src={reportImage} 
              alt="Mental Health Report" 
              className="max-w-full h-auto rounded-lg shadow-lg mx-auto"
              style={{ maxHeight: '400px' }}
            />
            <p className="text-sm text-gray-600 mt-4">
              Ready to download or share on social media!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MentalHealthReport;
