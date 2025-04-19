import { Dispatch, SetStateAction } from "react";

export interface UserInfo {
    email?: string;
    token?: string;
}

export interface UserContextProps {
    userInfo: UserInfo | null;
    setUserInfo: (info: UserInfo | null) => Promise<void>;
};