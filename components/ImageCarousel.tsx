// import { TouchableWithoutFeedback } from '@gorhom/bottom-sheet';
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Modal,
//   Dimensions,
//   StyleSheet,
// } from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';

// const { width } = Dimensions.get('window');

// export default function ProductScreen() {
//   const images = [
//     'https://picsum.photos/800/800?1',
//     'https://picsum.photos/800/800?2',
//     'https://picsum.photos/800/800?3',
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);
//   const [galleryVisible, setGalleryVisible] = useState(false);

//   return (
//     <>
//       {/* SLIDER */}
//       <FlatList
//         data={images}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={(e) => {
//           const x = e.nativeEvent.contentOffset.x;
//           setActiveIndex(Math.round(x / width));
//         }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             activeOpacity={0.8}
//             onPress={() => setGalleryVisible(true)}
//             className="relative">
//             <Image source={{ uri: item }} style={{ width, height: 250 }} resizeMode="cover" />

//             {/* DOTS */}
//             <View style={styles.dotsWrapper}>
//               {images.map((_, index) => (
//                 <View
//                   key={index}
//                   style={[styles.dot, index === activeIndex && { backgroundColor: '#000' }]}
//                 />
//               ))}
//             </View>
//           </TouchableOpacity>
//         )}
//       />

//       {/* FULL SCREEN GALLERY */}
//       <Modal
//         style={{
//           flex: 1,
//           zIndex: 9999,
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: 'rgba(0, 0, 0,0.1)', // Semi-transparent overlay
//         }}
//         visible={galleryVisible}
//         transparent
//         animationType="fade"
//         onRequestClose={() => {
//           alert(1);
//         }}>
//         <View style={styles.modalBg}>
//           <FlatList
//             data={images}
//             horizontal
//             pagingEnabled
//             initialScrollIndex={activeIndex}
//             showsHorizontalScrollIndicator={false}
//             renderItem={({ item }) => (
//               <Image
//                 source={{ uri: item }}
//                 style={{ width, height: '100%' }}
//                 resizeMode="contain"
//               />
//             )}
//           />
//           <TouchableWithoutFeedback
//             style={styles.closeBtn}
//             onPress={() => setGalleryVisible(false)}>
//             <Text style={{ color: '#fff', fontSize: 18 }}>Zatvori</Text>
//           </TouchableWithoutFeedback>
//         </View>
//       </Modal>
//     </>
//   );
// }

// const styles = StyleSheet.create({
//   dotsWrapper: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     position: 'absolute',
//     zIndex: 1000,
//     bottom: 10,
//     left: width / 2 - 10,

//     marginVertical: 10,
//     gap: 6,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 10,
//     backgroundColor: 'white',
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginHorizontal: 16,
//     marginTop: 10,
//   },
//   price: {
//     fontSize: 20,
//     color: '#222',
//     marginHorizontal: 16,
//     marginTop: 4,
//   },
//   description: {
//     fontSize: 16,
//     color: '#555',
//     marginHorizontal: 16,
//     marginTop: 10,
//   },
//   modalBg: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0,0.1)', // Semi-transparent overlay
//   },
//   closeBtn: {
//     position: 'absolute',
//     top: 50,
//     right: 20,
//     padding: 10,
//   },
// });

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ANTHROPIC_API_KEY =
  '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';

type Verdict = 'REAL' | 'FAKE' | 'SUSPICIOUS';
type Severity = 'high' | 'medium' | 'low';

interface Signal {
  severity: Severity;
  label: string;
  detail: string;
}

interface ScanResult {
  verdict: Verdict;
  confidence: number;
  signals: Signal[];
  summary: string;
}

