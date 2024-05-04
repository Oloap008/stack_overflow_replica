import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

async function QuestionsTab({ searchParams, userId, clerkId }: Props) {
  const { totalQuestions, userQuestions } = await getUserQuestions({
    userId,
    page: 1,
  });

  return (
    <>
      {userQuestions.map((question) => (
        <QuestionCard
          key={question._id}
          _id={question._id}
          clerkId={clerkId}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}
        />
      ))}
    </>
  );
}

export default QuestionsTab;
