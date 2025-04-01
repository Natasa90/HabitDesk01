import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { TouchableOpacity, View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { LogoutButton } from "@/components/Buttons";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/components/Layout";

export const UserProfileButtons = () => {
 const navigation = useTypedNavigation();

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
    onPress={() => navigation.navigate("FreeResources")}
    className="bg-gray-300 p-6 rounded-xl flex-row justify-center items-center mb-6"
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
   <LogoutButton />
  </View>
 );
};
