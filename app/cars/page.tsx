import { cn } from "@/lib/utils";

const cars = [
  {
    id: 1,
    brand: "BMW",
    model: "Series 3",
    generation: "G20",
    price: "10000",
  },
  {
    id: 2,
    brand: "BMW",
    model: "Series 5",
    generation: "G30",
    price: "15000",
  },
  {
    id: 3,
    brand: "BMW",
    model: "Series 7",
    generation: "G70",
    price: "25000",
  },
];

export default function Cars() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="flex">
        {cars.map(({ id, brand, model, generation, price }) => (
          <div
            className={cn(
              generation === "G20" && "bg-green-400",
              generation === "G30" && "bg-blue-400",
              generation === "G70" && "bg-pink-400",
              "p-8 mx-4",
            )}
            key={id}
          >
            <h2>
              {brand} {model} {generation}
            </h2>
            <p>{price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
