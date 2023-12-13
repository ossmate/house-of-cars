import { Car } from "@/app/api/car/useCarsQuery";
import { CarCard } from "@/components/CarCard";
import { createAPIPath } from "@/lib/utils";

type Props = {
  params: {
    id: string;
  };
};

export const getCar = async (id: string): Promise<{ data: Car }> => {
  const res = await fetch(`${createAPIPath()}/api/cars/${id}`);

  return res.json();
};

const Car = async ({ params }: Props) => {
  const { data } = await getCar(params.id);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CarCard {...data} />
    </main>
  );
};

export default Car;
