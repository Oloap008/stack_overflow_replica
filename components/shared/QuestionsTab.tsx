import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import QuestionCard from "../cards/QuestionCard";
// import Pagination from "./Pagination";
import PaginationV2 from "./PaginationV2";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

async function QuestionsTab({ searchParams, userId, clerkId }: Props) {
  const { userQuestions, isNext, totalQuestions } = await getUserQuestions({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
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

      <div className="mt-10 flex flex-col">
        {/* <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        /> */}

        <PaginationV2
          numOfResults={totalQuestions}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}

export default QuestionsTab;
