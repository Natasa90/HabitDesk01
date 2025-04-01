import { FC } from "react";
import { View, Linking } from "react-native";
import { TextWrapper } from "@/components/Layout";
import { Checkbox } from "react-native-paper";
import { TermsAgreementProps } from "@/types/AuthTypes";
import { CustomCheckbox } from "../CustomCheckbox";

export const TermsAgreement: FC<TermsAgreementProps> = ({
 checked,
 setChecked,
}) => {
 const openUrl = (url: string) => {
  Linking.openURL(url).catch((err) =>
   console.error("Failed to open URL:", err)
  );
 };

 return (
  <View className="flex-row">
   <CustomCheckbox checked={checked} onToggle={() => setChecked(!checked)} />
   <TextWrapper className="text-xs text-gray-600 ml-2">
    I agree to Postcraft’s{" "}
    <TextWrapper
     className="text-xs text-blue-600"
     onPress={() => openUrl("https://your-terms-url.com")}
    >
     Terms of Service
    </TextWrapper>
    {"\n"}and{" "}
    <TextWrapper
     className="text-xs text-blue-600"
     onPress={() => openUrl("https://your-privacy-policy-url.com")}
    >
     Privacy Policy
    </TextWrapper>
   </TextWrapper>
  </View>
 );
};
