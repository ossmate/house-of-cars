import { CarCard } from "@/components/CarCard";
import { Car } from "../page";

type Props = {
  params: {
    id: string;
  };
};

export const getCar = async (id: string): Promise<{ data: Car }> => {
  const res = await fetch(`http://localhost:5000/api/cars/${id}`);

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
