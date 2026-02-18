import { TouchableOpacity, View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { LogoutButton } from "@/components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/components/Layout";
import {
  CompositeNavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MainTabParamList } from "@/types/MainTabParamList";
import { RootStackParamList } from "@/types/NavigationTypes";

type TabNav = BottomTabNavigationProp<MainTabParamList>;
type StackNav = NativeStackNavigationProp<RootStackParamList>;

type ProfileScreenNavigationProp = CompositeNavigationProp<TabNav, StackNav>;

export const UserProfileButtons = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  return (
    <View className="gap-6">
      <TouchableOpacity
        onPress={() => navigation.navigate("Porch")}
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
        onPress={() => navigation.navigate("Resources")}
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
        onPress={() => navigation.navigate("Contact")}
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
