import { getBrands } from "../server/actions/getBrands";
import { CarsTiles } from "@/components/CarsTiles";
import {
  fetchCarsData,
  getCarsQueryKey,
} from "../server/actions/car/useCarsQuery";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Cars() {
  const { data: brands } = await getBrands();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [getCarsQueryKey],
    queryFn: () => fetchCarsData({}),
  });

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarsTiles shouldDisplayBrandSelector={true} brands={brands} />
      </HydrationBoundary>
    </main>
  );
}
