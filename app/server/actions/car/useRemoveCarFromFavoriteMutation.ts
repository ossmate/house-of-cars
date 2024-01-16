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
    // onMutate: async (carId) => {
    //   await queryClient.cancelQueries("cars");

    //   const previousCars = queryClient.getQueryData("cars");

    //   console.log(previousCars, "previousCars");

    //   // Check if previousCars exists
    //   if (previousCars) {
    //     // Optimistically update the UI
    //     queryClient.setQueryData("cars", (oldCars: CarType[] | undefined) => {
    //       return oldCars?.map((car) => {
    //         if (car.id === carId) {
    //           return { ...car, isFavorite: true };
    //         }
    //         return car;
    //       });
    //     });
    //   }

    //   return { previousCars };
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { deleteCarFromFavoriteMutation };
};
