import qs from "qs";
import { useQuery } from "@tanstack/react-query";
import { createAPIPath } from "@/lib/utils";
import { Brand } from "@/app/api/brand/useBrandsQuery";
import { signOut, useSession } from "next-auth/react";

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
  userId,
  token,
}: {
  onlyHighlighted?: boolean;
  brandId?: string | null;
  userId?: string;
  token?: string;
}) => {
  try {
    const queryParams = { onlyHighlighted, brandId };
    const queryString = qs.stringify(queryParams, { skipNulls: true });

    const headers: Record<string, string> = {};

    if (typeof window !== "undefined") {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${createAPIPath()}/api/cars?${queryString}`, {
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch favorite cars: ${response.statusText}`);
    }

    const { data } = await response.json();

    return data;
  } catch (error) {
    const knownError = error as any;

    if (knownError?.message?.includes("Unauthorized")) {
      signOut({ redirect: false, callbackUrl: "http://localhost:3000/" });
    }

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
  const { data } = useSession();

  const queryKey = [getCarsQueryKey, onlyHighlighted, brandId].filter(Boolean);

  const carsQuery = useQuery<Car[]>({
    queryKey,
    queryFn: () =>
      fetchCarsData({
        onlyHighlighted,
        brandId,
        userId: data?.userId,
        token: data?.token,
      }),
    initialData,
    enabled: isEnabled,
  });

  return { carsQuery };
};
