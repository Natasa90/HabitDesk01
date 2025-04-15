import { FC, useEffect } from "react";
import * as Linking from "expo-linking";
import { useTypedNavigation } from "@/lib/hooks";

export const DeepLinkingHandler: FC = () => {
  const navigation = useTypedNavigation();

  useEffect(() => {
    const handleDeepLink = ({ url }: { url: string }) => {
      const parsed = Linking.parse(url);
      const route = parsed.path || parsed.hostname;

      switch (route?.toLowerCase()) {
        case "home":
          navigation.navigate("Home");
          break;
        case "login":
          navigation.navigate("Login");
          break;
        case "profile":
          navigation.navigate("UserProfile");
          break;
        case "porch":
          navigation.navigate("Porch");
          break;
        case "free-resources":
          navigation.navigate("FreeResources");
          break;
        case "create-account":
          navigation.navigate("CreateAccount");
          break;
        case "reset-password":
          navigation.navigate("ResetPassword");
          break;
        case "create-new-password":
          navigation.navigate("CreateNewPassword");
          break;
        default:
          navigation.navigate("Home");
      }
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  }, [navigation]);

  return null;
};
