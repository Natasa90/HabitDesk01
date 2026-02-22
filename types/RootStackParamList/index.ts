import { MainTabParamList } from "../MainTabParamList";
import { AuthStackParamList } from "../AuthStackParamList";

export type RootStackParamList = {
  Splash: undefined;
  Auth: {
    screen: keyof AuthStackParamList;
  };
  MainTabs: {
    screen: keyof MainTabParamList;
  };
};
