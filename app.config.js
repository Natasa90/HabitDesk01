import dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "HabitDesk01", // You can adjust this name as needed
    slug: "HabitDesk01", // Same for slug
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png", // Set your icon here
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png", // Your splash screen image
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.habitdesk", // Add your bundle identifier
      buildNumber: "1", // Set the build number
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        pushNotifications: true, // Enable push notifications
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png", // Your adaptive icon
        backgroundColor: "#ffffff", // Background color for adaptive icon
      },
      package: "com.anonymous.habitdesk", // Android package name
    },
    scheme: "habitdesk", // Scheme for deep linking
    platforms: ["ios", "android", "web"], // Supported platforms
    extra: {
      supabaseUrl: process.env.SUPABASE_URL, // Your Supabase URL
      supabaseKey: process.env.SUPABASE_KEY, // Supabase key
      ascAppId: process.env.ASC_APP_ID, // ASC app ID
      ascKeyName: process.env.ASC_KEY_NAME, // ASC key name
      ascKeyId: process.env.ASC_KEY_ID, // ASC key ID
      eas: {
        projectId: "e2b1a9f5-a699-4631-b5c1-8c2049a10d0d", // Your EAS project ID
      },
    },
  },
};
