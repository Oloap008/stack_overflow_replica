"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  type: string;
  itemId: string;
}

function EditDeleteAction({ type, itemId }: Props) {
  const path = usePathname();
  const router = useRouter();

  function handleEdit() {
    router.push(`/question/edit/${JSON.parse(itemId)}`);
  }

  async function handleDelete() {
    if (type === "Question") {
      await deleteQuestion({ questionId: JSON.parse(itemId), path });
    }

    if (type === "Answer") {
      await deleteAnswer({ answerId: JSON.parse(itemId), path });
    }
  }

  return (
    <div className="flex items-center justify-end gap-3 max-sm:w-full">
      {type === "Question" && (
        <Image
          src="/assets/icons/edit.svg"
          alt="Edit"
          width={14}
          height={14}
          className="cursor-pointer object-contain"
          onClick={handleEdit}
        />
      )}

      <Image
        src="/assets/icons/trash.svg"
        alt="Delete"
        width={14}
        height={14}
        className="cursor-pointer object-contain"
        onClick={handleDelete}
      />
    </div>
  );
}

export default EditDeleteAction;
