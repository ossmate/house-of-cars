"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenu } from "../DropdownMenu";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

type Props = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
};

export const CarCard = async ({
  id,
  brand,
  model,
  generation,
  engine,
  isHighlighted,
  price,
}: Props) => {
  const { push } = useRouter();

  async function removeCar(carId: string) {
    try {
      await fetch(`http://localhost:5000/api/cars/${carId}`, {
        method: "DELETE",
      });

      revalidatePath("/cars", "page");
      push(`/cars`);
    } catch (e) {
      return { message: "Failed to remove car" };
    }
  }

  return (
    <Link className="md:min-w-full min-w-[350px]" href={`/cars/${id}`}>
      <div
        className={cn(
          "px-8 pt-4 pb-2 rounded-t-2xl bg-gray-200",
          isHighlighted && brand === "BMW" && "bg-green-200",
          isHighlighted && brand === "Mercedes" && "bg-blue-200",
          isHighlighted && brand === "Porsche" && "bg-pink-200",
        )}
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-start items-center">
            <Image
              width="35"
              height="35"
              alt="brand"
              src={`/cars/logos/${brand.split(" ")[0]}.png`}
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

          <DropdownMenu
            actions={[
              { id: "1", label: "Remove", onClick: () => removeCar(id) },
            ]}
          />
        </div>
        <Image width="300" height="300" alt="m3" src="/cars/m3/main.png" />
      </div>
      <div
        className={cn(
          "rounded-b-xl p-4 flex justify-end bg-gray-300",
          isHighlighted && brand === "BMW" && "bg-green-300",
          isHighlighted && brand === "Mercedes" && "bg-blue-300",
          isHighlighted && brand === "Porsche" && "bg-pink-300",
        )}
      >
        <p>
          <b>${price}</b>/day
        </p>
      </div>
    </Link>
  );
};
