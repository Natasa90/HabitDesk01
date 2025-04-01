import { View, Image } from "react-native";
import { TextWrapper } from "@/components/Layout";

export const FreeResHeader = () => {
 return (
  <View className="items-center">
   <TextWrapper className="text-2xl font-IBM_semibold text-center pb-2 text-gray-700">
    Free Learning Resources
   </TextWrapper>
   <Image
    source={require("../../../assets/images/learning_tree.png")}
    className="w-[250px] h-[300px]"
   />
   <TextWrapper className="text-center font-IBM_lightItalic pb-3 pt-2 border-b-4 border-gray-200">
    Explore by category, access trusted links, and share your insights in the
    comment section. Have a favorite resource? Add your own and help others
    learn.
   </TextWrapper>
  </View>
 );
};
