import { View, Text, ScrollView } from "react-native";
//import { ContactForm } from "../components";

export const ContactScreen = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 min-h-screen py-20 items-center px-4">
        <View className="w-full max-w-2xl items-center">
          <View className="w-full max-w-md mb-8 items-center">
            <Text className="inline-block py-1 px-3 text-xs font-semibold bg-blue-100 text-blue-600 rounded-xl">
              Contact Us
            </Text>

            <Text className="mt-4 text-3xl md:text-4xl font-bold text-center">
              We will <Text className="text-blue-500">be glad</Text> to hear
              from you!
            </Text>
          </View>

          {/*<ContactForm />*/}
        </View>
      </View>
    </ScrollView>
  );
};
