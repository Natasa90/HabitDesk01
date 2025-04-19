import { useState } from "react";
import supabase from "@/lib/supabase";
import { PorchType } from "@/types/PorchTypes";

export const useFilteredPorchs = (email?: string) => {
  const [porchs, setPorchs] = useState<PorchType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filtering, setFiltering] = useState<boolean>(false);

  const loadUserPorchs = async () => {
    if (!email) {
      return;
    }
    setLoading(true);

    try {
      const { data: userPorchs, error } = await supabase
        .from("porch")
        .select("*")
        .eq("email", email)
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) throw new Error(error.message);

      setPorchs(userPorchs);
      setFiltering(true);
    } catch (err) {
      console.error("Failed to load user porchs:", err);
    } finally {
      setLoading(false);
    }
  };

  return { porchs, loading, filtering, loadUserPorchs, setPorchs };
};