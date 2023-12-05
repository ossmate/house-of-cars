"use client";

import { useCreateBrandMutation } from "@/app/api/brand/useCreateBrandMutation";
import { Button } from "@/components/ui/button";
import { uploadImageToCloudinary } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const createBrandSchema = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.custom<File>((v) => v instanceof File, {
    message: "Image is required",
  }),
});

type CreateBrandType = z.infer<typeof createBrandSchema>;

export const AddNewBrand = () => {
  const { createBrandMutation } = useCreateBrandMutation();

  const handleCreateNewBrand = async (formData: CreateBrandType) => {
    const result = createBrandSchema.safeParse(formData);

    if (!result.success) {
      throw new Error(
        `An error occurred while parsing the create car form data.`,
      );
    }

    let imageUrl = "";
    if (formData.image) {
      imageUrl = await uploadImageToCloudinary(formData.image);
    }

    createBrandMutation.mutate({ name: formData.name, imageUrl });
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm<CreateBrandType>({
    resolver: zodResolver(createBrandSchema),
    defaultValues: {
      name: "",
      image: undefined,
    },
  });

  return (
    <div>
      <form onSubmit={handleSubmit(handleCreateNewBrand)}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          {...register("name")}
        />
        {errors?.name?.message && (
          <p className="text-sm text-red-400">{errors?.name?.message}</p>
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
          disabled={!isDirty}
          className="flex justify-center mt-5 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
