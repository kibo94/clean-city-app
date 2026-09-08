import { Timestamp } from '@react-native-firebase/firestore';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, FlatList, Pressable, View } from 'react-native';
import { isAppoitmentDisabled, isFinihedAppointment } from '~/utils/appoitmentUtil';

const currentDay = new Date().getDate();
const curentmonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

const TimePicker = ({ currentDate, handlePresentModalPress, appoitments, workingHours }) => {
  // Generišemo sate (00:00 - 23:00)
  let times = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  const [selected, setSelected] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  times = times.filter(
    (time) => +time.split(':')[0] >= workingHours.from && +time.split(':')[0] < workingHours.to
  );

  useEffect(() => {
    let currentDateData = currentDate ? currentDate : `${currentYear}-${curentmonth}-${currentDay}`;
    const selectedDay = +currentDateData.split('-')[2];
    setIsFinished(isFinihedAppointment(currentDateData, selectedDay));
  }, [currentDate]);

  const renderItem = ({ item }) => {
    let currentDateData = currentDate ? currentDate : `${currentYear}-${curentmonth}-${currentDay}`;

    const selectedDay = +currentDateData.split('-')[2];
    let isDisabled = true;
    isDisabled = isAppoitmentDisabled(currentDateData, selectedDay, item);
    if (appoitments.length > 0) {
      appoitments.map((appoitment) => {
        const date = new Timestamp(appoitment.from.seconds, appoitment.from.nanoseconds).toDate();

        const time = date.getHours() < 10 ? `0${date.getHours()}:00` : `${date.getHours()}:00`;

        if (item === time) {
          isDisabled = true;
        }
      });
    }

    const isSelected = selected === item;

    return (
      <TouchableOpacity
        style={[styles.timeBox, isDisabled && styles.disabled, isSelected && styles.selected]}
        onPress={() => {
          if (!isDisabled) {
            handlePresentModalPress(`${currentDateData}-${item}`);
          }
        }}
        disabled={isDisabled}>
        <Text
          style={[
            styles.timeText,
            isDisabled && styles.disabledText,
            isSelected && styles.selectedText,
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View className="]">
      {isFinished ? (
        <Text className="text-center text-[16px] font-medium">Završeni termini</Text>
      ) : (
        <>
          <FlatList
            data={times}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            numColumns={4} // broj kolona u gridu
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    zIndex: 1000,
  },
  container: {},
  timeBox: {
    flex: 1,
    margin: 2,
    paddingVertical: 15,
    backgroundColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#e0e0e0ff',
  },
  disabledText: {
    color: '#c7c7c7ff',
  },
  selected: {
    backgroundColor: 'green',
  },
  selectedText: {
    color: 'white',
  },
});

export default TimePicker;
