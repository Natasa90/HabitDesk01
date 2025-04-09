import { Dispatch, SetStateAction } from "react";

export type UserInfo = {
  email: string;
} | null | undefined;

export interface UserContextProps {
  userInfo: UserInfo;
  setUserInfo: (user: UserInfo) => void;
}