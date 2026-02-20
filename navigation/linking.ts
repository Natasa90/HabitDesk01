import { LinkingOptions } from "@react-navigation/native";
import { RootStackParamList } from "./RootStack";

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: ["habitdesk://"],

  config: {
    screens: {
      Splash: "splash",

      Auth: {
        screens: {
          Login: "login",
          CreateAccount: "create-account",
          ResetPassword: "reset-password",
          CreateNewPassword: "create-new-password",
        },
      },

      MainTabs: {
        screens: {
          PorchStack: {
            screens: {
              Porch: "porch",
              ScheduleLearning: "schedule-learning",
              Contact: "contact",
            },
          },
          Progress: "profile",
          Resources: "free-resources",
        },
      },
    },
  },
};
