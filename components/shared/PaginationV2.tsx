"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/constants";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  numOfResults: number;
  pageNumber: number;
  isNext: boolean;
  boundaryCount?: number;
  siblingCount?: number;
};

type HandleNavigationParams = {
  direction?: string;
  index?: number;
};

function PaginationV2({
  numOfResults,
  pageNumber,
  isNext,
  boundaryCount = 1,
  siblingCount = 1,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageCount = Math.ceil(numOfResults / PAGE_SIZE);
  const maxItems = boundaryCount * 2 + siblingCount * 2 + 1;

  function handleNavigation({ direction, index }: HandleNavigationParams) {
    let toPageNumber = 1;

    if (direction) {
      toPageNumber = direction === "prev" ? pageNumber - 1 : pageNumber + 1;
    }

    if (index) {
      toPageNumber = index;
    }

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: toPageNumber.toString(),
    });

    router.push(newUrl);
  }

  if (pageCount <= 1) return null;

  const pagesArray = Array.from({ length: pageCount }, (_, i) => i + 1);
  const lower = boundaryCount + siblingCount * 2 + 1;
  const upper = pageCount - (boundaryCount + siblingCount * 2);

  return (
    <div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <Button
              disabled={pageNumber === 1}
              onClick={() => handleNavigation({ direction: "prev" })}
              className="flex items-center justify-center gap-2"
            >
              <ChevronLeft className="text-dark200_light800 size-4" />
              <p className="body-medium text-dark200_light800">Previous</p>
            </Button>
          </PaginationItem>

          {pageCount <= maxItems &&
            Array.from({ length: pageCount }, (_, i) => i + 1).map((el) => {
              const isActive = pageNumber === el;

              return (
                <PaginationItem key={el}>
                  <Button
                    onClick={() => handleNavigation({ index: el })}
                    className={`flex items-center justify-center gap-2 ${isActive && `flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2`}`}
                  >
                    <p
                      className={`body-medium ${isActive ? "text-light-900" : "text-dark200_light800"}`}
                    >
                      {el}
                    </p>
                  </Button>
                </PaginationItem>
              );
            })}

          {pageCount > maxItems && (
            <>
              {pagesArray.slice(0, boundaryCount + 1).map((el, _, arr) =>
                el <= boundaryCount ||
                pageNumber <= arr.length + siblingCount + 1 ? (
                  <Button
                    key={el}
                    onClick={() => handleNavigation({ index: 1 })}
                    className={`flex items-center justify-center gap-2 ${pageNumber === el && `flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2`}`}
                  >
                    <p
                      className={`body-medium ${pageNumber === el ? "text-light-900" : "text-dark200_light800"}`}
                    >
                      {el}
                    </p>
                  </Button>
                ) : (
                  <PaginationItem key={el}>
                    <PaginationEllipsis />
                  </PaginationItem>
                )
              )}

              {Array.from({ length: siblingCount * 2 + 1 }, (_, i) =>
                pageNumber <= lower
                  ? lower - siblingCount + i
                  : pageNumber >= upper
                    ? upper - siblingCount + i
                    : pageNumber - siblingCount + i
              ).map((el) => {
                const isActive = pageNumber === el;

                return (
                  <PaginationItem key={el}>
                    <Button
                      onClick={() => handleNavigation({ index: el })}
                      className={`flex items-center justify-center gap-2 ${isActive && `flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2`}`}
                    >
                      <p
                        className={`body-medium ${isActive ? "text-light-900" : "text-dark200_light800"}`}
                      >
                        {el}
                      </p>
                    </Button>
                  </PaginationItem>
                );
              })}

              {pagesArray
                .slice(pageCount - (boundaryCount + 1))
                .map((el, _, arr) =>
                  el + (boundaryCount - 1) >= pageCount ||
                  pageNumber >=
                    pageCount - (boundaryCount + 1 + siblingCount) ? (
                    <Button
                      key={el}
                      onClick={() => handleNavigation({ index: 1 })}
                      className={`flex items-center justify-center gap-2 ${pageNumber === el && `flex items-center justify-center rounded-md bg-primary-500 px-3.5 py-2`}`}
                    >
                      <p
                        className={`body-medium ${pageNumber === el ? "text-light-900" : "text-dark200_light800"}`}
                      >
                        {el}
                      </p>
                    </Button>
                  ) : (
                    <PaginationItem key={el}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )
                )}
            </>
          )}

          <PaginationItem>
            <Button
              disabled={!isNext}
              onClick={() => handleNavigation({ direction: "next" })}
              className="flex items-center justify-center gap-2"
            >
              <p className="body-medium text-dark200_light800">Next</p>
              <ChevronRight className="text-dark200_light800 size-4" />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default PaginationV2;
