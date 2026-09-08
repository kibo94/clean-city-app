import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const StickyFooter = ({ children, backgroundColor = 'transparent', offset = 0 }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        width: '100%',
        position: 'absolute',
        left: 0,
        bottom: insets.bottom + offset,
        zIndex: 1200,
        backgroundColor: backgroundColor,
        padding: 10,
        paddingVertical: 5,
      }}>
      {children}
    </View>
  );
};

export default StickyFooter;
