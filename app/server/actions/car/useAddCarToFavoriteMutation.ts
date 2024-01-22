import { createAPIPath } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Car, getCarsQueryKey } from "./useCarsQuery";
import { useAuthProvider } from "@/app/AuthProvider";

export const postAddCarToFavoriteRequest = (
  carId: string,
  jwtToken?: string | null,
  userId?: string | null,
) =>
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

export const useAddCarToFavoriteMutation = () => {
  const {
    authState: { userId, jwtToken },
  } = useAuthProvider();

  const queryClient = useQueryClient();

  const addCarToFavoriteMutation = useMutation({
    mutationFn: (carId: string) =>
      postAddCarToFavoriteRequest(carId, jwtToken, userId),
    onMutate: async (carId) => {
      const data: Car[] | undefined = queryClient.getQueryData([
        getCarsQueryKey,
      ]);

      const carIndex = data?.findIndex((car) => car.id === carId);

      if (!carIndex) return;

      queryClient.setQueryData([getCarsQueryKey], (prevData: Car[]) => {
        const updatedData = [...prevData];
        if (carIndex !== -1) {
          updatedData[carIndex] = {
            ...updatedData[carIndex],
            isFavorite: true,
          };
        }
        return updatedData;
      });

      return { data };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
    onError: (_error, _variables, context) => {
      if (context?.data) {
        queryClient.setQueryData([getCarsQueryKey], context.data);
      }
    },
  });

  return { addCarToFavoriteMutation };
};
