"use client";

import { Car, useCarsQuery } from "@/app/server/actions/car/useCarsQuery";
import { CarTile } from "../CarTile";
import { CarTileSkeleton } from "../CarTile/CarTileSkeleton";

import { useState } from "react";
import { BrandTiles } from "../BrandTiles";
import { Brand } from "@/app/api/brand/useBrandsQuery";

type Props = {
  cars?: Car[];
  onlyHighlighted?: boolean;
  shouldDisplayBrandSelector?: boolean;
  brands?: Brand[];
};

export const CarsTiles = ({
  onlyHighlighted = undefined,
  shouldDisplayBrandSelector = false,
  brands,
}: Props) => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const {
    carsQuery: { data, isLoading, isError },
  } = useCarsQuery({
    ...(onlyHighlighted !== undefined && { onlyHighlighted: onlyHighlighted }),
    brandId: shouldDisplayBrandSelector ? activeBrand : null,
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
          {data?.map(
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
              />
            ),
          )}
        </div>
      )}
    </main>
  );
};
