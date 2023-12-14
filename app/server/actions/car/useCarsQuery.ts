import qs from "qs";
import { Brand } from "@/app/settings/page";
import { useQuery } from "@tanstack/react-query";
import { createAPIPath } from "@/lib/utils";

export type Car = {
  id: string;
  createdAt: string;
  brandId: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
  brand: Brand;
};

export const getCarsQueryKey = "cars";

export const getCarsRequest = (params?: QueryParams) => {
  const query = qs.stringify(params, { skipNulls: true });
  return fetch(`${createAPIPath()}/api/cars?${query}`).then((res) =>
    res.json(),
  );
};

type QueryParams = {
  onlyHighlighted?: boolean;
  brandId?: string | null;
};

export const useCarsQuery = ({
  onlyHighlighted = false,
  brandId = null,
  initialData,
}: QueryParams & { initialData?: Car[] }) => {
  const carsQuery = useQuery<{ data: Car[] }>({
    queryKey: [getCarsQueryKey, onlyHighlighted, brandId],
    queryFn: () => getCarsRequest({ onlyHighlighted, brandId }),
    initialData: initialData ? { data: initialData } : undefined,
  });

  return { carsQuery };
};
