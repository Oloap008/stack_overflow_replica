import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>
      <div className="mb-12 mt-11 flex flex-wrap gap-5 max-sm:flex-col">
        <Skeleton className="min-h-14 flex-1" />
        <Skeleton className="h-14 sm:min-w-[170px]" />
      </div>

      <div className="flex flex-wrap gap-4">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((el) => (
          <Skeleton
            key={el}
            className="h-60 w-full rounded-2xl max-xs:min-w-full xs:w-[260px]"
          />
        ))}
      </div>
    </section>
  );
}

export default Loading;
