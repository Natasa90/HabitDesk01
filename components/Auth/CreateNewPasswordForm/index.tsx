import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { AccountButton } from "@/components/Buttons";
import { TextWrapper } from "@/components/Layout";
import { FontAwesome } from "@expo/vector-icons";
import supabase from "@/lib/supabase";
import { useTypedNavigation } from "@/lib/hooks";
import { styles } from "@/components/Layout"; 

export const CreateNewPasswordForm = () => {
  const navigation = useTypedNavigation();
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleCreateNewPassword = async () => {
    if (!newPassword.trim()) {
      Alert.alert("Error", "Please enter a new password.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (error) {
        console.error("Supabase error:", error);
        Alert.alert("Error", error.message || "Something went wrong. Please try again later.");
      } else {
        Alert.alert("Success", "Your password has been reset.");
        navigation.navigate("Login"); 
      }
    } catch (error: any) {
      console.error("Error in handlePasswordReset:", error);
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

 return (
  <View className="items-center p-9">
    <TextWrapper className="text-xl font-IBM_semibold mb-1">
      Create New Password
    </TextWrapper>
    <TextWrapper className="text-center pb-8 text-gray-500 italic">
      Enter your new password below to reset your account.
    </TextWrapper>
    <View
      className="px-4 py-6 bg-gray-50 rounded-xl shadow-xl"
      style={styles.authFormsShadow}
    >
      <View className="space-y-5">
        <View>
          <View className="flex-row items-center">
            <FontAwesome
              name="lock"
              size={24}
              color="gray"
              style={{ paddingLeft: 3 }}
            />
            <TextWrapper className="text-base font-medium text-gray-900 pl-2">
              New Password
            </TextWrapper>
          </View>
          <View className="mt-2.5">
            <TextInput
              placeholder="Enter your new password"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
              className="border border-gray-500 w-full py-4 pl-3 text-black bg-white rounded-md font-IBM_italic"
            />
          </View>
        </View>
        <View className="flex items-center justify-between">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <TextWrapper className="text-base font-medium text-orange-500">
              Cancel
            </TextWrapper>
          </TouchableOpacity>
        </View>
        <View>
          <AccountButton onPress={handleCreateNewPassword} disabled={loading}>
            <TextWrapper className="text-white font-IBM_semibold">
              {loading ? "Resetting..." : "Reset Password"}
            </TextWrapper>
          </AccountButton>
        </View>
      </View>
    </View>
  </View>
);
}