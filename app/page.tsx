"use client";

import { CarCard } from "@/components/CarCard";
import { useGetCars } from "./api/car/useGetCars";

export default function Home() {
  const {
    getCarsQuery: { data },
  } = useGetCars({ onlyHighlighted: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
        {data?.data.map(
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
    </main>
  );
}
