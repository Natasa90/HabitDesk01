import React from "react";
import { View } from "react-native";
import Svg, { Text, Defs, LinearGradient, Stop } from "react-native-svg";

export const GradientText = ({ text }: { text: string | number }) => {

 return (
  <View className="justify-center align-center">
   <Svg width="100%" height="50">
    <Defs>
     <LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
      <Stop offset="0" stopColor="#1D4ED8" />
      <Stop offset="0.5" stopColor="#3B82F6" />
      <Stop offset="1" stopColor="#1E3A8A" />
     </LinearGradient>
    </Defs>
    <Text fill="url(#gradient)" fontSize="24" fontWeight="bold" y="25" x="3">
     {text}
    </Text>
   </Svg>
  </View>
 );
};
