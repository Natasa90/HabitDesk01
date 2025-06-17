import { View, Image } from "react-native";
import { TextWrapper } from "@/components/Layout";

export const ScheduleLearningTitle = () => {
	return (
    <View className="items-center justify-start px-4 pt-4">
         <TextWrapper className="text-2xl font-IBM_semibold text-gray-700">
        Schedule Your Study Time 
      </TextWrapper>
			<Image
        source={require("@/assets/images/icon-cal.webp")}
        className="w-64 h-40 rounded-xl my-4"
        resizeMode="contain"
      />
      <TextWrapper className="text-base text-gray-600 text-center">
        Pick a date and time to get a friendly reminder when it’s time to hit the books!
      </TextWrapper>
			<TextWrapper className="font-IBM_italic my-2 border-b border-gray-300 text-gray-700"> 
				 Staying consistent has never been this easy.
			</TextWrapper>
    </View>
  );
};