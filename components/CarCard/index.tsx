"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu } from "../DropdownMenu";
import { useRemoveCarMutation } from "@/app/api/car/useRemoveCarMutation";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand } from "@/app/settings/page";

type Props = {
  id: string;
  createdAt?: string;
  brandId: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
  brand: Brand;
};

export const CarCard = ({
  id,
  brand,
  model,
  generation,
  engine,
  isHighlighted,
  price,
}: Props) => {
  const { push } = useRouter();
  const isSingleCarView = useSearchParams().get("singleCarView");
  const { removeCarMutation } = useRemoveCarMutation();

  const onRemoveCarClick = (carId: string) => {
    removeCarMutation.mutate(carId, {
      onSuccess: () => {
        if (isSingleCarView) {
          push("/cars");
        }
      },
    });
  };

  return (
    <Link
      className="md:min-w-full min-w-[350px]"
      href={`/cars/${id}?singleCarView=true`}
    >
      <div
        className={cn(
          "px-8 pt-4 pb-2 rounded-t-2xl bg-gray-200",
          isHighlighted && brand.name === "BMW" && "bg-green-200",
          isHighlighted && brand.name === "Mercedes" && "bg-blue-200",
          isHighlighted && brand.name === "Porsche" && "bg-pink-200",
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Image
              width="35"
              height="35"
              alt="brand.name"
              src={brand?.imageUrl}
              className="mr-2"
            />
            <span>
              <h2 className="font-bold">
                {brand.name} {model}
              </h2>
              <p className="text-xs">
                {generation} {engine}
              </p>
            </span>
          </div>

          <DropdownMenu
            actions={[
              {
                id: "1",
                label: "Remove",
                onClick: () => onRemoveCarClick(id),
              },
            ]}
          />
        </div>
        <Image width="300" height="300" alt="m3" src="/cars/m3/main.png" />
      </div>
      <div
        className={cn(
          "rounded-b-xl p-4 flex justify-end bg-gray-300",
          isHighlighted && brand.name === "BMW" && "bg-green-300",
          isHighlighted && brand.name === "Mercedes" && "bg-blue-300",
          isHighlighted && brand.name === "Porsche" && "bg-pink-300",
        )}
      >
        <p>
          <b>${price}</b>/day
        </p>
      </div>
    </Link>
  );
};
