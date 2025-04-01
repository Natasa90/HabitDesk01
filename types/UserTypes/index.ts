import { Dispatch, SetStateAction } from "react";

export interface UserInfo {
    email?: string;
}

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: Dispatch<SetStateAction<UserInfo | null>>;
};