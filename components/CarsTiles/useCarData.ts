import { useAuthProvider } from "@/app/AuthProvider";
import { Brand } from "@/app/api/brand/useBrandsQuery";
import { Car, useCarsQuery } from "@/app/server/actions/car/useCarsQuery";
import { useFavoriteCarsQuery } from "@/app/server/actions/car/useFavoriteCarsQuery";

interface CarsTilesProps {
  initialData?: Car[];
  onlyHighlighted?: boolean;
  activeBrand?: string | null;
  shouldDisplayBrandSelector?: boolean;
  brands?: Brand[];
  isFavoritesList?: boolean;
}

export const useCarData = ({
  onlyHighlighted,
  activeBrand,
  initialData,
  isFavoritesList,
}: CarsTilesProps) => {
  const {
    authState: { jwtToken },
  } = useAuthProvider();

  const {
    carsQuery: { data: carsData, isLoading: carsLoading, isError: carsError },
  } = useCarsQuery({
    onlyHighlighted,
    brandId: activeBrand,
    initialData,
    isEnabled: !isFavoritesList,
  });

  const {
    favoriteCarsQuery: {
      data: favoriteCars,
      isLoading: favoriteCarsLoading,
      isError: favoriteCarsError,
    },
  } = useFavoriteCarsQuery(Boolean(jwtToken) && isFavoritesList);

  return {
    cars: isFavoritesList ? favoriteCars : carsData,
    isLoading: isFavoritesList ? favoriteCarsLoading : carsLoading,
    isError: isFavoritesList ? favoriteCarsError : carsError,
  };
};
