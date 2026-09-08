import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

type Role = 'user' | 'assistant';

interface Message {
  id: string;
  role: Role;
  text?: string;
  image?: string;
  timestamp: Date;
}

export default function OpenAIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const scrollToBottom = () =>
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 80);

  // ---------------- TEXT CHAT ----------------
  const sendMessage = async () => {
    const prompt = input.trim();
    if (!prompt || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: prompt,
      timestamp: new Date(),
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    scrollToBottom();

    const isImageRequest =
      prompt.toLowerCase().includes('image') || prompt.toLowerCase().includes('generate image');

    try {
      if (isImageRequest) {
        await generateImage(prompt);
        return;
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            ...updated.map((m) => ({
              role: m.role,
              content: m.text || '',
            })),
          ],
          max_tokens: 800,
        }),
      });

      const data = await response.json();

      const reply = data?.choices?.[0]?.message?.content ?? 'No response received.';

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: reply,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      scrollToBottom();
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          text: `Error: ${err.message}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- IMAGE GENERATION ----------------
  const generateImage = async (prompt: string) => {
    alert('Generating image... This may take a few seconds.');
    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          size: '1024x1024',
        }),
      });

      const data = await response.json();

      const imageUrl = data?.data?.[0]?.url;
      alert(imageUrl ? 'Image generated!' : 'Failed to generate image.');

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: prompt,
        image: imageUrl,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      scrollToBottom();
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          text: `Image error: ${err.message}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Assistant</Text>

        {messages.length > 0 && (
          <TouchableOpacity onPress={clearChat} style={styles.clearBtn}>
            <Text style={styles.clearBtnText}>Clear</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* MESSAGES */}
      <ScrollView
        ref={scrollRef}
        style={styles.messageList}
        contentContainerStyle={styles.messageContent}>
        {messages.length === 0 && (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Start chatting or generate images</Text>
          </View>
        )}

        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[styles.messageRow, msg.role === 'user' ? styles.userRow : styles.assistantRow]}>
            <View
              style={[
                styles.bubble,
                msg.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}>
              {msg.text && (
                <Text
                  style={[
                    styles.text,
                    msg.role === 'user' ? styles.userText : styles.assistantText,
                  ]}>
                  {msg.text}
                </Text>
              )}

              {msg.image && <Image source={{ uri: msg.image }} style={styles.image} />}

              <Text style={styles.time}>{formatTime(msg.timestamp)}</Text>
            </View>
          </View>
        ))}

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
            <Text style={{ marginLeft: 8 }}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      {/* INPUT */}
      <View style={styles.inputBar}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type message or 'generate image of a cat'"
          style={styles.input}
          multiline
        />

        <TouchableOpacity
          onPress={sendMessage}
          disabled={!input.trim() || loading}
          style={styles.sendBtn}>
          <Text style={{ color: '#fff' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

// ---------------- STYLES ----------------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  header: {
    padding: 15,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: { fontSize: 16, fontWeight: '600' },

  clearBtn: { padding: 6 },
  clearBtnText: { color: 'red' },

  messageList: { flex: 1 },
  messageContent: { padding: 12 },

  empty: { marginTop: 50, alignItems: 'center' },
  emptyTitle: { color: '#888' },

  messageRow: { marginVertical: 6 },
  userRow: { alignItems: 'flex-end' },
  assistantRow: { alignItems: 'flex-start' },

  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
  },

  userBubble: { backgroundColor: '#000' },
  assistantBubble: { backgroundColor: '#eee' },

  text: { fontSize: 15 },
  userText: { color: '#fff' },
  assistantText: { color: '#000' },

  image: {
    width: 220,
    height: 220,
    marginTop: 8,
    borderRadius: 12,
  },

  time: { fontSize: 10, marginTop: 4, color: '#999' },

  loading: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  inputBar: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 0.5,
  },

  input: {
    flex: 1,
    borderWidth: 0.5,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  sendBtn: {
    marginLeft: 8,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    justifyContent: 'center',
    borderRadius: 20,
  },
});
