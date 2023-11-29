"use client";

import { CarCard } from "@/components/CarCard";

import { useGetCars } from "../api/car/useGetCars";

export default function Cars() {
  const {
    getCarsQuery: { data },
  } = useGetCars();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
        {data?.data.map(
          ({ id, brand, model, generation, engine, isHighlighted, price }) => (
            <CarCard
              key={id}
              id={id}
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
