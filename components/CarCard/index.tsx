"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";

type Car = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
};

async function getCars(): Promise<{ data: Car[] }> {
  const res = await fetch("http://localhost:5000/api/cars");

  return res.json();
}

export const CarCard = async () => {
  const { data } = await getCars();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
      {data.map(
        ({ id, brand, model, generation, engine, isHighlighted, price }) => (
          <div key={id} className="md:min-w-full min-w-[350px]">
            <div
              className={cn(
                "px-8 pt-4 pb-2 rounded-t-2xl bg-gray-200",
                isHighlighted && generation === "G20" && "bg-green-200",
                isHighlighted && generation === "G30" && "bg-blue-200",
                isHighlighted && generation === "G70" && "bg-pink-200",
              )}
            >
              <div className="flex justify-start items-center">
                <Image
                  width="35"
                  height="35"
                  alt="brand"
                  src={`/cars/logos/${brand}.png`}
                  className="mr-2"
                />
                <span>
                  <h2 className="font-bold">
                    {brand} {model}
                  </h2>
                  <p className="text-xs">
                    {generation} {engine}
                  </p>
                </span>
              </div>
              <Image
                width="300"
                height="300"
                alt="m3"
                src="/cars/m3/main.png"
              />
            </div>
            <div
              className={cn(
                "rounded-b-xl p-4 flex justify-end bg-gray-300",
                isHighlighted && generation === "G20" && "bg-green-300",
                isHighlighted && generation === "G30" && "bg-blue-300",
                isHighlighted && generation === "G70" && "bg-pink-300",
              )}
            >
              <p>
                <b>${price}</b>/day
              </p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};
