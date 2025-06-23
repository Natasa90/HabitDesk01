import { FC } from "react";
import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { ReminderProps } from "@/types/NotificationTypes";
import { ScheduleLearningListProps } from "@/types/NotificationTypes";


export const ScheduleLearningList: FC<ScheduleLearningListProps> = ({
  reminders,
  loading,
  error,
}) => {
  if (loading) {
    return (
      <View className="py-6">
        <TextWrapper className="text-center text-gray-500 text-base">
          Loading reminders...
        </TextWrapper>
      </View>
    );
  }

  if (error) {
    return (
      <View className="py-4">
        <TextWrapper className="text-center text-red-500 text-base">
          Error: {error}
        </TextWrapper>
      </View>
    );
  }

  if (reminders.length === 0) {
    return (
      <View className="p-4">
        <TextWrapper className="text-center text-gray-500 text-base">
          No scheduled reminders yet.
        </TextWrapper>
      </View>
    );
  }

  return (
    <View className="border-t-2 border-gray-300">
      <TextWrapper className="text-center text-lg my-4">
        Your Scheduled Reminders:
      </TextWrapper>
      {reminders.map((item) => (
        <View
          key={item.id}
          className="bg-white border border-gray-200 rounded-xl shadow-sm mb-3 p-4"
        >
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
      ))}
    </View>
  );
};
