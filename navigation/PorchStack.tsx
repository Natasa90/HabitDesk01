import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PorchScreen, ScheduleLearningScreen, ContactScreen } from "../screens";

export type PorchStackParamList = {
  Porch: undefined;
  ScheduleLearning: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<PorchStackParamList>();

export function PorchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Porch" component={PorchScreen} />
      <Stack.Screen
        name="ScheduleLearning"
        component={ScheduleLearningScreen}
      />
      <Stack.Screen name="Contact" component={ContactScreen} />
    </Stack.Navigator>
  );
}
