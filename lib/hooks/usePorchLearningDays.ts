import { useState, useEffect, useCallback } from "react";
import supabase from "@/lib/supabase";

export const usePorchLearningDays = (email?: string) => {
  const [learningDays, setLearningDays] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);


const fetchLearningDays = useCallback(async () => {
      if (!email) return;

      setLoading(true); 
      const { count, error } = await supabase
        .from("porch")
        .select("*", { count: "exact" })
        .eq("email", email);

      if (error) {
        console.error("Error fetching learning days:", error);
      } else {
        setLearningDays(count || 0);
      }
      setLoading(false); 
  }, [email]);
  
  useEffect(() => {
    fetchLearningDays()
  }, [fetchLearningDays])

  return { learningDays, loading, refreshLearningDays: fetchLearningDays };
};
