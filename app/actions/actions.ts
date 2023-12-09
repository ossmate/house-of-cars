"use server";

import { createAPIPath } from "@/lib/utils";
import { z } from "zod";

export async function createTodo(prevState: any, formData: FormData) {
  const schema = z.object({
    todo: z.string().min(1),
  });
  const parse = schema.safeParse({
    todo: formData.get("todo"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const data = parse.data;

  try {
    return { message: `Added todo ${data.todo}` };
  } catch (e) {
    return { message: "Failed to create todo" };
  }
}

export async function createTodo2(_prevState: any, formData: FormData) {
  const schema = z.object({
    brand: z.string().min(1),
    model: z.string().min(1),
    generation: z.string().min(1),
    engine: z.string().min(1),
    price: z.string().min(1),
    isHighlighted: z.string().min(1),
  });

  const parse = schema.safeParse({
    brand: formData.get("brand"),
    model: formData.get("model"),
    generation: formData.get("generation"),
    engine: formData.get("engine"),
    price: formData.get("price"),
    isHighlighted: formData.get("isHighlighted"),
  });

  if (!parse.success) {
    return { message: "Failed to create todo" };
  }

  const { brand, model, generation, engine, price, isHighlighted } = parse.data;

  try {
    await fetch(`${createAPIPath()}`, {
      method: "POST",
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