const SCAN_PROMPT = `You are an expert forensic image analyst. Analyze this image and determine if it is authentic/real, AI-generated, or digitally manipulated/fake.

Respond ONLY with a JSON object (no markdown, no backticks) with this exact structure:
{
  "verdict": "REAL" | "FAKE" | "SUSPICIOUS",
  "confidence": <number 0-100>,
  "signals": [
    { "severity": "high" | "medium" | "low", "label": "short signal name", "detail": "one sentence explanation" }
  ],
  "summary": "2-3 sentence plain-language summary of your findings"
}

Analyze for: AI generation artifacts (smooth textures, unnatural details, blurred backgrounds, perfect symmetry), copy-paste manipulation (inconsistent lighting/shadows, edge artifacts, perspective mismatches), compression inconsistencies, unnatural color grading, duplicate regions, facial distortions (if faces present). Be precise and objective.`;

export default function ImageScannerScreen() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<string>('image/jpeg');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library.');
      return;
    }

    const picked = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.85,
      base64: true,
    });

    if (!picked.canceled && picked.assets[0]) {
      const asset = picked.assets[0];
      setImageUri(asset.uri);
      setImageBase64(asset.base64 ?? null);
      setMediaType(asset.mimeType ?? 'image/jpeg');
      setResult(null);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow camera access.');
      return;
    }

    const photo = await ImagePicker.launchCameraAsync({
      quality: 0.85,
      base64: true,
    });

    if (!photo.canceled && photo.assets[0]) {
      const asset = photo.assets[0];
      setImageUri(asset.uri);
      setImageBase64(asset.base64 ?? null);
      setMediaType(asset.mimeType ?? 'image/jpeg');
      setResult(null);
    }
  };

  const scanImage = async () => {
    if (!imageBase64) return;
    setScanning(true);
    setResult(null);

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image',
                  source: {
                    type: 'base64',
                    media_type: mediaType,
                    data: imageBase64,
                  },
                },
                { type: 'text', text: SCAN_PROMPT },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      const text =
        data.content
          ?.filter((b: any) => b.type === 'text')
          .map((b: any) => b.text)
          .join('') ?? '';

      const parsed: ScanResult = JSON.parse(text.trim());
      setResult(parsed);
    } catch (err) {
      Alert.alert('Scan failed', 'Could not analyze the image. Please try again.');
      console.error(err);
    } finally {
      setScanning(false);
    }
  };

  const verdictColor = (v: Verdict) =>
    v === 'REAL' ? '#3B6D11' : v === 'FAKE' ? '#A32D2D' : '#854F0B';

  const verdictBg = (v: Verdict) =>
    v === 'REAL' ? '#EAF3DE' : v === 'FAKE' ? '#FCEBEB' : '#FAEEDA';

  const severityColor = (s: Severity) =>
    s === 'high' ? '#E24B4A' : s === 'medium' ? '#EF9F27' : '#639922';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Image authenticity scanner</Text>
      <Text style={styles.subtitle}>
        Detect AI-generated or manipulated images using visual forensics.
      </Text>

      {/* Image preview / pick zone */}
      <TouchableOpacity style={styles.uploadZone} onPress={pickImage} activeOpacity={0.7}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="contain" />
        ) : (
          <View style={styles.uploadPlaceholder}>
            <Text style={styles.uploadIcon}>🖼</Text>
            <Text style={styles.uploadLabel}>Tap to choose from library</Text>
            <Text style={styles.uploadSub}>or use the camera button below</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.btn, styles.btnOutline]} onPress={takePhoto}>
          <Text style={styles.btnText}>Take photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary, (!imageBase64 || scanning) && styles.btnDisabled]}
          onPress={scanImage}
          disabled={!imageBase64 || scanning}>
          {scanning ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={[styles.btnText, { color: '#fff' }]}>Scan image</Text>
          )}
        </TouchableOpacity>
      </View>

      {scanning && (
        <View style={styles.scanningCard}>
          <Text style={styles.scanningText}>Analyzing for visual anomalies...</Text>
          {[
            'Checking visual consistency',
            'Looking for compression artifacts',
            'Detecting AI generation patterns',
            'Analyzing metadata signals',
          ].map((s, i) => (
            <Text key={i} style={styles.scanStep}>
              · {s}
            </Text>
          ))}
        </View>
      )}

      {/* Result card */}
      {result && (
        <View style={styles.resultCard}>
          {/* Verdict header */}
          <View style={styles.resultHeader}>
            <View style={[styles.verdictBadge, { backgroundColor: verdictBg(result.verdict) }]}>
              <Text style={[styles.verdictText, { color: verdictColor(result.verdict) }]}>
                {result.verdict === 'REAL'
                  ? 'Likely authentic'
                  : result.verdict === 'FAKE'
                    ? 'Likely fake / manipulated'
                    : 'Suspicious'}
              </Text>
            </View>
            <Text style={styles.confidenceLabel}>{result.confidence}% confidence</Text>
          </View>

          {/* Confidence bar */}
          <View style={styles.barSection}>
            <View style={styles.barBg}>
              <View
                style={[
                  styles.barFill,
                  {
                    width: `${result.confidence}%` as any,
                    backgroundColor: verdictColor(result.verdict),
                  },
                ]}
              />
            </View>
          </View>

          {/* Signals */}
          <View style={styles.signalSection}>
            {result.signals.map((s, i) => (
              <View key={i} style={styles.signalRow}>
                <View style={[styles.signalDot, { backgroundColor: severityColor(s.severity) }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.signalLabel}>{s.label}</Text>
                  <Text style={styles.signalDetail}>{s.detail}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Summary */}
          <Text style={styles.summaryText}>{result.summary}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 22, fontWeight: '600', color: '#1a1a1a', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#666', lineHeight: 20, marginBottom: 20 },

  uploadZone: {
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    borderRadius: 12,
    overflow: 'hidden',
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  uploadPlaceholder: { alignItems: 'center', padding: 32 },
  uploadIcon: { fontSize: 36, marginBottom: 10 },
  uploadLabel: { fontSize: 15, fontWeight: '500', color: '#333', marginBottom: 4 },
  uploadSub: { fontSize: 13, color: '#888' },
  previewImage: { width: '100%', height: 260 },

  buttonRow: { flexDirection: 'row', gap: 10, marginTop: 14 },
  btn: {
    flex: 1,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnOutline: { borderWidth: 0.5, borderColor: '#bbb', backgroundColor: '#fff' },
  btnPrimary: { backgroundColor: '#1a1a1a' },
  btnDisabled: { opacity: 0.4 },
  btnText: { fontSize: 15, fontWeight: '500', color: '#1a1a1a' },

  scanningCard: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
  },
  scanningText: { fontSize: 14, fontWeight: '500', color: '#333', marginBottom: 8 },
  scanStep: { fontSize: 13, color: '#888', marginTop: 4 },

  resultCard: {
    marginTop: 20,
    borderWidth: 0.5,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  verdictBadge: { paddingHorizontal: 14, paddingVertical: 5, borderRadius: 20 },
  verdictText: { fontSize: 13, fontWeight: '500' },
  confidenceLabel: { fontSize: 13, color: '#888', marginLeft: 'auto' },

  barSection: { padding: 14, borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  barBg: { height: 8, backgroundColor: '#f0f0f0', borderRadius: 4, overflow: 'hidden' },
  barFill: { height: 8, borderRadius: 4 },

  signalSection: { padding: 14, gap: 12, borderBottomWidth: 0.5, borderBottomColor: '#e0e0e0' },
  signalRow: { flexDirection: 'row', gap: 10, alignItems: 'flex-start' },
  signalDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  signalLabel: { fontSize: 14, fontWeight: '500', color: '#1a1a1a' },
  signalDetail: { fontSize: 13, color: '#666', marginTop: 2, lineHeight: 18 },
  summaryText: { padding: 14, fontSize: 14, color: '#555', lineHeight: 20 },
});
