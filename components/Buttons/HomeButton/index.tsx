import { TouchableOpacity, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { ButtonProps } from "@/types/ButtonTypes";

export const HomeButton = ({ onPress, children }: ButtonProps) => {
 return (
  <TouchableOpacity
   onPress={onPress}
   activeOpacity={0.75}
   className="flex items-center my-2.5"
  >
   <Svg height="60" width="300">
    <Defs>
     <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
      <Stop offset="0" stopColor="rgb(6, 140, 180)" />
      <Stop offset="0.5" stopColor="rgb(6, 167, 180)" />
      <Stop offset="1" stopColor="rgb(6, 140, 180)" />
     </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="300" height="60" fill="url(#gradient)" rx="12" />
   </Svg>
   <View className="absolute mt-4">{children}</View>
  </TouchableOpacity>
 );
};
