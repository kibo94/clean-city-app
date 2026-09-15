import { Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const RoundedButton = ({
  onPress = () => {},
  bgColor = 'white',
  textColor = 'black',
  icon = <Feather name="arrow-up-right" size={24} color={textColor} />,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
      }}
      className="h-[40] w-[40] items-center  justify-center rounded-full"
      style={{
        backgroundColor: bgColor,
        zIndex: 2,
        borderWidth: 0.5,
        borderColor: 'rgba(151,30,44,0.2)',
      }}>
      {icon}
    </TouchableOpacity>
  );
};

export default RoundedButton;
