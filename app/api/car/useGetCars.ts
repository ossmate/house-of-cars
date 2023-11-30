import { useQuery } from "@tanstack/react-query";

export type Car = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
};

export const getCarsQueryKey = "cars";

export const useGetCars = ({
  onlyHighlighted = false,
}: {
  onlyHighlighted?: boolean;
}) => {
  const getCarsRequest = () =>
    fetch(
      `http://localhost:5000/api/cars?onlyHighlighted=${onlyHighlighted}`,
    ).then((res) => res.json());

  const getCarsQuery = useQuery<{ data: Car[] }>({
    queryKey: [getCarsQueryKey],
    queryFn: () => getCarsRequest(),
  });

  return { getCarsQuery };
};
