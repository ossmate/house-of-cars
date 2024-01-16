"use client";

import { CarsTiles } from "@/components/CarsTiles";
import { useAuthProvider } from "../AuthProvider";

export default function Favorite() {
  const {
    authState: { jwtToken },
  } = useAuthProvider();

  if (!jwtToken) {
    return <div>Unauthorized</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      favorite
      <CarsTiles shouldDisplayBrandSelector={false} isFavoritesList={true} />
    </main>
  );
}
