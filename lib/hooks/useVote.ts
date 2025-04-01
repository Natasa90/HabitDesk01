import { useState, useEffect, useContext } from "react";
import { UserInfoContext } from "@/context/UserInfoContext";
import supabase from "@/lib/supabase";

export const useVote = (item: any, tableName: string, idField: string) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { userInfo } = useContext(UserInfoContext);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [likes, setLikes] = useState(item.likes);

  useEffect(() => {
    if (userInfo?.email) {
      setHasVoted(likes.includes(userInfo.email));
    }
  }, [userInfo, likes]);

  const handleVote = async () => {
    if (!userInfo?.email) {
      console.error("User not logged in");
      return;
    }

    setIsUpdating(true);

    try {
      let updatedLikes = hasVoted
        ? likes.filter((email: string) => email !== userInfo.email)
        : [...likes, userInfo.email];

      const { error } = await supabase
        .from(tableName)
        .update({ likes: updatedLikes })
        .eq(idField, item[idField]);

      if (error) {
        console.error("Error updating likes:", error);
        alert("Failed to update likes. Please try again.");
      } else {
        setLikes(updatedLikes);
        setHasVoted(!hasVoted);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return { isUpdating, hasVoted, handleVote, likes };
};

