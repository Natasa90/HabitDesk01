import React from "react";
import { FlatList, View, Text } from "react-native";
import { ContactForm } from "@/components/ContactForm";
import { TextWrapper } from "@/components/Layout";

export const ContactScreen = () => {
  return (
    <FlatList
      className="p-5"
      data={[]} // no list data, we're using header only
      keyExtractor={(_, index) => index.toString()}
      renderItem={null}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <>
          {/* Header Badge */}
          <View className="items-center mb-4">
            <TextWrapper className="py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
              Contact Us
            </TextWrapper>
          </View>

          {/* Title */}
          <View className="items-center mb-10">
            <TextWrapper className="text-3xl font-bold text-center">
              We will{" "}
              <TextWrapper className="text-blue-500">be glad</TextWrapper> to
              hear from you!
            </TextWrapper>
          </View>

          {/* Form */}
          <ContactForm />
        </>
      }
    />
  );
};
