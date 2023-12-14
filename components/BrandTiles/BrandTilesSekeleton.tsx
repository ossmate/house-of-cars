import { Skeleton } from "../ui/skeleton";

export const BrandTilesSkeleton = () =>
  Array.from({ length: 3 }, (_, index) => (
    <Skeleton key={index} className="mx-3 mb-3 min-w-[150px] h-[150px]" />
  ));
