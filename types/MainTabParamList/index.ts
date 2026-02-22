import { PorchStackParamList } from "../PorchStackParamList";

export type MainTabParamList = {
  PorchStack: {
    screen: keyof PorchStackParamList;
  };
  Progress: undefined;
  Resources: undefined;
};
