import { MainTabParamList } from "../MainTabParamList";
import { NavigatorScreenParams } from "@react-navigation/native";

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  CreateAccount: undefined;
  ResetPassword: undefined;
  CreateNewPassword: undefined;
  ScheduleLearning: undefined;
  Contact: undefined;
};
