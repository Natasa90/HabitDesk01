import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Linking } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { linking } from "./navigation/linking";
import { UserInfoProvider } from "./context/UserInfoContext";
import { UserContextProps } from "./types/UserTypes";
//import Footer from "./components/Footer";
import { useFonts } from "./lib/hooks/useFonts";
import supabase from "./lib/supabase";
//import { DeepLinkingHandler } from "./components/navigation/DeepLinkingHandler";
import { BackgroundWrapper } from "./components/Layout/BackgroundWrapper";
import {
  setupLocalNotificationsAsync,
  setNotificationCategories,
} from "./lib/helpers/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { RootStack } from "./navigation/RootStack";

export default function App() {
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

  return (
    <UserInfoProvider>
      <SafeAreaView className="flex-1 bg-customBlue2">
        <BackgroundWrapper>
          <NavigationContainer linking={linking}>
            <RootStack />
            <StatusBar style="dark" />
            {/*<Footer />*/}
          </NavigationContainer>
        </BackgroundWrapper>
      </SafeAreaView>
    </UserInfoProvider>
  );
}
