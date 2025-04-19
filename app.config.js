import dotenv from 'dotenv';

dotenv.config();

export default {
  expo: {
    name: "habitdesk",
    slug: "habitdesk",
    version: "1.0.1",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    plugins: [
    "expo-secure-store"
    ],
    splash: {
      image: "./assets/images/slavoio-logo.png", 
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.habitdesk",  
      buildNumber: "16",  
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        "aps-environment": "production",
      },
      config: {
        linking: {
          prefixes: ["habitdesk://"],
          config: {
            screens: {
               Home: 'home',
               Login: 'login',
               UserProfile: 'profile',
               Porch: 'porch',
               FreeResources: 'free-resources',
               CreateAccount: 'create-account',
               ResetPassword: 'reset-password',
               CreateNewPassword: 'create-new-password',
            }
          }
        }
      }
    },
    android: {
      package: "com.anonymous.habitdesk", 
    },
    scheme: "habitdesk", 
    deepLinking: true,
    deepLinks: ["habitdesk://"],
    platforms: ["ios", "android", "web"], 
    extra: {
      supabaseUrl: process.env.SUPABASE_URL, 
      supabaseKey: process.env.SUPABASE_KEY, 
      githubClientId: process.env.GITHUB_CLIENT_ID,
      githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
      eas: {
        projectId: "afa78e4f-bbcb-49e0-882d-458c325a8b36"
      },
    },
  },
};
