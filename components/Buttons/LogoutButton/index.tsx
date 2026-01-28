import { useContext, useState } from "react";
import { Alert, View, ActivityIndicator } from "react-native";
import { TextWrapper } from "@/components/Layout";
import supabase from "@/lib/supabase";
import { useTypedNavigation } from "../../../lib/hooks/useTypedNavigation";
import { UserInfoContext } from "@/context/UserInfoContext";
import { AccountButton } from "@/components/Buttons/AccountButton";
import { logoutUser } from "@/lib/helpers/authHelpers";

export const LogoutButton = () => {
 const navigation = useTypedNavigation();
 const { setUserInfo } = useContext(UserInfoContext);
 const [loading, setLoading] = useState(false);

 const handleLogout = () => {
  logoutUser(setUserInfo, navigation, setLoading);
};

 return (
  <View className="">
   {loading ? (
    <ActivityIndicator size="large" color="#0B65C2" />
   ) : (
    <AccountButton onPress={handleLogout}>
     <TextWrapper className="text-white text-center font-IBM_semibold">
      Logout
     </TextWrapper>
    </AccountButton>
   )}
  </View>
 );
};
