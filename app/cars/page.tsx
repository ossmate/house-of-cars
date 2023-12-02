"use client";

import Image from "next/image";

import { CarCard } from "@/components/CarCard";

import { useGetCars } from "../api/car/useGetCars";
import { useGetBrandsQuery } from "../api/brand/getBrandsQuery";

export default function Cars() {
  const {
    getCarsQuery: { data },
  } = useGetCars({});

  const {
    getBrandsQuery: { data: brands },
  } = useGetBrandsQuery();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex">
        {brands?.data?.map(({ id, name, imageUrl }) => (
          <div key={id} className="mb-5 p-4 mx-2 bg-blue-400">
            {name}

            <img width="50" height="50" src={imageUrl} alt={name} />
          </div>
        ))}
      </div>

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
