import { useState, FC } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { CreateAccountProps } from "@/types/AuthTypes";
import { TermsAgreement } from "../TermsAgreement";
import { AccountButton } from "@/components/Buttons/AccountButton";
import { FontAwesome } from "@expo/vector-icons";
import { signUpWithEmail } from "@/lib/helpers";
import { styles } from "@/components/Layout";

export const CreateAccount: FC<CreateAccountProps> = ({ signIn }) => {
 const [newUserEmail, setNewUserEmail] = useState<string>("");
 const [newUserPassword, setNewUserPassword] = useState<string>("");
 const [signUpError, setSignUpError] = useState<string>("");
 const [emailConfirmationSent, setEmailConfirmationSent] =
  useState<boolean>(false);
 const [matchingPassword, setMatchingPassword] = useState<string>("");
 const [termsChecked, setTermsChecked] = useState<boolean>(false);

 return (
  <View className="items-center p-9">
   <View className="flex-row gap-2 mt-2">
    <FontAwesome name="user-plus" size={24} color="#000" />
    <TextWrapper className="text-xl font-IBM_semibold mb-1">
     Create free account
    </TextWrapper>
   </View>
   <TextWrapper className="text-center pb-8 text-gray-500 italic">
    Create a free Celebration account in 2 minutes.
   </TextWrapper>
   <View
    className="p-6 bg-gray-50 rounded-xl shadow-xl"
    style={styles.authFormsShadow}
   >
    {emailConfirmationSent ? (
     <View className="flex-1 items-center justify-center bg-blue-600">
      <TextWrapper className="text-white text-2xl font-bold mb-2">
       THANKS FOR SIGNING UP!
      </TextWrapper>
      <TextWrapper className="text-white text-lg mb-1">
       Check your email to verify your account.
      </TextWrapper>
      <TextWrapper className="text-slate-300 text-base italic">
       You will be redirected to the home page soon.
      </TextWrapper>
     </View>
    ) : (
     <View>
      <TextWrapper className="p-1">Email address</TextWrapper>
      <TextInput
       placeholder="Enter email to get started"
       className="border border-gray-300 rounded-md p-3 mb-4 font-IBM_italic"
       autoCapitalize="none"
       keyboardType="email-address"
       value={newUserEmail}
       onChangeText={setNewUserEmail}
      />
      <TextWrapper className="p-1">Password</TextWrapper>
      <TextInput
       placeholder="Enter your password"
       className="border border-gray-300 rounded-md p-3 mb-4 font-IBM_italic"
       secureTextEntry
       value={newUserPassword}
       onChangeText={setNewUserPassword}
      />
      <TextWrapper className="p-1">Confirm Password</TextWrapper>
      <TextInput
       placeholder="Confirm Password"
       className="border border-gray-300 rounded-md p-3 mb-6 font-IBM_italic"
       secureTextEntry
       value={matchingPassword}
       onChangeText={setMatchingPassword}
      />
      <TermsAgreement checked={termsChecked} setChecked={setTermsChecked} />
      <AccountButton
       onPress={() =>
        signUpWithEmail(
         newUserEmail,
         newUserPassword,
         matchingPassword,
         setSignUpError,
         setEmailConfirmationSent
        )
       }
       disabled={!termsChecked}
      >
       <TextWrapper className="text-white font-IBM_semibold">
        Create Account
       </TextWrapper>
      </AccountButton>
      {signUpError ? (
       <TextWrapper className="text-red-500 mb-4 text-center mt-4">
        {signUpError}
       </TextWrapper>
      ) : null}
      <View className="flex-row justify-center mt-4">
       <TextWrapper className="text-gray-700">
        Already have an account?{" "}
       </TextWrapper>
       <TouchableOpacity onPress={signIn}>
        <TextWrapper className="text-orange-500">Login here</TextWrapper>
       </TouchableOpacity>
      </View>
     </View>
    )}
   </View>
  </View>
 );
};
