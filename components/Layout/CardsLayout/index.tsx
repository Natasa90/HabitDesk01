import { FC } from "react";
import { View, TouchableOpacity, Linking, Text } from "react-native";
import { TextWrapper } from '../TextWrapper'
import Icon from "react-native-vector-icons/FontAwesome";
import { CardLayoutProps } from "@/types/LayoutTypes";
import { GradientText } from "@/components/GradientText";
import { styles } from "../globalStyles";


export const CardLayout: FC<CardLayoutProps> = ({
 title,
 porch,
 displayComment,
 commentText,
 showMore,
 handleMore,
 handleVote,
 isUpdating,
 formattedDate,
 extraContent,
 isVoteDisabled,
 hasVoted,
}) => {
 return (
  <View
   className="p-4 bg-white rounded-xl shadow-xl mb-4"
   style={styles.cardLayout}
  >
   <GradientText text={title} />
   <View className="border-4 border-gray-200 rounded-2xl bg-gray-200 p-3 space-y-3">
  	{porch.email && (
     <TouchableOpacity
      onPress={() => Linking.openURL(`mailto:${porch.email}`)}
      className="flex-row items-center"
    >
      <TextWrapper>
        <Text className="font-IBM_semibold text-gray-900">Email: </Text>
        <Text className="whitespace-normal">{porch.email}</Text>
      </TextWrapper>
     </TouchableOpacity>
  	)}
   <TouchableOpacity
    onPress={() =>
      Linking.openURL(
        porch.source.includes("http") ? porch.source : `//${porch.source}`
      )
    }
    className="flex-row items-center"
   >
    <TextWrapper>
      <Text className="font-IBM_semibold text-gray-900">Source: </Text>
      <Text className="whitespace-normal break-words text-blue-800">{porch.source}</Text>
    </TextWrapper>
   </TouchableOpacity>
	 </View>
   <View className="py-6 px-1 mt-auto">
    <TextWrapper className="pl-1 text-base font-medium text-gray-900">
     {displayComment}
     {!showMore && commentText.length > 90 && (
      <TouchableOpacity onPress={handleMore}>
       <Text>... read more</Text>
      </TouchableOpacity>
     )}
    </TextWrapper>
   </View>
   <View className="p-2">
    <TextWrapper className="text-sm text-black pl-1 mb-2">
     <Text className="font-IBM_semibold">Likes: </Text>{" "}
     {porch.likes.length}
    </TextWrapper>
    <View className="w-10 h-10 ml-1 mt-2">
     {isUpdating ? (
      <View></View>
     ) : hasVoted ? (
      <TouchableOpacity
       onPress={handleVote}
       disabled={isUpdating}
       className="w-5 h-5"
      >
       <Icon
        name="heart"
        size={20}
        color="#F87171"
        className="text-red-400 w-5 h-5 transform scale-125 hover:scale-150 hover:rotate-12 transition-transform duration-300"
       />
      </TouchableOpacity>
     ) : (
      <TouchableOpacity
       onPress={handleVote}
       disabled={isUpdating}
       className="w-5 h-5"
      >
       <Icon
        name="check"
        size={20}
        className="text-blue-500 w-5 h-5 transform scale-125 hover:scale-150 hover:rotate-12 transition-transform duration-300"
       />
      </TouchableOpacity>
     )}
    </View>
    <TextWrapper className="pt-2 pl-0.5 text-sm">{formattedDate}</TextWrapper>
   </View>
   {extraContent && <View className="py-2">{extraContent}</View>}
  </View>
 );
};
