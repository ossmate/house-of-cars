"use client";

import { Car, useGetCars } from "@/app/api/car/useGetCars";
import { CarCard } from "./CarCard";
import { CarCardSkeleton } from "./CarCard/CarCardSkeleton";

type Props = {
  cars?: Car[];
};

export const MainPageCars = ({ cars }: Props) => {
  const {
    getCarsQuery: { data, isLoading, isError },
  } = useGetCars({ onlyHighlighted: true, initialData: cars });

  if (isLoading) return <CarCardSkeleton />;

  if (isError) return <div>Error!</div>;

  return (
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
          <CarCard
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
  );
};
