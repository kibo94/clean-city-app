import { Text, TouchableOpacity, View } from 'react-native';

interface CustomButtonProps {
  text: string;
  onPress: () => void;
  styles?: object;
  isGohst?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  textStyles?: object;
}

const CustomButton = ({
  text,
  onPress,
  styles = {},
  isGohst = false,
  disabled = false,
  textStyles = {},
  icon = null,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => onPress()}
      className={`mt-4 ${isGohst ? 'bg-[white]' : 'bg-action'} w-full ${
        isGohst && 'border-actionBlue border'
      } flex-row items-center justify-center`}
      style={{
        borderRadius: 50,
        ...styles,
      }}>
      {icon && <View className="mr-2">{icon}</View>}
      <Text
        style={{ ...textStyles }}
        className={`${
          isGohst ? 'black' : 'text-[white]'
        } p-[15px] text-center font-regular text-[16px]`}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
