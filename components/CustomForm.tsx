import { View } from 'react-native';
import React, { useEffect, useState } from 'react';

import CustomButton from './CustomButton';
import { FormFieldStateModel } from '~/models/form';
// import DropDown from './DropDown';
import FormFiled from './FormField';
import { validateForm } from '~/utils/formUtil';
import FromToTimePicker from './FromToTimePicker';
// import UploadImage from "./UploadImage";
const CustomForm = ({ formInputs, title, onPress, onSelectChange, extraFileds = null }) => {
  let [formData, setFormData] = useState<FormFieldStateModel[]>([]);
  useEffect(() => {
    setFormData(
      // Clone inputs to not make reference problem in next init
      // This will reset the state and clean up errors if they are there
      formInputs.map((input: FormFieldStateModel) => {
        return { ...input };
      })
    );
  }, [formInputs]);

  return (
    <>
      <View className="mt-4 flex gap-4">
        {formData.map((formInput) =>
          renderInput(
            formInput,
            (e: any) => {
              setFormData(
                formData.map((formDataFiled) => {
                  if (formDataFiled.id == formInput.id) {
                    if (formDataFiled.type == 'multiDropDown' || formDataFiled.type == 'upload') {
                      formDataFiled.value = [...e];
                    } else if (formDataFiled.type == 'dropDown') {
                      formDataFiled.value = { id: e.id, name: e.name };
                    } else if (formDataFiled.type == 'timePicker') {
                      formDataFiled.value = { from: e.from, to: e.to };
                    } else {
                      formDataFiled.value = e;
                    }

                    return formDataFiled;
                  }
                  return formDataFiled;
                })
              );
            },
            onSelectChange,
            formData
          )
        )}
      </View>
      {extraFileds && extraFileds}
      <CustomButton
        text={title}
        onPress={() => {
          const { data, isValid } = validateForm(formData);
          setFormData(data);

          if (isValid) {
            onPress(data);
          }
        }}
      />
    </>
  );
};

function keyBoardType(type: string) {
  if (type == 'phone') {
    return 'numeric';
  } else {
    return 'default';
  }
}

function renderInput(formInput: FormFieldStateModel, onChange, onSelectChange, formData) {
  if (formInput.type == 'input') {
    return (
      <FormFiled
        label={formInput.label}
        key={formInput.id}
        error={formInput.error}
        isPassword={formInput.isPassword}
        keyBoardType={keyBoardType(formInput.name)}
        value={formInput.value}
        placeholderName={formInput.placeholder}
        onChange={(e: any) => {
          onChange(e);
        }}
      />
    );
  } else if (formInput.type == 'timePicker') {
    return (
      <FromToTimePicker
        label={formInput.label}
        value={formInput.value}
        onChangeFrom={(data) => {
          onChange(data);
        }}
      />
    );
  }
  //   else if (formInput.type == 'multiDropDown') {
  //     return (
  //       <DropDown
  //         error={formInput.error}
  //         items={formInput.items}
  //         onSelect={(items) => {
  //           onChange(items);
  //         }}
  //         isMultySelect={true}
  //         placeholder={formInput.placeholder}
  //       />
  //     );
  //   }

  //   else if (formInput.type == "upload") {
  //     return (
  //       <UploadImage
  //         error={formInput.error}
  //         onFileUpload={(data) => {
  //           onChange(data);
  //         }}
  //       />
  //     );
  //   }
}

export default CustomForm;
