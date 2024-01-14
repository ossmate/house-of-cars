import { createAPIPath } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarsQueryKey } from "./useCarsQuery";
import { useAuthProvider } from "@/app/AuthProvider";

export const useAddToFavoriteMutation = () => {
  const {
    authState: { userId, jwtToken },
  } = useAuthProvider();

  const queryClient = useQueryClient();

  const postAddToFavoriteRequest = (carId: string) =>
    fetch(`${createAPIPath()}/api/favorites/${carId}`, {
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

  const addToFavoriteMutation = useMutation({
    mutationFn: (carId: string) => postAddToFavoriteRequest(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { addToFavoriteMutation };
};
