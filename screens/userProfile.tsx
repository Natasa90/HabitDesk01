import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth";
import {
 UserProfileTitle,
 ToDoList,
 UserProfileButtons,
UserWeeklyGoals
} from "@/components/userProfileElements";


export const UserProfileScreen = () => {

 return (
  <ScrollView className="flex-1 mt-10 px-5">
   <FormTitle />
   <UserProfileTitle />
   <UserWeeklyGoals />
   <ToDoList />
   <UserProfileButtons />
  </ScrollView>
 );
};
