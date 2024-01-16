"use client";

import { Car, useCarsQuery } from "@/app/server/actions/car/useCarsQuery";
import { CarTile } from "../CarTile";
import { CarTileSkeleton } from "../CarTile/CarTileSkeleton";

import { useState } from "react";
import { BrandTiles } from "../BrandTiles";
import { Brand } from "@/app/api/brand/useBrandsQuery";
import { useFavoriteCarsQuery } from "@/app/server/actions/car/useFavoriteCarsQuery";
import { useCarData } from "./useCarData";

type Props = {
  initialData?: Car[];
  onlyHighlighted?: boolean;
  shouldDisplayBrandSelector?: boolean;
  brands?: Brand[];
  isFavoritesList?: boolean;
};

export const CarsTiles = ({
  initialData = [],
  onlyHighlighted = undefined,
  shouldDisplayBrandSelector = false,
  brands,
  isFavoritesList = false,
}: Props) => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const { cars, isLoading, isError } = useCarData({
    onlyHighlighted,
    activeBrand: shouldDisplayBrandSelector ? activeBrand : null,
    initialData,
    isFavoritesList,
  });

  if (isError) return <div>Error!</div>;

  return (
    <main className="flex min-h-screen flex-col items-center">
      {shouldDisplayBrandSelector && (
        <BrandTiles
          initialBrands={brands}
          activeBrand={activeBrand}
          setActiveBrand={setActiveBrand}
        />
      )}

      {isLoading ? (
        <CarTileSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
          {cars?.map(
            ({
              id,
              brand,
              brandId,
              model,
              generation,
              engine,
              isHighlighted,
              price,
              imageUrl,
              isFavorite,
            }) => (
              <CarTile
                id={id}
                key={id}
                brandId={brandId}
                brand={brand}
                model={model}
                generation={generation}
                engine={engine}
                isHighlighted={isHighlighted}
                price={price}
                imageUrl={imageUrl}
                isFavorite={isFavorite}
              />
            ),
          )}
        </div>
      )}
    </main>
  );
};
