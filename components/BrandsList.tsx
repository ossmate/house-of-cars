"use client";

import type { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { Skeleton } from "./ui/skeleton";
import { useGetBrandsQuery } from "@/app/api/brand/getBrandsQuery";
import { Brand } from "@/app/settings/page";

type Props = {
  initialBrands?: Brand[];
  activeBrand: string | null;
  setActiveBrand: Dispatch<SetStateAction<string | null>>;
};

export const BrandsList = ({
  initialBrands,
  activeBrand,
  setActiveBrand,
}: Props) => {
  const {
    getBrandsQuery: { data: brands, isLoading: isBrandsLoading },
  } = useGetBrandsQuery(initialBrands);

  return (
    <div className="flex">
      {isBrandsLoading
        ? Array.from({ length: 3 }, (_, index) => (
            <Skeleton
              key={index}
              className="mx-3 mb-3 min-w-[150px] h-[150px]"
            />
          ))
        : brands?.data?.map(
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
  );
};
