import { FC, useState } from "react";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { FreeSourceProps } from "@/types/FreeResourcesTypes";
import { useVote } from "@/lib/hooks";

export const FreeSource: FC<FreeSourceProps> = ({ fact }) => {
  const { isUpdating, hasVoted, handleVote, likes } = useVote(fact, "sources", "id");
  const [showMore, setShowMore] = useState<boolean>(false);
  const displayComment = showMore ? fact.text : fact.text.slice(0, 90);

  return (
    <CardLayout
      title={fact.category || "Unknown Category"}
       porch={{ ...fact, likes }}
      displayComment={displayComment}
      commentText={fact.text}
      showMore={showMore}
      handleVote={handleVote}
      isUpdating={isUpdating}
      handleMore={() => setShowMore(true)}
      formattedDate={new Date().toLocaleDateString()}
      isVoteDisabled={false}
      hasVoted={hasVoted}
    />
  );
};
