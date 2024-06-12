import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getBrandsQueryKey } from "./useBrandsQuery";
import { createAPIPath } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const createBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  imageUrl: z.string().url().optional(), // Updated to accept a URL string
});

type CreateBrandTypeSchema = z.infer<typeof createBrandSchema>;
type CreateBrandResponse = z.infer<typeof createBrandSchema> & { id: string };

export const useCreateBrandMutation = () => {
    const { data } = useSession();
  const queryClient = useQueryClient();

  const createBrandRequest = (
    formData: CreateBrandTypeSchema,
  ): Promise<{ data: CreateBrandResponse }> => {
    return fetch(`${createAPIPath()}/api/brands`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.token}`,
      },
      body: JSON.stringify(formData),
    }).then((res) => res.json());
  };

  const createBrandMutation = useMutation({
    mutationFn: (formData: CreateBrandTypeSchema) =>
      createBrandRequest(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getBrandsQueryKey],
      });
    },
  });

  return { createBrandMutation };
};
