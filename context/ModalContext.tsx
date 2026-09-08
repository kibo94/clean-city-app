import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GeneralModalModel, GeneralPopup } from '~/models/modal';

interface ModalContextType {
  generalPopUp: GeneralPopup;
  showGeneralPopup: (args: GeneralModalModel) => void;
  hideGeneralPopup: () => void;
  confirm: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null);
  const [generalPopUp, setGeneralPopup] = useState<GeneralPopup>({
    show: false,
    message: '',
    type: 'info',
    icon: null,
    component: null,
  });

  function showGeneralPopup({
    message,
    type = 'info',
    onDone,
    icon,
    component,
  }: GeneralModalModel) {
    setGeneralPopup({
      ...generalPopUp,
      type,
      show: true,
      message,
      component: component || null,
      icon: icon || null,
    });
    setOnConfirm(() => onDone || null);
  }

  function hideGeneralPopup() {
    setGeneralPopup({ ...generalPopUp, show: false, message: '' });
  }

  const confirm = () => {
    if (onConfirm) {
      onConfirm(); // Execute callback only when "Yes" is pressed
    }
    hideGeneralPopup();
  };

  return (
    <ModalContext.Provider
      value={{
        showGeneralPopup,
        generalPopUp,
        hideGeneralPopup,
        confirm,
      }}>
      {children}
    </ModalContext.Provider>
  );
};
