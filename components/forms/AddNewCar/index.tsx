"use client";
import { z } from "zod";

import { Brand } from "@/app/settings/page";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const createCarSchema = z.object({
  brand: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model name is required"),
  generation: z.string().min(1, "Generation name is required"),
  engine: z.string().min(1, "Engine name is required"),
  price: z.coerce.number().min(1, "Price name is required"),
  isHighlighted: z.boolean().default(false),
});

type CreateCarTypeSchema = z.infer<typeof createCarSchema>;

export const AddNewCar = ({ brands }: { brands: Brand[] }) => {
  const { push } = useRouter();
  const [status, setStatus] = useState<
    "idle" | "pending" | "resolved" | "rejected"
  >("idle");

  const isPending = status === "pending";

  async function createCar(formData: CreateCarTypeSchema) {
    setStatus("pending");

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

      setStatus("resolved");

      push(`/cars/${id}`);
    } catch (e) {
      setStatus("rejected");
      return { message: "Failed to create todo" };
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<CreateCarTypeSchema>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      brand: "",
      model: "",
      generation: "",
      engine: "",
      price: 0,
      isHighlighted: false,
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(createCar)} className="flex flex-col">
        <label htmlFor="brand">Brand</label>
        <select
          id="brand"
          disabled={isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("brand")}
        >
          {brands.map(({ id, name }) => (
            <option key={id} value={name}>
              {name}
            </option>
          ))}
        </select>
        {errors?.brand?.message && (
          <p className="text-sm text-red-400">{errors?.brand?.message}</p>
        )}

        <label htmlFor="model">Model</label>
        <input
          id="model"
          type="text"
          disabled={isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("model")}
        />
        {errors?.model?.message && (
          <p className="text-sm text-red-400">{errors?.model?.message}</p>
        )}

        <label htmlFor="generation">Generation</label>
        <input
          id="generation"
          type="text"
          disabled={isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("generation")}
        />
        {errors?.generation?.message && (
          <p className="text-sm text-red-400">{errors?.generation?.message}</p>
        )}

        <label htmlFor="engine">Engine</label>
        <input
          id="engine"
          type="text"
          disabled={isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("engine")}
        />
        {errors?.engine?.message && (
          <p className="text-sm text-red-400">{errors?.engine?.message}</p>
        )}

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          disabled={isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("price", { valueAsNumber: true })}
        />
        {errors?.price?.message && (
          <p className="text-sm text-red-400">{errors?.price?.message}</p>
        )}

        <label htmlFor="isHighlighted">Should highlight offer?</label>
        <select
          id="isHighlighted"
          disabled={isPending}
          className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("isHighlighted", {
            required: false,
          })}
        >
          <option value="true">True</option>
          <option value="false">False</option>
        </select>

        <Button
          type="submit"
          disabled={isPending || !isDirty}
          className="flex justify-center mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
