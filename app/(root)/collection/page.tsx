import React from "react";
import LocalSearchBar from "@/components/shared/search/LocalSearchBar";
import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Filter from "@/components/shared/Filter";
import { QuestionFilters } from "@/constants/filters";
import { auth } from "@clerk/nextjs/server";
import { getSavedQuestionsByUserId } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import PaginationV2 from "@/components/shared/PaginationV2";
// import Pagination from "@/components/shared/Pagination";

async function Collection({ searchParams }: SearchParamsProps) {
  const { userId } = auth();

  if (!userId) return null;

  const { questions, isNext, totalSavedQuestions } =
    await getSavedQuestionsByUserId({
      clerkId: userId,
      searchQuery: searchParams.q,
      filter: searchParams.filter,
      page: searchParams.page ? +searchParams.page : 1,
    });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Question</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          placeholder="Search question...."
          route="/collection"
          otherClasses="flex-1"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
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
            title="There's no saved questions to show"
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
          numOfResults={totalSavedQuestions}
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={isNext}
        />
      </div>
    </>
  );
}

export default Collection;
