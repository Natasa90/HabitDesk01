import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
 SplashScreen,
 HomeScreen,
 LoginScreen,
 UserProfileScreen,
 PorchScreen,
 FreeResourcesScreen,
 CreateAccountScreen,
 ResetPasswordScreen,
 CreateNewPasswordScreen
} from "./screens";
import { UserInfoContext } from "./context/UserInfoContext";
import { UserContextProps } from "./types/UserTypes";
import Footer from "./components/Footer";
import { useFonts } from "./lib/hooks/useFonts";
import { DeepLinkingHandler } from "./components/navigation/DeepLinkingHandler";
import { BackgroundWrapper } from "./components/Layout/BackgroundWrapper";

const Stack = createNativeStackNavigator();

export default function App() {
 const [userInfo, setUserInfo] = useState<UserContextProps["userInfo"]>(null);

 const fonts = useFonts();

 return (
  <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
   <BackgroundWrapper>
     <NavigationContainer
          linking={{
            prefixes: ['habitdesk://'],
            config: {
              screens: {
                Home: 'home',
                Login: 'login',
                UserProfile: 'profile',
                Porch: 'porch',
                FreeResources: 'free-resources',
                CreateAccount: 'create-account',
                ResetPassword: 'reset-password',
                CreateNewPassword: 'create-new-password',
              },
            },
          }}
        >
     <DeepLinkingHandler />
     <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
       animation: "none",
       contentStyle: { backgroundColor: "transparent" }, 
      }}
     >
      <Stack.Screen
       name="Splash"
       component={SplashScreen}
       options={{
        headerShown: false,
       }}
      />
      <Stack.Screen
       name="Home"
       component={HomeScreen}
       options={{
        headerShown: false,
       }}
      />
      <Stack.Screen
       name="Login"
       component={LoginScreen}
       options={{
        headerStyle: {
         backgroundColor: "#f8f8f8",
        },
        headerTitle: "",
       }}
      />
      <Stack.Screen
       name="UserProfile"
       component={UserProfileScreen}
       options={{
        headerShown: false,
       }}
      />
      <Stack.Screen
       name="Porch"
       component={PorchScreen}
       options={{
        headerStyle: {
         backgroundColor: "#f8f8f8",
        },
        headerTitle: "",
       }}
      />
      <Stack.Screen
       name="FreeResources"
       component={FreeResourcesScreen}
       options={{
        headerStyle: {
         backgroundColor: "#f8f8f8",
        },
        headerTitle: "",
       }}
      />
      <Stack.Screen
       name="CreateAccount"
       component={CreateAccountScreen}
       options={{
        headerStyle: {
         backgroundColor: "#f8f8f8",
        },
        headerTitle: "",
       }}
      />
      <Stack.Screen
       name="ResetPassword"
       component={ResetPasswordScreen}
       options={{
        headerStyle: {
         backgroundColor: "#f8f8f8",
        },
        headerTitle: "",
       }}
      />
      <Stack.Screen
       name="CreateNewPassword"
       component={CreateNewPasswordScreen}
       options={{
        headerStyle: {
         backgroundColor: "#f8f8f8",
        },
        headerTitle: "",
       }}
      />
     </Stack.Navigator>
     <StatusBar style="dark" />
     <Footer />
    </NavigationContainer>
   </BackgroundWrapper>
  </UserInfoContext.Provider>
 );
}
