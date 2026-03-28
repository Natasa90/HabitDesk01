import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens";
import { AuthStack } from "./AuthStack";
import { AppDrawer } from "./AppDrawer";
import { RootStackParamList } from "@/types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />

      <Stack.Screen name="Auth" component={AuthStack} />

      <Stack.Screen name="AppDrawer" component={AppDrawer} />
    </Stack.Navigator>
  );
}
