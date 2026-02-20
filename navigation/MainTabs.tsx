import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  UserProfileScreen,
  PorchScreen,
  FreeResourcesScreen,
} from "../screens";
import { PorchStack } from "./PorchStack";
import { MainTabParamList } from "@/types/MainTabParamList";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "PorchStack") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Progress") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="PorchStack"
        component={PorchStack}
        options={{ headerShown: false, title: "Porch" }}
      />
      <Tab.Screen name="Progress" component={UserProfileScreen} />
      <Tab.Screen name="Resources" component={FreeResourcesScreen} />
    </Tab.Navigator>
  );
};
