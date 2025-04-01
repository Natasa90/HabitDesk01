import { View } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { Team } from "../../index";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { HomeButton } from "@/components/Buttons";

const HomeIntroduction = () => {
 const navigation = useTypedNavigation();

 return (
  <View className="mx-4 my-auto p-2 items-center">
   <TextWrapper className="mt-10 text-3xl color-customBlue text-center font-IBM_bold">
    Welcome to HabitDesk!
   </TextWrapper>
   <TextWrapper className="text-center mt-2 pb-2 font-IBM_mediumItalic">
    Your personal space for tracking and improving your learning habits.
   </TextWrapper>
   <Team />
   <TextWrapper className="text-center">
    At HabitDesk, we provide free resources, a goal-setting porch, and progress
    tracking to help you stay motivated and focused on your learning journey.
   </TextWrapper>
   <TextWrapper className="text-center my-2">
    Whether you're looking for study materials, tracking your growth, or reading
    insightful blogs, we’ve got you covered!
   </TextWrapper>

   <HomeButton onPress={() => navigation.navigate("Login")}>
    <TextWrapper className="text-white text-xl font-IBM_semibold">
     Get Started
    </TextWrapper>
   </HomeButton>
  </View>
 );
};

export default HomeIntroduction
