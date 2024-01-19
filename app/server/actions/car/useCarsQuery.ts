import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { createAPIPath } from "@/lib/utils";
import { Brand } from "@/app/api/brand/useBrandsQuery";

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
  isFavorite?: boolean;
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

    const headers: Record<string, string> = {};

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${createAPIPath()}/api/cars?${queryString}`, {
      headers: headers,
    });

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { error };
  }
};

type QueryParams = {
  initialData?: Car[];
  onlyHighlighted?: boolean;
  brandId?: string | null;
  isEnabled?: boolean;
};

export const useCarsQuery = ({
  initialData,
  onlyHighlighted = undefined,
  brandId = undefined,
  isEnabled = true,
}: QueryParams & { initialData?: Car[] }) => {
  const queryKey = [getCarsQueryKey, onlyHighlighted, brandId].filter(Boolean);

  const carsQuery = useQuery<Car[]>({
    queryKey,
    queryFn: () => fetchCarsData({ onlyHighlighted, brandId }),
    initialData,
    enabled: isEnabled,
  });

  return { carsQuery };
};
