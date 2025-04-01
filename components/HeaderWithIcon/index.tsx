import { FC } from "react";
import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import Icon from "react-native-vector-icons/FontAwesome6";
import { HeaderWithIconProps } from "@/types/LayoutTypes";

export const HeaderWithIcon: FC<HeaderWithIconProps> = ({ icon, title }) => {

 return (
  <View className="flex-row items-center justify-center">
   <Icon name={icon} size={24} color="#000080" className="mr-3" />
   <TextWrapper className="text-2xl font-bold text-[#000080]">{title}</TextWrapper>
  </View>
 );
};
