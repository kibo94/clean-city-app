import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

const SettingsSection = ({ item }) => {
  const openScreen = (screen: string | null) => {
    if (!screen) return;
    router.push(screen);
  };
  return (
    <TouchableOpacity
      key={item.title}
      style={styles.listItem}
      activeOpacity={0.8}
      onPress={() => openScreen(item.screen)}>
      <View style={styles.itemLeft}>
        <View style={styles.iconWrap}>{item.icon}</View>
        <Text style={styles.itemText}>{item.title}</Text>
      </View>
      <Feather name="chevron-right" size={26} color="#1F1F1F" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemText: {
    fontSize: 17,
    color: '#171717',
    fontWeight: '500',
  },
});

export default SettingsSection;
