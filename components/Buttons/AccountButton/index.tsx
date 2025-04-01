import { TouchableOpacity, View } from "react-native";
import Svg, { Defs, LinearGradient, Stop, Rect } from "react-native-svg";
import { ButtonProps } from "@/types/ButtonTypes";

export const AccountButton = ({ onPress, children, disabled }: ButtonProps) => {
 return (
  <TouchableOpacity onPress={onPress} className="flex items-center my-2.5" disabled={disabled}>
   <Svg height="40" width="280">
    <Defs>
     <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
      <Stop offset="0" stopColor="rgb(6, 140, 180)" />
      <Stop offset="0.5" stopColor="rgb(6, 167, 180)" />
      <Stop offset="1" stopColor="rgb(6, 140, 180)" />
     </LinearGradient>
    </Defs>
    <Rect x="0" y="0" width="280" height="40" fill="url(#gradient)" rx="12" />
   </Svg>
   <View className="absolute mt-2.5">{children}</View>
  </TouchableOpacity>
 );
};
