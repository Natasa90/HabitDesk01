import { KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView, Platform, Keyboard } from "react-native";
import { CreateAccount } from "@/components/Auth";
import { useTypedNavigation } from "@/lib/hooks";

export const CreateAccountScreen = () => {
 const navigation = useTypedNavigation();

 const handleLogin = () => {
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
				<CreateAccount signIn={handleLogin} />
			</ScrollView>
		</KeyboardAvoidingView>
	);
};
