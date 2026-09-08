import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import RoundedButton from '../RoundedButton';
import { AntDesign } from '@expo/vector-icons';
import { CustomPopUpPropsModel } from '~/models/props';

const CustomPopUp = ({ icon, closeModal, message, component }: CustomPopUpPropsModel) => {
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
        <Text className="font-font-regular mb-[20px]  mt-[10px] w-[180px] w-[200px] text-center text-[18px]">
          {message}
        </Text>

        {component}
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 0,
    alignItems: 'center',
    backgroundColor: 'blue', // Semi-transparent overlay
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '85%', // Set modal width
  },
});
export default CustomPopUp;
