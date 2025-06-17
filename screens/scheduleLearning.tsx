import { ScrollView } from "react-native";
import { LearningTimePicker, ScheduleLearningTitle } from "@/components/ScheduleLearningComponents";

export const ScheduleLearningScreen = () => {
	return (
		<ScrollView className="flex-1">
			<ScheduleLearningTitle />
    	<LearningTimePicker />
		</ScrollView>
  );
}