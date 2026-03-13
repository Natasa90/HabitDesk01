import { TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/components/Layout";

import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { MainTabParamList } from "@/types/MainTabParamList";

type NavigationProp = BottomTabNavigationProp<MainTabParamList>;

export const ScheduleLearningButton = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PorchStack", {
          screen: "ScheduleLearning",
        })
      }
      className="bg-gray-300 p-6 mt-2 rounded-xl flex-row justify-center items-center mb-6"
    >
      <TextWrapper className="text-lg text-gray-900">
        Schedule Learning Session
      </TextWrapper>

      <Ionicons
        name="arrow-forward"
        size={18}
        color="black"
        style={styles.arrowStyle}
      />
    </TouchableOpacity>
  );
};
