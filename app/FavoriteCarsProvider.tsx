"use client";

import { CombineFavoriteCarsModal } from "@/components/CombineFavoriteCarsModal";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuthProvider } from "./AuthProvider";
import { useFavoriteCarsQuery } from "./server/actions/car/useFavoriteCarsQuery";
import { postAddCarToFavoriteRequest } from "./server/actions/car/useAddCarToFavoriteMutation";
import { useQueryClient } from "@tanstack/react-query";
import { getCarsQueryKey } from "./server/actions/car/useCarsQuery";

type FavoriteCarsContextType = {
  favoriteCars: string[];
  setFavoriteCars: Dispatch<SetStateAction<never[]>>;
  addToFavorites: (carId: string) => void;
  removeFromFavorites: (carId: string) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const FavoriteCarsContext = createContext({});

const FavoriteCarsProvider = ({ children }: ProviderProps) => {
  const [favoriteCars, setFavoriteCars] = useState<string[]>([]);
  const [filteredIds, setFilteredIds] = useState<string[]>([]);
  const [
    hasAdditionalFavoritesInLocalStorage,
    setHasAdditionalFavoritesInLocalStorage,
  ] = useState(false);

  const queryClient = useQueryClient();

  const {
    authState: { jwtToken, userId },
  } = useAuthProvider();

  const {
    favoriteCarsQuery: {
      data: serverFavoriteCars,
      isLoading: serverFavoriteCarsLoading,
      isError: serverFavoriteCarsError,
    },
  } = useFavoriteCarsQuery(Boolean(jwtToken));

  const clearLocalStorageFavoriteCars = () =>
    localStorage.setItem("favoriteCars", "");

  const combineLocalFavoriteCarsWithServerFavoriteCars = (carIds: string[]) => {
    const promises = carIds.map((carId) =>
      postAddCarToFavoriteRequest(carId, jwtToken, userId),
    );

    Promise.allSettled(promises)
      .then(() => {
        setHasAdditionalFavoritesInLocalStorage(false);
        setFilteredIds([]);
        clearLocalStorageFavoriteCars();
      })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: [getCarsQueryKey],
        });
      })
      .catch((error) => {
        console.error("Error in Promise.all:", error);
      });
  };

  const addToFavorites = useCallback((carId: string) => {
    setFavoriteCars((current) => [...current, carId]);
  }, []);

  const removeFromFavorites = useCallback((carId: string) => {
    setFavoriteCars((current) => current.filter((id) => id !== carId));
  }, []);

  useEffect(function setFavoriteCarsFromLocalStorageToProviderState() {
    const favoriteCarsFromLocalStorage = localStorage.getItem("favoriteCars");

    if (
      favoriteCarsFromLocalStorage &&
      JSON.parse(favoriteCarsFromLocalStorage).length > 0
    ) {
      setFavoriteCars(JSON.parse(favoriteCarsFromLocalStorage));
    }
  }, []);

  useEffect(
    function setFavoriteItemsToLocalStorage() {
      localStorage.setItem("favoriteCars", JSON.stringify(favoriteCars));
    },
    [favoriteCars],
  );

  useEffect(
    function filterDifferencesBetweenFavoriteCarsStorageAndSaveIds() {
      if (jwtToken && !serverFavoriteCarsLoading && !serverFavoriteCarsError) {
        if (Array.isArray(serverFavoriteCars)) {
          const filteredIds = favoriteCars.filter(
            (id) =>
              serverFavoriteCars &&
              !serverFavoriteCars.some((car) => car.id === id),
          );

          if (filteredIds.length > 0) {
            setHasAdditionalFavoritesInLocalStorage(true);
            setFilteredIds(filteredIds);
          }
        }
      }
    },
    [
      favoriteCars,
      jwtToken,
      serverFavoriteCars,
      serverFavoriteCarsError,
      serverFavoriteCarsLoading,
    ],
  );

  const value = useMemo(
    () => ({
      favoriteCars,
      setFavoriteCars,
      addToFavorites,
      removeFromFavorites,
    }),
    [favoriteCars, setFavoriteCars, addToFavorites, removeFromFavorites],
  );

  return (
    <FavoriteCarsContext.Provider value={value}>
      {children}
      <CombineFavoriteCarsModal
        isOpen={hasAdditionalFavoritesInLocalStorage}
        onCancel={() => {
          setFavoriteCars([]);
          clearLocalStorageFavoriteCars();
          setHasAdditionalFavoritesInLocalStorage(false);
        }}
        onAccept={() => {
          combineLocalFavoriteCarsWithServerFavoriteCars(filteredIds);
        }}
      />
    </FavoriteCarsContext.Provider>
  );
};

const useFavoriteCarsProvider = () => {
  const context = useContext(FavoriteCarsContext);

  if (!context) {
    throw new Error(
      "useFavoriteCarsProvider must be used within a FavoriteCarsProvider",
    );
  }

  return context as FavoriteCarsContextType;
};

export { useFavoriteCarsProvider, FavoriteCarsProvider };
