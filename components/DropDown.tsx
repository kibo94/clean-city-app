import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import  { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

interface Item {
  name: string;
  id: number;
}
interface DropDownProps {
  items: Item[];
  placeholder: string;
  isMultySelect?: boolean;
  onSelect: any;
  error?: string | null;
}

const DropDown = ({
  items,
  placeholder,
  isMultySelect = false,

  onSelect,
  error = null,
  value,
}: DropDownProps) => {
  const [inputValue, setValue] = useState(null);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [multyItems, setMultyItems] = useState([]);

  function filterMultiItems(item: Item) {
    let updatedItems = multyItems.filter((it) => {
      if (it.id != item.id) {
        return { id: item.id, name: item.name };
      }
    });
    return updatedItems;
  }
  function isChecked(item: Item) {
    return multyItems.findIndex((it) => it.id === item.id) !== -1;
  }
  useEffect(() => {
    if (value) {
      setValue(value.name);
      return;
    }
    setValue(null);
  }, [value]);

  return (
    <>
      <View className="border-secondary  relative rounded-[8px] border border-actionBlue bg-[white] ps-2">
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setIsDropDownOpen((prevState) => !prevState)}>
          <View className="relative h-[50px] flex-row items-center">
            <Text className="me-4 font-regular text-xl text-actionBlue">
              {inputValue ? inputValue : placeholder}
            </Text>
            <ScrollView horizontal={true} className="width-[100px]">
              {isMultySelect && multyItems.length > 0
                ? multyItems.map((mutlityItem) => (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() =>
                        setMultyItems(
                          filterMultiItems({
                            name: mutlityItem.name,
                            id: mutlityItem.id,
                          })
                        )
                      }>
                      <View
                        className="l m-1 flex-row  rounded-[5px] p-[5px]"
                        style={{
                          backgroundColor: mutlityItem.name.toLowerCase(),
                        }}>
                        <AntDesign name="close" size={15} color="white" />
                        <Text className="text-md font-bold text-white"></Text>
                      </View>
                    </TouchableOpacity>
                  ))
                : null}
            </ScrollView>

            <AntDesign
              name="down"
              size={21}
              color="#0d38d6ff"
              className="absolute right-[12] top-[25%]"
            />
          </View>
        </TouchableOpacity>
      </View>
      {isDropDownOpen && (
        <ScrollView
          className="border-secondary   absolute   rounded border-2 "
          style={{ top: 50, zIndex: 100, backgroundColor: 'white', width: '100%' }}>
          {items.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (isMultySelect) {
                  if (!multyItems.find((it) => it.id === item.id)) {
                    setMultyItems([...multyItems, { name: item.name, id: item.id }]);
                  } else {
                    setMultyItems(filterMultiItems(item));
                  }
                  onSelect([...multyItems, { name: item.name, id: item.id }]);
                } else {
                  setValue(item.name);
                  onSelect(item);
                  setIsDropDownOpen(false);
                }
              }}>
              <View className="flex-row items-center">
                {isChecked(item) && <AntDesign name="check" size={24} color="green" />}
                <Text className="border-1 p-2 font-regular text-xl">{item.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {error ? <Text className="font-frdregular mt-2 pl-2 text-xl text-[red]">{error}</Text> : null}
    </>
  );
};

export default DropDown;
