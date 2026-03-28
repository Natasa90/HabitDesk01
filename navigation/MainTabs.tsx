import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { UserProfileScreen, FreeResourcesScreen } from "../screens";
import { PorchStack } from "./PorchStack";
import { MainTabParamList } from "@/types/MainTabParamList";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator<MainTabParamList>();

// Only Progress & Resources use this header (PorchStack handles its own)
const tabScreenOptions = ({ route, navigation }: any) => ({
  headerLeft: () => null, // no menu here, handled in PorchStack
  headerRight: () => null, // optional: could add logout here too
  tabBarIcon: ({ focused, color, size }: any) => {
    let iconName: keyof typeof Ionicons.glyphMap;
    if (route.name === "PorchStack")
      iconName = focused ? "home" : "home-outline";
    else if (route.name === "Progress")
      iconName = focused ? "stats-chart" : "stats-chart-outline";
    else iconName = focused ? "book" : "book-outline";
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "#2563eb",
  tabBarInactiveTintColor: "gray",
});

export const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="PorchStack"
        component={PorchStack}
        options={{ headerShown: false, title: "Porch" }}
      />
      <Tab.Screen
        name="Progress"
        component={UserProfileScreen}
        options={{ title: "Progress" }}
      />
      <Tab.Screen
        name="Resources"
        component={FreeResourcesScreen}
        options={{ title: "Resources" }}
      />
    </Tab.Navigator>
  );
};
