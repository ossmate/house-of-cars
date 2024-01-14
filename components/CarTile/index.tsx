"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu } from "../DropdownMenu";
import { useRemoveCarMutation } from "@/app/server/actions/car/useRemoveCarMutation";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand } from "@/app/api/brand/useBrandsQuery";
import { useAuthProvider } from "@/app/AuthProvider";
import { Button } from "../ui/button";
import { useAddToFavoriteMutation } from "@/app/server/actions/car/useAddToFavoriteMutation";

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
  imageUrl: string;
  isFavorite?: boolean;
};

export const CarTile = ({
  id,
  brand,
  model,
  generation,
  engine,
  isHighlighted,
  price,
  imageUrl,
  isFavorite,
}: Props) => {
  console.log(isFavorite, "isFavorite");
  const {
    authState: { jwtToken },
  } = useAuthProvider();

  const { push } = useRouter();
  const isSingleCarView = useSearchParams().get("singleCarView");
  const { removeCarMutation } = useRemoveCarMutation();
  const { addToFavoriteMutation } = useAddToFavoriteMutation();

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

          {jwtToken && (
            <DropdownMenu
              actions={[
                {
                  id: "1",
                  label: "Remove",
                  onClick: () => onRemoveCarClick(id),
                },
              ]}
            />
          )}
        </div>
        <Image
          width="300"
          height="300"
          alt="m3"
          className="w-[250px] h-[150px]"
          src={imageUrl ? imageUrl : "/cars/m3/main.png"}
        />
      </div>
      <div
        className={cn(
          "rounded-b-xl p-4 flex justify-between items-center bg-gray-300",
          isHighlighted && brand.name === "BMW" && "bg-green-300",
          isHighlighted && brand.name === "Mercedes" && "bg-blue-300",
          isHighlighted && brand.name === "Porsche" && "bg-pink-300",
        )}
      >
        <Button
          onClick={(e) => {
            e.preventDefault();
            addToFavoriteMutation.mutate(id);
          }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </Button>
        <p>
          <b>${price}</b>/day
        </p>
      </div>
    </Link>
  );
};
