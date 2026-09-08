import { apikey } from "~/constants/app";

const API_KEY =
  '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';

export interface ImageAnalysisResult {
  status: string; // real / fake / ai-generated / edited / unknown
  confidence?: string;
  description: string;
  manipulationHints?: string[];
  similarityNote?: string;
}

export async function analyzeImage(imageUrl: string): Promise<ImageAnalysisResult> {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apikey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a forensic AI image analyst. 
                Your job is to analyze images and determine:
                - if image is real, fake, AI-generated, or heavily edited
                - describe what is in the image
                - detect manipulation signs (lighting issues, artifacts, distortions)
                - estimate if similar images likely exist online
                
                Respond in STRICT JSON format only:
                {
                  "status": "real | fake | ai-generated | edited | unknown",
                  "confidence": "low | medium | high",
                  "description": "...",
                  "manipulationHints": ["...", "..."],
                  "similarityNote": "..."
                }`,
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Analyze this image carefully and return structured forensic result.',
              },
              {
                type: 'image_url',
                image_url: {
                  url: imageUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 800,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message || 'Image analysis failed');
    }

    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('Empty response from model');
    }

    // Try parse JSON safely
    try {
      console.log(JSON.parse(content));
      return JSON.parse(content);
    } catch {
      // fallback if model breaks JSON format
      return {
        status: 'unknown',
        confidence: 'low',
        description: content,
        manipulationHints: [],
        similarityNote: 'Could not parse structured result',
      };
    }
  } catch (err: any) {
    return {
      status: 'unknown',
      confidence: 'low',
      description: `Error: ${err.message}`,
      manipulationHints: [],
      similarityNote: '',
    };
  }
}
