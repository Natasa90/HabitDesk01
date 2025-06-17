import { View, Image } from "react-native";

export const FormTitle = () => {
 return (
  <View className="items-center">
   <Image
    source={require("../../../assets/images/habitdesk.png")} 
    className="w-[110px] h-[110px]"
   />
  </View>
 );
};
