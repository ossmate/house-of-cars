import { createAPIPath } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

type Brand = {
  id: string;
  name: string;
  imageUrl: string;
  carsCount: number;
};

export const getBrandsQueryKey = "brands";

export const useGetBrandsQuery = () => {
  const getBrandsRequest = () =>
    fetch(`${createAPIPath()}/api/brands`).then((res) => res.json());

  const getBrandsQuery = useQuery<{ data: Brand[] }>({
    queryKey: [getBrandsQueryKey],
    queryFn: () => getBrandsRequest(),
  });

  return { getBrandsQuery };
};
