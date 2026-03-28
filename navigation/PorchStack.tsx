import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { PorchScreen, ScheduleLearningScreen, ContactScreen } from "../screens";
import { Ionicons } from "@expo/vector-icons";
import { LogoutButton } from "@/components/Buttons/LogoutButton";

export type PorchStackParamList = {
  Porch: undefined;
  ScheduleLearning: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<PorchStackParamList>();

export function PorchStack() {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        // Hamburger menu
        headerLeft: () => (
          <Ionicons
            name="menu"
            size={24}
            color="black"
            style={{ marginLeft: 15 }}
            onPress={() =>
              (
                navigation.getParent() as DrawerNavigationProp<any>
              )?.toggleDrawer()
            }
          />
        ),
        // Logout button
        headerRight: () => <LogoutButton />,
      })}
    >
      <Stack.Screen
        name="Porch"
        component={PorchScreen}
        options={{ title: "Porch" }}
      />
      <Stack.Screen
        name="ScheduleLearning"
        component={ScheduleLearningScreen}
        options={{ title: "Schedule Learning" }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: "Contact" }}
      />
    </Stack.Navigator>
  );
}
