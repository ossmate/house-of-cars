import { getCarsRequest } from "../api/car/useGetCars";

export async function getCars({
  onlyHighlighted,
}: {
  onlyHighlighted: boolean;
}) {
  try {
    const { data } = await getCarsRequest({ onlyHighlighted });

    return data;
  } catch (error) {
    return { error };
  }
}
