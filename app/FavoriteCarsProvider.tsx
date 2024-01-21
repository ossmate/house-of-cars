"use client";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useMemo, useState } from "react";

type FavoriteCarsContextType = {
  favoriteCars: any[];
  setFavoriteCars: Dispatch<SetStateAction<never[]>>;
};

type ProviderProps = {
  children: ReactNode;
};

const FavoriteCarsContext = createContext({});

const FavoriteCarsProvider = ({ children }: ProviderProps) => {
  const [favoriteCars, setFavoriteCars] = useState([]);

  const value = useMemo(
    () => ({
      favoriteCars,
      setFavoriteCars,
    }),
    [favoriteCars, setFavoriteCars],
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
