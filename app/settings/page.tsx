import { BrandsTable } from "@/components/BrandsTable";
import { AddNewBrand } from "@/components/forms/AddNewBrand";
import { AddNewCar } from "@/components/forms/AddNewCar";

export type Brand = {
  id: string;
  name: string;
  imageUrl: string;
};

const getBrands = async (): Promise<{ data: Brand[] }> => {
  const res = await fetch(`http://localhost:5000/api/brands`);

  return res.json();
};

export default async function Settings() {
  const { data } = await getBrands();

  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24">
      <AddNewCar brands={data} />

      <br />

      <AddNewBrand />

      <BrandsTable />
    </main>
  );
}
