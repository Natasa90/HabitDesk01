import { createDrawerNavigator } from "@react-navigation/drawer";
import { MainTabs } from "./MainTabs";
import { LogoutButton } from "@/components/Buttons/LogoutButton";
import { useUserInfo } from "@/context/UserInfoContext";
import { View, Text } from "react-native";

const Drawer = createDrawerNavigator();

export function AppDrawer() {
  const { userInfo } = useUserInfo();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
        drawerType: "front",
      }}
      drawerContent={() => (
        <View className="flex-1 p-5">
          {userInfo && (
            <>
              <Text className="text-lg font-bold mb-5">{userInfo.email}</Text>
              <LogoutButton />
            </>
          )}
        </View>
      )}
    >
      <Drawer.Screen name="MainTabs" component={MainTabs} />
    </Drawer.Navigator>
  );
}
