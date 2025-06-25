import { KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, Keyboard } from "react-native";
import { CreateNewPasswordForm } from "@/components/Auth";

export const CreateNewPasswordScreen = () => {
 return (
	<KeyboardAvoidingView
		style={{ flex: 1 }}
		behavior={Platform.OS === "ios" ? "padding" : "height"}
	>
			<ScrollView
				contentContainerStyle={{ flexGrow: 1 }}
				keyboardShouldPersistTaps="handled"
			>
    		<CreateNewPasswordForm />
			</ScrollView>
	</KeyboardAvoidingView>

	)
};
