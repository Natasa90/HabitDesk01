import { TouchableOpacity } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "@/components/Layout";

export const ScheduleLearningButton = () => {
	const navigation = useTypedNavigation(); 
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("ScheduleLearning")}
			className="bg-gray-300 p-6 mt-2 rounded-xl flex-row justify-center items-center mb-6"
			>
			 <TextWrapper className="text-lg text-gray-900">Schedule Learning Session</TextWrapper>
			<Ionicons
     		name="arrow-forward"
     		size={18}
     		color="black"
     		style={styles.arrowStyle}
    	/>
		</TouchableOpacity>
	)
}