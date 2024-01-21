"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FavoriteCarsContextType = {
  favoriteCars: any[];
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
