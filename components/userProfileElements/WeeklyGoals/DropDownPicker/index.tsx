import { FC, useState } from "react";
import { View, TouchableOpacity, Modal, FlatList } from "react-native";
import { BlurView } from "expo-blur";
import { TextWrapper } from "@/components/Layout";
import { DropDownPickerProps } from "@/types/UserProfileTypes";
import { styles } from "@/components/Layout";

export const DropDownPicker: FC<DropDownPickerProps> = ({
 selectedValue,
 onValueChange,
 options,
}) => {
 const [modalVisible, setModalVisible] = useState(false);

 return (
  <View className="p-4 w-60">
   <TouchableOpacity
    onPress={() => setModalVisible(true)}
    className="bg-customBlue p-2 rounded-xl justify-center items-center"
   >
    <TextWrapper className="text-white text-xl font-bold">
     {selectedValue || "Select a goal"}
    </TextWrapper>
   </TouchableOpacity>
   <Modal visible={modalVisible} transparent animationType="fade">
    <View className="flex-1 justify-center items-center">
     <BlurView
      intensity={30}
      tint="dark"
      style={styles.updateGoalFormsBlur}
     />
     <View className="border bg-white p-6 rounded-lg w-64 shadow-lg">
      <TextWrapper className="text-lg font-semibold text-center mb-4">
       Select Days
      </TextWrapper>
      <FlatList
       data={options}
       keyExtractor={(item) => item.toString()}
       renderItem={({ item }) => (
        <TouchableOpacity
         onPress={() => {
          onValueChange(item);
          setModalVisible(false);
         }}
         className="p-2 border-b border-gray-300 hover:bg-gray-200"
        >
         {item === 1 ? (
          <TextWrapper className="text-center">{item} day</TextWrapper>
         ) : (
          <TextWrapper className="text-center">{item} days</TextWrapper>
         )}
        </TouchableOpacity>
       )}
      />
      <TouchableOpacity onPress={() => setModalVisible(false)} className="mt-2">
       <TextWrapper className="text-center text-red-500">Close</TextWrapper>
      </TouchableOpacity>
     </View>
    </View>
   </Modal>
  </View>
 );
};
