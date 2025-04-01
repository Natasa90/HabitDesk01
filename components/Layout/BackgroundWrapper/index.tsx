import { FC } from "react";
import { ImageBackground, View } from "react-native";
import { BackgroundWrapperProps } from "@/types/LayoutTypes";
import { styles } from "../globalStyles";

export const BackgroundWrapper: FC<BackgroundWrapperProps> = ({ children }) => {
  return (
    <ImageBackground
      source={require("../../../assets/images/home-bg.jpeg")}
      style={styles.bgWrapper}
      resizeMode="cover"
    >
      <View style={styles.bgWrapperChildren}>{children}</View>
    </ImageBackground>
  );
};

