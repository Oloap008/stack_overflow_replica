import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
// import Pagination from "@/components/shared/Pagination";
import PaginationV2 from "@/components/shared/PaginationV2";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import { getQuestionByTagId } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";

async function TagDetails({ params, searchParams }: URLProps) {
  const { tagTitle, questions, isNext, tagTotalQuestions } =
    await getQuestionByTagId({
      tagId: params.id,
      page: searchParams.page ? +searchParams.page : 1,
      searchQuery: searchParams.q,
    });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">{tagTitle}</h1>

      <div className="mt-11 w-full">
        <LocalSearchBar
          placeholder="Search question...."
          route={`/tags/${params.id}`}
          otherClasses="flex-1"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <NoResult
            description=" Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            title="There's no tag questions to show"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10 flex flex-col">
        {/* <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        /> */}

        <PaginationV2
          numOfResults={tagTotalQuestions}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}

export default TagDetails;
