"use client";

import { deleteAnswer } from "@/lib/actions/answer.action";
import { deleteQuestion } from "@/lib/actions/question.action";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";

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

    toast({
      title: `Your ${type} has successfully been deleted.`,
    });
  }

  return (
    <div className="flex min-w-10 items-center justify-end gap-3 max-sm:w-full">
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

      <Dialog>
        <DialogTrigger>
          <Image
            src="/assets/icons/trash.svg"
            alt="Delete"
            width={14}
            height={14}
            className="cursor-pointer object-contain"
          />
        </DialogTrigger>
        <DialogContent className="background-light800_dark300 text-dark300_light900">
          <DialogHeader>
            <DialogTitle className="leading-6">
              Are you sure you want to delete this {type}?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your{" "}
              {type.toLowerCase()} and reduce your reputation points.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="primary-gradient text-light-900"
                onClick={handleDelete}
              >
                Confirm
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditDeleteAction;
