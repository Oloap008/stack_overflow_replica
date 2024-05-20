import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "../cards/AnswerCard";
import PaginationV2 from "./PaginationV2";
// import Pagination from "./Pagination";

interface Props extends SearchParamsProps {
  clerkId?: string | null;
  userId: string;
}

async function AnswersTab({ searchParams, clerkId, userId }: Props) {
  const { userAnswers, isNext, totalAnswers } = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
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

      <div className="mt-10 flex flex-col">
        {/* <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        /> */}

        <PaginationV2
          numOfResults={totalAnswers}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}

export default AnswersTab;
