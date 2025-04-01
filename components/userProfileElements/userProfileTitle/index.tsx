import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { useContext } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";

export const UserProfileTitle = () => {
 const { userInfo } = useContext(UserInfoContext);

 return (
  <View className="mb-4">
   <TextWrapper className="text-gray-500 text-center">
    Welcome, {userInfo?.email}
   </TextWrapper>
  </View>
 );
};
