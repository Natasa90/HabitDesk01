import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SplashScreen } from "../screens";
import { AuthStack } from "./AuthStack";
import { MainTabs } from "./MainTabs";
import { useUserInfo } from "../context/UserInfoContext";
import { RootStackParamList } from "@/types/RootStackParamList";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootStack() {
  const { userInfo, loading } = useUserInfo();

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userInfo ? (
        <Stack.Screen name="MainTabs" component={MainTabs} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
    </Stack.Navigator>
  );
}
