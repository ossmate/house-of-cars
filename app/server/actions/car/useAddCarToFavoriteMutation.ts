import { createAPIPath } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarsQueryKey } from "./useCarsQuery";
import { useAuthProvider } from "@/app/AuthProvider";

export const useAddCarToFavoriteMutation = () => {
  const {
    authState: { userId, jwtToken },
  } = useAuthProvider();

  const queryClient = useQueryClient();

  const postAddCarToFavoriteRequest = (carId: string) =>
    fetch(`${createAPIPath()}/api/favorites`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: carId,
        userId: userId,
      }),
    });

  const addCarToFavoriteMutation = useMutation({
    mutationFn: (carId: string) => postAddCarToFavoriteRequest(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { addCarToFavoriteMutation };
};
