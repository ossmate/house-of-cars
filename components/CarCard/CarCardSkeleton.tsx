import { Skeleton } from "../ui/skeleton";

export const CarCardSkeleton = () =>
  Array.from({ length: 9 }, (_, index) => (
    <Skeleton key={index} className="min-w-[365px] h-[290px]" />
  ));
