"use client";

import { useEffect } from "react";
import { useAuthProvider } from "../AuthProvider";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const { push } = useRouter();
  const { memoizedRemoveAuthState } = useAuthProvider();

  useEffect(() => {
    memoizedRemoveAuthState();

    return function pushToMainPage() {
      push("/");
    };
  }, [push, memoizedRemoveAuthState]);

  return (
    <main className="flex justify-start min-h-screen flex-col items-center  p-24" />
  );
}
