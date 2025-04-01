import { FC } from "react";
import { View, Image } from "react-native";

export const FormTitle: FC = () => {
 return (
  <View className="pt-5 items-center">
   <Image
    source={require("../../../assets/images/habitdesk.png")} 
    className="w-[110px] h-[110px]"
   />
  </View>
 );
};
