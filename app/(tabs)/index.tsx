import { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  PermissionsAndroid,
  Platform,
  Animated,
  Easing,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchCamera } from 'react-native-image-picker';

import CustomButton from '~/components/CustomButton';
import { apikey } from '~/constants/app';
import { getAuth } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import PostCard from '~/components/PostCard';
import { useTranslation } from 'react-i18next';
const Home = () => {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState<'pending' | 'accepted' | 'declined'>(
    'pending'
  );
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [trashResult, setTrashResult] = useState(null);
  const [isRealPhoto, setIsRealPhoto] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const scanAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    requestImagePermission();
    getMyPosts();
  }, []);

  useEffect(() => {
    setVisiblePosts(posts.filter((post) => post.status === selectedStatus));
  }, [posts, selectedStatus]);

  const requestImagePermission = async () => {
    if (Platform.OS !== 'android') return true;

    try {
      if (Platform.Version >= 33) {
        return (
          (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) ===
          PermissionsAndroid.RESULTS.GRANTED
        );
      }

      return (
        (await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA)) ===
        PermissionsAndroid.RESULTS.GRANTED
      );
    } catch (err) {
      console.warn('Permission error:', err);
      return false;
    }
  };

  const takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,

        quality: 0.7,
      },
      (response) => {
        if (response.didCancel || !response.assets?.[0]) return;

        const asset = response.assets[0];
        const base64Image = `data:${asset.type};base64,${asset.base64}`;

        setImage(base64Image);

        startScanAnimation();
      }
    );
  };

  const startScanAnimation = () => {
    setLoading(true);
    Animated.timing(scanAnim, {
      toValue: 1,
      duration: 2200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {});
  };

  function extractJSON(text: string) {
    try {
      const match = text.match(/\{[\s\S]*\}/);
      return JSON.parse(match[0]);
    } catch {
      return null;
    }
  }
  // useEffect(() => {
  //   if (image) {
  //     analyzeTrash(image);
  //   }
  // }, [image]);

  const getMyPosts = async () => {
    try {
      const user = getAuth().currentUser;

      if (!user?.email) return;

      const snapshot = await firestore()
        .collection('posts')
        .where('creator', '==', user.email)
        .get();

      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);
    } catch (error) {
      console.error('Error getting posts:', error);
    }
  };

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
      setTrashResult(JSON.parse(content));
    } catch (err) {
      console.log('Error analyzing:', err);
      alert('Failed to analyze image.');
    }

    setLoading(false);
    scanAnim.setValue(0);
  };

  const scanTranslate = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const statusTabs = [
    { value: 'pending' as const, label: t('reports.pending') },
    { value: 'accepted' as const, label: t('reports.accepted') },
    { value: 'declined' as const, label: t('reports.declined') },
  ];

  return (
    <SafeAreaView className="w-full flex-1 bg-white">
      {/* TITLE */}
      <View
        className="absolute left-0 right-0 top-0 z-20 bg-white px-4 pb-3 pt-2"
        style={{
          zIndex: 20,
          elevation: 20,
        }}>
        <View className="w-full flex-row rounded-full bg-[#EEF0F2] p-1">
          {statusTabs.map((tab) => {
            const postCount = posts.filter((post) => post.status === tab.value).length;

            return (
              <Pressable
                key={tab.value}
                onPress={() => setSelectedStatus(tab.value)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal: 8,
                  paddingVertical: 12,
                  borderRadius: 999,
                  backgroundColor: tab.value === selectedStatus ? '#000000' : 'transparent',
                  ...(tab.value === selectedStatus
                    ? {
                        shadowColor: '#000000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.12,
                        shadowRadius: 4,
                        elevation: 2,
                      }
                    : {}),
                }}>
                <View className="flex-row items-center">
                  <Text
                    style={{
                      color: tab.value === selectedStatus ? '#FFFFFF' : '#667085',
                      fontWeight: '600',
                      fontSize: 12,
                    }}>
                    {tab.label}
                  </Text>
                  <View
                    style={{
                      marginLeft: 6,
                      minWidth: 22,
                      alignItems: 'center',
                      borderRadius: 999,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      backgroundColor: tab.value === selectedStatus ? '#FFFFFF' : '#D9DEE5',
                    }}>
                    <Text
                      style={{
                        color: tab.value === selectedStatus ? '#000000' : '#667085',
                        fontSize: 12,
                        fontWeight: '700',
                      }}>
                      {postCount}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <FlatList
        data={visiblePosts}
        keyExtractor={(item) => item.id}
        className="w-full"
        contentContainerStyle={{ paddingTop: 76, paddingHorizontal: 16, paddingBottom: 140 }}
        ListEmptyComponent={
          <Text className="mt-10 text-center text-gray-500">{t('reports.empty')}</Text>
        }
        renderItem={({ item }) => <PostCard post={item} />}
      />

      {/* RESULTS */}
      {trashResult && !loading && (
        <View className="mt-6 w-72 rounded-xl bg-gray-50 p-4 shadow">
          <Text className="font-bold text-lg">Result</Text>

          {trashResult && (
            <>
              {/* <Text className="mt-2 text-gray-700">
                🗑 Contains Trash: <Text className="font-bold">{trashResult.confidence}%</Text>
              </Text> */}

              <Text className="mt-2 text-gray-700">
                ✔ Trash Detected:{' '}
                <Text className="font-bold">{trashResult.isRealPhoto ? 'Yes' : 'No'}</Text>
              </Text>

              <Text className="mt-2 text-gray-500">{trashResult.description}</Text>
            </>
          )}

          {trashResult?.error && <Text className="mt-2 text-red-400">Analysis failed.</Text>}
        </View>
      )}

      {/* RETAKE BUTTON */}
      {image && !loading && <CustomButton text="Retake Photo" onPress={() => setImage(null)} />}
    </SafeAreaView>
  );
};

export default Home;
