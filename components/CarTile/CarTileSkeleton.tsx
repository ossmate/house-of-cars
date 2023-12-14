import { Skeleton } from "../ui/skeleton";

export const CarTileSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
    {Array.from({ length: 9 }, (_, index) => (
      <Skeleton key={index} className="min-w-[365px] h-[290px] m-5" />
    ))}
  </div>
);
