import { CarsTiles } from "@/components/CarsTiles";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import {
  getCarsQueryKey,
  fetchCarsData,
} from "./server/actions/car/useCarsQuery";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [getCarsQueryKey],
    queryFn: () => fetchCarsData({ onlyHighlighted: true }),
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarsTiles onlyHighlighted={true} />
      </HydrationBoundary>
    </main>
  );
}
