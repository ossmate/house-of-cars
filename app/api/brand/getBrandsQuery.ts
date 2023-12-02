import { useQuery } from "@tanstack/react-query";

type Brand = {
  id: string;
  name: string;
  imageUrl: string;
};

export const getBrandsQueryKey = "brands";

export const useGetBrandsQuery = () => {
  const getBrandsRequest = () =>
    fetch("http://localhost:5000/api/brands").then((res) => res.json());

  const getBrandsQuery = useQuery<{ data: Brand[] }>({
    queryKey: [getBrandsQueryKey],
    queryFn: () => getBrandsRequest(),
  });

  return { getBrandsQuery };
};
