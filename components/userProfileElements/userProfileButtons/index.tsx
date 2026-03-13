import { TouchableOpacity, View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { LogoutButton } from "@/components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/components/Layout";
import {
  useNavigation,
  CompositeNavigationProp,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabParamList } from "@/types/MainTabParamList";
import { RootStackParamList } from "@/types/RootStackParamList";

// Composite navigation type for nested tabs + stacks
type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList>,
  NativeStackNavigationProp<RootStackParamList>
>;
export const UserProfileButtons = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View className="gap-6">
      <TouchableOpacity
        onPress={() => navigation.navigate("PorchStack", { screen: "Porch" })}
        className="bg-gray-300 p-6 rounded-xl flex-row justify-center items-center"
      >
        <TextWrapper className="text-lg text-gray-900">
          Go to Porch Screen
        </TextWrapper>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="black"
          style={styles.arrowStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AppDrawer", { screen: "Resources" })
        }
        className="bg-gray-300 p-6 rounded-xl flex-row justify-center items-center"
      >
        <TextWrapper className="text-lg text-gray-900">
          Go to Free Resources
        </TextWrapper>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="black"
          style={styles.arrowStyle}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("PorchStack", { screen: "Contact" })}
        className="bg-gray-300 p-6 rounded-xl flex-row justify-center items-center"
      >
        <TextWrapper className="text-lg text-gray-900">
          Go to Contact
        </TextWrapper>
        <Ionicons
          name="arrow-forward"
          size={18}
          color="black"
          style={styles.arrowStyle}
        />
      </TouchableOpacity>
      <View className="items-center justify-center">
        <LogoutButton />
      </View>
    </View>
  );
};
