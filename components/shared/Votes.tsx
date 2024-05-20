"use client";

import Image from "next/image";
import { formatNumber } from "@/lib/utils";
import { usePathname } from "next/navigation";
import {
  downvoteQuestion,
  upvoteQuestion,
} from "@/lib/actions/question.action";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { useEffect } from "react";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { toast } from "../ui/use-toast";

interface Props {
  type: string;
  itemId: string;
  userId: string | undefined;
  upvotes: number;
  downvotes: number;
  hasUpvoted: boolean;
  hasDownvoted: boolean;
  hasSaved?: boolean;
}

function Votes({
  type,
  itemId,
  userId,
  upvotes,
  downvotes,
  hasUpvoted,
  hasDownvoted,
  hasSaved,
}: Props) {
  const pathname = usePathname();
  // const router = useRouter();

  // Keep this state for now

  async function handleSave() {
    if (!userId) {
      return toast({
        title: `Invalid action!`,
        description: "You must be logged in to be able to save a question.",
      });
    }

    await toggleSaveQuestion({
      questionId: JSON.parse(itemId),
      userId: JSON.parse(userId),
      path: pathname,
    });

    toast({
      title: "Question successfully saved",
    });
  }

  async function handleVote(action: string) {
    if (!userId) {
      return toast({
        title: `Invalid action!`,
        description:
          "You must be logged in to be able to upvote or downvote a question.",
      });
    }

    if (action === "upvote") {
      if (type === "Question") {
        await upvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }

      if (type === "Answer") {
        await upvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }

      return toast({
        title: `Upvote ${!hasUpvoted ? "Successful" : "Removed"}`,
        variant: !hasUpvoted ? "default" : "destructive",
      });
    }

    if (action === "downvote") {
      if (type === "Question") {
        await downvoteQuestion({
          questionId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }

      if (type === "Answer") {
        await downvoteAnswer({
          answerId: JSON.parse(itemId),
          userId: JSON.parse(userId),
          hasUpvoted,
          hasDownvoted,
          path: pathname,
        });
      }

      return toast({
        title: `Downvote ${!hasDownvoted ? "Successful" : "Removed"}`,
        variant: !hasDownvoted ? "default" : "destructive",
      });
    }
  }

  useEffect(() => {
    if (type === "Question") {
      viewQuestion({
        questionId: JSON.parse(itemId),
        userId: userId ? JSON.parse(userId) : undefined,
      });
    }
  }, [itemId, userId, type]);

  // if (!userId) return null;

  return (
    <div className="flex gap-5">
      <div className="flex-center gap-2.5">
        <div className="flex-center gap-1.5">
          <Image
            src={
              hasUpvoted
                ? "/assets/icons/upvoted.svg"
                : "/assets/icons/upvote.svg"
            }
            height={18}
            width={18}
            alt="upvote"
            className="cursor-pointer"
            onClick={() => handleVote("upvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(upvotes)}
            </p>
          </div>
        </div>

        <div className="flex-center gap-1.5">
          <Image
            src={
              hasDownvoted
                ? "/assets/icons/downvoted.svg"
                : "/assets/icons/downvote.svg"
            }
            height={18}
            width={18}
            alt="downvote"
            className="cursor-pointer"
            onClick={() => handleVote("downvote")}
          />
          <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
            <p className="subtle-medium text-dark400_light900">
              {formatNumber(downvotes)}
            </p>
          </div>
        </div>
      </div>
      {type === "Question" && (
        <Image
          width={18}
          height={18}
          src={
            hasSaved
              ? "/assets/icons/star-filled.svg"
              : "/assets/icons/star-red.svg"
          }
          alt="star"
          className="cursor-pointer"
          onClick={handleSave}
        />
      )}
    </div>
  );
}

export default Votes;
