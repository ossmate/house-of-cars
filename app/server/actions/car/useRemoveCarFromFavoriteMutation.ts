import { createAPIPath } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarsQueryKey } from "./useCarsQuery";
import { useAuthProvider } from "@/app/AuthProvider";

export const useRemoveCarFromFavoriteMutation = () => {
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
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { deleteCarFromFavoriteMutation };
};
