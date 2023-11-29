import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveCarMutation = () => {
  const queryClient = useQueryClient();
  const removeCarRequest = (carId: string) =>
    fetch(`http://localhost:5000/api/cars/${carId}`, {
      method: "DELETE",
    });

  const removeCarMutation = useMutation({
    mutationFn: (carId: string) => removeCarRequest(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cars"],
      });
    },
  });

  return { removeCarMutation };
};
