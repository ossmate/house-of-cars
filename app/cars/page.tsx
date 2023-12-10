"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CarCard } from "@/components/CarCard";

import { useGetCars } from "../api/car/useGetCars";
import { useGetBrandsQuery } from "../api/brand/getBrandsQuery";

export default function Cars() {
  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const {
    getCarsQuery: { data: cars, isLoading: isCarsLoading },
  } = useGetCars({ brandId: activeBrand });

  const {
    getBrandsQuery: { data: brands },
  } = useGetBrandsQuery();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex">
        {brands?.data?.map(
          ({ id, name, imageUrl, carsCount }) =>
            carsCount > 0 && (
              <div
                key={id}
                className={cn(
                  "mb-5 p-4 mx-2 bg-blue-400 flex justify-center flex-col items-center hover:bg-pink-100 transition-colors cursor-pointer",
                  activeBrand === id && "bg-pink-200",
                )}
                onClick={() => setActiveBrand(id)}
              >
                <span>{name}</span>
                <div>
                  <Image width="100" height="100" src={imageUrl} alt={name} />
                </div>
              </div>
            ),
        )}
      </div>

      {cars?.data.length === 0 && !isCarsLoading && (
        <p>
          oops, looks like there are no cars for brand{" "}
          {brands?.data.find(({ id }) => id === activeBrand)?.name}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
        {cars?.data.map(
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
            <CarCard
              key={id}
              id={id}
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
}
