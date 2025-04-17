import { useContext } from "react";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";

export const useDeleteTask = (toDo: string[], setToDo: React.Dispatch<React.SetStateAction<string[]>>) => {
  const { userInfo } = useContext(UserInfoContext)
  const deleteTask = async (task: string) => {
    if (!userInfo?.email) {
      console.error("User not authenticated.")
      return;
    }
    const { data, error } = await supabase.from("tasks").delete().match({ task, user_email: userInfo.email });

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setToDo(toDo.filter((item) => item !== task));
    }
  };

  return { deleteTask };
};
