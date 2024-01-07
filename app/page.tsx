import { CarsTiles } from "@/components/CarsTiles";
import { fetchCarsData } from "./server/actions/car/useCarsQuery";

export default async function Home() {
  const cars = await fetchCarsData({ onlyHighlighted: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CarsTiles initialData={cars} onlyHighlighted={true} />
    </main>
  );
}
