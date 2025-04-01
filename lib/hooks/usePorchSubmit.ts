import { useState, useContext } from "react";
import { Alert } from "react-native";
import { UserInfoContext } from "@/context/UserInfoContext";
import { PorchType } from "@/Types/PorchTypes";
import supabase from "@/lib/supabase";
import { isValidHttpUrl } from "lib/constants";

export const usePorchSubmit = (
  setPorchs: React.Dispatch<React.SetStateAction<PorchType[]>>,
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>,
  resetForm: () => void
) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [responseUpdate, setResponseUpdate] = useState<string>("");
  const { userInfo } = useContext(UserInfoContext);

  const handleSubmit = async (text: string, source: string) => {
    if (text && isValidHttpUrl(source)) {
      const payload = { text, source, email: userInfo?.email };
      setIsUploading(true);

      try {
        const { data: newUpdate, error } = await supabase
          .from("porch")
          .insert([payload])
          .select();

        if (error) {
          console.error("Error inserting data:", error);
          setIsUploading(false);
          return;
        }

        setPorchs((porchs: PorchType[]) => [newUpdate[0], ...porchs]);

        setTimeout(() => {
          resetForm();
          setIsUploading(false);
          setShowForm(false);
          setResponseUpdate("");
        }, 500);
      } catch (error) {
        console.error("Request failed:", error);
        setIsUploading(false);
      }
    } else {
      Alert.alert(
        "Submission Failed",
        `Please ensure all text fields are filled correctly, and your URL is valid. Double-check your entries and try again!\n Your input: \n source: ${source}\n text: ${text}`
      );
    }
  };

  return { isUploading, responseUpdate, handleSubmit };
};
