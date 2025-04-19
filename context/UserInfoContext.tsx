import { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import { UserContextProps, UserInfo } from "@/types/UserTypes";
import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export const UserInfoContext = createContext<UserContextProps>({
  userInfo: null,
  setUserInfo: async () => {},
});

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedSession = await SecureStore.getItemAsync("supabaseSession");
        if (storedSession) {
          const session: Session = JSON.parse(storedSession);

          const { data, error } = await supabase.auth.setSession({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          });

          if (!error && data.session?.user) {
            setUserInfoState({
              email: data.session.user.email || "",
            });
          }
        }
      } catch (error) {
        console.error("Error restoring session:", error);
      }
    };

    restoreSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          await SecureStore.setItemAsync("supabaseSession", JSON.stringify({
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          }));

          setUserInfoState({
            email: session.user.email || "",
          });
        } else {
          await SecureStore.deleteItemAsync("supabaseSession");
          setUserInfoState(null);
        }
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const setUserInfo = async (info: UserInfo | null) => {
    setUserInfoState(info);
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
