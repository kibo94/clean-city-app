import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';

interface FormContextType {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormData = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormData must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [inputValue, setInputValue] = useState('');

  return (
    <FormContext.Provider
      value={{
        inputValue,
        setInputValue,
      }}>
      {children}
    </FormContext.Provider>
  );
};
