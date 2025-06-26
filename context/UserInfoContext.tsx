import { createContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContextProps, UserInfo } from "@/types/UserTypes";
import supabase from "@/lib/supabase";

export const UserInfoContext = createContext<UserContextProps>({
  userInfo: null,
  setUserInfo: async () => {},
});

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);
	const [bootstrapped, setBootstrapped] = useState(false);

  useEffect(() => {
    const restoreUser = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Supabase session error:", error);
      }

      if (data?.session?.user?.email) {
        setUserInfoState({ email: data.session.user.email });
      } else {
        console.warn("Supabase returned no session. Trying AsyncStorage.");

        const storedEmail = await AsyncStorage.getItem("userEmail");
        const storedToken = await AsyncStorage.getItem("userToken");

        if (storedEmail && storedToken) {
          setUserInfoState({ email: storedEmail });
        } else {
          console.warn("No session found anywhere.");
        }
				setBootstrapped(true);
      }
    };

    restoreUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const email = session?.user?.email;

        if (session && email) {

          setUserInfoState({ email });
          await AsyncStorage.setItem("userEmail", email);
          await AsyncStorage.setItem("userToken", session.access_token);
        } else {
          if (bootstrapped) {

            setUserInfoState(null);
            await AsyncStorage.removeItem("userEmail");
            await AsyncStorage.removeItem("userToken");
          } else {
            console.log("Ignoring null session during bootstrap.");
          }
        }
      }
    );
		
    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const setUserInfo = async (info: UserInfo | null) => {
    setUserInfoState(info);

    if (info?.email) {
      await AsyncStorage.setItem("userEmail", info.email);
    } else {
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userToken");
    }
  };

  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};
