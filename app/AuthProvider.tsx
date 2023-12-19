"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";

type Context = {
  userId?: string;
  jwtToken?: string;
};

type ProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({});

const AuthProvider = ({ children }: ProviderProps) => {
  const userId = localStorage.getItem("userId");
  const jwtToken = localStorage.getItem("token");

  const value = useMemo(
    () => ({
      userId,
      jwtToken,
    }),
    [userId, jwtToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthProvider must be used within a AuthProvider");
  }

  return context as Context;
};

export { AuthProvider, useAuthProvider };
