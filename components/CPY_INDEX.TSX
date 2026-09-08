import { Dimensions, Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Animated, { CSSAnimationKeyframes, useAnimatedStyle } from 'react-native-reanimated';

import CustomButton from '~/components/CustomButton';
import { apikey } from '~/constants/app';
import { useState } from 'react';
const { width } = Dimensions.get('window');
const image =
  'https://images.stockcake.com/public/c/3/3/c3396e77-f802-4b05-9df4-bf146215990e_large/overflowing-trash-bin-stockcake.jpg';
const image2 =
  'data:image/jpeg;base64,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';

const image3 =
  'data:image/jpeg;base64,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  ';
const Home = () => {
  const pulse: CSSAnimationKeyframes = {
    from: {
      transform: [{ scale: 1 }, { rotate: '-0deg' }],
    },
    to: {
      transform: [{ scale: 2 }, { rotate: '360deg' }],
    },
  };

  const [reason, setReason] = useState('');
  const [simularity, setSimilarity] = useState('');
  const [score, setScore] = useState(0);

  async function analyzeImage(imageUrl: string) {
    alert('Analyzing image... This may take a few seconds.');
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
      console.log(data);

      if (!response.ok) {
        throw new Error(data?.error?.message || 'Image analysis failed');
      }

      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from model');
      }

      // Try parse JSON safely
      try {
        return JSON.parse(content);
      } catch {
        console.error('Error analyzing image:', err);
      }
    } catch (err: any) {
      console.error('Error analyzing image:', err);
    }
  }

  async function compareImages() {
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
              content: `
You are an advanced image similarity and duplicate detection system.

Your job is to compare TWO images and determine:
- whether they show the same object/scene/content
- whether one is a crop, edit, filter, or variation of the other
- whether they are completely different

Focus on:
- objects
- environment
- composition
- visual elements
- layout

Return ONLY strict JSON:

{
  "isDuplicate": true | false,
  "similarity": "low | medium | high | identical",
  "score": 0-100,
  "reason": "...",
  "differences": ["...", "..."]
}
          `.trim(),
            },
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: 'Compare these two images and detect if they are duplicates or visually similar in percentage.',
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: 'C:\Users\Bojan Adera\Desktop\WhatsApp Image 2026-04-15 at 18.31.06.jpeg',
                  },
                },
                {
                  type: 'image_url',
                  image_url: {
                    url: 'C:\Users\Bojan Adera\Desktop\react-native-starter\assets\ai\garbage1.png',
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
        throw new Error(data?.error?.message || 'Image comparison failed');
      }

      const content = data?.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Empty response from model');
      }

      try {
        const result = JSON.parse(content);
        setReason(result.reason);
        setSimilarity(result.similarity);
        setScore(result.score);
      } catch (err) {
        console.error('JSON parse error:', err);
      }
    } catch (err) {
      console.error('Error comparing images:', err);
    }
  }
  return (
    <SafeAreaView className="relative h-full items-center  bg-[white]">
      {/* <TabViewExample /> */}
      <View className="flex-row">
        <Image
          src={'C:\Users\Bojan Adera\Desktop\WhatsApp Image 2026-04-15 at 18.31.06.jpeg'}
          style={{ width: '50%', height: 150, marginBottom: 20 }}
        />
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRta1KwEif7FQ8GMrUD3uUhEJ0_6bB6WFPpbg&s',
          }}
          style={{ width: '50%', height: 150, marginBottom: 20 }}
        />
      </View>
      {/* <CustomButton onPress={() => analyzeImage(image)} text="Analiziraj sliku" /> */}
      <CustomButton onPress={() => compareImages()} text="Uprredi  slike" />
      <Text className="mt-4 font-bold text-lg">Similarity: {simularity}</Text>
      <Text className="mt-2 font-bold text-lg">Reason: {reason}</Text>
      <Text className="mt-2 font-bold text-lg">Score: {score}</Text>
    </SafeAreaView>
  );
};

export default Home;
