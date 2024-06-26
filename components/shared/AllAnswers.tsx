import { AnswerFilters } from "@/constants/filters";
import Filter from "./Filter";
import { getAnswers } from "@/lib/actions/answer.action";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "./ParseHTML";
import Votes from "./Votes";
// import Pagination from "./Pagination";
import PaginationV2 from "./PaginationV2";

interface Props {
  questionId: string;
  userId: string | undefined;
  totalAnswers: number;
  page?: number;
  filter?: string;
}

async function AllAnswers({
  questionId,
  userId,
  totalAnswers,
  page,
  filter,
}: Props) {
  const { answers, isNext } = await getAnswers({
    questionId,
    page: page ? +page : 1,
    sortBy: filter,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">{totalAnswers} Answers</h3>
        <Filter filters={AnswerFilters} />
      </div>

      <div>
        {answers.map((answer) => (
          <article key={answer._id} className="light-border border-b py-10">
            <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/profile/${answer.author.clerkId}`}
                className="flex flex-1 items-start gap-1 sm:items-center"
              >
                <Image
                  src={answer.author.picture}
                  width={18}
                  height={18}
                  alt="profile"
                  className="rounded-full object-cover max-sm:mt-0.5"
                />
                <div className="flex flex-col justify-center gap-1 sm:flex-row sm:items-center">
                  <p className="body-semibold text-dark300_light700">
                    {answer.author.name}
                  </p>
                  <p className="small-regular text-light400_light500 ml-0.5 mt-0.5 line-clamp-1">
                    • answered {getTimestamp(answer.createdAt)}
                  </p>
                </div>
              </Link>
              <div className="flex justify-end">
                <Votes
                  type="Answer"
                  userId={userId ? JSON.stringify(userId) : undefined}
                  itemId={JSON.stringify(answer._id)}
                  upvotes={answer.upvotes.length}
                  downvotes={answer.downvotes.length}
                  hasUpvoted={answer.upvotes.includes(userId)}
                  hasDownvoted={answer.downvotes.includes(userId)}
                />
              </div>
            </div>

            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>

      <div className="mt-10 flex flex-col">
        {/* <Pagination pageNumber={page ? +page : 1} isNext={isNext} /> */}

        <PaginationV2
          numOfResults={totalAnswers}
          pageNumber={page ? +page : 1}
          isNext={isNext}
        />
      </div>
    </div>
  );
}

export default AllAnswers;
