import { z } from "zod";

export async function createCar(_prevState: any, formData: FormData) {
  const schema = z.object({
    brand: z.string().min(1),
    model: z.string().min(1),
    generation: z.string().min(1),
    engine: z.string().min(1),
    price: z.number().default(5000),
    isHighlighted: z.boolean().default(false),
  });

  const parse = schema.safeParse({
    brand: formData.get("brand"),
    model: formData.get("model"),
    generation: formData.get("generation"),
    engine: formData.get("engine"),
    price: Number(formData.get("price")),
    isHighlighted: Boolean(formData.get("isHighlighted")),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }
  const { brand, model, generation, engine, price, isHighlighted } = parse.data;

  try {
    await fetch("http://localhost:5000/api/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        brand,
        model,
        generation,
        engine,
        price,
        isHighlighted,
      }),
    });

    return { message: `Added todo ${brand}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}
