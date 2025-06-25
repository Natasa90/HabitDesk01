import { ScrollView, Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native'; 
import { ResetPasswordForm } from "@/components/Auth";
import { useTypedNavigation } from "@/lib/hooks";

export const ResetPasswordScreen = () => {
 const navigation = useTypedNavigation();

 const handleCancelReset = () => {
  navigation.navigate("Login");
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
   		<ResetPasswordForm resetPassword={handleCancelReset} />
		</ScrollView>
	</KeyboardAvoidingView>
 );
};
