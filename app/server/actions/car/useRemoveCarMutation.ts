import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCarsQueryKey } from "./useCarsQuery";
import { createAPIPath } from "@/lib/utils";

export const useRemoveCarMutation = () => {
  const queryClient = useQueryClient();
  const removeCarRequest = (carId: string) =>
    fetch(`${createAPIPath()}/api/cars/${carId}`, {
      method: "DELETE",
    });

  const removeCarMutation = useMutation({
    mutationFn: (carId: string) => removeCarRequest(carId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { removeCarMutation };
};
