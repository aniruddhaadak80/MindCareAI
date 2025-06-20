
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, riskLevel } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a crisis intervention AI assistant trained in mental health support. Analyze this message for crisis indicators and provide appropriate support:

Message: "${message}"
Current Risk Level: ${riskLevel || 'Unknown'}

IMPORTANT: If you detect ANY signs of self-harm, suicide ideation, or immediate danger, include crisis resources immediately.

Provide:
1. Risk assessment (Low/Moderate/High/Crisis)
2. Immediate safety strategies
3. Grounding techniques for right now
4. Crisis resources and hotlines
5. Professional help recommendations
6. Follow-up care suggestions
7. Supportive, non-judgmental response

Always prioritize safety and encourage professional help when appropriate. Be compassionate and understanding.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,
          topK: 20,
          topP: 0.8,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();
    const support = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Please reach out to a mental health professional or crisis hotline immediately.';

    return new Response(JSON.stringify({ support }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in crisis-intervention function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
