import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";

interface Props extends SearchParamsProps {
  clerkId?: string;
  userId: string;
}

async function AnswersTab({ searchParams, clerkId, userId }: Props) {
  const { totalAnswers, userAnswers } = await getUserAnswers({
    userId,
    page: 1,
  });

  return (
    <>
      {userAnswers.map((answer) => (
        <AnswerCard
          key={answer._id}
          clerkId={clerkId}
          _id={answer._id}
          question={answer.question}
          author={answer.author}
          upvotes={answer.upvotes.length}
          createdAt={answer.createdAt}
        />
      ))}
    </>
  );
}

export default AnswersTab;
