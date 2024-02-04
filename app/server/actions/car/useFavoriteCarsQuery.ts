import { useQuery } from "@tanstack/react-query";
import { createAPIPath } from "@/lib/utils";
import { Car } from "./useCarsQuery";
import { useSession } from "next-auth/react";

export const getFavoriteCarsQueryKey = "favorite-cars";

export const fetchFavoriteCars = async ({
  userId,
  token,
}: {
  userId?: string;
  token?: string;
}) => {
  try {
    const headers: Record<string, string> = {};

    if (typeof window !== "undefined") {
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    const response = await fetch(`${createAPIPath()}/api/favorites/${userId}`, {
      headers: headers,
    });

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return { error };
  }
};

export const useFavoriteCarsQuery = (isEnabled = true) => {
  const { data } = useSession();
  const favoriteCarsQuery = useQuery<Car[]>({
    queryKey: [getFavoriteCarsQueryKey],
    queryFn: () =>
      fetchFavoriteCars({ userId: data?.userId, token: data?.token }),
    enabled: isEnabled,
  });

  return { favoriteCarsQuery };
};
