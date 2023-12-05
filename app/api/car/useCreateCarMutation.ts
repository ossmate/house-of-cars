import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { getCarsQueryKey } from "./useGetCars";

export const createCarSchema = z.object({
  brandId: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model name is required"),
  generation: z.string().min(1, "Generation name is required"),
  engine: z.string().min(1, "Engine name is required"),
  price: z.coerce.number().min(1, "Price name is required"),
  isHighlighted: z.boolean().default(false),
});

type CreateCarTypeSchema = z.infer<typeof createCarSchema>;
type CreateCarResponse = z.infer<typeof createCarSchema> & { id: string };

export const useCreateCarMutation = () => {
  const queryClient = useQueryClient();

  const createCarRequest = (
    formData: CreateCarTypeSchema,
  ): Promise<{ data: CreateCarResponse }> =>
    fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    }).then((res) => res.json());

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
