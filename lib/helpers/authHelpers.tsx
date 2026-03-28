import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import supabase from "../supabase";
import { NavigationProp } from "@react-navigation/native";
import { isValidEmail } from "../constants";

export const handlePasswordReset = async (
  email: string,
  setIsEmailValid: (valid: boolean) => void,
  navigation: NavigationProp<any>,
) => {
  if (!email.trim()) {
    setIsEmailValid(false);
    Alert.alert("Please add an email.");
    return;
  }

  if (!isValidEmail(email)) {
    setIsEmailValid(false);
    Alert.alert("Invalid Email", "Please enter a valid email address.");
    return;
  }

  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "habitdesk://create-new-password",
    });

    if (error) {
      Alert.alert("No account found with this email address.");
    } else {
      Alert.alert(
        "Success",
        `A password reset email has been sent to ${email}.`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("Auth", { screen: "Login" }),
          },
        ],
      );
    }
  } catch (error: any) {
    Alert.alert("Error", "Something went wrong. Please try again later.");
    console.log(`<ResetPassword Request>Error Msg: ${error.message}`);
  }
};

export const signUpWithEmail = async (
  email: string,
  password: string,
  confirmPassword: string,
  setSignUpError: (message: string) => void,
  setEmailConfirmationSent: (status: boolean) => void,
) => {
  if (!email.trim()) {
    Alert.alert("Error", "Email is required!");
    return;
  }

  if (!password.trim()) {
    Alert.alert("Error", "Password is required!");
    return;
  }

  if (password.length < 8) {
    Alert.alert("Error", "Password must be at least 8 characters long.");
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert("Error", "Passwords do not match.");
    return;
  }

  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      let customMessage =
        error.message === "User already registered"
          ? "There is already an account registered with this email."
          : "The email or password given is not valid. Please try again.";

      setSignUpError(customMessage);
    } else {
      setEmailConfirmationSent(true);
      Alert.alert(
        "Success",
        "Signup successful! Check your email to verify your account.",
      );
    }
  } catch (error) {
    console.log("Error during sign-up: ", error);
    Alert.alert("Error", "An unexpected error occurred. Please try again.");
  }
};

export const signInWithEmail = async (
  email: string,
  password: string,
): Promise<{ error?: any }> => {
  if (!email.trim()) {
    Alert.alert("Email is required!");
    return { error: "Email is required" };
  }

  if (password.length < 8) {
    Alert.alert("Password must be at least 8 characters long.");
    return { error: "Password too short" };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login Error:", error.message);
      Alert.alert("Login failed!", error.message);
    }

    // Supabase automatically persists session and triggers onAuthStateChange
    // No need to manually save AsyncStorage or set context

    return { error };
  } catch (err) {
    console.log("Unexpected error:", err);
    Alert.alert("Unexpected error occurred. Please try again.");
    return { error: err };
  }
};
