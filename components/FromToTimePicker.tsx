import { View, Text, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TimerPickerModal } from 'react-native-timer-picker';
import { FromToTimePickerprops } from '~/models/props-models';

const FromToTimePicker = ({ onChangeFrom, value, label }: FromToTimePickerprops) => {
  const [showPicker, setShowPicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState({ from: 9, to: 17 });
  const [isSelectFrom, setIsSelectFrom] = useState(true);
  const [initialValue, setInitialValue] = useState(9);

  useEffect(() => {
    setSelectedTime(value);
  }, [value]);
  return (
    <>
      <Text className="mb-[0px] font-regular text-[18px]">{label}</Text>
      <View className=" flex-row  gap-[8px]">
        <Pressable
          onPress={() => {
            setIsSelectFrom(true);
            setInitialValue(selectedTime.from);
            setShowPicker(true);
          }}
          className="items-center justify-center rounded-[8px] border bg-[white]  p-[15px] text-[16px]"
          style={{ flexGrow: 2 }}>
          <Text className="text-[16px]">{selectedTime.from}:00</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            setIsSelectFrom(false);
            setInitialValue(selectedTime.to);
            setShowPicker(true);
          }}
          className="items-center justify-center rounded-[8px] border bg-[white] p-[15px] text-[16px]"
          style={{ flexGrow: 2 }}>
          <Text className="text-[16px]">{selectedTime.to}:00</Text>
        </Pressable>
      </View>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={(visible) => setShowPicker(visible)}
        onConfirm={(pickedDuration) => {
          setShowPicker(false);
          const updatedSelectedTime = {
            from: isSelectFrom ? pickedDuration.hours : selectedTime.from,
            to: !isSelectFrom ? pickedDuration.hours : selectedTime.to,
          };
          setSelectedTime({
            ...selectedTime,
            from: updatedSelectedTime.from,
            to: updatedSelectedTime.to,
          });

          onChangeFrom(updatedSelectedTime);
        }}
        modalTitle=""
        onCancel={() => {}}
        hideSeconds
        hideMinutes
        initialValue={{ hours: initialValue }}
        minuteInterval={15}
        hourLimit={{ min: 9 }}
        closeOnOverlayPress
        styles={{}}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </>
  );
};

export default FromToTimePicker;
