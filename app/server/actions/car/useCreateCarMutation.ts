import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCarsQueryKey } from "./useCarsQuery";
import { createAPIPath } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const createCarSchema = z.object({
  brandId: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model name is required"),
  generation: z.string().min(1, "Generation name is required"),
  engine: z.string().min(1, "Engine name is required"),
  belongsToId: z.string().min(1, "BelongsToId is required"),
  price: z.coerce.number().min(1, "Price name is required"),
  isHighlighted: z.boolean().default(false),
  imageUrl: z.string().url().optional(),
});

type CreateCarTypeSchema = z.infer<typeof createCarSchema>;
type CreateCarResponse = z.infer<typeof createCarSchema> & { id: string };

export const useCreateCarMutation = () => {
  const { data } = useSession();
  const queryClient = useQueryClient();

  const createCarRequest = (
    formData: CreateCarTypeSchema,
  ): Promise<{ data: CreateCarResponse }> =>
    fetch(`${createAPIPath()}/api/cars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data?.token}`,
      },
      body: JSON.stringify({ ...formData }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });

  const createCarMutation = useMutation({
    mutationFn: (formData: CreateCarTypeSchema) => createCarRequest(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
    },
  });

  return { createCarMutation };
};
