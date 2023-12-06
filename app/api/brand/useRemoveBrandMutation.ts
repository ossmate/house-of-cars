import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrandsQueryKey } from "./getBrandsQuery";

export const useRemoveBrandMutation = () => {
  const queryClient = useQueryClient();
  const removeBrandRequest = (brandId: string) =>
    fetch(`http://localhost:5000/api/brands/${brandId}`, {
      method: "DELETE",
    });

  const removeBrandMutation = useMutation({
    mutationFn: (brandId: string) => removeBrandRequest(brandId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getBrandsQueryKey],
      });
    },
  });

  return { removeBrandMutation };
};
