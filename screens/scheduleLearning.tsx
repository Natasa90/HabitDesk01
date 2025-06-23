import { FlatList, View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { LearningTimePicker, ScheduleLearningTitle } from "@/components/ScheduleLearningComponents";
import { useReminders } from "@/lib/hooks";

export const ScheduleLearningScreen = () => {
	const { reminders, loading, error, refresh } = useReminders();

	 return (
    <FlatList
      data={reminders}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={
        <View className="px-4 pt-4">
          <ScheduleLearningTitle />
          <LearningTimePicker onSaveSuccess={refresh} />
					{reminders.length > 0 && (
            <View className="border-t-2 border-gray-300 py-4">
              <TextWrapper className="text-center text-lg">
                Your Scheduled Reminders:
              </TextWrapper>
            </View>
          )}

          {loading && (
            <View className="py-6">
              <TextWrapper className="text-center text-gray-500 text-base">
                Loading reminders...
              </TextWrapper>
            </View>
          )}

          {error && (
            <View className="py-4">
              <TextWrapper className="text-center text-red-500 text-base">
                Error: {error}
              </TextWrapper>
            </View>
          )}

          {!loading && reminders.length === 0 && (
            <View className="p-4">
              <TextWrapper className="text-center text-gray-500 text-base">
                No scheduled reminders yet.
              </TextWrapper>
            </View>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View className="bg-white border border-gray-200 rounded-xl shadow-sm mb-3 p-4 mx-4">
          <TextWrapper className="text-base text-customBlue font-IBM_medium text-center">
            {new Date(item.learning_date).toLocaleString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </TextWrapper>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 32 }}
    />
  );
};