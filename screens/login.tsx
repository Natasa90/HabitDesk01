import { LoginForm, FormTitle } from "@/components/Auth";
import { useTypedNavigation } from "@/lib/hooks";

export const LoginScreen = () => {

 const navigation = useTypedNavigation();

 const handleSignUp = () => {
  navigation.navigate("CreateAccount");
 };

 const handleResetPassword = () => {
  navigation.navigate("ResetPassword");
 };

 return (
  <>
   <FormTitle />
   <LoginForm signUp={handleSignUp} resetPassword={handleResetPassword} />
  </>
 );
};
