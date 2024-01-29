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
import { useQueryClient } from "@tanstack/react-query";

import { CombineFavoriteCarsModal } from "@/components/CombineFavoriteCarsModal";
import { useAuthProvider } from "../AuthProvider";
import { useFavoriteCarsQuery } from "../server/actions/car/useFavoriteCarsQuery";
import { postAddCarToFavoriteRequest } from "../server/actions/car/useAddCarToFavoriteMutation";
import { getCarsQueryKey } from "../server/actions/car/useCarsQuery";
import { useModalTimeout } from "../hooks/useModalTimeout";

type FavoriteCarsContextType = {
  localFavoriteCars: string[];
  setLocalFavoriteCars: Dispatch<SetStateAction<never[]>>;
  addToFavorites: (carId: string) => void;
  removeFromFavorites: (carId: string) => void;
};

type ProviderProps = {
  children: ReactNode;
};

const FavoriteCarsContext = createContext({});

const FavoriteCarsProvider = ({ children }: ProviderProps) => {
  const [localFavoriteCars, setLocalFavoriteCars] = useState<string[]>([]);
  const [filteredLocalCarIds, setFilteredLocalCarIds] = useState<string[]>([]);
  const [
    hasAdditionalFavoritesInLocalStorage,
    setHasAdditionalFavoritesInLocalStorage,
  ] = useState(false);
  const [addToFavoritesStatus, setAddToFavoritesStatus] = useState("idle");
  const [modalVisibilityConfig, setModalVisibilityConfig] = useState<{
    triggerTimes: number;
    shouldAskLater: boolean;
  }>({
    triggerTimes: 0,
    shouldAskLater: false,
  });

  const queryClient = useQueryClient();
  const { modalTimeoutId, setModalTimeoutId } = useModalTimeout();

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

  const handleAccept = () => {
    if (modalTimeoutId) {
      clearTimeout(modalTimeoutId);
    }

    setLocalFavoriteCars([]);
    clearLocalStorageFavoriteCars();
    combineLocalFavoriteCarsWithServerFavoriteCars(filteredLocalCarIds);
  };

  const handleCancel = () => {
    if (modalTimeoutId) {
      clearTimeout(modalTimeoutId);
    }

    setLocalFavoriteCars([]);
    clearLocalStorageFavoriteCars();
    setHasAdditionalFavoritesInLocalStorage(false);
    queryClient.invalidateQueries({
      queryKey: [getCarsQueryKey],
    });
  };

  const resetTriggerCountAndScheduleModal = () => {
    if (modalVisibilityConfig.triggerTimes >= 3) {
      handleCancel();
      return;
    }

    setModalVisibilityConfig((current) => ({
      triggerTimes: current.triggerTimes + 1,
      shouldAskLater: false,
    }));

    const timeoutId = window.setTimeout(
      () => {
        setModalVisibilityConfig((current) => ({
          ...current,
          shouldAskLater: true,
        }));
      },
      modalVisibilityConfig.triggerTimes + 1 * 60 * 1000,
    );

    setModalTimeoutId(timeoutId);
  };

  const clearLocalStorageFavoriteCars = () =>
    localStorage.setItem("favoriteCars", "");

  const combineLocalFavoriteCarsWithServerFavoriteCars = async (
    carIds: string[],
  ) => {
    setAddToFavoritesStatus("pending");
    try {
      await Promise.allSettled(
        carIds.map((carId) =>
          postAddCarToFavoriteRequest(carId, jwtToken, userId),
        ),
      );
      setHasAdditionalFavoritesInLocalStorage(false);
      setFilteredLocalCarIds([]);
      clearLocalStorageFavoriteCars();
      queryClient.invalidateQueries({
        queryKey: [getCarsQueryKey],
      });
      setAddToFavoritesStatus("resolved");
    } catch (error) {
      console.error("Error in Promise.all:", error);
      setAddToFavoritesStatus("rejected");
    }
  };

  const addToFavorites = useCallback((carId: string) => {
    setLocalFavoriteCars((current) => [...current, carId]);
  }, []);

  const removeFromFavorites = useCallback((carId: string) => {
    setLocalFavoriteCars((current) => current.filter((id) => id !== carId));
  }, []);

  useEffect(function setLocalFavoriteCarsFromLocalStorage() {
    const favoriteCarsFromLocalStorage = localStorage.getItem("favoriteCars");

    if (
      favoriteCarsFromLocalStorage &&
      JSON.parse(favoriteCarsFromLocalStorage).length > 0
    ) {
      setLocalFavoriteCars(JSON.parse(favoriteCarsFromLocalStorage));
    }
  }, []);

  useEffect(
    function setLocalFavoriteCarsToLocalStorage() {
      localStorage.setItem("favoriteCars", JSON.stringify(localFavoriteCars));
    },
    [localFavoriteCars],
  );

  useEffect(
    function filterDifferencesBetweenLocalAndServerFavoriteCars() {
      if (jwtToken && !serverFavoriteCarsLoading && !serverFavoriteCarsError) {
        if (Array.isArray(serverFavoriteCars)) {
          const filteredLocalCarIds = localFavoriteCars.filter(
            (id) =>
              serverFavoriteCars &&
              !serverFavoriteCars.some((car) => car.id === id),
          );

          if (filteredLocalCarIds.length > 0) {
            setHasAdditionalFavoritesInLocalStorage(true);
            setFilteredLocalCarIds(filteredLocalCarIds);
          }
        }
      }
    },
    [
      localFavoriteCars,
      jwtToken,
      serverFavoriteCars,
      serverFavoriteCarsError,
      serverFavoriteCarsLoading,
    ],
  );

  const value = useMemo(
    () => ({
      localFavoriteCars,
      setLocalFavoriteCars,
      addToFavorites,
      removeFromFavorites,
    }),
    [
      localFavoriteCars,
      setLocalFavoriteCars,
      addToFavorites,
      removeFromFavorites,
    ],
  );

  return (
    <FavoriteCarsContext.Provider value={value}>
      {children}
      <CombineFavoriteCarsModal
        isPending={addToFavoritesStatus === "pending"}
        isOpen={
          hasAdditionalFavoritesInLocalStorage &&
          (modalVisibilityConfig.triggerTimes === 0 ||
            modalVisibilityConfig.shouldAskLater)
        }
        onCancel={handleCancel}
        onAccept={handleAccept}
        onAskLater={resetTriggerCountAndScheduleModal}
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
