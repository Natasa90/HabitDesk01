import { MainTabParamList } from "../MainTabParamList";

export type RootStackParamList = {
  Splash: undefined;
  Auth: {
    screen: "Login" | "CreateAccount" | "ResetPassword" | "CreateNewPassword";
  };
  MainTabs: {
    screen: keyof MainTabParamList; // Nested tabs
  };
};
