import { z } from "zod";

export const createCarSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model name is required"),
  generation: z.string().min(1, "Generation name is required"),
  engine: z.string().min(1, "Engine name is required"),
  price: z.coerce.number().min(1, "Price name is required"),
  isHighlighted: z.boolean().default(false),
});

export type CreateCarTypeSchema = z.infer<typeof createCarSchema>;

export async function createCar(formData: CreateCarTypeSchema) {
  const result = createCarSchema.safeParse(formData);

  if (!result.success) {
    throw new Error(
      `An error occurred while parsing the create car form data.`,
    );
  }

  try {
    const res = await fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });

    const {
      data: { id },
    } = await res.json();
    return id;
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}
