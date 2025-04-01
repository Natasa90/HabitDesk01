import supabase from "@/lib/supabase";

export const fetchTasks = async (userEmail: string) => {
 if (!userEmail) return { data: [], error: "User is not authenticated." };

 const { data, error } = await supabase
  .from("tasks")
  .select("*")
  .eq("user_id", userEmail);

 return { data: data?.map((task) => task.task) || [], error };
};

export const addTask = async (task: string, userEmail: string) => {
 if (!userEmail) return { error: "User is not authenticated." };

 const { data, error } = await supabase
  .from("tasks")
  .insert([{ task, user_id: userEmail }]);

 return { data, error };
};

export const deleteTask = async (task: string, userEmail: string) => {
 if (!userEmail) return { error: "User is not authenticated." };

 const { data, error } = await supabase
  .from("tasks")
  .delete()
  .match({ task, user_id: userEmail });

 return { data, error };
};
