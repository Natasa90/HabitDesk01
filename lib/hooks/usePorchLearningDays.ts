import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";

export const usePorchLearningDays = (email?: string) => {
  const [learningDays, setLearningDays] = useState<number>(0);

  useEffect(() => {
    const fetchLearningDays = async () => {
      if (!email) return;

      const { count, error } = await supabase
        .from("porch")
        .select("*", { count: "exact" })
        .eq("email", email);

      if (error) {
        console.error("Error fetching learning days:", error);
      } else {
        setLearningDays(count || 0);
      }
    };

    fetchLearningDays();
  }, [email]);
  return learningDays;
};
