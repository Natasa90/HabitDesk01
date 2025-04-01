import { useState } from "react";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";
import { useContext } from "react";

export const useAddTask = (toDo: string[], setToDo: React.Dispatch<React.SetStateAction<string[]>>, setInput: React.Dispatch<React.SetStateAction<string>>) => {
  const [error, setError] = useState<string>("");
  const { userInfo } = useContext(UserInfoContext);

  const addTask = async (input: string) => {
    if (input.trim()) {
      if (!userInfo?.email) {
        setError("User is not authenticated.");
        return;
      }

      const { data, error } = await supabase
        .from("tasks")
        .insert([{ task: input }]);

      if (error) {
        setError("Error storing task!");
        console.error("Error storing task:", error);
      } else {
        setToDo([...toDo, input]);
        setError("");
        setInput("")
      }
    } else {
      setError("Please Write a Task to Add.");
    }
  };

  return { addTask, error };
};
