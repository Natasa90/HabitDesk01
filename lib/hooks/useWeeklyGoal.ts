import { useState, useEffect } from "react";
import supabase from "@/lib/supabase";
import { UserInfo } from "@/Types/User";

export const useWeeklyGoal = (userInfo: UserInfo | null) => {
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeeklyGoal = async () => {
      if (userInfo?.email) {
        try {
          const { data: userActivityData, error } = await supabase
            .from("user_activity")
            .select("weekly_goal")
            .eq("user_email", userInfo.email)
            .single();

          if (error) throw new Error(error.message);
          if (userActivityData?.weekly_goal) {
            setWeeklyGoal(userActivityData.weekly_goal);
          }
        } catch (err) {
          console.error("Error fetching weekly goal:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchWeeklyGoal();
  }, [userInfo?.email]);

  const updateWeeklyGoal = async (newGoal: number) => {
    setWeeklyGoal(newGoal);
    if (!userInfo?.email) return;

    try {
      const { data: userActivityData, error: fetchError } = await supabase
        .from("user_activity")
        .select("id")
        .eq("user_email", userInfo.email)
        .single();

      if (fetchError && fetchError.code === "PGRST116") {
        const { error: insertError } = await supabase
          .from("user_activity")
          .insert([{ user_email: userInfo.email, weekly_goal: newGoal }]);

        if (insertError) throw insertError;
      } else if (userActivityData) {
        const { error: updateError } = await supabase
          .from("user_activity")
          .update({ weekly_goal: newGoal })
          .eq("user_email", userInfo.email);

        if (updateError) throw updateError;
      }
    } catch (err) {
      console.error("Error updating weekly goal:", err);
    }
  };

  return { weeklyGoal, loading, updateWeeklyGoal };
};
