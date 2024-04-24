import Image from "next/image";
import Link from "next/link";
import RenderTag from "./RenderTag";

const hotQuestions = [
  {
    _id: 1,
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    _id: 2,
    title: "Is it only me or the font is bolder than necessary?",
  },
  {
    _id: 3,
    title: "Redux Toolkit Not Updating State as Expected",
  },
  {
    _id: 4,
    title: "Can I get the course for free?",
  },
  {
    _id: 5,
    title: "Async/Await Function Not Handling Errors Properly",
  },
];

const popularTags = [
  {
    _id: 1,
    name: "nextJS",
    totalQuestions: 32,
  },
  {
    _id: 2,
    name: "test",
    totalQuestions: 19,
  },
  {
    _id: 3,
    name: "react",
    totalQuestions: 17,
  },
  {
    _id: 4,
    name: "css",
    totalQuestions: 14,
  },
  {
    _id: 5,
    name: "next JS",
    totalQuestions: 9,
  },
];

function RightSideBar() {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border fixed right-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
        <div className="mt-7 grid gap-[30px]">
          {hotQuestions.map((question) => (
            <Link
              href={`/question/${question._id}`}
              key={question._id}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="text-dark500_light700 body-medium">
                {question.title}
              </p>
              <Image
                src="assets/icons/chevron-right.svg"
                alt="Chevron right icon"
                width={20}
                height={20}
                className="invert-colors"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
        <div className="mt-7 grid gap-4">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              _id={tag._id}
              name={tag.name}
              totalQuestions={tag.totalQuestions}
              showCount
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RightSideBar;
