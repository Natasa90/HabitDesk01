import { ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { LoginForm, FormTitle } from "@/components/Auth";
import { useTypedNavigation } from "@/lib/hooks";

export const LoginScreen = () => {

 const navigation = useTypedNavigation();

 const handleSignUp = () => {
  navigation.navigate("CreateAccount");
 };

 const handleResetPassword = () => {
  navigation.navigate("ResetPassword");
 };

 return (
	<KeyboardAvoidingView
		style={{ flex: 1 }}
		behavior={Platform.OS === "ios" ? "padding" : "height"}
	>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
				<FormTitle />
				<LoginForm
					signUp={handleSignUp}
					resetPassword={handleResetPassword}
				/>
			</ScrollView>
	</KeyboardAvoidingView>
);
};
