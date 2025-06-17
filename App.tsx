import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";
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
 CreateNewPasswordScreen,
 ScheduleLearningScreen
} from "./screens";
import { UserInfoProvider } from "./context/UserInfoContext";
import { UserContextProps } from "./types/UserTypes";
import Footer from "./components/Footer";
import { useFonts } from "./lib/hooks/useFonts";
import supabase from "./lib/supabase";
import { DeepLinkingHandler } from "./components/navigation/DeepLinkingHandler";
import { BackgroundWrapper } from "./components/Layout/BackgroundWrapper";
import { setupLocalNotificationsAsync, setNotificationCategories } from "./lib/helpers/notifications";

const Stack = createNativeStackNavigator();

export default function App() {
 const [initialRoute, setInitialRoute] = useState("Splash"); 
 const [userInfo, setUserInfo] = useState<UserContextProps["userInfo"]>(null);

 const fonts = useFonts();

 useEffect(() => {
  (async () => {
    try {
      await setupLocalNotificationsAsync();
      await setNotificationCategories(); 
    } catch (e) {
      console.warn(e);
    }
  })();
}, []);

 useEffect(() => {
    const handleDeepLink = async (url: string) => {
      const parsedUrl = new URL(url);
      const accessToken = parsedUrl.hash?.split("&")[0]?.split("=")[1];
      const refreshToken = parsedUrl.hash?.split("&")[1]?.split("=")[1];

      if (accessToken && refreshToken) {
        try {
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          setInitialRoute("CreateNewPassword"); 
        } catch (err) {
          console.error("Error setting session", err);
          setInitialRoute("Splash");
        }
      } else {
        setInitialRoute("Splash");
      }
    };

    const handleUrl = ({ url }: { url: string }) => handleDeepLink(url);
    Linking.addEventListener("url", handleUrl);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
      else setInitialRoute("Splash");
    });

    return () => {
      Linking.removeAllListeners("url");
    };
  }, [setUserInfo]);

 return (
  <UserInfoProvider>
		<SafeAreaView className="flex-1 bg-customBlue2">
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
								ScheduleLearning: 'schedule-learning',
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
			 name="ScheduleLearning"
			 component={ScheduleLearningScreen}
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
	 </SafeAreaView>
  </UserInfoProvider>
 );
}
