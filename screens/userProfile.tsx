import { useContext, useEffect } from "react";
import { ScrollView } from "react-native";
import { FormTitle } from "@/components/Auth";
import { UserInfoContext } from "@/context/UserInfoContext";
import {
 UserProfileTitle,
 ToDoList,
 UserWeeklyGoals,
} from "@/components/userProfileElements";
import { UserProfileButton, LogoutButton } from "@/components/Buttons";
import { useCleanOldReminders } from "@/lib/hooks";
import { FontAwesome } from "@expo/vector-icons";

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
	 <UserProfileButton label="Learning Reminder" navigateTo="ScheduleLearning" icon={<FontAwesome name="play" size={16} color="red" />} />
   <ToDoList />
   <UserProfileButton label="Go to Porch Screen" navigateTo="Porch" icon={<FontAwesome name="play" size={16} color="red" />} />
	 <UserProfileButton label="Go to Free Resources" navigateTo="FreeResources" icon={<FontAwesome name="play" size={16} color="red" />} />
	 <LogoutButton />
  </ScrollView>
 );
};
