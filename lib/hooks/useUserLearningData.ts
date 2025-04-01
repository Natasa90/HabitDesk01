import { useState, useEffect, useContext } from "react";
import supabase from "@/lib/supabase";
import { UserInfoContext } from "@/context/UserInfoContext";

interface LearningDate {
  date: string;
  count: number;
}

export const useUserLearningData = () => {
  const [weeklyGoal, setWeeklyGoal] = useState<number>(1);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [weeklyLearningDays, setWeeklyLearningDays] = useState<number>(0);
  const [learningDates, setLearningDates] = useState<LearningDate[]>([]);

  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    if (userInfo?.email) {
      fetchUserAndLearningData();
    }
  }, [userInfo?.email]);

  const fetchUserAndLearningData = async () => {
    try {
      const { data: userActivityData, error: activityError } = await supabase
        .from("user_activity")
        .select("weekly_goal, longest_streak")
        .eq("user_email", userInfo?.email)
        .maybeSingle();

      if (activityError) {
        return;
      }

      if (userActivityData) {
        setWeeklyGoal(userActivityData.weekly_goal ?? 1);
        setLongestStreak(userActivityData.longest_streak ?? 0);

      }

      const { data: learningData, error: learningError } = await supabase
        .from("porch")
        .select("created_at")
        .eq("email", userInfo?.email)
        .order("created_at", { ascending: true });

      if (learningError) {
        console.error("Error fetching learning data:", learningError);
        return;
      }

      if (learningData && learningData.length > 0) {
        calculateStreaks(learningData);
        calculateWeeklyLearningDays(learningData);
        setLearningDates(
          learningData.map((entry) => ({
            date: new Date(entry.created_at).toISOString().split("T")[0],
            count: 1,
          }))
        );
      } else {
        setCurrentStreak(0);
        setWeeklyLearningDays(0);
        setLearningDates([]);
      }
    } catch (error) {
      console.error("Unexpected error in fetchUserAndLearningData:", error);
    }
  };

  const calculateStreaks = (data: { created_at: string }[]) => {
    if (data.length === 0) {
      setCurrentStreak(0);
      setLongestStreak(0);
      return;
    }

    let currentStreak = 0;
    let longestStreak = 0;
    let lastDate: Date | null = null;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sortedUniqueDates: Date[] = [
      ...new Set(
        data.map((entry) => new Date(entry.created_at).toISOString().split("T")[0])
      ),
    ]
      .map((date) => new Date(date))
      .sort((a, b) => a.getTime() - b.getTime());

    sortedUniqueDates.forEach((currentDate: Date) => {
      if (!lastDate) {
        currentStreak = 1;
        lastDate = currentDate;
        return;
      }

      const differenceInDays = Math.floor(
        (currentDate.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24)
      );

      if (differenceInDays === 1) {
        currentStreak += 1;
      } else if (differenceInDays > 1) {
        currentStreak = 1;
      }

      lastDate = currentDate;
      longestStreak = Math.max(longestStreak, currentStreak);
    });

    if (lastDate !== null) {
   const differenceToToday = Math.floor(
    (today.getTime() - (lastDate as Date).getTime()) / (1000 * 3600 * 24)
   );
   if (differenceToToday > 1) {
    currentStreak = 0;
   }
  }

    setCurrentStreak(currentStreak);
    setLongestStreak(longestStreak);
  };

  const calculateWeeklyLearningDays = (data: { created_at: string }[]) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const daysToSubtract = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - daysToSubtract);
    startOfWeek.setHours(0, 0, 0, 0);

    today.setHours(23, 59, 59, 999);

    const currentWeekLearningDays = new Set<string>();

    data.forEach((entry: { created_at: string }) => {
      const learningDate = new Date(entry.created_at);
      if (learningDate >= startOfWeek && learningDate <= today) {
        currentWeekLearningDays.add(learningDate.toDateString());
      }
    });

    setWeeklyLearningDays(currentWeekLearningDays.size);
  };

  return {
    weeklyGoal,
    currentStreak,
    longestStreak,
    weeklyLearningDays,
    learningDates,
  };
};
