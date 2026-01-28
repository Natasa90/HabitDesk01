import { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { TextWrapper } from "@/components/Layout";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { UserProfileButtonProps } from "@/types/UserProfileTypes";

export const UserProfileButton: FC<UserProfileButtonProps> = ({ label, navigateTo, icon }) => {
  const navigation = useTypedNavigation();

  return (
      <TouchableOpacity
        onPress={() => navigation.navigate(navigateTo)}
				className="flex-row items-center mb-4 rounded-full overflow-hidden shadow-lg"
			>
				<LinearGradient
        	colors={['#ff1f1f', '#ff3c3c']}
        	start={{ x: 0, y: 0 }}
        	end={{ x: 1, y: 0 }}
        	className="pl-4 pr-2 py-3 flex-row items-center rounded-full"
      	>
        	<TextWrapper className="text-white font-bold text-lg mr-2">{label}</TextWrapper>
        	<View className="bg-white p-2 rounded-full">{icon}</View>
      	</LinearGradient>
      </TouchableOpacity>
  );
};
