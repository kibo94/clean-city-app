import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { getAuth, signOut } from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import useAuth from '~/hooks/useAuth';
import useUserData from '~/hooks/useUserData';
import StickyFooter from '~/components/StickyFooter';
import HeaderSecondary from '~/components/HeaderSecondary';

const Profile = () => {
  const { user } = useAuth();
  const { userData } = useUserData();
  const { t } = useTranslation();

  const signOutHandler = () => {
    signOut(getAuth()).then(() => console.log('User signed out!'));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderSecondary title={t('profile.profile')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>{user?.email?.[0]?.toUpperCase() || 'U'}</Text>
          </View>

          <Text style={styles.name}>{user?.displayName || 'Korisnik'}</Text>
          <Text style={styles.email}>{user?.email || 'email@example.com'}</Text>

          <View style={styles.pointsRow}>
            <View style={styles.pointsBadge}>
              <FontAwesome6 name="coins" size={18} color="#F59E0B" />
              <Text style={styles.pointsText}>{userData?.points ?? 0} poena</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <StickyFooter>
        <TouchableOpacity style={styles.primaryButton} onPress={signOutHandler} activeOpacity={0.9}>
          <Text style={styles.primaryButtonText}>{t('profile.signOut')}</Text>
        </TouchableOpacity>
      </StickyFooter>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    height: '100%',
    position: 'relative',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 40,
  },
  headerBar: {
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#171717',
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 22,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarWrap: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: '#D9F7E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 34,
    fontWeight: '700',
    color: '#0F172A',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#171717',
  },
  email: {
    marginTop: 4,
    fontSize: 15,
    color: '#4B5563',
  },
  pointsRow: {
    marginTop: 18,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF7E5',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
  },
  pointsText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#B45309',
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#171717',
    marginBottom: 12,
  },
  langRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  langButtonActive: {
    backgroundColor: '#111827',
    borderColor: '#111827',
  },
  langFlag: {
    fontSize: 18,
    marginRight: 8,
  },
  langText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600',
  },
  langTextActive: {
    color: '#FFFFFF',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 15,
    color: '#111827',
    flexShrink: 1,
  },
  primaryButton: {
    backgroundColor: '#111827',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Profile;
