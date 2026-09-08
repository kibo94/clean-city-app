import { Modal, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import InfoPopup from './InfoPopup';
import ConfirmPopup from './ConfirmPopup';
import CustomPopUp from './CustomPopUp';
import { GeneralModalModel } from '~/models/modal';

const GeneralPopup = ({
  onDone,
  type,
  onClose,
  message,
  icon,
  component,
  show,
}: GeneralModalModel) => {
  const closeModal = () => {
    if (onClose) {
      onClose();
    }
  };
  let popup;

  switch (type) {
    case 'info': {
      popup = <InfoPopup closeModal={closeModal} icon={icon} message={message} onDone={onDone} />;
      break;
    }
    case 'confirm': {
      popup = (
        <ConfirmPopup onDone={onDone} closeModal={closeModal} icon={icon} message={message} />
      );

      break;
    }

    case 'custom': {
      popup = (
        <CustomPopUp message={message} component={component} closeModal={closeModal} icon={icon} />
      );
      break;
    }
  }

  return (
    <Modal
      transparent={true}
      onRequestClose={closeModal}
      visible={show}
      className="items-center"
      style={{ backgroundColor: 'red', borderRadius: 20 }}>
      <TouchableWithoutFeedback onPress={closeModal} className="items-center justify-center">
        <View style={styles.modalOverlay}>{popup}</View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0,0.1)', // Semi-transparent overlay
  },
});

export default GeneralPopup;
