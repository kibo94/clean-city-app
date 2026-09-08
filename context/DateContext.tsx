import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
interface TimeRange {
  from: string | null;
  to: string | null;
}

interface DateContextType {
  selectedDateLocal: Date;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setSelectedDateLocal: Dispatch<SetStateAction<Date>>;
  time: TimeRange;
  setTime: Dispatch<SetStateAction<TimeRange>>;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const useDate = (): DateContextType => {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useData must be used within a DataProviderrr');
  }
  return context;
};

interface DateProviderProps {
  children: ReactNode;
}

export const DateProvider: React.FC<DateProviderProps> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedDateLocal, setSelectedDateLocal] = useState<Date>(new Date());
  const [time, setTime] = useState<TimeRange>({ from: null, to: null });
  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        time,
        setTime,
        selectedDateLocal,
        setSelectedDateLocal,
      }}>
      {children}
    </DateContext.Provider>
  );
};
