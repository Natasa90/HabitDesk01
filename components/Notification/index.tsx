import React, { FC } from "react";
import { View, Text } from "react-native";

interface NotificationProps {
  status: "success" | "error" | "pending";
  title: string;
  message: string;
}

export const Notification: FC<NotificationProps> = ({
  status,
  title,
  message,
}) => {
  // Background color based on status
  const bgColor =
    status === "success"
      ? "bg-green-500"
      : status === "error"
      ? "bg-red-500"
      : "bg-yellow-400";

  return (
    <View className={`${bgColor} p-4 rounded mb-4 shadow-md`}>
      <Text className="font-bold text-white mb-1">{title}</Text>
      <Text className="text-white">{message}</Text>
    </View>
  );
};
