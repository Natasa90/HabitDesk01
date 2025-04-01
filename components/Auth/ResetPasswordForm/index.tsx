import { FC, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { handlePasswordReset } from "@/lib/helpers";
import { ResetPasswordProps } from "@/types/AuthTypes";
import { AccountButton } from "@/components/Buttons/AccountButton";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { FontAwesome } from "@expo/vector-icons";
import { isValidEmail } from "@/lib/constants";
import { styles } from "@/components/Layout";

export const ResetPassword: FC<ResetPasswordProps> = ({ resetPassword }) => {
 const [email, setEmail] = useState("");
 const [isEmailValid, setIsEmailValid] = useState(true);
 const navigation = useTypedNavigation();

 return (
  <View className="items-center p-9">
   <TextWrapper className="text-xl font-IBM_semibold mb-1">
    Reset Your Password
   </TextWrapper>
   <TextWrapper className="text-center pb-8 text-gray-500 italic">
    Enter your email address below, and we'll send you a link to reset your
    password.
   </TextWrapper>
   <View
    className="px-4 py-6 bg-gray-50 rounded-xl shadow-xl"
    style={styles.authFormsShadow}
   >
    <View className="space-y-5">
     <View>
      <View className="flex-row items-center">
       <FontAwesome
        name="envelope-o"
        size={24}
        color="gray"
        style={{ paddingLeft: 3 }}
       />
       <TextWrapper className="text-base font-medium text-gray-900 pl-2">
        Email
       </TextWrapper>
      </View>
      <View className="mt-2.5">
       <TextInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => {
         setEmail(text);
         setIsEmailValid(isValidEmail(text));
        }}
        className="border border-gray-500 w-full py-4 pl-3 text-black bg-white rounded-md font-IBM_italic"
       />
      </View>
     </View>
     <View className="flex items-center justify-between">
      <TouchableOpacity onPress={() => resetPassword()}>
       <TextWrapper className="text-base font-medium text-orange-500">
        Cancel
       </TextWrapper>
      </TouchableOpacity>
     </View>
     <View>
      <AccountButton
       onPress={() => handlePasswordReset(email, setIsEmailValid, navigation)}
      >
       <TextWrapper className="text-white font-IBM_semibold">
        Reset Password
       </TextWrapper>
      </AccountButton>
     </View>
    </View>
   </View>
  </View>
 );
};
