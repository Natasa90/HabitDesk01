import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth";
import {
 UserProfileTitle,
 ToDoList,
 UserProfileButtons,
 UserWeeklyGoals,
 ScheduleLearningButton
} from "@/components/userProfileElements";


export const UserProfileScreen = () => {

 return (
  <ScrollView className="flex-1 mt-4 px-5">
   <FormTitle />
   <UserProfileTitle />
   <UserWeeklyGoals />
	 <ScheduleLearningButton />
   <ToDoList />
   <UserProfileButtons />
  </ScrollView>
 );
};
