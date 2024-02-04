"use client";

import { Brand } from "@/app/api/brand/useBrandsQuery";
import { Car, useCarsQuery } from "@/app/server/actions/car/useCarsQuery";
import { useFavoriteCarsQuery } from "@/app/server/actions/car/useFavoriteCarsQuery";
import { useSession } from "next-auth/react";

interface CarsTilesProps {
  initialData?: Car[];
  onlyHighlighted?: boolean;
  activeBrand?: string | null;
  shouldDisplayBrandSelector?: boolean;
  brands?: Brand[];
  isFavoritesList?: boolean;
}

export const useCarData = ({
  onlyHighlighted,
  activeBrand,
  initialData,
  isFavoritesList,
}: CarsTilesProps) => {
  const { data } = useSession();

  const {
    carsQuery: { data: carsData, isLoading: carsLoading, isError: carsError },
  } = useCarsQuery({
    onlyHighlighted,
    brandId: activeBrand,
    initialData,
    isEnabled: !isFavoritesList,
  });

  const {
    favoriteCarsQuery: {
      data: favoriteCars,
      isLoading: favoriteCarsLoading,
      isError: favoriteCarsError,
    },
  } = useFavoriteCarsQuery(Boolean(data?.token) && isFavoritesList);

  return {
    cars: isFavoritesList ? favoriteCars : carsData,
    isLoading: isFavoritesList ? favoriteCarsLoading : carsLoading,
    isError: isFavoritesList ? favoriteCarsError : carsError,
  };
};
