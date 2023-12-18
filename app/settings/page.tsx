import { BrandsTable } from "@/components/BrandsTable";
import { AddNewBrand } from "@/components/forms/AddNewBrand";
import { AddNewCar } from "@/components/forms/AddNewCar";

export default async function Settings() {
  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24">
      <AddNewCar />

      <br />

      <AddNewBrand />

      <BrandsTable />
    </main>
  );
}
