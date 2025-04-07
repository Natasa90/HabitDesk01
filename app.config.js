import dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "habitdesk",
    slug: "habitdesk",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/slavoio-logo.png", 
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.habitdesk", 
      buildNumber: "1", 
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        "aps-environment": "production", // Add this for production environment
      },
    },
    android: {
      package: "com.anonymous.habitdesk", 
    },
    scheme: "habitdesk", 
    platforms: ["ios", "android", "web"], 
    extra: {
      supabaseUrl: process.env.SUPABASE_URL, 
      supabaseKey: process.env.SUPABASE_KEY, 
      ascAppId: process.env.ASC_APP_ID, 
      ascKeyName: process.env.ASC_KEY_NAME, 
      ascKeyId: process.env.ASC_KEY_ID,
      eas: {
        projectId: "e2b1a9f5-a699-4631-b5c1-8c2049a10d0d", 
      },
      apnsKeyId: process.env.APNS_KEY_ID, 
      apnsTeamId: process.env.APNS_TEAM_ID, 
    },
  },
};
