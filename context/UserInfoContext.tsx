import { createContext } from "react";
import { UserContextProps } from "@/types/UserTypes";

export const UserInfoContext = createContext<UserContextProps>({
 userInfo: null,
 setUserInfo: () => {},
});
