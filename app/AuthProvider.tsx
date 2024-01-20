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
  memoizedRemoveAuthState: () => void;
};

type ProviderProps = {
  children: ReactNode;
};

const defaultAuthState = {
  userId: null,
  jwtToken: null,
};

const AuthContext = createContext({});

const AuthProvider = ({ children }: ProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    // Hydrate auth state from localStorage on client-side
    const userId = localStorage.getItem("userId");
    const jwtToken = localStorage.getItem("token");
    setAuthState({ userId, jwtToken });
  }, []);

  const memoizedRemoveAuthState = useMemo(() => {
    const removeAuthState = () => {
      setAuthState(defaultAuthState);
      localStorage.setItem("userId", "");
      localStorage.setItem("token", "");
    };
    return removeAuthState;
  }, [setAuthState]);

  const value = useMemo(
    () => ({
      authState,
      setAuthState,
      memoizedRemoveAuthState,
    }),
    [authState, setAuthState, memoizedRemoveAuthState],
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
