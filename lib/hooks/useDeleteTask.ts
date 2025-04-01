import supabase from "@/lib/supabase";

export const useDeleteTask = (toDo: string[], setToDo: React.Dispatch<React.SetStateAction<string[]>>) => {
  const deleteTask = async (task: string) => {
    const { data, error } = await supabase.from("tasks").delete().match({ task });

    if (error) {
      console.error("Error deleting task:", error);
    } else {
      setToDo(toDo.filter((item) => item !== task));
    }
  };

  return { deleteTask };
};
