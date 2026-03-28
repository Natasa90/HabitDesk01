// navigation/CustomDrawerContent.tsx
import { View, Text } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useUserInfo } from "@/context/UserInfoContext";
import { LogoutButton } from "@/components/Buttons/LogoutButton";

export function CustomDrawerContent(props: any) {
  const { userInfo } = useUserInfo();

  return (
    <DrawerContentScrollView {...props}>
      <View className="p-6">
        <Text className="text-lg font-bold mb-4">{userInfo?.email}</Text>

        <LogoutButton />
      </View>
    </DrawerContentScrollView>
  );
}
