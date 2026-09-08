import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { ObjectModel } from '~/models/object';

interface ImageData {
  uri: string;
  type: string;
  name: string;
}

interface DataContextType {
  objects: ObjectModel[];
  selectedDate: Date;
  setSelectedDate: any;
  imageData: ImageData[] | null;
  setImageData: Dispatch<SetStateAction<ImageData[] | null>>;
  setObjects: Dispatch<SetStateAction<ObjectModel[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [objects, setObjects] = useState<ObjectModel[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageData, setImageData] = useState<ImageData[] | null>([]);

  return (
    <DataContext.Provider
      value={{ objects, setObjects, selectedDate, setSelectedDate, imageData, setImageData }}>
      {children}
    </DataContext.Provider>
  );
};
