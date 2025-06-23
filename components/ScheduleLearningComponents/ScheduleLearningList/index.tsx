import { FC, useState } from "react";
import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { ScheduleLearningListProps } from "@/types/NotificationTypes";
import { useDeleteReminder, useUpdateReminder } from "@/lib/hooks";
import { DateTimeSelector } from "../DateTimeSelector";


export const ScheduleLearningList: FC<ScheduleLearningListProps> = ({
  reminders,
  loading,
  error,
	refresh
}) => {
	const { deleteReminder, deleting } = useDeleteReminder(refresh);
  const { updateReminder, updating } = useUpdateReminder(refresh);

	const [pickerVisible, setPickerVisible] = useState(false);
	const [editingReminderId, setEditingReminderId] = useState<number | null>(null);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());



	const handleDelete = async (id: number) => {
    await deleteReminder(id);
  };

  const handleUpdate = (id: number, date: Date) => {
		setEditingReminderId(id);
		setSelectedDate(date);
		setPickerVisible(true);
	};
	
	const handleDateConfirm = async (date: Date) => {
		if (editingReminderId !== null) {
			await updateReminder(editingReminderId, date);
			setEditingReminderId(null);
			setPickerVisible(false);
		}
	};
	
	const handlePickerClose = () => {
		setEditingReminderId(null);
		setPickerVisible(false);
	};
	

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
					<View className="flex-row justify-center mt-3 space-x-4">
            <TextWrapper
              className="text-red-500 font-bold"
              onPress={() => handleDelete(item.id)}
            >
              {deleting ? "Deleting..." : "Delete"}
            </TextWrapper>

            <TextWrapper
              className="text-blue-500 font-bold"
              onPress={() => handleUpdate(item.id, new Date(item.learning_date))}
            >
              {updating ? "Updating..." : "Edit Time"}
            </TextWrapper>
          </View>
        </View>
      ))}
			{pickerVisible && (
  			<DateTimeSelector
    			visible={pickerVisible}
    			initialDate={selectedDate}
    			onConfirm={handleDateConfirm}
    			onClose={handlePickerClose}
  			/>
			)}
    </View>
  );
};