"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "Series 3",
    generation: "G20",
    engine: "3.0i",
    price: "10000",
  },
  {
    id: 2,
    brand: "BMW",
    model: "Series 5",
    generation: "G30",
    engine: "3.0d",
    price: "15000",
  },
  {
    id: 3,
    brand: "BMW",
    model: "Series 7",
    generation: "G70",
    engine: "3.0ie",
    price: "25000",
  },
];

export const CarCard = () => {
  return (
    <div
      className="flex
    "
    >
      {cars.map(({ id, brand, model, generation, engine, price }) => (
        <div className="mx-2 " key={id}>
          <div
            className={cn(
              generation === "G20" && "bg-green-200",
              generation === "G30" && "bg-blue-200",
              generation === "G70" && "bg-pink-200",
              "px-8 pt-4 pb-2 rounded-t-2xl",
            )}
          >
            <h2 className="font-bold">
              {brand} {model}
            </h2>
            <p className="text-xs">
              {generation} {engine}
            </p>
            <Image width="300" height="300" alt="m3" src="/cars/m3/main.png" />
          </div>
          <div
            className={cn(
              generation === "G20" && "bg-green-300",
              generation === "G30" && "bg-blue-300",
              generation === "G70" && "bg-pink-300",
              "rounded-b-xl p-4 flex justify-end",
            )}
          >
            <p>
              <b>${price}</b>/day
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
