import { useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth";
import { UserInfoContext } from "@/context/UserInfoContext";
import {
 UserProfileTitle,
 ToDoList,
 UserProfileButtons,
 UserWeeklyGoals,
 ScheduleLearningButton
} from "@/components/userProfileElements";
import { useCleanOldReminders } from "@/lib/hooks";

export const UserProfileScreen = () => {
	const { userInfo } = useContext(UserInfoContext);

	useEffect(() => {
		if (userInfo?.email) {
			useCleanOldReminders(userInfo.email);
		}
	}, [userInfo?.email]);

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
