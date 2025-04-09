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
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        "aps-environment": "production",
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
      eas: {
        "projectId": "afa78e4f-bbcb-49e0-882d-458c325a8b36"
      },
    },
  },
};
