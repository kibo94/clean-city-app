import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import CustomButton from '../CustomButton';
import { AntDesign } from '@expo/vector-icons';
import Foundation from '@expo/vector-icons/Foundation';
import RoundedButton from '../RoundedButton';
import { DefaultPopUpPropsModel } from '~/models/props';

const InfoPopup = ({
  icon = <Foundation name="info" size={24} color="red" />,
  closeModal,
  message,
  onDone,
}: DefaultPopUpPropsModel) => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View style={{ position: 'absolute', right: 20, top: 20 }}>
          <RoundedButton
            onPress={closeModal}
            icon={<AntDesign name="close" size={24} color="black" />}
          />
        </View>
        <Foundation name="info" size={70} color="#E92F44" />,
        <Text className="font-font-regular mb-[20px]  mt-[10px] w-[180px] w-[230px] text-center text-[18px]">
          {message}
        </Text>
        <View className="w-[120px]">
          <CustomButton
            text="Uredu"
            onPress={() => {
              if (onDone) {
                onDone();
              }
              closeModal();
            }}
          />
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
export default InfoPopup;
