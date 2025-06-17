
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a compassionate AI mental health companion specializing in emotional support and guidance. Your role is to:

1. Provide empathetic, non-judgmental listening
2. Offer gentle guidance and coping strategies
3. Validate feelings and experiences
4. Suggest healthy coping mechanisms
5. Encourage professional help when appropriate
6. Never attempt to diagnose or provide medical advice
7. Always prioritize user safety and well-being

Remember: If someone expresses thoughts of self-harm or suicide, immediately encourage them to contact emergency services (988 in the US) or a mental health crisis line.

Keep responses supportive, warm, and conversational. Focus on understanding and helping the person process their emotions.

User message: ${message}`
          }]
        }],
        generationConfig: {
          temperature: 0.8,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
          candidateCount: 1,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      }),
    });

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const aiResponse = data.candidates[0].content.parts[0].text;
      
      return new Response(JSON.stringify({ response: aiResponse }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      console.error('Invalid response structure:', data);
      throw new Error('Invalid response from Gemini API');
    }
  } catch (error) {
    console.error('Error in chat function:', error);
    
    // Fallback response
    const fallbackResponse = "I understand you're reaching out for support. While I'm here to listen and help, please remember that if you're experiencing a mental health crisis, it's important to contact a professional immediately. You can reach the 988 Suicide & Crisis Lifeline anytime. How can I support you today?";
    
    return new Response(JSON.stringify({ response: fallbackResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
