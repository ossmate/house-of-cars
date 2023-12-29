"use client";

import { BrandsTable } from "@/components/BrandsTable";
import { AddNewBrand } from "@/components/forms/AddNewBrand";
import { AddNewCar } from "@/components/forms/AddNewCar";
import { useAuthProvider } from "../AuthProvider";
import { useRouter } from "next/navigation";

export default function Settings() {
  const { push } = useRouter();
  const {
    authState: { jwtToken },
  } = useAuthProvider();

  if (!jwtToken) {
    push("/");

    return null;
  }

  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24">
      <AddNewCar />

      <br />

      <AddNewBrand />

      <BrandsTable />
    </main>
  );
}
