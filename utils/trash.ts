import { extractJSON } from "./util";

const analyzeTrash = async (imgUrl: string | null) => {
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
                        content: `You are an AI specialized in garbage detection AND image authenticity verification.

Analyze the image and return ONLY valid JSON in this exact format:

{
  "containsTrash": true | false,
  "trashPercentage": 0-100,
  "confidence": 0-100,
  "description": "short description of what you see",
  "indoor": true | false,
  "isRealPhoto": true | false,
  "fakeReason": "short explanation why fake (if any)"
}

TRASH RULES:
- Large pile of trash → 60–100
- Small bits of litter → 10–40
- Mostly clean → 0–5

ENVIRONMENT:
- If OUTDOOR → containsTrash = true if trashPercentage > 5, confidence +10..30
- If INDOOR → containsTrash = false unless trash visibly present
- Indoor does NOT guarantee no trash

IMAGE AUTHENTICITY CHECK:
"isRealPhoto" must be TRUE only if:
- The photo is taken with a real camera (phone or real device)
- It is not a screenshot
- It is not a photo of a PC or phone displaying an image
- It is not AI-generated
- It is not edited or digitally composed
- It is not a re-upload of identical trash background

Detect fake images using:
- Screen reflections
- Visible phone/monitor bezels
- Consistent camera noise + real lens distortion
- Light artifacts
- Pixel patterns from digital images
- Unrealistic textures (AI artifacts)

FAKE RULES:
Set "isRealPhoto": false if:
- A phone or computer screen is visible
- The photo is a screenshot
- The image looks AI-generated (smooth textures, melted edges, distorted text)
- The image is reused from earlier examples
- The framing matches typical desktop wallpaper or downloaded images

ALWAYS FOLLOW:
- Return ONLY valid JSON
- No extra text, no explanations outside JSON
- All numbers 0–100
`,
                    },
                    {
                        role: 'user',
                        content: [
                            {
                                type: 'image_url',
                                image_url: {
                                    url: `${imgUrl}`,
                                },
                            },
                        ],
                    },
                ],
            }),
        });

        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;

        const json = extractJSON(content);
        console.log('Extracted JSON:', json);
        return json
        // setTrashResult(JSON.parse(content));
    } catch (err) {
        console.log('Error analyzing:', err);
        alert('Failed to analyze image.');
        return err;
    }

    // setLoading(false);
    // scanAnim.setValue(0);
};

export {
    analyzeTrash
}
