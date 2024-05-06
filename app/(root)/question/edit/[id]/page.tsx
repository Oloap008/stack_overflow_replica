import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function EditQuestion({ params }: ParamsProps) {
  const { id } = params;
  const { userId } = auth();

  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  const question = await getQuestionById({ questionId: id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>
      <div className="mt-9">
        <Question
          type="edit"
          mongoUserId={JSON.stringify(mongoUser._id)}
          questionDetails={JSON.stringify(question)}
        />
      </div>
    </>
  );
}

export default EditQuestion;
