import { View, Image } from "react-native";
import { TextWrapper } from "@/components/Layout";

const Footer = () => {

const currentYear = new Date().getFullYear(); 

 return (
  <View className="flex-row w-full items-center justify-center space-x-4 bg-footerBlue py-4 border-t border-gray-300">
   <Image
    source={require("../../assets/images/habitdesk.png")}
    className="w-[100px] h-[60px]"
    resizeMode="contain"
   />
   <View className="w-[1px] h-10 bg-gray-300" />
   <TextWrapper className="text-xs text-left">
    © {currentYear} All rights reserved.{"\n"}
    Designed by{" "}
    <TextWrapper className="font-IBM_bold">Prototype.NEXT</TextWrapper>
   </TextWrapper>
  </View>
 );
};

export default Footer; 