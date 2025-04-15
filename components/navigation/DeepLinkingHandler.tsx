import { FC, useEffect } from "react";
import * as Linking from "expo-linking";
import { useTypedNavigation } from "@/lib/hooks"; 

export const DeepLinkingHandler: FC = () => {
  const navigation = useTypedNavigation();

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const parsed = Linking.parse(url);
      if (!parsed.path) {
        navigation.navigate("Home");
      }
      if (parsed.path === "home") {
        navigation.navigate("Home");
      }
      if (parsed.path === "login") {
        navigation.navigate("Login");
      }
      if (parsed.path === "profile") {
        navigation.navigate("UserProfile");
      }
      if (parsed.path === "porch") {
        navigation.navigate("Porch");
      }
      if (parsed.path === "free-resources") {
        navigation.navigate("FreeResources");
      }
      if (parsed.path === "create-account") {
        navigation.navigate("CreateAccount");
      }
      if (parsed.path === "reset-password") {
        navigation.navigate("ResetPassword");
      }
      if (parsed.path === "create-new-password") {
        navigation.navigate("CreateNewPassword");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);

    return () => subscription.remove(); 
  }, [navigation]);

  return null; 
};

