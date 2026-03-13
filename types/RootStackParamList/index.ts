import { NavigatorScreenParams } from "@react-navigation/native";
import { AuthStackParamList } from "../AuthStackParamList";
import { MainTabParamList } from "../MainTabParamList";

export type RootStackParamList = {
  Splash: undefined;

  Auth: NavigatorScreenParams<AuthStackParamList>;

  AppDrawer: NavigatorScreenParams<MainTabParamList>;
};
