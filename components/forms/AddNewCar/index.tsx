"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useCreateCarMutation } from "@/app/server/actions/car/useCreateCarMutation";
import { uploadImageToCloudinary } from "@/lib/utils";
import { Brand, useBrandsQuery } from "@/app/api/brand/useBrandsQuery";

const createCarSchema = z.object({
  brandId: z.string().min(1, "Brand is required"),
  model: z.string().min(1, "Model name is required"),
  generation: z.string().min(1, "Generation name is required"),
  engine: z.string().min(1, "Engine name is required"),
  price: z.coerce.number().min(1, "Price name is required"),
  isHighlighted: z.boolean().default(false),
  image: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
});

type CreateCarTypeSchema = z.infer<typeof createCarSchema>;

export const AddNewCar = () => {
  const { push } = useRouter();

  const {
    brandsQuery: { data: brands },
  } = useBrandsQuery();

  const { createCarMutation } = useCreateCarMutation();

  const handleCreateNewCar = async (formData: CreateCarTypeSchema) => {
    const result = createCarSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(
        `An error occurred while parsing the create car form data.`,
      );
    }

    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      throw new Error(`Missing userId`);
    }

    let imageUrl = "";
    if (formData.image) {
      imageUrl = await uploadImageToCloudinary(formData.image);
    }

    createCarMutation.mutate(
      { ...formData, imageUrl, belongsToId: userId },
      {
        onSuccess: (data) => {
          push(`/cars/${data?.data?.id}?singleCarView=true`);
        },
      },
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<CreateCarTypeSchema>({
    resolver: zodResolver(createCarSchema),
    defaultValues: {
      brandId: "",
      model: "",
      generation: "",
      engine: "",
      price: 0,
      isHighlighted: false,
      image: undefined,
    },
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleCreateNewCar)}
        className="flex flex-col"
      >
        <label htmlFor="brandId">Brand</label>
        <select
          id="brandId"
          placeholder="Select brand"
          disabled={createCarMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("brandId")}
        >
          {brands?.data.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        {errors?.brandId?.message && (
          <p className="text-sm text-red-400">{errors?.brandId?.message}</p>
        )}

        <label htmlFor="model">Model</label>
        <input
          id="model"
          type="text"
          disabled={createCarMutation.isPending}
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
          disabled={createCarMutation.isPending}
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
          disabled={createCarMutation.isPending}
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
          disabled={createCarMutation.isPending}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("price", { valueAsNumber: true })}
        />
        {errors?.price?.message && (
          <p className="text-sm text-red-400">{errors?.price?.message}</p>
        )}

        <label
          htmlFor="isHighlighted"
          className="inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="isHighlighted"
            className="form-checkbox text-green-500 h-5 w-5 rounded border-gray-300 focus:ring-green-500 focus:border-green-500"
            {...register("isHighlighted")}
          />
          <span className="ml-2 text-gray-700">Should highlight offer?</span>
        </label>
        {errors.isHighlighted && (
          <p className="text-sm text-red-500">{errors.isHighlighted.message}</p>
        )}

        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  field.onChange(e.target.files[0]);
                }
              }}
            />
          )}
        />
        {errors?.image?.message && (
          <p className="text-sm text-red-400">{errors?.image?.message}</p>
        )}

        <Button
          type="submit"
          disabled={createCarMutation.isPending || !isDirty}
          className="flex justify-center mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
