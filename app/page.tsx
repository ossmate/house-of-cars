import { CarsTiles } from "@/components/CarsTiles";
import { getCars } from "./actions/getCars";

export default async function Home() {
  const { data } = await getCars({ onlyHighlighted: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CarsTiles cars={data} onlyHighlighted={true} />
    </main>
  );
}
