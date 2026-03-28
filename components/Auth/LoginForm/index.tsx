import { useState, FC } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import { TextWrapper } from "@/components/Layout";
import { AccountButton } from "@/components/Buttons";
import { LoginProps } from "@/types/AuthTypes";
import { useGithubLogin } from "@/lib/hooks/useGitHubLogin";
import { signInWithEmail } from "@/lib/helpers";
import { styles } from "@/components/Layout";

export const LoginForm: FC<LoginProps> = ({ signUp, resetPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);

  const {
    signInWithGithub,
    loading: githubLoading,
    error: githubError,
  } = useGithubLogin();

  const handleLogin = async () => {
    setIsLoading(true);
    setEmailError(null);

    try {
      const { error } = await signInWithEmail(email, password);

      if (error) {
        setEmailError(error.message);
      }

      // 🔥 DO NOT navigate
      // Supabase auth listener + RootStack will switch screens automatically
    } catch (err) {
      setEmailError("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      className="p-6 mx-8 bg-white rounded-xl shadow-xl"
      style={styles.authFormsShadow}
    >
      {/* EMAIL */}
      <View className="flex-row">
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

      <TextInput
        placeholder="Email address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        className="px-3 py-3 border border-gray-300 rounded-md text-gray-900 mt-2 mb-5"
      />

      {/* PASSWORD */}
      <View className="flex-row">
        <FontAwesome
          name="lock"
          size={26}
          color="gray"
          style={{ paddingLeft: 3 }}
        />
        <TextWrapper className="text-base font-medium text-gray-900 pl-2">
          Password
        </TextWrapper>
      </View>

      <TextInput
        placeholder="Password (min. 8 characters)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        className="px-3 py-3 mt-1 mb-5 border border-gray-300 rounded-md text-gray-900"
      />

      <TouchableOpacity onPress={resetPassword}>
        <TextWrapper className="text-sm text-gray-500 pb-3">
          Forgot Password?
        </TextWrapper>
      </TouchableOpacity>

      {isLoading || githubLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <AccountButton onPress={handleLogin}>
            <TextWrapper className="text-white">Log In</TextWrapper>
          </AccountButton>

          <AccountButton onPress={signInWithGithub}>
            <TextWrapper className="text-white">Log In with GitHub</TextWrapper>
          </AccountButton>
        </>
      )}

      {emailError && (
        <TextWrapper className="text-red-500 text-center">
          {emailError}
        </TextWrapper>
      )}

      {githubError && (
        <TextWrapper className="text-red-500 text-center">
          {githubError}
        </TextWrapper>
      )}

      <TextWrapper className="text-center text-gray-500 my-6">
        Don’t have an account?
      </TextWrapper>

      <TouchableOpacity onPress={signUp}>
        <TextWrapper className="text-center font-bold text-xl text-[#0B65C2]">
          Join now
        </TextWrapper>
      </TouchableOpacity>
    </View>
  );
};
