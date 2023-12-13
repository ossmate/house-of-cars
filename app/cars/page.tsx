import { CarsList } from "@/components/CarsList";
import { getCars } from "../actions/getCars";
import { getBrands } from "../actions/getBrands";

export default async function Cars() {
  const { data } = await getCars({});
  const { data: brands } = await getBrands();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <CarsList cars={data} shouldDisplayBrandSelector={true} brands={brands} />
    </main>
  );
}
