import React, { useEffect, useRef, useContext } from "react";
import { View, Image, Animated, StatusBar } from "react-native";
import { useTypedNavigation } from "@/lib/hooks";
import { UserInfoContext } from "@/context/UserInfoContext";
import { styles } from "@/components/Layout";

export const SplashScreen = () => {
 const navigation = useTypedNavigation();
 const logoBounce = useRef(new Animated.Value(0)).current;
 const { userInfo } = useContext(UserInfoContext);

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
		]).start(() => {
			if (userInfo?.email) {
				navigation.replace("UserProfile");
			} else {
				console.log("No userInfo found. Redirecting to Home.");
				navigation.replace("Home");
			}
		});
	};

	startAnimation();
}, [logoBounce, navigation, userInfo]);

return (
	<View style={styles.splashScreenView}>
		<StatusBar barStyle="light-content" />
		<Animated.View
			className="justify-center items-center"
			style={{
				transform: [{ translateY: logoBounce }],
			}}
		>
			<Image
				source={require("../assets/images/slavoio-logo.png")}
				style={{ width: 192, height: 192 }}
			/>
		</Animated.View>
	</View>
);
};