import { createAPIPath } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarsQueryKey } from "./useCarsQuery";
import { useAuthProvider } from "@/app/AuthProvider";
import { getFavoriteCarsQueryKey } from "./useFavoriteCarsQuery";

export const useRemoveCarFromFavoriteMutation = (isFavoritesList?: boolean) => {
  const {
    authState: { userId, jwtToken },
  } = useAuthProvider();

  const queryClient = useQueryClient();

  const deleteCarFromFavoriteRequest = (carId: string) =>
    fetch(`${createAPIPath()}/api/favorites`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: carId,
        userId: userId,
      }),
    });

  const deleteCarFromFavoriteMutation = useMutation({
    mutationFn: (carId: string) => deleteCarFromFavoriteRequest(carId),
    onSuccess: () => {
      if (isFavoritesList) {
        queryClient.invalidateQueries({
          queryKey: [getFavoriteCarsQueryKey],
        });

        return;
      }

      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { deleteCarFromFavoriteMutation };
};
