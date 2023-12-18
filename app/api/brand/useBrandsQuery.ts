import { createAPIPath } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

export type Brand = {
  id: string;
  name: string;
  imageUrl: string;
  carsCount: number;
};

export const getBrandsQueryKey = "brands";

export const getBrandsRequest = () =>
  fetch(`${createAPIPath()}/api/brands`).then((res) => res.json());

export const useBrandsQuery = (initialData?: Brand[]) => {
  const brandsQuery = useQuery<{ data: Brand[] }>({
    queryKey: [getBrandsQueryKey],
    queryFn: () => getBrandsRequest(),
    initialData: initialData ? { data: initialData } : undefined,
  });

  return { brandsQuery };
};
