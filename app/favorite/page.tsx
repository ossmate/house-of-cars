"use client";

import { CarsTiles } from "@/components/CarsTiles";
import { useAuthProvider } from "../AuthProvider";
import { getCar } from "../cars/[id]/page";
import { Car } from "../server/actions/car/useCarsQuery";
import { useCallback, useEffect, useState } from "react";
import { CarTile } from "@/components/CarTile";
import { useFavoriteCarsProvider } from "../providers/FavoriteCarsProvider";

export default function Favorite() {
  const [favoriteCars, setFavoriteCars] = useState<Car[]>([]);

  const { localFavoriteCars } = useFavoriteCarsProvider();
  const {
    authState: { jwtToken },
  } = useAuthProvider();

  const getAllFavoriteCarsByLocalStorageIds = useCallback(async () => {
    if (!jwtToken && localFavoriteCars) {
      const favoriteCars: Car[] = [];

      try {
        await Promise.allSettled(
          localFavoriteCars?.map(async (carId: string) => {
            const { data } = await getCar(carId);
            favoriteCars.push(data);
          }),
        );

        setFavoriteCars(favoriteCars);
      } catch (error) {
        console.error("Error in Promise.all:", error);
      }
    }
  }, [jwtToken, localFavoriteCars]);

  useEffect(() => {
    getAllFavoriteCarsByLocalStorageIds();
  }, [getAllFavoriteCarsByLocalStorageIds]);

  return (
    <main className="flex flex-col items-center justify-between p-24">
      <CarsTiles shouldDisplayBrandSelector={false} isFavoritesList={true} />

      {/* NOTE: seems like i have to decide, use CarTiles component and pass data as prop or just use single CarTile entity to map over data  */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
        {favoriteCars?.map(
          ({
            id,
            brand,
            brandId,
            model,
            generation,
            engine,
            isHighlighted,
            price,
            imageUrl,
            isFavorite,
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
              imageUrl={imageUrl}
              isFavorite={isFavorite}
              isFavoritesList={true}
            />
          ),
        )}
      </div>
    </main>
  );
}
