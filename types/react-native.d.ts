import { Text as RNText } from "react-native";

declare module "react-native" {

  interface TextProps {
    style?: string; 
  }

  interface Text {
    defaultProps: TextProps;
  }
}
