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
  imageUrl: string;
  brand: Brand;
};

export const getCarsQueryKey = "cars";

export const fetchCarsData = async ({
  onlyHighlighted,
  brandId,
}: {
  onlyHighlighted?: boolean;
  brandId?: string | null;
}) => {
  try {
    const queryParams = { onlyHighlighted, brandId };
    const queryString = qs.stringify(queryParams, { skipNulls: true });

    const response = await fetch(`${createAPIPath()}/api/cars?${queryString}`);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { error };
  }
};

type QueryParams = {
  onlyHighlighted?: boolean;
  brandId?: string | null;
};

export const useCarsQuery = ({
  onlyHighlighted = undefined,
  brandId = null,
}: QueryParams & { initialData?: Car[] }) => {
  const carsQuery = useQuery<Car[]>({
    queryKey: [getCarsQueryKey, onlyHighlighted, brandId],
    queryFn: () => fetchCarsData({ onlyHighlighted, brandId }),
  });

  return { carsQuery };
};
