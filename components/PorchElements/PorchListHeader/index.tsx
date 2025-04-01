import { FC } from "react";
import { View, TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { PorchListHeaderProps } from "@/Types/PorchTypes";

export const PorchListHeader: FC<PorchListHeaderProps> = ({
 learningDays,
 buttonTitle,
 handleFiltering,
}) => {
 return (
  <View className="pt-6 border-t-4 border-[#e5e7eb] mb-4">
   <TextWrapper className="text-lg font-IBM_semibold ml-2">
    Daily Highlights
   </TextWrapper>
   <TextWrapper className="mt-1 font-IBM_light ml-2">
    Growth and Learning News
   </TextWrapper>
   {learningDays > 0 && (
    <>
     <TextWrapper className="mt-5 text-lg ml-2">
      You've been dedicated to learning for{" "}
      <TextWrapper className="font-IBM_semibold">{learningDays}</TextWrapper>{" "}
      days!
     </TextWrapper>
     <TouchableOpacity onPress={handleFiltering} className="mt-3">
      <TextWrapper className="bg-customBlue rounded-xl ml-2 font-IBM_medium text-white self-start p-3">
       {buttonTitle}
      </TextWrapper>
     </TouchableOpacity>
    </>
   )}
  </View>
 );
};
