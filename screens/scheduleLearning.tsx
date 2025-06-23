import { ScrollView, View } from "react-native";
import {
  ScheduleLearningTitle,
  LearningTimePicker,
  ScheduleLearningList,
} from "@/components/ScheduleLearningComponents";
import { useReminders } from "@/lib/hooks";

export const ScheduleLearningScreen = () => {
  const { reminders, loading, error, refresh } = useReminders();

  return (
    <ScrollView className="flex-1 px-4">
      <ScheduleLearningTitle />
      <LearningTimePicker onSaveSuccess={refresh} />
      <ScheduleLearningList
        reminders={reminders}
        loading={loading}
        error={error}
      />
    </ScrollView>
  );
};
