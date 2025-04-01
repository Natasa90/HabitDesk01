import { FC, useState } from "react";
import { CardLayout } from "@/components/Layout/CardsLayout";
import { PorchDailyUpdateProps } from "@/Types/PorchTypes";
import { useVote } from "@/lib/hooks";

export const PorchDailyUpdate: FC<PorchDailyUpdateProps> = ({ porch, setPorchs }) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  const { isUpdating, hasVoted, handleVote, likes } = useVote(porch, "porch", "new_id");

  const handleVoteWithStateUpdate = async () => {
    await handleVote();
    setPorchs((prevPorchs) =>
      prevPorchs.map((p) =>
        p.new_id === porch.new_id ? { ...p, likes } : p
      )
    );
  };

  const date = new Date(porch.created_at);
  const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
    .getDate()
    .toString()
    .padStart(2, "0")}-${date.getFullYear()}`;

  const displayComment = showMore ? porch.text : porch.text.slice(0, 90);
  const handleMore = () => setShowMore(true);

  return (
    <CardLayout
      title="Daily Update"
      porch={{ ...porch, likes }}
      displayComment={displayComment}
      commentText={porch.text}
      showMore={showMore}
      handleMore={handleMore}
      handleVote={handleVoteWithStateUpdate}
      isUpdating={isUpdating}
      formattedDate={formattedDate}
      isVoteDisabled={false}
      hasVoted={hasVoted}
    />
  );
};
