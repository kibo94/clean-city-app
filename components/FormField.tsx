import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';

interface FormFiledProps {
  placeholderName: string;
  onChange: (text: string) => void;
  error: string;
  isPassword?: boolean;
  keyBoardType: any;
  label?: string;
  value: any;
}

const FormFiled = ({
  placeholderName,
  onChange,
  error,
  isPassword = false,
  label,
  keyBoardType,
  value,
}: FormFiledProps) => {
  const [isVisible, setIsVisible] = useState(true);
  return (
    <ScrollView className="relative w-full">
      <Text className="mb-[8px] font-regular text-[18px]">{label}</Text>
      <View
        className={`rounded-[8px] border bg-[white] p-[5px] font-regular text-[16px] ${
          error != '' ? 'border border-2 border-[red]' : 'border-secondary'
        }`}>
        <TextInput
          className="font-regular  text-[16px]"
          value={value}
          placeholder={placeholderName}
          placeholderTextColor="#333"
          secureTextEntry={isPassword && !isVisible}
          keyboardType={keyBoardType}
          onChangeText={onChange}
        />
        {isPassword ? (
          !isVisible ? (
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} activeOpacity={0.8}>
              <AntDesign
                className="absolute right-[12] top-[-35px]"
                name="eyeo"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsVisible(!isVisible)} activeOpacity={0.8}>
              <Feather
                name="eye-off"
                size={24}
                color="black"
                className="absolute right-[12] top-[-35px]"
              />
            </TouchableOpacity>
          )
        ) : null}
      </View>

      {error ? <Text className="font-frdregular mt-2 pl-2 text-xl text-[red]">{error}</Text> : null}
    </ScrollView>
  );
};

export default FormFiled;
