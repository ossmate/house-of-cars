"use client";

import { Car, useCarsQuery } from "@/app/api/car/useCarsQuery";
import { CarTile } from "../CarTile";
import { CarTileSkeleton } from "../CarTile/CarTileSkeleton";

import { useState } from "react";
import { Brand } from "@/app/settings/page";
import { BrandTiles } from "../BrandTiles";

type Props = {
  cars?: Car[];
  onlyHighlighted?: boolean;
  shouldDisplayBrandSelector?: boolean;
  brands?: Brand[];
};

export const CarsTiles = ({
  cars,
  onlyHighlighted = false,
  shouldDisplayBrandSelector = false,
  brands,
}: Props) => {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  const {
    carsQuery: { data, isLoading, isError },
  } = useCarsQuery({
    onlyHighlighted: onlyHighlighted,
    brandId: shouldDisplayBrandSelector ? activeBrand : null,
    initialData: cars,
  });

  if (isLoading) return <CarTileSkeleton />;

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

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
        {data?.data?.map(
          ({
            id,
            brand,
            brandId,
            model,
            generation,
            engine,
            isHighlighted,
            price,
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
            />
          ),
        )}
      </div>
    </main>
  );
};
