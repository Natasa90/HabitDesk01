import * as Font from "expo-font";
import { useState, useEffect } from "react";

export const useFonts = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "IBMPlexSerif-Regular": require("../../assets/fonts/IBMPlexSerif-Regular.ttf"),  
        "IBMPlexSerif-Bold": require("../../assets/fonts/IBMPlexSerif-Bold.ttf"),
        "IBMPlexSerif-BoldItalic": require("../../assets/fonts/IBMPlexSerif-BoldItalic.ttf"),
        "IBMPlexSerif-ExtraLight": require("../../assets/fonts/IBMPlexSerif-ExtraLight.ttf"),
        "IBMPlexSerif-ExtraLightItalic": require("../../assets/fonts/IBMPlexSerif-ExtraLightItalic.ttf"),
        "IBMPlexSerif-Italic": require("../../assets/fonts/IBMPlexSerif-Italic.ttf"),
        "IBMPlexSerif-Light": require("../../assets/fonts/IBMPlexSerif-Light.ttf"),
        "IBMPlexSerif-LightItalic": require("../../assets/fonts/IBMPlexSerif-LightItalic.ttf"),
        "IBMPlexSerif-Medium": require("../../assets/fonts/IBMPlexSerif-Medium.ttf"),
        "IBMPlexSerif-MediumItalic": require("../../assets/fonts/IBMPlexSerif-MediumItalic.ttf"),
        "IBMPlexSerif-SemiBoldItalic": require("../../assets/fonts/IBMPlexSerif-SemiBoldItalic.ttf"),
        "IBMPlexSerif-SemiBold": require("../../assets/fonts/IBMPlexSerif-SemiBold.ttf"),
        "IBMPlexSerif-Thin": require("../../assets/fonts/IBMPlexSerif-Thin.ttf"),
        "IBMPlexSerif-ThinItalic": require("../../assets/fonts/IBMPlexSerif-ThinItalic.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  return fontsLoaded;
};
