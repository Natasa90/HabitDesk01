import { createContext, useState, useEffect, ReactNode } from "react";
import { UserContextProps, UserInfo } from "@/types/UserTypes";
import supabase from "@/lib/supabase";

export const UserInfoContext = createContext<UserContextProps>({
  userInfo: null,
  setUserInfo: async () => {},
});

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfoState] = useState<UserInfo | null>(null);

  useEffect(() => {
    const restoreUser = async () => {
			const { data } = await supabase.auth.getSession();

			const email = data.session?.user?.email;
			if (email) {
				setUserInfoState({ email }); 
			}
		};

		restoreUser(); 

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
       const email = session?.user?.email; 
			 setUserInfoState(email ? { email } : null); 
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
