import { NavigatorScreenParams } from "@react-navigation/native";
import { PorchStackParamList } from "@/navigation/PorchStack";

export type MainTabParamList = {
  PorchStack: NavigatorScreenParams<PorchStackParamList>;
  Progress: undefined;
  Resources: undefined;
};
