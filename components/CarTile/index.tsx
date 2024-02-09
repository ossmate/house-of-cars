"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu } from "../DropdownMenu";
import { useRemoveCarMutation } from "@/app/server/actions/car/useRemoveCarMutation";
import { useRouter, useSearchParams } from "next/navigation";
import { Brand } from "@/app/api/brand/useBrandsQuery";
import { Button } from "../ui/button";
import { useAddCarToFavoriteMutation } from "@/app/server/actions/car/useAddCarToFavoriteMutation";
import { useRemoveCarFromFavoriteMutation } from "@/app/server/actions/car/useRemoveCarFromFavoriteMutation";
import { useFavoriteCarsProvider } from "@/app/providers/FavoriteCarsProvider";
import { useSession } from "next-auth/react";

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
  isFavoritesList?: boolean;
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
  isFavoritesList,
}: Props) => {
  const { localFavoriteCars, addToFavorites, removeFromFavorites } =
    useFavoriteCarsProvider();
  const { data } = useSession();

  const { push } = useRouter();
  const isSingleCarView = useSearchParams().get("singleCarView");
  const { removeCarMutation } = useRemoveCarMutation();
  const { addCarToFavoriteMutation } = useAddCarToFavoriteMutation();
  const { deleteCarFromFavoriteMutation } =
    useRemoveCarFromFavoriteMutation(isFavoritesList);

  const onAddToFavorites = (carId: string) => {
    if (data?.token) {
      addCarToFavoriteMutation.mutate(carId);
      return;
    }

    addToFavorites(carId);
  };

  const onRemoveFromFavorites = (carId: string) => {
    if (data?.token) {
      deleteCarFromFavoriteMutation.mutate(carId);
    }

    removeFromFavorites(carId);
  };

  const onRemoveCarClick = (carId: string) => {
    removeCarMutation.mutate(carId, {
      onSuccess: () => {
        if (isSingleCarView) {
          push("/cars");
        }
      },
    });
  };

  const getActionButtonOptions = () => {
    const actions = [
      {
        id: "1",
        label: "Remove",
        onClick: () => onRemoveCarClick(id),
      },
    ];

    if (isFavorite) {
      actions.push({
        id: "2",
        label: "Remove from favorites",
        onClick: () => onRemoveFromFavorites(id),
      });
    }

    if (!isFavorite) {
      actions.push({
        id: "3",
        label: "Add to favorites",
        onClick: () => onAddToFavorites(id),
      });
    }

    return actions;
  };

  const isCarMarkedAsFavorite = (carId: string) => {
    if (data?.token) return isFavorite;

    const isInProviderFavoritesList = localFavoriteCars.find(
      (c) => c === carId,
    );

    return isInProviderFavoritesList;
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

          {data?.token && <DropdownMenu actions={getActionButtonOptions()} />}
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
            isCarMarkedAsFavorite(id)
              ? onRemoveFromFavorites(id)
              : onAddToFavorites(id);
          }}
          disabled={
            deleteCarFromFavoriteMutation.isPending ||
            addCarToFavoriteMutation.isPending
          }
        >
          {isCarMarkedAsFavorite(id) ? <FaHeart /> : <FaRegHeart />}
        </Button>
        <p>
          <b>${price}</b>/day
        </p>
      </div>
    </Link>
  );
};
