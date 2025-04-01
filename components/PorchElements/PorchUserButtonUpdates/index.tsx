import { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import Icon from "react-native-vector-icons/Ionicons";
import { PorchUserButtonProps } from "../../../Types/PorchTypes";
import * as Animatable from 'react-native-animatable';

export const PorchUserButtonUpdates: FC<PorchUserButtonProps> = ({
 setShowForm,
}) => {
 const handlePress = () => {
  setShowForm((prevState: boolean) => !prevState);
 };

 return (
  <View className="flex-row items-center">
   <TouchableOpacity className="pl-1" onPress={handlePress}>
    <View className="w-8 h-8 p-0.5 rounded-full border-[2.5px] border-black">
     <Icon name="trending-up" size={22} color="black" />
    </View>
   </TouchableOpacity>
   <View className="pl-2.5 pb-2 pt-2">
    <Icon name="arrow-back" size={18} color="#4A4A4A" />
   </View>
  <Animatable.Text animation="zoomIn" duration={1500} className="pl-2.5 pb-2 pt-1.5">
    Post your{" "}
    <TextWrapper className="font-IBM_italic text-blue-700">
     progress!
    </TextWrapper>
   </Animatable.Text>
  </View>
 );
};
