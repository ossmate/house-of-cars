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
  iat?: number | string | null;
};

type AuthContextType = {
  authState: AuthState;
  setAuthState: Dispatch<
    SetStateAction<{
      userId?: string | null | undefined;
      jwtToken?: string | null | undefined;
      iat?: number | null | undefined;
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
  iat: null,
};

const AuthContext = createContext({});

const AuthProvider = ({ children }: ProviderProps) => {
  const [authState, setAuthState] = useState<AuthState>(defaultAuthState);

  useEffect(() => {
    const hydrateAuthState = () => {
      const userId = localStorage.getItem("userId");
      const jwtToken = localStorage.getItem("token");
      const iat = localStorage.getItem("iat");
      setAuthState({ userId, jwtToken, iat });

      if (jwtToken && iat) {
        checkTokenExpiration();
      }
    };

    const checkTokenExpiration = () => {
      const expiresInMs = 15 * 60 * 1000; // Assuming 15 minutes expiration
      const iatAsTimestamp = parseInt(authState.iat as string, 10) * 1000; // Convert to milliseconds
      const expirationTime = iatAsTimestamp + expiresInMs;
      const currentTime = Date.now();

      // console.log("iatAsTimestamp:", iatAsTimestamp);
      // console.log("expirationTime:", expirationTime);
      // console.log("currentTime:", currentTime);

      if (currentTime > expirationTime) {
        setAuthState(defaultAuthState);
        localStorage.setItem("userId", "");
        localStorage.setItem("token", "");
        localStorage.setItem("iat", "");
      } else {
        const remainingTimeMs = expirationTime - currentTime;
        const remainingMinutes = Math.floor(remainingTimeMs / (60 * 1000));

        // console.log("Remaining Time (ms):", remainingTimeMs);
        // console.log("Remaining Minutes:", remainingMinutes);
      }
    };

    const intervalId = setInterval(checkTokenExpiration, 10000); // Check every 10 seconds

    hydrateAuthState();

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, [authState.iat]);

  const memoizedRemoveAuthState = useMemo(() => {
    const removeAuthState = () => {
      setAuthState(defaultAuthState);
      localStorage.setItem("userId", "");
      localStorage.setItem("token", "");
      localStorage.setItem("iat", "");
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
