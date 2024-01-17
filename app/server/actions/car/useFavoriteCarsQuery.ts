import { useQuery } from "@tanstack/react-query";
import { createAPIPath } from "@/lib/utils";
import { Car } from "./useCarsQuery";

export const getFavoriteCarsQueryKey = "favorite-cars";

export const fetchFavoriteCars = async () => {
  try {
    const headers: Record<string, string> = {};
    const userId = localStorage.getItem("userId");

    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");

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

export const useFavoriteCarsQuery = () => {
  const favoriteCarsQuery = useQuery<Car[]>({
    queryKey: [getFavoriteCarsQueryKey],
    queryFn: () => fetchFavoriteCars(),
  });

  return { favoriteCarsQuery };
};
