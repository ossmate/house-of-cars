"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthState = {
  userId?: string | null;
  jwtToken?: string | null;
};

type AuthContextType = {
  authState: AuthState;
  setAuthState: Dispatch<
    SetStateAction<{
      userId?: string | null | undefined;
      jwtToken?: string | null | undefined;
    }>
  >;
};

type ProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({});

const AuthProvider = ({ children }: ProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    userId: null,
    jwtToken: null,
  });

  useEffect(() => {
    // Hydrate auth state from localStorage on client-side
    const userId = localStorage.getItem("userId");
    const jwtToken = localStorage.getItem("token");
    setAuthState({ userId, jwtToken });
  }, []);

  const value = useMemo(
    () => ({
      authState,
      setAuthState,
    }),
    [authState, setAuthState],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthProvider = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthProvider must be used within a AuthProvider");
  }

  return context as AuthContextType;
};

export { AuthProvider, useAuthProvider };
