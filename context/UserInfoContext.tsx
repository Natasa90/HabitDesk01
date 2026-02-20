import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import supabase from "@/lib/supabase";
import { User } from "@supabase/supabase-js";

interface UserContextType {
  userInfo: User | null;
  setUserInfo: (user: User | null) => void;
  loading: boolean;
}

const UserInfoContext = createContext<UserContextType | undefined>(undefined);

export const UserInfoProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1️⃣ Restore existing session
    const restoreSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserInfo(session?.user ?? null);
      setLoading(false);
    };

    restoreSession();

    // 2️⃣ Listen to login/logout
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserInfo(session?.user ?? null);
        setLoading(false);
      },
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserInfoContext.Provider value={{ userInfo, loading, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export function useUserInfo() {
  const context = useContext(UserInfoContext);

  if (!context) {
    throw new Error("useUserInfo must be used inside UserInfoProvider");
  }

  return context;
}
