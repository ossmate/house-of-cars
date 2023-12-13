import { CarsList } from "@/components/CarsList";
import { getCars } from "../actions/getCars";

export default async function Cars() {
  const { data } = await getCars({});

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <CarsList cars={data} shouldDisplayBrandSelector={true} />
    </main>
  );
}
