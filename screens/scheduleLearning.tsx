import { ScrollView } from "react-native";
import { LearningTimePicker, ScheduleLearningTitle, ScheduleLearningList } from "@/components/ScheduleLearningComponents";

export const ScheduleLearningScreen = () => {
	return (
		<ScrollView className="flex-1">
			<ScheduleLearningTitle />
    	<LearningTimePicker />
			<ScheduleLearningList />
		</ScrollView>
  );
}