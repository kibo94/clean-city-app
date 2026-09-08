interface FormFieldStateModel {
  name: string;
  id: number;
  value: any;
  items?: any[];
  placeholder: string;
  error: string;
  isPassword?: boolean;
  type?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
}

const validateForm = (formData: FormFieldStateModel[]) => {
  let isValid = true; // Start as valid

  const updatedFormData: FormFieldStateModel[] = formData.map((formDataField) => {
    let error = '';

    if (formDataField.required) {
      const lengthCheck = isFieldLongEnough(
        formDataField.minLength || 0,
        formDataField.maxLength || 0,
        formDataField
      );
      if (!lengthCheck.isValid) {
        isValid = false;
        error = lengthCheck.error;
      }

      if (formDataField.name === 'email') {
        const emailCheck = isEmailValid(formDataField);
        if (!emailCheck.isValid) {
          isValid = false;
          error = emailCheck.error;
        }
      }
    }

    return {
      ...formDataField,
      error,
    };
  });

  return { data: updatedFormData, isValid };
};

const isFieldEmpty = (value: string | string[]) => value.length === 0;

function isFieldLongEnough(
  minLength: number,
  maxLength: number,
  formDataField: FormFieldStateModel
) {
  const trimmedValue = String(formDataField.value || '').trim();
  if (isFieldEmpty(trimmedValue)) {
    return { isValid: false, error: 'Obavezno polje' };
  }

  if (trimmedValue.length < minLength) {
    return { isValid: false, error: `Minimum broj karaktera je ${minLength}` };
  }
  if (maxLength > 0) {
    if (trimmedValue.length > maxLength) {
      return { isValid: false, error: `Maksimalan broj karaktera je ${maxLength}` };
    }
  }

  return { isValid: true, error: '' };
}

function isEmailValid(formDataField: FormFieldStateModel) {
  const trimmedEmail = String(formDataField.value || '')
    .trim()
    .toLowerCase();
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(trimmedEmail)) {
    return { isValid: true, error: '' };
  }
  return { isValid: false, error: 'E-mail adresa nije dobra' };
}

function onInputChange(value: string, id: string, formData) {
  return formData.map((formDataField) => {
    if (formDataField.id == id) {
      formDataField.value = value;
      return formDataField;
    }
    return formDataField;
  });
}

function populateFormData(inputs, o, object) {
  return inputs.map((input) => {
    if (input.name == o) {
      input.value = object[o];
      return input;
    }
    return input;
  });
}

export { validateForm, onInputChange, populateFormData };
