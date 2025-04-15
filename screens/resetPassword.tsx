import { ResetPasswordForm } from "@/components/Auth";
import { useTypedNavigation } from "@/lib/hooks";

export const ResetPasswordScreen = () => {
 const navigation = useTypedNavigation();

 const handleCancelReset = () => {
  navigation.navigate("Login");
 };

 return (
   <ResetPasswordForm resetPassword={handleCancelReset} />
 );
};
