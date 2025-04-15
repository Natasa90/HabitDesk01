import { useState, FC, useContext } from "react";
import { TextWrapper } from "@/components/Layout";
import { View, TextInput, TouchableOpacity, ActivityIndicator } from "react-native";
import { GithubLogin } from "@/components/Buttons/GitHubLoginButton";
import { LoginProps } from "@/types/AuthTypes";
import { useTypedNavigation } from "@/lib/hooks";
import { UserInfoContext } from "@/context/UserInfoContext";
import { AccountButton } from "@/components/Buttons";
import { FontAwesome } from "@expo/vector-icons";
import { signInWithEmail } from "@/lib/helpers";
import { styles } from "@/components/Layout";

export const LoginForm: FC<LoginProps> = ({ signUp, resetPassword }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useTypedNavigation();
  const { setUserInfo } = useContext(UserInfoContext);

  const handleEmailChange = (text: string) => {
    setEmail(text);
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
  };

  const handleLogin = async () => {
    setIsLoading(true);
    const success = await signInWithEmail(email, password, setUserInfo);
    setIsLoading(false); 

    if (success) {
      navigation.navigate("UserProfile");
    }
  };

  return (
    <View className="p-6 mx-8 bg-white rounded-xl shadow-xl" style={styles.authFormsShadow}>
      <View className="flex-row">
        <FontAwesome name="envelope-o" size={24} color="gray" style={{ paddingLeft: 3 }} />
        <TextWrapper className="text-base font-medium text-gray-900 pl-2">Email</TextWrapper>
      </View>
      <TextInput
        placeholder="Email address"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
        className="px-3 py-3 border font-IBM_italic border-gray-300 rounded-md text-gray-900 mt-2 mb-5"
      />
      <View className="flex-row">
        <FontAwesome name="lock" size={26} color="gray" style={{ paddingLeft: 3 }} />
        <TextWrapper className="text-base font-medium text-gray-900 pl-2">Password</TextWrapper>
      </View>
      <TextInput
        placeholder="Password (min. 8 characters)"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
        className="px-3 py-3 mt-1 mb-5 border font-IBM_italic border-gray-300 rounded-md text-gray-900"
      />
      <TouchableOpacity onPress={resetPassword}>
        <TextWrapper className="text-sm text-gray-500 pb-3">Forgot Password?</TextWrapper>
      </TouchableOpacity>

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <AccountButton onPress={handleLogin}>
            <TextWrapper className="text-white font-IBM_semibold">Log In</TextWrapper>
          </AccountButton>
         <GithubLogin /> 
        </>
      )}

      <TextWrapper className="text-center text-gray-500 my-6">Don’t have an account? </TextWrapper>
      <TouchableOpacity onPress={signUp}>
        <TextWrapper className="text-center font-bold text-xl text-[#0B65C2]">Join now</TextWrapper>
      </TouchableOpacity>
    </View>
  );
};
