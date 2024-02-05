"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { push } = useRouter();

  useEffect(() => {
    signOut({ callbackUrl: "/" });
  }, [push]);

  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24" />
  );
}
