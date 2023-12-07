import qs from "qs";
import { Brand } from "@/app/settings/page";
import { useQuery } from "@tanstack/react-query";

export type Car = {
  id: string;
  createdAt: string;
  brandId: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
  brand: Brand;
};

export const getCarsQueryKey = "cars";

export const useGetCars = ({
  onlyHighlighted = false,
  brandId,
}: {
  onlyHighlighted?: boolean;
  brandId?: string;
}) => {
  const query = qs.stringify({ onlyHighlighted, brandId }, { skipNulls: true });
  const getCarsRequest = () =>
    fetch(`http://localhost:5000/api/cars?${query}`).then((res) => res.json());

  const getCarsQuery = useQuery<{ data: Car[] }>({
    queryKey: [getCarsQueryKey, onlyHighlighted, brandId],
    queryFn: () => getCarsRequest(),
  });

  return { getCarsQuery };
};
