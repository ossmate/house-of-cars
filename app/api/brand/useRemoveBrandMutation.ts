import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getBrandsQueryKey } from "./useBrandsQuery";
import { createAPIPath } from "@/lib/utils";

export const useRemoveBrandMutation = () => {
  const queryClient = useQueryClient();
  const removeBrandRequest = (brandId: string) =>
    fetch(`${createAPIPath()}/api/brands/${brandId}`, {
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
