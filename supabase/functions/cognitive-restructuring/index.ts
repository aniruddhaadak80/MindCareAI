
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
    const { thought, situation } = await req.json();
    
    const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
    }

    const prompt = `You are a cognitive restructuring specialist. Help identify and reframe negative thought patterns using CBT techniques.

Negative Thought: "${thought}"
Situation: "${situation || 'Not specified'}"

Provide a comprehensive cognitive restructuring analysis:

1. **Cognitive Distortions Identified:**
   - List specific distortions (all-or-nothing thinking, catastrophizing, etc.)
   - Explain how each applies to this thought

2. **Evidence Examination:**
   - Evidence supporting this thought
   - Evidence against this thought
   - Alternative perspectives

3. **Balanced Thought Reframes:**
   - 3-5 more balanced, realistic thoughts
   - Rate each reframe for believability (1-10)

4. **Behavioral Experiments:**
   - Actions to test the validity of thoughts
   - Data collection suggestions

5. **Coping Strategies:**
   - Immediate techniques when this thought occurs
   - Long-term pattern interruption methods

6. **Follow-up Questions:**
   - Questions to explore this pattern deeper

Make it practical, actionable, and empowering.`;

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
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    const data = await response.json();
    const restructuring = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Unable to process cognitive restructuring at this time.';

    return new Response(JSON.stringify({ restructuring }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in cognitive-restructuring function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
