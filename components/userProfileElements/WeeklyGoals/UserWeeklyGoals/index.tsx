import { useState, useMemo, useEffect } from "react";
import { View, TouchableOpacity, Modal } from "react-native";
import { BlurView } from "expo-blur";
import { TextWrapper } from "@/components/Layout";
import { UserCalendar } from "../Calendar";
import { GoalsForm } from "../GoalsForm";
import { useUserLearningData } from "@/lib/hooks";
import { styles } from "@/components/Layout";

export const UserWeeklyGoals = () => {
 const [showGoalsForm, setShowGoalsForm] = useState<boolean>(false);
 const {
  weeklyGoal: initialWeeklyGoal,
  currentStreak,
  longestStreak,
  weeklyLearningDays,
  learningDates,
 } = useUserLearningData();

 const [weeklyGoal, setWeeklyGoal] = useState(initialWeeklyGoal);
 const memoizedLearningDates = useMemo(() => learningDates, [learningDates]);

 useEffect(() => {
  setWeeklyGoal(initialWeeklyGoal);
 }, [initialWeeklyGoal]);

 return (
  <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
   <View className="flex-1 justify-start items-end">
    <TouchableOpacity onPress={() => setShowGoalsForm(true)} className="">
     <TextWrapper className="font-IBM_light pb-3">Edit Goal ➡️</TextWrapper>
    </TouchableOpacity>
   </View>
  <View className="bg-white rounded-lg mb-4 shadow-md">
   <TextWrapper className="text-xl text-center py-4 font-IBM_medium">
    Weekly Learning Goals
   </TextWrapper>
</View>
   <TextWrapper className="text-4xl text-center my-2">
    {weeklyLearningDays} / {weeklyGoal}
   </TextWrapper>
   {weeklyGoal > 1 ? (
    <TextWrapper className="text-center text-lg">days</TextWrapper>
   ) : (
    <TextWrapper className="text-center text-lg">day</TextWrapper>
   )}
   <View className="text-center my-2">
    {weeklyLearningDays >= weeklyGoal ? (
     <TextWrapper className="text-green-500 text-sm text-center text-lg">
      Nice! 🚀
     </TextWrapper>
    ) : weeklyLearningDays >= Math.floor(weeklyGoal / 2) ? (
     <TextWrapper className="text-yellow-500 text-sm text-center text-lg">
      On Track
     </TextWrapper>
    ) : (
     <TextWrapper className="text-red-500 text-sm text-center text-lg">
      Off Track
     </TextWrapper>
    )}
   </View>

   <View className="bg-white rounded-lg p-4 my-4 shadow-md">
    <TextWrapper className="text-lg">Current Streak</TextWrapper>
    <TextWrapper className="text-2xl font-bold pt-2 ">
     {currentStreak}
     {currentStreak === 1 ? (
      <TextWrapper className="text-sm">{` ${" "}day`}</TextWrapper>
     ) : (
      <TextWrapper className="text-sm">{` ${" "}days`}</TextWrapper>
     )}
    </TextWrapper>
    <View className="border-t border-gray-200 my-2 flex-row justify-between pt-2">
     <TextWrapper>✅ Longest Streak</TextWrapper>
     <TextWrapper>{longestStreak}</TextWrapper>
    </View>
   </View>
    <TextWrapper className="text-center pb-4 text-lg font-IBM_light">Learning Charts</TextWrapper>
    <UserCalendar learningDates={memoizedLearningDates} />
   <Modal
    visible={showGoalsForm}
    transparent
    animationType="fade"
    onRequestClose={() => setShowGoalsForm(false)}
   >
    <View className="flex-1 justify-center items-center">
     <BlurView intensity={80} tint="dark" style={styles.updateGoalFormsBlur} />
     <View className="bg-gray-300 rounded-lg p-4 shadow-md">
      <GoalsForm
       onClose={() => setShowGoalsForm(false)}
       updateGoal={setWeeklyGoal}
      />
     </View>
    </View>
   </Modal>
  </View>
 );
};
