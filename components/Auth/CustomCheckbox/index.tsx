import React, { FC } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { CustomCheckboxProps } from "@/types/AuthTypes";

export const CustomCheckbox: FC<CustomCheckboxProps> = ({ checked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} className="flex-row items-center">
      <View
        className={`w-6 h-6 border-2 ${
          checked ? "border-black bg-transparent" : "border-gray-300 bg-transparent"
        } rounded-sm justify-center items-center`}
      >
        {checked && (
          <View className="w-4 h-4 bg-black rounded-sm"></View> 
        )}
      </View>
    </TouchableOpacity>
  );
};

