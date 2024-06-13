import { getBrands } from "../server/actions/getBrands";
import { CarsTiles } from "@/components/CarsTiles";
import { fetchCarsData } from "../server/actions/car/useCarsQuery";

export default async function Cars() {
  const cars = await fetchCarsData({});
  const brands = await getBrands();


  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <CarsTiles
        initialData={cars}
        shouldDisplayBrandSelector={true}
        brands={brands}
      />
    </main>
  );
}
