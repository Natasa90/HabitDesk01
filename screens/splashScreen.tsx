import React, { useEffect, useRef } from "react";
import { View, Image, Animated, StatusBar } from "react-native";
import { useTypedNavigation } from "@/lib/hooks/useTypedNavigation";
import { useUserInfo } from "@/context/UserInfoContext";
import { styles } from "@/components/Layout";

export const SplashScreen = () => {
  const navigation = useTypedNavigation();
  const logoBounce = useRef(new Animated.Value(0)).current;

  const { userInfo, loading } = useUserInfo();

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(logoBounce, {
          toValue: -30,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(logoBounce, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
    };

    startAnimation();
  }, []);

  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      if (userInfo?.email) {
        navigation.replace("AppDrawer", {
          screen: "PorchStack",
          params: { screen: "Porch" },
        });
      } else {
        navigation.replace("Auth", { screen: "Login" });
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [loading, userInfo, navigation]);

  return (
    <View style={styles.splashScreenView}>
      <StatusBar barStyle="light-content" />

      <Animated.View
        className="justify-center items-center"
        style={{ transform: [{ translateY: logoBounce }] }}
      >
        <Image
          source={require("../assets/images/slavoio-logo.png")}
          style={{ width: 192, height: 192 }}
        />
      </Animated.View>
    </View>
  );
};
