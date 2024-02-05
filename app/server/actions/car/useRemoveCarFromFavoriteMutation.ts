import { createAPIPath } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Car, getCarsQueryKey } from "./useCarsQuery";
import { getFavoriteCarsQueryKey } from "./useFavoriteCarsQuery";
import { useSession } from "next-auth/react";

export const useRemoveCarFromFavoriteMutation = (isFavoritesList?: boolean) => {
  const { data } = useSession();
  const queryClient = useQueryClient();

  const deleteCarFromFavoriteRequest = (carId: string) =>
    fetch(`${createAPIPath()}/api/favorites`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${data?.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: carId,
        userId: data?.userId,
      }),
    });

  const deleteCarFromFavoriteMutation = useMutation({
    mutationFn: (carId: string) => deleteCarFromFavoriteRequest(carId),
    onMutate: (carId) => {
      const data = isFavoritesList
        ? queryClient.getQueryData([getFavoriteCarsQueryKey])
        : queryClient.getQueryData([getCarsQueryKey]);

      queryClient.setQueryData(
        isFavoritesList ? [getFavoriteCarsQueryKey] : [getCarsQueryKey],
        (prevData: Car[]) => {
          if (isFavoritesList) {
            const updatedData = prevData.map((car: Car) =>
              car.id === carId ? { ...car, isFavorite: false } : car,
            );
            return updatedData;
          }

          return prevData;
        },
      );

      return { data };
    },
    onSuccess: () => {
      if (!isFavoritesList) {
        queryClient.invalidateQueries({
          queryKey: [getCarsQueryKey],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [getFavoriteCarsQueryKey],
        });
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.data) {
        queryClient.setQueryData(
          isFavoritesList ? [getFavoriteCarsQueryKey] : [getCarsQueryKey],
          context.data,
        );
      }
    },
  });

  return { deleteCarFromFavoriteMutation };
};
