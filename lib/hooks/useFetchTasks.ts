import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

export const useFetchTasks = () => {
  const [toDo, setToDo] = useState<string[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("*");
      if (error) {
        setError("Error fetching tasks!");
        console.error("Error fetching tasks:", error);
      } else {
        setToDo(data.map((task) => task.task));
      }
    };

    fetchTasks();
  }, []);

  return { toDo, error };
};
