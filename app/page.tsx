import { CarCard } from "@/components/CarCard";

type Car = {
  id: string;
  brand: string;
  model: string;
  generation: string;
  engine: string;
  isHighlighted: boolean;
  price: number;
};

export const getCars = async ({
  onlyHighlighted = false,
}: {
  onlyHighlighted?: boolean;
}): Promise<{ data: Car[] }> => {
  const res = await fetch(
    `http://localhost:5000/api/cars?onlyHighlighted=${onlyHighlighted}`,
  );

  return res.json();
};

export default async function Home() {
  const { data } = await getCars({ onlyHighlighted: true });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 gap-y-6 gap-x-6">
        {data.map(
          ({ id, brand, model, generation, engine, isHighlighted, price }) => (
            <CarCard
              key={id}
              brand={brand}
              model={model}
              generation={generation}
              engine={engine}
              isHighlighted={isHighlighted}
              price={price}
            />
          ),
        )}
      </div>
    </main>
  );
}
