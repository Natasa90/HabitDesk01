import { useState, useEffect, useContext } from "react";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";

export const useFetchTasks = () => {
  const [toDo, setToDo] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  const { userInfo } = useContext(UserInfoContext); 

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_email", userInfo?.email);;
      if (error) {
        setError("Error fetching tasks!");
        console.error("Error fetching tasks:", error);
      } else {
        setToDo(data.map((task) => task.task));
      }
    };

    fetchTasks();
  }, [userInfo?.email]);

  return { toDo, error };
};
