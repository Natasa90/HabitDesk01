import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  CreateAccountScreen,
  ResetPasswordScreen,
  CreateNewPasswordScreen,
} from "../screens";

export type AuthStackParamList = {
  Login: undefined;
  CreateAccount: undefined;
  ResetPassword: undefined;
  CreateNewPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen
        name="CreateNewPassword"
        component={CreateNewPasswordScreen}
      />
    </Stack.Navigator>
  );
}
