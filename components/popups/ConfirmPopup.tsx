import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { AntDesign } from '@expo/vector-icons';
import RoundedButton from '../RoundedButton';
import { DefaultPopUpPropsModel } from '~/models/props';

const ConfirmPopup = ({ icon, closeModal, message, onDone }: DefaultPopUpPropsModel) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View style={{ position: 'absolute', right: 20, top: 20 }}>
          <RoundedButton
            onPress={closeModal}
            icon={<AntDesign name="close" size={24} color="black" />}
          />
        </View>
        {icon}
        <Text className="font-font-regular  mb-[20px] mt-[30px] w-[200px] text-center text-[18px] ">
          {message}
        </Text>
        <View className="flex-row gap-[12px]">
          <View className="w-[120px]">
            <CustomButton text="Da" onPress={onDone!} styles={{ backgroundColor: 'green' }} />
          </View>
          <View className="w-[120px] ">
            <CustomButton text="Ne" onPress={closeModal} styles={{ backgroundColor: 'red' }} />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent overlay
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 30,
    borderRadius: 20,
    width: '85%', // Set modal width
  },
});
export default ConfirmPopup;
