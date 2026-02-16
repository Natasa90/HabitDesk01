import React, { FC, useState, useEffect } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import Checkbox from "expo-checkbox";

import supabase from "@/lib/supabase";
import { notificationStatus } from "@/lib/helpers/notificationStatus";
import { validateEmail } from "@/lib/helpers/validateEmail";
import { Notification } from "@/components/Notification";
import { TextWrapper } from "@/components/Layout";
import { GradientText } from "@/components/GradientText";

export const ContactForm: FC = () => {
  const initialPayload = {
    email: "",
    subject: "",
    message: "",
    department: "",
    name: "",
    terms: "",
  };

  const [payload, setPayload] = useState(initialPayload);
  const [reqStatus, setReqStatus] = useState<
    "pending" | "success" | "error" | null
  >(null);

  const resetForm = () => setPayload(initialPayload);

  useEffect(() => {
    if (reqStatus === "success" || reqStatus === "error") {
      const timer = setTimeout(() => setReqStatus(null), 2000);
      return () => clearTimeout(timer);
    }
  }, [reqStatus]);

  const sendPayload = async () => {
    setReqStatus("pending");

    const { data, error } = await supabase.from("contact_messages").insert([
      {
        email: payload.email,
        subject: payload.subject,
        message: payload.message,
        department: payload.department,
        name: payload.name,
      },
    ]);

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Error inserting message:", error);
      setReqStatus("error");
    } else {
      console.log("Message stored successfully:", data);
      setReqStatus("success");
      resetForm();
    }
  };

  const handleSubmit = () => {
    if (!validateEmail(payload.email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (payload.terms !== "accept") {
      Alert.alert("Terms Required", "You must accept Terms and Conditions.");
      return;
    }

    if (!payload.department) {
      Alert.alert("Department Required", "Please choose a department.");
      return;
    }

    sendPayload();
  };

  const notification = notificationStatus(reqStatus);

  return (
    <View className="p-4 bg-white rounded-xl shadow-xl mb-6">
      {/* Title */}
      <GradientText text="Send us a message" />

      {/* Inner Card Body */}
      <View className="mt-4 bg-gray-200 border-4 border-gray-200 rounded-2xl p-5 space-y-4">
        {/* Department */}
        <View>
          <TextWrapper className="font-IBM_semibold text-gray-900 mb-2">
            Department
          </TextWrapper>

          <View className="flex-row space-x-8">
            {["Consulting", "Support"].map((dep) => (
              <TouchableOpacity
                key={dep}
                className="flex-row items-center"
                onPress={() =>
                  setPayload((prev) => ({ ...prev, department: dep }))
                }
              >
                <View
                  className={`w-4 h-4 rounded-full border-2 mr-2 ${
                    payload.department === dep
                      ? "bg-blue-500 border-blue-500"
                      : "border-gray-500"
                  }`}
                />
                <TextWrapper>{dep}</TextWrapper>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Subject */}
        <TextInput
          className="bg-white rounded-xl px-4 py-4"
          placeholder="Subject"
          placeholderTextColor="#9CA3AF"
          value={payload.subject}
          onChangeText={(text) =>
            setPayload((prev) => ({ ...prev, subject: text }))
          }
        />

        {/* Name */}
        <TextInput
          className="bg-white rounded-xl px-4 py-4"
          placeholder="Name"
          placeholderTextColor="#9CA3AF"
          value={payload.name}
          onChangeText={(text) =>
            setPayload((prev) => ({ ...prev, name: text }))
          }
        />

        {/* Email */}
        <TextInput
          className={`bg-white rounded-xl px-4 py-4 ${
            payload.email && !validateEmail(payload.email)
              ? "border-2 border-red-400"
              : ""
          }`}
          placeholder="name@example.com"
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          value={payload.email}
          onChangeText={(text) =>
            setPayload((prev) => ({ ...prev, email: text }))
          }
        />

        {/* Message */}
        <TextInput
          className="bg-white rounded-xl px-4 py-4 h-28"
          placeholder="Message..."
          placeholderTextColor="#9CA3AF"
          multiline
          textAlignVertical="top"
          value={payload.message}
          onChangeText={(text) =>
            setPayload((prev) => ({ ...prev, message: text }))
          }
        />

        {/* Terms */}
        <View className="flex-row items-center mt-2">
          <Checkbox
            value={payload.terms === "accept"}
            onValueChange={(newValue: boolean) =>
              setPayload((prev) => ({
                ...prev,
                terms: newValue ? "accept" : "",
              }))
            }
            className="mr-3"
          />
          <TextWrapper>I agree to Terms and Conditions</TextWrapper>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          className={`mt-4 py-4 rounded-xl items-center ${
            reqStatus === "pending" ? "bg-gray-400" : "bg-blue-500"
          }`}
          onPress={handleSubmit}
          disabled={reqStatus === "pending"}
        >
          <TextWrapper className="text-white font-IBM_semibold text-base">
            {reqStatus === "pending" ? "Sending..." : "Submit"}
          </TextWrapper>
        </TouchableOpacity>

        {/* Notification */}
        {notification && (
          <View className="mt-4">
            <Notification
              status={notification.status}
              title={notification.title}
              message={notification.message}
            />
          </View>
        )}
      </View>
    </View>
  );
};
