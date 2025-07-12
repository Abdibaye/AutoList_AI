import { NextRequest, NextResponse } from 'next/server';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

interface GenerateRequest {
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  features: string;
  tone: string;
}

interface GeminiContent {
  parts: Array<{
    text: string;
  }>;
}

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

function createPrompt(form: GenerateRequest): string {
  const toneInstructions = {
    professional: "Use a professional, business-like tone with formal language",
    hype: "Use an exciting, energetic tone with exclamation marks and enthusiastic language",
    chill: "Use a relaxed, casual tone with friendly and laid-back language",
    luxury: "Use an elegant, sophisticated tone with premium and exclusive language"
  };

  return `You are a real estate marketing expert. Generate social media content for a property listing with the following details:

Property Details:
- Title: ${form.title}
- Price: ${form.price}
- Location: ${form.location}
- Bedrooms: ${form.bedrooms}
- Bathrooms: ${form.bathrooms}
- Features: ${form.features}
- Tone: ${toneInstructions[form.tone as keyof typeof toneInstructions]}

Generate content for 4 different social media platforms. Return ONLY a JSON object with these exact keys:
- instagram: Instagram post (include relevant emojis, hashtags, and line breaks)
- facebook: Facebook post (more detailed, community-focused)
- twitter: Twitter post (concise, under 280 characters, include hashtags)
- linkedin: LinkedIn post (professional, business-focused)

Format your response as a valid JSON object with no additional text or explanation.`;
}

async function generateWithGemini(prompt: string): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key not configured');
  }

  const requestBody: GeminiRequest = {
    contents: [
      {
        parts: [
          {
            text: 'You are a helpful assistant that generates real estate marketing content. Always respond with valid JSON only.'
          },
          {
            text: prompt
          }
        ]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 1000
    }
  };

  const url = `${GEMINI_BASE_URL}?key=${GEMINI_API_KEY}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
  }

  const data: GeminiResponse = await response.json();
  return data.candidates[0]?.content?.parts[0]?.text || '';
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateRequest = await request.json();

    // Validate required fields
    if (!body.title || !body.price || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields: title, price, location' },
        { status: 400 }
      );
    }

    const prompt = createPrompt(body);
    const aiResponse = await generateWithGemini(prompt);

    // Parse the AI response as JSON
    let parsedContent;
    try {
      // Clean the response in case there's extra text
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }
      parsedContent = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiResponse);
      throw new Error('Invalid response format from AI');
    }

    // Validate the response structure
    const requiredPlatforms = ['instagram', 'facebook', 'twitter', 'linkedin'];
    for (const platform of requiredPlatforms) {
      if (!parsedContent[platform] || typeof parsedContent[platform] !== 'string') {
        throw new Error(`Missing or invalid content for platform: ${platform}`);
      }
    }

    return NextResponse.json(parsedContent);

  } catch (error) {
    console.error('Content generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 