
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, Mic, MicOff, Volume2, VolumeX, Phone, PhoneOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import AIAvatar from "./AIAvatar";
import { useToast } from "@/hooks/use-toast";
import { getVoiceErrorMessage, type VoiceErrorMessage } from "@/lib/voiceErrors";

interface VoiceChatProps {
  /**
   * Called when the microphone cannot be used, so the page can offer the text
   * chat as a fallback.
   */
  onVoiceUnavailable?: () => void;
}

const VoiceChat = ({ onVoiceUnavailable }: VoiceChatProps = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [currentMood, setCurrentMood] = useState("calm");
  const [voiceError, setVoiceError] = useState<VoiceErrorMessage | null>(null);
  
  const { toast } = useToast();
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const audioElement = useRef<HTMLAudioElement | null>(null);
  // Mirrors `isListening` so timers and the unmount cleanup always read the
  // current value instead of a stale render closure.
  const isListeningRef = useRef(false);

  const stopListening = useCallback(() => {
    if (mediaRecorder.current && mediaRecorder.current.state !== 'inactive') {
      mediaRecorder.current.stop();
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop());
    }
    isListeningRef.current = false;
    setIsListening(false);
  }, []);

  const startListening = async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        // The browser does not expose the microphone API at all, for example
        // in an insecure context or in a browser without support for it.
        const unsupported = new Error('getUserMedia is not supported');
        unsupported.name = 'NotSupportedError';
        throw unsupported;
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };

      mediaRecorder.current.onstop = async () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
        await processAudio(audioBlob);
      };

      mediaRecorder.current.start();
      isListeningRef.current = true;
      setIsListening(true);
      setVoiceError(null);
      
      // Stop listening after 5 seconds
      setTimeout(() => {
        if (mediaRecorder.current && isListeningRef.current) {
          stopListening();
        }
      }, 5000);

      toast({
        title: "Voice activated",
        description: "Listening... Speak now!",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      isListeningRef.current = false;
      setIsListening(false);

      const message = getVoiceErrorMessage(error);
      setVoiceError(message);

      toast({
        title: message.title,
        description: message.description,
        variant: "destructive",
      });
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    try {
      // Convert audio to base64
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result?.toString().split(',')[1];
        
        if (base64Audio) {
          // Send to speech-to-text function
          const { data, error } = await supabase.functions.invoke('voice-to-text', {
            body: { audio: base64Audio }
          });

          if (error) throw error;

          const userText = data.text;
          setTranscript(userText);

          // Send text to AI chat for response
          const { data: chatData, error: chatError } = await supabase.functions.invoke('chat', {
            body: { message: userText }
          });

          if (chatError) throw chatError;

          const aiResponse = chatData.response;

          // Convert AI response to speech
          await textToSpeech(aiResponse);
        }
      };
    } catch (error) {
      console.error('Error processing audio:', error);
      toast({
        title: "Error",
        description: "Failed to process audio",
        variant: "destructive",
      });
    }
  };

  const textToSpeech = async (text: string) => {
    try {
      setIsSpeaking(true);
      
      const { data, error } = await supabase.functions.invoke('text-to-speech', {
        body: { text, voice: 'alloy' }
      });

      if (error) throw error;

      // Play the audio
      if (data.audioContent) {
        const audioBlob = new Blob([
          Uint8Array.from(atob(data.audioContent), c => c.charCodeAt(0))
        ], { type: 'audio/mpeg' });
        
        const audioUrl = URL.createObjectURL(audioBlob);
        audioElement.current = new Audio(audioUrl);
        
        audioElement.current.onended = () => {
          setIsSpeaking(false);
          URL.revokeObjectURL(audioUrl);
        };
        
        await audioElement.current.play();
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error);
      setIsSpeaking(false);
      toast({
        title: "Error",
        description: "Failed to generate speech",
        variant: "destructive",
      });
    }
  };

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
      if (isListening) stopListening();
      if (isSpeaking) {
        audioElement.current?.pause();
        setIsSpeaking(false);
      }
      toast({
        title: "Disconnected",
        description: "Voice chat ended",
      });
    } else {
      setIsConnected(true);
      toast({
        title: "Connected",
        description: "Voice chat started! Tap the mic to speak.",
      });
    }
  };

  useEffect(() => {
    return () => {
      // Always release the microphone when the component unmounts, even if the
      // recorder was never explicitly stopped.
      if (isListeningRef.current) stopListening();
      if (audioElement.current) {
        audioElement.current.pause();
        audioElement.current = null;
      }
    };
  }, [stopListening]);

  return (
    <Card className="bg-white/95 backdrop-blur-md shadow-2xl border-0">
      <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 text-white">
        <CardTitle className="flex items-center gap-3 justify-center">
          <Volume2 className="h-6 w-6" />
          AI Voice Companion
          <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Microphone error */}
        {voiceError && (
          <div
            role="alert"
            aria-live="polite"
            className="flex flex-col gap-3 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800 dark:border-red-700 dark:bg-red-900/20 dark:text-red-200"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
              <div>
                <p className="font-semibold">{voiceError.title}</p>
                <p className="text-sm">{voiceError.description}</p>
              </div>
            </div>
            {onVoiceUnavailable && (
              <Button
                onClick={onVoiceUnavailable}
                variant="outline"
                className="self-start border-red-300 text-red-700 hover:bg-red-100 dark:border-red-700 dark:text-red-200"
              >
                Continue with text chat
              </Button>
            )}
          </div>
        )}

        {/* AI Avatar */}
        <div className="flex justify-center">
          <AIAvatar
            isListening={isListening}
            isSpeaking={isSpeaking}
            onToggleListening={isConnected ? (isListening ? stopListening : startListening) : undefined}
            mood={currentMood}
          />
        </div>

        {/* Transcript */}
        {transcript && (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">You said:</p>
            <p className="font-medium text-gray-800">{transcript}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={toggleConnection}
            className={`${isConnected 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
            } text-white px-6 py-3`}
          >
            {isConnected ? (
              <>
                <PhoneOff className="w-5 h-5 mr-2" />
                End Call
              </>
            ) : (
              <>
                <Phone className="w-5 h-5 mr-2" />
                Start Voice Chat
              </>
            )}
          </Button>

          {isConnected && (
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isSpeaking}
              className={`${isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
              } text-white px-6 py-3`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5 mr-2" />
                  Speak
                </>
              )}
            </Button>
          )}
        </div>

        {/* Status */}
        <div className="text-center text-sm text-gray-600">
          {!isConnected && "Click 'Start Voice Chat' to begin"}
          {isConnected && !isListening && !isSpeaking && "Tap 'Speak' to talk with AI"}
          {isListening && "🎤 Listening... Speak now!"}
          {isSpeaking && "🔊 AI is responding..."}
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceChat;
